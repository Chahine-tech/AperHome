/*
  Warnings:

  - You are about to drop the `Bar` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Bar";

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
