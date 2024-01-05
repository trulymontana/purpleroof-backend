import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { SearchPropertyDto } from './dto/search-property.dto';
import { Property } from '@prisma/client';
import { BasicAuthGuard } from 'src/auth/guards/basic-auth.guard';
import { BaseRequest } from 'src/utils/BaseRequest';
import { AdminAuthGuard } from 'src/auth/guards/admin-auth.guard';
import { ApiHeader } from '@nestjs/swagger';

@Controller('properties')
@ApiHeader({ name: 'Authorization' })
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto);
  }

  @Get()
  @UseGuards(BasicAuthGuard)
  findAll(@Req() req: BaseRequest) {
    return this.propertiesService.findAll(req.userId, req.role);
  }

  @Get(':id')
  @UseGuards(BasicAuthGuard)
  findOne(@Param('id') id: string, @Req() req: BaseRequest) {
    return this.propertiesService.findOne(+id, req.userId, req.role);
  }

  @Post('search')
  async searchProperties(@Body() filters: SearchPropertyDto): Promise<Property[]> {
    return await this.propertiesService.searchProperties(filters);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesService.update(+id, updatePropertyDto);
  }

  @Patch('assign-agent/:propertyId/:agentId')
  @UseGuards(AdminAuthGuard)
  assignToAgent(@Param('propertyId') propertyId: string, @Param('agentId') agentId: string) {
    return this.propertiesService.assignToAgent(+propertyId, +agentId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(+id);
  }
}
