/*
  Warnings:

  - Made the column `lifeInsurance` on table `Requirement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `preApprovalFee` on table `Requirement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `processingFee` on table `Requirement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `propertyInsurance` on table `Requirement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rate` on table `Requirement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `valuationFee` on table `Requirement` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Requirement` MODIFY `lifeInsurance` INTEGER NOT NULL DEFAULT 0,
    MODIFY `preApprovalFee` INTEGER NOT NULL DEFAULT 0,
    MODIFY `processingFee` INTEGER NOT NULL DEFAULT 0,
    MODIFY `propertyInsurance` INTEGER NOT NULL DEFAULT 0,
    MODIFY `rate` INTEGER NOT NULL DEFAULT 0,
    MODIFY `valuationFee` INTEGER NOT NULL DEFAULT 0;
