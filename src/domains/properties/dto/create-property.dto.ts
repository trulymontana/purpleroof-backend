import { IsString, IsOptional, IsNumber, IsEnum, IsBoolean } from 'class-validator';
import {
  ProjectStatusEnum,
  EmirateEnum,
  PropertyTypeEnum,
  DocumentTypeEnum,
  PropertyCategoryEnum,
  HoldingTypeEnum,
  PropertyForEnum,
  OccupencyStatusEnum,
} from '@prisma/client';
export class CreatePropertyDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  phone: string;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsNumber()
  size?: number;

  @IsOptional()
  @IsNumber()
  numberOfBedRooms?: number;

  @IsOptional()
  @IsNumber()
  numberOfBathRooms?: number;

  @IsOptional()
  @IsNumber()
  maintenanceFee?: number;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  landmark?: string;

  @IsOptional()
  completionDate?: Date;

  @IsOptional()
  @IsNumber()
  minimumContract?: number;

  @IsOptional()
  @IsNumber()
  noticePeriod?: number;

  @IsOptional()
  @IsString()
  deedNumber?: string;

  @IsOptional()
  @IsNumber()
  unitNumber?: number;

  @IsOptional()
  @IsString()
  buildingName?: string;

  @IsOptional()
  @IsNumber()
  floor?: number;

  @IsOptional()
  @IsBoolean()
  isApproved?: boolean;

  @IsOptional()
  @IsString()
  draft?: string;

  @IsOptional()
  @IsString()
  paymentInterval?: string;

  @IsOptional()
  @IsNumber()
  numberOfCheques?: number;

  @IsOptional()
  @IsNumber()
  noticePeriodOfRemainingRentalAgreement?: number;

  @IsOptional()
  @IsNumber()
  numberOfLavatory?: number;

  @IsOptional()
  @IsNumber()
  rentalAmount?: number;

  @IsOptional()
  @IsString()
  trakheesiPermitNo?: string;

  @IsOptional()
  @IsNumber()
  lat?: number;

  @IsOptional()
  @IsNumber()
  lng?: number;

  @IsOptional()
  @IsEnum(ProjectStatusEnum)
  projectStatus: ProjectStatusEnum;

  @IsOptional()
  @IsEnum(OccupencyStatusEnum)
  occupancyStatus: OccupencyStatusEnum;

  @IsOptional()
  @IsEnum(PropertyForEnum)
  propertyFor: PropertyForEnum;

  @IsOptional()
  @IsEnum(PropertyTypeEnum)
  propertyType: PropertyTypeEnum;

  @IsOptional()
  @IsEnum(HoldingTypeEnum)
  holdingType: HoldingTypeEnum;

  @IsOptional()
  @IsEnum(PropertyCategoryEnum)
  propertyCategory: PropertyCategoryEnum;

  @IsOptional()
  @IsEnum(EmirateEnum)
  emirate?: EmirateEnum;

  @IsOptional()
  @IsNumber()
  locationId?: number;

  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsNumber()
  agentId?: number;

  @IsOptional()
  documents?: DocumentCreateDto[]; // Assuming Document is another DTO or entity, replace with the correct type
}

interface DocumentCreateDto {
  type: DocumentTypeEnum;
  url: string;
}

// // @ts-ignore
// delete property.locationId
// // @ts-ignore
// delete property.street
// // @ts-ignore
// delete property.propertyImage
// // @ts-ignore
// delete property.propertyPhotos
// // @ts-ignore
// delete property.status
// // @ts-ignore
// delete property.parkingSpaces
// // @ts-ignore
// delete property.airportDistance
// // @ts-ignore
// delete property.metroStation
// // @ts-ignore
// delete property.nearbyPlaces
// // @ts-ignore
// delete property.otherFeatures
// // @ts-ignore
// delete property.amenities
// // @ts-ignore
// delete property.noticePeriodProperty
// // @ts-ignore
// delete property.callPreference
