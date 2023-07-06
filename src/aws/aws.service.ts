import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class AwsConfigService {
  constructor(private configService: ConfigService) {}

  createS3Client(): S3Client {
    return new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async uploadFile(file) {
    const s3 = this.createS3Client();
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
    };
    console.log(process.env.S3_BUCKET_NAME);

    try {
      await s3.send(new PutObjectCommand(uploadParams));
      return { message: 'File uploaded successfully!' };
    } catch (err) {
      throw new Error('Error uploading file');
    }
  }
}
