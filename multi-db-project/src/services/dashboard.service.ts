import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient as TenantPrisma } from '../../prisma/generated/tenant';

@Injectable()
export class DashboardService {
  constructor(@Inject('TENANT_PRISMA') private readonly prisma: TenantPrisma) {}

  async getCounts() {
    const [
      // General models
      auth,
      taxAreaCode,
      customer,
      vendor,
      taxGroupCode,
      itemCategoryCode,
      item,
      taxCalculation,
      vendorLedgerEntry,
      customerLedgerEntry,
      itemLedgerEntry,
      inventoryAdjustmentposted,
      inventoryAdjustmentunposted,

      // Invoices & Returns (with posted/unposted)
      purchaseInvoicePosted,
      purchaseInvoiceUnposted,
      salesInvoicePosted,
      salesInvoiceUnposted,
      purchaseReturnPosted,
      purchaseReturnUnposted,
      salesReturnPosted,
      salesReturnUnposted,
    ] = await Promise.all([
      this.prisma.auth.count(),
      this.prisma.taxAreaCode.count(),
      this.prisma.customer.count(),
      this.prisma.vendor.count(),
      this.prisma.taxGroupCode.count(),
      this.prisma.itemCategoryCode.count(),
      this.prisma.item.count(),
      this.prisma.taxCalculation.count(),
      this.prisma.vendorLedgerEntry.count(),
      this.prisma.customerLedgerEntry.count(),
      this.prisma.itemLedgerEntry.count(),
      this.prisma.inventoryAdjustment.count({ where: { posted: true } }),
      this.prisma.inventoryAdjustment.count({ where: { posted: false } }),

      // Posted/Unposted counts
      this.prisma.purchaseInvoice.count({ where: { posted: true } }),
      this.prisma.purchaseInvoice.count({ where: { posted: false } }),

      this.prisma.salesInvoice.count({ where: { posted: true } }),
      this.prisma.salesInvoice.count({ where: { posted: false } }),

      this.prisma.purchaseReturnInvoice.count({ where: { posted: true } }),
      this.prisma.purchaseReturnInvoice.count({ where: { posted: false } }),

      this.prisma.salesReturnInvoice.count({ where: { posted: true } }),
      this.prisma.salesReturnInvoice.count({ where: { posted: false } }),
    ]);

    return {
      auth,
      taxAreaCode,
      customer,
      vendor,
      taxGroupCode,
      itemCategoryCode,
      item,
      taxCalculation,
      vendorLedgerEntry,
      customerLedgerEntry,
      itemLedgerEntry,
      inventoryAdjustment: {
        posted: inventoryAdjustmentposted,
        unposted: inventoryAdjustmentunposted,
      },

      purchaseInvoice: {
        posted: purchaseInvoicePosted,
        unposted: purchaseInvoiceUnposted,
      },
      salesInvoice: {
        posted: salesInvoicePosted,
        unposted: salesInvoiceUnposted,
      },
      purchaseReturnInvoice: {
        posted: purchaseReturnPosted,
        unposted: purchaseReturnUnposted,
      },
      salesReturnInvoice: {
        posted: salesReturnPosted,
        unposted: salesReturnUnposted,
      },
    };
  }
}
