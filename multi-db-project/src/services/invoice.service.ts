import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs/promises';
import Handlebars from 'handlebars';
import * as path from 'path';
import puppeteer from 'puppeteer';
import { firstValueFrom } from 'rxjs';
import {
  CalculateInvoiceDto,
  CreatePurchaseInvoiceDto,
  CreatePurchaseReturnInvoiceDto,
  CreateSalesInvoiceDto,
  CreateSalesReturnInvoiceDto,
  UpdatePurchaseInvoiceDto,
  UpdatePurchaseReturnInvoiceDto,
  UpdateSalesInvoiceDto,
  UpdateSalesReturnInvoiceDto,
} from 'src/dtos/invoice.dto';
import {
  InvoiceReportFilters,
  PurchaseInvoiceReport,
  PurchaseInvoiceReportFilters,
  PurchaseReturnInvoiceReport,
  SalesReport,
  SalesReturnInvoiceReport,
  UnifiedInvoiceReport,
  UnifiedPurchaseInvoiceReport,
} from 'src/types/types';
import { PrismaClient as TenantPrisma } from '../../prisma/generated/tenant';

@Injectable()
export class InvoiceService {
  constructor(
    @Inject('TENANT_PRISMA') private readonly prisma: TenantPrisma,
    private readonly http: HttpService,
  ) {}

  async createpurchaseinvoice(userId: string, data: CreatePurchaseInvoiceDto) {
    if (!data.vendor_id)
      throw new BadRequestException('vendor id cannot be null');
    if (!data.posting_date)
      throw new BadRequestException('posting date cannot be null');
    if (!data.document_date)
      throw new BadRequestException('document date cannot be null');

    if (!data.items || data.items.length === 0)
      throw new BadRequestException('At least one item is required');

    const vendor = await this.prisma.vendor.findUnique({
      where: { id: data.vendor_id },
    });
    if (!vendor) throw new BadRequestException('Vendor not found');

    const vendorTaxAreaCodeId = vendor.tax_area_code_id;

    // ✅ Auto-generate invoice_no
    const latest = await this.prisma.purchaseInvoice.findFirst({
      orderBy: { createdAt: 'desc' },
      select: { invoice_no: true },
      where: {
        invoice_no: {
          startsWith: 'PI-',
        },
      },
    });

    let nextInvoiceNo = 'PI-00000001';
    if (latest?.invoice_no) {
      const lastNum = parseInt(latest.invoice_no.replace('PI-', ''), 10);
      const newNum = (lastNum + 1).toString().padStart(8, '0');
      nextInvoiceNo = `PI-${newNum}`;
    }

    let totalCost = 0;
    let totalTax = 0;
    let totaldiscount = 0;

    const itemsData = await Promise.all(
      data.items.map(async (item) => {
        if (!item.item_id)
          throw new BadRequestException('item id cannot be null');

        const itemEntity = await this.prisma.item.findUnique({
          where: { id: item.item_id },
        });
        if (!itemEntity) throw new BadRequestException('Item not found');

        const unitCost = item.unit_cost || 0;
        const quantity = item.quantity;
        const discount = item.discount || 0;
        const totalItemCost = unitCost * quantity;
        const discountAmount = (totalItemCost * discount) / 100;
        const totalCostAfterDiscount = totalItemCost - discountAmount;

        // ✅ Get applicable tax percentage from TaxCalculation table
        const taxCalculation = await this.prisma.taxCalculation.findFirst({
          where: {
            tax_group_code_id: itemEntity.tax_group_code_id,
            tax_group_area_id: vendorTaxAreaCodeId,
          },
        });

        const taxPercent = taxCalculation?.percentage || 0;
        const itemTax = (totalCostAfterDiscount * +taxPercent) / 100;

        const totalItemCostWithTax = totalCostAfterDiscount + itemTax;

        totalCost += totalItemCost;
        totalTax += itemTax;
        totaldiscount += totalCostAfterDiscount;

        return {
          ...item,
          unit_price: 0,
          unit_cost: Number(unitCost.toFixed(2)),
          total_cost: Number(totalItemCost.toFixed(2)),
          taxrate: Number(taxPercent.toFixed(2)),
          total_tax: Number(itemTax.toFixed(2)),
          totalcostincludingtax: Number(totalItemCostWithTax.toFixed(2)),
          discount: Number(discount.toFixed(2)),
          discountamount: Number(discountAmount.toFixed(2)),
          totalcostincludingdiscount: Number(totalCostAfterDiscount.toFixed(2)),
        };
      }),
    );

    const totalCostIncludingTax = totaldiscount + totalTax;
    const advanceTaxPercent = data.advancetax || 0;
    const advanceTaxValue = (totalCostIncludingTax * advanceTaxPercent) / 100;
    const totalWithAdvanceTax = totalCostIncludingTax + advanceTaxValue;

    const invoice = await this.prisma.purchaseInvoice.create({
      data: {
        invoice_no: nextInvoiceNo,
        vendor_id: data.vendor_id,
        notes: data.notes,
        auth_id: userId,
        vendor_invoice_no: data.vendor_invoice_no,
        posting_date: new Date(data.posting_date),
        document_date: new Date(data.document_date),
        totalcost: Number(totalCost.toFixed(2)),
        totaltax: Number(totalTax.toFixed(2)),
        totalcostincludingtax: Number(totalCostIncludingTax.toFixed(2)),
        advancedtax: Number(advanceTaxPercent.toFixed(2)),
        totaladvancedtax: Number(advanceTaxValue.toFixed(2)),
        totalcostincludingadvancedtax: Number(totalWithAdvanceTax.toFixed(2)),
        items: {
          create: itemsData,
        },
      },
      include: { items: true },
    });

    return invoice;
  }

