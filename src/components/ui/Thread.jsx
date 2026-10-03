import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

/**
 * THE LOGIC THREAD
 * A thin orange path that always explains direction/relationship
 * (Requirement -> Logic -> Decision -> Flow -> Interface -> Impact).
 */

/** Animated SVG path that draws itself when scrolled into view. */
export function ThreadPath({
  d,
  viewBox = '0 0 100 100',
  className = '',
  stroke = '#FF7A1A',
  strokeWidth = 1.5,
  duration = 1.2,
  delay = 0,
  dashed = false,
  nodes = [], // [{ x, y, r?, delay? }]
  arrow = false,
  preserveAspectRatio = 'none',
  once = true,
}) {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      className={className}
      viewBox={viewBox}
      fill="none"
      preserveAspectRatio={preserveAspectRatio}
      aria-hidden="true"
      focusable="false"
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.3 }}
    >
      <motion.path
        d={d}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        strokeDasharray={dashed ? '4 6' : undefined}
        variants={{
          hidden: { pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0.2 },
          show: { pathLength: 1, opacity: 1, transition: { duration: reduce ? 0 : duration, delay, ease: [0.22, 1, 0.36, 1] } },
        }}
      />
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.r || 2.4}
          fill={n.hollow ? 'none' : stroke}
          stroke={stroke}
          strokeWidth={n.hollow ? 1.5 : 0}
          vectorEffect="non-scaling-stroke"
          variants={{
            hidden: { opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.4 },
            show: { opacity: 1, scale: 1, transition: { duration: reduce ? 0 : 0.4, delay: delay + (n.delay ?? duration * 0.8), ease: [0.22, 1, 0.36, 1] } },
          }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
      ))}
      {arrow && null}
    </motion.svg>
  );
}

/** A node dot to place on a timeline/diagram (HTML, not SVG). */
export function ThreadNode({ active = false, hollow = false, size = 14, className = '' }) {
  return (
    <span
      className={`inline-block rounded-full flex-shrink-0 ${hollow ? 'border-2 border-[#FF7A1A] bg-transparent' : 'bg-[#FF7A1A]'} ${active ? 'ring-4 ring-[#FF7A1A]/25' : ''} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}

const RAIL = [
  { id: 'home', n: '00', vi: 'Giới thiệu', en: 'Intro' },
  { id: 'about', n: '01', vi: 'BA → UX', en: 'BA → UX' },
  { id: 'services', n: '02', vi: 'Kỹ năng', en: 'Skills' },
  { id: 'journey', n: '03', vi: 'Hành trình', en: 'Journey' },
  { id: 'portfolio', n: '04', vi: 'Dự án', en: 'Projects' },
  { id: 'earlier-work', n: '05', vi: 'Kinh nghiệm BA', en: 'BA work' },
  { id: 'process', n: '06', vi: 'Quy trình', en: 'Process' },
  { id: 'contact', n: '07', vi: 'Liên hệ', en: 'Contact' },
];

/**
 * Global thread rail (desktop): the line fills with page progress and
 * each chapter is a node on the path. Hidden on small screens.
 */
export function ThreadRail({ hidden = false }) {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const [pos, setPos] = useState([]);
  const [active, setActive] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const measure = () => {
      const doc = document.documentElement;
      const total = Math.max(1, doc.scrollHeight - window.innerHeight);
      setPos(
        RAIL.map((r) => {
          const el = document.getElementById(r.id);
          if (!el) return 0;
          return Math.min(1, Math.max(0, el.offsetTop / total));
        })
      );
    };
    measure();
    const t = setTimeout(measure, 800);
    window.addEventListener('resize', measure);
    return () => { clearTimeout(t); window.removeEventListener('resize', measure); };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.4;
      let idx = 0;
      RAIL.forEach((r, i) => {
        const el = document.getElementById(r.id);
        if (el && el.offsetTop <= y) idx = i;
      });
      setActive(idx);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (hidden) return null;
  const go = (id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <nav
      ref={ref}
      aria-label={language === 'vi' ? 'Tiến trình trang' : 'Page progress'}
      className="hidden min-[1500px]:block fixed left-4 top-1/2 -translate-y-1/2 z-30"
    >
      <div className="relative h-[52vh] min-h-[320px] w-10 rounded-full bg-[#061826]/80 backdrop-blur-sm border border-white/10">
        <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px bg-white/15" />
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-4 w-px bg-[#FF7A1A] origin-top"
          style={{ bottom: 16, scaleY: reduce ? scrollYProgress : fill }}
        />
        {RAIL.map((r, i) => {
          const top = 16 + (pos[i] ?? i / (RAIL.length - 1)) * (100 - 0);
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => go(r.id)}
              aria-label={`${r.n} ${language === 'vi' ? r.vi : r.en}`}
              aria-current={i === active ? 'true' : undefined}
              className="group absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center cursor-pointer"
              style={{ top: `calc(16px + (100% - 32px) * ${pos[i] ?? i / (RAIL.length - 1)})` }}
            >
              <span className={`block rounded-full transition-all ${i === active ? 'w-3 h-3 bg-[#FF7A1A] ring-4 ring-[#FF7A1A]/30' : 'w-2 h-2 bg-white/50 group-hover:bg-white'}`} />
              <span className="pointer-events-none absolute left-9 whitespace-nowrap rounded-md bg-[#061826] border border-white/10 px-2 py-1 text-[12px] font-semibold text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                <span className="tabular-nums text-[#FF7A1A] mr-1.5">{r.n}</span>
                {language === 'vi' ? r.vi : r.en}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
