import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMortgageDto } from './dto/create-mortgage.dto';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';
import { UpdateMortgageDto } from './dto/update-mortgage.dto';
import { ResidenceTypeEnum, UserRoleEnum, Requirement, Mortgage, HistoryTypeEnum } from '@prisma/client';
import { renderHtmlFromTemplate } from './mortgage-email-utils/render-html-from-template';
import { sendEmailPdf } from './mortgage-email-utils/email-helper';
@Injectable()
export class MortgagesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMortgageDto: CreateMortgageDto) {
    const { references, documents, userId, role, ...mortgageData } = createMortgageDto;

    console.log(`Request made by ${userId} with role ${role} to create a mortgage`, createMortgageDto);

    const requirementCondition =
      createMortgageDto.residenceType === ResidenceTypeEnum.UAE_RESIDENT
        ? { residenceType: createMortgageDto.residenceType }
        : { incomeProfile: createMortgageDto.incomeProfile };

    const requirement: Requirement = await this.prisma.requirement.findFirst({
      where: requirementCondition,
      include: { requiredDocuments: true },
    });

    if (!requirement)
      throw new NotFoundException(
        `Your application doesn't meet the criteria for a mortgage application. Please contact us for more information.`,
      );

    const mortgage = await this.prisma.mortgage.create({
      data: {
        ...mortgageData,
        documents: {
          create: documents,
        },
        references: {
          create: references,
        },
      },
    });

    await this.prisma.history.create({
      data: {
        mortgageId: mortgage.id,
        title: 'Application submitted',
        description: `Application submitted by ${mortgage.firstName} ${mortgage.lastName}`,
        type: HistoryTypeEnum.MORTGAGE,
      },
    });

    this.sendEmailWithMortgageQuote(mortgage, requirement);

    return mortgage;
  }

  sendEmailWithMortgageQuote = async (mortgage: Mortgage, requirement: Requirement) => {
    const requiredDocuments = (requirement as any).requiredDocuments;

    const requiredDocumentNames = requiredDocuments.map((requiredDocument) => ({ name: requiredDocument.name }));
    console.log(requiredDocumentNames);

    renderHtmlFromTemplate(mortgage, requirement, requiredDocumentNames).then(async (res: { pdfFileName: string }) => {
      const pdfFileName = res?.pdfFileName ?? '';
      await sendEmailPdf(
        mortgage.email,
        `${mortgage.firstName}_${mortgage.lastName}`,
        {
          currentDate: new Date().getFullYear(),
        },
        pdfFileName,
      );
    });
  };

  async findAll(userId: number, role: UserRoleEnum) {
    if (role === UserRoleEnum.ADMIN) return this.prisma.mortgage.findMany({ orderBy: { createdAt: 'desc' } });

    console.log(`Request made by ${userId} with role ${role} to get all mortgages`);
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

    const mortgages = await this.prisma.mortgage.findMany({ where: { email: user.email } });

    return mortgages;
  }

  async findOne(id: number) {
    const mortgage: any = await this.prisma.mortgage.findUnique({
      where: { id },
      include: {
        history: true,
        comments: true,
        documents: true,
        references: true,
      },
    });

    if (!mortgage) {
      throw new NotFoundException(`Mortgage with ID ${id} not found`);
    }

    const requirementCondition =
      mortgage.residenceType === ResidenceTypeEnum.UAE_RESIDENT
        ? { residenceType: mortgage.residenceType }
        : { incomeProfile: mortgage.incomeProfile };

    const requirement: Requirement = await this.prisma.requirement.findFirst({
      where: requirementCondition,
      include: { requiredDocuments: true },
    });

    mortgage.requirement = requirement;

    return mortgage;
  }

  async update(id: number, updateMortgageDto: UpdateMortgageDto) {
    const { documents, references, userId, role, ...updateData } = updateMortgageDto;

    console.log(`Request made by ${userId} with role ${role} to update a mortgage`, updateMortgageDto);

    const existingMortgage = await this.prisma.mortgage.findUnique({
      where: { id },
      include: { documents: true, references: true },
    });

    if (!existingMortgage) {
      throw new NotFoundException(`Mortgage with ID ${id} not found`);
    }

    const isStatusChanged = existingMortgage.status !== updateData.status;

    const existingDocumentIds = existingMortgage.documents.map((doc) => doc.id);
    await this.prisma.document.deleteMany({
      where: {
        id: {
          in: existingDocumentIds,
        },
      },
    });

    const existingReferenceIds = existingMortgage.references.map((ref) => ref.id);
    await this.prisma.reference.deleteMany({
      where: {
        id: {
          in: existingReferenceIds,
        },
      },
    });

    const updatedMortgage = await this.prisma.mortgage.update({
      where: { id },
      data: {
        ...updateData,
        documents: {
          create: documents,
        },
        references: {
          create: references,
        },
      },
    });

    await this.prisma.history.create({
      data: {
        mortgageId: id,
        userId: updatedMortgage.userId,
        title: isStatusChanged ? 'Application status updated' : 'Application details updated',
        description: isStatusChanged
          ? `Application status changed from ${existingMortgage.status} to ${updateData.status} by ${userId}`
          : `Application details updated by ${updatedMortgage.firstName} ${updatedMortgage.lastName}`,
        type: HistoryTypeEnum.MORTGAGE,
      },
    });

    return updatedMortgage;
  }

  async remove(id: number) {
    const existingMortgage = await this.prisma.mortgage.findUnique({ where: { id } });

    if (!existingMortgage) {
      throw new NotFoundException(`Mortgage with ID ${id} not found`);
    }

    return this.prisma.mortgage.delete({ where: { id } });
  }
}
