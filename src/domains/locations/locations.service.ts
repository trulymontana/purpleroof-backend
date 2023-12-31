import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';
import { EmirateEnum } from '@prisma/client';

@Injectable()
export class LocationsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createLocationDto: CreateLocationDto) {
    console.log('createLocationDto', createLocationDto);
    return this.prismaService.location.create({
      data: {
        ...createLocationDto,
      },
    });
  }

  findAll() {
    return this.prismaService.location.findMany();
  }
  findAllByEmirate(emirate: EmirateEnum) {
    return this.prismaService.location.findMany({
      where: { emirate },
    });
  }

  findOne(id: number) {
    return this.prismaService.location.findUnique({
      where: { id },
    });
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    console.log(updateLocationDto);
    return `This action updates a #${id} location`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
