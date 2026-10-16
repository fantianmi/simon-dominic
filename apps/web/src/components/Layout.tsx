import { NavLink, Outlet } from 'react-router-dom';
import { BUSINESS_BOUNDARY } from '../lib/constants';

const NAV = [
  { to: '/', label: '首页', end: true },
  { to: '/ratio', label: '哈夫币比例' },
  { to: '/special-forces', label: '特勤处收益' },
  { to: '/paodao', label: '跑刀比例' },
  { to: '/rent-out', label: '出租账号' },
  { to: '/platforms', label: '租号渠道' },
];

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
          <NavLink to="/" className="text-lg font-bold text-brand">
            三角洲行动 · 哈夫币工具站
          </NavLink>
          <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  isActive
                    ? 'font-semibold text-brand'
                    : 'text-slate-300 hover:text-white'
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-800 bg-slate-900/60 px-4 py-6 text-xs leading-relaxed text-slate-400">
        <div className="mx-auto max-w-5xl space-y-2">
          <p className="text-slate-300">
            <span className="font-semibold text-brand">业务边界：</span>
            {BUSINESS_BOUNDARY}
          </p>
          <p>
            本站所有比例、收益、跑刀效率数据均为示例/社区汇总，仅供学习参考，不构成任何交易建议。
            请遵守游戏官方用户协议。
          </p>
        </div>
      </footer>
    </div>
  );
}
