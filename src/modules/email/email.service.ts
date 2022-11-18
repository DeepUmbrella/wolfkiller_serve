import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendEmail() {
    this.mailerService.sendMail({
      to: '737271441@qq.com',
      from: '9265477865@163.com',
      subject: 'Hello Nest js',
      template: 'welcome',
    });
  }
}
