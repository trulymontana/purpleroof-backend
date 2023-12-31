import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { BaseRequest } from 'src/utils/BaseRequest';

export class CreateCommentDto extends BaseRequest {
  @IsString()
  // @IsNotEmpty()
  title: string;

  @IsString()
  message: string;

  @IsArray()
  attachments: string[];

  @IsNotEmpty()
  mortgageId: number;
}
