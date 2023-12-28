/*
  Warnings:

  - You are about to drop the column `educationalQualification` on the `Mortgage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Mortgage` DROP COLUMN `educationalQualification`,
    ADD COLUMN `educationType` ENUM('ELEMENTARY_SCHOOL', 'MIDDLE_SCHOOL', 'HIGH_SCHOOL', 'COLLEGE', 'VOCATIONAL_SCHOOL', 'GRADUATE_SCHOOL', 'ONLINE_COURSES', 'PROFESSIONAL_DEVELOPMENT', 'HOMESCHOOLING', 'LIFELONG_LEARNING', 'SPECIALIZED_TRAINING_PROGRAMS', 'LANGUAGE_COURSES', 'CERTIFICATE_PROGRAMS', 'TRADE_SCHOOLS') NULL;
