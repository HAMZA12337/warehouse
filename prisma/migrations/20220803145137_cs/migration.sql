/*
  Warnings:

  - Added the required column `id_Categorie` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantite` to the `Brand` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `brand` ADD COLUMN `id_Categorie` INTEGER NOT NULL,
    ADD COLUMN `quantite` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Brand` ADD CONSTRAINT `Brand_id_Categorie_fkey` FOREIGN KEY (`id_Categorie`) REFERENCES `Categorie`(`id_Categorie`) ON DELETE RESTRICT ON UPDATE CASCADE;
