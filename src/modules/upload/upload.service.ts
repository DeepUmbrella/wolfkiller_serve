import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { zip } from 'compressing';
import { resolve } from 'path';
@Injectable()
export class UploadService {
  upLoadSigleFile(createUploadDto: CreateUploadDto) {
    return 'this will be succussful';
  }
  downloadByLink(): string {
    return resolve(__dirname, '../../images/1669133668854.jpg');
  }

  async downloadByStream(res) {
    const url = resolve(__dirname, '../../images/1669133668854.jpg');

    const tarStream = new zip.Stream();

    await tarStream.addEntry(url);

    tarStream.pipe(res);
  }
}
