-- DropIndex
DROP INDEX `User_refresh_token_key` ON `user`;

-- AlterTable
ALTER TABLE `user` MODIFY `refresh_token` VARCHAR(191) NULL;
