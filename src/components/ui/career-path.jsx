import React, { useLayoutEffect, useState } from 'react';

/** Width of an element in px (ResizeObserver). */
export function useWidth(ref) {
  const [w, setW] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const m = () => setW(Math.round(el.getBoundingClientRect().width));
    m();
    const ro = new ResizeObserver(m);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return w;
}

/**
 * Career path geometry + node shapes.
 * Node x positions are % of the band width; the SVG is drawn in measured px
 * (pathLength draw-in breaks with non-scaling strokes), so HTML nodes placed
 * with left:% / top:px sit exactly on the curve.
 */

export const BAND = 150;
export const Y_HIGH = 30;
export const Y_LOW = 120;

const lerp = (a, b, t) => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });

/** Horizontal-tangent cubic between two points, as control points. */
function cubic(a, b) {
  const mx = (a.x + b.x) / 2;
  return [a, { x: mx, y: a.y }, { x: mx, y: b.y }, b];
}

/** Split a cubic at t (de Casteljau). */
function split([p0, p1, p2, p3], t) {
  const p01 = lerp(p0, p1, t), p12 = lerp(p1, p2, t), p23 = lerp(p2, p3, t);
  const p012 = lerp(p01, p12, t), p123 = lerp(p12, p23, t);
  const m = lerp(p012, p123, t);
  return [[p0, p01, p012, m], [m, p123, p23, p3]];
}

const c = (q) => ` C ${q[1].x} ${q[1].y} ${q[2].x} ${q[2].y} ${q[3].x} ${q[3].y}`;

/**
 * points: [{x,y}] node centres in order. shiftAfter: index of the node after
 * which the BA -> UX shift happens (midpoint of that segment).
 */
export function buildCareerPath(points, shiftAfter) {
  const curves = points.slice(1).map((p, i) => cubic(points[i], p));
  const [before, after] = split(curves[shiftAfter], 0.5);
  let a = `M 0 ${points[0].y} L ${points[0].x} ${points[0].y}`;
  curves.slice(0, shiftAfter).forEach((q) => { a += c(q); });
  a += c(before);
  let b = `M ${after[0].x} ${after[0].y}` + c(after);
  curves.slice(shiftAfter + 1).forEach((q) => { b += c(q); });
  return { before: a, after: b, shift: after[0] };
}

/** Node treatments: technical start / BA diamond / UI-UX current circle. */
export function CareerNode({ kind, size = 'md' }) {
  if (kind === 'tech') {
    return (
      <span className="relative block w-[18px] h-[18px] rounded-full border-2 border-[#12304A] bg-paper" aria-hidden="true">
        <span className="absolute inset-[4px] rounded-full bg-[#12304A]" />
      </span>
    );
  }
  if (kind === 'ba') {
    return (
      <span className="block w-[18px] h-[18px] flex items-center justify-center" aria-hidden="true">
        <span className="block w-[13px] h-[13px] rotate-45 bg-[#12304A] ring-[3px] ring-paper outline outline-1 outline-[#12304A]/40" />
      </span>
    );
  }
  const big = size === 'lg';
  return (
    <span
      className={`block rounded-full bg-[#FF7A1A] ring-[6px] ring-[#FF7A1A]/20 ${big ? 'w-[26px] h-[26px]' : 'w-[18px] h-[18px]'}`}
      aria-hidden="true"
    >
      <span className={`block rounded-full bg-paper mx-auto ${big ? 'w-[8px] h-[8px] mt-[9px]' : 'w-[6px] h-[6px] mt-[6px]'}`} />
    </span>
  );
}
