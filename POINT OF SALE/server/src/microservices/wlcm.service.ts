import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWLCMDto, UpdateWLCMDto } from 'src/dtos/wlcm.dto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class WlcmService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWLCMDto: CreateWLCMDto) {
    return this.prisma.wLCM.create({
      data: createWLCMDto,
    });
  }

  async findAll() {
    return this.prisma.wLCM.findMany();
  }

  async findOne(id: number) {
    const wlcm = await this.prisma.wLCM.findUnique({ where: { id } });
    if (!wlcm) {
      throw new NotFoundException(`WLCM with ID ${id} not found`);
    }
    return wlcm;
  }

  async update(id: number, updateWLCMDto: UpdateWLCMDto) {
    await this.findOne(id);
    return this.prisma.wLCM.update({
      where: { id },
      data: updateWLCMDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.wLCM.delete({
      where: { id },
    });
  }
}
