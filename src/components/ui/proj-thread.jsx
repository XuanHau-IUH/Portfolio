import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

/**
 * Project LOGIC THREAD.
 * Measures anchor points inside `containerRef` and draws an orange path that guides the eye
 * from one project to the next, drawing itself with scroll progress.
 *
 * Desktop (>=1024): anchors are `[data-proj-anchor="l|r|t|b"]` elements placed on card edges, in DOM order
 *   (in, out, in, out, ...). The path runs start -> card1.in, card1.out -> card2.in, ... -> end;
 *   segments inside a card are skipped (the card itself is the "node").
 * Smaller screens: a simplified vertical line on the left with a node at every `[data-proj-card]`.
 * The end point is `[data-proj-end]` (top centre) and is drawn as an OPEN (hollow) node.
 */

const DIR = { l: [-1, 0], r: [1, 0], t: [0, -1], b: [0, 1] };

function relPos(el, root) {
  let x = 0;
  let y = 0;
  let n = el;
  while (n && n !== root) {
    x += n.offsetLeft;
    y += n.offsetTop;
    n = n.offsetParent;
  }
  return { x, y };
}

function bezierLen(a, c1, c2, b) {
  let len = 0;
  let px = a.x;
  let py = a.y;
  for (let i = 1; i <= 24; i++) {
    const t = i / 24;
    const u = 1 - t;
    const x = u * u * u * a.x + 3 * u * u * t * c1.x + 3 * u * t * t * c2.x + t * t * t * b.x;
    const y = u * u * u * a.y + 3 * u * u * t * c1.y + 3 * u * t * t * c2.y + t * t * t * b.y;
    len += Math.hypot(x - px, y - py);
    px = x;
    py = y;
  }
  return len;
}

function build(root) {
  const w = root.offsetWidth;
  const h = root.offsetHeight;
  const desktop = window.innerWidth >= 1024;
  const endEl = root.querySelector('[data-proj-end]');
  const endPos = endEl ? relPos(endEl, root) : null;
  const end = endPos ? { x: endPos.x + endEl.offsetWidth / 2, y: endPos.y, dir: 't' } : null;

  if (!desktop) {
    const x = 7;
    const cards = [...root.querySelectorAll('[data-proj-card]')].map((c) => ({ x, y: relPos(c, root).y + 34 }));
    if (!cards.length) return null;
    const last = end ? end.y - 20 : cards[cards.length - 1].y + 80;
    const d = `M ${x} 0 L ${x} ${last}`;
    const nodes = cards.map((p) => ({ ...p, f: p.y / last }));
    nodes.push({ x, y: last, f: 1, open: true });
    return { w, h, d, nodes };
  }

  const anchors = [...root.querySelectorAll('[data-proj-anchor]')].map((a) => {
    const p = relPos(a, root);
    return { x: p.x + a.offsetWidth / 2, y: p.y + a.offsetHeight / 2, dir: a.dataset.projAnchor };
  });
  if (!anchors.length) return null;

  const start = { x: window.innerWidth >= 1280 ? -22 : -12, y: -36, dir: 'b' };
  // pairs: [start, in1], [out1, in2], ..., [outN, end]
  const pts = [start, ...anchors];
  if (end) pts.push(end);
  else pts.push({ x: anchors[anchors.length - 1].x, y: anchors[anchors.length - 1].y + 90, dir: 't' });

  let d = '';
  let total = 0;
  const nodes = [];
  for (let i = 0; i + 1 < pts.length; i += 2) {
    const a = pts[i];
    const b = pts[i + 1];
    const dist = Math.hypot(b.x - a.x, b.y - a.y);
    const k = Math.min(160, Math.max(30, dist * 0.45));
    const da = DIR[a.dir] || [0, 1];
    const db = DIR[b.dir] || [0, -1];
    const c1 = { x: a.x + da[0] * k, y: a.y + da[1] * k };
    const c2 = { x: b.x + db[0] * k, y: b.y + db[1] * k };
    d += `M ${a.x} ${a.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${b.x} ${b.y} `;
    if (i > 0) nodes.push({ x: a.x, y: a.y, len: total });
    total += bezierLen(a, c1, c2, b);
    nodes.push({ x: b.x, y: b.y, len: total, open: i + 2 >= pts.length });
  }
  nodes.unshift({ x: start.x, y: start.y, len: 0, small: true });
  return { w, h, d, nodes: nodes.map((n) => ({ ...n, f: total ? n.len / total : 0 })) };
}

function Node({ n, progress, dark }) {
  const f = Math.min(0.999, Math.max(0, n.f));
  const o = useTransform(progress, [Math.max(0, f - 0.04), f + 0.001], [0, 1]);
  const fill = dark ? '#061826' : '#F6F1E8';
  return (
    <motion.g style={{ opacity: o }}>
      {!n.small && <circle cx={n.x} cy={n.y} r={11} fill="#FF7A1A" opacity={0.16} />}
      <circle
        cx={n.x}
        cy={n.y}
        r={n.small ? 3 : 5}
        fill={n.open ? fill : '#FF7A1A'}
        stroke="#FF7A1A"
        strokeWidth={n.open ? 1.5 : 0}
      />
    </motion.g>
  );
}

export default function ProjThread({ containerRef, deps = [], dark = true }) {
  const reduce = useReducedMotion();
  const [geo, setGeo] = useState(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 0.75', 'end 0.85'] });
  const spring = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 });
  const one = useMotionValue(1);
  const progress = reduce ? one : spring;

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;
    let raf = 0;
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setGeo(build(root)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    window.addEventListener('resize', measure);
    document.fonts?.ready?.then(measure);
    const t = setTimeout(measure, 700);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  if (!geo) return null;
  const box = { position: 'absolute', left: 0, top: 0, width: geo.w, height: geo.h, overflow: 'visible', pointerEvents: 'none' };
  return (
    <>
      {/* Path runs BEHIND the cards (z-0) so it threads between them */}
      <svg style={{ ...box, zIndex: 0 }} viewBox={`0 0 ${geo.w} ${geo.h}`} aria-hidden="true" focusable="false">
        <path d={geo.d} fill="none" stroke={dark ? 'rgba(255,255,255,0.14)' : 'rgba(6,24,38,0.16)'} strokeWidth="1" strokeDasharray="3 6" />
        <motion.path
          d={geo.d}
          fill="none"
          stroke="#FF7A1A"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ pathLength: progress }}
        />
      </svg>
      {/* Nodes sit ON TOP of card edges */}
      <svg style={{ ...box, zIndex: 30 }} viewBox={`0 0 ${geo.w} ${geo.h}`} aria-hidden="true" focusable="false">
        {geo.nodes.map((n, i) => (
          <Node key={`${i}-${Math.round(n.x)}-${Math.round(n.y)}`} n={n} progress={progress} dark={dark} />
        ))}
      </svg>
    </>
  );
}
