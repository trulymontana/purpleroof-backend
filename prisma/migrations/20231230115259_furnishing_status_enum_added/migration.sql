-- AlterTable
ALTER TABLE `Property` ADD COLUMN `furnishingStatus` ENUM('FULLY_FURNISHED', 'SEMI_FURNISHED', 'UNFURNISHED') NULL DEFAULT 'UNFURNISHED';
