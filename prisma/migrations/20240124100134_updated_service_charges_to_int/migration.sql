/*
  Warnings:

  - You are about to alter the column `serviceCharges` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Property` MODIFY `serviceCharges` INTEGER NULL;
