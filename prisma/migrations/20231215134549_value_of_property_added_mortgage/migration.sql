/*
  Warnings:

  - You are about to drop the column `dialCode` on the `Mortgage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Mortgage` DROP COLUMN `dialCode`,
    ADD COLUMN `valueOfProperty` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Property` ADD COLUMN `status` ENUM('SALE', 'RENT') NULL DEFAULT 'SALE';
