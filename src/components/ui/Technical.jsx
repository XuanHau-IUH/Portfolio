import React from 'react';

/** Corner crop marks (blueprint feel). Decorative. */
export function CropMarks({ className = '', tone = 'dark', size = 14 }) {
  const c = tone === 'dark' ? 'rgba(255,255,255,0.28)' : 'rgba(6,24,38,0.28)';
  const s = { position: 'absolute', width: size, height: size, borderColor: c };
  return (
    <span className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <span style={{ ...s, top: 0, left: 0, borderTop: '1px solid', borderLeft: '1px solid' }} />
      <span style={{ ...s, top: 0, right: 0, borderTop: '1px solid', borderRight: '1px solid' }} />
      <span style={{ ...s, bottom: 0, left: 0, borderBottom: '1px solid', borderLeft: '1px solid' }} />
      <span style={{ ...s, bottom: 0, right: 0, borderBottom: '1px solid', borderRight: '1px solid' }} />
    </span>
  );
}

/** Small technical caption: "A1 / 01 — LABEL". Abstract grid coordinate, not a location. */
export function CoordLabel({ children, className = '', tone = 'dark' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.14em] font-semibold uppercase tabular-nums ${tone === 'dark' ? 'text-white/45' : 'text-[#061826]/45'} ${className}`}
      aria-hidden="true"
    >
      <span className="inline-block w-3 h-px bg-current opacity-70" />
      {children}
    </span>
  );
}

/** Cross-hair marking a grid intersection. */
export function Crosshair({ className = '', tone = 'dark' }) {
  const c = tone === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(6,24,38,0.3)';
  return (
    <svg className={className} width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true" focusable="false">
      <path d="M8.5 0v17M0 8.5h17" stroke={c} strokeWidth="1" />
      <circle cx="8.5" cy="8.5" r="2.5" stroke="#FF7A1A" strokeWidth="1" />
    </svg>
  );
}

/** NXH monogram (typographic mark). */
export function Monogram({ className = '', tone = 'dark' }) {
  return (
    <span className={`inline-flex items-baseline font-display font-extrabold tracking-tight ${tone === 'dark' ? 'text-white' : 'text-[#061826]'} ${className}`} aria-label="NXH">
      N<span className="text-[#FF7A1A]">X</span>H
    </span>
  );
}
