import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtTokenService } from './jwt-token.service';

@Global()
@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtTokenService],
  exports: [AuthService, JwtTokenService],
})
export class AuthModule {}
