import { Injectable } from '@nestjs/common';
import { CreateSubcategoryDto, UpdateSubcategoryDto } from 'src/dtos/subcategory.dto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class SubcategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSubcategoryDto) {
    return this.prisma.subcategory.create({ data });
  }

  async findAll() {
    return this.prisma.subcategory.findMany({ include: { category: true } });
  }

  async findOne(id: number) {
    return this.prisma.subcategory.findUnique({ where: { id }, include: { category: true } });
  }

  async update(id: number, data: UpdateSubcategoryDto) {
    return this.prisma.subcategory.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.subcategory.delete({ where: { id } });
  }
}
