import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { CreateRangeDto, UpdateRangeDto } from 'src/dtos/range.dto';

@Injectable()
export class RangeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRangeDto: CreateRangeDto) {
    return this.prisma.range.create({
      data: createRangeDto,
    });
  }

  async findAll() {
    return this.prisma.range.findMany();
  }

  async findOne(id: number) {
    const range = await this.prisma.range.findUnique({ where: { id } });
    if (!range) {
      throw new NotFoundException(`Range with ID ${id} not found`);
    }
    return range;
  }

  async update(id: number, updateRangeDto: UpdateRangeDto) {
    await this.findOne(id);
    return this.prisma.range.update({
      where: { id },
      data: updateRangeDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.range.delete({
      where: { id },
    });
  }
}
