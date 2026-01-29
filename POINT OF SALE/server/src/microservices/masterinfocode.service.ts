import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMasterInfoCodeDto, UpdateMasterInfoCodeDto } from 'src/dtos/masterinfocode.dto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class MasterInfoCodeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateMasterInfoCodeDto) {
    return this.prisma.masterInfoCode.create({
      data: createDto,
    });
  }

  async findAll() {
    return this.prisma.masterInfoCode.findMany();
  }

  async findOne(id: number) {
    const masterInfoCode = await this.prisma.masterInfoCode.findUnique({ where: { id } });
    if (!masterInfoCode) {
      throw new NotFoundException(`MasterInfoCode with ID ${id} not found`);
    }
    return masterInfoCode;
  }

  async update(id: number, updateDto: UpdateMasterInfoCodeDto) {
    await this.findOne(id); // Ensure it exists
    return this.prisma.masterInfoCode.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Ensure it exists
    return this.prisma.masterInfoCode.delete({
      where: { id },
    });
  }
}
