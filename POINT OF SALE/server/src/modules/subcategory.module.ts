import { Module } from '@nestjs/common';
import { SubcategoryController } from 'src/controllers/subcategory.controller';
import { SubcategoryService } from 'src/microservices/subcategory.service';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  providers: [SubcategoryService, PrismaService],
  controllers: [SubcategoryController],
})
export class SubcategoryModule {}