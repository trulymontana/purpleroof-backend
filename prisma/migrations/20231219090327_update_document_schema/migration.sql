/*
  Warnings:

  - You are about to drop the column `documentType` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `Document` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[url]` on the table `Document` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `path` ON `Document`;

-- AlterTable
ALTER TABLE `Document` DROP COLUMN `documentType`,
    DROP COLUMN `path`,
    ADD COLUMN `type` ENUM('PASSPORT_COPY', 'VISA_COPY', 'EMIRATES_ID', 'BANK_STATEMENT_6_MONTHS', 'BANK_STATEMENT_1_YEAR', 'SALARY_CERTIFICATE', 'TRADE_LICENSE', 'MEMORANDUM_WITH_AMENDMENTS', 'VAT_CERTIFICATE_RETURN_RECEIPTS', 'OFFICE_TENANCY_CONTRACT_UTILITY_BILL', 'COMPANY_PROFILE_WEBSITE', 'TITLE_DEED_COPY', 'TENANCY_CONTRACT_COPY', 'RENTAL_CHEQUE_COPY', 'BANK_STATEMENT_3_MONTHS_EQUIVALENT_AED_25000', 'PROOF_OF_RESIDENCE', 'PROOF_OF_INCOME', 'COMPANY_BANK_STATEMENT_6_MONTHS', 'OWNERSHIP_PROOF_MOBILE_NUMBER') NOT NULL,
    ADD COLUMN `url` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `url` ON `Document`(`url`);
