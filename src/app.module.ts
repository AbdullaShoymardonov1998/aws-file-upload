import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsConfigService } from './aws/aws.service';
import { FileUploadController } from './aws/aws.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [FileUploadController],
  providers: [AwsConfigService],
})
export class AppModule {}
