/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `Token` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Token` ADD COLUMN `token` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Token_token_key` ON `Token`(`token`);
