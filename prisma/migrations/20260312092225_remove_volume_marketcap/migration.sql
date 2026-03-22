/*
  Warnings:

  - You are about to drop the column `marketCap` on the `Metric` table. All the data in the column will be lost.
  - You are about to drop the column `volume` on the `Metric` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Metric" DROP COLUMN "marketCap",
DROP COLUMN "volume";
