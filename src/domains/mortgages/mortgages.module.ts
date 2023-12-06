import { Module } from '@nestjs/common';
import { MortgagesService } from './mortgages.service';
import { MortgagesController } from './mortgages.controller';

@Module({
  controllers: [MortgagesController],
  providers: [MortgagesService],
})
export class MortgagesModule {}
