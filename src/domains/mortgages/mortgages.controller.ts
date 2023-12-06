import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MortgagesService } from './mortgages.service';
import { CreateMortgageDto } from './dto/create-mortgage.dto';
import { UpdateMortgageDto } from './dto/update-mortgage.dto';
import { SuccessResponse } from 'src/utils/SuccessResponse';

@Controller('mortgages')
export class MortgagesController {
  constructor(private readonly mortgagesService: MortgagesService) {}

  @Post()
  create(@Body() createMortgageDto: CreateMortgageDto) {
    return this.mortgagesService.create(createMortgageDto);
  }

  @Get()
  async findAll() {
    const response = await this.mortgagesService.findAll();
    return new SuccessResponse(response);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mortgagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMortgageDto: UpdateMortgageDto) {
    return this.mortgagesService.update(+id, updateMortgageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mortgagesService.remove(+id);
  }
}
