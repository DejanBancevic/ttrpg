/*
  Warnings:

  - You are about to drop the column `featsId` on the `FeatInstance` table. All the data in the column will be lost.
  - Added the required column `featSlotInstanceId` to the `FeatInstance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FeatInstance" DROP CONSTRAINT "FeatInstance_featsId_fkey";

-- AlterTable
ALTER TABLE "FeatInstance" DROP COLUMN "featsId",
ADD COLUMN     "featSlotInstanceId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "FeatSlotInstance" (
    "id" TEXT NOT NULL,
    "featSlotLabel" TEXT NOT NULL,
    "featsId" TEXT NOT NULL,

    CONSTRAINT "FeatSlotInstance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FeatSlotInstance" ADD CONSTRAINT "FeatSlotInstance_featsId_fkey" FOREIGN KEY ("featsId") REFERENCES "Feats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatInstance" ADD CONSTRAINT "FeatInstance_featSlotInstanceId_fkey" FOREIGN KEY ("featSlotInstanceId") REFERENCES "FeatSlotInstance"("id") ON DELETE CASCADE ON UPDATE CASCADE;
