import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface RatioView {
  recycleRatio: string; // 回收比例，如 "1:35"
  rentRatio: string; // 出租比例，如 "1:40"
  source: string; // 数据来源
  updatedAt: string; // 更新时间（ISO 字符串）
  isFallback: boolean; // 是否为数据库为空时的兜底数据
}

@Injectable()
export class RatiosService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 返回最新的哈夫币比例。
   * 比例约定："1:35" 表示 1 元人民币 ≈ 35 万哈夫币。
   */
  async getLatest(): Promise<RatioView> {
    const latest = await this.prisma.ratio.findFirst({
      orderBy: { updatedAt: 'desc' },
    });

    if (!latest) {
      // 数据库尚未 seed 时的兜底，保证前端页面始终可用。
      return {
        recycleRatio: '1:35',
        rentRatio: '1:40',
        source: '内置兜底数据（示例）',
        updatedAt: new Date().toISOString(),
        isFallback: true,
      };
    }

    return {
      recycleRatio: latest.recycleRatio,
      rentRatio: latest.rentRatio,
      source: latest.source,
      updatedAt: latest.updatedAt.toISOString(),
      isFallback: false,
    };
  }
}
