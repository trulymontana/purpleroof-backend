import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';
import { UserRoleEnum } from '@prisma/client';

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createCommentDto: CreateCommentDto) {
    const { userId, role, attachments, mortgageId, ...commentData } = createCommentDto;
    console.log(`User with id ${userId} and role ${role} created a comment`);

    console.log(createCommentDto);
    return await this.prismaService.comment.create({
      data: {
        ...commentData,
        attachments: {
          create: attachments.map((attachment) => ({
            name: attachment,
            path: attachment,
          })),
        },
        mortgage: {
          connect: { id: mortgageId },
        },
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async findAll(mortgageId: number, userId: number, role: UserRoleEnum) {
    console.log('mortgageIds: ', mortgageId, role);
    const existingMortgage = await this.prismaService.mortgage.findUnique({
      where: {
        id: mortgageId,
      },
    });

    if (!existingMortgage) {
      throw new BadRequestException('Mortgage not found');
    }

    // if (role !== UserRoleEnum.ADMIN && role !== UserRoleEnum.SUPER_ADMIN && existingMortgage.userId !== userId) {
    //   throw new BadRequestException('You are not authorized to view this mortgage');
    // }

    return await this.prismaService.comment.findMany({
      where: {
        mortgageId,
      },
      include: {
        attachments: true,
        user: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment ${updateCommentDto.mortgageId}`;
  }

  async remove(id: number) {
    return await this.prismaService.comment.delete({
      where: {
        id,
      },
    });
  }
}
