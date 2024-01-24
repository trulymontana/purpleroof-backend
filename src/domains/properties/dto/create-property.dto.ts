import { IsString, IsOptional, IsNumber, IsEnum, IsBoolean, IsArray, IsEmail } from 'class-validator';
import {
  ProjectStatusEnum,
  EmirateEnum,
  PropertyTypeEnum,
  DocumentTypeEnum,
  PropertyCategoryEnum,
  HoldingTypeEnum,
  PropertyForEnum,
  OccupencyStatusEnum,
  SubmissionStatusEnum,
  FurnishingStatusEnum,
  PropertyCompletionStatusEnum,
} from '@prisma/client';
import { BaseRequest } from 'src/utils/BaseRequest';
export class CreatePropertyDto extends BaseRequest {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  phone: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  image: string;

  @IsString()
  @IsOptional()
  callPreference: string;

  @IsNumber()
  @IsOptional()
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
  parkingSpaces?: number;

  @IsOptional()
  @IsNumber()
  airportDistance?: number;

  @IsOptional()
  @IsNumber()
  maintenanceFee?: number;

  @IsOptional()
  @IsNumber()
  noticePeriodProperty?: number;

  @IsOptional()
  @IsNumber()
  serviceCharges?: number;

  @IsOptional()
  @IsString()
  layoutType?: number;

  @IsOptional()
  @IsNumber()
  noticePeriodRent?: number;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  nearbyPlaces?: string;

  @IsOptional()
  @IsArray()
  photos: string[];

  @IsOptional()
  @IsArray()
  amenities?: number[];

  @IsOptional()
  @IsString()
  otherFeatures?: string;

  @IsOptional()
  @IsNumber()
  metroStationDistance?: number;

  @IsOptional()
  @IsString()
  landmark?: string;

  @IsNumber()
  locationId?: number;

  @IsOptional()
  @IsString()
  cityName?: string;

  @IsOptional()
  @IsString()
  communityName?: string;

  @IsOptional()
  completionDate?: Date;

  @IsOptional()
  @IsNumber()
  minimumContract?: number;

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
  @IsEnum(PropertyCompletionStatusEnum)
  completionStatus: PropertyCompletionStatusEnum;

  @IsOptional()
  @IsEnum(FurnishingStatusEnum)
  furnishingStatus: FurnishingStatusEnum;

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
  @IsEnum(SubmissionStatusEnum)
  submissionStatus?: SubmissionStatusEnum;

  // @IsOptional()
  // @IsNumber()
  // locationId?: number;

  // @IsOptional()
  // @IsNumber()
  // agentId?: number;

  @IsOptional()
  documents?: DocumentCreateDto[]; // Assuming Document is another DTO or entity, replace with the correct type
}

interface DocumentCreateDto {
  type: DocumentTypeEnum;
  url: string;
}
