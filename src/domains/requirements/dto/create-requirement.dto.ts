import {
  IsEnum,
  IsString,
  IsArray,
  ValidateNested,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DocumentTypeEnum, IncomeProfileEnum, ResidenceTypeEnum } from '@prisma/client';

class CreateRequiredDocumentDto {
  @IsOptional()
  id: number;

  @IsString()
  name: string;

  @IsEnum(DocumentTypeEnum)
  documentType: DocumentTypeEnum;

  @IsBoolean()
  isMandatory: boolean;
}

export class CreateRequirementDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(IncomeProfileEnum)
  @IsNotEmpty()
  incomeProfile: IncomeProfileEnum;

  @IsEnum(ResidenceTypeEnum)
  @IsNotEmpty()
  residenceType: ResidenceTypeEnum;

  @IsNumber()
  @IsNotEmpty()
  preApprovalFee: number;

  @IsNumber()
  @IsNotEmpty()
  processingFee: number;

  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @IsNumber()
  @IsNotEmpty()
  lifeInsurance: number;

  @IsNumber()
  @IsNotEmpty()
  propertyInsurance: number;

  @IsNumber()
  @IsNotEmpty()
  valuationFee: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRequiredDocumentDto)
  requiredDocuments: CreateRequiredDocumentDto[];
}
