/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[name]` on the table `Restaurant`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Restaurant.name_unique" ON "Restaurant"("name");
