import { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { Platform, PlatformsResponse } from '../api/types';
import { InfoNotice, RiskNotice } from '../components/Notice';
import { BUSINESS_BOUNDARY, PLATFORM_NOTICE } from '../lib/constants';

function searchUrl(name: string): string {
  return `https://www.bing.com/search?q=${encodeURIComponent(name + ' 官网')}`;
}

function PlatformCard({ p }: { p: Platform }) {
  return (
    <div
      className={
        'flex flex-col justify-between rounded-xl border bg-slate-900/60 p-5 ' +
        (p.primary ? 'border-brand/60' : 'border-slate-800')
      }
    >
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-white">{p.name}</h2>
          {p.primary && (
            <span className="rounded bg-brand/20 px-2 py-0.5 text-xs text-brand">
              主要推荐
            </span>
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          {p.description}
        </p>
        {p.url ? (
          <p className="mt-2 break-all text-xs text-slate-500">{p.url}</p>
        ) : (
          <p className="mt-2 text-xs text-amber-400/80">
            官方域名未内置，请自行核实后访问，谨防钓鱼网站。
          </p>
        )}
      </div>

      <div className="mt-4">
        {p.url ? (
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-md bg-brand px-3 py-1.5 text-sm font-medium text-slate-950 hover:bg-brand-dark"
          >
            点击前往平台自行上架 / 挑选账号
          </a>
        ) : (
          <a
            href={searchUrl(p.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-md border border-slate-600 px-3 py-1.5 text-sm font-medium text-slate-200 hover:border-brand hover:text-brand"
          >
            前往搜索该平台（请核实官网）
          </a>
        )}
      </div>
    </div>
  );
}

export default function Platforms() {
  const [data, setData] = useState<PlatformsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    api
      .getPlatforms()
      .then((d) => alive && setData(d))
      .catch((e: Error) => alive && setError(e.message));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-xl font-bold text-white">④ 租账号 · 渠道跳转</h1>
        <p className="text-sm text-slate-400">
          本站不参与交易，仅提供第三方平台跳转指引。
        </p>
      </header>

      {/* 顶部固定提示 */}
      <InfoNotice title="提示">{PLATFORM_NOTICE}</InfoNotice>

      {error && (
        <p className="text-sm text-red-400">
          平台数据加载失败：{error}（请确认后端已启动）
        </p>
      )}

      {data && (
        <>
          <section className="grid gap-4 sm:grid-cols-2">
            {data.platforms.map((p) => (
              <PlatformCard key={p.name} p={p} />
            ))}
          </section>

          <RiskNotice title="业务边界与风险提示">
            {data.boundary}
            <br />
            押金、赔付、账号安全等规则均以第三方平台为准，请务必在平台内完成交易，
            切勿私下转账或向任何人提供账号密码。
          </RiskNotice>
        </>
      )}

      <p className="text-xs text-slate-500">{BUSINESS_BOUNDARY}</p>
    </div>
  );
}
