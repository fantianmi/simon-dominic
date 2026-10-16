# 三角洲行动 · 哈夫币工具站

一个《三角洲行动》哈夫币相关的信息/计算工具站，包含四个模块：

| 模块 | 说明 | 前端路由 | 后端接口 |
| --- | --- | --- | --- |
| 一、哈夫币最新比例查询 | 回收/出租参考比例 + 换算器 | `/ratio` | `GET /api/ratios` |
| 二、特勤处每日收益预估 | 按预设公式估算日收益 | `/special-forces` | `POST /api/special-forces/estimate` |
| 三、哈夫币跑刀最新比例 | 地图效率对比 + 时间成本估算 | `/paodao` | `GET /api/paodao` |
| 四、出租账号 / 租账号 | 出租信息登记（待审核）+ 第三方平台跳转 | `/rent-out`、`/platforms` | `POST /api/rental-intent`、`GET /api/platforms` |

> ⚠️ 本站仅提供信息展示与计算参考，**不参与任何账号交易、托管、押金代收或上架代办**。
> 数据均为示例/社区汇总，请以官方及实时行情为准。

---

## 技术栈

- **前端**：React 18 + Vite 5 + TypeScript + Tailwind CSS 3，路由使用 react-router-dom 6
- **后端**：NestJS 10 + TypeScript + Prisma + SQLite
- **包管理**：pnpm workspace（`apps/web`、`apps/api`）
- 无登录、无鉴权

## 目录结构

```
.
├── package.json               # 根：workspace 脚本
├── pnpm-workspace.yaml
├── .gitignore
├── apps
│   ├── api                    # NestJS 后端
│   │   ├── prisma
│   │   │   ├── schema.prisma  # RentalIntent / Ratio 模型
│   │   │   └── seed.ts        # 初始比例数据
│   │   └── src
│   │       ├── main.ts
│   │       ├── app.module.ts
│   │       ├── prisma/        # PrismaService
│   │       ├── ratios/        # 模块一
│   │       ├── special-forces/# 模块二
│   │       ├── paodao/        # 模块三
│   │       ├── platforms/     # 模块四（跳转）
│   │       └── rental-intent/ # 模块四（出租表单）
│   └── web                    # React 前端
│       └── src
│           ├── api/           # 接口封装与类型
│           ├── components/    # Layout / RiskNotice / Notice
│           ├── lib/           # 比例换算工具
│           └── pages/         # 六个页面
```

## 快速开始

```bash
# 1. 安装依赖（根目录执行）
pnpm install

# 2. 准备后端环境变量
cp apps/api/.env.example apps/api/.env

# 3. 初始化数据库（生成 client + 建表 + 写入初始比例）
pnpm db:setup

# 4. 分别启动（两个终端）
pnpm dev:api     # http://localhost:3001/api
pnpm dev:web     # http://localhost:5173
```

前端开发服务器的 `/api` 已通过 Vite proxy 转发到 `http://localhost:3001`，无需处理跨域。

## 后端接口

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/api/ratios` | 返回最新哈夫币回收/出租比例、来源、更新时间 |
| POST | `/api/special-forces/estimate` | 按预设公式估算特勤处日收益 |
| GET | `/api/special-forces` | 返回特勤处估算的基准配置 |
| GET | `/api/paodao` | 返回跑刀地图效率参考 + 每小时基准 |
| GET | `/api/rental-intent` | 列出出租登记（默认只返回非敏感字段，见下） |
| POST | `/api/rental-intent` | 提交出租登记，落库为 `pending` 待审核 |
| GET | `/api/platforms` | 返回租号平台列表（含 GG租号） |

### POST /api/rental-intent 请求体

```json
{
  "coinAmount": 100000000,
  "accountType": "纯币",
  "specialForcesLv": "满级",
  "safeBoxType": "大型安全箱",
  "expectedRatio": "1:38",
  "contact": "微信/QQ 等，仅后台可见"
}
```

响应仅返回 `{ id, status, createdAt }`，**联系方式不会回显**。

---

## 业务边界（重要）

> 本站仅提供租号信息展示与第三方平台跳转指引，不参与账号托管、不代收押金、不代办上架。
> 用户与平台之间的交易行为及风险，由用户自行承担。

- 出租表单**只收集展示信息**，绝不收集账号密码 / 上号权限 / 二次验证信息。
- 联系方式字段仅用于后台联系，不对外公开展示。
- 提交后进入 `pending`（待审核）状态，审核通过前不对外展示。
- 跳转平台页面中的第三方链接仅供参考：**请自行阅读各平台的押金与赔付规则**。

### 关于第三方平台链接

- GG租号：<https://www.ggzuhao.com>（已提供）
- 虚贝租号 / 闲游盒 / U号租：官方域名未在仓库内内置（避免写入未经核实的链接），
  接口中对应 `url` 为 `null`，前端会展示“前往搜索”引导。
  如需固定链接，请在 `apps/api/src/platforms/platforms.service.ts` 中补全并自行核实域名真实性。

---

## 免责声明

本项目为学习/工具性质的开源骨架，所有比例、收益、效率数据均为**示例数据**，
不构成任何投资或交易建议。请遵守游戏官方用户协议，理性对待虚拟物品交易。
