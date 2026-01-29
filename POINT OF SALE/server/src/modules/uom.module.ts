import { Module } from '@nestjs/common';
import { UOMController } from 'src/controllers/uom.controller';
import { UOMService } from 'src/microservices/uom.service';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  providers: [UOMService, PrismaService],
  controllers: [UOMController],
})
export class UOMModule {}