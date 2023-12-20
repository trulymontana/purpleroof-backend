import { UserRoleEnum } from '@prisma/client';
import { Request } from 'express';

export class BaseRequest extends Request {
  userId: number;
  role: UserRoleEnum;
}
