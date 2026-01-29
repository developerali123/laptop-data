import { Module } from '@nestjs/common';
import { ItemService } from '../microservices/item.service';
import { PrismaService } from '../services/prisma.service';
import { ItemController } from 'src/controllers/item.controller';

@Module({
  controllers: [ItemController],
  providers: [ItemService, PrismaService],
})
export class ItemModule {}
