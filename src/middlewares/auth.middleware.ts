import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';

import { Response, NextFunction } from 'express';

import { BaseRequest } from 'src/utils/BaseRequest';
import { IJwtPayload, verifyToken } from 'src/utils/jwt-utils';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: BaseRequest, res: Response, next: NextFunction) {
    // Extract and verify the token logic goes here
    try {
      const token = req.headers['authorization'];
      if (token) {
        const payload: IJwtPayload | string = verifyToken(token);
        req.userId = payload.userId;
        req.role = payload.role;
      }
    } catch (err) {
      throw new UnauthorizedException('Unauthorized: the provided token is invalid');
    }

    next();
  }
}
