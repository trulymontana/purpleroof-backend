/*
  Warnings:

  - Made the column `emirate` on table `Location` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Location` MODIFY `emirate` ENUM('DUBAI', 'ABU_DHABI', 'RAS_AL_KHAIMAH', 'SHARJAH', 'FUJAIRAH', 'AJMAN', 'UMM_AL_QUWAIN') NOT NULL;
