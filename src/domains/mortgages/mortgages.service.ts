import { Injectable } from '@nestjs/common';
import { CreateMortgageDto } from './dto/create-mortgage.dto';
import { UpdateMortgageDto } from './dto/update-mortgage.dto';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';

@Injectable()
export class MortgagesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createMortgageDto: CreateMortgageDto) {
    console.log(createMortgageDto);
    return 'This action adds a new mortgage';
  }

  async findAll() {
    return await this.prisma.mortgage.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} mortgage`;
  }

  update(id: number, updateMortgageDto: UpdateMortgageDto) {
    console.log(updateMortgageDto);
    return `This action updates a #${id} mortgage`;
  }

  remove(id: number) {
    return `This action removes a #${id} mortgage`;
  }
}
