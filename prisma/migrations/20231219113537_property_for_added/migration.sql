/*
  Warnings:

  - You are about to drop the column `status` on the `Property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Property` DROP COLUMN `status`,
    ADD COLUMN `propertyFor` ENUM('SALE', 'RENT') NULL DEFAULT 'SALE';
