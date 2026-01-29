-- CreateTable
CREATE TABLE "UOM" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "UOM_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UOM_name_key" ON "UOM"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UOM_symbol_key" ON "UOM"("symbol");
