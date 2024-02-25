import { Controller, Get, Session, Header, Post, Body } from '@nestjs/common';
import { CaptchaService } from './captcha.service';

@Controller('captcha')
export class CaptchaController {
  constructor(private captchaService: CaptchaService) {}

  @Get('image')
  @Header('Content-Type', 'image/svg+xml')
  @Header('Cache-Control', 'none')
  captcha_image(@Session() session) {
    const { text, data } = this.captchaService.createCaptcha('image');
    session.code = text;
    return { text, data };
  }
}
