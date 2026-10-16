import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * 初始化示例数据。
 * 所有比例均为示例，请以官方/实时行情为准。
 */
async function main() {
  const existing = await prisma.ratio.count();
  if (existing === 0) {
    await prisma.ratio.create({
      data: {
        // 约定："1:35" 表示 1 元人民币 ≈ 35 万哈夫币
        recycleRatio: '1:35',
        rentRatio: '1:40',
        source: '社区玩家汇总（示例数据，仅供参考）',
      },
    });
    console.log('[seed] 已写入初始哈夫币比例数据');
  } else {
    console.log('[seed] ratios 表已有数据，跳过');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
