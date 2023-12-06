import { AuthService } from '../../auth/auth.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';

import * as bcrypt from 'bcrypt';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { JwtTokenService } from 'src/auth/jwt-token.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtTokenService,
  ) {}
  createUser = async (createUserDto: CreateUserDto) => {
    let authUser: UserRecord;
    try {
      authUser = await this.authService.createAuthUser(createUserDto.email, createUserDto.password, createUserDto.name);

      const user = await this.prisma.users.create({
        data: {
          // id: authUser.uid,
          email: createUserDto.email,
          firstName: createUserDto.name,
          lastName: createUserDto.name,
          password: await this.createPasswordHash(createUserDto.password),
          role: 'advertiser',
        },
      });

      // send the user a welcome email
      const verificationEmailLink = await this.authService.generateEmailVerificationLink(createUserDto.email);

      const jwttoken = this.jwtService.generateToken({
        authUserId: authUser.uid,
        userId: user.id,
        email: authUser.email,
        username: authUser.displayName,
        roles: ['advertiser'],
      });

      return { authUser, user, verificationEmailLink, jwttoken };
    } catch (err) {
      await this.authService.deleteAuthUser(authUser.uid);
      throw new Error(err.message || "Couldn't create user");
    }
  };

  async findAll() {
    return await this.prisma.users.findMany();
  }

  createPasswordHash = async (password: string) => {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  };

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user ${updateUserDto.name}}`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
