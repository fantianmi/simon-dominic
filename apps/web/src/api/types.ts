// 与后端接口一一对应的类型定义。

/** 模块一：哈夫币比例 */
export interface RatioView {
  recycleRatio: string;
  rentRatio: string;
  source: string;
  updatedAt: string;
  isFallback: boolean;
}

/** 模块二：特勤处估算 */
export type SpecialForcesMode = 'craft' | 'exchange';

export interface ModeConfig {
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

export interface SpecialForcesConfig {
  modes: ModeConfig[];
  disclaimer: string;
}

export interface EstimateResult {
  mode: SpecialForcesMode;
  label: string;
  quantityPerDay: number;
  unitPrice: number;
  dailyIncome: number;
  inReferenceRange: boolean;
  reference: { min: number; max: number; text: string };
  disclaimer: string;
}

/** 模块三：跑刀 */
export interface PaodaoMap {
  map: string;
  durationMin: number;
  output: number;
  note: string;
}

export interface PaodaoData {
  benchmarkPerHour: number;
  benchmarkText: string;
  maps: PaodaoMap[];
  source: string;
  updatedAt: string;
  disclaimer: string;
}

/** 模块四：平台与出租登记 */
export interface Platform {
  name: string;
  url: string | null;
  description: string;
  primary: boolean;
}

export interface PlatformsResponse {
  notice: string;
  boundary: string;
  platforms: Platform[];
}

export interface RentalIntentPayload {
  coinAmount: number;
  accountType: string;
  specialForcesLv: string;
  safeBoxType: string;
  expectedRatio: string;
  contact: string;
}

export interface RentalIntentResult {
  id: number;
  status: string;
  createdAt: string;
  message: string;
}
