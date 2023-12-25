import { Global, Module } from '@nestjs/common';
import { AwsService } from './providers/aws/aws.service';
import { PrismaService } from './providers/prisma/prisma.service';
import { CommonController } from './common.controller';
import { EmailService } from './providers/email/email.service';

@Global()
@Module({
  providers: [AwsService, PrismaService, EmailService],
  exports: [AwsService, PrismaService, EmailService],
  controllers: [CommonController],
})
export class CommonModule {}
