import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dtos/category.dto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    return this.prisma.category.create({ data });
  }

  async findAll() {
    return this.prisma.category.findMany({ include: { subcategories: true } });
  }

  async findOne(id: number) {
    return this.prisma.category.findUnique({ where: { id }, include: { subcategories: true } });
  }

  async update(id: number, data: UpdateCategoryDto) {
    return this.prisma.category.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }
}
