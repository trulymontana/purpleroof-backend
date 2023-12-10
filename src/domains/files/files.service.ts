import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';
import { AwsService } from 'src/common/providers/aws/aws.service';
import { S3Folders } from 'src/constants/s3-folders';

@Injectable()
export class FilesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly awsService: AwsService,
  ) {}
  create(createFileDto: CreateFileDto) {
    console.log(createFileDto);
    return 'This action adds a new file';
  }

  async getPreSignedUrl(folder: S3Folders, fileName: string) {
    const url = await this.awsService.getPreSignedUrl(folder, fileName);
    return { url, expiry: 3600 };
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    console.log(updateFileDto);
    return `This action updates a #${id} file`;
  }

  async remove(folder: S3Folders, fileName: string) {
    const response = await this.awsService.deleteFile(folder, fileName);
    console.log(response);
    return response;
  }
}
