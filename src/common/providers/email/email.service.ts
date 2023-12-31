import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from './send-email.dto';

@Injectable()
export class EmailService {
  transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: 'purplroof@gmail.com',
        pass: 'dqL1hwQygPrC9sWS',
      },
    });
  }

  async sendEmail(sendEmailRequest: SendEmailDto) {
    const info = await this.transporter.sendMail({
      from: sendEmailRequest.emailFrom,
      to: [sendEmailRequest.emailTo, 'mohammadfaisal1011@gmail.com'],
      subject: sendEmailRequest.subject,
      text: sendEmailRequest.message,
    });

    return info;
  }
}
