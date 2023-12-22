import { Module } from '@nestjs/common';
import { LocationsService } from './LocationsService';
import { LocationsController } from './locations.controller';

@Module({
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
