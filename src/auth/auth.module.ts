import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailService } from 'src/common/providers/email/email.service';

@Global()
@Module({
  controllers: [AuthController],
  providers: [AuthService, EmailService],
  exports: [AuthService],
})
export class AuthModule {}
