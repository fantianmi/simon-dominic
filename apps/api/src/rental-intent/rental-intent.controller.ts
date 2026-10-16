import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRentalIntentDto } from './dto/create-rental-intent.dto';
import { RentalIntentService } from './rental-intent.service';

@Controller('rental-intent')
export class RentalIntentController {
  constructor(private readonly rentalIntentService: RentalIntentService) {}

  /**
   * POST /api/rental-intent —— 模块四：提交出租信息登记。
   * 数据以 pending 状态入库，不直接对外展示。
   */
  @Post()
  create(@Body() dto: CreateRentalIntentDto) {
    return this.rentalIntentService.create(dto);
  }

  /** GET /api/rental-intent —— 待审核列表（演示用，不含联系方式） */
  @Get()
  list() {
    return this.rentalIntentService.listPublic();
  }
}
