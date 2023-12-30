import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';

import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PropertiesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPropertyDto: CreatePropertyDto) {
    const { documents, photos, amenities, ...createPropertyData } = createPropertyDto;

    console.log('createPropertyDto', createPropertyData);
    const property = await this.prisma.property.create({
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
        // userId: createPropertyDto.userId,
        agentId: createPropertyDto.agentId,
      } as any,
    });

    return { property };
  }

  async findAll() {
    return this.prisma.property.findMany({});
  }

  async findOne(id: number) {
    const property = await this.prisma.property.findUnique({
      where: { id },
      include: {
        documents: true,
        amenities: true,
        photos: true,
      },
    });

    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    return property;
  }

  async update(id: number, updatePropertyDto: UpdatePropertyDto) {
    const existingProperty = await this.prisma.property.findUnique({ where: { id } });

    if (!existingProperty) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    return this.prisma.property.update({ where: { id }, data: updatePropertyDto as any });
  }

  async remove(id: number) {
    const existingProperty = await this.prisma.property.findUnique({ where: { id } });

    if (!existingProperty) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    return this.prisma.property.delete({ where: { id } });
  }
}
