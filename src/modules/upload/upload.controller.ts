import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  Req,
} from '@nestjs/common';

import { Response, Request } from 'express';

import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  upLoadSigleFile(@Req() req, @UploadedFile() file) {
    console.log(req, 'file');
    return this.uploadService.upLoadSigleFile(file);
  }

  @Get('download1')
  downloadByLink(@Res() res) {
    res.download(this.uploadService.downloadByLink());
    res.end();
  }

  @Get('download2')
  async downloadByStream(@Res({ passthrough: true }) res: Response) {
    res.setHeader('content-type', 'application/octet-stream');
    res.setHeader('content-disposition', 'attachment;filename=selfimage');
    await this.uploadService.downloadByStream(res);
  }
}
