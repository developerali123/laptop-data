import { Module } from '@nestjs/common';
import { UOMItemService } from '../microservices/uomitem.service';
import { UOMItemController } from '../controllers/uomitem.controller';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [UOMItemController],
  providers: [UOMItemService, PrismaService],
})
export class UOMItemModule {}
