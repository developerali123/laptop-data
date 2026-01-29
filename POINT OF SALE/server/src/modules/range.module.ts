import { Module } from '@nestjs/common';
import { RangeService } from '../microservices/range.service';
import { PrismaService } from '../services/prisma.service';
import { RangeController } from 'src/controllers/range.controller';

@Module({
  controllers: [RangeController],
  providers: [RangeService, PrismaService],
})
export class RangeModule {}
