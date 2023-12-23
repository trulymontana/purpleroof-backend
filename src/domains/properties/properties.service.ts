import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';

import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PropertiesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPropertyDto: CreatePropertyDto) {
    const { documents } = createPropertyDto;

    const property = await this.prisma.property.create({
      data: {
        ...createPropertyDto,
        documents: {
          create: documents.map((document) => ({
            ...document,
          })),
        },
        photos: {
          create: createPropertyDto.photos.map((photo) => ({
            path: photo,
            name: photo,
          })),
        },
        userId: createPropertyDto.userId,
      } as any,
    });

    return { property };
  }

  async findAll() {
    return this.prisma.property.findMany({
      include: {
        documents: true,
      },
    });
  }

  async findOne(id: number) {
    const property = await this.prisma.property.findUnique({ where: { id } });

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
