import { Controller, Get, Post, Delete, Param, Body, UseGuards, Req, Patch } from '@nestjs/common';
import { CreateMortgageDto } from './dto/create-mortgage.dto';
import { MortgagesService } from './mortgages.service';
import { UpdateMortgageDto } from './dto/update-mortgage.dto';
import { ApiHeader } from '@nestjs/swagger';
import { BaseRequest } from 'src/utils/BaseRequest';
import { BasicAuthGuard } from 'src/auth/guards/basic-auth.guard';

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
  findOne(@Param('id') id: number) {
    return this.mortgageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMortgageDto: UpdateMortgageDto) {
    return this.mortgageService.update(+id, updateMortgageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.mortgageService.remove(+id);
  }
}

// curl -X 'GET' \
//   'http://localhost:4000/api/v1/mortgages' \
//   -H 'accept: */*' \
//   -H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJBdXRoSWQiOiJSNEV0OWdERnFHZVVLaE1mRmRSNTFKdFhTZmUyIiwidXNlcm5hbWUiOiJzdHJpbmcgc3RyaW5nIiwiZW1haWwiOiJtb2hhbW1hZGZhaXNhbDEwMTFAZ21haWwuY29tIiwicm9sZSI6IkFEVkVSVElTRVIiLCJpYXQiOjE3MDMwNzk0MjEsImV4cCI6MTcwNTY3MTQyMX0.b0uuw0mRR4tYFMoHwzqGkujTwh9YTzsylCVAHIxr3Fw'
