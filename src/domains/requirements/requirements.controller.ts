import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RequirementsService } from './requirements.service';
import { CreateRequirementDto } from './dto/create-requirement.dto';
import { UpdateRequirementDto } from './dto/update-requirement.dto';
import { AdminAuthGuard } from 'src/auth/guards/admin-auth.guard';

@Controller('requirements')
export class RequirementsController {
  constructor(private readonly requirementsService: RequirementsService) {}

  @Post()
  @UseGuards(AdminAuthGuard)
  create(@Body() createRequirementDto: CreateRequirementDto) {
    return this.requirementsService.create(createRequirementDto);
  }

  @Get()
  @UseGuards(AdminAuthGuard)
  findAll() {
    return this.requirementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requirementsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequirementDto: UpdateRequirementDto) {
    return this.requirementsService.update(+id, updateRequirementDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.requirementsService.delete(+id);
  }
}
