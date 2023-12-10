import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { S3Folders } from 'src/constants/s3-folders';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.filesService.create(createFileDto);
  }

  @Get('/pre-signed-url/:folder/:fileName')
  findAll(@Param('folder') folder: S3Folders, @Param('fileName') fileName: string) {
    return this.filesService.getPreSignedUrl(folder, fileName);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':folder/:fileName')
  remove(@Param('folder') folder: S3Folders, @Param('fileName') fileName: string) {
    return this.filesService.remove(folder, fileName);
  }
}
