-- AlterTable
ALTER TABLE `Requirement` ADD COLUMN `lifeInsurance` INTEGER NULL,
    ADD COLUMN `preApprovalFee` INTEGER NULL,
    ADD COLUMN `processingFee` INTEGER NULL,
    ADD COLUMN `propertyInsurance` INTEGER NULL,
    ADD COLUMN `rate` INTEGER NULL,
    ADD COLUMN `valuationFee` INTEGER NULL;
