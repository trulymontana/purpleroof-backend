-- DropForeignKey
ALTER TABLE `Property` DROP FOREIGN KEY `Properties_locationId_foreign_idx`;

-- AddForeignKey
ALTER TABLE `Property` ADD CONSTRAINT `Property_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
