import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { spawn } from 'child_process';
import { CreateCompanyDto, UpdateTenantCompanyDto } from 'src/dtos/company.dto';
import { Readable } from 'stream';
import { PrismaClient as TenantPrisma } from '../../prisma/generated/tenant';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('TENANT_PRISMA') private readonly prisma: TenantPrisma,
    private readonly configService: ConfigService,
  ) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }
  private getMasterPrisma() {
    const { PrismaClient } = require('../../prisma/generated/master');
    return new PrismaClient();
  }

  private getTenantPrisma(url: string) {
    const { PrismaClient } = require('../../prisma/generated/tenant');
    return new PrismaClient({
      datasources: {
        db: { url },
      },
    });
  }

  private async runCommandAsync(
    command: string,
    envVars?: Record<string, string>,
  ) {
    return new Promise<void>((resolve, reject) => {
      const child = spawn(command, {
        shell: true,
        env: { ...process.env, ...envVars },
      });

      child.stdout.on('data', (data) => {
        console.log(`[CMD OUTPUT]: ${data}`);
      });

      child.stderr.on('data', (data) => {
        console.error(`[CMD ERROR]: ${data}`);
      });

      child.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(
            new Error(`Command "${command}" failed with exit code ${code}`),
          );
        }
      });
    });
  }

  async createCompany(data: CreateCompanyDto) {
    const masterPrisma = this.getMasterPrisma();

    const company = await masterPrisma.company.create({ data });

    await this.runCommandAsync(
      `createdb -h ${data.dbhost} -p ${data.dbport} -U ${data.dbuser} ${data.dbname}`,
      { PGPASSWORD: data.dbpassword },
    );

    const tenantUrl = `postgresql://${data.dbuser}:${data.dbpassword}@${data.dbhost}:${data.dbport}/${data.dbname}`;

    await this.runCommandAsync(
      `npx prisma db push --schema=prisma/tenant/schema.prisma --skip-generate`,
      { DATABASE_URL: tenantUrl },
    );

    await this.runCommandAsync(
      `npx prisma generate --schema=prisma/tenant/schema.prisma`,
    );

    const tenantPrisma = this.getTenantPrisma(tenantUrl);
    await tenantPrisma.profile.create({
      data: { name: company.name },
    });

    return {
      message: `Company ${company.name} created and tenant DB initialized`,
      company,
    };
  }

  async createcompany(dto: CreateCompanyDto) {
    if (!dto.name) {
      throw new BadRequestException('Company Name cannot be null');
    }

    return this.prisma.profile.create({
      data: {
        ...dto,
      },
    });
  }

  async uploadImageFromBuffer(file: Express.Multer.File): Promise<any> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'uploads' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      // Convert buffer to readable stream and pipe it to Cloudinary
      Readable.from(file.buffer).pipe(uploadStream);
    });
  }

  async getcompany() {
    const profile = await this.prisma.profile.findFirst();
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async updatecompany(dto: UpdateTenantCompanyDto) {
    const profile = await this.getcompany();

    return this.prisma.profile.update({
      where: { id: profile.id },
      data: dto,
    });
  }
}
