import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { BasicAuthGuard } from 'src/auth/guards/basic-auth.guard';
import { ApiHeader } from '@nestjs/swagger';
import { BaseRequest } from 'src/utils/BaseRequest';

// add a comment against a mortgage

@Controller('comments')
@ApiHeader({ name: 'Authorization' })
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(BasicAuthGuard)
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get('all-by-mortgage/:mortgageId')
  @UseGuards(BasicAuthGuard)
  findAllByMortgage(@Param('mortgageId') mortgageId: string, @Req() req: BaseRequest) {
    return this.commentsService.findAll(+mortgageId, req.userId, req.role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
