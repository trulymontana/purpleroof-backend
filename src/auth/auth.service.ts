import { BadRequestException, Injectable } from '@nestjs/common';
import { SignInRequest } from './dto/sign-in-request.dto';
import { SignUpRequest } from './dto/sign-up-request.dto';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserRoleEnum } from '@prisma/client';
import { generateToken } from 'src/utils/jwt-utils';
import { randomBytes } from 'crypto';
import { ForgotPasswordRequest } from './dto/forgot-password-request.dto';
import { EmailService } from 'src/common/providers/email/email.service';
import { ResetPasswordRequest } from './dto/reset-password-request.dto';
import { UiPageLinks } from 'src/constants/ui-links';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async signIn(request: SignInRequest) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: request.email,
      },
    });

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const isPasswordValid = await bcrypt.compare(request.password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
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
      userAuthId: user.authId ?? '',
      userId: user.id,
      email: user.email,
      username: `${user.firstName} ${user.lastName}`,
      role: user.role,
    });

    return { user, jwtToken };
  }

  async signUp(request: SignUpRequest) {
    console.log(request);

    // let authUser;
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

      const random = randomBytes(16).toString('hex');

      const existingProperties = await this.prisma.property.findMany({
        where: {
          email: request.email,
        },
      });

      const existingMortgages = await this.prisma.mortgage.findMany({
        where: {
          email: request.email,
        },
      });

      console.log(existingMortgages, existingProperties);

      user = await this.prisma.user.create({
        data: {
          email: request.email,
          firstName: request.firstName,
          lastName: request.lastName,
          password: await this.createPasswordHash(request.password),
          role: UserRoleEnum.GENERAL_USER,
          // authId: authUser?.uid ?? '',
          authId: random,
          mortgages: {
            connect: existingMortgages.map((mortgage) => ({ id: mortgage.id })),
          },
          properties: {
            connect: existingProperties.map((property) => ({ id: property.id })),
          },
        } as any,
      });

      console.log(user);

      // TODO send the link via email
      // const verificationEmailLink = await this.generateEmailVerificationLink(request.email);

      const jwtToken = generateToken({
        userAuthId: random,
        userId: user.id,
        email: user.email,
        username: user.firstName,
        role: UserRoleEnum.GENERAL_USER,
      });

      return { user, jwtToken };
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

  async forgotPassword(forgotPassword: ForgotPasswordRequest) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: forgotPassword.email,
      },
    });

    if (!existingUser) {
      throw new BadRequestException('User does not exist');
    }

    const random = randomBytes(16).toString('hex');

    await this.prisma.user.update({
      where: {
        email: forgotPassword.email,
      },
      data: {
        passwordResetToken: random,
      },
    });

    const resetPasswordLink = UiPageLinks.ResetPasswordPage + random;

    await this.emailService.sendEmail({
      emailFrom: 'info@sirefinance.com',
      emailTo: forgotPassword.email,
      subject: 'Reset Password',
      message: `Someone (hopefully you!) requested to change your password for purpleroof dashboard. You can do that from the below link ${resetPasswordLink}`,
    });

    return { message: 'Password reset link sent successfully' };
  }

  async resetPassword(resetPasswordRequest: ResetPasswordRequest) {
    if (resetPasswordRequest.newPassword !== resetPasswordRequest.confirmNewPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const existingUser = await this.prisma.user.findFirst({
      where: {
        passwordResetToken: resetPasswordRequest.resetPasswordToken,
      },
    });

    if (!existingUser) {
      throw new BadRequestException('User does not exist');
    }

    await this.prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        password: await this.createPasswordHash(resetPasswordRequest.newPassword),
        passwordResetToken: '',
      },
    });

    return { message: 'Password reset successfully' };
  }

  async getUserDetails(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: +userId,
      },
    });

    user.password = '';

    return user;
  }

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
