import { Controller, Get, Session, Header, Post, Body } from '@nestjs/common';
import { CaptchaService } from './captcha.service';
import { EmailService } from '../email/email.service';

@Controller('captcha')
export class CaptchaController {
  constructor(private captchaService: CaptchaService, private emailService: EmailService) {}

  @Get('image')
  @Header('Content-Type', 'image/svg+xml')
  @Header('Cache-Control', 'none')
  captcha_image(@Session() session) {
    const { text, data } = this.captchaService.createCaptcha('image');
    session.code = text;
    return { text, data };
  }
  @Post('email')
  async captcha_email(@Body('email') emailaddres, @Session() session) {
    console.log(emailaddres, 'emailaddres');
    const { text: captcha_code } = this.captchaService.createCaptcha('email', 6);

    const sendResult = await this.emailService.sendCaptchaEmail(emailaddres, captcha_code);
    session.captcha_code = captcha_code;
    return {
      captcha_code,
      sendResult,
    };
  }
}
