/*
  Warnings:

  - You are about to drop the column `dblocal` on the `Company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "dblocal";

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");
