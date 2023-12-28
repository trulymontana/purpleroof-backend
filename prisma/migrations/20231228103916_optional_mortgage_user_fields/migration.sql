-- DropForeignKey
ALTER TABLE `History` DROP FOREIGN KEY `History_mortgageId_fkey`;

-- DropForeignKey
ALTER TABLE `History` DROP FOREIGN KEY `History_userId_fkey`;

-- AlterTable
ALTER TABLE `History` MODIFY `mortgageId` INTEGER NULL,
    MODIFY `userId` INTEGER NULL,
    MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_mortgageId_fkey` FOREIGN KEY (`mortgageId`) REFERENCES `Mortgage`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
