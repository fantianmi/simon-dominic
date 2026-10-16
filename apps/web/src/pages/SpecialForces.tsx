import { useEffect, useState } from 'react';
import { api } from '../api/client';
import type {
  EstimateResult,
  ModeConfig,
  SpecialForcesConfig,
  SpecialForcesMode,
} from '../api/types';
import { InfoNotice } from '../components/Notice';
import { formatHfb, formatNumber } from '../lib/format';

export default function SpecialForces() {
  const [config, setConfig] = useState<SpecialForcesConfig | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [mode, setMode] = useState<SpecialForcesMode>('craft');
  const [quantity, setQuantity] = useState('4');
  const [unitPrice, setUnitPrice] = useState('600000');

  const [result, setResult] = useState<EstimateResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let alive = true;
    api
      .getSpecialForcesConfig()
      .then((data) => {
        if (!alive) return;
        setConfig(data);
        applyModeDefaults(data, 'craft');
      })
      .catch((e: Error) => alive && setError(e.message));
    return () => {
      alive = false;
    };
  }, []);

  function applyModeDefaults(cfg: SpecialForcesConfig, next: SpecialForcesMode) {
    const m = cfg.modes.find((x) => x.mode === next);
    if (!m) return;
    setQuantity(String(m.defaultQuantityPerDay));
    setUnitPrice(String(m.defaultUnitPrice));
  }

  function onModeChange(next: SpecialForcesMode) {
    setMode(next);
    setResult(null);
    if (config) applyModeDefaults(config, next);
  }

  const current: ModeConfig | undefined = config?.modes.find(
    (m) => m.mode === mode,
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await api.estimateSpecialForces({
        mode,
        quantityPerDay: Number(quantity),
        unitPrice: Number(unitPrice),
      });
      setResult(res);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-xl font-bold text-white">
          ② 特勤处每日收益预估
        </h1>
        <p className="text-sm text-slate-400">
          按预设公式估算每日收益，无需实时抓取交易行价格，输入“按当前均价估算”的单价即可。
        </p>
      </header>

      {error && <p className="text-sm text-red-400">出错：{error}</p>}

      {config && (
        <>
          <InfoNotice title="参考基准（示例）">
            {config.modes.map((m) => (
              <div key={m.mode}>· {m.referenceText}</div>
            ))}
          </InfoNotice>

          <form
            onSubmit={onSubmit}
            className="space-y-5 rounded-xl border border-slate-800 bg-slate-900/60 p-5"
          >
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                选择制造项目 / 部门兑换项
              </label>
              <div className="flex flex-wrap gap-2">
                {config.modes.map((m) => (
                  <button
                    key={m.mode}
                    type="button"
                    onClick={() => onModeChange(m.mode)}
                    className={
                      'rounded-md border px-4 py-2 text-sm ' +
                      (mode === m.mode
                        ? 'border-brand bg-brand/15 text-brand'
                        : 'border-slate-700 text-slate-200 hover:border-brand/60')
                    }
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-slate-300">
                  {current?.quantityLabel ?? '每日数量'}
                  {current ? `（${current.unitName}/天）` : ''}
                </label>
                <input
                  type="number"
                  min={0}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-brand"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-slate-300">
                  {current?.unitPriceLabel ?? '按当前均价估算（哈夫币）'}
                </label>
                <input
                  type="number"
                  min={0}
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-brand"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-slate-950 hover:bg-brand-dark disabled:opacity-50"
            >
              {submitting ? '估算中…' : '开始估算'}
            </button>
          </form>

          {result && (
            <section className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <div className="text-sm text-slate-400">
                {result.label} · 每日收益估算
              </div>
              <div className="text-3xl font-bold text-emerald-400">
                {formatNumber(result.dailyIncome)} 哈夫币
              </div>
              <div className="text-sm text-slate-300">
                约 {formatHfb(result.dailyIncome)}哈夫币 / 天
              </div>
              <div className="text-xs text-slate-500">
                计算式：{result.quantityPerDay} × {formatNumber(result.unitPrice)}
                {' = '}
                {formatNumber(result.dailyIncome)}
              </div>
              <div
                className={
                  'text-sm ' +
                  (result.inReferenceRange
                    ? 'text-slate-300'
                    : 'text-amber-400')
                }
              >
                参考区间：{formatNumber(result.reference.min)} ~{' '}
                {formatNumber(result.reference.max)}（
                {result.inReferenceRange
                  ? '落在参考区间内'
                  : '超出参考区间，请核对输入'}
                ）
              </div>
              <p className="text-xs text-slate-500">{result.disclaimer}</p>
            </section>
          )}
        </>
      )}
    </div>
  );
}
