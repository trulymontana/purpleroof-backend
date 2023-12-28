/*
  Warnings:

  - You are about to drop the `MortgageTransaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `MortgageTransaction` DROP FOREIGN KEY `MortgageTransactions_mortgageId_foreign_idx`;

-- AlterTable
ALTER TABLE `Mortgage` ADD COLUMN `additionalDetail` TEXT NULL,
    ADD COLUMN `completionStatus` ENUM('COMPLETED', 'UNDER_CONSTRUCTION') NULL,
    ADD COLUMN `customerInformation` TEXT NULL,
    ADD COLUMN `emirate` ENUM('DUBAI', 'ABU_DHABI', 'RAS_AL_KHAIMAH', 'SHARJAH', 'FUJAIRAH', 'AJMAN', 'UMM_AL_QUWAIN') NULL,
    ADD COLUMN `financeType` ENUM('ISLAMIC', 'CONVENTIONAL') NULL,
    ADD COLUMN `propertyType` ENUM('RESIDENTIAL', 'COMMERCIAL') NULL;

-- AlterTable
ALTER TABLE `RequiredDocument` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `MortgageTransaction`;
