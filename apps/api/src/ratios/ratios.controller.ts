import { Controller, Get } from '@nestjs/common';
import { RatiosService, RatioView } from './ratios.service';

@Controller('ratios')
export class RatiosController {
  constructor(private readonly ratiosService: RatiosService) {}

  /** GET /api/ratios —— 模块一：哈夫币最新比例 */
  @Get()
  getRatios(): Promise<RatioView> {
    return this.ratiosService.getLatest();
  }
}
