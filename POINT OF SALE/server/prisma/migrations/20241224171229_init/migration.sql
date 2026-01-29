-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'cashier');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "UserName" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Role" "Role" NOT NULL DEFAULT 'cashier',
    "OutletCode" TEXT,
    "pageaccess" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_UserName_key" ON "User"("UserName");
