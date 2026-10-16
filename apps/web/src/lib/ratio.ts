/**
 * 比例换算工具。
 *
 * 约定："1:35" 表示 1 元人民币 ≈ 35 万哈夫币。
 * 因此：人民币 = 哈夫币数量 / (第二段数字 × 10000)。
 * 例如 1 亿哈夫币按 1:35 换算 ≈ 100000000 / 350000 ≈ 285.71 元。
 */

/** 取出比例第二段数字（单位：万哈夫币 / 元），如 "1:35" -> 35 */
export function parseRatioToWan(ratio: string): number | null {
  if (!ratio) return null;
  const m = ratio.match(/(\d+(?:\.\d+)?)\s*[:：]\s*(\d+(?:\.\d+)?)/);
  if (!m) return null;
  const wan = Number(m[2]);
  return Number.isFinite(wan) && wan > 0 ? wan : null;
}

/** 哈夫币 -> 人民币 */
export function hfbToRmb(hfb: number, ratio: string): number | null {
  const wan = parseRatioToWan(ratio);
  if (wan === null || !Number.isFinite(hfb)) return null;
  return hfb / (wan * 10_000);
}
