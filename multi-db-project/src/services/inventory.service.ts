import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateInventoryAdjustmentDto,
  CreateItemCategoryCodeDto,
  CreateItemDto,
  CreateTaxCalculationDto,
  CreateTaxGroupCodeDto,
  GetTaxCalculationDto,
  UpdateInventoryAdjustmentDto,
  UpdateItemCategoryCodeDto,
  UpdateItemDto,
  UpdateTaxCalculationDto,
  UpdateTaxGroupCodeDto,
} from 'src/dtos/inventory.dto';
import { PrismaClient as TenantPrisma } from '../../prisma/generated/tenant';

@Injectable()
export class InventoryService {
  constructor(@Inject('TENANT_PRISMA') private readonly prisma: TenantPrisma) {}

  async createtaxgroupcode(data: CreateTaxGroupCodeDto) {
    if (!data.code) {
      throw new BadRequestException('code cannot be null');
    }
    const existing = await this.prisma.taxGroupCode.findUnique({
      where: { code: data.code },
    });

    if (existing) {
      throw new BadRequestException(
        `tax group code with code '${data.code}' already exists.`,
      );
    }

    return this.prisma.taxGroupCode.create({ data });
  }

  findAlltaxgroupcodes() {
    return this.prisma.taxGroupCode.findMany();
  }

