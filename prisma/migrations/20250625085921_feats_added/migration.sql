/*
  Warnings:

  - A unique constraint covering the columns `[featsId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `featsId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "featsId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Feats" (
    "id" TEXT NOT NULL,
    "featsLabel" TEXT NOT NULL,

    CONSTRAINT "Feats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatInstance" (
    "id" TEXT NOT NULL,
    "featName" TEXT NOT NULL,
    "featChargeLabel" TEXT NOT NULL,
    "featChargeCurrent" TEXT NOT NULL,
    "featChargeMax" TEXT NOT NULL,
    "featText" TEXT NOT NULL,
    "featsId" TEXT NOT NULL,

    CONSTRAINT "FeatInstance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_featsId_key" ON "Post"("featsId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_featsId_fkey" FOREIGN KEY ("featsId") REFERENCES "Feats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatInstance" ADD CONSTRAINT "FeatInstance_featsId_fkey" FOREIGN KEY ("featsId") REFERENCES "Feats"("id") ON DELETE CASCADE ON UPDATE CASCADE;
