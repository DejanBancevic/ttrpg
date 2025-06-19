/*
  Warnings:

  - You are about to drop the column `skillsid` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[skillsId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `skillsId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_postId_fkey";

-- DropIndex
DROP INDEX "Post_skillsid_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "skillsid",
ADD COLUMN     "skillsId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Skill";

-- CreateTable
CREATE TABLE "Skills" (
    "id" TEXT NOT NULL,
    "skillsLabel" TEXT NOT NULL,
    "profsLabel" TEXT NOT NULL,

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillInstance" (
    "id" TEXT NOT NULL,
    "skillName" TEXT NOT NULL,
    "skillValue" TEXT NOT NULL,
    "skillProf" TEXT NOT NULL,
    "skillsId" TEXT NOT NULL,

    CONSTRAINT "SkillInstance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_skillsId_key" ON "Post"("skillsId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_skillsId_fkey" FOREIGN KEY ("skillsId") REFERENCES "Skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillInstance" ADD CONSTRAINT "SkillInstance_skillsId_fkey" FOREIGN KEY ("skillsId") REFERENCES "Skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;
