import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRentalIntentDto } from './dto/create-rental-intent.dto';

@Injectable()
export class RentalIntentService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 保存出租信息登记。
   * - 状态默认 pending（待审核），审核通过前不对外展示。
   * - 仅落库 DTO 中声明的“展示信息”，不接收账号密码/上号权限。
   */
  async create(dto: CreateRentalIntentDto) {
    const created = await this.prisma.rentalIntent.create({
      data: {
        coinAmount: dto.coinAmount,
        accountType: dto.accountType,
        specialForcesLv: dto.specialForcesLv,
        safeBoxType: dto.safeBoxType,
        expectedRatio: dto.expectedRatio,
        contact: dto.contact,
        status: 'pending',
      },
    });

    // 响应不回显 contact（联系方式仅后台可见）。
    return {
      id: created.id,
      status: created.status,
      createdAt: created.createdAt,
      message: '提交成功，已进入待审核队列，审核通过前不会对外展示。',
    };
  }

  /**
   * 后台查看列表（本骨架未做鉴权，demo 用）。
   * 对外仅返回非敏感字段，剔除 contact。
   */
  async listPublic() {
    const rows = await this.prisma.rentalIntent.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(({ contact: _contact, ...rest }) => rest);
  }
}
