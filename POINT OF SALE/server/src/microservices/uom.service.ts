import { Injectable } from '@nestjs/common';
import { CreateUOMDto, UpdateUOMDto } from 'src/dtos/uom.dto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class UOMService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUOMDto) {
    return this.prisma.uOM.create({ data });
  }

  async findAll() {
    return this.prisma.uOM.findMany();
  }

  async findOne(id: number) {
    return this.prisma.uOM.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateUOMDto) {
    return this.prisma.uOM.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.uOM.delete({ where: { id } });
  }
}