import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getUser() {
    const user = await this.authService.getUser('xxxxxxxxxxxxxxxxxxxx');

    return user;
  }

  @Get('reset-password/:email')
  async forgotPassword(@Param('email') email: string) {
    const forgotPasswordLink = await this.authService.generatePasswordResetLink(email);

    return forgotPasswordLink;
  }
}
