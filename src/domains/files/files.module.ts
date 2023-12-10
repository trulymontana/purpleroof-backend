import { AwsService } from './../../common/providers/aws/aws.service';
import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';

@Module({
  controllers: [FilesController],
  providers: [AwsService, FilesService],
})
export class FilesModule {}
