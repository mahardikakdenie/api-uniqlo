/*
  Warnings:

  - You are about to drop the column `userId` on the `Token` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Token` DROP FOREIGN KEY `Token_userId_fkey`;

-- AlterTable
ALTER TABLE `Token` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `token_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_token_id_fkey` FOREIGN KEY (`token_id`) REFERENCES `Token`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
