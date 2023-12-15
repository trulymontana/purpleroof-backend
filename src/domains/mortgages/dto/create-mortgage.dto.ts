import { IsString, IsEmail, IsOptional, IsDateString, IsNumber, IsEnum } from 'class-validator';
import { MortgageStatusEnum, ResidenceTypeEnum, IncomeProfileEnum, LoanTypeEnum } from '@prisma/client'; // Replace with the correct path

export class CreateMortgageDto {
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

  @IsEnum(MortgageStatusEnum)
  status: MortgageStatusEnum;

  @IsEnum(ResidenceTypeEnum)
  residenceType: ResidenceTypeEnum;

  @IsEnum(IncomeProfileEnum)
  incomeProfile: IncomeProfileEnum;

  @IsEnum(LoanTypeEnum)
  loanType: LoanTypeEnum;
}
