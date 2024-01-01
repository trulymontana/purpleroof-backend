/*
  Warnings:

  - You are about to drop the column `isActive` on the `Agent` table. All the data in the column will be lost.
  - You are about to drop the column `isApproved` on the `Agent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Agent` DROP COLUMN `isActive`,
    DROP COLUMN `isApproved`,
    ADD COLUMN `activeStatus` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    ADD COLUMN `approvalStatus` ENUM('APPROVED', 'NOT_APPROVED') NOT NULL DEFAULT 'NOT_APPROVED';
