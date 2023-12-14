-- CreateTable
CREATE TABLE `Property` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `propertyTypeId` INTEGER NOT NULL,
    `propertyTypeCategoryId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `size` DOUBLE NULL,
    `numberOfBedRooms` INTEGER NULL,
    `numberOfBathRooms` INTEGER NULL,
    `maintenanceFee` DOUBLE NULL,
    `address` VARCHAR(255) NULL,
    `landmark` TEXT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `locationId` INTEGER NULL,
    `minimumContract` DOUBLE NULL,
    `noticePeriod` DOUBLE NULL,
    `deedNumber` VARCHAR(255) NULL,
    `unitNumber` INTEGER NULL,
    `buildingName` VARCHAR(255) NULL,
    `floor` INTEGER NULL,
    `isApproved` BOOLEAN NULL,
    `userId` INTEGER NULL,
    `draft` TEXT NULL,
    `agentInfoId` INTEGER NULL,
    `paymentInterval` VARCHAR(255) NULL,
    `emirateId` INTEGER NOT NULL,
    `numberOfCheques` INTEGER NULL,
    `completionDate` DATETIME(0) NULL,
    `noticePeriodOfRemainingRentalAgreement` INTEGER NULL,
    `numberOfLavatory` INTEGER NULL,
    `rentalAmount` DOUBLE NULL,
    `trakheesiPermitNo` VARCHAR(255) NULL DEFAULT '',
    `lat` FLOAT NULL,
    `lng` FLOAT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
