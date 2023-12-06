import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { firebaseAdminAuth } from 'src/utils/firebase-admin-auth';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return false;
    }

    const token = authHeader.split(' ')[1];

    try {
      const user = await firebaseAdminAuth.verifyIdToken(token);

      request.user = user;

      return true;
    } catch (error) {
      return false;
    }
  }
}
