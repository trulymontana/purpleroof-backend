import { IsOptional, IsEnum, IsString } from 'class-validator';
import { FinanceTypeEnum, EmirateEnum, PropertyTypeEnum, CompletionStatusEnum, LoanTypeEnum } from '@prisma/client'; // Replace with the correct path

export class CreateMortgageTransactionDto {
  @IsOptional()
  @IsString()
  additionalDetail?: string;

  @IsOptional()
  @IsString()
  customerInformation?: string;

  @IsOptional()
  @IsEnum(FinanceTypeEnum)
  financeType?: FinanceTypeEnum;

  @IsOptional()
  @IsEnum(EmirateEnum)
  emirate?: EmirateEnum;

  @IsOptional()
  @IsEnum(PropertyTypeEnum)
  propertyType?: PropertyTypeEnum;

  @IsOptional()
  @IsEnum(CompletionStatusEnum)
  completionStatus?: CompletionStatusEnum;

  @IsOptional()
  @IsEnum(LoanTypeEnum)
  loanType?: LoanTypeEnum;
}