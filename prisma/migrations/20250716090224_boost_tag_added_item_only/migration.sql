/*
  Warnings:

  - You are about to drop the `ItemTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ItemInstanceTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ItemInstanceTags" DROP CONSTRAINT "_ItemInstanceTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemInstanceTags" DROP CONSTRAINT "_ItemInstanceTags_B_fkey";

-- DropTable
DROP TABLE "ItemTag";

-- DropTable
DROP TABLE "_ItemInstanceTags";

-- CreateTable
CREATE TABLE "BoostTag" (
    "id" TEXT NOT NULL,
    "tagValue" TEXT NOT NULL,

    CONSTRAINT "BoostTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ItemInstanceBoostTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ItemInstanceBoostTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ItemInstanceBoostTag_B_index" ON "_ItemInstanceBoostTag"("B");

-- AddForeignKey
ALTER TABLE "_ItemInstanceBoostTag" ADD CONSTRAINT "_ItemInstanceBoostTag_A_fkey" FOREIGN KEY ("A") REFERENCES "BoostTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemInstanceBoostTag" ADD CONSTRAINT "_ItemInstanceBoostTag_B_fkey" FOREIGN KEY ("B") REFERENCES "ItemInstance"("id") ON DELETE CASCADE ON UPDATE CASCADE;
