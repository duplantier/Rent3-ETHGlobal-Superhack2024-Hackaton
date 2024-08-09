-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('RENT', 'DEPOSIT');

-- CreateTable
CREATE TABLE "Tenant" (
    "id" SERIAL NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "nullifierHash" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rentedPropertyId" INTEGER,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyOwner" (
    "id" SERIAL NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "nullifierHash" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PropertyOwner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "ownerAddress" TEXT NOT NULL,
    "tenantAddress" TEXT,
    "address" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "size" INTEGER,
    "description" TEXT NOT NULL,
    "rentalPrice" DOUBLE PRECISION NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentalPayment" (
    "id" SERIAL NOT NULL,
    "tenantAddress" TEXT NOT NULL,
    "ownerAddress" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentType" "PaymentType" NOT NULL,

    CONSTRAINT "RentalPayment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_walletAddress_key" ON "Tenant"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_nullifierHash_key" ON "Tenant"("nullifierHash");

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_email_key" ON "Tenant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_rentedPropertyId_key" ON "Tenant"("rentedPropertyId");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyOwner_walletAddress_key" ON "PropertyOwner"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyOwner_nullifierHash_key" ON "PropertyOwner"("nullifierHash");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyOwner_email_key" ON "PropertyOwner"("email");

-- AddForeignKey
ALTER TABLE "Tenant" ADD CONSTRAINT "Tenant_rentedPropertyId_fkey" FOREIGN KEY ("rentedPropertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_ownerAddress_fkey" FOREIGN KEY ("ownerAddress") REFERENCES "PropertyOwner"("walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalPayment" ADD CONSTRAINT "RentalPayment_tenantAddress_fkey" FOREIGN KEY ("tenantAddress") REFERENCES "Tenant"("walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalPayment" ADD CONSTRAINT "RentalPayment_ownerAddress_fkey" FOREIGN KEY ("ownerAddress") REFERENCES "PropertyOwner"("walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE;
