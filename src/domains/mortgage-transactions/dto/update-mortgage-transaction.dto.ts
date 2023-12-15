import { PartialType } from '@nestjs/swagger';
import { CreateMortgageTransactionDto } from './create-mortgage-transaction.dto';

export class UpdateMortgageTransactionDto extends PartialType(CreateMortgageTransactionDto) {}
