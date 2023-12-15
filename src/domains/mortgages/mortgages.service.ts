import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMortgageDto } from './dto/create-mortgage.dto';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';
import { UpdateMortgageDto } from './dto/update-mortgage.dto';

@Injectable()
export class MortgagesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMortgageDto: CreateMortgageDto) {
    return this.prisma.mortgage.create({ data: createMortgageDto });
  }

  async findAll() {
    return this.prisma.mortgage.findMany();
  }

  async findOne(id: number) {
    const mortgage = await this.prisma.mortgage.findUnique({ where: { id } });

    if (!mortgage) {
      throw new NotFoundException(`Mortgage with ID ${id} not found`);
    }

    return mortgage;
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
