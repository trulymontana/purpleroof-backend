/*
  Warnings:

  - You are about to drop the column `historyFor` on the `History` table. All the data in the column will be lost.
  - Added the required column `type` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `History` DROP COLUMN `historyFor`,
    ADD COLUMN `type` ENUM('MORTGAGE', 'PROPERTY', 'COMMENT') NOT NULL;
