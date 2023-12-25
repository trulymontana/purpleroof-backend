/*
  Warnings:

  - You are about to drop the column `noticePeriodProperty` on the `Property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Property` DROP COLUMN `noticePeriodProperty`,
    MODIFY `noticePeriod` INTEGER NULL,
    MODIFY `image` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `Requirement` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
