import { useState } from 'react';
import { api } from '../api/client';
import type { RentalIntentResult } from '../api/types';
import { InfoNotice, RiskNotice } from '../components/Notice';
import { BUSINESS_BOUNDARY } from '../lib/constants';
import { formatHfb } from '../lib/format';

const ACCOUNT_TYPES = ['纯币', '含装备'];
const SAFE_BOX_TYPES = [
  '无安全箱',
  '小型安全箱',
  '中型安全箱',
  '大型安全箱',
  '其他',
];

export default function RentalForm() {
  const [form, setForm] = useState({
    coinAmount: '',
    accountType: ACCOUNT_TYPES[0],
    specialForcesLv: '',
    safeBoxType: SAFE_BOX_TYPES[1],
    expectedRatio: '',
    contact: '',
  });
  const [result, setResult] = useState<RentalIntentResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setSubmitting(true);
    try {
      const res = await api.submitRentalIntent({
        coinAmount: Number(form.coinAmount),
        accountType: form.accountType,
        specialForcesLv: form.specialForcesLv,
        safeBoxType: form.safeBoxType,
        expectedRatio: form.expectedRatio,
        contact: form.contact,
      });
      setResult(res);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  const coinPreview = Number(form.coinAmount) || 0;

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-xl font-bold text-white">④ 出租账号 · 信息登记</h1>
        <p className="text-sm text-slate-400">
          仅登记<b className="text-slate-200">展示信息</b>
          ，提交后进入待审核状态，审核通过前不会对外展示。
        </p>
      </header>

      <InfoNotice title="我们只收集展示信息">
        本站<b>绝不收集账号密码、上号权限、二次验证信息</b>。
        请勿在任何表单中填写上述内容；联系方式仅用于后台联系，不会公开展示。
      </InfoNotice>

      <form
        onSubmit={onSubmit}
        className="space-y-5 rounded-xl border border-slate-800 bg-slate-900/60 p-5"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-slate-300">
              哈夫币总量
            </label>
            <input
              type="number"
              min={1}
              required
              value={form.coinAmount}
              onChange={(e) => update('coinAmount', e.target.value)}
              placeholder="例如 100000000"
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-brand"
            />
            {coinPreview > 0 && (
              <p className="mt-1 text-xs text-slate-500">
                约 {formatHfb(coinPreview)}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">
              纯币 / 含装备
            </label>
            <select
              value={form.accountType}
              onChange={(e) => update('accountType', e.target.value)}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-brand"
            >
              {ACCOUNT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">
              特勤处等级
            </label>
            <input
              type="text"
              required
              maxLength={50}
              value={form.specialForcesLv}
              onChange={(e) => update('specialForcesLv', e.target.value)}
              placeholder="例如 满级 / 4 级"
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">
              安全箱类型
            </label>
            <select
              value={form.safeBoxType}
              onChange={(e) => update('safeBoxType', e.target.value)}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-brand"
            >
              {SAFE_BOX_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">
              期望出租比例
            </label>
            <input
              type="text"
              required
              maxLength={30}
              value={form.expectedRatio}
              onChange={(e) => update('expectedRatio', e.target.value)}
              placeholder="例如 1:38"
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">
              联系方式（仅后台可见，不公开展示）
            </label>
            <input
              type="text"
              required
              maxLength={200}
              value={form.contact}
              onChange={(e) => update('contact', e.target.value)}
              placeholder="微信 / QQ 等"
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-brand"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-slate-950 hover:bg-brand-dark disabled:opacity-50"
        >
          {submitting ? '提交中…' : '提交出租信息'}
        </button>

        {error && <p className="text-sm text-red-400">提交失败：{error}</p>}
        {result && (
          <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-200">
            <div className="font-semibold">
              提交成功（编号 #{result.id}）
            </div>
            <div className="mt-1">
              状态：<b>{result.status}</b>（待审核）
            </div>
            <div className="mt-1 text-emerald-300/80">{result.message}</div>
          </div>
        )}

        {/* 表单下方固定风险提示 */}
        <RiskNotice title="固定风险提示">
          {BUSINESS_BOUNDARY}
          <br />
          再次提醒：本站不会索要账号密码或上号权限，任何以“验证/上号”为由索要密码的
          都是骗局。
        </RiskNotice>
      </form>
    </div>
  );
}
