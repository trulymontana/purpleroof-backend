import { Module } from '@nestjs/common';
import { MortgageTransactionsService } from './mortgage-transactions.service';
import { MortgageTransactionsController } from './mortgage-transactions.controller';

@Module({
  controllers: [MortgageTransactionsController],
  providers: [MortgageTransactionsService],
})
export class MortgageTransactionsModule {}
