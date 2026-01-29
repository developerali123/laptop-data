import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TenantPrismaProvider } from 'src/common/tenant-prisma.provider';
import {
  LedgersController,
  PurchaseInvoiceController,
  PurchaseReturnInvoiceController,
  SalesInvoiceController,
  SalesReturnInvoiceController,
} from 'src/controllers/invoice.controller';
import { InvoiceService } from 'src/services/invoice.service';

@Module({
  imports: [HttpModule],
  controllers: [
    PurchaseInvoiceController,
    SalesInvoiceController,
    LedgersController,
    SalesReturnInvoiceController,
    PurchaseReturnInvoiceController,
  ],
  providers: [InvoiceService, TenantPrismaProvider],
})
export class InvoiceModule {}
