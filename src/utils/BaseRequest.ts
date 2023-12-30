import { UserRoleEnum } from '@prisma/client';
// import { Request } from 'express';

export class BaseRequest {
  userId: number;
  role: UserRoleEnum;
}
