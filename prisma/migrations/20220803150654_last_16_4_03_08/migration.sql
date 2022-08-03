-- DropForeignKey
ALTER TABLE `brand` DROP FOREIGN KEY `Brand_id_Categorie_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_id_Brand_fkey`;

-- AddForeignKey
ALTER TABLE `Brand` ADD CONSTRAINT `Brand_id_Categorie_fkey` FOREIGN KEY (`id_Categorie`) REFERENCES `Categorie`(`id_Categorie`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_id_Brand_fkey` FOREIGN KEY (`id_Brand`) REFERENCES `Brand`(`id_Brand`) ON DELETE CASCADE ON UPDATE CASCADE;
