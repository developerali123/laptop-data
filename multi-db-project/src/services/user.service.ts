import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient as TenantPrisma } from '../../prisma/generated/tenant';
import { UpdateUserDto } from 'src/dtos/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@Inject('TENANT_PRISMA') private readonly prisma: TenantPrisma) {}

  async getAll() {
    return this.prisma.auth.findMany({
      where: {
        role: 'user',
      },
    });
  }

  async getUserProfile(userId: string) {
    const profile = this.prisma.auth.findUnique({
      where: { id: userId },
    });
    if (!profile) {
      throw new NotFoundException(`User with id '${userId}' not found.`);
    }

    return profile;
  }

  async UpdateUser(id: string, dto: UpdateUserDto) {
    await this.getUserProfile(id);

    const updateData: any = {
      isActive: dto.isActive,
    };

    if (dto.password) {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      updateData.password = hashedPassword;
    }

    await this.prisma.auth.update({
      where: { id },
      data: updateData,
    });

    return {
      message: `User updated successfully`,
    };
  }

  async delete(id: string): Promise<{ message: string }> {
    await this.getUserProfile(id);
    const purchaseinvoiceCount = await this.prisma.purchaseInvoice.count({
      where: { auth_id: id },
    });

    if (purchaseinvoiceCount > 0) {
      throw new BadRequestException(
        'Cannot delete: User has done one or more purchase invoices.',
      );
    }
    const purchasereturninvoiceCount =
      await this.prisma.purchaseReturnInvoice.count({
        where: { auth_id: id },
      });

    if (purchasereturninvoiceCount > 0) {
      throw new BadRequestException(
        'Cannot delete: User has done one or more  return invoices.',
      );
    }
    const salesinvoiceCount = await this.prisma.salesInvoice.count({
      where: { auth_id: id },
    });

    if (salesinvoiceCount > 0) {
      throw new BadRequestException(
        'Cannot delete: User has done one or more sale invoices.',
      );
    }
    const salereturninvoiceCount = await this.prisma.salesReturnInvoice.count({
      where: { auth_id: id },
    });

    if (salereturninvoiceCount > 0) {
      throw new BadRequestException(
        'Cannot delete: User has done one or more sale return invoices.',
      );
    }
    const inventoryadjustmentCount =
      await this.prisma.inventoryAdjustment.count({
        where: { auth_id: id },
      });

    if (inventoryadjustmentCount > 0) {
      throw new BadRequestException(
        'Cannot delete: User has done one or more inventory adjustments.',
      );
    }
    await this.prisma.auth.delete({ where: { id } });
    return { message: 'User deleted successfully' };
  }
}
