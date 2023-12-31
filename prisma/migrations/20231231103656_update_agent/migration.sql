/*
  Warnings:

  - Made the column `isActive` on table `Agent` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isApproved` on table `Agent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Agent` MODIFY `isActive` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `isApproved` BOOLEAN NOT NULL DEFAULT false;
