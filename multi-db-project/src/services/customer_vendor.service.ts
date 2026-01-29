import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateCustomerDto,
  CreateTaxAreaCodeDto,
  CreateVendorDto,
  UpdateCustomerDto,
  UpdateTaxAreaCodeDto,
  UpdateVendorDto,
} from 'src/dtos/customer_vendor.dto';
import { PrismaClient as TenantPrisma } from '../../prisma/generated/tenant';

@Injectable()
export class CustomerVendorService {
  constructor(@Inject('TENANT_PRISMA') private readonly prisma: TenantPrisma,) {}

  async createtaxareacode(data: CreateTaxAreaCodeDto) {
    if (!data.code) {
      throw new BadRequestException('code cannot be null');
    }
    const existing = await this.prisma.taxAreaCode.findUnique({
      where: { code: data.code },
    });

    if (existing) {
      throw new BadRequestException(
        `Tax Area Code with code '${data.code}' already exists.`,
      );
    }

    return this.prisma.taxAreaCode.create({ data });
  }

  findAlltaxareacodes() {
    return this.prisma.taxAreaCode.findMany();
  }

  async findonetaxareacode(id: string) {
    const record = await this.prisma.taxAreaCode.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`Tax Area Code with id '${id}' not found.`);
    }

    return record;
  }

  async updatetaxareacode(id: string, data: UpdateTaxAreaCodeDto) {
    await this.findonetaxareacode(id);
    if (!data.code) {
      throw new BadRequestException('code cannot be null');
    }
    if (data.code) {
      const codeExists = await this.prisma.taxAreaCode.findUnique({
        where: { code: data.code },
      });

      if (codeExists && codeExists.id !== id) {
        throw new BadRequestException(
          `Tax Area Code with code '${data.code}' already exists.`,
        );
      }
    }
    const customerCount = await this.prisma.customer.count({
      where: { tax_area_code_id: id },
    });

    if (customerCount > 0) {
      throw new BadRequestException(
        'Cannot update: Tax Area Code is in use by one or more customers.',
      );
    }

    const vendorCount = await this.prisma.vendor.count({
      where: { tax_area_code_id: id },
    });

    if (vendorCount > 0) {
      throw new BadRequestException(
        'Cannot update: Tax Area Code is in use by one or more vendors.',
      );
    }

    const taxCalculationCount = await this.prisma.taxCalculation.count({
      where: { tax_group_area_id: id },
    });

    if (taxCalculationCount > 0) {
      throw new BadRequestException(
        'Cannot update: Tax Area Code is in use by one or more tax calculations.',
      );
    }
    return this.prisma.taxAreaCode.update({
      where: { id },
      data,
    });
  }

  async removetaxareacode(id: string) {
    await this.findonetaxareacode(id);

    const customerCount = await this.prisma.customer.count({
      where: { tax_area_code_id: id },
    });

    if (customerCount > 0) {
      throw new BadRequestException(
        'Cannot delete: Tax Area Code is in use by one or more customers.',
      );
    }

    const vendorCount = await this.prisma.vendor.count({
      where: { tax_area_code_id: id },
    });

    if (vendorCount > 0) {
      throw new BadRequestException(
        'Cannot delete: Tax Area Code is in use by one or more vendors.',
      );
    }

    const taxCalculationCount = await this.prisma.taxCalculation.count({
      where: { tax_group_area_id: id },
    });

    if (taxCalculationCount > 0) {
      throw new BadRequestException(
        'Cannot delete: Tax Area Code is in use by one or more tax calculations.',
      );
    }

    return this.prisma.taxAreaCode.delete({ where: { id } });
  }

  async createcustomer(data: CreateCustomerDto) {
    if (!data.name) {
      throw new BadRequestException('customer name cannot be null');
    }

    const group = await this.prisma.taxAreaCode.findUnique({
      where: { id: data.tax_area_code_id },
    });
    if (!group) {
      throw new BadRequestException('Invalid Tax Area Code ID.');
    }

    const latestCustomer = await this.prisma.customer.findFirst({
      orderBy: { createdAt: 'desc' },
      select: { customer_no: true },
      where: {
        customer_no: {
          startsWith: 'C-',
        },
      },
    });

    let nextCustomerNo = 'C-000001';
    if (latestCustomer?.customer_no) {
      const lastNumber = parseInt(latestCustomer.customer_no.replace('C-', ''));
      const newNumber = (lastNumber + 1).toString().padStart(6, '0');
      nextCustomerNo = `C-${newNumber}`;
    }

    const existing = await this.prisma.customer.findUnique({
      where: { customer_no: nextCustomerNo },
    });

    if (existing) {
      throw new BadRequestException(
        `Customer number '${nextCustomerNo}' already exists.`,
      );
    }

    return this.prisma.customer.create({
      data: { ...data, customer_no: nextCustomerNo },
    });
  }

  findAllcustomers(page = 1, limit = 10) {
    const take = limit;
    const skip = (page - 1) * limit;

    return this.prisma.customer.findMany({
      skip,
      take,
      include: {
        taxAreaCode: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOnecustomer(id: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: {
        taxAreaCode: true,
      },
    });
    if (!customer) {
      throw new NotFoundException('Customer not found.');
    }
    return customer;
  }

  async updatecustomer(id: string, data: UpdateCustomerDto) {
    const existing = await this.findOnecustomer(id);
    if (!data.name) {
      throw new BadRequestException('customer name cannot be null');
    }

    if (
      data.tax_area_code_id &&
      data.tax_area_code_id !== existing.tax_area_code_id
    ) {
      const group = await this.prisma.taxAreaCode.findUnique({
        where: { id: data.tax_area_code_id },
      });
      if (!group) {
        throw new BadRequestException('Invalid Tax Area Code ID.');
      }
    }

    return this.prisma.customer.update({ where: { id }, data });
  }

  async removecustomer(id: string) {
    await this.findOnecustomer(id);
    const saleinvoiceCount = await this.prisma.salesInvoice.count({
      where: { customer_id: id },
    });

    if (saleinvoiceCount > 0) {
      throw new BadRequestException(
        'Cannot delete: Customer is in use by one or more sale invoice.',
      );
    }
    const salereturninvoiceCount = await this.prisma.salesReturnInvoice.count({
      where: { customer_id: id },
    });

    if (salereturninvoiceCount > 0) {
      throw new BadRequestException(
        'Cannot delete: Customer is in use by one or more sale return invoice.',
      );
    }
    const customerledgerCount = await this.prisma.customerLedgerEntry.count({
      where: { customer_id: id },
    });

    if (customerledgerCount > 0) {
      throw new BadRequestException(
        'Cannot delete: Customer is in use by one or more customer ledger entries.',
      );
    }
    return this.prisma.customer.delete({ where: { id } });
  }

  async createvendor(data: CreateVendorDto) {
    if (!data.name) {
      throw new BadRequestException('vendor name cannot be null');
    }

    const group = await this.prisma.taxAreaCode.findUnique({
      where: { id: data.tax_area_code_id },
    });
    if (!group) {
      throw new BadRequestException('Invalid Tax Area Code ID.');
    }

    const latestCustomer = await this.prisma.vendor.findFirst({
      orderBy: { createdAt: 'desc' },
      select: { vendor_no: true },
      where: {
        vendor_no: {
          startsWith: 'V-',
        },
      },
    });

    let nextCustomerNo = 'V-000001';
    if (latestCustomer?.vendor_no) {
      const lastNumber = parseInt(latestCustomer.vendor_no.replace('V-', ''));
      const newNumber = (lastNumber + 1).toString().padStart(6, '0');
      nextCustomerNo = `V-${newNumber}`;
    }

    const existing = await this.prisma.vendor.findUnique({
      where: { vendor_no: nextCustomerNo },
    });

    if (existing) {
      throw new BadRequestException(
        `Customer number '${nextCustomerNo}' already exists.`,
      );
    }

    return this.prisma.vendor.create({
      data: { ...data, vendor_no: nextCustomerNo },
    });
  }

  findAllvendors(page = 1, limit = 10) {
    const take = limit;
    const skip = (page - 1) * limit;

    return this.prisma.vendor.findMany({
      skip,
      take,
      include: {
        taxAreaCode: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOnevendor(id: string) {
    const customer = await this.prisma.vendor.findUnique({
      where: { id },
      include: {
        taxAreaCode: true,
      },
    });
    if (!customer) {
      throw new NotFoundException('Vendor not found.');
    }
    return customer;
  }

  async updatevendor(id: string, data: UpdateVendorDto) {
    const existing = await this.findOnevendor(id);
    if (!data.name) {
      throw new BadRequestException('vendor name cannot be null');
    }

    if (
      data.tax_area_code_id &&
      data.tax_area_code_id !== existing.tax_area_code_id
    ) {
      const group = await this.prisma.taxAreaCode.findUnique({
        where: { id: data.tax_area_code_id },
      });
      if (!group) {
        throw new BadRequestException('Invalid Tax Area Code ID.');
      }
    }

    return this.prisma.vendor.update({ where: { id }, data });
  }

  async removevendor(id: string) {
    await this.findOnevendor(id);
    const purchaseinvoiceCount = await this.prisma.purchaseInvoice.count({
      where: { vendor_id: id },
    });

    if (purchaseinvoiceCount > 0) {
      throw new BadRequestException(
        'Cannot delete: Vendor is in use by one or more purchase invoice.',
      );
    }
    const purchasereturninvoiceCount =
      await this.prisma.purchaseReturnInvoice.count({
        where: { vendor_id: id },
      });

    if (purchasereturninvoiceCount > 0) {
      throw new BadRequestException(
        'Cannot delete: Vendor is in use by one or more purchase return invoice.',
      );
    }
    const vendorledgerCount = await this.prisma.vendorLedgerEntry.count({
      where: { vendor_id: id },
    });

    if (vendorledgerCount > 0) {
      throw new BadRequestException(
        'Cannot delete: Vendor is in use by one or more Vendor ledger entries.',
      );
    }
    return this.prisma.vendor.delete({ where: { id } });
  }
}
