import { useLayoutEffect, useState } from 'react';

/**
 * Measures the centres of a list of anchor elements relative to a container,
 * so an SVG thread can be drawn through real layout positions (no guessed %).
 * Returns { w, h, pts: [{ x, y }] } and re-measures on resize / font load.
 */
export function useAnchorPoints(containerRef, anchorRefs, deps = []) {
  const [state, setState] = useState({ w: 0, h: 0, pts: [] });

  useLayoutEffect(() => {
    const box = containerRef.current;
    if (!box) return undefined;
    let raf = 0;
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const b = box.getBoundingClientRect();
        const pts = anchorRefs.current.map((el) => {
          if (!el || el.offsetParent === null) return null;
          const r = el.getBoundingClientRect();
          return { x: r.left - b.left + r.width / 2, y: r.top - b.top + r.height / 2 };
        });
        setState((prev) => {
          const same =
            prev.w === Math.round(b.width) &&
            prev.h === Math.round(b.height) &&
            prev.pts.length === pts.length &&
            prev.pts.every((p, i) => p && pts[i] && Math.abs(p.x - pts[i].x) < 0.5 && Math.abs(p.y - pts[i].y) < 0.5);
          return same ? prev : { w: Math.round(b.width), h: Math.round(b.height), pts };
        });
      });
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    ro?.observe(box);
    window.addEventListener('resize', measure);
    document.fonts?.ready?.then(measure).catch(() => {});
    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      window.removeEventListener('resize', measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}

/** Smooth S-curve between two points with horizontal tangents (staircase wave). */
export function sCurve(a, b) {
  const mx = (a.x + b.x) / 2;
  return `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
}
