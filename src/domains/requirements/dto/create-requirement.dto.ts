import { IsEnum, IsString, IsArray, ValidateNested, IsBoolean, IsOptional, IsNumber } from 'class-validator';
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
  name: string;

  @IsEnum(IncomeProfileEnum)
  incomeProfile: IncomeProfileEnum;

  @IsEnum(ResidenceTypeEnum)
  residenceType: ResidenceTypeEnum;

  @IsNumber()
  preApprovalFee: number;

  @IsNumber()
  processingFee: number;

  @IsNumber()
  rate: number;

  @IsNumber()
  lifeInsurance: number;

  @IsNumber()
  propertyInsurance: number;

  @IsNumber()
  valuationFee: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRequiredDocumentDto)
  requiredDocuments: CreateRequiredDocumentDto[];
}
