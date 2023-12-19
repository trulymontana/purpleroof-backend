/*
  Warnings:

  - The values [VACANT,RENTED] on the enum `Property_projectStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Property` ADD COLUMN `occupencyStatus` ENUM('VACANT', 'OCCUPIED') NULL,
    MODIFY `projectStatus` ENUM('OFF_PLAN_UNDER_CONSTRUCTION', 'SHELL_AND_CORE', 'COMPLETED') NULL;
