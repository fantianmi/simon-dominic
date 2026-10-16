import type {
  EstimateResult,
  PaodaoData,
  PlatformsResponse,
  RatioView,
  RentalIntentPayload,
  RentalIntentResult,
  SpecialForcesConfig,
  SpecialForcesMode,
} from './types';

// 默认走 Vite 代理（/api -> http://localhost:3001）
const BASE = import.meta.env.VITE_API_BASE ?? '/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });

  if (!res.ok) {
    let detail = `请求失败（HTTP ${res.status}）`;
    try {
      const body = (await res.json()) as { message?: string | string[] };
      if (body?.message) {
        detail = Array.isArray(body.message)
          ? body.message.join('；')
          : String(body.message);
      }
    } catch {
      // 忽略非 JSON 响应
    }
    throw new Error(detail);
  }

  return (await res.json()) as T;
}

export const api = {
  // 模块一
  getRatios: () => request<RatioView>('/ratios'),

  // 模块二
  getSpecialForcesConfig: () =>
    request<SpecialForcesConfig>('/special-forces'),
  estimateSpecialForces: (body: {
    mode: SpecialForcesMode;
    quantityPerDay?: number;
    unitPrice?: number;
  }) =>
    request<EstimateResult>('/special-forces/estimate', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  // 模块三
  getPaodao: () => request<PaodaoData>('/paodao'),

  // 模块四
  getPlatforms: () => request<PlatformsResponse>('/platforms'),
  submitRentalIntent: (body: RentalIntentPayload) =>
    request<RentalIntentResult>('/rental-intent', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
};
