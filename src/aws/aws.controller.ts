import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsConfigService } from './aws.service';

@Controller('files')
export class FileUploadController {
  constructor(private readonly awsConfigService: AwsConfigService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFiles(@UploadedFile() file) {
    return this.awsConfigService.uploadFile(file);
  }
}
