/*
  Warnings:

  - A unique constraint covering the columns `[spellsId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `spellsId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "spellsId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Spells" (
    "id" TEXT NOT NULL,
    "spellsLabel" TEXT NOT NULL,
    "spellsModifierLabel" TEXT NOT NULL,
    "spellsAttackLabel" TEXT NOT NULL,
    "spellsSaveLabel" TEXT NOT NULL,
    "spellsModifier" TEXT NOT NULL,
    "spellsAttack" TEXT NOT NULL,
    "spellsSave" TEXT NOT NULL,

    CONSTRAINT "Spells_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpellSlotInstance" (
    "id" TEXT NOT NULL,
    "spellSlotBoxLabel" TEXT NOT NULL,
    "spellSlotLabel" TEXT NOT NULL,
    "spellSlotCurrent" TEXT NOT NULL,
    "spellSlotMax" TEXT NOT NULL,
    "spellNameLabel" TEXT NOT NULL,
    "spellLabel1" TEXT NOT NULL,
    "spellLabel2" TEXT NOT NULL,
    "spellLabel3" TEXT NOT NULL,
    "spellLabel4" TEXT NOT NULL,
    "spellsId" TEXT NOT NULL,

    CONSTRAINT "SpellSlotInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpellInstance" (
    "id" TEXT NOT NULL,
    "spellNameValue" TEXT NOT NULL,
    "spellValue1" TEXT NOT NULL,
    "spellValue2" TEXT NOT NULL,
    "spellValue3" TEXT NOT NULL,
    "spellValue4" TEXT NOT NULL,
    "spellSlotInstanceId" TEXT NOT NULL,

    CONSTRAINT "SpellInstance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_spellsId_key" ON "Post"("spellsId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_spellsId_fkey" FOREIGN KEY ("spellsId") REFERENCES "Spells"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpellSlotInstance" ADD CONSTRAINT "SpellSlotInstance_spellsId_fkey" FOREIGN KEY ("spellsId") REFERENCES "Spells"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpellInstance" ADD CONSTRAINT "SpellInstance_spellSlotInstanceId_fkey" FOREIGN KEY ("spellSlotInstanceId") REFERENCES "SpellSlotInstance"("id") ON DELETE CASCADE ON UPDATE CASCADE;
