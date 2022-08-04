/*
  Warnings:

  - A unique constraint covering the columns `[serie]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Product_serie_key` ON `Product`(`serie`);
