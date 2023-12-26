import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMortgageDto } from './dto/create-mortgage.dto';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';
import { UpdateMortgageDto } from './dto/update-mortgage.dto';
import { ResidenceTypeEnum, UserRoleEnum, Requirement } from '@prisma/client';
import { renderHtmlFromTemplate } from './mortgage-email-utils/render-html-from-template';
import { sendEmailPdf } from './mortgage-email-utils/email-helper';

@Injectable()
export class MortgagesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMortgageDto: CreateMortgageDto) {
    const mortgage = await this.prisma.mortgage.create({ data: { ...createMortgageDto } });

    const requirementCondition =
      createMortgageDto.residenceType === ResidenceTypeEnum.UAE_RESIDENT
        ? { residenceType: createMortgageDto.residenceType }
        : { incomeProfile: createMortgageDto.incomeProfile };

    console.log('found the requirement condition', requirementCondition);
    const requirement: Requirement = await this.prisma.requirement.findFirst({
      where: requirementCondition,
    });

    const requiredDocuments = await this.prisma.requiredDocument.findMany({
      where: { requirementId: requirement.id },
    });

    if (!requirement) throw new NotFoundException(`Requirement not found`);

    console.log('found the requirement', requirement);

    const requiredDocumentNames = requiredDocuments.map((requiredDocument) => requiredDocument.name);

    renderHtmlFromTemplate(mortgage, requirement, requiredDocumentNames).then(async (res: { pdfFileName: string }) => {
      console.log(res);
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

    return mortgage;
  }

  async findAll(userId: number, role: UserRoleEnum) {
    return this.prisma.mortgage.findMany();
    if (role === UserRoleEnum.ADMIN) return this.prisma.mortgage.findMany();

    return this.prisma.mortgage.findMany({ where: { userId } });
  }

  async findOne(id: number) {
    const mortgage = await this.prisma.mortgage.findUnique({ where: { id } });

    const requirementCondition =
      mortgage.residenceType === ResidenceTypeEnum.UAE_RESIDENT
        ? { residenceType: mortgage.residenceType }
        : { incomeProfile: mortgage.incomeProfile };

    const requirement: Requirement = await this.prisma.requirement.findFirst({
      where: requirementCondition,
      include: { requiredDocuments: true },
    });

    if (!mortgage) {
      throw new NotFoundException(`Mortgage with ID ${id} not found`);
    }

    return { mortgage, requirement };
  }

  async update(id: number, updateMortgageDto: UpdateMortgageDto) {
    const existingMortgage = await this.prisma.mortgage.findUnique({ where: { id } });

    if (!existingMortgage) {
      throw new NotFoundException(`Mortgage with ID ${id} not found`);
    }

    return this.prisma.mortgage.update({ where: { id }, data: updateMortgageDto });
  }

  async remove(id: number) {
    const existingMortgage = await this.prisma.mortgage.findUnique({ where: { id } });

    if (!existingMortgage) {
      throw new NotFoundException(`Mortgage with ID ${id} not found`);
    }

    return this.prisma.mortgage.delete({ where: { id } });
  }
}
