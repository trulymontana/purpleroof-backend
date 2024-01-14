-- AlterTable
ALTER TABLE `User` ADD COLUMN `passwordResetToken` VARCHAR(255) NOT NULL DEFAULT '';
