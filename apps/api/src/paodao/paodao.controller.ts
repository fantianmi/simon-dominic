import { Controller, Get } from '@nestjs/common';
import { PaodaoData, PaodaoService } from './paodao.service';

@Controller('paodao')
export class PaodaoController {
  constructor(private readonly paodaoService: PaodaoService) {}

  /** GET /api/paodao —— 模块三：跑刀效率参考 */
  @Get()
  getPaodao(): PaodaoData {
    return this.paodaoService.getPaodao();
  }
}
