/*
  Warnings:

  - You are about to drop the column `authorId` on the `Basics` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Health` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[skillsid]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Basics" DROP CONSTRAINT "Basics_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Health" DROP CONSTRAINT "Health_authorId_fkey";

-- AlterTable
ALTER TABLE "Basics" DROP COLUMN "authorId";

-- AlterTable
ALTER TABLE "Health" DROP COLUMN "authorId";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "skillsid" TEXT;

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "skillName" TEXT NOT NULL,
    "skillValue" TEXT NOT NULL,
    "skillProf" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_skillsid_key" ON "Post"("skillsid");

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
