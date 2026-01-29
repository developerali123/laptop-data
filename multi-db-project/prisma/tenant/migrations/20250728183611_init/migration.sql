/*
  Warnings:

  - The values [company] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `profileId` on the `Auth` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CustomerVendorType" AS ENUM ('Individual', 'Company', 'AOP', 'Government', 'Others');

-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('inventory', 'service');

-- CreateEnum
CREATE TYPE "CostingMethod" AS ENUM ('fifo', 'average');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('SalesInvoice', 'SalesReturn', 'PurchaseInvoice', 'PurchaseReturn', 'InventoryAdjustment');

-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('customer', 'vendor', 'Inventory');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('user', 'admin');
ALTER TABLE "Auth" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Auth" DROP CONSTRAINT "Auth_profileId_fkey";

-- AlterTable
ALTER TABLE "Auth" DROP COLUMN "profileId";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "hscodeapi" TEXT,
ADD COLUMN     "printmapping" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "provinceid" INTEGER,
ADD COLUMN     "saletyeapi" TEXT,
ADD COLUMN     "sandbox" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "scenarionoapi" TEXT,
ADD COLUMN     "showmapping" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "uomapi" TEXT;

-- CreateTable
CREATE TABLE "TaxAreaCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaxAreaCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "customer_no" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "province" TEXT,
    "city" TEXT,
    "contact_name" TEXT,
    "phone_no" TEXT,
    "post_code" TEXT,
    "email" TEXT,
    "tax_area_code_id" TEXT NOT NULL,
    "mobile_number" TEXT,
    "ntn_no" TEXT,
    "strn_no" TEXT,
    "website" TEXT,
    "notes" TEXT,
    "mappingid" TEXT,
    "customer_type" "CustomerVendorType" NOT NULL,
    "registation_status" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vendor" (
    "id" TEXT NOT NULL,
    "vendor_no" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "province" TEXT,
    "city" TEXT,
    "contact_name" TEXT,
    "phone_no" TEXT,
    "post_code" TEXT,
    "email" TEXT,
    "tax_area_code_id" TEXT NOT NULL,
    "mobile_number" TEXT,
    "ntn_no" TEXT,
    "strn_no" TEXT,
    "website" TEXT,
    "notes" TEXT,
    "mappingid" TEXT,
    "vendor_type" "CustomerVendorType" NOT NULL,
    "registation_status" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxGroupCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaxGroupCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemCategoryCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemCategoryCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "item_no" TEXT NOT NULL,
    "hs_code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "uom" TEXT NOT NULL,
    "type" "ItemType" NOT NULL DEFAULT 'inventory',
    "unit_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "retail_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "assessed_unit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "costing_method" "CostingMethod" NOT NULL DEFAULT 'fifo',
    "unit_cost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total_quantity" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "tax_group_code_id" TEXT NOT NULL,
    "saletype" TEXT NOT NULL,
    "sroscheduleno" TEXT NOT NULL,
    "itemserialno" TEXT NOT NULL,
    "ratedesc" TEXT NOT NULL,
    "rateid" INTEGER NOT NULL,
    "ratevalue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "item_category_code_id" TEXT,
    "mappingid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxCalculation" (
    "id" TEXT NOT NULL,
    "tax_group_code_id" TEXT NOT NULL,
    "tax_group_area_id" TEXT NOT NULL,
    "description" TEXT,
    "percentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaxCalculation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseInvoice" (
    "id" TEXT NOT NULL,
    "invoice_no" TEXT NOT NULL,
    "vendor_id" TEXT NOT NULL,
    "auth_id" TEXT NOT NULL,
    "vendor_invoice_no" TEXT,
    "notes" TEXT,
    "posting_date" TIMESTAMP(3) NOT NULL,
    "document_date" TIMESTAMP(3) NOT NULL,
    "posted" BOOLEAN NOT NULL DEFAULT false,
    "totalcost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totaltax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalcostincludingtax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "advancedtax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totaladvancedtax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalcostincludingadvancedtax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseInvoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseInvoiceItem" (
    "id" TEXT NOT NULL,
    "purchase_invoice_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "unit_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "unit_cost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total_cost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "discountamount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalcostincludingdiscount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "taxrate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total_tax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalcostincludingtax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseInvoiceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesInvoice" (
    "id" TEXT NOT NULL,
    "invoice_no" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "auth_id" TEXT NOT NULL,
    "scenario_no" TEXT,
    "notes" TEXT,
    "posting_date" TIMESTAMP(3) NOT NULL,
    "document_date" TIMESTAMP(3) NOT NULL,
    "posted" BOOLEAN NOT NULL DEFAULT false,
    "totalassessedunit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalfedamount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalcost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totaldiscount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalcostincludingdiscount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totaltax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalfurthertax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalcostincludingtax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalcostincludingfurthertax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "advancedtax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totaladvancedtax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalcostincludingadvancedtax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fbrinvoiceno" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalesInvoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesInvoiceItem" (
    "id" TEXT NOT NULL,
    "sales_invoice_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "unit_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "retail_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "assessed_unit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total_assessed_unit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "unit_cost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total_cost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "discountamount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "furthertax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "furtertaxamount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fed" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fedamount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalcostincludingdiscount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "taxrate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total_tax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalcostincludingtax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalcostincludingfurthertax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalesInvoiceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorLedgerEntry" (
    "entry_no" SERIAL NOT NULL,
    "vendor_id" TEXT NOT NULL,
    "invoice_id" TEXT,
    "document_type" "DocumentType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VendorLedgerEntry_pkey" PRIMARY KEY ("entry_no")
);

-- CreateTable
CREATE TABLE "CustomerLedgerEntry" (
    "entry_no" SERIAL NOT NULL,
    "customer_id" TEXT NOT NULL,
    "invoice_id" TEXT,
    "document_type" "DocumentType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerLedgerEntry_pkey" PRIMARY KEY ("entry_no")
);

-- CreateTable
CREATE TABLE "ItemLedgerEntry" (
    "entry_no" SERIAL NOT NULL,
    "item_id" TEXT NOT NULL,
    "document_type" "DocumentType" NOT NULL,
    "source_type" "SourceType" NOT NULL,
    "invoice_id" TEXT,
    "invoice_item_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemLedgerEntry_pkey" PRIMARY KEY ("entry_no")
);

-- CreateTable
CREATE TABLE "SalesReturnInvoice" (
    "id" TEXT NOT NULL,
    "invoice_no" TEXT NOT NULL,
    "sales_invoice_id" TEXT NOT NULL,
    "scenario_no" TEXT,
    "customer_id" TEXT NOT NULL,
    "auth_id" TEXT NOT NULL,
    "notes" TEXT,
    "posting_date" TIMESTAMP(3) NOT NULL,
    "document_date" TIMESTAMP(3) NOT NULL,
    "posted" BOOLEAN NOT NULL DEFAULT false,
    "totalassessedunit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalfedamount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalcost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totaldiscount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalcostincludingdiscount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totaltax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalfurthertax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalcostincludingtax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalcostincludingfurthertax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "advancedtax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totaladvancedtax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalcostincludingadvancedtax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fbrinvoiceno" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalesReturnInvoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesReturnInvoiceItem" (
    "id" TEXT NOT NULL,
    "sales_return_invoice_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "unit_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "retail_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "assessed_unit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total_assessed_unit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "unit_cost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total_cost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "discountamount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "furthertax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "furtertaxamount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fed" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fedamount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalcostincludingdiscount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "taxrate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total_tax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalcostincludingtax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalcostincludingfurthertax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalesReturnInvoiceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseReturnInvoice" (
    "id" TEXT NOT NULL,
    "invoice_no" TEXT NOT NULL,
    "purchase_invoice_id" TEXT NOT NULL,
    "auth_id" TEXT NOT NULL,
    "notes" TEXT,
    "vendor_id" TEXT NOT NULL,
    "vendor_invoice_no" TEXT,
    "posting_date" TIMESTAMP(3) NOT NULL,
    "document_date" TIMESTAMP(3) NOT NULL,
    "posted" BOOLEAN NOT NULL DEFAULT false,
    "totalcost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totaltax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalcostincludingtax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "advancedtax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totaladvancedtax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalcostincludingadvancedtax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseReturnInvoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseReturnInvoiceItem" (
    "id" TEXT NOT NULL,
    "purchase_return_invoice_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "unit_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "unit_cost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "discountamount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalcostincludingdiscount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total_cost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total_tax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "taxrate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalcostincludingtax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseReturnInvoiceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryAdjustment" (
    "id" TEXT NOT NULL,
    "adjustment_no" TEXT NOT NULL,
    "auth_id" TEXT NOT NULL,
    "posting_date" TIMESTAMP(3) NOT NULL,
    "document_date" TIMESTAMP(3) NOT NULL,
    "posted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryAdjustment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryAdjustmentItem" (
    "id" TEXT NOT NULL,
    "inventory_adjustment_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "posted" BOOLEAN NOT NULL DEFAULT false,
    "unit_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "unit_cost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total_cost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryAdjustmentItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TaxAreaCode_code_key" ON "TaxAreaCode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_customer_no_key" ON "Customer"("customer_no");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_vendor_no_key" ON "Vendor"("vendor_no");

-- CreateIndex
CREATE UNIQUE INDEX "TaxGroupCode_code_key" ON "TaxGroupCode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ItemCategoryCode_code_key" ON "ItemCategoryCode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Item_item_no_key" ON "Item"("item_no");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseInvoice_invoice_no_key" ON "PurchaseInvoice"("invoice_no");

-- CreateIndex
CREATE UNIQUE INDEX "SalesInvoice_invoice_no_key" ON "SalesInvoice"("invoice_no");

-- CreateIndex
CREATE UNIQUE INDEX "SalesReturnInvoice_invoice_no_key" ON "SalesReturnInvoice"("invoice_no");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseReturnInvoice_invoice_no_key" ON "PurchaseReturnInvoice"("invoice_no");

-- CreateIndex
CREATE UNIQUE INDEX "InventoryAdjustment_adjustment_no_key" ON "InventoryAdjustment"("adjustment_no");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_tax_area_code_id_fkey" FOREIGN KEY ("tax_area_code_id") REFERENCES "TaxAreaCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "Vendor_tax_area_code_id_fkey" FOREIGN KEY ("tax_area_code_id") REFERENCES "TaxAreaCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_tax_group_code_id_fkey" FOREIGN KEY ("tax_group_code_id") REFERENCES "TaxGroupCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_item_category_code_id_fkey" FOREIGN KEY ("item_category_code_id") REFERENCES "ItemCategoryCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxCalculation" ADD CONSTRAINT "TaxCalculation_tax_group_code_id_fkey" FOREIGN KEY ("tax_group_code_id") REFERENCES "TaxGroupCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxCalculation" ADD CONSTRAINT "TaxCalculation_tax_group_area_id_fkey" FOREIGN KEY ("tax_group_area_id") REFERENCES "TaxAreaCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseInvoice" ADD CONSTRAINT "PurchaseInvoice_auth_id_fkey" FOREIGN KEY ("auth_id") REFERENCES "Auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseInvoice" ADD CONSTRAINT "PurchaseInvoice_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseInvoiceItem" ADD CONSTRAINT "PurchaseInvoiceItem_purchase_invoice_id_fkey" FOREIGN KEY ("purchase_invoice_id") REFERENCES "PurchaseInvoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseInvoiceItem" ADD CONSTRAINT "PurchaseInvoiceItem_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesInvoice" ADD CONSTRAINT "SalesInvoice_auth_id_fkey" FOREIGN KEY ("auth_id") REFERENCES "Auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesInvoice" ADD CONSTRAINT "SalesInvoice_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesInvoiceItem" ADD CONSTRAINT "SalesInvoiceItem_sales_invoice_id_fkey" FOREIGN KEY ("sales_invoice_id") REFERENCES "SalesInvoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesInvoiceItem" ADD CONSTRAINT "SalesInvoiceItem_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorLedgerEntry" ADD CONSTRAINT "VendorLedgerEntry_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerLedgerEntry" ADD CONSTRAINT "CustomerLedgerEntry_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemLedgerEntry" ADD CONSTRAINT "ItemLedgerEntry_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesReturnInvoice" ADD CONSTRAINT "SalesReturnInvoice_auth_id_fkey" FOREIGN KEY ("auth_id") REFERENCES "Auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesReturnInvoice" ADD CONSTRAINT "SalesReturnInvoice_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesReturnInvoice" ADD CONSTRAINT "SalesReturnInvoice_sales_invoice_id_fkey" FOREIGN KEY ("sales_invoice_id") REFERENCES "SalesInvoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesReturnInvoiceItem" ADD CONSTRAINT "SalesReturnInvoiceItem_sales_return_invoice_id_fkey" FOREIGN KEY ("sales_return_invoice_id") REFERENCES "SalesReturnInvoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesReturnInvoiceItem" ADD CONSTRAINT "SalesReturnInvoiceItem_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseReturnInvoice" ADD CONSTRAINT "PurchaseReturnInvoice_auth_id_fkey" FOREIGN KEY ("auth_id") REFERENCES "Auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseReturnInvoice" ADD CONSTRAINT "PurchaseReturnInvoice_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseReturnInvoice" ADD CONSTRAINT "PurchaseReturnInvoice_purchase_invoice_id_fkey" FOREIGN KEY ("purchase_invoice_id") REFERENCES "PurchaseInvoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseReturnInvoiceItem" ADD CONSTRAINT "PurchaseReturnInvoiceItem_purchase_return_invoice_id_fkey" FOREIGN KEY ("purchase_return_invoice_id") REFERENCES "PurchaseReturnInvoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseReturnInvoiceItem" ADD CONSTRAINT "PurchaseReturnInvoiceItem_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryAdjustment" ADD CONSTRAINT "InventoryAdjustment_auth_id_fkey" FOREIGN KEY ("auth_id") REFERENCES "Auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryAdjustmentItem" ADD CONSTRAINT "InventoryAdjustmentItem_inventory_adjustment_id_fkey" FOREIGN KEY ("inventory_adjustment_id") REFERENCES "InventoryAdjustment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryAdjustmentItem" ADD CONSTRAINT "InventoryAdjustmentItem_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
