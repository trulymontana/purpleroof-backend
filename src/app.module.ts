import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { UsersModule } from './domains/users/users.module';
import { AuthModule } from './auth/auth.module';
import { MortgagesModule } from './domains/mortgages/mortgages.module';
import { PropertiesModule } from './domains/properties/properties.module';
import { RequirementsModule } from './domains/requirements/requirements.module';
import { FilesModule } from './domains/files/files.module';
import { SuccessInterceptor } from './middlewares/success.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [CommonModule, UsersModule, AuthModule, MortgagesModule, PropertiesModule, RequirementsModule, FilesModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: SuccessInterceptor,
    },
  ],
})
export class AppModule {}
