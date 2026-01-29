import { Module } from '@nestjs/common';
import { TenantPrismaProvider } from 'src/common/tenant-prisma.provider';
import { CompanyController } from 'src/controllers/company.controller';
import { CompanyService } from 'src/services/company.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, TenantPrismaProvider],
})
export class CompanyModule {}
