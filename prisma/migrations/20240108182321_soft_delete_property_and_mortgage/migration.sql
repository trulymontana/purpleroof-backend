-- AlterTable
ALTER TABLE `Mortgage` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Property` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;
