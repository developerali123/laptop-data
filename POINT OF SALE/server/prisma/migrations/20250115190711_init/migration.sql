/*
  Warnings:

  - Added the required column `updatedAt` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Subcategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `UOM` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Subcategory" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "UOM" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "no" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "uomId" INTEGER,
    "unitprice" DOUBLE PRECISION,
    "costingmethod" TEXT,
    "lastdirectcost" DOUBLE PRECISION,
    "vendoritemno" TEXT,
    "blocked" INTEGER,
    "taxgroupcode" TEXT,
    "minimumorderquantity" DOUBLE PRECISION,
    "maximumorderquantity" DOUBLE PRECISION,
    "punchunitofmeasure" TEXT,
    "categoryId" INTEGER,
    "subcategoryId" INTEGER,
    "range" TEXT,
    "seasoncode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_no_key" ON "Item"("no");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_uomId_fkey" FOREIGN KEY ("uomId") REFERENCES "UOM"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "Subcategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
