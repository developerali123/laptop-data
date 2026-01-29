import { Module } from '@nestjs/common';
import { LocationService } from '../microservices/location.service';
import { LocationController } from '../controllers/location.controller';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [LocationController],
  providers: [LocationService, PrismaService],
})
export class LocationModule {}
