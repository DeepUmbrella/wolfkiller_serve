import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor() {}

  sendCaptchaEmail(addres, captcha_code) {
    return {
      message: 'success',
    };
  }
}
