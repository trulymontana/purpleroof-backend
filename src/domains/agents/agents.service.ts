import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';
import { DocumentTypeEnum, UserRoleEnum } from '@prisma/client';
import { ActivationStatusEnum, ApprovalStatusEnum } from './agents.controller';

@Injectable()
export class AgentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAgentDto: CreateAgentDto) {
    console.log('createAgentDto', createAgentDto.userId);

    const user = await this.prisma.user.findUnique({ where: { id: createAgentDto.userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.prisma.agent.create({
      data: {
        agency: createAgentDto.agency,
        contactNumber: createAgentDto.contactNumber,
        user: {
          connect: {
            id: createAgentDto.userId,
          },
        },
        locations: {
          connect: createAgentDto.locations.map((location) => ({ id: location })),
        },
        documents: {
          create: {
            type: DocumentTypeEnum.REAL_ESTATE_LICENSE,
            url: createAgentDto.realEstateLicense,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.agent.findMany({
      include: {
        user: true,
        locations: true,
        documents: true,
      },
    });
  }

  async findOne(id: number, userId: number, role: string) {
    if (role === 'ADMIN') {
      return this.prisma.agent.findUnique({
        where: { id },
        include: {
          user: true,
          locations: true,
          documents: true,
        },
      });
    }
    if (id !== userId) {
      throw new Error('You are not authorized to access this resource');
    }
    return await this.prisma.agent.findUnique({
      where: { id },
      include: {
        user: true,
        locations: true,
        documents: true,
      },
    });
  }

  async update(id: number, updateAgentDto: UpdateAgentDto) {
    const { userId, role, ...updateData } = updateAgentDto;

    console.log(`updateAgent with userUd ${userId} and ${role}`, updateData);

    const existingAgent = await this.prisma.agent.findUnique({
      where: { id },
      include: { documents: true, locations: true },
    });

    if (!existingAgent) {
      throw new NotFoundException(`Agent with ID ${id} not found`);
    }

    await this.prisma.agent.update({
      where: { id },
      data: {
        ...updateData,
        locations: {
          disconnect: existingAgent.locations.map((location) => ({ id: location.id })),
          connect: updateData.locations.map((location) => ({ id: location })),
        },
        documents: {
          deleteMany: existingAgent.documents.map((document) => ({ id: document.id })),
          create: {
            type: DocumentTypeEnum.REAL_ESTATE_LICENSE,
            url: updateData.realEstateLicense,
          },
        },
      },
    });
  }

  async approveOrReject(id: number, approvalStatus: ApprovalStatusEnum) {
    const existingAgent = await this.prisma.agent.findUnique({
      where: { id },
      include: { documents: true, locations: true },
    });

    const existingUser = await this.prisma.user.findUnique({
      where: { id: existingAgent.userId },
    });

    if (!existingAgent || !existingUser) {
      throw new NotFoundException(`Agent with ID ${id} not found`);
    }

    if (existingUser.role === 'AGENT') {
      throw new Error('User is already an agent');
    }

    const isApproved = ApprovalStatusEnum.APPROVED ? true : false;

    if (isApproved) {
      await this.prisma.user.update({
        where: { id: existingAgent.userId },
        data: {
          role: UserRoleEnum.AGENT,
          agentId: id,
        },
      });
    }

    const updatedAgent = await this.prisma.agent.update({
      where: { id },
      data: {
        isApproved: approvalStatus === ApprovalStatusEnum.APPROVED ? true : false,
      },
    });

    return updatedAgent;
  }

  async activateOrDeactivate(id: number, activationStatus: ActivationStatusEnum) {
    const existingAgent = await this.prisma.agent.findUnique({
      where: { id },
      include: { documents: true, locations: true },
    });

    if (!existingAgent) {
      throw new NotFoundException(`Agent with ID ${id} not found`);
    }

    await this.prisma.agent.update({
      where: { id },
      data: {
        isApproved: activationStatus === ActivationStatusEnum.ACTIVE ? true : false,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.agent.delete({
      where: { id },
    });
  }
}
