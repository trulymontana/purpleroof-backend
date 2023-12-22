import { Injectable } from '@nestjs/common';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { UpdateAmenityDto } from './dto/update-amenity.dto';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';

@Injectable()
export class AmenitiesService {
  constructor(private prismaService: PrismaService) {}

  create(createAmenityDto: CreateAmenityDto) {
    return this.prismaService.amenity.create({ data: { ...createAmenityDto } });
    return 'This action adds a new amenity';
  }

  findAll() {
    return this.prismaService.amenity.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} amenity`;
  }

  update(id: number, updateAmenityDto: UpdateAmenityDto) {
    return this.prismaService.amenity.update({ where: { id }, data: { ...updateAmenityDto } });
  }

  remove(id: number) {
    return `This action removes a #${id} amenity`;
  }
}
