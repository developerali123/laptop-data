import { Module } from '@nestjs/common';
import { CustomerVendorModule } from './customer_vendor.module';
import { InventoryModule } from './inventory.module';
import { InvoiceModule } from './invoice.module';
import { AuthModule } from './auth.module';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from 'src/modules/company.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CompanyModule,
    CustomerVendorModule,
    InventoryModule,
    InvoiceModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
