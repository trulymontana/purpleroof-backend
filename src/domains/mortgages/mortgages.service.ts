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
    // create a mortgage,
    // create the documents and attach it to the mortgage
    // create the history and attach it to the mortgage

    const { references, documents, ...mortgageData } = createMortgageDto;

    const requirementCondition =
      createMortgageDto.residenceType === ResidenceTypeEnum.UAE_RESIDENT
        ? { residenceType: createMortgageDto.residenceType }
        : { incomeProfile: createMortgageDto.incomeProfile };

    const requirement: Requirement = await this.prisma.requirement.findFirst({
      where: requirementCondition,
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
    const requiredDocuments = await this.prisma.requiredDocument.findMany({
      where: { requirementId: requirement.id },
    });

    const requiredDocumentNames = requiredDocuments.map((requiredDocument) => requiredDocument.name);

    renderHtmlFromTemplate(mortgage, requirement, requiredDocumentNames).then(async (res: { pdfFileName: string }) => {
      const newEmail = mortgage.email.replace(/[@.]/g, '');
      await sendEmailPdf(
        mortgage.email,
        `${mortgage.firstName}_${mortgage.lastName}`,
        newEmail,
        mortgage.id,
        {
          currentDate: new Date().getFullYear(),
        },
        res?.pdfFileName,
      );
    });
  };

  async findAll(userId: number, role: UserRoleEnum) {
    return this.prisma.mortgage.findMany();
    if (role === UserRoleEnum.ADMIN) return this.prisma.mortgage.findMany();

    return this.prisma.mortgage.findMany({ where: { userId } });
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
    const { documents, references, ...updateData } = updateMortgageDto;

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
          ? `Application status changed from ${existingMortgage.status} to ${updateData.status} by ${updateData.userId}`
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
