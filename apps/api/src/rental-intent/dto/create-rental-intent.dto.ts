import { IsInt, IsNotEmpty, IsString, Max, MaxLength, Min } from 'class-validator';

/**
 * 出租信息登记 DTO。
 *
 * 安全约定（业务边界）：
 * - 仅收集“展示信息”，绝不收集账号密码 / 上号权限 / 二次验证信息。
 * - 配合全局 ValidationPipe 的 whitelist 选项，未在此声明的字段（如 password）
 *   会被自动丢弃，不会写入数据库。
 */
export class CreateRentalIntentDto {
  // 哈夫币总量
  @IsInt({ message: '哈夫币总量必须是整数' })
  @Min(1, { message: '哈夫币总量必须大于 0' })
  @Max(100_000_000_000)
  coinAmount: number;

  // 纯币 / 含装备
  @IsString()
  @IsNotEmpty({ message: '请选择纯币或含装备' })
  @MaxLength(50)
  accountType: string;

  // 特勤处等级
  @IsString()
  @IsNotEmpty({ message: '请填写特勤处等级' })
  @MaxLength(50)
  specialForcesLv: string;

  // 安全箱类型
  @IsString()
  @IsNotEmpty({ message: '请填写安全箱类型' })
  @MaxLength(50)
  safeBoxType: string;

  // 期望出租比例，如 "1:38"
  @IsString()
  @IsNotEmpty({ message: '请填写期望出租比例' })
  @MaxLength(30)
  expectedRatio: string;

  // 联系方式（仅后台可见，不对外公开展示）
  @IsString()
  @IsNotEmpty({ message: '请填写联系方式' })
  @MaxLength(200)
  contact: string;
}
