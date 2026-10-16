import { IsIn, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class EstimateDto {
  // 制造项目（纯搓特勤处）或部门兑换
  @IsIn(['craft', 'exchange'], { message: 'mode 只能是 craft 或 exchange' })
  mode: 'craft' | 'exchange';

  // 每日产出/兑换数量（可选，缺省时后端使用预设默认值）
  @IsOptional()
  @IsNumber({}, { message: 'quantityPerDay 必须是数字' })
  @Min(0)
  @Max(100000)
  quantityPerDay?: number;

  // 按当前均价估算的单件收益（哈夫币）
  @IsOptional()
  @IsNumber({}, { message: 'unitPrice 必须是数字' })
  @Min(0)
  @Max(1_000_000_000)
  unitPrice?: number;
}
