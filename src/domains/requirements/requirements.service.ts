import { Injectable } from '@nestjs/common';
import { CreateRequirementDto } from './dto/create-requirement.dto';
import { UpdateRequirementDto } from './dto/update-requirement.dto';

@Injectable()
export class RequirementsService {
  create(createRequirementDto: CreateRequirementDto) {
    return 'This action adds a new requirement';
  }

  findAll() {
    return `This action returns all requirements`;
  }

  findOne(id: number) {
    return `This action returns a #${id} requirement`;
  }

  update(id: number, updateRequirementDto: UpdateRequirementDto) {
    return `This action updates a #${id} requirement`;
  }

  remove(id: number) {
    return `This action removes a #${id} requirement`;
  }
}
