-- CreateTable
CREATE TABLE `AdvertiseDocuments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `propertyId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `path` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `documentTypeId` INTEGER NOT NULL,
    `advertiserId` INTEGER NOT NULL,

    INDEX `AdvertiseDocuments_advertiserId_foreign_idx`(`advertiserId`),
    INDEX `AdvertiseDocuments_documentTypeId_foreign_idx`(`documentTypeId`),
    INDEX `propertyId`(`propertyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AgentInformations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `agency` VARCHAR(255) NULL,
    `contactNumber` VARCHAR(255) NULL,
    `locationId` INTEGER NOT NULL,
    `realEstateLicenseFilePath` VARCHAR(255) NOT NULL,
    `isActive` BOOLEAN NULL,
    `isApproved` BOOLEAN NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    UNIQUE INDEX `realEstateLicenseFilePath`(`realEstateLicenseFilePath`),
    INDEX `locationId`(`locationId`),
    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Amenities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `type` ENUM('property', 'building', 'community') NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DocumentTypes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(155) NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `isAdvertiserRequirement` BOOLEAN NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Emirates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IncomeProfiles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inqueries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `budget` INTEGER NOT NULL,
    `website` VARCHAR(255) NOT NULL,
    `message` TEXT NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LoanTypes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MortgageCommentAttachments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `path` VARCHAR(255) NULL,
    `commentId` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    INDEX `commentId`(`commentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MortgageComments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `mortgageId` INTEGER NOT NULL,
    `message` TEXT NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    INDEX `mortgageId`(`mortgageId`),
    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MortgageDocuments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mortgageId` INTEGER NOT NULL,
    `name` VARCHAR(255) NULL,
    `path` VARCHAR(255) NULL,
    `documentTypeId` INTEGER NOT NULL,
    `requirementId` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    INDEX `documentTypeId`(`documentTypeId`),
    INDEX `mortgageId`(`mortgageId`),
    INDEX `requirementId`(`requirementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MortgageStatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mortgageId` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `status` ENUM('submitted', 'under documentation stage', 'submitted to bank', 'approved', 'valuation stage', 'final offer letter', 'case disbursed', 'property transfer', 'transaction completed', 'case closed', 'case declined') NULL DEFAULT 'submitted',

    INDEX `mortgageId`(`mortgageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MortgageTransactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `propertyType` ENUM('apartment/townhouse/villa', 'residential land') NULL,
    `completionStatus` ENUM('completed', 'off plan/under construction') NULL,
    `additionalDetail` TEXT NULL,
    `transactionType` INTEGER NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `customerInformation` TEXT NULL,
    `mortgageId` INTEGER NOT NULL,
    `financeType` ENUM('islamic', 'conventional') NULL,
    `emirateId` INTEGER NULL,

    INDEX `MortgageTransactions_emirateId_foreign_idx`(`emirateId`),
    INDEX `MortgageTransactions_mortgageId_foreign_idx`(`mortgageId`),
    INDEX `transactionType`(`transactionType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mortgages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `residentialTypeId` INTEGER NOT NULL,
    `incomeProfileId` INTEGER NOT NULL,
    `loanTypeId` INTEGER NOT NULL,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phoneNumber` VARCHAR(255) NULL,
    `dateOfBirth` DATETIME(0) NOT NULL,
    `intendedProperty` VARCHAR(255) NOT NULL,
    `monthlyIncome` DOUBLE NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `userId` INTEGER NULL,
    `dialCode` VARCHAR(255) NULL,
    `country` VARCHAR(255) NULL DEFAULT '',

    INDEX `Mortgages_userId_foreign_idx`(`userId`),
    INDEX `incomeProfileId`(`incomeProfileId`),
    INDEX `loanTypeId`(`loanTypeId`),
    INDEX `residentialTypeId`(`residentialTypeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Properties` (
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
    `status` ENUM('sale', 'rent') NULL DEFAULT 'sale',
    `userId` INTEGER NULL,
    `draft` TEXT NULL,
    `agentInfoId` INTEGER NULL,
    `paymentInterval` VARCHAR(255) NULL,
    `emirateId` INTEGER NOT NULL,
    `projectStatus` ENUM('off plan/under construction', 'shell & core', 'vacant', 'rented') NULL,
    `numberOfCheques` INTEGER NULL,
    `completionDate` DATETIME(0) NULL,
    `noticePeriodOfRemainingRentalAgreement` INTEGER NULL,
    `numberOfLavatory` INTEGER NULL,
    `rentalAmount` DOUBLE NULL,
    `trakheesiPermitNo` VARCHAR(255) NULL DEFAULT '',
    `lat` FLOAT NULL,
    `lng` FLOAT NULL,

    INDEX `Properties_agentInfoId_foreign_idx`(`agentInfoId`),
    INDEX `Properties_emirateId_foreign_idx`(`emirateId`),
    INDEX `Properties_locationId_foreign_idx`(`locationId`),
    INDEX `Properties_userId_foreign_idx`(`userId`),
    INDEX `propertyTypeCategoryId`(`propertyTypeCategoryId`),
    INDEX `propertyTypeId`(`propertyTypeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PropertyAmenities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `propertyId` INTEGER NOT NULL,
    `amenityId` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `value` VARCHAR(255) NULL DEFAULT '',

    INDEX `amenityId`(`amenityId`),
    INDEX `propertyId`(`propertyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PropertyDocuments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `propertyId` INTEGER NOT NULL,
    `name` VARCHAR(255) NULL,
    `path` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    UNIQUE INDEX `path`(`path`),
    INDEX `propertyId`(`propertyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PropertyLocations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `emirateId` INTEGER NULL,

    UNIQUE INDEX `name`(`name`),
    INDEX `PropertyLocations_emirateId_foreign_idx`(`emirateId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PropertyPhotos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `propertyId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `path` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    UNIQUE INDEX `path`(`path`),
    INDEX `propertyId`(`propertyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PropertyTypeCategories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `propertyTypeId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    INDEX `propertyTypeId`(`propertyTypeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PropertyTypes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Requirements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `documentTypeIds` TEXT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `residentialTypeId` INTEGER NULL,
    `incomeProfileId` INTEGER NULL,
    `rates` JSON NOT NULL,

    INDEX `Requirements_incomeProfileId_foreign_idx`(`incomeProfileId`),
    INDEX `Requirements_residentialTypeId_foreign_idx`(`residentialTypeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResidentialTypes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SequelizeMeta` (
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `role` ENUM('admin', 'advertiser', 'agent') NULL DEFAULT 'advertiser',
    `isEmailConfirmed` BOOLEAN NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AdvertiseDocuments` ADD CONSTRAINT `AdvertiseDocuments_advertiserId_foreign_idx` FOREIGN KEY (`advertiserId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `AdvertiseDocuments` ADD CONSTRAINT `AdvertiseDocuments_documentTypeId_foreign_idx` FOREIGN KEY (`documentTypeId`) REFERENCES `DocumentTypes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `AdvertiseDocuments` ADD CONSTRAINT `AdvertiseDocuments_ibfk_1` FOREIGN KEY (`propertyId`) REFERENCES `Properties`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `AgentInformations` ADD CONSTRAINT `AgentInformations_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `AgentInformations` ADD CONSTRAINT `AgentInformations_ibfk_2` FOREIGN KEY (`locationId`) REFERENCES `PropertyLocations`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `MortgageCommentAttachments` ADD CONSTRAINT `MortgageCommentAttachments_ibfk_1` FOREIGN KEY (`commentId`) REFERENCES `MortgageComments`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `MortgageComments` ADD CONSTRAINT `MortgageComments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `MortgageComments` ADD CONSTRAINT `MortgageComments_ibfk_2` FOREIGN KEY (`mortgageId`) REFERENCES `Mortgages`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `MortgageDocuments` ADD CONSTRAINT `MortgageDocuments_ibfk_1` FOREIGN KEY (`mortgageId`) REFERENCES `Mortgages`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `MortgageDocuments` ADD CONSTRAINT `MortgageDocuments_ibfk_2` FOREIGN KEY (`documentTypeId`) REFERENCES `DocumentTypes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `MortgageDocuments` ADD CONSTRAINT `MortgageDocuments_ibfk_3` FOREIGN KEY (`requirementId`) REFERENCES `Requirements`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `MortgageStatus` ADD CONSTRAINT `MortgageStatus_ibfk_1` FOREIGN KEY (`mortgageId`) REFERENCES `Mortgages`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `MortgageTransactions` ADD CONSTRAINT `MortgageTransactions_emirateId_foreign_idx` FOREIGN KEY (`emirateId`) REFERENCES `Emirates`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `MortgageTransactions` ADD CONSTRAINT `MortgageTransactions_ibfk_2` FOREIGN KEY (`transactionType`) REFERENCES `LoanTypes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `MortgageTransactions` ADD CONSTRAINT `MortgageTransactions_mortgageId_foreign_idx` FOREIGN KEY (`mortgageId`) REFERENCES `Mortgages`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Mortgages` ADD CONSTRAINT `Mortgages_ibfk_1` FOREIGN KEY (`residentialTypeId`) REFERENCES `ResidentialTypes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Mortgages` ADD CONSTRAINT `Mortgages_ibfk_2` FOREIGN KEY (`incomeProfileId`) REFERENCES `IncomeProfiles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Mortgages` ADD CONSTRAINT `Mortgages_ibfk_3` FOREIGN KEY (`loanTypeId`) REFERENCES `LoanTypes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Mortgages` ADD CONSTRAINT `Mortgages_userId_foreign_idx` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Properties` ADD CONSTRAINT `Properties_agentInfoId_foreign_idx` FOREIGN KEY (`agentInfoId`) REFERENCES `AgentInformations`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Properties` ADD CONSTRAINT `Properties_emirateId_foreign_idx` FOREIGN KEY (`emirateId`) REFERENCES `Emirates`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Properties` ADD CONSTRAINT `Properties_ibfk_1` FOREIGN KEY (`propertyTypeId`) REFERENCES `PropertyTypes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Properties` ADD CONSTRAINT `Properties_ibfk_2` FOREIGN KEY (`propertyTypeCategoryId`) REFERENCES `PropertyTypeCategories`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Properties` ADD CONSTRAINT `Properties_locationId_foreign_idx` FOREIGN KEY (`locationId`) REFERENCES `PropertyLocations`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Properties` ADD CONSTRAINT `Properties_userId_foreign_idx` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `PropertyAmenities` ADD CONSTRAINT `PropertyAmenities_ibfk_1` FOREIGN KEY (`propertyId`) REFERENCES `Properties`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `PropertyAmenities` ADD CONSTRAINT `PropertyAmenities_ibfk_2` FOREIGN KEY (`amenityId`) REFERENCES `Amenities`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `PropertyDocuments` ADD CONSTRAINT `PropertyDocuments_ibfk_1` FOREIGN KEY (`propertyId`) REFERENCES `Properties`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `PropertyLocations` ADD CONSTRAINT `PropertyLocations_emirateId_foreign_idx` FOREIGN KEY (`emirateId`) REFERENCES `Emirates`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `PropertyPhotos` ADD CONSTRAINT `PropertyPhotos_ibfk_1` FOREIGN KEY (`propertyId`) REFERENCES `Properties`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `PropertyTypeCategories` ADD CONSTRAINT `PropertyTypeCategories_ibfk_1` FOREIGN KEY (`propertyTypeId`) REFERENCES `PropertyTypes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Requirements` ADD CONSTRAINT `Requirements_incomeProfileId_foreign_idx` FOREIGN KEY (`incomeProfileId`) REFERENCES `IncomeProfiles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Requirements` ADD CONSTRAINT `Requirements_residentialTypeId_foreign_idx` FOREIGN KEY (`residentialTypeId`) REFERENCES `ResidentialTypes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

