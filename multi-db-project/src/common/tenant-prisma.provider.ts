// src/common/tenant-prisma.provider.ts
import { FactoryProvider, Scope } from '@nestjs/common';
import { PrismaClient as MasterPrisma } from '../../prisma/generated/master';
import { PrismaClient as TenantPrisma } from '../../prisma/generated/tenant';

export const TenantPrismaProvider: FactoryProvider = {
  provide: 'TENANT_PRISMA',
  scope: Scope.REQUEST, // New instance per request
  inject: ['REQUEST'],
  useFactory: async (req: any) => {
    const companyName =
      req.headers['x-company-name'] ||
      req.body.companyName ||
      req.query.companyName;

    if (!companyName) {
      throw new Error('Company name is required for multi-tenant requests');
    }

    const masterPrisma = new MasterPrisma();
    const company = await masterPrisma.company.findUnique({
      where: { name: companyName },
    });
    if (!company) {
      throw new Error(`Company ${companyName} not found`);
    }

    const dbUrl = `postgresql://${company.dbuser}:${company.dbpassword}@${company.dbhost}:${company.dbport}/${company.dbname}`;

    return new TenantPrisma({ datasources: { db: { url: dbUrl } } });
  },
};
