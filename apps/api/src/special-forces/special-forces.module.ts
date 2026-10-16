import { Module } from '@nestjs/common';
import { SpecialForcesController } from './special-forces.controller';
import { SpecialForcesService } from './special-forces.service';

@Module({
  controllers: [SpecialForcesController],
  providers: [SpecialForcesService],
})
export class SpecialForcesModule {}
