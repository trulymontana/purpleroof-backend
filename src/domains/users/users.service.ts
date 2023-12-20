import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  createUser = async (createUserDto: CreateUserDto) => {
    return await this.prisma.user.create({
      data: { ...createUserDto, authId: 'test-id' },
    });
  };

  async findAll() {
    return await this.prisma.user.findMany();
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

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
