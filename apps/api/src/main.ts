import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 所有接口统一挂在 /api 前缀下
  app.setGlobalPrefix('api');

  // 本项目无登录/鉴权，为方便本地前后端联调允许跨域。
  // 生产环境建议改为白名单来源或使用反向代理。
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 丢弃 DTO 未声明的字段（防止客户端塞入账号密码等敏感字段）
      transform: true,
    }),
  );

  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`[api] 服务已启动: http://localhost:${port}/api`);
}

void bootstrap();
