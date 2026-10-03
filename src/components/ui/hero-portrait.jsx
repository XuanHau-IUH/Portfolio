import React, { forwardRef } from 'react';
import { User } from 'lucide-react';
import Bi from '../Bi';
import { CoordLabel, Crosshair } from './Technical';

// Tall arch: full round top, softly squared base.
const ARCH = 'rounded-t-[999px] rounded-b-[28px]';

/** Vertical measurement ruler (decorative). */
function Ruler({ className = '' }) {
  const ticks = Array.from({ length: 11 }, (_, i) => i);
  return (
    <svg className={className} width="22" height="100%" viewBox="0 0 22 100" preserveAspectRatio="none" fill="none" aria-hidden="true" focusable="false">
      <line x1="16" y1="0" x2="16" y2="100" stroke="rgba(255,255,255,0.22)" vectorEffect="non-scaling-stroke" />
      {ticks.map((i) => (
        <line key={i} x1={i % 5 === 0 ? 6 : 11} y1={i * 10} x2="16" y2={i * 10} stroke={i === 5 ? '#FF7A1A' : 'rgba(255,255,255,0.32)'} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}

/**
 * Portrait in an architectural arch with an offset outline, a layered crop,
 * a restrained glow and blueprint annotations. `ref` points at the arch box
 * (used by the logic thread to land on its edge).
 */
const HeroPortrait = forwardRef(function HeroPortrait({ src, alt }, ref) {
  return (
    <div className="relative w-full">
      {/* Restrained glow, low and to the right */}
      <div
        className="absolute -right-10 bottom-[6%] w-[70%] h-[45%] rounded-full bg-[#FF7A1A] opacity-[0.16] blur-[70px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Layered crop: a desaturated slice of the same photo peeking out behind the arch */}
      <div
        className="absolute -left-[22%] top-[12%] w-[46%] h-[30%] overflow-hidden rounded-[6px] border border-white/10 hidden sm:block"
        aria-hidden="true"
      >
        <img src={src} alt="" loading="lazy" className="w-full h-full object-cover object-[50%_70%] grayscale opacity-30" />
        <div className="absolute inset-0 bg-[#0B2235]/50 mix-blend-multiply" />
        <span className="absolute bottom-1.5 left-2 text-[10px] tracking-[0.14em] font-semibold text-white/55">CROP · 02</span>
      </div>

      {/* Apex axis + crosshair */}
      <div className="absolute left-1/2 -top-12 -translate-x-1/2 flex flex-col items-center pointer-events-none" aria-hidden="true">
        <Crosshair tone="dark" />
        <span className="block w-px h-8 border-l border-dashed border-white/25" />
      </div>
      <CoordLabel tone="dark" className="absolute -top-10 right-0 hidden sm:inline-flex">A0 / 00</CoordLabel>

      {/* Offset outline (same arch, shifted) */}
      <div className={`absolute inset-0 translate-x-[18px] translate-y-[18px] ${ARCH} border border-[#FF7A1A]/50 pointer-events-none`} aria-hidden="true" />

      {/* The arch */}
      <div
        ref={ref}
        className={`relative ${ARCH} overflow-hidden aspect-[10/13] bg-ink-2 border border-white/15 shadow-[0_50px_90px_-40px_rgba(0,0,0,0.85),0_18px_40px_-24px_rgba(0,0,0,0.6)]`}
      >
        <img
          src={src}
          alt={alt}
          fetchpriority="high"
          className="absolute inset-0 w-full h-full object-cover object-[50%_18%] scale-[1.04]"
        />
        {/* Inner depth: navy wash from the base, hairline inner frame */}
        <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-[#061826]/75 to-transparent" aria-hidden="true" />
        <div className={`absolute inset-[10px] ${ARCH} border border-white/25 pointer-events-none`} aria-hidden="true" />
      </div>

      {/* Ruler on the right edge */}
      <Ruler className="absolute -right-9 top-[22%] h-[56%] hidden sm:block" />
      <span className="absolute -right-9 top-[calc(22%-22px)] text-[10px] tracking-[0.14em] font-semibold text-white/55 hidden sm:block" aria-hidden="true">H</span>

      {/* Width dimension under the arch */}
      <div className="absolute left-0 right-0 -bottom-9 hidden sm:flex items-center gap-2 pointer-events-none" aria-hidden="true">
        <span className="w-px h-3 bg-white/35" />
        <span className="w-8 h-px bg-white/20" />
        <span className="text-[10px] tracking-[0.16em] font-semibold text-white/55 whitespace-nowrap">BA → UX</span>
        <span className="flex-1 h-px bg-white/20" />
        <span className="w-px h-3 bg-white/35" />
      </div>

      {/* Badge, partially overlapping the arch edge */}
      <div className="absolute bottom-[9%] -left-4 sm:-left-12 z-20 bg-ink-2/95 backdrop-blur-sm text-white pl-3 pr-4 py-2.5 rounded-xl border border-white/15 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.8)] flex items-center gap-3 max-w-[calc(100%+8px)]">
        <div className="w-9 h-9 rounded-lg bg-[#FF7A1A] text-white flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4" aria-hidden="true" />
        </div>
        <div className="text-left min-w-0">
          <div className="text-[15px] leading-[20px] font-bold text-white">
            <Bi vi="Tư duy sản phẩm" en="Product Thinker" />
          </div>
          <div className="text-[14px] leading-[20px] text-white/75">
            <Bi vi="Thiết kế lấy người dùng làm trung tâm" en="User-Centered Designer" />
          </div>
        </div>
      </div>
    </div>
  );
});

export default HeroPortrait;
