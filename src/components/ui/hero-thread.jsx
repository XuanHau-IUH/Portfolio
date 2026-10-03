import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/** Position of `el` inside `root` using offset* (ignores CSS transforms, so entrance animations don't skew it). */
function offsetWithin(el, root) {
  let x = 0;
  let y = 0;
  let n = el;
  while (n && n !== root) {
    x += n.offsetLeft;
    y += n.offsetTop;
    n = n.offsetParent;
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}

/**
 * Hero logic thread (desktop): measured SVG path that starts under the statement,
 * travels across the gap and lands on the portrait arch, then leaves the hero
 * as a short stub toward the next chapter.
 */
export default function HeroThread({ rootRef, startRef, endRef, delay = 1.25 }) {
  const reduce = useReducedMotion();
  const [geo, setGeo] = useState(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const measure = () => {
      const s = startRef.current;
      const e = endRef.current;
      if (!s || !e || !s.offsetParent || !e.offsetParent) { setGeo(null); return; }
      const a = offsetWithin(s, root);
      const b = offsetWithin(e, root);
      setGeo({ W: root.offsetWidth, H: root.offsetHeight, a, b });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => {});
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, [rootRef, startRef, endRef]);

  if (!geo) return null;
  const { W, H, a, b } = geo;

  // Start: left end of the underline below the statement.
  const sx = a.x;
  const sy = a.y + a.h + 14;
  // Run under the statement, then curve to the arch's left edge (~58% down).
  const runX = a.x + a.w;
  const ex = b.x;
  const ey = b.y + b.h * 0.62;
  const midX = runX + (ex - runX) * 0.55;
  const main = `M ${sx} ${sy} H ${runX} C ${midX} ${sy}, ${midX} ${ey}, ${ex} ${ey}`;
  // Stub: from the arch base straight down, out of the hero.
  const bx = b.x + b.w * 0.5;
  const by = b.y + b.h;
  const stub = `M ${bx} ${by + 26} V ${H}`;

  const draw = (d, dur, dl) =>
    reduce
      ? {}
      : { initial: { pathLength: 0, opacity: 0 }, animate: { pathLength: 1, opacity: 1 }, transition: { pathLength: { duration: dur, delay: dl, ease: EASE }, opacity: { duration: 0.2, delay: dl } } };
  const pop = (dl) =>
    reduce
      ? {}
      : { initial: { opacity: 0, scale: 0.4 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.4, delay: dl, ease: EASE } };

  return (
    <svg
      className="absolute inset-0 pointer-events-none hidden lg:block z-[5]"
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="hero-stub-fade" x1="0" y1={by} x2="0" y2={H} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF7A1A" />
          <stop offset="1" stopColor="#FF7A1A" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <motion.path d={main} stroke="#FF7A1A" strokeWidth="1.5" strokeLinecap="round" {...draw(main, 1.2, delay)} />
      <motion.path d={stub} stroke="url(#hero-stub-fade)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 0" {...draw(stub, 0.7, delay + 1.25)} />

      {/* Start node (BA) */}
      <motion.g {...pop(delay)} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
        <circle cx={sx} cy={sy} r="4" fill="#FF7A1A" />
        <circle cx={sx} cy={sy} r="9" stroke="#FF7A1A" strokeOpacity="0.35" />
      </motion.g>
      {/* End node on the arch (UX) */}
      <motion.g {...pop(delay + 1.1)} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
        <circle cx={ex} cy={ey} r="9" fill="#061826" stroke="#FF7A1A" strokeWidth="1.5" />
        <circle cx={ex} cy={ey} r="3.5" fill="#FF7A1A" />
      </motion.g>
      {/* Stub origin tick */}
      <motion.g {...pop(delay + 1.25)}>
        <path d={`M ${bx - 6} ${by + 26} H ${bx + 6}`} stroke="#FF7A1A" strokeWidth="1.5" />
      </motion.g>

      {/* Tiny technical labels */}
      <motion.g {...pop(delay + 0.2)}>
        <text x={sx + 14} y={sy + 17} fill="#94A6B8" fontSize="11" fontWeight="600" letterSpacing="1.5" fontFamily="Inter, sans-serif">BA</text>
      </motion.g>
      <motion.g {...pop(delay + 1.2)}>
        <text x={ex - 34} y={ey - 16} fill="#FF7A1A" fontSize="11" fontWeight="700" letterSpacing="1.5" fontFamily="Inter, sans-serif">UX</text>
      </motion.g>
    </svg>
  );
}
