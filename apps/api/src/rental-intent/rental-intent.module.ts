import { Module } from '@nestjs/common';
import { RentalIntentController } from './rental-intent.controller';
import { RentalIntentService } from './rental-intent.service';

@Module({
  controllers: [RentalIntentController],
  providers: [RentalIntentService],
})
export class RentalIntentModule {}
