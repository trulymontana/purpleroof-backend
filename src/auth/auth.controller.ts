import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInRequest } from './dto/sign-in-request.dto';
import { SignUpRequest } from './dto/sign-up-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Get()
  // @UseGuards()
  // async getUser() {
  //   const user = await this.authService.getUser('xxxxxxxxxxxxxxxxxxxx');

  //   return user;
  // }

  @Post('sign-in')
  signIn(@Body() signInRequest: SignInRequest) {
    return this.authService.signIn(signInRequest);
  }

  @Post('sign-up')
  signUp(@Body() signInRequest: SignUpRequest) {
    return this.authService.signUp(signInRequest);
  }

  // @Get('reset-password/:email')
  // async forgotPassword(@Param('email') email: string) {
  //   const forgotPasswordLink = await this.authService.generatePasswordResetLink(email);

  //   return forgotPasswordLink;
  // }
}
