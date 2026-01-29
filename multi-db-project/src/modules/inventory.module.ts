import { Module } from '@nestjs/common';
import { TenantPrismaProvider } from 'src/common/tenant-prisma.provider';
import {
  InventoryAdjustmentController,
  ItemCategoryCodeController,
  ItemController,
  TaxCalculationController,
  TaxGroupCodeController
} from 'src/controllers/inventory.controller';
import { InventoryService } from 'src/services/inventory.service';

@Module({
  imports: [],
  controllers: [
    TaxGroupCodeController,
    ItemCategoryCodeController,
    TaxCalculationController,
    ItemController,
    InventoryAdjustmentController,
  ],
  providers: [InventoryService, TenantPrismaProvider],
})
export class InventoryModule { }
