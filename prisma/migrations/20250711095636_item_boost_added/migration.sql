-- CreateTable
CREATE TABLE "ItemBoost" (
    "id" TEXT NOT NULL,
    "boosterId" TEXT NOT NULL,
    "boostedById" TEXT,
    "targetField" TEXT NOT NULL,
    "boostAmount" INTEGER NOT NULL,
    "targetTag" TEXT,
    "targetType" TEXT,

    CONSTRAINT "ItemBoost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemTag" (
    "id" TEXT NOT NULL,
    "tagValue" TEXT NOT NULL,

    CONSTRAINT "ItemTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ItemInstanceTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ItemInstanceTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ItemInstanceTags_B_index" ON "_ItemInstanceTags"("B");

-- AddForeignKey
ALTER TABLE "ItemBoost" ADD CONSTRAINT "ItemBoost_boosterId_fkey" FOREIGN KEY ("boosterId") REFERENCES "ItemInstance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemBoost" ADD CONSTRAINT "ItemBoost_boostedById_fkey" FOREIGN KEY ("boostedById") REFERENCES "ItemInstance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemInstanceTags" ADD CONSTRAINT "_ItemInstanceTags_A_fkey" FOREIGN KEY ("A") REFERENCES "ItemInstance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemInstanceTags" ADD CONSTRAINT "_ItemInstanceTags_B_fkey" FOREIGN KEY ("B") REFERENCES "ItemTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
