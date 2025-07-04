/*
  Warnings:

  - A unique constraint covering the columns `[inventoryId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `inventoryId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "inventoryId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "invLabel" TEXT NOT NULL,
    "invWeightLabel" TEXT NOT NULL,
    "invWeightCurrent" TEXT NOT NULL,
    "invWeightMax" TEXT NOT NULL,
    "invWeightUnit" TEXT NOT NULL,
    "invCurrenyLabel" TEXT NOT NULL,
    "invBagAllLabel" TEXT NOT NULL,
    "postId" TEXT,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrencyInstance" (
    "id" TEXT NOT NULL,
    "currenyValue" TEXT NOT NULL,
    "currenyLabel" TEXT NOT NULL,
    "inventoryId" TEXT NOT NULL,

    CONSTRAINT "CurrencyInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BagInstance" (
    "id" TEXT NOT NULL,
    "bagLabel" TEXT NOT NULL,
    "itemNameLabel" TEXT NOT NULL,
    "itemLabel1" TEXT NOT NULL,
    "itemLabel2" TEXT NOT NULL,
    "itemLabel3" TEXT NOT NULL,
    "itemLabel4" TEXT NOT NULL,
    "itemLabel5" TEXT NOT NULL,
    "inventoryId" TEXT NOT NULL,

    CONSTRAINT "BagInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemInstance" (
    "id" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "itemValue1" TEXT NOT NULL,
    "itemValue2" TEXT NOT NULL,
    "itemValue3" TEXT NOT NULL,
    "itemValue4" TEXT NOT NULL,
    "itemValue5" TEXT NOT NULL,
    "bagInstanceId" TEXT NOT NULL,

    CONSTRAINT "ItemInstance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_inventoryId_key" ON "Post"("inventoryId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrencyInstance" ADD CONSTRAINT "CurrencyInstance_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BagInstance" ADD CONSTRAINT "BagInstance_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemInstance" ADD CONSTRAINT "ItemInstance_bagInstanceId_fkey" FOREIGN KEY ("bagInstanceId") REFERENCES "BagInstance"("id") ON DELETE CASCADE ON UPDATE CASCADE;
