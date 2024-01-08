import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRequirementDto } from './dto/create-requirement.dto';
import { UpdateRequirementDto } from './dto/update-requirement.dto';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';

@Injectable()
export class RequirementsService {
  constructor(private prisma: PrismaService) {}

  async create(createRequirementDto: CreateRequirementDto) {
    const { requiredDocuments, userId, role, ...rest } = createRequirementDto;
    console.log(`Request made by ${userId} with role ${role} to create a requirement`, createRequirementDto);

    const similarRequirement = await this.prisma.requirement.findFirst({
      where: {
        residenceType: createRequirementDto.residenceType,
        incomeProfile: createRequirementDto.incomeProfile,
      },
    });

    if (similarRequirement) {
      throw new BadRequestException(
        'Requirement with same residence type and income profile combination already exists',
      );
    }

    const createdRequirement = await this.prisma.requirement.create({
      data: {
        ...rest,
        requiredDocuments: {
          create: requiredDocuments.map((doc) => ({
            ...doc,
            requirementId: createdRequirement.id,
          })),
        },
      },
    });

    return createdRequirement;
  }

  async update(id: number, updateRequirementDto: UpdateRequirementDto) {
    const { requiredDocuments, userId, role, ...updateData } = updateRequirementDto;

    console.log(`Request made by ${userId} with role ${role} to update a requirement`, updateRequirementDto);

    const existingRequirement = await this.prisma.requirement.findUnique({
      where: { id },
      include: { requiredDocuments: true },
    });

    if (!existingRequirement) {
      throw new NotFoundException(`Requirement with ID ${id} not found`);
    }

    const existingTypes = existingRequirement.requiredDocuments.map((doc) => doc.documentType);
    const newTypes = requiredDocuments.map((doc) => doc.documentType);

    const newDocuments = requiredDocuments.filter(
      (requirementItem) => !existingTypes.includes(requirementItem.documentType),
    );
    const deletedDocumentTypes = existingTypes.filter((type) => !newTypes.includes(type));

    const updatedRequirement = await this.prisma.requirement.update({
      where: { id },
      data: {
        ...updateData,
        requiredDocuments: {
          create: newDocuments,
          deleteMany: {
            documentType: {
              in: deletedDocumentTypes,
            },
          },
        },
      },
    });

    return updatedRequirement;
  }
  async delete(id: number) {
    const existingRequirement = await this.prisma.requirement.findUnique({ where: { id } });

    if (!existingRequirement) {
      throw new NotFoundException(`Requirement with ID ${id} not found`);
    }

    // Delete the requirement
    await this.prisma.requirement.delete({ where: { id } });

    return { message: `Requirement with ID ${id} deleted successfully` };
  }

  async findAll() {
    // Retrieve all requirements
    const requirements = await this.prisma.requirement.findMany({
      include: {
        requiredDocuments: true,
      },
    });

    return requirements;
  }
  async findOne(id: number) {
    const requirement = await this.prisma.requirement.findUnique({
      where: { id },
      include: {
        requiredDocuments: true,
      },
    });

    if (!requirement) {
      throw new NotFoundException(`Requirement with ID ${id} not found`);
    }

    return requirement;
  }
}
