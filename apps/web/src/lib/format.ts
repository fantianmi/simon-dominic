/** 千分位整数 */
export function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return '-';
  return new Intl.NumberFormat('zh-CN').format(Math.round(n));
}

/** 哈夫币数量格式化：自动使用“亿 / 万” */
export function formatHfb(n: number): string {
  if (!Number.isFinite(n)) return '-';
  const abs = Math.abs(n);
  if (abs >= 1e8) return `${(n / 1e8).toFixed(2)} 亿`;
  if (abs >= 1e4) return `${(n / 1e4).toFixed(1)} 万`;
  return formatNumber(n);
}

/** 人民币格式化 */
export function formatRmb(n: number): string {
  if (!Number.isFinite(n)) return '-';
  return `¥ ${n.toFixed(2)}`;
}
