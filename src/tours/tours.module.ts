import { Module } from '@nestjs/common';
import { ToursController } from './tours.controller';
import { ToursService } from './tours.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from './tour.entity';

@Module({
  controllers: [ToursController],
  providers: [ToursService]
})
export class ToursModule {}
