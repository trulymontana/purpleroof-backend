import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

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

  async sendEmail() {
    const info = await this.transporter.sendMail({
      from: 'purplroof@gmail.com', // sender address
      to: 'mohammadfaisal1011@gmail.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello {{ contact.FIRSTNAME }} , This is an SMTP message with customizations', // plain text body
    });

    return info;
  }
}
