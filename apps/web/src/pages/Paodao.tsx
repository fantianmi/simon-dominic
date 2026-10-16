import { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { PaodaoData } from '../api/types';
import { InfoNotice } from '../components/Notice';
import { formatHfb, formatNumber } from '../lib/format';

export default function Paodao() {
  const [data, setData] = useState<PaodaoData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hours, setHours] = useState('2');

  useEffect(() => {
    let alive = true;
    api
      .getPaodao()
      .then((d) => alive && setData(d))
      .catch((e: Error) => alive && setError(e.message));
    return () => {
      alive = false;
    };
  }, []);

  const hoursNum = Number(hours) || 0;
  const estimated = data ? hoursNum * data.benchmarkPerHour : 0;

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-xl font-bold text-white">③ 哈夫币跑刀最新比例</h1>
        <p className="text-sm text-slate-400">
          地图效率对比 + 时间成本估算，按“熟练跑手”基准估算产出。
        </p>
      </header>

      {error && (
        <p className="text-sm text-red-400">
          数据加载失败：{error}（请确认后端已启动）
        </p>
      )}

      {data && (
        <>
          <InfoNotice>
            数据来源：{data.source}　·　更新时间：{data.updatedAt}
          </InfoNotice>

          <section className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="border-b border-slate-800 text-slate-400">
                <tr>
                  <th className="px-4 py-3">地图 / 玩法</th>
                  <th className="px-4 py-3">单趟耗时</th>
                  <th className="px-4 py-3">单趟产出</th>
                  <th className="px-4 py-3">折算每小时</th>
                  <th className="px-4 py-3">说明</th>
                </tr>
              </thead>
              <tbody>
                {data.maps.map((m) => {
                  const perHour = m.output / (m.durationMin / 60);
                  return (
                    <tr
                      key={m.map}
                      className="border-b border-slate-800/60 last:border-0"
                    >
                      <td className="px-4 py-3 font-medium text-white">
                        {m.map}
                      </td>
                      <td className="px-4 py-3 text-slate-300">
                        {m.durationMin} 分钟
                      </td>
                      <td className="px-4 py-3 text-slate-300">
                        {formatHfb(m.output)}
                      </td>
                      <td className="px-4 py-3 text-emerald-400">
                        {formatHfb(perHour)}
                      </td>
                      <td className="px-4 py-3 text-slate-400">{m.note}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>

          <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h2 className="text-base font-semibold text-white">
              时间成本估算器
            </h2>
            <p className="mt-1 text-sm text-slate-400">{data.benchmarkText}</p>

            <div className="mt-4 flex flex-wrap items-end gap-4">
              <div>
                <label className="mb-1 block text-sm text-slate-300">
                  计划投入小时数
                </label>
                <input
                  type="number"
                  min={0}
                  step={0.5}
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="w-40 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-brand"
                />
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-950/60 px-5 py-3">
                <div className="text-sm text-slate-400">预计产出</div>
                <div className="text-2xl font-bold text-emerald-400">
                  {formatNumber(estimated)} 哈夫币
                </div>
                <div className="text-xs text-slate-500">
                  约 {formatHfb(estimated)}
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-500">{data.disclaimer}</p>
          </section>
        </>
      )}
    </div>
  );
}
