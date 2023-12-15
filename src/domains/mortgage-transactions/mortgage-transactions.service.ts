import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';
import { CreateMortgageTransactionDto } from './dto/create-mortgage-transaction.dto';
import { UpdateMortgageTransactionDto } from './dto/update-mortgage-transaction.dto';

@Injectable()
export class MortgageTransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(mortgageId: number, createMortgageTransactionDto: CreateMortgageTransactionDto) {
    const mortgage = await this.prisma.mortgage.findUnique({ where: { id: mortgageId } });

    if (!mortgage) {
      throw new NotFoundException(`Mortgage with ID ${mortgageId} not found`);
    }

    return this.prisma.mortgageTransaction.create({
      data: {
        ...createMortgageTransactionDto,
        mortgage: { connect: { id: mortgageId } },
      },
    });
  }

  async findAll(mortgageId: number) {
    return this.prisma.mortgageTransaction.findMany({ where: { mortgageId } });
  }

  async findOne(id: number) {
    const mortgageTransaction = await this.prisma.mortgageTransaction.findUnique({ where: { id } });

    if (!mortgageTransaction) {
      throw new NotFoundException(`MortgageTransaction with ID ${id} not found`);
    }

    return mortgageTransaction;
  }

  async update(id: number, updateMortgageTransactionDto: UpdateMortgageTransactionDto) {
    const existingMortgageTransaction = await this.prisma.mortgageTransaction.findUnique({ where: { id } });

    if (!existingMortgageTransaction) {
      throw new NotFoundException(`MortgageTransaction with ID ${id} not found`);
    }

    return this.prisma.mortgageTransaction.update({ where: { id }, data: updateMortgageTransactionDto });
  }

  async remove(id: number) {
    const existingMortgageTransaction = await this.prisma.mortgageTransaction.findUnique({ where: { id } });

    if (!existingMortgageTransaction) {
      throw new NotFoundException(`MortgageTransaction with ID ${id} not found`);
    }

    return this.prisma.mortgageTransaction.delete({ where: { id } });
  }
}
