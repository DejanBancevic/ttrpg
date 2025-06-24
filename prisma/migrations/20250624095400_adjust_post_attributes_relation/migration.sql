-- CreateTable
CREATE TABLE "Attributes" (
    "id" TEXT NOT NULL,
    "attributeName" TEXT NOT NULL,
    "attributeValue" TEXT NOT NULL,
    "attributeMod" TEXT NOT NULL,
    "attributeSave" TEXT NOT NULL,
    "attributeColor" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Attributes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attributes" ADD CONSTRAINT "Attributes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
