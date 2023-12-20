import { Injectable } from '@nestjs/common';
import { SignInRequest } from './dto/sign-in-request.dto';
import { SignUpRequest } from './dto/sign-up-request.dto';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserRoleEnum } from '@prisma/client';
import { generateToken } from 'src/utils/jwt-utils';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signIn(request: SignInRequest) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: request.email,
      },
    });

    if (!user) {
      throw new Error('User does not exist');
    }

    const isPasswordValid = await bcrypt.compare(request.password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // const authUser = await firebaseAdminAuth.signInWithEmailAndPassword(request.email, request.password);

    // const additionalClaims = {
    //   role: user.role,
    //   userId: user.id,
    //   username: `${user.firstName} ${user.lastName}`,
    //   email: user.email,
    // };
    // const customToken = firebaseAdminAuth.createCustomToken(user.authId, additionalClaims);

    const jwtToken = generateToken({
      userAuthId: user.authId,
      userId: user.id,
      email: user.email,
      username: `${user.firstName} ${user.lastName}`,
      role: user.role,
    });

    return { user, jwtToken };
  }

  async signUp(request: SignUpRequest) {
    console.log(request);

    let authUser;
    let user;

    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: request.email,
      },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    try {
      // authUser = await firebaseAdminAuth.createUser({
      //   email: request.email,
      //   password: request.password,
      //   displayName: `${request.firstName} ${request.lastName}`,
      //   disabled: false,
      //   emailVerified: false,
      // });

      // console.log(authUser);

      user = await this.prisma.user.create({
        data: {
          email: request.email,
          firstName: request.firstName,
          lastName: request.lastName,
          password: await this.createPasswordHash(request.password),
          role: UserRoleEnum.ADVERTISER,
          authId: authUser.uid,
        },
      });

      console.log(user);

      // TODO send the link via email
      // const verificationEmailLink = await this.generateEmailVerificationLink(request.email);

      const jwtToken = generateToken({
        userAuthId: authUser.uid,
        userId: user.id,
        email: authUser.email,
        username: authUser.displayName,
        role: UserRoleEnum.ADVERTISER,
      });

      return { authUser, user, jwtToken };
    } catch (e: any) {
      // if (authUser) await this.deleteAuthUser(authUser?.uid);
      if (user)
        await this.prisma.user.delete({
          where: {
            email: request.email,
          },
        });
      throw new Error(e.message);
    }
  }

  // async getUser(uid: string) {
  //   const user = await firebaseAdminAuth.getUser(uid);

  //   return user;
  // }

  // deleteAuthUser = async (uid: string) => {
  //   await firebaseAdminAuth.deleteUser(uid);
  // };

  // generatePasswordResetLink = async (email: string) => {
  //   const link = await firebaseAdminAuth.generatePasswordResetLink(email);

  //   return link;
  // };

  // generateEmailVerificationLink = async (email: string) => {
  //   const link = await firebaseAdminAuth.generateEmailVerificationLink(email, {
  //     url: 'https://www.mohammadfaisal.dev',
  //   });

  //   return link;
  // };

  createPasswordHash = async (password: string) => {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  };
}
