-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('IN_PROGRESS', 'CANCELED');

-- CreateTable
CREATE TABLE "User" (
    "UserId" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("UserId")
);

-- CreateTable
CREATE TABLE "Book" (
    "BookId" TEXT NOT NULL,
    "BookTitle" TEXT NOT NULL,
    "BookWriterName" TEXT NOT NULL,
    "BookImageURL" TEXT NOT NULL,
    "BookPrice" BIGINT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("BookId")
);

-- CreateTable
CREATE TABLE "Tag" (
    "TagId" TEXT NOT NULL,
    "TagName" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("TagId")
);

-- CreateTable
CREATE TABLE "BookTag" (
    "BookId" TEXT NOT NULL,
    "TagId" TEXT NOT NULL,

    CONSTRAINT "BookTag_pkey" PRIMARY KEY ("BookId","TagId")
);

-- CreateTable
CREATE TABLE "Cart" (
    "UserId" TEXT NOT NULL,
    "BookId" TEXT NOT NULL,
    "Quantity" TEXT NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("UserId","BookId")
);

-- CreateTable
CREATE TABLE "Order" (
    "UserId" TEXT NOT NULL,
    "BookId" TEXT NOT NULL,
    "Quantity" TEXT NOT NULL,
    "Status" "OrderStatus" NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("UserId","BookId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- AddForeignKey
ALTER TABLE "BookTag" ADD CONSTRAINT "BookTag_BookId_fkey" FOREIGN KEY ("BookId") REFERENCES "Book"("BookId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookTag" ADD CONSTRAINT "BookTag_TagId_fkey" FOREIGN KEY ("TagId") REFERENCES "Tag"("TagId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_BookId_fkey" FOREIGN KEY ("BookId") REFERENCES "Book"("BookId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_BookId_fkey" FOREIGN KEY ("BookId") REFERENCES "Book"("BookId") ON DELETE RESTRICT ON UPDATE CASCADE;
