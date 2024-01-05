import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseRequest } from 'src/utils/BaseRequest';

export class CreateAgentDto extends BaseRequest {
  agency: string;

  @IsNotEmpty()
  @IsString()
  contactNumber: string;

  @IsNotEmpty()
  @IsString()
  realEstateLicense: string;

  @IsArray()
  @IsOptional()
  locations: number[];
}
