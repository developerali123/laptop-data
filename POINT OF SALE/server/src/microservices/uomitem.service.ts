import { Injectable } from '@nestjs/common';
import { CreateUOMItemDto, UpdateUOMItemDto } from 'src/dtos/uomitem.dto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class UOMItemService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUOMItemDto: CreateUOMItemDto) {
    return this.prisma.uOMItem.create({ data: createUOMItemDto });
  }

  findAll() {
    return this.prisma.uOMItem.findMany();
  }

  findOne(id: number) {
    return this.prisma.uOMItem.findUnique({ where: { id } });
  }

  update(id: number, updateUOMItemDto: UpdateUOMItemDto) {
    return this.prisma.uOMItem.update({
      where: { id },
      data: updateUOMItemDto,
    });
  }

  remove(id: number) {
    return this.prisma.uOMItem.delete({ where: { id } });
  }
}
