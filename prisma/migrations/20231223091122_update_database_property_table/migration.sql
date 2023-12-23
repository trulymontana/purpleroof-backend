/*
  Warnings:

  - You are about to drop the column `locationId` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the `PropertyPhotos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Property` DROP FOREIGN KEY `Property_locationId_fkey`;

-- AlterTable
ALTER TABLE `Property` DROP COLUMN `locationId`,
    ADD COLUMN `airportDistance` VARCHAR(255) NULL,
    ADD COLUMN `callPreference` VARCHAR(255) NULL,
    ADD COLUMN `image` TEXT NULL,
    ADD COLUMN `location` VARCHAR(255) NULL,
    ADD COLUMN `metroStation` VARCHAR(255) NULL,
    ADD COLUMN `nearbyPlaces` VARCHAR(255) NULL,
    ADD COLUMN `noticePeriodProperty` INTEGER NULL,
    ADD COLUMN `otherFeatures` TEXT NULL,
    ADD COLUMN `parkingSpaces` INTEGER NULL,
    ADD COLUMN `street` VARCHAR(255) NULL,
    ADD COLUMN `submissionStatus` ENUM('SUBMITTED', 'UNDER_VERIFICATION', 'APPROVED', 'REJECTED') NULL DEFAULT 'SUBMITTED',
    MODIFY `holdingType` ENUM('FREE_HOLD', 'LEASE_HOLD') NULL DEFAULT 'FREE_HOLD';

-- DropTable
DROP TABLE `PropertyPhotos`;

-- CreateTable
CREATE TABLE `Photo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `path` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NOT NULL,
    `propertyId` INTEGER NULL,

    UNIQUE INDEX `path`(`path`),
    INDEX `propertyId`(`propertyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Photo` ADD CONSTRAINT `Photo_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
