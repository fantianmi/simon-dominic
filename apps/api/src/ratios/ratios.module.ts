import { Module } from '@nestjs/common';
import { RatiosController } from './ratios.controller';
import { RatiosService } from './ratios.service';

@Module({
  controllers: [RatiosController],
  providers: [RatiosService],
})
export class RatiosModule {}
