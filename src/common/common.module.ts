import { Global, Module } from '@nestjs/common';
import { AwsService } from './providers/aws/aws.service';
import { PrismaService } from './providers/prisma/prisma.service';
import { CommonController } from './common.controller';

@Global()
@Module({
  providers: [AwsService, PrismaService],
  exports: [AwsService, PrismaService],
  controllers: [CommonController],
})
export class CommonModule {}
