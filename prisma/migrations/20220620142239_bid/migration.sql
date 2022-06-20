-- CreateEnum
CREATE TYPE "Bid_Status" AS ENUM ('Ditawar', 'Diterima', 'Ditolak');

-- CreateTable
CREATE TABLE "Bid" (
    "id" SERIAL NOT NULL,
    "offer_price" INTEGER NOT NULL,
    "status" "Bid_Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BidToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BidToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BidToUser_AB_unique" ON "_BidToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_BidToUser_B_index" ON "_BidToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BidToProduct_AB_unique" ON "_BidToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_BidToProduct_B_index" ON "_BidToProduct"("B");

-- AddForeignKey
ALTER TABLE "_BidToUser" ADD CONSTRAINT "_BidToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Bid"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BidToUser" ADD CONSTRAINT "_BidToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BidToProduct" ADD CONSTRAINT "_BidToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Bid"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BidToProduct" ADD CONSTRAINT "_BidToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
