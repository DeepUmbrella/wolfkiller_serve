import { Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailServive: EmailService) {}
  @Get()
  sendEmail() {
    return this.emailServive.sendEmail();
  }
}
