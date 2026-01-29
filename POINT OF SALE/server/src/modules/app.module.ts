import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user.module';
import { PrismaService } from '../services/prisma.service';
import { CategoryModule } from './category.module';
import { SubcategoryModule } from './subcategory.module';
import { UOMModule } from './uom.module';
import { RangeModule } from './range.module';
import { ItemModule } from './item.module';
import { AppController } from 'src/controllers/app.controller';

@Module({
  imports: [UserModule, CategoryModule, SubcategoryModule, UOMModule, RangeModule, ItemModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
