/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[googleId]` on the table `User`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User.googleId_unique" ON "User"("googleId");
