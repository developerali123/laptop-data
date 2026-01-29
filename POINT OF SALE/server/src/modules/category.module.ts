import { Module } from '@nestjs/common';
import { CategoryController } from 'src/controllers/category.controller';
import { CategoryService } from 'src/microservices/category.service';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  providers: [CategoryService, PrismaService],
  controllers: [CategoryController],
})
export class CategoryModule {}