import { useEffect } from 'react';

const IDS = ['home', 'about', 'services', 'journey', 'portfolio', 'earlier-work', 'process', 'contact'];
const MEDIA = '(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

/**
 * Desktop "slide" scrolling: one wheel gesture advances to the next chapter.
 * - Sections taller than the viewport scroll normally until their edge, then advance.
 * - Disabled on touch / small screens / reduced motion, while a modal is open,
 *   and for gestures inside nested scrollers or with ctrl (zoom).
 */
export default function useSlideScroll(disabled = false) {
  useEffect(() => {
    if (disabled) return undefined;
    const mq = window.matchMedia(MEDIA);
    let lockedUntil = 0;
    let lastWheel = 0;

    const slides = () => {
      const els = IDS.map((id) => document.getElementById(id)).filter(Boolean);
      const footer = document.querySelector('footer');
      if (footer) els.push(footer);
      return els.map((el) => {
        const r = el.getBoundingClientRect();
        return { top: r.top + window.scrollY, bottom: r.bottom + window.scrollY, isFooter: el === footer };
      });
    };

    const hasScrollableAncestor = (el) => {
      let p = el;
      while (p && p !== document.body && p !== document.documentElement) {
        const oy = getComputedStyle(p).overflowY;
        if ((oy === 'auto' || oy === 'scroll') && p.scrollHeight > p.clientHeight + 1) return true;
        p = p.parentElement;
      }
      return false;
    };

    const onWheel = (e) => {
      if (!mq.matches || e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY) || Math.abs(e.deltaY) < 4) return;
      if (hasScrollableAncestor(e.target)) return;

      const now = performance.now();
      const gap = now - lastWheel;
      lastWheel = now;
      if (now < lockedUntil) { e.preventDefault(); return; }
      // Ignore momentum events that continue right after a jump
      if (gap < 90 && lockedUntil && now - lockedUntil < 400) { e.preventDefault(); return; }

      const list = slides();
      if (!list.length) return;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const maxY = document.documentElement.scrollHeight - vh;
      const down = e.deltaY > 0;

      // current slide = last one whose top is at/above the viewport top (+tolerance)
      let idx = 0;
      list.forEach((s, i) => { if (s.top <= y + 12) idx = i; });
      const cur = list[idx];

      const go = (top) => {
        e.preventDefault();
        lockedUntil = now + 800;
        window.scrollTo({ top: Math.max(0, Math.min(top, maxY)), behavior: 'smooth' });
      };

      if (down) {
        if (cur.bottom > y + vh + 10) return; // more content below inside this slide: native scroll
        const next = list[idx + 1];
        if (next) go(next.top);
        else if (y < maxY - 2) go(maxY);
      } else {
        const tall = cur.bottom - cur.top > vh * 1.15;
        if (tall && y > cur.top + 10) return; // still inside a tall slide: native scroll up
        if (y > cur.top + 10) { go(cur.top); return; } // slightly below slide start: align it
        const prev = list[idx - 1];
        if (!prev) return;
        const prevTall = prev.bottom - prev.top > vh * 1.15;
        go(prevTall ? prev.bottom - vh : prev.top);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [disabled]);
}
