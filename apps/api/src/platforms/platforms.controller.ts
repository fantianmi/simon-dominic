import { Controller, Get } from '@nestjs/common';
import { PlatformsService } from './platforms.service';

@Controller('platforms')
export class PlatformsController {
  constructor(private readonly platformsService: PlatformsService) {}

  /** GET /api/platforms —— 模块四：租号平台跳转列表 */
  @Get()
  getPlatforms() {
    return this.platformsService.getPlatforms();
  }
}
