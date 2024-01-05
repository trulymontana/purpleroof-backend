import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { firebaseAdminAuth } from 'src/utils/firebase-admin-auth';
import { verifyToken } from 'src/utils/jwt-utils';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];

    console.log('auth header', authHeader);
    if (!authHeader) {
      return false;
    }

    verifyToken(authHeader);

    return true;
    // try {
    //   const user = await firebaseAdminAuth.verifyIdToken(token);

    //   console.log('DECODED TOKEN', user);

    //   request.user = user;

    //   return true;
    // } catch (error) {
    //   return false;
    // }
  }
}
