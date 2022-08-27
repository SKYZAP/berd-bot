import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller('service')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/uploadFile')
  @UseInterceptors(FileInterceptor('image'))
  async UploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.appService.UploadToCloudinary(file);
  }
}
