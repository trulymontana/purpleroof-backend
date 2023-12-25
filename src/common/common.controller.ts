import { Controller, Get } from '@nestjs/common';
import { EmailService } from './providers/email/email.service';

@Controller('common')
export class CommonController {
  constructor(private readonly emailService: EmailService) {}

  @Get()
  async getHello() {
    return await this.emailService.sendEmail();
  }
}
