import { Link } from 'react-router-dom';
import { RiskNotice } from '../components/Notice';
import { RATIO_SCAM_WARNING } from '../lib/constants';

interface ModuleCard {
  title: string;
  desc: string;
  links: { to: string; label: string }[];
}

const MODULES: ModuleCard[] = [
  {
    title: '① 哈夫币最新比例查询',
    desc: '回收 / 出租参考比例区间，附换算器，输入哈夫币数量即可折算人民币。',
    links: [{ to: '/ratio', label: '进入比例查询' }],
  },
  {
    title: '② 特勤处每日收益预估',
    desc: '按制造产出 / 部门兑换的预设公式估算每日收益（示例基准：纯搓 200-300 万/天）。',
    links: [{ to: '/special-forces', label: '进入收益预估' }],
  },
  {
    title: '③ 哈夫币跑刀最新比例',
    desc: '地图效率对比与时间成本估算，按“熟练跑手 300 万/小时”基准估算产出。',
    links: [{ to: '/paodao', label: '进入跑刀比例' }],
  },
  {
    title: '④ 出租账号 / 租账号',
    desc: '登记出租展示信息（待审核），或前往第三方平台自行挑选 / 上架账号。',
    links: [
      { to: '/rent-out', label: '我要出租账号' },
      { to: '/platforms', label: '我要租账号' },
    ],
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          三角洲行动 · 哈夫币工具站
        </h1>
        <p className="text-sm text-slate-300">
          汇总哈夫币比例、特勤处收益、跑刀效率等参考信息，并提供计算工具。
          所有数据均为示例/社区汇总，请以官方及实时行情为准。
        </p>
      </section>

      <RiskNotice>{RATIO_SCAM_WARNING}，请勿轻信高价回收 / 代充。</RiskNotice>

      <section className="grid gap-4 sm:grid-cols-2">
        {MODULES.map((m) => (
          <div
            key={m.title}
            className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-brand/60"
          >
            <div>
              <h2 className="text-base font-semibold text-white">{m.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {m.desc}
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {m.links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="rounded-md bg-brand px-3 py-1.5 text-sm font-medium text-slate-950 hover:bg-brand-dark"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
