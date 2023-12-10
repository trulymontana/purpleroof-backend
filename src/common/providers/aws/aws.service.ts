import { Injectable } from '@nestjs/common';
import {
  S3Client,
  ListObjectsCommand,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import fs from 'fs';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Folders } from 'src/constants/s3-folders';

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

  getPreSignedUrl = async (folder: S3Folders, fileName: string) => {
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${folder}/${fileName}`,
      ACL: 'public-read',
    });
    return await getSignedUrl(this.client, command, { expiresIn: 3600 });
  };

  deleteFile = (folder: S3Folders, fileName: string) => {
    console.log(folder, fileName, process.env.S3_BUCKET_NAME);
    const command = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${folder}/${fileName}`,
    });
    return this.client.send(command);
  };

  downloadFileFromS3 = async (fileName: string) => {
    const downloadCommand = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
    });

    const downloadStream: any = await this.client.send(downloadCommand);
    const osStream = fs.createWriteStream(fileName);
    await downloadStream.Body.pipe(osStream);
    return fileName;
  };

  listObjects = async (folderName: string) => {
    const command = new ListObjectsCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Prefix: folderName,
      MaxKeys: 10,
    });
    const response = await this.client.send(command);
    return response;
  };

  deleteFolderFromAwsS3BucketWithImage = (resourceType: string, id: string) => {
    const command = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_FOR_SHORT_AUDIO,
      Key: `${resourceType}/${id}/featured.jpg`,
    });
    return this.client.send(command);
  };
}
