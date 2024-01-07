import { Controller, Get, Post, Delete, Param, Body, UseGuards, Req, Patch } from '@nestjs/common';
import { CreateMortgageDto } from './dto/create-mortgage.dto';
import { MortgagesService } from './mortgages.service';
import { UpdateMortgageDto } from './dto/update-mortgage.dto';
import { ApiHeader } from '@nestjs/swagger';
import { BaseRequest } from 'src/utils/BaseRequest';
import { BasicAuthGuard } from 'src/auth/guards/basic-auth.guard';
import { AdminAuthGuard } from 'src/auth/guards/admin-auth.guard';

@Controller('mortgages')
@ApiHeader({ name: 'Authorization' })
export class MortgagesController {
  constructor(private readonly mortgageService: MortgagesService) {}

  @Post()
  create(@Body() createMortgageDto: CreateMortgageDto) {
    return this.mortgageService.create(createMortgageDto);
  }

  @Get()
  @UseGuards(BasicAuthGuard)
  findAll(@Req() req: BaseRequest) {
    return this.mortgageService.findAll(req.userId, req.role);
  }

  @Get(':id')
  @UseGuards(BasicAuthGuard)
  findOne(@Param('id') id: number) {
    return this.mortgageService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AdminAuthGuard)
  update(@Param('id') id: number, @Body() updateMortgageDto: UpdateMortgageDto) {
    return this.mortgageService.update(+id, updateMortgageDto);
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  remove(@Param('id') id: number) {
    return this.mortgageService.remove(+id);
  }
}
