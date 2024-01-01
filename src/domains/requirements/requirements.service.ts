import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRequirementDto } from './dto/create-requirement.dto';
import { UpdateRequirementDto } from './dto/update-requirement.dto';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';

@Injectable()
export class RequirementsService {
  constructor(private prisma: PrismaService) {}

  async create(createRequirementDto: CreateRequirementDto) {
    const { requiredDocuments, userId, role, ...rest } = createRequirementDto;
    console.log(`Request made by ${userId} with role ${role} to create a requirement`, createRequirementDto);

    const createdRequirement = await this.prisma.requirement.create({
      data: {
        ...rest,
      },
    });

    console.log('createdRequirement', createdRequirement);

    // Use the createdRequirement.id to associate with RequiredDocuments
    const createdDocuments = await this.prisma.requiredDocument.createMany({
      data: requiredDocuments.map((doc) => ({
        ...doc,
        requirementId: createdRequirement.id,
      })),
    });

    return { ...createdRequirement, requiredDocuments: createdDocuments };
  }

  async update(id: number, updateRequirementDto: UpdateRequirementDto) {
    const existingRequirement = await this.prisma.requirement.findUnique({
      where: { id },
      include: { requiredDocuments: true },
    });

    console.log('existingRequirement', existingRequirement);

    if (!existingRequirement) {
      throw new NotFoundException(`Requirement with ID ${id} not found`);
    }

    const existingDocumentIds = existingRequirement.requiredDocuments.map((doc) => doc.id);
    await this.prisma.requiredDocument.deleteMany({
      where: {
        id: {
          in: existingDocumentIds,
        },
      },
    });

    const updatedRequirement = await this.prisma.requirement.update({
      where: { id },
      data: {
        ...updateRequirementDto,
        requiredDocuments: {
          create: updateRequirementDto.requiredDocuments,
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
