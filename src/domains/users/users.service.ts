import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';

import * as bcrypt from 'bcrypt';
import { UserRoleEnum } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  createUser = async (createUserDto: CreateUserDto) => {
    return await this.prisma.user.create({
      data: { ...createUserDto, authId: 'test-id' },
    });
  };

  async findAll() {
    return await this.prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
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
    return `This action updates a #${id} user ${updateUserDto.firstName}}`;
  }

  updateRole(id: number, updatedRole: UserRoleEnum) {
    const existingUser = this.prisma.user.findUnique({ where: { id } });

    if (!existingUser) {
      throw new Error('User not found');
    }

    return this.prisma.user.update({
      where: { id },
      data: { role: updatedRole },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