  findAllpurchaseinvoices(posted?: boolean) {
    return this.prisma.purchaseInvoice.findMany({
      where: posted !== undefined ? { posted } : {},
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        items: {
          include: {
            item: true,
          },
        },
        vendor: true,
      },
    });
  }

  async getReturnableItemsFromPostedPurchaseInvoices() {
    const invoices = await this.prisma.purchaseInvoice.findMany({
      where: { posted: true },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        items: {
          include: {
            item: true,
          },
        },
        PurchaseReturnInvoice: {
          include: { items: true },
        },
        vendor: true,
      },
    });

    const filteredInvoices = invoices
      .map((invoice) => {
        let totalCost = 0;
        let totalDiscount = 0;
        let totalAfterDiscount = 0;
        let totalTax = 0;

        const items = invoice.items.map((item) => {
          const returnedQty = invoice.PurchaseReturnInvoice.flatMap(
            (ret) => ret.items,
          )
            .filter((retItem) => retItem.item_id === item.item_id)
            .reduce((sum, retItem) => sum + retItem.quantity, 0);

          const returnableQty = item.quantity - returnedQty;

          const adjustedTotalCost = item.unit_price * returnableQty;
          const adjustedDiscountAmount =
            (adjustedTotalCost * item.discount) / 100;
          const adjustedTotalCostAfterDiscount =
            adjustedTotalCost - adjustedDiscountAmount;
          const adjustedTax =
            (adjustedTotalCostAfterDiscount * item.taxrate) / 100;
          const adjustedTotalWithTax =
            adjustedTotalCostAfterDiscount + adjustedTax;

          if (returnableQty > 0) {
            totalCost += adjustedTotalCost;
            totalDiscount += adjustedDiscountAmount;
            totalAfterDiscount += adjustedTotalCostAfterDiscount;
            totalTax += adjustedTax;
          }

          return {
            id: item.id,
            purchase_invoice_id: item.purchase_invoice_id,
            item_id: item.item_id,
            unit_price: Number(item.unit_price.toFixed(2)),
            discount: Number(item.discount.toFixed(2)),
            taxrate: Number(item.taxrate.toFixed(2)),
            item: item.item,
            returned_quantity: Number(returnedQty.toFixed(2)),
            returnable_quantity: Number(returnableQty.toFixed(2)),
            adjusted_total_cost: Number(adjustedTotalCost.toFixed(2)),
            adjusted_discount_amount: Number(adjustedDiscountAmount.toFixed(2)),
            adjusted_totalcostincludingdiscount: Number(
              adjustedTotalCostAfterDiscount.toFixed(2),
            ),
            adjusted_total_tax: Number(adjustedTax.toFixed(2)),
            adjusted_totalcostincludingtax: Number(
              adjustedTotalWithTax.toFixed(2),
            ),
          };
        });

        // Filter out items with returnable_quantity = 0
        const returnableItems = items.filter((i) => i.returnable_quantity > 0);

        // Skip invoices where no item is returnable
        if (returnableItems.length === 0) return null;

        const advanceTax = invoice.advancedtax || 0;
        const totalWithTax = totalAfterDiscount + totalTax;
        const advanceTaxAmount = (totalWithTax * advanceTax) / 100;
        const totalWithAdvanceTax = totalWithTax + advanceTaxAmount;

        return {
          id: invoice.id,
          invoice_no: invoice.invoice_no,
          vendor_id: invoice.vendor_id,
          posting_date: invoice.posting_date,
          document_date: invoice.document_date,
          posted: invoice.posted,
          advancedtax: advanceTax,
          createdAt: invoice.createdAt,
          updatedAt: invoice.updatedAt,
          vendor: invoice.vendor,
          items: returnableItems,
          recalculated_totals: {
            totalcost: Number(totalCost.toFixed(2)),
            totalcostincludingdiscount: Number(totalAfterDiscount.toFixed(2)),
            totaltax: Number(totalTax.toFixed(2)),
            totalcostincludingtax: Number(totalWithTax.toFixed(2)),
            totaladvancedtax: Number(advanceTaxAmount.toFixed(2)),
            totalcostincludingadvancedtax: Number(
              totalWithAdvanceTax.toFixed(2),
            ),
          },
        };
      })
      .filter((invoice) => invoice !== null); // ❗ Skip invoices with no returnable items

    return filteredInvoices;
  }

  async getReturnablePurchaseItemsById(id: string) {
    const invoice = await this.prisma.purchaseInvoice.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            item: true,
          },
        },
        PurchaseReturnInvoice: {
          include: {
            items: {
              include: {
                item: true,
              },
            },
          },
        },
        vendor: true,
      },
    });

    if (!invoice) throw new NotFoundException('Purchase invoice not found');
    if (!invoice.posted)
      throw new BadRequestException('Purchase invoice is not posted');

    let totalCost = 0;
    let totalDiscount = 0;
    let totalAfterDiscount = 0;
    let totalTax = 0;

    const items = invoice.items.map((item) => {
      const returnedQty = invoice.PurchaseReturnInvoice.flatMap(
        (ret) => ret.items,
      )
        .filter((retItem) => retItem.item_id === item.item_id)
        .reduce((sum, retItem) => sum + retItem.quantity, 0);

      const returnableQty = item.quantity - returnedQty;

      const adjustedTotalCost = item.unit_cost * returnableQty;
      const adjustedDiscountAmount = (adjustedTotalCost * item.discount) / 100;
      const adjustedTotalCostAfterDiscount =
        adjustedTotalCost - adjustedDiscountAmount;
      const adjustedTax = (adjustedTotalCostAfterDiscount * item.taxrate) / 100;
      const adjustedTotalWithTax = adjustedTotalCostAfterDiscount + adjustedTax;

      if (returnableQty > 0) {
        totalCost += adjustedTotalCost;
        totalDiscount += adjustedDiscountAmount;
        totalAfterDiscount += adjustedTotalCostAfterDiscount;
        totalTax += adjustedTax;
      }

      return {
        id: item.id,
        purchase_invoice_id: item.purchase_invoice_id,
        item_id: item.item_id,
        unit_price: Number(item.unit_price.toFixed(2)),
        discount: Number(item.discount.toFixed(2)),
        taxrate: Number(item.taxrate.toFixed(2)),
        item: item.item,
        returned_quantity: Number(returnedQty.toFixed(2)),
        returnable_quantity: Number(returnableQty.toFixed(2)),
        adjusted_total_cost: Number(adjustedTotalCost.toFixed(2)),
        adjusted_discount_amount: Number(adjustedDiscountAmount.toFixed(2)),
        adjusted_totalcostincludingdiscount: Number(
          adjustedTotalCostAfterDiscount.toFixed(2),
        ),
        adjusted_total_tax: Number(adjustedTax.toFixed(2)),
        adjusted_totalcostincludingtax: Number(adjustedTotalWithTax.toFixed(2)),
      };
    });

    const returnableItems = items.filter((i) => i.returnable_quantity > 0);
    if (returnableItems.length === 0) {
      throw new NotFoundException('No returnable items found in this invoice');
    }

    const advanceTax = invoice.advancedtax || 0;
    const totalWithTax = totalAfterDiscount + totalTax;
    const advanceTaxAmount = (totalWithTax * advanceTax) / 100;
    const totalWithAdvanceTax = totalWithTax + advanceTaxAmount;

    return {
      id: invoice.id,
      invoice_no: invoice.invoice_no,
      vendor_id: invoice.vendor_id,
      posting_date: invoice.posting_date,
      document_date: invoice.document_date,
      posted: invoice.posted,
      advancedtax: Number(advanceTax.toFixed(2)),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
      vendor: invoice.vendor,
      items: returnableItems,
      recalculated_totals: {
        totalcost: Number(totalCost.toFixed(2)),
        totalcostincludingdiscount: Number(totalAfterDiscount.toFixed(2)),
        totaltax: Number(totalTax.toFixed(2)),
        totalcostincludingtax: Number(totalWithTax.toFixed(2)),
        totaladvancedtax: Number(advanceTaxAmount.toFixed(2)),
        totalcostincludingadvancedtax: Number(totalWithAdvanceTax.toFixed(2)),
      },
    };
  }

  async findOnepurchaseinvoice(id: string) {
    const invoice = await this.prisma.purchaseInvoice.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            item: true,
          },
        },
        vendor: true,
      },
    });
    if (!invoice) throw new NotFoundException('Invoice not found');
    return invoice;
  }

  async updatepurchaseinvoice(
    id: string,
    userId: string,
    dto: UpdatePurchaseInvoiceDto,
  ) {
    if (!dto.vendor_id)
      throw new BadRequestException('vendor id cannot be null');
    if (!dto.posting_date)
      throw new BadRequestException('posting date cannot be null');
    if (!dto.document_date)
      throw new BadRequestException('document date cannot be null');

    if (!dto.items || dto.items.length === 0)
      throw new BadRequestException('At least one item is required');
    const invoice = await this.findOnepurchaseinvoice(id);

    if (invoice.posted) {
      throw new BadRequestException('Invoice is already marked as posted');
    }

    const { items, ...invoiceData } = dto;

    const vendor = await this.prisma.vendor.findUnique({
      where: { id: invoiceData.vendor_id },
    });
    if (!vendor) throw new BadRequestException('Vendor not found');
    const vendorTaxAreaCodeId = vendor.tax_area_code_id;

    const existingItems = await this.prisma.purchaseInvoiceItem.findMany({
      where: { purchase_invoice_id: id },
    });

    const dtoItemIds = items.filter((i) => i.id).map((i) => i.id);
    const existingItemIds = existingItems.map((i) => i.id);

    const toDeleteIds = existingItemIds.filter(
      (dbId) => !dtoItemIds.includes(dbId),
    );
    if (toDeleteIds.length > 0) {
      await this.prisma.purchaseInvoiceItem.deleteMany({
        where: { id: { in: toDeleteIds } },
      });
    }

    let total_cost = 0;
    let total_tax = 0;
    let totaldiscount = 0;

    for (const item of items) {
      const itemEntity = await this.prisma.item.findUnique({
        where: { id: item.item_id },
      });
      if (!itemEntity) throw new BadRequestException('Item not found');

      // ✅ Lookup tax percentage using item.tax_group_code_id + vendor.tax_area_code_id
      const taxCalculation = await this.prisma.taxCalculation.findFirst({
        where: {
          tax_group_code_id: itemEntity.tax_group_code_id,
          tax_group_area_id: vendorTaxAreaCodeId,
        },
      });

      const taxPercent = taxCalculation?.percentage || 0;
      const itemCost = (item.unit_cost ?? 0) * item.quantity;
      const discount = item.discount || 0;
      const discountAmount = (itemCost * discount) / 100;
      const totalCostAfterDiscount = itemCost - discountAmount;
      const itemTax = (totalCostAfterDiscount * +taxPercent) / 100;
      const itemTotal = totalCostAfterDiscount + itemTax;

      total_cost += itemCost;
      total_tax += itemTax;
      totaldiscount += totalCostAfterDiscount;

      const itemData = {
        item_id: item.item_id,
        quantity: item.quantity,
        unit_price: 0,
        unit_cost: Number(item.unit_cost ? item.unit_cost.toFixed(2) : 0),
        total_cost: Number(itemCost.toFixed(2)),
        discount: Number(discount.toFixed(2)),
        discountamount: Number(discountAmount.toFixed(2)),
        totalcostincludingdiscount: Number(totalCostAfterDiscount.toFixed(2)),
        taxrate: Number(taxPercent.toFixed(2)),
        total_tax: Number(itemTax.toFixed(2)),
        totalcostincludingtax: Number(itemTotal.toFixed(2)),
        purchase_invoice_id: id,
      };

      if (item.id && existingItemIds.includes(item.id)) {
        await this.prisma.purchaseInvoiceItem.update({
          where: { id: item.id },
          data: itemData,
        });
      } else {
        // Create
        await this.prisma.purchaseInvoiceItem.create({ data: itemData });
      }
    }
    const total_cost_including_tax = totaldiscount + total_tax;
    const advanceTaxPercent = dto.advancetax || 0;
    const advanceTaxValue =
      (total_cost_including_tax * advanceTaxPercent) / 100;
    const totalWithAdvanceTax = total_cost_including_tax + advanceTaxValue;

    return this.prisma.purchaseInvoice.update({
      where: { id },
      data: {
        vendor_id: invoiceData.vendor_id,
        vendor_invoice_no: invoiceData.vendor_invoice_no,
        posting_date: new Date(invoiceData.posting_date),
        document_date: new Date(invoiceData.document_date),
        notes: invoiceData.notes,
        auth_id: userId,
        totalcost: Number(total_cost.toFixed(2)),
        totaltax: Number(total_tax.toFixed(2)),
        totalcostincludingtax: Number(total_cost_including_tax.toFixed(2)),
        advancedtax: Number(advanceTaxPercent.toFixed(2)),
        totaladvancedtax: Number(advanceTaxValue.toFixed(2)),
        totalcostincludingadvancedtax: Number(totalWithAdvanceTax.toFixed(2)),
      },
      include: {
        items: true,
      },
    });
  }

  async postpurchaseinvoice(id: string, userId: string) {
    const invoice = await this.findOnepurchaseinvoice(id);

    if (invoice.posted) {
      throw new BadRequestException('Invoice is already marked as posted');
    }

    return this.prisma.$transaction(async (tx) => {
      // 3. Mark invoice as posted
      const updatedInvoice = await tx.purchaseInvoice.update({
        where: { id },
        data: { posted: true, auth_id: userId },
      });

      // 4. Create Vendor Ledger Entry
      await tx.vendorLedgerEntry.create({
        data: {
          vendor_id: invoice.vendor_id,
          invoice_id: invoice.id,
          document_type: 'PurchaseInvoice',
        },
      });

      // 5. Create Item Ledger Entries for each invoice item
      for (const item of invoice.items) {
        // 3a. Create Item Ledger Entry
        await tx.itemLedgerEntry.create({
          data: {
            item_id: item.item_id,
            invoice_id: invoice.id, // ✅ replaces purchase_invoice_id
            invoice_item_id: item.id,
            document_type: 'PurchaseInvoice',
            source_type: 'vendor',
          },
        });
        // 3b. Increment total_quantity in Item table
        await tx.item.update({
          where: { id: item.item_id },
          data: {
            total_quantity: {
              increment: item.quantity,
            },
          },
        });
      }

      return updatedInvoice;
    });
  }

  async removepurchaseinvoice(id: string) {
    const invoice = await this.findOnepurchaseinvoice(id);

    if (invoice.posted) {
      throw new BadRequestException('Invoice is already marked as posted');
    }
    await this.prisma.purchaseInvoiceItem.deleteMany({
      where: { purchase_invoice_id: id },
    });
    return this.prisma.purchaseInvoice.delete({ where: { id } });
  }

  private initpurchaseTotalData() {
    return {
      totalcost: 0,
      totalcostincludingdiscount: 0,
      totaltax: 0,
      totalcostincludingtax: 0,
      advancedtax: 0,
      totaladvancedtax: 0,
      totalcostincludingadvancedtax: 0,
      total_quantity: 0,
    };
  }

  private sumpurchaseTotalData(totalBlocks: any[]) {
    const sum = this.initpurchaseTotalData();

    for (const block of totalBlocks) {
      Object.keys(sum).forEach((key) => {
        sum[key] += block[key] ?? 0;
      });
    }

    return sum;
  }

  async getUnifiedPurchaseInvoiceReport(
    filters: PurchaseInvoiceReportFilters,
  ): Promise<UnifiedPurchaseInvoiceReport> {
    const {
      document_type,
      document_date_from,
      document_date_to,
      vendor_id = null,
    } = filters;

    let purchaseInvoiceReport: PurchaseInvoiceReport = {
      invoices: [],
      totalData: this.initpurchaseTotalData(),
    };

    let purchaseReturnInvoiceReport: PurchaseReturnInvoiceReport = {
      invoices: [],
      totalData: this.initpurchaseTotalData(),
    };

    const docDateFilter = {
      gte: new Date(document_date_from),
      lte: new Date(document_date_to),
    };

    if (!document_type || document_type === 'PurchaseInvoice') {
      purchaseInvoiceReport = await this.getPurchaseInvoiceSummary({
        document_date_range: docDateFilter,
        vendor_id: vendor_id ?? undefined,
      });
    }

    if (!document_type || document_type === 'PurchaseReturn') {
      purchaseReturnInvoiceReport = await this.getPurchaseReturnInvoiceSummary({
        document_date_range: docDateFilter,
        vendor_id: vendor_id ?? undefined,
      });
    }

    return {
      invoices: [
        ...purchaseInvoiceReport.invoices,
        ...purchaseReturnInvoiceReport.invoices,
      ],
      totalData: this.sumpurchaseTotalData([
        purchaseInvoiceReport.totalData,
        purchaseReturnInvoiceReport.totalData,
      ]),
    };
  }

  async getPurchaseInvoiceSummary(filters?: {
    document_date_range?: { gte: Date; lte: Date };
    document_date?: string;
    vendor_id?: string;
  }): Promise<PurchaseInvoiceReport> {
    const purchaseInvoices = await this.prisma.purchaseInvoice.findMany({
      where: {
        posted: true,
        ...(filters?.document_date_range && {
          document_date: {
            gte: filters.document_date_range.gte,
            lte: filters.document_date_range.lte,
          },
        }),
        ...(filters?.vendor_id && {
          vendor_id: filters.vendor_id,
        }),
      },
      include: {
        items: {
          include: {
            item: true,
          },
        },
        vendor: true, // assuming you have vendor relation
      },
    });

    const report: PurchaseInvoiceReport = {
      invoices: [],
      totalData: {
        totalcost: 0,
        totaltax: 0,
        totalcostincludingtax: 0,
        advancedtax: 0,
        totaladvancedtax: 0,
        totalcostincludingadvancedtax: 0,
        total_quantity: 0,
      },
    };

    for (const invoice of purchaseInvoices) {
      let total_quantity = 0;

      const headerData = {
        invoice_no: invoice.invoice_no,
        vendor_name: invoice.vendor?.name ?? 'N/A',
        posting_date: invoice.posting_date,
        document_date: invoice.posting_date,
      };

      const items = invoice.items.map((invItem) => {
        total_quantity += invItem.quantity;

        return {
          ...invItem,
        };
      });

      const headerTotalData = {
        totalcost: invoice.totalcost,
        totaltax: invoice.totaltax,
        totalcostincludingtax: invoice.totalcostincludingtax,
        advancedtax: invoice.advancedtax,
        totaladvancedtax: invoice.totaladvancedtax,
        totalcostincludingadvancedtax: invoice.totalcostincludingadvancedtax,
        total_quantity,
      };

      const total = report.totalData;
      total.totalcost += invoice.totalcost;
      total.totaltax += invoice.totaltax;
      total.totalcostincludingtax += invoice.totalcostincludingtax;
      total.advancedtax += invoice.advancedtax;
      total.totaladvancedtax += invoice.totaladvancedtax;
      total.totalcostincludingadvancedtax +=
        invoice.totalcostincludingadvancedtax;
      total.total_quantity += total_quantity;

      report.invoices.push({
        headerData,
        items,
        headerTotalData,
      });
    }

    return report;
  }

  async getPurchaseSummary(filters?: {
    documentType?: 'PurchaseInvoice' | 'PurchaseReturn';
    vendorId?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const invoiceFilter: any = {};
    const returnFilter: any = {};

    if (filters?.vendorId) {
      invoiceFilter.vendor_id = filters.vendorId;
      returnFilter.vendor_id = filters.vendorId;
    }

    if (filters?.startDate && filters?.endDate) {
      const startDate = new Date(filters.startDate);
      const endDate = new Date(filters.endDate);

      invoiceFilter.document_date = { gte: startDate, lte: endDate };
      returnFilter.document_date = { gte: startDate, lte: endDate };
    }

    let results: any[] = [];

    if (!filters?.documentType || filters.documentType === 'PurchaseInvoice') {
      const invoices = await this.prisma.purchaseInvoice.findMany({
        where: invoiceFilter,
        include: {
          vendor: true,
          auth: true,
          items: true,
        },
      });
      results = results.concat(
        invoices.map((inv) => ({
          type: 'PurchaseInvoice',
          ...inv,
        })),
      );
    }

    if (!filters?.documentType || filters.documentType === 'PurchaseReturn') {
      const returns = await this.prisma.purchaseReturnInvoice.findMany({
        where: returnFilter,
        include: {
          vendor: true,
          auth: true,
          items: true,
          purchaseinvoice: true,
        },
      });
      results = results.concat(
        returns.map((ret) => ({
          type: 'PurchaseReturn',
          ...ret,
        })),
      );
    }

    return results.sort(
      (a, b) =>
        new Date(b.document_date).getTime() -
        new Date(a.document_date).getTime(),
    );
  }

  async calculateInvoicePreview(data: CalculateInvoiceDto) {
    if (!data.customer_id)
      throw new BadRequestException('customer id cannot be null');
    if (!data.items || data.items.length === 0)
      throw new BadRequestException('At least one item is required');

    const customer = await this.prisma.customer.findUnique({
      where: { id: data.customer_id },
    });
    if (!customer) throw new BadRequestException('Customer not found');

    const customerTaxAreaCodeId = customer.tax_area_code_id;

    let totalCost = 0;
    let totalTax = 0;
    let totalcostincludingdiscount = 0;
    let totalassessedunit = 0;
    let totalfedamount = 0;
    let totaldiscount = 0;
    let totalfurthertax = 0;

    const itemsData = await Promise.all(
      data.items.map(async (item) => {
        const itemEntity = await this.prisma.item.findUnique({
          where: { id: item.item_id },
        });
        if (!itemEntity) throw new BadRequestException('Item not found');

        const totalassessedunitamount =
          itemEntity?.assessed_unit * item.quantity;
        const fedValue =
          (totalassessedunitamount * (item.fed ? item.fed : 0)) / 100;
        const itemprice =
          itemEntity?.assessed_unit > 0
            ? itemEntity?.assessed_unit +
              (itemEntity?.assessed_unit * (item.fed ? item.fed : 0)) / 100
            : (item.unit_cost ?? 0);
        const totalItemCost = itemprice * item.quantity;
        const totalretailprice = (item?.retail_price ?? 0) * item.quantity;
        const discountAmount = (totalItemCost * (item.discount ?? 0)) / 100;
        const totalCostAfterDiscount = totalItemCost - discountAmount;
        const furtherTaxValue =
          ((totalretailprice > 0 ? totalretailprice : totalCostAfterDiscount) *
            (item.furthertax ? item.furthertax : 0)) /
          100;

        const taxCalculation = await this.prisma.taxCalculation.findFirst({
          where: {
            tax_group_code_id: itemEntity.tax_group_code_id,
            tax_group_area_id: customerTaxAreaCodeId,
          },
        });

        const taxPercent = taxCalculation?.percentage || 0;
        const itemTax =
          ((totalretailprice > 0 ? totalretailprice : totalCostAfterDiscount) *
            +taxPercent) /
          100;

        const totalItemCostWithTax = totalCostAfterDiscount + itemTax;
        const totalItemCostWithfurtherTax =
          totalItemCostWithTax + furtherTaxValue;

        totalCost += totalItemCost;
        totalTax += itemTax;
        totalcostincludingdiscount += totalCostAfterDiscount;
        totalassessedunit += totalassessedunitamount;
        totalfedamount += fedValue;
        totaldiscount += discountAmount;
        totalfurthertax += furtherTaxValue;

        return {
          item_id: item.item_id,
          quantity: item.quantity,
          unit_price: Number(itemprice.toFixed(2)),
          retail_price: Number(item.retail_price?.toFixed(2)),
          assessed_unit: Number(itemEntity.assessed_unit?.toFixed(2)),
          total_assessed_unit: Number(totalassessedunitamount.toFixed(2)),
          unit_cost: Number(itemEntity.unit_cost.toFixed(2)),
          total_cost: Number(totalItemCost.toFixed(2)),
          taxrate: Number(taxPercent.toFixed(2)),
          total_tax: Number(itemTax.toFixed(2)),
          totalcostincludingtax: Number(totalItemCostWithTax.toFixed(2)),
          totalcostincludingfurthertax: Number(
            totalItemCostWithfurtherTax.toFixed(2),
          ),
          discount: item?.discount ? Number(item.discount.toFixed(2)) : 0,
          discountamount: Number(discountAmount.toFixed(2)),
          furthertax: item.furthertax ? Number(item.furthertax.toFixed(2)) : 0,
          furtertaxamount: Number(furtherTaxValue.toFixed(2)),
          fed: item.fed ? Number(item.fed.toFixed(2)) : 0,
          fedamount: Number(fedValue.toFixed(2)),
          totalcostincludingdiscount: Number(totalCostAfterDiscount.toFixed(2)),
        };
      }),
    );

    const totalCostIncludingTax = totalcostincludingdiscount + totalTax;
    const totalCostIncludingfurtherTax =
      totalCostIncludingTax + totalfurthertax;
    const advanceTaxPercent = data.advancetax || 0;
    const advanceTaxValue = (totalCostIncludingTax * advanceTaxPercent) / 100;
    const totalWithAdvanceTax = totalCostIncludingTax + advanceTaxValue;

    return {
      totals: {
        totalassessedunit: Number(totalassessedunit.toFixed(2)),
        totalfedamount: Number(totalfedamount.toFixed(2)),
        totalcost: Number(totalCost.toFixed(2)),
        totaldiscount: Number(totaldiscount.toFixed(2)),
        totalfurthertax: Number(totalfurthertax.toFixed(2)),
        totaltax: Number(totalTax.toFixed(2)),
        totalcostincludingdiscount: Number(
          totalcostincludingdiscount.toFixed(2),
        ),
        totalcostincludingtax: Number(totalCostIncludingTax.toFixed(2)),
        totalcostincludingfurthertax: Number(
          totalCostIncludingfurtherTax.toFixed(2),
        ),
        advancedtax: Number(advanceTaxPercent.toFixed(2)),
        totaladvancedtax: Number(advanceTaxValue.toFixed(2)),
        totalcostincludingadvancedtax: Number(totalWithAdvanceTax.toFixed(2)),
      },
      items: itemsData,
    };
  }

  async createsalesinvoice(userId: string, data: CreateSalesInvoiceDto) {
    if (!data.customer_id)
      throw new BadRequestException('customer id cannot be null');
    if (!data.posting_date)
      throw new BadRequestException('posting date cannot be null');
    if (!data.document_date)
      throw new BadRequestException('document date cannot be null');

    if (!data.items || data.items.length === 0)
      throw new BadRequestException('At least one item is required');

    const customer = await this.prisma.customer.findUnique({
      where: { id: data.customer_id },
    });
    if (!customer) throw new BadRequestException('Customer not found');

    const customerTaxAreaCodeId = customer.tax_area_code_id;

    // ✅ Auto-generate invoice_no
    const latest = await this.prisma.salesInvoice.findFirst({
      orderBy: { createdAt: 'desc' },
      select: { invoice_no: true },
      where: {
        invoice_no: {
          startsWith: 'SI-',
        },
      },
    });

    let nextInvoiceNo = 'SI-00000001';
    if (latest?.invoice_no) {
      const lastNum = parseInt(latest.invoice_no.replace('SI-', ''), 10);
      const newNum = (lastNum + 1).toString().padStart(8, '0');
      nextInvoiceNo = `SI-${newNum}`;
    }

    let totalCost = 0;
    let totalTax = 0;
    let totalcostincludingdiscount = 0;
    let totalassessedunit = 0;
    let totalfedamount = 0;
    let totaldiscount = 0;
    let totalfurthertax = 0;

    const itemsData = await Promise.all(
      data.items.map(async (item) => {
        if (!item.item_id)
          throw new BadRequestException('item id cannot be null');

        const itemEntity = await this.prisma.item.findUnique({
          where: { id: item.item_id },
        });
        if (!itemEntity) throw new BadRequestException('Item not found');
        const totalassessedunitamount =
          itemEntity?.assessed_unit * item.quantity;
        const fedValue =
          (totalassessedunitamount * (item.fed ? item.fed : 0)) / 100;
        const itemprice =
          itemEntity?.assessed_unit > 0
            ? itemEntity?.assessed_unit +
              (itemEntity?.assessed_unit * (item.fed ? item.fed : 0)) / 100
            : (item.unit_cost ?? 0);
        const totalItemCost = itemprice * item.quantity;
        const totalretailprice = (item?.retail_price ?? 0) * item.quantity;
        const discountAmount = (totalItemCost * (item.discount ?? 0)) / 100;
        const totalCostAfterDiscount = totalItemCost - discountAmount;
        const furtherTaxValue =
          ((totalretailprice > 0 ? totalretailprice : totalCostAfterDiscount) *
            (item.furthertax ? item.furthertax : 0)) /
          100;

        const taxPercent = itemEntity?.ratevalue ?? 0;
        const itemTax =
          ((totalretailprice > 0 ? totalretailprice : totalCostAfterDiscount) *
            +taxPercent) /
          100;

        const totalItemCostWithTax = totalCostAfterDiscount + itemTax;
        const totalItemCostWithfurtherTax =
          totalItemCostWithTax + furtherTaxValue;

        totalCost += totalItemCost;
        totalTax += itemTax;
        totalcostincludingdiscount += totalCostAfterDiscount;
        totalassessedunit += totalassessedunitamount;
        totalfedamount += fedValue;
        totaldiscount += discountAmount;
        totalfurthertax += furtherTaxValue;

        return {
          item_id: item.item_id,
          quantity: item.quantity,
          unit_price: Number(itemprice?.toFixed(2)),
          retail_price: Number(item.retail_price?.toFixed(2)),
          assessed_unit: Number(itemEntity.assessed_unit?.toFixed(2)),
          total_assessed_unit: Number(totalassessedunitamount?.toFixed(2)),
          unit_cost: Number(itemEntity.unit_cost.toFixed(2)),
          total_cost: Number(totalItemCost.toFixed(2)),
          taxrate: Number(taxPercent.toFixed(2)),
          total_tax: Number(itemTax.toFixed(2)),
          totalcostincludingtax: Number(totalItemCostWithTax.toFixed(2)),
          totalcostincludingfurthertax: Number(
            totalItemCostWithfurtherTax.toFixed(2),
          ),
          discount: item?.discount ? Number(item.discount.toFixed(2)) : 0,
          discountamount: Number(discountAmount.toFixed(2)),
          furthertax: item.furthertax ? Number(item.furthertax.toFixed(2)) : 0,
          furtertaxamount: Number(furtherTaxValue.toFixed(2)),
          fed: item.fed ? Number(item.fed.toFixed(2)) : 0,
          fedamount: Number(fedValue.toFixed(2)),
          totalcostincludingdiscount: Number(totalCostAfterDiscount.toFixed(2)),
        };
      }),
    );
    const totalCostIncludingTax = totalcostincludingdiscount + totalTax;
    const totalCostIncludingfurtherTax =
      totalCostIncludingTax + totalfurthertax;
    const advanceTaxPercent = data.advancetax || 0;
    const advanceTaxValue =
      (totalCostIncludingfurtherTax * advanceTaxPercent) / 100;
    const totalWithAdvanceTax = totalCostIncludingfurtherTax + advanceTaxValue;

    const invoice = await this.prisma.salesInvoice.create({
      data: {
        scenario_no: data.scenario_no,
        invoice_no: nextInvoiceNo,
        customer_id: data.customer_id,
        notes: data.notes,
        auth_id: userId,
        posting_date: new Date(data.posting_date),
        document_date: new Date(data.document_date),
        totalassessedunit: Number(totalassessedunit.toFixed(2)),
        totalfedamount: Number(totalfedamount.toFixed(2)),
        totalcost: Number(totalCost.toFixed(2)),
        totaldiscount: Number(totaldiscount.toFixed(2)),
        totalfurthertax: Number(totalfurthertax.toFixed(2)),
        totaltax: Number(totalTax.toFixed(2)),
        totalcostincludingdiscount: Number(
          totalcostincludingdiscount.toFixed(2),
        ),
        totalcostincludingtax: Number(totalCostIncludingTax.toFixed(2)),
        totalcostincludingfurthertax: Number(
          totalCostIncludingfurtherTax.toFixed(2),
        ),
        advancedtax: Number(advanceTaxPercent.toFixed(2)),
        totaladvancedtax: Number(advanceTaxValue.toFixed(2)),
        totalcostincludingadvancedtax: Number(totalWithAdvanceTax.toFixed(2)),
        items: {
          create: itemsData,
        },
      },
      include: { items: true },
    });

    return invoice;
  }

  findAllsalesinvoices(posted?: boolean) {
    return this.prisma.salesInvoice.findMany({
      where: posted !== undefined ? { posted } : {},
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        items: {
          include: {
            item: true,
          },
        },
        customer: true,
      },
    });
  }

  async getReturnableItemsFromPostedSalesInvoices() {
    const invoices = await this.prisma.salesInvoice.findMany({
      where: { posted: true },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        items: {
          include: {
            item: true,
          },
        },
        salesinvoicereturns: {
          include: {
            items: true,
          },
        },
        customer: true,
      },
    });

    const filteredInvoices = invoices
      .map((invoice) => {
        let totalCost = 0;
        let totalDiscount = 0;
        let totalAfterDiscount = 0;
        let totalTax = 0;

        const items = invoice.items.map((item) => {
          const returnedQty = invoice.salesinvoicereturns
            .flatMap((ret) => ret.items)
            .filter((retItem) => retItem.item_id === item.item_id)
            .reduce((sum, retItem) => sum + retItem.quantity, 0);

          const returnableQty = item.quantity - returnedQty;

          const adjustedTotalCost = item.unit_cost * returnableQty;
          const adjustedDiscountAmount =
            (adjustedTotalCost * item.discount) / 100;
          const adjustedTotalCostAfterDiscount =
            adjustedTotalCost - adjustedDiscountAmount;
          const adjustedTax =
            (adjustedTotalCostAfterDiscount * item.taxrate) / 100;
          const adjustedTotalWithTax =
            adjustedTotalCostAfterDiscount + adjustedTax;

          if (returnableQty > 0) {
            totalCost += adjustedTotalCost;
            totalDiscount += adjustedDiscountAmount;
            totalAfterDiscount += adjustedTotalCostAfterDiscount;
            totalTax += adjustedTax;
          }

          return {
            id: item.id,
            sales_invoice_id: item.sales_invoice_id,
            item_id: item.item_id,
            unit_price: Number(item.unit_price.toFixed(2)),
            discount: Number(item.discount.toFixed(2)),
            taxrate: Number(item.taxrate.toFixed(2)),
            item: item.item,
            returned_quantity: Number(returnedQty.toFixed(2)),
            returnable_quantity: Number(returnableQty.toFixed(2)),
            adjusted_total_cost: Number(adjustedTotalCost.toFixed(2)),
            adjusted_discount_amount: Number(adjustedDiscountAmount.toFixed(2)),
            adjusted_totalcostincludingdiscount: Number(
              adjustedTotalCostAfterDiscount.toFixed(2),
            ),
            adjusted_total_tax: Number(adjustedTax.toFixed(2)),
            adjusted_totalcostincludingtax: Number(
              adjustedTotalWithTax.toFixed(2),
            ),
          };
        });

        // Filter out items with returnable_quantity = 0
        const returnableItems = items.filter((i) => i.returnable_quantity > 0);

        // Skip invoices where no item is returnable
        if (returnableItems.length === 0) return null;

        const advanceTax = invoice.advancedtax || 0;
        const totalWithTax = totalAfterDiscount + totalTax;
        const advanceTaxAmount = (totalWithTax * advanceTax) / 100;
        const totalWithAdvanceTax = totalWithTax + advanceTaxAmount;

        return {
          id: invoice.id,
          invoice_no: invoice.invoice_no,
          customer_id: invoice.customer_id,
          posting_date: invoice.posting_date,
          document_date: invoice.document_date,
          posted: invoice.posted,
          advancedtax: Number(advanceTax.toFixed(2)),
          fbrinvoiceno: invoice.fbrinvoiceno,
          createdAt: invoice.createdAt,
          updatedAt: invoice.updatedAt,
          notes: invoice.notes,
          customer: invoice.customer,
          items: returnableItems,
          recalculated_totals: {
            totalcost: Number(totalCost.toFixed(2)),
            totalcostincludingdiscount: Number(totalAfterDiscount.toFixed(2)),
            totaltax: Number(totalTax.toFixed(2)),
            totalcostincludingtax: Number(totalWithTax.toFixed(2)),
            totaladvancedtax: Number(advanceTaxAmount.toFixed(2)),
            totalcostincludingadvancedtax: Number(
              totalWithAdvanceTax.toFixed(2),
            ),
          },
        };
      })
      .filter((invoice) => invoice !== null); // ❗ Skip invoices with no returnable items

    return filteredInvoices;
  }

  async getReturnableSalesItemsById(id: string) {
    const invoice = await this.prisma.salesInvoice.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            item: true,
          },
        },
        salesinvoicereturns: {
          include: {
            items: {
              include: {
                item: true,
              },
            },
          },
        },
        customer: true,
      },
    });

    if (!invoice) throw new NotFoundException('Sales invoice not found');
    if (!invoice.posted)
      throw new BadRequestException('Sales invoice is not posted');

    let totalCost = 0;
    let totalDiscount = 0;
    let totalAfterDiscount = 0;
    let totalTax = 0;

    const items = invoice.items.map((item) => {
      const returnedQty = invoice.salesinvoicereturns
        .flatMap((ret) => ret.items)
        .filter((retItem) => retItem.item_id === item.item_id)
        .reduce((sum, retItem) => sum + retItem.quantity, 0);

      const returnableQty = item.quantity - returnedQty;

      const adjustedTotalCost = item.unit_price * returnableQty;
      const adjustedDiscountAmount = (adjustedTotalCost * item.discount) / 100;
      const adjustedTotalCostAfterDiscount =
        adjustedTotalCost - adjustedDiscountAmount;
      const adjustedTax = (adjustedTotalCostAfterDiscount * item.taxrate) / 100;
      const adjustedTotalWithTax = adjustedTotalCostAfterDiscount + adjustedTax;

      if (returnableQty > 0) {
        totalCost += adjustedTotalCost;
        totalDiscount += adjustedDiscountAmount;
        totalAfterDiscount += adjustedTotalCostAfterDiscount;
        totalTax += adjustedTax;
      }

      return {
        id: item.id,
        sales_invoice_id: item.sales_invoice_id,
        item_id: item.item_id,
        unit_price: Number(item.unit_price.toFixed(2)),
        discount: Number(item.discount.toFixed(2)),
        taxrate: Number(item.taxrate.toFixed(2)),
        item: item.item,
        returned_quantity: Number(returnedQty.toFixed(2)),
        returnable_quantity: Number(returnableQty.toFixed(2)),
        adjusted_total_cost: Number(adjustedTotalCost.toFixed(2)),
        adjusted_discount_amount: Number(adjustedDiscountAmount.toFixed(2)),
        adjusted_totalcostincludingdiscount: Number(
          adjustedTotalCostAfterDiscount.toFixed(2),
        ),
        adjusted_total_tax: Number(adjustedTax.toFixed(2)),
        adjusted_totalcostincludingtax: Number(adjustedTotalWithTax.toFixed(2)),
      };
    });

    const returnableItems = items.filter((i) => i.returnable_quantity > 0);
    if (returnableItems.length === 0) {
      throw new NotFoundException('No returnable items found in this invoice');
    }

    const advanceTax = invoice.advancedtax || 0;
    const totalWithTax = totalAfterDiscount + totalTax;
    const advanceTaxAmount = (totalWithTax * advanceTax) / 100;
    const totalWithAdvanceTax = totalWithTax + advanceTaxAmount;

    return {
      id: invoice.id,
      invoice_no: invoice.invoice_no,
      customer_id: invoice.customer_id,
      posting_date: invoice.posting_date,
      document_date: invoice.document_date,
      posted: invoice.posted,
      notes: invoice.notes,
      advancedtax: Number(advanceTax.toFixed(2)),
      fbrinvoiceno: invoice.fbrinvoiceno,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
      customer: invoice.customer,
      items: returnableItems,
      recalculated_totals: {
        totalcost: Number(totalCost.toFixed(2)),
        totalcostincludingdiscount: Number(totalAfterDiscount.toFixed(2)),
        totaltax: Number(totalTax.toFixed(2)),
        totalcostincludingtax: Number(totalWithTax.toFixed(2)),
        totaladvancedtax: Number(advanceTaxAmount.toFixed(2)),
        totalcostincludingadvancedtax: Number(totalWithAdvanceTax.toFixed(2)),
      },
    };
  }

  async findOnesalesinvoice(id: string) {
    const invoice = await this.prisma.salesInvoice.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            item: true,
          },
        },
        customer: true,
      },
    });
    if (!invoice) throw new NotFoundException('Invoice not found');
    return invoice;
  }

  async updatesalesinvoice(
    id: string,
    userId: string,
    dto: UpdateSalesInvoiceDto,
  ) {
    if (!dto.customer_id)
      throw new BadRequestException('customer id cannot be null');
    if (!dto.posting_date)
      throw new BadRequestException('posting date cannot be null');
    if (!dto.document_date)
      throw new BadRequestException('document date cannot be null');

    if (!dto.items || dto.items.length === 0)
      throw new BadRequestException('At least one item is required');
    const invoice = await this.findOnesalesinvoice(id);

    if (invoice.posted) {
      throw new BadRequestException('Invoice is already marked as posted');
    }

    const { items, ...invoiceData } = dto;

    const customer = await this.prisma.customer.findUnique({
      where: { id: invoiceData.customer_id },
    });
    if (!customer) throw new BadRequestException('Customer not found');
    const customerTaxAreaCodeId = customer.tax_area_code_id;

    const existingItems = await this.prisma.salesInvoiceItem.findMany({
      where: { sales_invoice_id: id },
    });

    const dtoItemIds = items.filter((i) => i.id).map((i) => i.id);
    const existingItemIds = existingItems.map((i) => i.id);

    const toDeleteIds = existingItemIds.filter(
      (dbId) => !dtoItemIds.includes(dbId),
    );
    if (toDeleteIds.length > 0) {
      await this.prisma.salesInvoiceItem.deleteMany({
        where: { id: { in: toDeleteIds } },
      });
    }

    let totalCost = 0;
    let totalTax = 0;
    let totalcostincludingdiscount = 0;
    let totalassessedunit = 0;
    let totalfedamount = 0;
    let totaldiscount = 0;
    let totalfurthertax = 0;

    for (const item of items) {
      const itemEntity = await this.prisma.item.findUnique({
        where: { id: item.item_id },
      });
      if (!itemEntity) throw new BadRequestException('Item not found');

      const taxPercent = itemEntity?.ratevalue ?? 0;
      const totalassessedunitamount = itemEntity?.assessed_unit * item.quantity;
      const fedValue =
        (totalassessedunitamount * (item.fed ? item.fed : 0)) / 100;
      const itemprice =
        itemEntity?.assessed_unit > 0
          ? itemEntity?.assessed_unit +
            (itemEntity?.assessed_unit * (item.fed ? item.fed : 0)) / 100
          : (item.unit_cost ?? 0);
      const totalItemCost = itemprice * item.quantity;
      const totalretailprice = (item?.retail_price ?? 0) * item.quantity;
      const discountAmount = (totalItemCost * (item.discount ?? 0)) / 100;
      const totalCostAfterDiscount = totalItemCost - discountAmount;
      const furtherTaxValue =
        ((totalretailprice > 0 ? totalretailprice : totalCostAfterDiscount) *
          (item.furthertax ? item.furthertax : 0)) /
        100;
      const itemTax =
        ((totalretailprice > 0 ? totalretailprice : totalCostAfterDiscount) *
          +taxPercent) /
        100;
      const totalItemCostWithTax = totalCostAfterDiscount + itemTax;
      const totalItemCostWithfurtherTax =
        totalItemCostWithTax + furtherTaxValue;

      totalCost += totalItemCost;
      totalTax += itemTax;
      totalcostincludingdiscount += totalCostAfterDiscount;
      totalassessedunit += totalassessedunitamount;
      totalfedamount += fedValue;
      totaldiscount += discountAmount;
      totalfurthertax += furtherTaxValue;

      const itemData = {
        item_id: item.item_id,
        quantity: item.quantity,
        unit_price: Number(itemprice?.toFixed(2)),
        retail_price: Number(item.retail_price?.toFixed(2)),
        assessed_unit: Number(itemEntity.assessed_unit?.toFixed(2)),
        total_assessed_unit: Number(totalassessedunitamount?.toFixed(2)),
        unit_cost: Number(itemEntity.unit_cost.toFixed(2)),
        total_cost: Number(totalItemCost.toFixed(2)),
        taxrate: Number(taxPercent.toFixed(2)),
        total_tax: Number(itemTax.toFixed(2)),
        totalcostincludingtax: Number(totalItemCostWithTax.toFixed(2)),
        totalcostincludingfurthertax: Number(
          totalItemCostWithfurtherTax.toFixed(2),
        ),
        discount: item?.discount ? Number(item.discount.toFixed(2)) : 0,
        discountamount: Number(discountAmount.toFixed(2)),
        furthertax: item.furthertax ? Number(item.furthertax.toFixed(2)) : 0,
        furtertaxamount: Number(furtherTaxValue.toFixed(2)),
        fed: item.fed ? Number(item.fed.toFixed(2)) : 0,
        fedamount: Number(fedValue.toFixed(2)),
        totalcostincludingdiscount: Number(totalCostAfterDiscount.toFixed(2)),
        sales_invoice_id: id,
      };

      if (item.id && existingItemIds.includes(item.id)) {
        await this.prisma.salesInvoiceItem.update({
          where: { id: item.id },
          data: itemData,
        });
      } else {
        // Create
        await this.prisma.salesInvoiceItem.create({ data: itemData });
      }
    }
    const totalCostIncludingTax = totalcostincludingdiscount + totalTax;
    const totalCostIncludingfurtherTax =
      totalCostIncludingTax + totalfurthertax;
    const advanceTaxPercent = dto.advancetax || 0;
    const advanceTaxValue =
      (totalCostIncludingfurtherTax * advanceTaxPercent) / 100;
    const totalWithAdvanceTax = totalCostIncludingfurtherTax + advanceTaxValue;

    return this.prisma.salesInvoice.update({
      where: { id },
      data: {
        customer_id: invoiceData.customer_id,
        notes: invoiceData.notes,
        scenario_no: dto.scenario_no,
        auth_id: userId,
        posting_date: new Date(invoiceData.posting_date),
        document_date: new Date(invoiceData.document_date),
        totalassessedunit: Number(totalassessedunit.toFixed(2)),
        totalfedamount: Number(totalfedamount.toFixed(2)),
        totalcost: Number(totalCost.toFixed(2)),
        totaldiscount: Number(totaldiscount.toFixed(2)),
        totalfurthertax: Number(totalfurthertax.toFixed(2)),
        totaltax: Number(totalTax.toFixed(2)),
        totalcostincludingdiscount: Number(
          totalcostincludingdiscount.toFixed(2),
        ),
        totalcostincludingtax: Number(totalCostIncludingTax.toFixed(2)),
        totalcostincludingfurthertax: Number(
          totalCostIncludingfurtherTax.toFixed(2),
        ),
        advancedtax: Number(advanceTaxPercent.toFixed(2)),
        totaladvancedtax: Number(advanceTaxValue.toFixed(2)),
        totalcostincludingadvancedtax: Number(totalWithAdvanceTax.toFixed(2)),
      },
      include: {
        items: true,
      },
    });
  }

  async postsalesinvoice(id: string, userId: string) {
    const invoice = await this.findOnesalesinvoice(id);

    if (invoice.posted) {
      throw new BadRequestException('Invoice is already marked as posted');
    }

    const authProfile = await this.prisma.profile.findFirst({
      orderBy: {
        createdAt: 'desc', // or 'asc'
      },
    });
    if (
      !authProfile?.ntn_no &&
      !authProfile?.name &&
      !authProfile?.province &&
      !authProfile?.address &&
      !authProfile?.url &&
      !authProfile?.token
    ) {
      throw new BadRequestException('fill company profile details');
    }

    // ✅ Validate: No duplicate item names
    const duplicateItemNames = invoice.items
      .map((item) => item.item.name?.trim())
      .filter((name, index, arr) => name && arr.indexOf(name) !== index);

    if (duplicateItemNames.length > 0) {
      throw new BadRequestException(
        `Invoice contains duplicate item(s) name: ${[...new Set(duplicateItemNames)].join(', ')}`,
      );
    }

    // Prepare payload for FBR
    const fbrPayload = {
      invoiceType: 'Sale Invoice',
      invoiceDate: invoice.document_date.toISOString().split('T')[0],
      sellerNTNCNIC: authProfile?.ntn_no ?? '',
      sellerBusinessName: authProfile?.name ?? '',
      sellerProvince: authProfile?.province ?? '',
      sellerAddress: authProfile?.city ?? '',
      buyerNTNCNIC: invoice.customer?.ntn_no ?? '',
      buyerBusinessName: invoice.customer?.name ?? '',
      buyerProvince: invoice.customer?.province ?? '',
      buyerAddress: invoice.customer?.city ?? '',
      buyerRegistrationType: invoice.customer.registation_status
        ? 'Registered'
        : 'Unregistered',
      invoiceRefNo: '',
      scenarioId: invoice.scenario_no,
      items: invoice.items.map((item) => ({
        hsCode: item.item.hs_code ?? '',
        productDescription: item.item.name ?? '',
        rate: item.item.ratedesc,
        uoM: item.item.uom ?? '',
        quantity: item.quantity,
        totalValues: item.totalcostincludingtax,
        valueSalesExcludingST: item.totalcostincludingdiscount,
        fixedNotifiedValueOrRetailPrice: item.retail_price,
        salesTaxApplicable: item.total_tax ?? 0,
        salesTaxWithheldAtSource: 0,
        extraTax: '',
        furtherTax: item.furtertaxamount ?? 0,
        sroScheduleNo: item.item.sroscheduleno,
        fedPayable: item.fedamount,
        discount: item.discountamount ?? 0,
        saleType: item.item.saletype,
        sroItemSerialNo: item.item.itemserialno,
      })),
    };
    console.log('data', fbrPayload);
    const url = authProfile?.url ?? '';
    const token = authProfile?.token ?? '';
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    try {
      const fbrResponse = await firstValueFrom(
        this.http.post(url, fbrPayload, { headers }),
      );

      const fbrData = fbrResponse?.data;
      const isValid = fbrData?.validationResponse?.statusCode === '00';

      if (!isValid) {
        const validationResponse = fbrData?.validationResponse;
        const fallbackErrors = validationResponse?.invoiceStatuses || [];

        // Try main error
        let errorMessage = validationResponse?.error;

        // If main error is empty, find the first non-empty error from invoiceStatuses
        if (!errorMessage || errorMessage.trim() === '') {
          const firstNonEmpty = fallbackErrors.find(
            (e) => e.error && e.error.trim() !== '',
          );
          errorMessage =
            firstNonEmpty?.error || 'Unknown validation error from FBR.';
        }

        throw new BadRequestException({
          message: ` ${errorMessage}`,
        });
      }

      const fbrInvoiceNumber = fbrData?.invoiceNumber;

      return this.prisma.$transaction(async (tx) => {
        // Update invoice as posted and save fbrInvoiceNo
        const updatedInvoice = await tx.salesInvoice.update({
          where: { id },
          data: {
            posted: true,
            fbrinvoiceno: fbrInvoiceNumber,
            auth_id: userId,
          },
        });

        await tx.customerLedgerEntry.create({
          data: {
            customer_id: invoice.customer_id,
            invoice_id: invoice.id, // ✅ replaces purchase_invoice_id
            document_type: 'SalesInvoice',
          },
        });

        for (const item of invoice.items) {
          await tx.itemLedgerEntry.create({
            data: {
              item_id: item.item_id,
              invoice_id: invoice.id, // ✅ replaces purchase_invoice_id
              invoice_item_id: item.id,
              document_type: 'SalesInvoice',
              source_type: 'customer',
            },
          });

          await tx.item.update({
            where: { id: item.item_id },
            data: {
              total_quantity: {
                decrement: item.quantity,
              },
            },
          });
        }

        return {
          message: 'Invoice posted and sent to FBR successfully',
          invoice: updatedInvoice,
          fbrResponse: fbrResponse.data,
        };
      });
    } catch (error) {
      console.error('FBR Error:', error?.response?.data || error.message);
      throw new BadRequestException(
        error?.response?.data?.message || error.message,
      );
    }
  }

  async removesalesinvoice(id: string) {
    const invoice = await this.findOnesalesinvoice(id);

    if (invoice.posted) {
      throw new BadRequestException('Invoice is already marked as posted');
    }
    await this.prisma.salesInvoiceItem.deleteMany({
      where: { sales_invoice_id: id },
    });
    return this.prisma.salesInvoice.delete({ where: { id } });
  }

  private initTotalData() {
    return {
      totalcost: 0,
      totalcostincludingdiscount: 0,
      totaltax: 0,
      totalcostincludingtax: 0,
      furthertax: 0,
      totalfurthertax: 0,
      totalcostincludingfurthertax: 0,
      advancedtax: 0,
      totaladvancedtax: 0,
      totalcostincludingadvancedtax: 0,
      total_quantity: 0,
    };
  }

  private sumTotalData(totalBlocks: any[]) {
    const sum = this.initTotalData();

    for (const block of totalBlocks) {
      Object.keys(sum).forEach((key) => {
        sum[key] += block[key] ?? 0;
      });
    }

    return sum;
  }

  async getUnifiedInvoiceReport(
    filters: InvoiceReportFilters,
  ): Promise<UnifiedInvoiceReport> {
    const {
      document_type,
      document_date_from,
      document_date_to,
      customer_id = null,
    } = filters;

    let salesInvoiceReport: SalesReport = {
      invoices: [],
      totalData: this.initTotalData(),
    };

    let salesReturnReport: SalesReturnInvoiceReport = {
      invoices: [],
      totalData: this.initTotalData(),
    };

    const docDateFilter = {
      gte: new Date(document_date_from),
      lte: new Date(document_date_to),
    };

    if (!document_type || document_type === 'SalesInvoice') {
      salesInvoiceReport = await this.getAllSalesInvoiceItemsReport({
        document_date_range: docDateFilter,
        customer_id: customer_id ?? undefined,
      });
    }

    if (!document_type || document_type === 'SalesReturn') {
      salesReturnReport = await this.getSalesReturnInvoiceSummary({
        document_date_range: docDateFilter,
        customer_id: customer_id ?? undefined,
      });
    }

    const combinedReport = {
      invoices: [...salesInvoiceReport.invoices, ...salesReturnReport.invoices],
      totalData: this.sumTotalData([
        salesInvoiceReport.totalData,
        salesReturnReport.totalData,
      ]),
    };

    return combinedReport;
  }

  async getAllSalesInvoiceItemsReport(filters?: {
    document_date_range?: { gte: Date; lte: Date };
    customer_id?: string;
  }): Promise<SalesReport> {
    const allInvoices = await this.prisma.salesInvoice.findMany({
      where: {
        posted: true,
        ...(filters?.document_date_range && {
          document_date: {
            gte: filters.document_date_range.gte,
            lte: filters.document_date_range.lte,
          },
        }),
        ...(filters?.customer_id && {
          customer_id: filters.customer_id,
        }),
      },
      include: {
        items: {
          include: {
            item: true,
          },
        },
        customer: true,
      },
    });

    const report: SalesReport = {
      invoices: [],
      totalData: {
        totalcost: 0,
        totalcostincludingdiscount: 0,
        totaltax: 0,
        totalcostincludingtax: 0,
        advancedtax: 0,
        totaladvancedtax: 0,
        totalcostincludingadvancedtax: 0,
        total_quantity: 0,
      },
    };

    for (const invoice of allInvoices) {
      let total_quantity = 0;

      const headerData = {
        invoice_no: invoice.invoice_no,
        customer_no: invoice.customer.customer_no,
        customer_name: invoice.customer.name,
        posting_date: invoice.posting_date,
        document_date: invoice.posting_date,
        fbrinvoiceno: invoice.fbrinvoiceno,
      };

      const items = invoice.items.map((invItem) => {
        total_quantity += invItem.quantity;

        return {
          ...invItem,
        };
      });

      const headerTotalData = {
        totalcost: invoice.totalcost,
        totalcostincludingdiscount: invoice.totalcostincludingdiscount,
        totaltax: invoice.totaltax,
        totalcostincludingtax: invoice.totalcostincludingtax,
        advancedtax: invoice.advancedtax,
        totaladvancedtax: invoice.totaladvancedtax,
        totalcostincludingadvancedtax: invoice.totalcostincludingadvancedtax,
        total_quantity,
      };

      // Add to overall totals
      const total = report.totalData;
      total.totalcost += invoice.totalcost;
      total.totalcostincludingdiscount += invoice.totalcostincludingdiscount;
      total.totaltax += invoice.totaltax;
      total.totalcostincludingtax += invoice.totalcostincludingtax;
      total.advancedtax += invoice.advancedtax;
      total.totaladvancedtax += invoice.totaladvancedtax;
      total.totalcostincludingadvancedtax +=
        invoice.totalcostincludingadvancedtax;
      total.total_quantity += total_quantity;

      report.invoices.push({
        headerData,
        items,
        headerTotalData,
      });
    }

    return report;
  }

  async getSalesSummary(filters?: {
    documentType?: 'SalesInvoice' | 'SalesReturn';
    customerId?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const saleFilter: any = {};
    const returnFilter: any = {};

    if (filters?.customerId) {
      saleFilter.customer_id = filters.customerId;
      returnFilter.customer_id = filters.customerId;
    }

    if (filters?.startDate && filters?.endDate) {
      const startDate = new Date(filters.startDate);
      const endDate = new Date(filters.endDate);

      saleFilter.document_date = { gte: startDate, lte: endDate };
      returnFilter.document_date = { gte: startDate, lte: endDate };
    }

    let results: any[] = [];

    if (!filters?.documentType || filters.documentType === 'SalesInvoice') {
      const salesInvoices = await this.prisma.salesInvoice.findMany({
        where: saleFilter,
        include: {
          customer: true,
          auth: true,
          items: true,
        },
      });

      results = results.concat(
        salesInvoices.map((inv) => ({
          type: 'SalesInvoice',
          ...inv,
        })),
      );
    }

    if (!filters?.documentType || filters.documentType === 'SalesReturn') {
      const salesReturns = await this.prisma.salesReturnInvoice.findMany({
        where: returnFilter,
        include: {
          customer: true,
          auth: true,
          items: true,
          salesinvoice: true,
        },
      });

      results = results.concat(
        salesReturns.map((ret) => ({
          type: 'SalesReturn',
          ...ret,
        })),
      );
    }

    return results.sort(
      (a, b) =>
        new Date(b.document_date).getTime() -
        new Date(a.document_date).getTime(),
    );
  }

  async generateSalesInvoiceReportPdf(): Promise<Buffer> {
    const reportData = await this.getAllSalesInvoiceItemsReport();

    // Compile Handlebars Template
    const templatePath = path.join(
      process.cwd(),
      'src/templates/sales-report.hbs',
    );
    Handlebars.registerHelper('formatDate', function (date: string | Date) {
      if (!date) return '';
      const d = new Date(date);
      return d.toLocaleDateString('en-GB'); // Outputs: DD/MM/YYYY
    });
    const templateHtml = await fs.readFile(templatePath, 'utf-8');
    const compile = Handlebars.compile(templateHtml);
    const finalHtml = compile(reportData);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(finalHtml, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      landscape: true,
    });
    await browser.close();

    return Buffer.from(pdfBuffer);
  }

  async createsalesreturninvoice(
    userId: string,
    dto: CreateSalesReturnInvoiceDto,
  ) {
    if (!dto.sales_invoice_id)
      throw new BadRequestException('sales_invoice_id is required');
    if (!dto.posting_date)
      throw new BadRequestException('posting_date is required');
    if (!dto.document_date)
      throw new BadRequestException('document_date is required');
    if (!dto.items || dto.items.length === 0)
      throw new BadRequestException('At least one return item is required');

    const originalInvoice = await this.prisma.salesInvoice.findUnique({
      where: { id: dto.sales_invoice_id },
      include: {
        items: {
          include: {
            item: true,
          },
        },
        customer: true,
      },
    });
    if (!originalInvoice)
      throw new NotFoundException('Sales invoice not found');

    if (!originalInvoice.posted)
      throw new BadRequestException('Sales Invoice must be posted');

    const existingUnpostedReturn =
      await this.prisma.salesReturnInvoice.findFirst({
        where: {
          sales_invoice_id: dto.sales_invoice_id,
          posted: false,
        },
      });

    if (existingUnpostedReturn) {
      throw new BadRequestException(
        `A return for this Sales Invoice already exists and is not posted yet (Return No: ${existingUnpostedReturn.invoice_no})`,
      );
    }

    const customer_id = originalInvoice.customer_id;
    const originalItemsMap = new Map<
      string,
      {
        item_id: string;
        quantity: number;
        unit_cost: number;
        unit_price: number;
        retail_price: number;
        taxrate: number;
        discount: number;
        furthertax: number;
        assessed_unit: number;
        fed: number;
        tax_group_code_id: string;
      }
    >();

    for (const item of originalInvoice.items) {
      originalItemsMap.set(item.id, {
        item_id: item.item_id,
        quantity: item.quantity,
        unit_cost: item.unit_cost,
        unit_price: item.unit_price,
        retail_price: item.retail_price,
        assessed_unit: item.assessed_unit,
        taxrate: item.taxrate,
        discount: item.discount,
        furthertax: item.furthertax,
        fed: item.fed,
        tax_group_code_id: item.item?.tax_group_code_id,
      });
    }

    if (dto.items.length > originalInvoice.items.length) {
      throw new BadRequestException(
        'Too many return items compared to sales invoice',
      );
    }

    const seen = new Set<string>();
    let totalCost = 0;
    let totalTax = 0;
    let totalcostincludingdiscount = 0;
    let totalassessedunit = 0;
    let totalfedamount = 0;
    let totaldiscount = 0;
    let totalfurthertax = 0;

    const itemsData = await Promise.all(
      dto.items.map(async (item) => {
        if (!item.id)
          throw new BadRequestException('SalesInvoiceItem ID is required');

        if (seen.has(item.id)) {
          throw new BadRequestException(
            `Duplicate return for SalesInvoiceItem ID: ${item.id}`,
          );
        }
        seen.add(item.id);

        const original = originalItemsMap.get(item.id);
        if (!original) {
          throw new BadRequestException(
            `Item with SalesInvoiceItem ID ${item.id} not found in original invoice`,
          );
        }

        if (item.quantity > original.quantity) {
          throw new BadRequestException(
            `Return quantity ${item.quantity} exceeds original invoice quantity ${original.quantity} for item ${original.item_id}`,
          );
        }

        const totalassessedunitamount = original?.assessed_unit * item.quantity;
        const fedValue =
          (totalassessedunitamount * (original.fed ? original.fed : 0)) / 100;
        const itemprice = original.unit_price;
        const totalItemCost = itemprice * item.quantity;
        const totalretailprice = (original?.retail_price ?? 0) * item.quantity;
        const discountAmount = (totalItemCost * (original.discount ?? 0)) / 100;
        const totalCostAfterDiscount = totalItemCost - discountAmount;
        const furtherTaxValue =
          ((totalretailprice > 0 ? totalretailprice : totalCostAfterDiscount) *
            (original.furthertax ? original.furthertax : 0)) /
          100;

        const taxPercent = original.taxrate || 0;
        const itemTax =
          ((totalretailprice > 0 ? totalretailprice : totalCostAfterDiscount) *
            +taxPercent) /
          100;

        const totalItemCostWithTax = totalCostAfterDiscount + itemTax;
        const totalItemCostWithfurtherTax =
          totalItemCostWithTax + furtherTaxValue;

        totalCost += totalItemCost;
        totalTax += itemTax;
        totalcostincludingdiscount += totalCostAfterDiscount;
        totalassessedunit += totalassessedunitamount;
        totalfedamount += fedValue;
        totaldiscount += discountAmount;
        totalfurthertax += furtherTaxValue;

        return {
          item_id: original.item_id, // use actual item_id, not the SalesInvoiceItem ID
          quantity: item.quantity,
          unit_price: Number(itemprice?.toFixed(2)),
          retail_price: Number(original.retail_price?.toFixed(2)),
          assessed_unit: Number(original.assessed_unit?.toFixed(2)),
          total_assessed_unit: Number(totalassessedunitamount?.toFixed(2)),
          unit_cost: Number(original.unit_cost.toFixed(2)),
          total_cost: Number(totalItemCost.toFixed(2)),
          taxrate: Number(taxPercent.toFixed(2)),
          total_tax: Number(itemTax.toFixed(2)),
          totalcostincludingtax: Number(totalItemCostWithTax.toFixed(2)),
          totalcostincludingfurthertax: Number(
            totalItemCostWithfurtherTax.toFixed(2),
          ),
          discount: original?.discount
            ? Number(original.discount.toFixed(2))
            : 0,
          discountamount: Number(discountAmount.toFixed(2)),
          furthertax: original.furthertax
            ? Number(original.furthertax.toFixed(2))
            : 0,
          furtertaxamount: Number(furtherTaxValue.toFixed(2)),
          fed: original.fed ? Number(original.fed.toFixed(2)) : 0,
          fedamount: Number(fedValue.toFixed(2)),
          totalcostincludingdiscount: Number(totalCostAfterDiscount.toFixed(2)),
        };
      }),
    );

    const latest = await this.prisma.salesReturnInvoice.findFirst({
      orderBy: { createdAt: 'desc' },
      select: { invoice_no: true },
      where: { invoice_no: { startsWith: 'SR-' } },
    });

    let nextInvoiceNo = 'SR-00000001';
    if (latest?.invoice_no) {
      const lastNum = parseInt(latest.invoice_no.replace('SR-', ''), 10);
      nextInvoiceNo = `SR-${(lastNum + 1).toString().padStart(8, '0')}`;
    }

    const totalCostIncludingTax = totalcostincludingdiscount + totalTax;
    const totalCostIncludingfurtherTax =
      totalCostIncludingTax + totalfurthertax;
    const advanceTaxPercent = originalInvoice.advancedtax || 0;
    const advanceTaxValue =
      (totalCostIncludingfurtherTax * advanceTaxPercent) / 100;
    const totalWithAdvanceTax = totalCostIncludingfurtherTax + advanceTaxValue;

    const returnInvoice = await this.prisma.salesReturnInvoice.create({
      data: {
        invoice_no: nextInvoiceNo,
        customer_id,
        sales_invoice_id: dto.sales_invoice_id,
        posting_date: new Date(dto.posting_date),
        document_date: new Date(dto.document_date),
        notes: dto.notes,
        scenario_no: dto.scenario_no,
        auth_id: userId,
        totalassessedunit: Number(totalassessedunit.toFixed(2)),
        totalfedamount: Number(totalfedamount.toFixed(2)),
        totalcost: Number(totalCost.toFixed(2)),
        totaldiscount: Number(totaldiscount.toFixed(2)),
        totalfurthertax: Number(totalfurthertax.toFixed(2)),
        totaltax: Number(totalTax.toFixed(2)),
        totalcostincludingdiscount: Number(
          totalcostincludingdiscount.toFixed(2),
        ),
        totalcostincludingtax: Number(totalCostIncludingTax.toFixed(2)),
        totalcostincludingfurthertax: Number(
          totalCostIncludingfurtherTax.toFixed(2),
        ),
        advancedtax: Number(advanceTaxPercent.toFixed(2)),
        totaladvancedtax: Number(advanceTaxValue.toFixed(2)),
        totalcostincludingadvancedtax: Number(totalWithAdvanceTax.toFixed(2)),
        items: {
          create: itemsData,
        },
      },
      include: { items: true },
    });

    return returnInvoice;
  }

  findAllsalesreturninvoices(posted?: boolean) {
    return this.prisma.salesReturnInvoice.findMany({
      where: posted !== undefined ? { posted } : {},
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        items: {
          include: {
            item: true,
          },
        },
        customer: true,
      },
    });
  }

  async findOnesalesreturninvoice(id: string) {
    const invoice = await this.prisma.salesReturnInvoice.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            item: true,
          },
        },
        salesinvoice: {
          include: {
            items: true,
          },
        },
        customer: true,
      },
    });

    if (!invoice) throw new NotFoundException('Invoice not found');

    // Manually get the salesInvoice data for calculations only
    const salesInvoice = await this.prisma.salesInvoice.findUnique({
      where: { id: invoice.sales_invoice_id },
      include: { items: true },
    });

    if (!salesInvoice) throw new NotFoundException('sales Invoice not found');

    const originalItemQtyMap = new Map<string, number>();
    for (const item of salesInvoice.items) {
      originalItemQtyMap.set(item.id, item.quantity);
    }

    const postedReturns = await this.prisma.salesReturnInvoice.findMany({
      where: {
        sales_invoice_id: invoice.sales_invoice_id,
        posted: true,
      },
      include: { items: true },
    });

    const returnedQtyMap = new Map<string, number>();
    for (const ret of postedReturns) {
      for (const item of ret.items) {
        const current = returnedQtyMap.get(item.item_id) || 0;
        returnedQtyMap.set(item.item_id, current + item.quantity);
      }
    }

    const enhancedItems = invoice.items.map((item) => {
      const matchingSalesInvoiceItem = salesInvoice.items.find(
        (sii) => sii.item_id === item.item_id,
      );

      const returnable_quantity = matchingSalesInvoiceItem?.quantity ?? 0;
      const returned_quantity = returnedQtyMap.get(item.item_id) ?? 0;

      return {
        ...item,
        returnable_quantity,
        returned_quantity,
      };
    });

    // ✅ Explicitly remove `salesinvoice` if present
    const { salesinvoice: _saleInvoiceFromReturn, ...cleanedInvoice } =
      invoice as any;

    return {
      ...cleanedInvoice,
      items: enhancedItems,
    };
  }

  async updateSalesReturnInvoice(
    id,
    userId: string,
    dto: UpdateSalesReturnInvoiceDto,
  ) {
    const invoice = await this.findOnesalesreturninvoice(id);
    if (invoice.posted)
      throw new BadRequestException('Cannot edit a posted return invoice');

    const originalItemMap = new Map<string, number>();
    invoice.items.forEach((item) => {
      originalItemMap.set(item.item_id, item.quantity);
    });

    const existingReturnItems = invoice.items;
    const incomingItemIds = dto.items.map((i) => i.id);
    const existingItemMap = new Map<
      string,
      (typeof existingReturnItems)[number]
    >();
    existingReturnItems.forEach((item) => existingItemMap.set(item.id, item));

    // Delete missing items
    for (const item of existingReturnItems) {
      if (!incomingItemIds.includes(item.id)) {
        await this.prisma.salesReturnInvoiceItem.delete({
          where: { id: item.id },
        });
      }
    }

    // Update items
    for (const item of dto.items) {
      const existing = existingItemMap.get(item.id);
      if (!existing)
        throw new BadRequestException(`Invalid item id: ${item.id}`);

      const originalQty = originalItemMap.get(existing.item_id) || 0;
      console.log(originalQty);
      if ((item.quantity ?? 0) > originalQty) {
        throw new BadRequestException(
          `Quantity (${item.quantity}) exceeds original invoice quantity (${originalQty}) for item ${existing.item_id}`,
        );
      }

      const totalassessedunitamount =
        existing?.assessed_unit * (item.quantity ?? 0);
      const fedValue =
        (totalassessedunitamount * (existing.fed ? existing.fed : 0)) / 100;
      const itemprice = existing.unit_price;
      const totalItemCost = itemprice * (item.quantity ?? 0);
      const totalretailprice =
        (existing?.retail_price ?? 0) * (item.quantity ?? 0);
      const discountAmount = (totalItemCost * (existing.discount ?? 0)) / 100;
      const totalCostAfterDiscount = totalItemCost - discountAmount;
      const furtherTaxValue =
        ((totalretailprice > 0 ? totalretailprice : totalCostAfterDiscount) *
          (existing.furthertax ? existing.furthertax : 0)) /
        100;
      const taxPercent = existing.taxrate || 0;
      const itemTax =
        ((totalretailprice > 0 ? totalretailprice : totalCostAfterDiscount) *
          +taxPercent) /
        100;

      const totalItemCostWithTax = totalCostAfterDiscount + itemTax;
      const totalItemCostWithfurtherTax =
        totalItemCostWithTax + furtherTaxValue;

      await this.prisma.salesReturnInvoiceItem.update({
        where: { id: item.id },
        data: {
          quantity: item.quantity,
          unit_price: Number(itemprice?.toFixed(2)),
          retail_price: Number(existing.retail_price?.toFixed(2)),
          assessed_unit: Number(existing.assessed_unit?.toFixed(2)),
          total_assessed_unit: Number(totalassessedunitamount?.toFixed(2)),
          unit_cost: Number(existing.unit_cost.toFixed(2)),
          total_cost: Number(totalItemCost.toFixed(2)),
          taxrate: Number(taxPercent.toFixed(2)),
          total_tax: Number(itemTax.toFixed(2)),
          totalcostincludingtax: Number(totalItemCostWithTax.toFixed(2)),
          totalcostincludingfurthertax: Number(
            totalItemCostWithfurtherTax.toFixed(2),
          ),
          discount: existing?.discount
            ? Number(existing.discount.toFixed(2))
            : 0,
          discountamount: Number(discountAmount.toFixed(2)),
          furthertax: existing.furthertax
            ? Number(existing.furthertax.toFixed(2))
            : 0,
          furtertaxamount: Number(furtherTaxValue.toFixed(2)),
          fed: existing.fed ? Number(existing.fed.toFixed(2)) : 0,
          fedamount: Number(fedValue.toFixed(2)),
          totalcostincludingdiscount: Number(totalCostAfterDiscount.toFixed(2)),
        },
      });
    }

    // Recalculate header totals
    const updatedItems = await this.prisma.salesReturnInvoiceItem.findMany({
      where: { sales_return_invoice_id: invoice.id },
    });

    let totalCost = 0;
    let totalTax = 0;
    let totalcostincludingdiscount = 0;
    let totalassessedunit = 0;
    let totalfedamount = 0;
    let totaldiscount = 0;
    let totalfurthertax = 0;
    for (const item of updatedItems) {
      totalCost += item.total_cost;
      totalTax += item.total_tax;
      totalcostincludingdiscount += item.totalcostincludingdiscount;
      totalassessedunit += item.total_assessed_unit;
      totalfedamount += item.fedamount;
      totaldiscount += item.discountamount;
      totalfurthertax += item.furtertaxamount;
    }

    const totalCostIncludingTax = totalcostincludingdiscount + totalTax;
    const totalCostIncludingfurtherTax =
      totalCostIncludingTax + totalfurthertax;
    const advanceTaxPercent = invoice.advancedtax || 0;
    const advanceTaxValue = (totalCostIncludingfurtherTax * advanceTaxPercent) / 100;
    const totalWithAdvanceTax = totalCostIncludingfurtherTax + advanceTaxValue;

    await this.prisma.salesReturnInvoice.update({
      where: { id: invoice.id },
      data: {
        posting_date: new Date(dto.posting_date),
        document_date: new Date(dto.document_date),
        notes: dto.notes,
        scenario_no: dto.scenario_no,
        auth_id: userId,
        totalassessedunit: Number(totalassessedunit.toFixed(2)),
        totalfedamount: Number(totalfedamount.toFixed(2)),
        totalcost: Number(totalCost.toFixed(2)),
        totaldiscount: Number(totaldiscount.toFixed(2)),
        totalfurthertax: Number(totalfurthertax.toFixed(2)),
        totaltax: Number(totalTax.toFixed(2)),
        totalcostincludingdiscount: Number(
          totalcostincludingdiscount.toFixed(2),
        ),
        totalcostincludingtax: Number(totalCostIncludingTax.toFixed(2)),
        totalcostincludingfurthertax: Number(
          totalCostIncludingfurtherTax.toFixed(2),
        ),
        advancedtax: Number(advanceTaxPercent.toFixed(2)),
        totaladvancedtax: Number(advanceTaxValue.toFixed(2)),
        totalcostincludingadvancedtax: Number(totalWithAdvanceTax.toFixed(2)),
      },
    });

    return { message: 'Sales return invoice updated successfully' };
  }

  async postsalesreturninvoice(id: string, userId: string) {
    const invoice = await this.findOnesalesreturninvoice(id);
    // const saleinvoice = await this.findOnesalesinvoice(
    //   invoice.sales_invoice_id,
    // );

    if (invoice.posted) {
      throw new BadRequestException('Invoice is already marked as posted');
    }

    // const authProfile = await this.prisma.profile.findFirst({
    //   orderBy: {
    //     createdAt: 'desc', // or 'asc'
    //   },
    // });
    // if (
    //   !authProfile?.ntn_no &&
    //   !authProfile?.name &&
    //   !authProfile?.province &&
    //   !authProfile?.address &&
    //   !authProfile?.url &&
    //   !authProfile?.token
    // ) {
    //   throw new BadRequestException('fill company profile details');
    // }

    // ✅ Validate: No duplicate item names
    // const duplicateItemNames = invoice.items
    //   .map((item) => item.item.name?.trim())
    //   .filter((name, index, arr) => name && arr.indexOf(name) !== index);

    // if (duplicateItemNames.length > 0) {
    //   throw new BadRequestException(
    //     `Invoice contains duplicate item(s) name: ${[...new Set(duplicateItemNames)].join(', ')}`,
    //   );
    // }
    // Prepare payload for FBR
    // const fbrPayload = {
    //   invoiceType: 'Debit Note',
    //   invoiceDate: invoice.document_date.toISOString().split('T')[0],
    //   sellerNTNCNIC: authProfile?.ntn_no ?? '',
    //   sellerBusinessName: authProfile?.name ?? '',
    //   sellerProvince: authProfile?.province ?? '',
    //   sellerAddress: authProfile?.city ?? '',
    //   buyerNTNCNIC: invoice.customer?.ntn_no ?? '',
    //   buyerBusinessName: invoice.customer?.name ?? '',
    //   buyerProvince: invoice.customer?.province ?? '',
    //   buyerAddress: invoice.customer?.city ?? '',
    //   buyerRegistrationType: invoice.customer.registation_status
    //     ? 'Registered'
    //     : 'Unregistered',
    //   scenarioId: 'SN001',
    //   invoiceRefNo: saleinvoice.fbrinvoiceno,
    //   items: invoice.items.map((item) => ({
    //     hsCode: item.item.hs_code ?? '',
    //     productDescription: item.item.name ?? '',
    //     rate: `${item.taxrate}%`,
    //     uoM: item.item.baseUnitOfMeasure.code ?? '',
    //     quantity: item.quantity,
    //     totalValues: 0,
    //     valueSalesExcludingST: item.totalcostincludingdiscount,
    //     fixedNotifiedValueOrRetailPrice: 0,
    //     salesTaxApplicable: item.total_tax ?? 0,
    //     salesTaxWithheldAtSource: 0,
    //     extraTax: '',
    //     furtherTax: invoice.totalfurthertax ?? 0,
    //     sroScheduleNo: '',
    //     fedPayable: 0,
    //     discount: item.discountamount ?? 0,
    //     saleType: 'Goods at standard rate (default)',
    //     sroItemSerialNo: '',
    //   })),
    // };

    // console.log(fbrPayload)

    // const url = authProfile?.url ?? '';
    // const token = authProfile?.token ?? '';
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    //   'Content-Type': 'application/json',
    // };

    try {
      // const fbrResponse = await firstValueFrom(
      //   this.http.post(url, fbrPayload, { headers }),
      // );

      // const fbrData = fbrResponse?.data;
      // console.log(fbrData,'fbr data')
      // const isValid = fbrData?.validationResponse?.statusCode === '00';

      // if (!isValid) {
      //   const validationResponse = fbrData?.validationResponse;
      //   const fallbackErrors = validationResponse?.invoiceStatuses || [];

      //   // Try main error
      //   let errorMessage = validationResponse?.error;

      //   // If main error is empty, find the first non-empty error from invoiceStatuses
      //   if (!errorMessage || errorMessage.trim() === '') {
      //     const firstNonEmpty = fallbackErrors.find(
      //       (e) => e.error && e.error.trim() !== '',
      //     );
      //     errorMessage =
      //       firstNonEmpty?.error || 'Unknown validation error from FBR.';
      //   }

      //   throw new BadRequestException({
      //     message: ` ${errorMessage}`,
      //   });
      // }

      // const fbrInvoiceNumber = fbrData?.invoiceNumber;

      return this.prisma.$transaction(async (tx) => {
        // Update invoice as posted and save fbrInvoiceNo
        const updatedInvoice = await tx.salesReturnInvoice.update({
          where: { id },
          data: {
            posted: true,
            auth_id: userId,
            // fbrinvoiceno: fbrInvoiceNumber,
          },
        });

        await tx.customerLedgerEntry.create({
          data: {
            customer_id: invoice.customer_id,
            invoice_id: invoice.id, // ✅ replaces purchase_invoice_id
            document_type: 'SalesReturn',
          },
        });

        for (const item of invoice.items) {
          await tx.itemLedgerEntry.create({
            data: {
              item_id: item.item_id,
              invoice_id: invoice.id, // ✅ replaces purchase_invoice_id
              invoice_item_id: item.id,
              document_type: 'SalesReturn',
              source_type: 'customer',
            },
          });

          await tx.item.update({
            where: { id: item.item_id },
            data: {
              total_quantity: {
                increment: item.quantity,
              },
            },
          });
        }

        return {
          message: 'Invoice posted and sent to FBR successfully',
          invoice: updatedInvoice,
          // fbrResponse: fbrResponse.data,
        };
      });
    } catch (error) {
      console.error('FBR Error:', error?.response?.data || error.message);
      throw new BadRequestException(
        error?.response?.data?.message || error.message,
      );
    }
  }

  async removesalesreturninvoice(id: string) {
    const invoice = await this.findOnesalesreturninvoice(id);
    if (invoice.posted)
      throw new BadRequestException('Cannot edit a posted return invoice');
    await this.prisma.salesReturnInvoiceItem.deleteMany({
      where: { sales_return_invoice_id: id },
    });
    return this.prisma.salesReturnInvoice.delete({ where: { id } });
  }

  async getSalesReturnInvoiceSummary(filters?: {
    document_date_range?: { gte: Date; lte: Date };
    customer_id?: string;
  }): Promise<SalesReturnInvoiceReport> {
    const salesReturnInvoices = await this.prisma.salesReturnInvoice.findMany({
      where: {
        posted: true,
        ...(filters?.document_date_range && {
          document_date: {
            gte: filters.document_date_range.gte,
            lte: filters.document_date_range.lte,
          },
        }),
        ...(filters?.customer_id && {
          customer_id: filters.customer_id,
        }),
      },
      include: {
        salesinvoice: true,
        items: {
          include: {
            item: true,
          },
        },
        customer: true,
      },
    });

    const report: SalesReturnInvoiceReport = {
      invoices: [],
      totalData: {
        totalcost: 0,
        totalcostincludingdiscount: 0,
        totaltax: 0,
        totalcostincludingtax: 0,
        advancedtax: 0,
        totaladvancedtax: 0,
        totalcostincludingadvancedtax: 0,
        total_quantity: 0,
      },
    };

    for (const invoice of salesReturnInvoices) {
      let total_quantity = 0;

      const headerData = {
        invoice_no: invoice.invoice_no,
        sales_invoice_no: invoice.salesinvoice.invoice_no,
        customer_name: invoice.customer?.name ?? 'N/A',
        posting_date: invoice.posting_date,
        document_date: invoice.posting_date,
        fbrinvoiceno: invoice.fbrinvoiceno ?? null,
      };

      const items = invoice.items.map((item) => {
        total_quantity += item.quantity;

        return {
          ...item,
        };
      });

      const headerTotalData = {
        totalcost: invoice.totalcost,
        totalcostincludingdiscount: invoice.totalcostincludingdiscount,
        totaltax: invoice.totaltax,
        totalcostincludingtax: invoice.totalcostincludingtax,
        advancedtax: invoice.advancedtax,
        totaladvancedtax: invoice.totaladvancedtax,
        totalcostincludingadvancedtax: invoice.totalcostincludingadvancedtax,
        total_quantity,
      };

      const total = report.totalData;
      total.totalcost += invoice.totalcost;
      total.totalcostincludingdiscount += invoice.totalcostincludingdiscount;
      total.totaltax += invoice.totaltax;
      total.totalcostincludingtax += invoice.totalcostincludingtax;
      total.advancedtax += invoice.advancedtax;
      total.totaladvancedtax += invoice.totaladvancedtax;
      total.totalcostincludingadvancedtax +=
        invoice.totalcostincludingadvancedtax;
      total.total_quantity += total_quantity;

      report.invoices.push({
        headerData,
        items,
        headerTotalData,
      });
    }

    return report;
  }

  async createpurchasereturninvoice(
    userId: string,
    dto: CreatePurchaseReturnInvoiceDto,
  ) {
    if (!dto.purchase_invoice_id)
      throw new BadRequestException('purchase_invoice_id is required');
    if (!dto.posting_date)
      throw new BadRequestException('posting_date is required');
    if (!dto.document_date)
      throw new BadRequestException('document_date is required');
    if (!dto.items || dto.items.length === 0)
      throw new BadRequestException('At least one return item is required');

    const originalInvoice = await this.prisma.purchaseInvoice.findUnique({
      where: { id: dto.purchase_invoice_id },
      include: {
        items: {
          include: {
            item: true,
          },
        },
        vendor: true,
      },
    });
    if (!originalInvoice)
      throw new NotFoundException('Purchase invoice not found');

    if (!originalInvoice.posted)
      throw new BadRequestException('Purchase Invoice must be posted');

    const vendor_id = originalInvoice.vendor_id;
    const originalItemsMap = new Map<
      string,
      {
        quantity: number;
        unit_cost: number;
        discount: number;
        tax_group_code_id: string;
      }
    >();
    for (const item of originalInvoice.items) {
      originalItemsMap.set(item.item_id, {
        quantity: item.quantity,
        unit_cost: item.unit_cost,
        discount: item.discount,
        tax_group_code_id: item.item?.tax_group_code_id, // optional chaining if populated
      });
    }

    if (dto.items.length > originalInvoice.items.length) {
      throw new BadRequestException(
        'Too many return items compared to sales invoice',
      );
    }

    const seen = new Set<string>();
    let totalCost = 0;
    let totalTax = 0;
    let totaldiscount = 0;

    const itemsData = await Promise.all(
      dto.items.map(async (item) => {
        if (!item.item_id) throw new BadRequestException('item_id is required');

        if (seen.has(item.item_id)) {
          throw new BadRequestException(
            `Duplicate return for item_id: ${item.item_id}`,
          );
        }
        seen.add(item.item_id);

        const original = originalItemsMap.get(item.item_id);
        if (!original) {
          throw new BadRequestException(
            `Item ${item.item_id} not found in original invoice`,
          );
        }

        if (item.quantity > original.quantity) {
          throw new BadRequestException(
            `Return quantity ${item.quantity} exceeds original invoice quantity ${original.quantity} for item ${item.item_id}`,
          );
        }

        const unitCost = original.unit_cost ?? 0;
        const itemTotalCost = unitCost * item.quantity;
        const discount = original.discount || 0;
        const discountAmount = (itemTotalCost * discount) / 100;
        const totalCostAfterDiscount = itemTotalCost - discountAmount;

        const taxCalculation = await this.prisma.taxCalculation.findFirst({
          where: {
            tax_group_code_id: original.tax_group_code_id,
            tax_group_area_id: originalInvoice.vendor.tax_area_code_id,
          },
        });

        const taxPercent = taxCalculation?.percentage || 0;
        const itemTax = (totalCostAfterDiscount * +taxPercent) / 100;
        const totalWithTax = totalCostAfterDiscount + itemTax;

        totalCost += itemTotalCost;
        totalTax += itemTax;
        totaldiscount += totalCostAfterDiscount;

        return {
          item_id: item.item_id,
          quantity: item.quantity,
          unit_price: 0,
          unit_cost: Number(unitCost.toFixed(2)),
          total_cost: Number(itemTotalCost.toFixed(2)),
          taxrate: Number(taxPercent.toFixed(2)),
          total_tax: Number(itemTax.toFixed(2)),
          totalcostincludingtax: Number(totalWithTax.toFixed(2)),
          discount: Number(discount.toFixed(2)),
          discountamount: Number(discountAmount.toFixed(2)),
          totalcostincludingdiscount: Number(totalCostAfterDiscount.toFixed(2)),
        };
      }),
    );

    const latest = await this.prisma.purchaseReturnInvoice.findFirst({
      orderBy: { createdAt: 'desc' },
      select: { invoice_no: true },
      where: { invoice_no: { startsWith: 'PR-' } },
    });

    let nextInvoiceNo = 'PR-00000001';
    if (latest?.invoice_no) {
      const lastNum = parseInt(latest.invoice_no.replace('PR-', ''), 10);
      nextInvoiceNo = `PR-${(lastNum + 1).toString().padStart(8, '0')}`;
    }

    const totalWithAdvancedTax = totaldiscount + totalTax;
    const advanceTax = originalInvoice.advancedtax ?? 0;
    const advanceTaxValue = (totalWithAdvancedTax * advanceTax) / 100;
    const finalTotal = totalWithAdvancedTax + advanceTaxValue;

    const returnInvoice = await this.prisma.purchaseReturnInvoice.create({
      data: {
        invoice_no: nextInvoiceNo,
        vendor_id,
        notes: dto.notes,
        auth_id: userId,
        vendor_invoice_no: dto.vendor_invoice_no,
        purchase_invoice_id: dto.purchase_invoice_id,
        posting_date: new Date(dto.posting_date),
        document_date: new Date(dto.document_date),
        totalcost: Number(totalCost.toFixed(2)),
        totaltax: Number(totalTax.toFixed(2)),
        totalcostincludingtax: Number(totalWithAdvancedTax.toFixed(2)),
        advancedtax: Number(advanceTax.toFixed(2)),
        totaladvancedtax: Number(advanceTaxValue.toFixed(2)),
        totalcostincludingadvancedtax: Number(finalTotal.toFixed(2)),
        items: {
          create: itemsData,
        },
      },
      include: { items: true },
    });

    return returnInvoice;
  }

  findAllpurchasereturninvoices(posted?: boolean) {
    return this.prisma.purchaseReturnInvoice.findMany({
      where: posted !== undefined ? { posted } : {},
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        items: {
          include: {
            item: true,
          },
        },
        vendor: true,
      },
    });
  }

  async findOnepurchasereturninvoice(id: string) {
    const invoice = await this.prisma.purchaseReturnInvoice.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            item: true,
          },
        },
        purchaseinvoice: true,
        vendor: true,
      },
    });
    if (!invoice) throw new NotFoundException('Invoice not found');
    // Manually get the salesInvoice data for calculations only
    const purchaseInvoice = await this.prisma.purchaseInvoice.findUnique({
      where: { id: invoice.purchase_invoice_id },
      include: { items: true },
    });

    if (!purchaseInvoice)
      throw new NotFoundException('purchase Invoice not found');
    const originalItemQtyMap = new Map<string, number>();
    for (const item of purchaseInvoice.items) {
      originalItemQtyMap.set(item.id, item.quantity);
    }

    const postedReturns = await this.prisma.purchaseReturnInvoice.findMany({
      where: {
        purchase_invoice_id: invoice.purchase_invoice_id,
        posted: true,
      },
      include: { items: true },
    });

    const returnedQtyMap = new Map<string, number>();
    for (const ret of postedReturns) {
      for (const item of ret.items) {
        const current = returnedQtyMap.get(item.item_id) || 0;
        returnedQtyMap.set(item.item_id, current + item.quantity);
      }
    }

    const enhancedItems = invoice.items.map((item) => {
      const matchingPurchaseInvoiceItem = purchaseInvoice.items.find(
        (sii) => sii.item_id === item.item_id,
      );

      const returnable_quantity = matchingPurchaseInvoiceItem?.quantity ?? 0;
      const returned_quantity = returnedQtyMap.get(item.item_id) ?? 0;

      return {
        ...item,
        returnable_quantity,
        returned_quantity,
      };
    });

    // ✅ Explicitly remove `salesinvoice` if present
    const { purchaseinvoice: _purchaseInvoiceFromReturn, ...cleanedInvoice } =
      invoice as any;

    return {
      ...cleanedInvoice,
      items: enhancedItems,
    };
  }

  async updatepurchaseReturnInvoice(
    id,
    userId: string,
    dto: UpdatePurchaseReturnInvoiceDto,
  ) {
    const invoice = await this.findOnepurchasereturninvoice(id);
    if (invoice.posted)
      throw new BadRequestException('Cannot edit a posted return invoice');

    const originalItemMap = new Map<string, number>();
    invoice.purchaseinvoice.items.forEach((item) => {
      originalItemMap.set(item.item_id, item.quantity);
    });

    const existingReturnItems = invoice.items;
    const incomingItemIds = dto.items.map((i) => i.id);
    const existingItemMap = new Map<
      string,
      (typeof existingReturnItems)[number]
    >();
    existingReturnItems.forEach((item) => existingItemMap.set(item.id, item));

    // Delete missing items
    for (const item of existingReturnItems) {
      if (!incomingItemIds.includes(item.id)) {
        await this.prisma.purchaseReturnInvoiceItem.delete({
          where: { id: item.id },
        });
      }
    }

    // Update items
    for (const item of dto.items) {
      const existing = existingItemMap.get(item.id);
      if (!existing)
        throw new BadRequestException(`Invalid item id: ${item.id}`);

      const originalQty = originalItemMap.get(existing.item_id) || 0;
      console.log(originalQty);
      if ((item.quantity ?? 0) > originalQty) {
        throw new BadRequestException(
          `Quantity (${item.quantity}) exceeds original invoice quantity (${originalQty}) for item ${existing.item_id}`,
        );
      }

      const unitPrice = existing.unit_price;
      const discount = existing.discount;
      const itemTotalCost = unitPrice * (item.quantity ?? 0);
      const discountAmount = (itemTotalCost * discount) / 100;
      const totalCostAfterDiscount = itemTotalCost - discountAmount;
      const taxAmount = (totalCostAfterDiscount * existing.taxrate) / 100;
      const totalWithTax = totalCostAfterDiscount + taxAmount;

      await this.prisma.purchaseReturnInvoiceItem.update({
        where: { id: item.id },
        data: {
          quantity: Number(item.quantity ? item.quantity.toFixed(2) : 0),
          total_cost: Number(itemTotalCost.toFixed(2)),
          discountamount: Number(discountAmount.toFixed(2)),
          totalcostincludingdiscount: Number(totalCostAfterDiscount.toFixed(2)),
          total_tax: Number(taxAmount.toFixed(2)),
          totalcostincludingtax: Number(totalWithTax.toFixed(2)),
        },
      });
    }

    // Recalculate header totals
    const updatedItems = await this.prisma.purchaseReturnInvoiceItem.findMany({
      where: { purchase_return_invoice_id: invoice.id },
    });

    let totalCost = 0,
      totalTax = 0,
      totalcostincludingdiscount = 0;
    for (const item of updatedItems) {
      totalCost += item.total_cost;
      totalTax += item.total_tax;
      totalcostincludingdiscount += item.totalcostincludingdiscount;
    }

    const totalWithTax = totalcostincludingdiscount + totalTax;
    const advanceTax = invoice.advancedtax || 0;
    const advanceTaxValue = (totalWithTax * advanceTax) / 100;
    const finalTotal = totalWithTax + advanceTaxValue;

    await this.prisma.purchaseReturnInvoice.update({
      where: { id: invoice.id },
      data: {
        posting_date: new Date(dto.posting_date),
        document_date: new Date(dto.document_date),
        vendor_invoice_no: dto.vendor_invoice_no,
        notes: dto.notes,
        auth_id: userId,
        totalcost: Number(totalCost.toFixed(2)),
        totaltax: Number(totalTax.toFixed(2)),
        totalcostincludingtax: Number(totalWithTax.toFixed(2)),
        totaladvancedtax: Number(advanceTaxValue.toFixed(2)),
        totalcostincludingadvancedtax: Number(finalTotal.toFixed(2)),
      },
    });

    return { message: 'Purchase return invoice updated successfully' };
  }

  async postpurchasereturninvoice(id: string, userId: string) {
    const invoice = await this.findOnepurchasereturninvoice(id);

    if (invoice.posted) {
      throw new BadRequestException('Invoice is already marked as posted');
    }

    return this.prisma.$transaction(async (tx) => {
      // 3. Mark invoice as posted
      const updatedInvoice = await tx.purchaseReturnInvoice.update({
        where: { id },
        data: { posted: true, auth_id: userId },
      });

      // 4. Create Vendor Ledger Entry
      await tx.vendorLedgerEntry.create({
        data: {
          vendor_id: invoice.vendor_id,
          invoice_id: invoice.id, // ✅ replaces purchase_invoice_id
          document_type: 'PurchaseReturn',
        },
      });

      // 5. Create Item Ledger Entries for each invoice item
      for (const item of invoice.items) {
        // 3a. Create Item Ledger Entry
        await tx.itemLedgerEntry.create({
          data: {
            item_id: item.item_id,
            invoice_id: invoice.id, // ✅ replaces purchase_invoice_id
            invoice_item_id: item.id,
            document_type: 'PurchaseReturn',
            source_type: 'vendor',
          },
        });
        // 3b. Increment total_quantity in Item table
        await tx.item.update({
          where: { id: item.item_id },
          data: {
            total_quantity: {
              decrement: item.quantity,
            },
          },
        });
      }

      return updatedInvoice;
    });
  }

  async removepurchasereturninvoice(id: string) {
    await this.findOnepurchasereturninvoice(id);
    await this.prisma.purchaseReturnInvoiceItem.deleteMany({
      where: { purchase_return_invoice_id: id },
    });
    return this.prisma.purchaseReturnInvoice.delete({ where: { id } });
  }

  async getPurchaseReturnInvoiceSummary(filters?: {
    document_date_range?: { gte: Date; lte: Date };
    vendor_id?: string;
  }): Promise<PurchaseReturnInvoiceReport> {
    const purchaseReturnInvoices =
      await this.prisma.purchaseReturnInvoice.findMany({
        where: {
          posted: true,
          ...(filters?.document_date_range && {
            document_date: {
              gte: filters.document_date_range.gte,
              lte: filters.document_date_range.lte,
            },
          }),
          ...(filters?.vendor_id && {
            vendor_id: filters.vendor_id,
          }),
        },
        include: {
          purchaseinvoice: true,
          items: {
            include: {
              item: true,
            },
          },
          vendor: true, // Ensure vendor is included for vendor_name
        },
      });

    const report: PurchaseReturnInvoiceReport = {
      invoices: [],
      totalData: {
        totalcost: 0,
        totaltax: 0,
        totalcostincludingtax: 0,
        advancedtax: 0,
        totaladvancedtax: 0,
        totalcostincludingadvancedtax: 0,
        total_quantity: 0,
      },
    };

    for (const invoice of purchaseReturnInvoices) {
      let total_quantity = 0;

      const headerData = {
        invoice_no: invoice.invoice_no,
        purchase_invoice_no: invoice.purchaseinvoice.invoice_no,
        vendor_name: invoice.vendor?.name ?? 'N/A',
        posting_date: invoice.posting_date,
        document_date: invoice.posting_date,
      };

      const items = invoice.items.map((item) => {
        total_quantity += item.quantity;

        return {
          ...item,
        };
      });

      const headerTotalData = {
        totalcost: invoice.totalcost,
        totaltax: invoice.totaltax,
        totalcostincludingtax: invoice.totalcostincludingtax,
        advancedtax: invoice.advancedtax,
        totaladvancedtax: invoice.totaladvancedtax,
        totalcostincludingadvancedtax: invoice.totalcostincludingadvancedtax,
        total_quantity,
      };

      const total = report.totalData;
      total.totalcost += invoice.totalcost;
      total.totaltax += invoice.totaltax;
      total.totalcostincludingtax += invoice.totalcostincludingtax;
      total.advancedtax += invoice.advancedtax;
      total.totaladvancedtax += invoice.totaladvancedtax;
      total.totalcostincludingadvancedtax +=
        invoice.totalcostincludingadvancedtax;
      total.total_quantity += total_quantity;

      report.invoices.push({
        headerData,
        items,
        headerTotalData,
      });
    }

    return report;
  }

  async findAllVendorLedgerEntries() {
    const entries = await this.prisma.vendorLedgerEntry.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        vendor: true,
      },
    });

    const result = await Promise.all(
      entries.map(async (entry) => {
        let invoice: Record<string, any> | null = null;
        if (entry.invoice_id) {
          if (entry.document_type === 'PurchaseInvoice') {
            invoice = await this.prisma.purchaseInvoice.findUnique({
              where: { id: entry.invoice_id },
            });
          } else if (entry.document_type === 'PurchaseReturn') {
            invoice = await this.prisma.purchaseReturnInvoice.findUnique({
              where: { id: entry.invoice_id },
            });
          }
        }
        return {
          ...entry,
          invoice,
        };
      }),
    );

    return result;
  }

  async findAllCustomerLedgerEntries() {
    const entries = await this.prisma.customerLedgerEntry.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        customer: true,
      },
    });

    const result = await Promise.all(
      entries.map(async (entry) => {
        let invoice: Record<string, any> | null = null;
        if (entry.invoice_id) {
          if (entry.document_type === 'SalesInvoice') {
            invoice = await this.prisma.salesInvoice.findUnique({
              where: { id: entry.invoice_id },
            });
          } else if (entry.document_type === 'SalesReturn') {
            invoice = await this.prisma.salesReturnInvoice.findUnique({
              where: { id: entry.invoice_id },
            });
          }
        }
        return {
          ...entry,
          invoice,
        };
      }),
    );

    return result;
  }

  async findAllItemLedgerEntries(filters: {
    customerId?: string;
    vendorId?: string;
    startDate?: string;
    endDate?: string;
    taxGroupCode?: string;
  }) {
    const where: any = {};
    const invoiceIds: string[] = [];

    const dateFilter =
      filters.startDate || filters.endDate
        ? {
            document_date: {
              ...(filters.startDate && { gte: new Date(filters.startDate) }),
              ...(filters.endDate && { lte: new Date(filters.endDate) }),
            },
          }
        : {};

    const filtersApplied =
      filters.customerId ||
      filters.vendorId ||
      filters.taxGroupCode ||
      Object.keys(dateFilter).length;

    // --- Collect matching invoices ---
    if (filters.customerId) {
      const sales = await this.prisma.salesInvoice.findMany({
        where: { customer_id: filters.customerId, ...dateFilter },
        select: { id: true },
      });
      const salesReturns = await this.prisma.salesReturnInvoice.findMany({
        where: { customer_id: filters.customerId, ...dateFilter },
        select: { id: true },
      });
      invoiceIds.push(
        ...sales.map((s) => s.id),
        ...salesReturns.map((r) => r.id),
      );
    }

    if (filters.vendorId) {
      const purchases = await this.prisma.purchaseInvoice.findMany({
        where: { vendor_id: filters.vendorId, ...dateFilter },
        select: { id: true },
      });
      const purchaseReturns = await this.prisma.purchaseReturnInvoice.findMany({
        where: { vendor_id: filters.vendorId, ...dateFilter },
        select: { id: true },
      });
      invoiceIds.push(
        ...purchases.map((p) => p.id),
        ...purchaseReturns.map((r) => r.id),
      );
    }

    // Date-only filter
    if (
      !filters.customerId &&
      !filters.vendorId &&
      Object.keys(dateFilter).length
    ) {
      const allInvoices = await Promise.all([
        this.prisma.salesInvoice.findMany({
          where: dateFilter,
          select: { id: true },
        }),
        this.prisma.salesReturnInvoice.findMany({
          where: dateFilter,
          select: { id: true },
        }),
        this.prisma.purchaseInvoice.findMany({
          where: dateFilter,
          select: { id: true },
        }),
        this.prisma.purchaseReturnInvoice.findMany({
          where: dateFilter,
          select: { id: true },
        }),
      ]);
      invoiceIds.push(...allInvoices.flat().map((inv) => inv.id));
    }

    // No matching invoices? → return empty result
    if (filtersApplied && invoiceIds.length === 0) {
      return filtersApplied
        ? { entries: [], totals: this.getEmptyTotals() }
        : [];
    }

    if (invoiceIds.length) {
      where.invoice_id = { in: invoiceIds };
    }

    // Tax group filter
    if (filters.taxGroupCode) {
      where.item = {
        taxGroupCode: {
          id: filters.taxGroupCode,
        },
      };
    }

    // Exclude InventoryAdjustment if any filters applied
    if (filtersApplied) {
      where.NOT = { document_type: 'InventoryAdjustment' };
    }

    const entries = await this.prisma.itemLedgerEntry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        item: {
          include: {
            taxGroupCode: true,
          },
        },
      },
    });

    let totals = this.getEmptyTotals();

    const mapped = await Promise.all(
      entries.map(async (entry) => {
        let invoice: any = null;
        let invoiceItem: any = null;

        if (entry.invoice_item_id && entry.invoice_id) {
          switch (entry.document_type) {
            case 'PurchaseInvoice':
              invoice = await this.prisma.purchaseInvoice.findUnique({
                where: { id: entry.invoice_id },
                include: { vendor: true },
              });
              invoiceItem = await this.prisma.purchaseInvoiceItem.findUnique({
                where: { id: entry.invoice_item_id },
              });
              break;
            case 'PurchaseReturn':
              invoice = await this.prisma.purchaseReturnInvoice.findUnique({
                where: { id: entry.invoice_id },
                include: { vendor: true },
              });
              invoiceItem =
                await this.prisma.purchaseReturnInvoiceItem.findUnique({
                  where: { id: entry.invoice_item_id },
                });
              break;
            case 'SalesInvoice':
              invoice = await this.prisma.salesInvoice.findUnique({
                where: { id: entry.invoice_id },
                include: { customer: true },
              });
              invoiceItem = await this.prisma.salesInvoiceItem.findUnique({
                where: { id: entry.invoice_item_id },
              });
              break;
            case 'SalesReturn':
              invoice = await this.prisma.salesReturnInvoice.findUnique({
                where: { id: entry.invoice_id },
                include: { customer: true },
              });
              invoiceItem = await this.prisma.salesReturnInvoiceItem.findUnique(
                {
                  where: { id: entry.invoice_item_id },
                },
              );
              break;
          }
        }

        if (invoiceItem && filtersApplied) {
          totals.total_cost += invoiceItem.total_cost || 0;
          totals.discountamount += invoiceItem.discountamount || 0;
          totals.totalcostincludingdiscount +=
            invoiceItem.totalcostincludingdiscount || 0;
          totals.total_tax += invoiceItem.total_tax || 0;
          totals.totalcostincludingtax +=
            invoiceItem.totalcostincludingtax || 0;
        }

        return {
          ...entry,
          invoice,
          invoiceItem: invoiceItem
            ? {
                ...invoiceItem,
                quantity: ['SalesInvoice', 'PurchaseReturn'].includes(
                  entry.document_type,
                )
                  ? -Math.abs(invoiceItem.quantity)
                  : ['PurchaseInvoice', 'SalesReturn'].includes(
                        entry.document_type,
                      )
                    ? Math.abs(invoiceItem.quantity)
                    : invoiceItem.quantity,
              }
            : null,
        };
      }),
    );

    // Return totals only if filters applied
    return filtersApplied ? { entries: mapped, totals } : mapped;
  }

  private getEmptyTotals() {
    return {
      total_cost: 0,
      discountamount: 0,
      totalcostincludingdiscount: 0,
      total_tax: 0,
      totalcostincludingtax: 0,
    };
  }
}
