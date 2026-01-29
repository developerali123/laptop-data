/*
  Warnings:

  - You are about to drop the column `range` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "range",
ADD COLUMN     "rangeId" INTEGER;

-- CreateTable
CREATE TABLE "Range" (
    "id" SERIAL NOT NULL,
    "range" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Range_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "brand" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UOMItem" (
    "id" SERIAL NOT NULL,
    "itemno" TEXT NOT NULL,
    "uomId" INTEGER NOT NULL,
    "quantityuom" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UOMItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterInfoCode" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MasterInfoCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WLCM" (
    "id" SERIAL NOT NULL,
    "first" TEXT NOT NULL,
    "second" TEXT,
    "third" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WLCM_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Range_range_key" ON "Range"("range");

-- CreateIndex
CREATE UNIQUE INDEX "Location_code_key" ON "Location"("code");

-- CreateIndex
CREATE UNIQUE INDEX "UOMItem_itemno_key" ON "UOMItem"("itemno");

-- CreateIndex
CREATE UNIQUE INDEX "MasterInfoCode_code_key" ON "MasterInfoCode"("code");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_rangeId_fkey" FOREIGN KEY ("rangeId") REFERENCES "Range"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UOMItem" ADD CONSTRAINT "UOMItem_uomId_fkey" FOREIGN KEY ("uomId") REFERENCES "UOM"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
