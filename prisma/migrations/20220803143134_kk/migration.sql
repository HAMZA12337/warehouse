-- CreateTable
CREATE TABLE `Brand` (
    `id_Brand` INTEGER NOT NULL AUTO_INCREMENT,
    `label_Brand` VARCHAR(191) NOT NULL,
    
    UNIQUE INDEX `Brand_label_Brand_key`(`label_Brand`),
    PRIMARY KEY (`id_Brand`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
