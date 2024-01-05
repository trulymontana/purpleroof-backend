import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RequirementsService } from './requirements.service';
import { CreateRequirementDto } from './dto/create-requirement.dto';
import { UpdateRequirementDto } from './dto/update-requirement.dto';
import { SuperAdminAuthGuard } from 'src/auth/guards/super-admin-auth.guard';
import { ApiHeader } from '@nestjs/swagger';

@Controller('requirements')
@ApiHeader({ name: 'Authorization' })
export class RequirementsController {
  constructor(private readonly requirementsService: RequirementsService) {}

  @Post()
  @UseGuards(SuperAdminAuthGuard)
  create(@Body() createRequirementDto: CreateRequirementDto) {
    return this.requirementsService.create(createRequirementDto);
  }

  @Get()
  @UseGuards(SuperAdminAuthGuard)
  findAll() {
    return this.requirementsService.findAll();
  }

  @Get(':id')
  @UseGuards(SuperAdminAuthGuard)
  findOne(@Param('id') id: string) {
    return this.requirementsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(SuperAdminAuthGuard)
  update(@Param('id') id: string, @Body() updateRequirementDto: UpdateRequirementDto) {
    return this.requirementsService.update(+id, updateRequirementDto);
  }

  @Delete(':id')
  @UseGuards(SuperAdminAuthGuard)
  delete(@Param('id') id: string) {
    return this.requirementsService.delete(+id);
  }
}
