import {
  IsString,
  IsEmail,
  IsOptional,
  IsDateString,
  IsNumber,
  IsEnum,
  IsArray,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import {
  MaritalStatusEnum,
  EducationTypeEnum,
  FinanceTypeEnum,
  EmirateEnum,
  PropertyTypeEnum,
  CompletionStatusEnum,
  MortgageStatusEnum,
  ResidenceTypeEnum,
  IncomeProfileEnum,
  LoanTypeEnum,
  DocumentTypeEnum,
} from '@prisma/client';
import { Type } from 'class-transformer';
import { BaseRequest } from 'src/utils/BaseRequest';

export class CreateMortgageDto extends BaseRequest {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsDateString()
  dateOfBirth: string;

  @IsString()
  intendedProperty: string;

  @IsNumber()
  monthlyIncome: number;

  @IsOptional()
  @IsNumber()
  valueOfProperty?: number;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  additionalDetail: string;

  @IsOptional()
  customerInformation: string;

  @IsOptional()
  favoriteCity: string;

  @IsOptional()
  @IsNumber()
  yearsInUae: number;

  @IsOptional()
  @IsNumber()
  familyMembersInUae: number;

  @IsOptional()
  uaeResidenceAddress: string;

  @IsOptional()
  homeCountryAddress: string;

  @IsEnum(MortgageStatusEnum)
  status: MortgageStatusEnum;

  @IsEnum(ResidenceTypeEnum)
  residenceType: ResidenceTypeEnum;

  @IsEnum(IncomeProfileEnum)
  incomeProfile: IncomeProfileEnum;

  @IsEnum(LoanTypeEnum)
  loanType: LoanTypeEnum;

  @IsOptional()
  @IsEnum(MaritalStatusEnum)
  maritalStatus: MaritalStatusEnum;

  @IsOptional()
  @IsEnum(EducationTypeEnum)
  educationType: EducationTypeEnum;

  @IsOptional()
  @IsEnum(FinanceTypeEnum)
  financeType: FinanceTypeEnum;

  @IsOptional()
  @IsEnum(EmirateEnum)
  emirate: EmirateEnum;

  @IsOptional()
  @IsEnum(PropertyTypeEnum)
  propertyType: PropertyTypeEnum;

  @IsOptional()
  @IsEnum(CompletionStatusEnum)
  completionStatus: CompletionStatusEnum;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDocumentDto)
  documents: CreateDocumentDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateReferenceDto)
  references: CreateReferenceDto[];
}

class CreateReferenceDto {
  @IsOptional()
  id: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  relationship: string;
}

class CreateDocumentDto {
  @IsOptional()
  id: number;

  @IsNotEmpty()
  @IsEnum(DocumentTypeEnum)
  type: DocumentTypeEnum;

  @IsNotEmpty()
  url: string;
}
