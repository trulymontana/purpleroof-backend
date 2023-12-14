import { IsEnum, IsString, IsArray, ValidateNested, IsBoolean, IsOptional } from 'class-validator';
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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRequiredDocumentDto)
  requiredDocuments: CreateRequiredDocumentDto[];
}
