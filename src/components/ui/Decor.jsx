import React from 'react';

/** Subtle orbital line graphic. Decorative only. */
export function OrbitalGraphic({ className = '', tone = 'dark' }) {
  const stroke = tone === 'dark' ? 'rgba(255,255,255,0.14)' : 'rgba(12,34,53,0.14)';
  const accent = '#FF7A1A';
  return (
    <svg className={className} viewBox="0 0 600 600" fill="none" aria-hidden="true" focusable="false">
      <g className="orbit-slow">
        <circle cx="300" cy="300" r="280" stroke={stroke} strokeWidth="1" />
        <circle cx="300" cy="300" r="210" stroke={stroke} strokeWidth="1" strokeDasharray="3 7" />
        <circle cx="300" cy="300" r="140" stroke={stroke} strokeWidth="1" />
        <circle cx="580" cy="300" r="5" fill={accent} />
        <circle cx="90" cy="300" r="3" fill={accent} opacity="0.7" />
      </g>
      <line x1="20" y1="300" x2="580" y2="300" stroke={stroke} strokeWidth="1" />
      <line x1="300" y1="20" x2="300" y2="580" stroke={stroke} strokeWidth="1" />
    </svg>
  );
}

/** Handwritten annotation (Caveat). Keep short. */
export function HandNote({ children, className = '', tone = 'light' }) {
  return (
    <span className={`font-hand text-[22px] leading-[1.1] -rotate-3 inline-block ${tone === 'dark' ? 'text-[#FF7A1A]' : 'text-[#E8680A]'} ${className}`}>
      {children}
    </span>
  );
}
