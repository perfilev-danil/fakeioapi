/*
  Warnings:

  - A unique constraint covering the columns `[apiId]` on the table `Coin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `apiId` to the `Coin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coin" ADD COLUMN     "apiId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Coin_apiId_key" ON "Coin"("apiId");
