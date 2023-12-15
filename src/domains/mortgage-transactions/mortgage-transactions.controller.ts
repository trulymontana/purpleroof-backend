import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { MortgageTransactionsService } from './mortgage-transactions.service';
import { CreateMortgageTransactionDto } from './dto/create-mortgage-transaction.dto';
import { UpdateMortgageTransactionDto } from './dto/update-mortgage-transaction.dto';

@Controller('mortgage-transactions')
export class MortgageTransactionsController {
  constructor(private readonly mortgageTransactionService: MortgageTransactionsService) {}

  @Post(':mortgageId')
  create(
    @Param('mortgageId', ParseIntPipe) mortgageId: number,
    @Body() createMortgageTransactionDto: CreateMortgageTransactionDto,
  ) {
    return this.mortgageTransactionService.create(mortgageId, createMortgageTransactionDto);
  }

  @Get(':mortgageId')
  findAll(@Param('mortgageId', ParseIntPipe) mortgageId: number) {
    return this.mortgageTransactionService.findAll(mortgageId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.mortgageTransactionService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMortgageTransactionDto: UpdateMortgageTransactionDto) {
    return this.mortgageTransactionService.update(id, updateMortgageTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.mortgageTransactionService.remove(id);
  }
}
