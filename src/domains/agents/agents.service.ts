import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';
import { ActiveStatusEnum, ApprovalStatusEnum, DocumentTypeEnum, UserRoleEnum } from '@prisma/client';
import { EmailService } from 'src/common/providers/email/email.service';

@Injectable()
export class AgentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async create(createAgentDto: CreateAgentDto) {
    console.log('createAgentDto', createAgentDto.userId);

    const user = await this.prisma.user.findUnique({ where: { id: createAgentDto.userId } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const existingAgent = await this.prisma.agent.findUnique({
      where: { userId: createAgentDto.userId },
    });

    if (existingAgent) {
      throw new Error('User already applied as an agent');
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
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, userId: number, role: string) {
    if (role === UserRoleEnum.ADMIN || role === UserRoleEnum.SUPER_ADMIN) {
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

  async findOneWithUserId(userId: number) {
    return await this.prisma.agent.findUnique({
      where: { userId },
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

    const isApproved = approvalStatus === ApprovalStatusEnum.APPROVED ? true : false;

    if (isApproved) {
      await this.prisma.user.update({
        where: { id: existingAgent.userId },
        data: {
          role: UserRoleEnum.AGENT,
          agentId: id,
        },
      });

      await this.emailService.sendEmail({
        emailFrom: 'info@sirefinance.com',
        emailTo: existingUser.email,
        subject: 'Agent Application Approved!',
        message: `Congratulations! Your agent application for purpleroof has been approved. You have to logout and log in again to your account and start adding properties.`,
      });
    }

    const updatedAgent = await this.prisma.agent.update({
      where: { id },
      data: {
        approvalStatus: approvalStatus,
      },
    });

    return updatedAgent;
  }

  async activateOrDeactivate(id: number, activationStatus: ActiveStatusEnum) {
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
        activeStatus: activationStatus,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.agent.delete({
      where: { id },
    });
  }
}
