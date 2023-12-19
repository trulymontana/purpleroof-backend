/*
  Warnings:

  - You are about to drop the column `emirateId` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `propertyTypeCategoryId` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the `PropertyTypeCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Property` DROP FOREIGN KEY `Property_propertyTypeCategoryId_fkey`;

-- AlterTable
ALTER TABLE `Property` DROP COLUMN `emirateId`,
    DROP COLUMN `propertyTypeCategoryId`,
    ADD COLUMN `propertyCategory` ENUM('APARTMENT_AND_UNIT', 'VILLA', 'ACREAGE', 'BLOCK_OF_UNITS', 'HOUSE', 'TOWNHOUSE', 'LAND', 'BULK_UNIT', 'COMMERCIAL_BUILDING', 'COMMERCIAL_FLOOR', 'COMMERCIAL_VILLA', 'COMMERCIAL_PLOT', 'FACTORY', 'INDUSTRIAL_UNIT_FOR_SALE', 'INDUSTRIAL_LAND', 'MIXED_USED_SAND', 'OFFICE_FOR_SALE', 'RETAIL_FOR_SALE', 'SHOP', 'STAFF_ACCOMMODATION_FOR_SALE', 'WAREHOUSE', 'SELL_COMMERCIAL_LAND', 'OTHER') NULL;

-- DropTable
DROP TABLE `PropertyTypeCategory`;
