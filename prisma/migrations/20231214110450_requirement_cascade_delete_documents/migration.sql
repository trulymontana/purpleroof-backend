/*
  Warnings:

  - You are about to alter the column `updatedAt` on the `Requirement` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.

*/
-- DropForeignKey
ALTER TABLE `RequiredDocument` DROP FOREIGN KEY `RequiredDocument_requirementId_fkey`;

-- AlterTable
ALTER TABLE `Requirement` MODIFY `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AddForeignKey
ALTER TABLE `RequiredDocument` ADD CONSTRAINT `RequiredDocument_requirementId_fkey` FOREIGN KEY (`requirementId`) REFERENCES `Requirement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
