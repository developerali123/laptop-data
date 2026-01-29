import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto, UpdateLocationDto } from 'src/dtos/location.dto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLocationDto: CreateLocationDto) {
    return this.prisma.location.create({
      data: createLocationDto,
    });
  }

  async findAll() {
    return this.prisma.location.findMany();
  }

  async findOne(id: number) {
    const location = await this.prisma.location.findUnique({ where: { id } });
    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    await this.findOne(id);
    return this.prisma.location.update({
      where: { id },
      data: updateLocationDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.location.delete({
      where: { id },
    });
  }
}