  async findOnetaxgroupcode(id: string) {
    const record = await this.prisma.taxGroupCode.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`tax group code with id '${id}' not found.`);
    }

    return record;
  }

  async updatetaxgroupcode(id: string, data: UpdateTaxGroupCodeDto) {
    await this.findOnetaxgroupcode(id);
    if (!data.code) {
      throw new BadRequestException('code cannot be null');
    }
    if (data.code) {
      const codeExists = await this.prisma.taxGroupCode.findUnique({
        where: { code: data.code },
      });

      if (codeExists && codeExists.id !== id) {
        throw new BadRequestException(
          `tax group code with code '${data.code}' already exists.`,
        );
      }
    }
    const itemcount = await this.prisma.item.count({
      where: { tax_group_code_id: id },
    });

    if (itemcount > 0) {
      throw new BadRequestException(
        'Cannot update: Tax Group Code is in use by one or more items.',
      );
    }
    const taxCalculationCount = await this.prisma.taxCalculation.count({
      where: { tax_group_code_id: id },
    });

    if (taxCalculationCount > 0) {
      throw new BadRequestException(
        'Cannot update: Tax Group Code is in use by one or more tax calculations.',
      );
    }
    return this.prisma.taxGroupCode.update({ where: { id }, data });
  }

  async removetaxgroupcode(id: string) {
    await this.findOnetaxgroupcode(id);
    const itemcount = await this.prisma.item.count({
      where: { tax_group_code_id: id },
    });

    if (itemcount > 0) {
      throw new BadRequestException(
        'Cannot delete: Tax Group Code is in use by one or more items.',
      );
    }
    const taxCalculationCount = await this.prisma.taxCalculation.count({
      where: { tax_group_code_id: id },
    });

    if (taxCalculationCount > 0) {
      throw new BadRequestException(
        'Cannot delete: Tax Group Code is in use by one or more tax calculations.',
      );
    }
    return this.prisma.taxGroupCode.delete({ where: { id } });
  }

  async createitemcategorycode(data: CreateItemCategoryCodeDto) {
    if (!data.code) {
      throw new BadRequestException('code cannot be null');
    }
    const existing = await this.prisma.itemCategoryCode.findUnique({
      where: { code: data.code },
    });

    if (existing) {
      throw new BadRequestException(
        `item category code with code '${data.code}' already exists.`,
      );
    }

    return this.prisma.itemCategoryCode.create({ data });
  }

  findAllitemcategorycodes() {
    return this.prisma.itemCategoryCode.findMany();
  }

  async findOneitemcategorycode(id: string) {
    const record = await this.prisma.itemCategoryCode.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(
        `item category code with id '${id}' not found.`,
      );
    }

    return record;
  }

  async updateitemcategorycode(id: string, data: UpdateItemCategoryCodeDto) {
    await this.findOneitemcategorycode(id);
    if (!data.code) {
      throw new BadRequestException('code cannot be null');
    }
    if (data.code) {
      const codeExists = await this.prisma.itemCategoryCode.findUnique({
        where: { code: data.code },
      });

      if (codeExists && codeExists.id !== id) {
        throw new BadRequestException(
          `item category code with code '${data.code}' already exists.`,
        );
      }
    }
    const itemcount = await this.prisma.item.count({
      where: { item_category_code_id: id },
    });

    if (itemcount > 0) {
      throw new BadRequestException(
        'Cannot update: Item Category Code is in use by one or more items.',
      );
    }
    return this.prisma.itemCategoryCode.update({ where: { id }, data });
  }

  async removeitemcategorycode(id: string) {
    await this.findOneitemcategorycode(id);
    const itemcount = await this.prisma.item.count({
      where: { item_category_code_id: id },
    });

    if (itemcount > 0) {
      throw new BadRequestException(
        'Cannot delete: Item Category Code is in use by one or more items.',
      );
    }
    return this.prisma.itemCategoryCode.delete({ where: { id } });
  }

  async createitem(data: CreateItemDto) {
    if (!data.name) {
      throw new BadRequestException('item name cannot be null');
    }
    if (!data.tax_group_code_id) {
      throw new BadRequestException('tax group code cannot be null');
    }

    // Validate tax_group_code_id
    if (!data.tax_group_code_id) {
      throw new BadRequestException('Tax Group Code ID is required.');
    }

    const existingtaxgroupcode = await this.prisma.taxGroupCode.findUnique({
      where: { id: data.tax_group_code_id },
    });
    if (!existingtaxgroupcode) {
      throw new BadRequestException('Invalid Tax Group Code ID.');
    }

    if (data.item_category_code_id) {
      const group = await this.prisma.itemCategoryCode.findUnique({
        where: { id: data.item_category_code_id },
      });
      if (!group) {
        throw new BadRequestException('Invalid Item Category Code ID.');
      }
    }

    const latest = await this.prisma.item.findFirst({
      orderBy: { createdAt: 'desc' },
      select: { item_no: true },
      where: {
        item_no: {
          startsWith: 'I-',
        },
      },
    });

    let nextInvoiceNo = 'I-000001';
    if (latest?.item_no) {
      const lastNum = parseInt(latest.item_no.replace('I-', ''));
      const newNum = (lastNum + 1).toString().padStart(6, '0');
      nextInvoiceNo = `I-${newNum}`;
    }

    return this.prisma.item.create({
      data: { ...data, item_no: nextInvoiceNo },
    });
  }

  async findAllitems() {
    return this.prisma.item.findMany({
      include: {
        taxGroupCode: true,
        itemCategoryCode: true,
      },
      orderBy: {
        item_no: 'asc',
      },
    });
  }

  async findOneitem(id: string) {
    const item = await this.prisma.item.findUnique({
      where: { id },
      include: {
        taxGroupCode: true,
        itemCategoryCode: true,
      },
    });
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  async updateitem(id: string, data: UpdateItemDto) {
    const existing = await this.findOneitem(id);
    if (!data.name) {
      throw new BadRequestException('item name cannot be null');
    }

    // Validate tax_group_code_id
    if (!data.tax_group_code_id) {
      throw new BadRequestException('Tax Group Code ID is required.');
    }

    if (data.tax_group_code_id !== existing.tax_group_code_id) {
      const existingtaxgroupcode = await this.prisma.taxGroupCode.findUnique({
        where: { id: data.tax_group_code_id },
      });
      if (!existingtaxgroupcode) {
        throw new BadRequestException('Invalid Tax Group Code ID.');
      }
    }

    if (
      data.item_category_code_id &&
      data.item_category_code_id !== existing.item_category_code_id
    ) {
      const group = await this.prisma.itemCategoryCode.findUnique({
        where: { id: data.item_category_code_id },
      });
      if (!group) {
        throw new BadRequestException('Invalid Item Category Code ID.');
      }
    }

    return this.prisma.item.update({ where: { id }, data });
  }

  async removeitem(id: string) {
    await this.findOneitem(id);
    const purchaseinvoiceitemCount =
      await this.prisma.purchaseInvoiceItem.count({
        where: { item_id: id },
      });

    if (purchaseinvoiceitemCount > 0) {
      throw new BadRequestException(
        'Cannot delete: Item is in use by one or more purchase invoice items.',
      );
    }
    const purchasereturninvoiceitemCount =
      await this.prisma.purchaseReturnInvoiceItem.count({
        where: { item_id: id },
      });

    if (purchasereturninvoiceitemCount > 0) {
      throw new BadRequestException(
        'Cannot delete: Item is in use by one or more purchase return invoice items.',
      );
    }
    const saleinvoiceitemCount = await this.prisma.salesInvoiceItem.count({
      where: { item_id: id },
    });

    if (saleinvoiceitemCount > 0) {
      throw new BadRequestException(
        'Cannot delete: Item is in use by one or more sale invoice items.',
      );
    }
    const salereturninvoiceitemCount =
      await this.prisma.salesReturnInvoiceItem.count({
        where: { item_id: id },
      });

    if (salereturninvoiceitemCount > 0) {
      throw new BadRequestException(
        'Cannot delete: Item is in use by one or more sale return invoice items.',
      );
    }
    const inventoryadjustmentitemCount =
      await this.prisma.inventoryAdjustmentItem.count({
        where: { item_id: id },
      });

    if (inventoryadjustmentitemCount > 0) {
      throw new BadRequestException(
        'Cannot delete: Item is in use by one or more inventory adjustment items.',
      );
    }
    const itemledgercounts = await this.prisma.itemLedgerEntry.count({
      where: { item_id: id },
    });

    if (itemledgercounts > 0) {
      throw new BadRequestException(
        'Cannot delete: Item is in use by one or more item ledger entries.',
      );
    }
    return this.prisma.item.delete({ where: { id } });
  }

  async createtaxcalculation(data: CreateTaxCalculationDto) {
    if (!data.tax_group_code_id) {
      throw new BadRequestException('tax group code cannot be null');
    }
    if (!data.tax_group_area_id) {
      throw new BadRequestException('tax group area cannot be null');
    }
    const existingtaxgroupcode = await this.prisma.taxGroupCode.findUnique({
      where: { id: data.tax_group_code_id },
    });
    if (!existingtaxgroupcode) {
      throw new BadRequestException('Invalid Tax Group Code ID.');
    }
    const existingtaxgrouparea = await this.prisma.taxAreaCode.findUnique({
      where: { id: data.tax_group_area_id },
    });
    if (!existingtaxgrouparea) {
      throw new BadRequestException('Invalid Tax Group Area ID.');
    }

    return this.prisma.taxCalculation.create({ data: data });
  }

  async findByGroupCodeAndArea(dto: GetTaxCalculationDto) {
    if (!dto.tax_group_code_id) {
      throw new BadRequestException('tax group code cannot be null');
    }
    if (!dto.tax_group_area_id) {
      throw new BadRequestException('tax group area cannot be null');
    }
    const existingtaxgroupcode = await this.prisma.taxGroupCode.findUnique({
      where: { id: dto.tax_group_code_id },
    });
    if (!existingtaxgroupcode) {
      throw new BadRequestException('Invalid Tax Group Code ID.');
    }
    const existingtaxgrouparea = await this.prisma.taxAreaCode.findUnique({
      where: { id: dto.tax_group_area_id },
    });
    if (!existingtaxgrouparea) {
      throw new BadRequestException('Invalid Tax Group Area ID.');
    }
    return this.prisma.taxCalculation.findFirst({
      where: {
        tax_group_code_id: dto.tax_group_code_id,
        tax_group_area_id: dto.tax_group_area_id,
      },
      include: {
        taxGroupCode: true,
        TaxAreaCode: true,
      },
    });
  }

  findAlltaxcalculations() {
    return this.prisma.taxCalculation.findMany({
      include: {
        taxGroupCode: true,
        TaxAreaCode: true,
      },
    });
  }

  async findOnetaxcalculation(id: string) {
    const tax = await this.prisma.taxCalculation.findUnique({
      where: { id },
      include: {
        taxGroupCode: true,
        TaxAreaCode: true,
      },
    });
    if (!tax)
      throw new NotFoundException(`TaxCalculation with id '${id}' not found.`);
    return tax;
  }

  async updatetaxcalculation(id: string, data: UpdateTaxCalculationDto) {
    await this.findOnetaxcalculation(id);

    if (!data.tax_group_code_id) {
      throw new BadRequestException('tax group code cannot be null');
    }
    if (!data.tax_group_area_id) {
      throw new BadRequestException('tax group area cannot be null');
    }
    const existingtaxgroupcode = await this.prisma.taxGroupCode.findUnique({
      where: { id: data.tax_group_code_id },
    });
    if (!existingtaxgroupcode) {
      throw new BadRequestException('Invalid Tax Group Code ID.');
    }
    const existingtaxgrouparea = await this.prisma.taxAreaCode.findUnique({
      where: { id: data.tax_group_area_id },
    });
    if (!existingtaxgrouparea) {
      throw new BadRequestException('Invalid Tax Group Area ID.');
    }

    return this.prisma.taxCalculation.update({
      where: { id },
      data: data,
    });
  }

  async removetaxcalculation(id: string) {
    await this.findOnetaxcalculation(id);
    return this.prisma.taxCalculation.delete({ where: { id } });
  }

  async createInventoryAdjustment(
    userId: string,
    dto: CreateInventoryAdjustmentDto,
  ) {
    if (!dto.posting_date)
      throw new BadRequestException('posting date cannot be null');
    if (!dto.document_date)
      throw new BadRequestException('document date cannot be null');

    if (!dto.items || dto.items.length === 0)
      throw new BadRequestException('At least one item is required');
    const latest = await this.prisma.inventoryAdjustment.findFirst({
      orderBy: { createdAt: 'desc' },
      select: { adjustment_no: true },
      where: {
        adjustment_no: {
          startsWith: 'IA-',
        },
      },
    });

    let nextAdjustmentNo = 'IA-00000001';
    if (latest?.adjustment_no) {
      const lastNum = parseInt(latest.adjustment_no.replace('IA-', ''), 10);
      const newNum = (lastNum + 1).toString().padStart(8, '0');
      nextAdjustmentNo = `IA-${newNum}`;
    }
    const itemsData = await Promise.all(
      dto.items.map(async (item) => {
        if (!item.item_id)
          throw new BadRequestException('item id cannot be null');

        const itemEntity = await this.prisma.item.findUnique({
          where: { id: item.item_id },
        });
        if (!itemEntity) throw new BadRequestException('Item not found');

        const unitCost = item.unit_cost || 0;
        const quantity = item.quantity;
        const totalItemCost = unitCost * quantity;

        return {
          ...item,
          unit_price: 0,
          total_cost: totalItemCost,
        };
      }),
    );
    const adjustmentItem = await this.prisma.inventoryAdjustment.create({
      data: {
        auth_id: userId,
        adjustment_no: nextAdjustmentNo,
        posting_date: new Date(dto.posting_date),
        document_date: new Date(dto.document_date),
        items: {
          create: itemsData,
        },
      },
      include: { items: true },
    });

    return {
      message: 'Inventory Adjustment applied successfully',
      adjustmentItem,
    };
  }

  async findAllInventoryAdjustment(posted?: boolean) {
    return this.prisma.inventoryAdjustment.findMany({
      where: posted !== undefined ? { posted } : {},
      include: {
        items: {
          include: {
            item: true,
          },
        },
      },
    });
  }

  async findOneInventoryAdjustment(id: string) {
    const adjustment = await this.prisma.inventoryAdjustment.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            item: true,
          },
        },
      },
    });

    if (!adjustment) {
      throw new NotFoundException('Inventory Adjustment not found');
    }

    return adjustment;
  }

  async updateInventoryAdjustment(
    id: string,
    userId: string,
    dto: UpdateInventoryAdjustmentDto,
  ) {
    if (!dto.posting_date)
      throw new BadRequestException('posting date cannot be null');
    if (!dto.document_date)
      throw new BadRequestException('document date cannot be null');

    if (!dto.items || dto.items.length === 0)
      throw new BadRequestException('At least one item is required');
    const adjustment = await this.findOneInventoryAdjustment(id);
    if (adjustment.posted) {
      throw new BadRequestException('Invoice is already marked as posted');
    }

    const { items, ...invoiceData } = dto;
    const existingItems = await this.prisma.inventoryAdjustmentItem.findMany({
      where: { inventory_adjustment_id: id },
    });

    const dtoItemIds = items.filter((i) => i.id).map((i) => i.id);
    const existingItemIds = existingItems.map((i) => i.id);

    const toDeleteIds = existingItemIds.filter(
      (dbId) => !dtoItemIds.includes(dbId),
    );
    if (toDeleteIds.length > 0) {
      await this.prisma.inventoryAdjustmentItem.deleteMany({
        where: { id: { in: toDeleteIds } },
      });
    }

    for (const item of items) {
      const itemEntity = await this.prisma.item.findUnique({
        where: { id: item.item_id },
      });
      if (!itemEntity) throw new BadRequestException('Item not found');

      const itemCost = (item.unit_cost ?? 0) * item.quantity;

      const itemData = {
        item_id: item.item_id,
        quantity: item.quantity,
        unit_price: 0,
        unit_cost: item.unit_cost ?? 0,
        total_cost: itemCost,
        inventory_adjustment_id: id,
      };

      if (item.id && existingItemIds.includes(item.id)) {
        await this.prisma.inventoryAdjustmentItem.update({
          where: { id: item.id },
          data: itemData,
        });
      } else {
        // Create
        await this.prisma.inventoryAdjustmentItem.create({ data: itemData });
      }
    }

    return this.prisma.inventoryAdjustment.update({
      where: { id },
      data: {
        auth_id: userId,
        posting_date: new Date(invoiceData.posting_date),
        document_date: new Date(invoiceData.document_date),
      },
      include: {
        items: true,
      },
    });
  }

  async deleteInventoryAdjustment(id: string) {
    await this.findOneInventoryAdjustment(id);
    await this.prisma.inventoryAdjustmentItem.deleteMany({
      where: { inventory_adjustment_id: id },
    });
    return this.prisma.inventoryAdjustment.delete({ where: { id } });
  }

  async postInventoryAdjustment(id: string, userId: string) {
    const adjustment = await this.findOneInventoryAdjustment(id);
    if (adjustment.posted) {
      throw new BadRequestException(
        'Inventory Adjustment is already marked as posted',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      for (const adjustmentItem of adjustment.items) {
        await tx.item.update({
          where: { id: adjustmentItem.item_id },
          data: {
            total_quantity: {
              increment: adjustmentItem.quantity,
            },
            unit_cost: adjustmentItem.unit_cost,
          },
        });

        await tx.itemLedgerEntry.create({
          data: {
            item_id: adjustmentItem.item_id,
            invoice_id: adjustment.id,
            invoice_item_id: adjustmentItem.id,
            document_type: 'InventoryAdjustment',
            source_type: 'Inventory',
          },
        });
      }

      await tx.inventoryAdjustment.update({
        where: { id },
        data: { posted: true, auth_id: userId },
      });

      return {
        message: 'Inventory Adjustment posted successfully',
        total_items_posted: adjustment.items.length,
      };
    });
  }
}
