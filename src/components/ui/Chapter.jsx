import React from 'react';
import { CoordLabel, Crosshair } from './Technical';

/**
 * Presentation-style chapter. On desktop it fills at least one viewport (svh) and
 * vertically centres its content; on mobile it flows naturally.
 * variant: 'dark' (navy) | 'light' (warm paper)
 * coord: optional technical caption in the top-right corner (e.g. "A1 / 01")
 * Decorative graphics are passed as children of the `backdrop` prop.
 */
export default function Chapter({
  id,
  number,
  variant = 'light',
  coord,
  backdrop = null,
  className = '',
  innerClassName = '',
  children,
  labelledBy,
}) {
  const dark = variant === 'dark';
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative overflow-hidden scroll-mt-16 lg:min-h-[100svh] flex ${dark ? 'bg-ink text-white' : 'bg-paper text-[#10202C]'} ${className}`}
      data-chapter={number || undefined}
      data-variant={variant}
    >
      <div className={`absolute inset-0 pointer-events-none ${dark ? 'bg-tech-grid-dark' : 'bg-tech-grid-light'} opacity-60`} aria-hidden="true" />
      <div className={`absolute inset-0 pointer-events-none bg-grain ${dark ? 'bg-grain-dark' : 'bg-grain-light'}`} aria-hidden="true" />
      {backdrop}
      {(coord || number) && (
        <div className="absolute top-24 right-6 md:right-10 hidden md:flex items-center gap-3 z-0">
          <CoordLabel tone={dark ? 'dark' : 'light'}>{coord || `${number} / 07`}</CoordLabel>
          <Crosshair tone={dark ? 'dark' : 'light'} />
        </div>
      )}
      <div className={`relative z-10 container-wide py-16 sm:py-20 lg:py-24 flex flex-col justify-center ${innerClassName}`}>
        {children}
      </div>
    </section>
  );
}

/** Numbered chapter header: "01  LABEL" + display title + optional lead. */
export function ChapterHeader({ number, label, title, accent, lead, dark = false, titleId, className = '' }) {
  return (
    <header className={`max-w-3xl text-left ${className}`}>
      <div className="flex items-center gap-3 mb-5">
        {number && (
          <span className="inline-flex items-center justify-center min-w-9 h-9 px-2 rounded-lg border border-[#FF7A1A] text-[14px] font-bold tabular-nums text-[#FF7A1A]">
            {number}
          </span>
        )}
        <span className={`typo-eyebrow ${dark ? 'text-[#94A6B8]' : 'text-[#486581]'}`}>{label}</span>
      </div>
      <h2 id={titleId} className={`typo-h1 ${dark ? 'text-[#F5F7F8]' : 'text-[#061826]'}`}>
        {title}
        {accent && <span className="block text-[#FF7A1A]">{accent}</span>}
      </h2>
      {lead && <p className={`typo-lead mt-5 max-w-[56ch] ${dark ? 'text-[#94A6B8]' : 'text-[#486581]'}`}>{lead}</p>}
    </header>
  );
}
