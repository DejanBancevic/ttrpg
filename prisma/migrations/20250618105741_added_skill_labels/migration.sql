/*
  Warnings:

  - Added the required column `profsLabel` to the `Skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skillsLabel` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "profsLabel" TEXT NOT NULL,
ADD COLUMN     "skillsLabel" TEXT NOT NULL;
