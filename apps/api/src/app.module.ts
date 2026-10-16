import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { RatiosModule } from './ratios/ratios.module';
import { SpecialForcesModule } from './special-forces/special-forces.module';
import { PaodaoModule } from './paodao/paodao.module';
import { PlatformsModule } from './platforms/platforms.module';
import { RentalIntentModule } from './rental-intent/rental-intent.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    RatiosModule, // 模块一：哈夫币比例
    SpecialForcesModule, // 模块二：特勤处收益
    PaodaoModule, // 模块三：跑刀比例
    PlatformsModule, // 模块四：租号平台跳转
    RentalIntentModule, // 模块四：出租信息登记
  ],
})
export class AppModule {}
