import { Module } from '@nestjs/common';
import { CaptchaService } from './captcha.service';
import { CaptchaController } from './captcha.controller';
import { EmailService } from '../email/email.service';

@Module({
  imports: [],
  controllers: [CaptchaController],
  providers: [CaptchaService, EmailService],
  exports: [CaptchaService],
})
export class CaptchaModule {}
