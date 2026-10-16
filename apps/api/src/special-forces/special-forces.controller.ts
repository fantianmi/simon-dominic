import { Body, Controller, Get, Post } from '@nestjs/common';
import { EstimateDto } from './dto/estimate.dto';
import { SpecialForcesService } from './special-forces.service';

@Controller('special-forces')
export class SpecialForcesController {
  constructor(private readonly specialForcesService: SpecialForcesService) {}

  /** GET /api/special-forces —— 模块二：基准配置 */
  @Get()
  getConfig() {
    return this.specialForcesService.getConfig();
  }

  /** POST /api/special-forces/estimate —— 模块二：每日收益估算 */
  @Post('estimate')
  estimate(@Body() dto: EstimateDto) {
    return this.specialForcesService.estimate({
      mode: dto.mode,
      quantityPerDay: dto.quantityPerDay as number,
      unitPrice: dto.unitPrice as number,
    });
  }
}
