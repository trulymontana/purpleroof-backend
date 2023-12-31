import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ValidationPipe } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { AdminAuthGuard } from 'src/auth/guards/admin-auth.guard';
import { BasicAuthGuard } from 'src/auth/guards/basic-auth.guard';
import { BaseRequest } from 'src/utils/BaseRequest';
import { ApiHeader } from '@nestjs/swagger';

export enum ApprovalStatusEnum {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
export enum ActivationStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Controller('agents')
@ApiHeader({ name: 'Authorization' })
export class AgentsController {
  constructor(private agentsService: AgentsService) {}

  @Post()
  @UseGuards(BasicAuthGuard)
  create(@Body() createAgentDto: CreateAgentDto) {
    return this.agentsService.create(createAgentDto);
  }

  @Get()
  @UseGuards(AdminAuthGuard)
  findAll() {
    return this.agentsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: BaseRequest) {
    return this.agentsService.findOne(+id, req.userId, req.role);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgentDto: UpdateAgentDto) {
    return this.agentsService.update(+id, updateAgentDto);
  }
  @Patch(':id/update-approval-status/:approvalStatus')
  @UseGuards(AdminAuthGuard)
  updateApprovalStatus(
    @Param('id') id: string,
    @Param('approvalStatus', new ValidationPipe({ transform: true }))
    approvalStatus: ApprovalStatusEnum,
  ) {
    return this.agentsService.approveOrReject(+id, approvalStatus);
  }
  @Patch(':id/update-active-status/:activationStatus')
  @UseGuards(AdminAuthGuard)
  updateActivationStatus(@Param('id') id: string, @Param('activationStatus') activationStatus: ActivationStatusEnum) {
    return this.agentsService.activateOrDeactivate(+id, activationStatus);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agentsService.remove(+id);
  }
}
