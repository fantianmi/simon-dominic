import type { ReactNode } from 'react';

/** 风险提示（红色） */
export function RiskNotice({
  children,
  title = '风险提示',
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
      <div className="font-semibold text-red-300">⚠ {title}</div>
      <div className="mt-1 leading-relaxed">{children}</div>
    </div>
  );
}

/** 普通说明（蓝色） */
export function InfoNotice({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <div className="rounded-lg border border-sky-500/30 bg-sky-500/10 p-4 text-sm text-sky-100">
      {title && <div className="font-semibold text-sky-300">{title}</div>}
      <div className={title ? 'mt-1 leading-relaxed' : 'leading-relaxed'}>
        {children}
      </div>
    </div>
  );
}
