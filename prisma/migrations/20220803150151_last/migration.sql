-- CreateTable
CREATE TABLE `Product` (
    `id_Product` INTEGER NOT NULL AUTO_INCREMENT,
    `model` VARCHAR(191) NOT NULL,
    `serie` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `etat` BOOLEAN NOT NULL DEFAULT false,
    `id_Brand` INTEGER NOT NULL,

    PRIMARY KEY (`id_Product`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_id_Brand_fkey` FOREIGN KEY (`id_Brand`) REFERENCES `Brand`(`id_Brand`) ON DELETE RESTRICT ON UPDATE CASCADE;
