/*
  Warnings:

  - A unique constraint covering the columns `[passivesId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `passivesId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "passivesId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Passives" (
    "id" TEXT NOT NULL,
    "passiveLabel" TEXT NOT NULL,
    "postId" TEXT,

    CONSTRAINT "Passives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PassiveFirstInstance" (
    "id" TEXT NOT NULL,
    "passiveName" TEXT NOT NULL,
    "passiveValue" TEXT NOT NULL,
    "passivesId" TEXT NOT NULL,

    CONSTRAINT "PassiveFirstInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PassiveSecondInstance" (
    "id" TEXT NOT NULL,
    "passiveName" TEXT NOT NULL,
    "passiveValue" TEXT NOT NULL,
    "passivesId" TEXT NOT NULL,

    CONSTRAINT "PassiveSecondInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PassiveThirdInstance" (
    "id" TEXT NOT NULL,
    "passiveName" TEXT NOT NULL,
    "passiveValue" TEXT NOT NULL,
    "passivesId" TEXT NOT NULL,

    CONSTRAINT "PassiveThirdInstance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_passivesId_key" ON "Post"("passivesId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_passivesId_fkey" FOREIGN KEY ("passivesId") REFERENCES "Passives"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PassiveFirstInstance" ADD CONSTRAINT "PassiveFirstInstance_passivesId_fkey" FOREIGN KEY ("passivesId") REFERENCES "Passives"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PassiveSecondInstance" ADD CONSTRAINT "PassiveSecondInstance_passivesId_fkey" FOREIGN KEY ("passivesId") REFERENCES "Passives"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PassiveThirdInstance" ADD CONSTRAINT "PassiveThirdInstance_passivesId_fkey" FOREIGN KEY ("passivesId") REFERENCES "Passives"("id") ON DELETE CASCADE ON UPDATE CASCADE;
