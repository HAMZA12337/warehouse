/*
  Warnings:

  - A unique constraint covering the columns `[label_categorie]` on the table `Categorie` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Categorie_label_categorie_key` ON `Categorie`(`label_categorie`);
