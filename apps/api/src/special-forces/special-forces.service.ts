import { Injectable } from '@nestjs/common';

export type SpecialForcesMode = 'craft' | 'exchange';

export interface EstimateInput {
  mode: SpecialForcesMode;
  quantityPerDay: number; // 每日产出（制造）或兑换次数
  unitPrice: number; // 按当前均价估算的单件收益（哈夫币）
}

interface ModeConfig {
  mode: SpecialForcesMode;
  label: string;
  unitName: string;
  quantityLabel: string;
  unitPriceLabel: string;
  defaultQuantityPerDay: number;
  defaultUnitPrice: number;
  referenceMin: number;
  referenceMax: number;
  referenceText: string;
}

/**
 * 预设基准（示例数据，非实时行情）：
 * - 纯搓特勤处：一天收益约 200-300 万哈夫币
 * - 每日部门兑换：稳定获利 8-10 万哈夫币
 */
const MODE_CONFIG: Record<SpecialForcesMode, ModeConfig> = {
  craft: {
    mode: 'craft',
    label: '纯搓特勤处',
    unitName: '件',
    quantityLabel: '每日制造产出件数',
    unitPriceLabel: '单件制造品当前均价（哈夫币）',
    defaultQuantityPerDay: 4,
    defaultUnitPrice: 600_000,
    referenceMin: 2_000_000,
    referenceMax: 3_000_000,
    referenceText: '纯搓特勤处一天收益约 200-300 万哈夫币',
  },
  exchange: {
    mode: 'exchange',
    label: '每日部门兑换',
    unitName: '次',
    quantityLabel: '每日兑换次数',
    unitPriceLabel: '单次兑换净利润（哈夫币）',
    defaultQuantityPerDay: 5,
    defaultUnitPrice: 18_000,
    referenceMin: 80_000,
    referenceMax: 100_000,
    referenceText: '每日部门兑换可稳定获利 8-10 万哈夫币',
  },
};

function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
}

@Injectable()
export class SpecialForcesService {
  /** GET /api/special-forces —— 返回基准配置，供前端渲染表单默认值 */
  getConfig() {
    return {
      modes: Object.values(MODE_CONFIG).map((c) => ({
        mode: c.mode,
        label: c.label,
        unitName: c.unitName,
        quantityLabel: c.quantityLabel,
        unitPriceLabel: c.unitPriceLabel,
        defaultQuantityPerDay: c.defaultQuantityPerDay,
        defaultUnitPrice: c.defaultUnitPrice,
        referenceMin: c.referenceMin,
        referenceMax: c.referenceMax,
        referenceText: c.referenceText,
      })),
      disclaimer:
        '估算基于你输入的数量与“按当前均价估算”的单价，不含交易税、手续费与行情波动，仅供参考。',
    };
  }

  /** POST /api/special-forces/estimate —— 按预设公式估算每日收益 */
  estimate(input: EstimateInput) {
    const config = MODE_CONFIG[input.mode] ?? MODE_CONFIG.craft;

    const quantityPerDay = clamp(
      Number(input.quantityPerDay ?? config.defaultQuantityPerDay),
      0,
      100000,
    );
    const unitPrice = clamp(
      Number(input.unitPrice ?? config.defaultUnitPrice),
      0,
      1_000_000_000,
    );

    // 预设公式：每日收益 = 每日产出数量 × 单件均价
    const dailyIncome = Math.round(quantityPerDay * unitPrice);

    return {
      mode: config.mode,
      label: config.label,
      quantityPerDay,
      unitPrice,
      dailyIncome,
      inReferenceRange:
        dailyIncome >= config.referenceMin && dailyIncome <= config.referenceMax,
      reference: {
        min: config.referenceMin,
        max: config.referenceMax,
        text: config.referenceText,
      },
      disclaimer:
        '估算基于你输入的数量与“按当前均价估算”的单价，不含交易税、手续费与行情波动，仅供参考。',
    };
  }
}
