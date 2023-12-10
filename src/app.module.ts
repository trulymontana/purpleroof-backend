import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { UsersModule } from './domains/users/users.module';
import { AuthModule } from './auth/auth.module';
import { MortgagesModule } from './domains/mortgages/mortgages.module';
import { PropertiesModule } from './domains/properties/properties.module';
import { RequirementsModule } from './domains/requirements/requirements.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [CommonModule, UsersModule, AuthModule, MortgagesModule, PropertiesModule, RequirementsModule, FilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
