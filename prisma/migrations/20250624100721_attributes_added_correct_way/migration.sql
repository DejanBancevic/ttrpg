/*
  Warnings:

  - You are about to drop the column `attributeColor` on the `Attributes` table. All the data in the column will be lost.
  - You are about to drop the column `attributeMod` on the `Attributes` table. All the data in the column will be lost.
  - You are about to drop the column `attributeName` on the `Attributes` table. All the data in the column will be lost.
  - You are about to drop the column `attributeSave` on the `Attributes` table. All the data in the column will be lost.
  - You are about to drop the column `attributeValue` on the `Attributes` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Attributes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[attributesId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Attributes" DROP CONSTRAINT "Attributes_postId_fkey";

-- AlterTable
ALTER TABLE "Attributes" DROP COLUMN "attributeColor",
DROP COLUMN "attributeMod",
DROP COLUMN "attributeName",
DROP COLUMN "attributeSave",
DROP COLUMN "attributeValue",
DROP COLUMN "postId";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "attributesId" TEXT;

-- CreateTable
CREATE TABLE "AttributeInstance" (
    "id" TEXT NOT NULL,
    "attributeName" TEXT NOT NULL,
    "attributeValue" TEXT NOT NULL,
    "attributeMod" TEXT NOT NULL,
    "attributeSave" TEXT NOT NULL,
    "attributeColor" TEXT NOT NULL,
    "attributesId" TEXT NOT NULL,

    CONSTRAINT "AttributeInstance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_attributesId_key" ON "Post"("attributesId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_attributesId_fkey" FOREIGN KEY ("attributesId") REFERENCES "Attributes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttributeInstance" ADD CONSTRAINT "AttributeInstance_attributesId_fkey" FOREIGN KEY ("attributesId") REFERENCES "Attributes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
