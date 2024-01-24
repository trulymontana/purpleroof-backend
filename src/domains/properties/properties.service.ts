import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SearchPropertyDto } from './dto/search-property.dto';
import { Property, SubmissionStatusEnum, UserRoleEnum } from '@prisma/client';
import { EmailService } from 'src/common/providers/email/email.service';
import { UiPageLinks } from 'src/constants/ui-links';

@Injectable()
export class PropertiesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async create(createPropertyDto: CreatePropertyDto) {
    const { userId, documents, photos, locationId, amenities, role, ...createPropertyData } = createPropertyDto;

    console.log(`Request made by ${userId} with role ${role} to create a property`, createPropertyDto);

    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: createPropertyDto.email,
      },
    });

    if (existingUser) console.log('there is already an existing user with id: ', existingUser?.id);

    const createPropertyDataObject: any = {
      data: {
        ...createPropertyData,
        documents: {
          create: documents.map((document) => ({
            ...document,
          })),
        },
        photos: {
          create:
            photos?.map((photo) => ({
              path: photo,
              name: photo,
            })) ?? [],
        },
        amenities: {
          connect: amenities.map((amenityId) => ({ id: parseInt(amenityId.toString()) })),
        },
      },
    };

    if (locationId) {
      createPropertyDataObject.data.location = {
        connect: { id: locationId },
      };
    }

    if (existingUser) {
      createPropertyDataObject.data.user = {
        connect: {
          id: existingUser.id,
        },
      };
    }

    const property = await this.prisma.property.create(createPropertyDataObject);

    await this.emailService.sendEmail({
      emailFrom: 'info@purpleroof.com',
      emailTo: createPropertyDto.email,
      subject: 'Property submitted for listing!',
      message: `Your request to list your property has been submitted successfully. 
      We will get back to you soon. 
      Feel free to log in to the dashboard from ${UiPageLinks.SignInPage} to check the status`,
    });

    return { property };
  }

  async findAll(userId: number, role: string) {
    console.log(`Request made by ${userId} with role ${role} to get all properties`);
    if (role === UserRoleEnum.ADMIN || role === UserRoleEnum.SUPER_ADMIN) {
      return this.prisma.property.findMany({ where: { deleted: false }, orderBy: { createdAt: 'desc' } });
    }

    if (role === UserRoleEnum.AGENT) {
      const agentProfile = await this.prisma.agent.findUnique({
        where: { userId },
      });
      const properties = await this.prisma.property.findMany({
        where: {
          deleted: false,
          agentId: agentProfile.id,
        },
      });

      return properties.map((item) => ({ ...item, phone: '-' })) as Property[];
    }

    return this.prisma.property.findMany({
      where: {
        userId,
        deleted: false,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, userId: number, role: string) {
    const property = await this.prisma.property.findUnique({
      where: { id },
      include: {
        documents: role === UserRoleEnum.AGENT ? false : true,
        amenities: true,
        photos: true,
        agent: true,
        user: role === UserRoleEnum.AGENT ? false : true,
        location: true,
      },
    });

    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    if (role !== UserRoleEnum.AGENT && property.agent) {
      const userForAgent = await this.prisma.user.findUnique({
        where: { id: property.agent.userId },
      });

      if (property.agent) {
        (property.agent as any).user = {};
        (property.agent as any).user.firstName = userForAgent?.firstName;
        (property.agent as any).user.lastName = userForAgent?.lastName;
      }
    } else {
      delete property.agent;
    }

    if (role === UserRoleEnum.AGENT) {
      property.deedNumber = '-';
    }

    return property;
  }

  async findOnePublic(id: number) {
    const property = await this.prisma.property.findUnique({
      where: { id },
      include: {
        amenities: true,
        photos: true,
        location: true,
        agent: true,
      },
    });

    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    if (property.agent) {
      const userForAgent = await this.prisma.user.findUnique({
        where: { id: property.agent.userId },
      });
      (property.agent as any).user = {};
      (property.agent as any).user.firstName = userForAgent?.firstName;
      (property.agent as any).user.lastName = userForAgent?.lastName;
      (property.agent as any).user.email = userForAgent?.email;
    }

    property.deedNumber = '-';

    return property;
  }

  async update(id: number, updatePropertyDto: UpdatePropertyDto) {
    const existingProperty = await this.prisma.property.findUnique({
      where: { id },
    });

    if (!existingProperty) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    const { userId, role, ...updateData } = updatePropertyDto;

    console.log(`Request made by ${userId} with role ${role} to update a property`, updatePropertyDto);

    return this.prisma.property.update({
      where: { id },
      data: updateData as any,
    });
  }

  async remove(id: number) {
    const existingProperty = await this.prisma.property.findUnique({ where: { id } });

    if (!existingProperty) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    return this.prisma.property.update({
      where: { id },
      data: {
        deleted: true,
      },
    });
  }

  async searchProperties(filters: SearchPropertyDto): Promise<Property[]> {
    const query: any = {
      submissionStatus: SubmissionStatusEnum.APPROVED,
      deleted: false,
    };

    if (filters.minPrice) {
      query.amount = { gte: filters.minPrice };
    }

    if (filters.maxPrice) {
      query.amount = { ...query.amount, lte: filters.maxPrice };
    }

    if (filters.numberOfBedRooms) {
      query.numberOfBedRooms = { gte: filters.numberOfBedRooms };
    }

    if (filters.numberOfBathRooms) {
      query.numberOfBathRooms = { gte: filters.numberOfBathRooms };
    }

    if (filters.parkingSpaces) {
      query.parkingSpaces = { gte: filters.parkingSpaces };
    }

    // if (filters.amenities) {
    //   query.amenities = { some: { amenityId: { in: filters.amenities } } };
    // }

    if (filters.locations?.length) {
      query.location = { in: filters.locations };
    }

    if (filters.propertyFor) {
      query.propertyFor = filters.propertyFor;
    }

    if (filters.propertyTypes?.length) {
      query.propertyType = { in: filters.propertyTypes };
    }

    if (filters.propertyCategories?.length) {
      query.propertyCategory = { in: filters.propertyCategories };
    }

    if (filters.emirates?.length) {
      query.emirate = { in: filters.emirates };
    }

    const properties = await this.prisma.property.findMany({
      where: query,
      include: {},
    });

    return properties;
  }

  async assignToAgent(propertyId: number, agentId: number) {
    const existingProperty = await this.prisma.property.findUnique({ where: { id: propertyId } });

    if (!existingProperty) {
      throw new BadRequestException(`Property with ID ${propertyId} not found`);
    }

    if (existingProperty.submissionStatus !== SubmissionStatusEnum.APPROVED) {
      throw new BadRequestException(`Property with ID ${propertyId} is not approved yet`);
    }

    const agentProfile = await this.prisma.agent.findUnique({ where: { id: agentId } });

    if (!agentProfile) {
      throw new BadRequestException(`Agent with ID ${agentId} not found`);
    }

    return this.prisma.property.update({ where: { id: propertyId }, data: { agentId } });
  }
}
