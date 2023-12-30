import { IsOptional, IsNumber, IsEnum, IsArray } from 'class-validator';
import { EmirateEnum, PropertyTypeEnum, PropertyCategoryEnum, PropertyForEnum } from '@prisma/client';

export class SearchPropertyDto {
  @IsNumber()
  @IsOptional()
  minPrice: number;

  @IsNumber()
  @IsOptional()
  maxPrice: number;

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
  @IsArray()
  amenities?: number[];

  @IsOptional()
  @IsArray()
  locations?: string[];

  @IsOptional()
  @IsEnum(PropertyForEnum)
  propertyFor: PropertyForEnum;

  @IsOptional()
  @IsEnum(PropertyTypeEnum, { each: true })
  @IsArray()
  propertyTypes: PropertyTypeEnum[];

  @IsOptional()
  @IsEnum(PropertyCategoryEnum, { each: true })
  @IsArray()
  propertyCategories: PropertyCategoryEnum[];

  @IsOptional()
  @IsArray()
  @IsEnum(EmirateEnum, { each: true })
  emirates: EmirateEnum[];
}
