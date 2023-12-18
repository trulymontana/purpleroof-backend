import { IsString, IsOptional, IsNumber, IsEnum, IsDate, IsBoolean } from 'class-validator';
import { PropertiesStatusEnum, ProjectStatusEnum, EmirateEnum, PropertyTypeEnum } from '@prisma/client';
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
  @IsDate()
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
  @IsNumber()
  agentInfoId?: number;

  @IsOptional()
  @IsString()
  paymentInterval?: string;

  @IsNumber()
  emirateId: number;

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
  projectStatus?: ProjectStatusEnum;

  @IsOptional()
  @IsEnum(PropertiesStatusEnum)
  status?: PropertiesStatusEnum;

  @IsOptional()
  @IsEnum(PropertyTypeEnum)
  propertyType?: PropertyTypeEnum;

  @IsOptional()
  @IsEnum(EmirateEnum)
  emirate?: EmirateEnum;

  @IsNumber()
  propertyTypeCategoryId: number;

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
  documents?: Document[]; // Assuming Document is another DTO or entity, replace with the correct type
}
