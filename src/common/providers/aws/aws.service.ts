import { Injectable } from '@nestjs/common';
import {
  S3Client,
  ListObjectsCommand,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

@Injectable()
export class AwsService {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY ?? '',
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
      },
      region: process.env.AWS_REGION,
    });
  }
}
