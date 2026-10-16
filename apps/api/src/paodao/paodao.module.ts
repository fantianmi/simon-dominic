import { Module } from '@nestjs/common';
import { PaodaoController } from './paodao.controller';
import { PaodaoService } from './paodao.service';

@Module({
  controllers: [PaodaoController],
  providers: [PaodaoService],
})
export class PaodaoModule {}
