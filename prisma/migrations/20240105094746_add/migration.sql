-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('SUPER_ADMIN', 'ADMIN', 'ADVERTISER', 'AGENT') NOT NULL DEFAULT 'ADVERTISER';
