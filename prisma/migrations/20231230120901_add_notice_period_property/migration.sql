/*
  Warnings:

  - You are about to drop the column `noticePeriod` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `noticePeriodOfRemainingRentalAgreement` on the `Property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Property` DROP COLUMN `noticePeriod`,
    DROP COLUMN `noticePeriodOfRemainingRentalAgreement`,
    ADD COLUMN `noticePeriodProperty` INTEGER NULL,
    ADD COLUMN `noticePeriodRent` INTEGER NULL;
