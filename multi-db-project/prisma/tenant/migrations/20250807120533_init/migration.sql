/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Auth` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Auth` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `Auth` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Auth` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Auth` table. All the data in the column will be lost.
  - You are about to drop the column `auth_id` on the `InventoryAdjustment` table. All the data in the column will be lost.
  - You are about to drop the column `auth_id` on the `PurchaseInvoice` table. All the data in the column will be lost.
  - You are about to drop the column `auth_id` on the `PurchaseReturnInvoice` table. All the data in the column will be lost.
  - You are about to drop the column `auth_id` on the `SalesInvoice` table. All the data in the column will be lost.
  - You are about to drop the column `auth_id` on the `SalesReturnInvoice` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userid]` on the table `Auth` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userid` to the `Auth` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InventoryAdjustment" DROP CONSTRAINT "InventoryAdjustment_auth_id_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseInvoice" DROP CONSTRAINT "PurchaseInvoice_auth_id_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseReturnInvoice" DROP CONSTRAINT "PurchaseReturnInvoice_auth_id_fkey";

-- DropForeignKey
ALTER TABLE "SalesInvoice" DROP CONSTRAINT "SalesInvoice_auth_id_fkey";

-- DropForeignKey
ALTER TABLE "SalesReturnInvoice" DROP CONSTRAINT "SalesReturnInvoice_auth_id_fkey";

-- AlterTable
ALTER TABLE "Auth" DROP COLUMN "createdAt",
DROP COLUMN "isActive",
DROP COLUMN "isVerified",
DROP COLUMN "password",
DROP COLUMN "updatedAt",
ADD COLUMN     "userid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "InventoryAdjustment" DROP COLUMN "auth_id";

-- AlterTable
ALTER TABLE "PurchaseInvoice" DROP COLUMN "auth_id";

-- AlterTable
ALTER TABLE "PurchaseReturnInvoice" DROP COLUMN "auth_id";

-- AlterTable
ALTER TABLE "SalesInvoice" DROP COLUMN "auth_id";

-- AlterTable
ALTER TABLE "SalesReturnInvoice" DROP COLUMN "auth_id";

-- CreateIndex
CREATE UNIQUE INDEX "Auth_userid_key" ON "Auth"("userid");
