/*
  Warnings:

  - You are about to drop the column `locationId` on the `Agent` table. All the data in the column will be lost.
  - You are about to drop the column `realEstateLicenseFilePath` on the `Agent` table. All the data in the column will be lost.
  - You are about to drop the column `commentId` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the `Photo` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Agent` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Agent` DROP FOREIGN KEY `Agent_locationId_fkey`;

-- DropForeignKey
ALTER TABLE `Document` DROP FOREIGN KEY `Document_commentId_fkey`;

-- DropForeignKey
ALTER TABLE `Photo` DROP FOREIGN KEY `Photo_propertyId_fkey`;

-- DropIndex
DROP INDEX `realEstateLicenseFilePath` ON `Agent`;

-- AlterTable
ALTER TABLE `Agent` DROP COLUMN `locationId`,
    DROP COLUMN `realEstateLicenseFilePath`;

-- AlterTable
ALTER TABLE `Document` DROP COLUMN `commentId`,
    ADD COLUMN `agentId` INTEGER NULL,
    MODIFY `type` ENUM('PASSPORT_COPY', 'VISA_COPY', 'EMIRATES_ID', 'BANK_STATEMENT_6_MONTHS', 'BANK_STATEMENT_1_YEAR', 'SALARY_CERTIFICATE', 'TRADE_LICENSE', 'MEMORANDUM_WITH_AMENDMENTS', 'VAT_CERTIFICATE_RETURN_RECEIPTS', 'OFFICE_TENANCY_CONTRACT_UTILITY_BILL', 'COMPANY_PROFILE_WEBSITE', 'TITLE_DEED_COPY', 'TENANCY_CONTRACT_COPY', 'RENTAL_CHEQUE_COPY', 'BANK_STATEMENT_3_MONTHS_EQUIVALENT_AED_25000', 'PROOF_OF_RESIDENCE', 'PROOF_OF_INCOME', 'COMPANY_BANK_STATEMENT_6_MONTHS', 'OWNERSHIP_PROOF_MOBILE_NUMBER', 'REAL_ESTATE_LICENSE') NOT NULL;

-- AlterTable
ALTER TABLE `Property` MODIFY `amount` DOUBLE NULL;

-- AlterTable
ALTER TABLE `RequiredDocument` MODIFY `documentType` ENUM('PASSPORT_COPY', 'VISA_COPY', 'EMIRATES_ID', 'BANK_STATEMENT_6_MONTHS', 'BANK_STATEMENT_1_YEAR', 'SALARY_CERTIFICATE', 'TRADE_LICENSE', 'MEMORANDUM_WITH_AMENDMENTS', 'VAT_CERTIFICATE_RETURN_RECEIPTS', 'OFFICE_TENANCY_CONTRACT_UTILITY_BILL', 'COMPANY_PROFILE_WEBSITE', 'TITLE_DEED_COPY', 'TENANCY_CONTRACT_COPY', 'RENTAL_CHEQUE_COPY', 'BANK_STATEMENT_3_MONTHS_EQUIVALENT_AED_25000', 'PROOF_OF_RESIDENCE', 'PROOF_OF_INCOME', 'COMPANY_BANK_STATEMENT_6_MONTHS', 'OWNERSHIP_PROOF_MOBILE_NUMBER', 'REAL_ESTATE_LICENSE') NOT NULL;

-- DropTable
DROP TABLE `Photo`;

-- CreateTable
CREATE TABLE `File` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `path` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NOT NULL,
    `propertyId` INTEGER NULL,
    `commentId` INTEGER NULL,

    UNIQUE INDEX `path`(`path`),
    INDEX `propertyId`(`propertyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AgentToLocation` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AgentToLocation_AB_unique`(`A`, `B`),
    INDEX `_AgentToLocation_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Agent_userId_key` ON `Agent`(`userId`);

-- AddForeignKey
ALTER TABLE `Document` ADD CONSTRAINT `Document_agentId_fkey` FOREIGN KEY (`agentId`) REFERENCES `Agent`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AgentToLocation` ADD CONSTRAINT `_AgentToLocation_A_fkey` FOREIGN KEY (`A`) REFERENCES `Agent`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AgentToLocation` ADD CONSTRAINT `_AgentToLocation_B_fkey` FOREIGN KEY (`B`) REFERENCES `Location`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
