import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  name: string;

  @IsEnum(['superadmin', 'admin', 'advertiser', 'agent'])
  role: string;
}
