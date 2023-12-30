/*
  Warnings:

  - You are about to drop the column `metroStation` on the `Property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Property` DROP COLUMN `metroStation`,
    ADD COLUMN `metroStationDistance` INTEGER NULL;
