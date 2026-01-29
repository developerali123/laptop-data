import { Module } from '@nestjs/common';
import { TenantPrismaProvider } from 'src/common/tenant-prisma.provider';
import {
  CustomerController,
  TaxAreaCodeController,
  VendorController,
} from 'src/controllers/customer_vendor.controller';
import { CustomerVendorService } from 'src/services/customer_vendor.service';

@Module({
  imports: [],
  controllers: [TaxAreaCodeController, CustomerController, VendorController],
  providers: [CustomerVendorService, TenantPrismaProvider],
})
export class CustomerVendorModule {}
