import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CreateMortgageDto } from './dto/create-mortgage.dto';
import { MortgagesService } from './mortgages.service';
import { UpdateMortgageDto } from './dto/update-mortgage.dto';

@Controller('mortgages')
export class MortgagesController {
  constructor(private readonly mortgageService: MortgagesService) {}

  @Post()
  create(@Body() createMortgageDto: CreateMortgageDto) {
    return this.mortgageService.create(createMortgageDto);
  }

  @Get()
  findAll() {
    return this.mortgageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.mortgageService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateMortgageDto: UpdateMortgageDto) {
    return this.mortgageService.update(+id, updateMortgageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.mortgageService.remove(+id);
  }
}
