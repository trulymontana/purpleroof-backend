-- AlterTable
ALTER TABLE `Reference` ADD COLUMN `mortgageId` INTEGER NULL,
    MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `Reference` ADD CONSTRAINT `Reference_mortgageId_fkey` FOREIGN KEY (`mortgageId`) REFERENCES `Mortgage`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
