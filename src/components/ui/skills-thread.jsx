import React, { useLayoutEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Capability-map thread (desktop only).
 * Measures HTML anchor nodes inside a container and routes the orange logic
 * thread through them: lead-in -> BA -> Product & UX -> UI -> (right edge, down)
 * -> Delivery. A dashed blue branch links Tools to Delivery.
 */

function centerOf(el, box) {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
}

export function useSkillsGeometry(containerRef, anchorRefs) {
  const [geo, setGeo] = useState(null);
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;
    const measure = () => {
      const box = el.getBoundingClientRect();
      if (!box.width) return;
      const pts = {};
      for (const k of Object.keys(anchorRefs)) {
        const a = anchorRefs[k].current;
        if (!a || a.offsetParent === null) { setGeo(null); return; }
        pts[k] = centerOf(a, box);
      }
      setGeo((prev) => {
        const next = { w: Math.round(box.width), h: Math.round(box.height), pts };
        if (prev && JSON.stringify(prev) === JSON.stringify(next)) return prev;
        return next;
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure).catch(() => {});
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return geo;
}

const dist = (a, b) => Math.hypot(b.x - a.x, b.y - a.y);

/** Builds the main path and the arrival fraction (0..1) for each node. */
export function buildSkillsPath(geo) {
  const { w, pts } = geo;
  const { ba, ux, ui, del } = pts;
  const r = 18;
  const edge = w - 0.5;
  const start = { x: 0, y: ba.y };
  const segs = [];
  let d = `M ${start.x} ${start.y} L ${ba.x} ${ba.y}`;
  segs.push(['ba', dist(start, ba)]);
  const curve = (a, b) => {
    const mx = (a.x + b.x) / 2;
    d += ` C ${mx} ${a.y} ${mx} ${b.y} ${b.x} ${b.y}`;
    return dist(a, b) * 1.06;
  };
  segs.push(['ux', curve(ba, ux)]);
  segs.push(['ui', curve(ux, ui)]);
  // UI -> right edge -> down -> left to Delivery
  d += ` L ${edge - r} ${ui.y} Q ${edge} ${ui.y} ${edge} ${ui.y + r}`;
  d += ` L ${edge} ${del.y - r} Q ${edge} ${del.y} ${edge - r} ${del.y} L ${del.x} ${del.y}`;
  segs.push(['del', (edge - ui.x) + (del.y - ui.y) + (edge - del.x)]);
  const total = segs.reduce((s, [, l]) => s + l, 0);
  const at = {};
  let acc = 0;
  segs.forEach(([k, l]) => { acc += l; at[k] = acc / total; });
  return { d, at };
}

export function SkillsThreadOverlay({ geo, inView, duration = 2.4 }) {
  const reduce = useReducedMotion();
  if (!geo) return null;
  const { d } = buildSkillsPath(geo);
  const { tools, del } = geo.pts;
  const show = reduce || inView;
  return (
    <svg
      className="hidden lg:block absolute inset-0 pointer-events-none overflow-visible z-[1]"
      width={geo.w}
      height={geo.h}
      viewBox={`0 0 ${geo.w} ${geo.h}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* faint full route so the structure reads before the draw-in */}
      <path d={d} stroke="rgba(255,122,26,0.16)" strokeWidth="1" />
      <motion.path
        d={d}
        stroke="#FF7A1A"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={{ pathLength: show ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : duration, ease: 'linear' }}
      />
      {/* supporting branch: tools feed delivery */}
      <motion.line
        x1={del.x}
        y1={del.y}
        x2={tools.x}
        y2={tools.y}
        stroke="#78A9D4"
        strokeWidth="1.25"
        strokeDasharray="4 6"
        initial={{ opacity: reduce ? 1 : 0 }}
        animate={{ opacity: show ? 0.9 : 0 }}
        transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : duration }}
      />
    </svg>
  );
}
