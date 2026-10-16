import { Injectable } from '@nestjs/common';

export interface PaodaoMap {
  map: string; // 地图/玩法名称
  durationMin: number; // 单趟耗时（分钟）
  output: number; // 单趟产出（哈夫币）
  note: string; // 说明
}

export interface PaodaoData {
  benchmarkPerHour: number; // 熟练跑手每小时基准产出（哈夫币）
  benchmarkText: string;
  maps: PaodaoMap[];
  source: string; // 数据来源
  updatedAt: string; // 更新时间
  disclaimer: string;
}

/**
 * 跑刀效率参考数据（模块三）。
 * 数据为硬编码示例，请以社区实测/官方行情为准。
 */
const PAODAO_DATA: PaodaoData = {
  benchmarkPerHour: 3_000_000, // 熟练跑手：约 300 万/小时
  benchmarkText: '熟练跑手基准：约 300 万哈夫币/小时',
  maps: [
    {
      map: 'AZ3 核电站',
      durationMin: 17,
      output: 2_000_000,
      note: '高风险高收益，需熟悉路线与撤离点',
    },
    {
      map: '普坝',
      durationMin: 15,
      output: 500_000,
      note: '门槛低、收益稳定，适合新手',
    },
  ],
  source: '社区玩家经验汇总（示例数据）',
  updatedAt: '2026-10-16',
  disclaimer: '跑刀收益受路线、运气、对抗强度影响较大，以上为参考值，不保证实际产出。',
};

@Injectable()
export class PaodaoService {
  /** 返回跑刀效率参考数据 */
  getPaodao(): PaodaoData {
    return PAODAO_DATA;
  }
}
