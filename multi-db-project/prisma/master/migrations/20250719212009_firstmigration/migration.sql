-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dbname" TEXT NOT NULL,
    "dbhost" TEXT NOT NULL,
    "dbport" TEXT NOT NULL,
    "dbuser" TEXT NOT NULL,
    "dbpassword" TEXT NOT NULL,
    "dblocal" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);
