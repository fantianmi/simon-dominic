import { useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';
import type { RatioView } from '../api/types';
import { InfoNotice, RiskNotice } from '../components/Notice';
import { RATIO_SCAM_WARNING } from '../lib/constants';
import { formatHfb, formatNumber, formatRmb } from '../lib/format';
import { hfbToRmb } from '../lib/ratio';

const QUICK_AMOUNTS: { label: string; value: number }[] = [
  { label: '1 亿', value: 1e8 },
  { label: '5000 万', value: 5e7 },
  { label: '1000 万', value: 1e7 },
  { label: '100 万', value: 1e6 },
];

export default function RatioQuery() {
  const [ratio, setRatio] = useState<RatioView | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [amount, setAmount] = useState('100000000');

  useEffect(() => {
    let alive = true;
    setLoading(true);
    api
      .getRatios()
      .then((data) => {
        if (alive) {
          setRatio(data);
          setError(null);
        }
      })
      .catch((e: Error) => alive && setError(e.message))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const hfb = Number(amount.replace(/[,\s]/g, '')) || 0;

  const conversions = useMemo(() => {
    if (!ratio) return null;
    return {
      recycle: hfbToRmb(hfb, ratio.recycleRatio),
      rent: hfbToRmb(hfb, ratio.rentRatio),
    };
  }, [hfb, ratio]);

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-xl font-bold text-white">
          ① 哈夫币最新比例查询
        </h1>
        <p className="text-sm text-slate-400">
          比例约定：
          <span className="text-slate-200">
            「1:35」表示 1 元人民币 ≈ 35 万哈夫币
          </span>
          。
        </p>
      </header>

      <RiskNotice title="风险提示">
        {RATIO_SCAM_WARNING}。请通过正规渠道交易，凡是要求先付款、先交押金、
        或索要账号密码的，一律视为骗局。
      </RiskNotice>

      {loading && <p className="text-sm text-slate-400">加载中…</p>}
      {error && (
        <p className="text-sm text-red-400">
          比例数据加载失败：{error}（请确认后端已启动）
        </p>
      )}

      {ratio && (
        <>
          <section className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <div className="text-sm text-slate-400">回收比例（参考）</div>
              <div className="mt-1 text-3xl font-bold text-brand">
                {ratio.recycleRatio}
              </div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <div className="text-sm text-slate-400">出租比例（参考）</div>
              <div className="mt-1 text-3xl font-bold text-brand">
                {ratio.rentRatio}
              </div>
            </div>
          </section>

          <InfoNotice>
            数据来源：{ratio.source}　·　更新时间：
            {new Date(ratio.updatedAt).toLocaleString('zh-CN')}
            {ratio.isFallback && '（当前为内置兜底数据）'}
          </InfoNotice>

          <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h2 className="text-base font-semibold text-white">哈夫币换算器</h2>
            <p className="mt-1 text-sm text-slate-400">
              输入哈夫币数量，按回收 / 出租比例分别折算人民币。
            </p>

            <div className="mt-4 space-y-3">
              <label className="block text-sm text-slate-300">
                哈夫币数量
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-brand"
                placeholder="例如 100000000"
              />
              <div className="flex flex-wrap gap-2">
                {QUICK_AMOUNTS.map((q) => (
                  <button
                    key={q.value}
                    type="button"
                    onClick={() => setAmount(String(q.value))}
                    className="rounded-md border border-slate-700 px-3 py-1 text-sm text-slate-200 hover:border-brand hover:text-brand"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500">
                当前输入：{formatNumber(hfb)} 哈夫币（约 {formatHfb(hfb)}）
              </p>
            </div>

            {conversions && (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
                  <div className="text-sm text-slate-400">
                    按回收比例 {ratio.recycleRatio}
                  </div>
                  <div className="mt-1 text-2xl font-bold text-emerald-400">
                    {conversions.recycle === null
                      ? '—'
                      : formatRmb(conversions.recycle)}
                  </div>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
                  <div className="text-sm text-slate-400">
                    按出租比例 {ratio.rentRatio}
                  </div>
                  <div className="mt-1 text-2xl font-bold text-emerald-400">
                    {conversions.rent === null
                      ? '—'
                      : formatRmb(conversions.rent)}
                  </div>
                </div>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
