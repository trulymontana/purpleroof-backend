import { Injectable } from '@nestjs/common';
import { firebaseAdminAuth } from 'src/utils/firebase-admin-auth';

@Injectable()
export class AuthService {
  async getUser(uid: string) {
    const user = await firebaseAdminAuth.getUser(uid);

    return user;
  }

  async createAuthUser(email: string, password: string, name: string) {
    let user;
    await firebaseAdminAuth
      .createUser({
        email: email,
        password: password,
        displayName: name,
        disabled: false,
      })
      .then((userRecord) => {
        user = userRecord;
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully created new user:', userRecord);
      })
      .catch((error) => {
        console.log('Error creating new user:', error);
        throw new Error(error.message || "Couldn't create user");
      });

    return user;
  }

  deleteAuthUser = async (uid: string) => {
    await firebaseAdminAuth.deleteUser(uid);
  };

  generatePasswordResetLink = async (email: string) => {
    const link = await firebaseAdminAuth.generatePasswordResetLink(email);

    return link;
  };

  generateEmailVerificationLink = async (email: string) => {
    const link = await firebaseAdminAuth.generateEmailVerificationLink(email);

    return link;
  };
}
