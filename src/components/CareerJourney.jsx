import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { translations } from '../context/LanguageContext';
import Bi from './Bi';
import Chapter, { ChapterHeader } from './ui/Chapter';
import Reveal from './ui/Reveal';
import { CoordLabel } from './ui/Technical';
import { BAND, Y_HIGH, Y_LOW, buildCareerPath, CareerNode, useWidth } from './ui/career-path';

const EASE = [0.22, 1, 0.36, 1];
const DRAW = 2.2;

/* Desktop placement along the path (x in % of width). Kinds: technical start,
   Business Analysis roles, UI/UX current role. */
const LAYOUT = [
  { x: 3, pos: 'low', w: 40, kind: 'tech' },
  { x: 27, pos: 'high', w: 38, kind: 'ba' },
  { x: 51, pos: 'low', w: 42, kind: 'ba' },
  { x: 72, pos: 'high', w: 28, kind: 'ux' },
];
const SHIFT_AFTER = 2; // shift happens between DOTB (2) and Techera (3)
const END_X = LAYOUT[LAYOUT.length - 1].x;

const yOf = (l) => (l.pos === 'high' ? Y_HIGH : Y_LOW);
// Split at t=0.5 of a horizontal-tangent cubic lands on the x/y midpoint.
const SHIFT = {
  x: (LAYOUT[SHIFT_AFTER].x + LAYOUT[SHIFT_AFTER + 1].x) / 2,
  y: (yOf(LAYOUT[SHIFT_AFTER]) + yOf(LAYOUT[SHIFT_AFTER + 1])) / 2,
};
const SHIFT_FRAC = SHIFT.x / END_X;
const reachAt = (x) => (x / END_X) * DRAW;

function MilestoneBody({ m, current, compact = false }) {
  return (
    <>
      <div className="text-[13px] leading-[18px] font-bold tracking-[0.08em] text-[#486581]">{m.stage}</div>
      <div
        className={`font-display tabular-nums font-extrabold tracking-[-0.02em] mt-2 ${
          current ? 'text-[#E8680A]' : 'text-[#12304A]'
        } ${compact ? 'text-[26px] leading-[32px]' : current ? 'text-[34px] leading-[40px]' : 'text-[30px] leading-[36px]'}`}
      >
        {m.year}
      </div>
      <h3 className="font-display text-[21px] leading-[29px] font-bold text-[#061826] mt-2">{m.company}</h3>
      <p className="text-[16px] leading-[24px] font-semibold text-[#102A43] mt-0.5">{m.role}</p>
      <p className="text-[14px] leading-[20px] font-medium text-[#486581] mt-1 tabular-nums">{m.period}</p>
      <p className="text-[15px] leading-[24px] text-[#486581] mt-2.5 max-w-[46ch]">{m.description}</p>
      {current && (
        <div className="mt-3 inline-flex items-center gap-2 text-[14px] font-bold text-[#C2410C]">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          <span><Bi vi={translations.vi.journey.currentRoleTag} en={translations.en.journey.currentRoleTag} /></span>
        </div>
      )}
    </>
  );
}

function ShiftLabel({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-[#FF7A1A] bg-paper px-2.5 py-1 text-[13px] leading-none font-bold tracking-[0.06em] text-[#C2410C] whitespace-nowrap ${className}`}>
      BA → UX
    </span>
  );
}

export default function CareerJourney() {
  const reduce = useReducedMotion();
  const deskRef = useRef(null);
  const inView = useInView(deskRef, { once: true, amount: 0.3 });
  const show = reduce || inView;
  const bandRef = useRef(null);
  const bandW = useWidth(bandRef);
  const px = (pct) => (pct * bandW) / 100;
  const path = bandW ? buildCareerPath(LAYOUT.map((l) => ({ x: px(l.x), y: yOf(l) })), SHIFT_AFTER) : null;

  const viItems = translations.vi.journey.items;
  const enItems = translations.en.journey.items;
  const milestones = viItems.map((vi, i) => {
    const en = enItems[i];
    return {
      year: <Bi vi={vi.yearBadge} en={en.yearBadge} />,
      stage: <Bi vi={vi.stage} en={en.stage} />,
      stageVi: vi.stage,
      stageEn: en.stage,
      company: vi.company.replace(' Corporation', ''),
      role: <Bi vi={vi.role} en={en.role} />,
      period: <Bi vi={vi.period} en={en.period} />,
      description: <Bi vi={vi.description} en={en.description} />,
      isCurrent: vi.isCurrent,
    };
  });

  const nodeAnim = (x) => ({
    initial: reduce ? false : { opacity: 0, scale: 0.3 },
    animate: show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 },
    transition: { duration: reduce ? 0 : 0.45, delay: reduce ? 0 : reachAt(x), ease: EASE },
  });
  const blockAnim = (x, pos) => ({
    initial: reduce ? false : { opacity: 0, y: pos === 'high' ? -20 : 20 },
    animate: show ? { opacity: 1, y: 0 } : { opacity: 0, y: pos === 'high' ? -20 : 20 },
    transition: { duration: reduce ? 0 : 0.55, delay: reduce ? 0 : reachAt(x) + 0.1, ease: EASE },
  });

  const legend = [
    { kind: 'tech', label: <Bi vi={viItems[0].stage} en={enItems[0].stage} /> },
    { kind: 'ba', label: 'Business Analysis' },
    { kind: 'ux', label: 'UI/UX' },
  ];

  const block = (idx) => {
    const l = LAYOUT[idx];
    const m = milestones[idx];
    const high = l.pos === 'high';
    return (
      <motion.article
        key={idx}
        {...blockAnim(l.x, l.pos)}
        className={`relative border-l pl-5 text-left ${high ? 'self-end pb-7' : 'self-start pt-7'} ${
          m.isCurrent ? 'border-[#FF7A1A]' : 'border-[#12304A]/25'
        }`}
        style={{ gridArea: '1 / 1', marginLeft: `${l.x}%`, width: `${l.w}%` }}
      >
        <MilestoneBody m={m} current={m.isCurrent} />
      </motion.article>
    );
  };

  return (
    <Chapter id="journey" number="03" variant="light" labelledBy="journey-title">
      {/* Header: Title + Subtitle + CV link */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
        <Reveal className="lg:col-span-8">
          <ChapterHeader
            number="03"
            titleId="journey-title"
            label={<Bi vi="HÀNH TRÌNH NGHỀ NGHIỆP" en="CAREER PROGRESSION" />}
            title={<Bi vi="Từ nền tảng vững chắc đến" en="From Strong Foundation to" />}
            accent={<Bi vi="những sản phẩm có giá trị" en="High-Value Products" />}
            lead={<Bi vi="Hành trình của tôi là quá trình liên tục học hỏi, trải nghiệm và tạo ra những sản phẩm tốt hơn, đóng góp vào sự phát triển của đội ngũ và doanh nghiệp." en="My journey is a continuous evolution from data and business logic into intuitive user experiences that empower teams and users." />}
          />
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-4 text-left lg:text-right">
          <a
            href="/cv/Nguyen_Xuan_Hau_CV_UIUX_Designer.pdf"
            download
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent hover:bg-[#061826] focus-visible:bg-[#061826] text-[#061826] hover:text-white focus-visible:text-white typo-button border-2 border-[#061826] transition-colors duration-200"
          >
            <span><Bi vi="Xem full CV" en="View Full CV" /></span>
            <ArrowRight className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1" />
          </a>
        </Reveal>
      </div>

      {/* ===== DESKTOP: the thread is the timeline ===== */}
      <div ref={deskRef} className="hidden lg:block relative mt-14">
        <ol className="contents">
          {/* Top row: legend + milestones above the path */}
          <li className="grid list-none">
            <div className="self-end pb-7 text-left" style={{ gridArea: '1 / 1', width: '22%' }} aria-hidden="true">
              <CoordLabel tone="light">03 / <Bi vi="CHÚ GIẢI" en="LEGEND" /></CoordLabel>
              <ul className="mt-4 space-y-3">
                {legend.map((g, i) => (
                  <li key={i} className="flex items-center gap-3 text-[13px] leading-[18px] font-semibold text-[#486581]">
                    <span className="w-[26px] flex justify-center flex-shrink-0"><CareerNode kind={g.kind} /></span>
                    <span>{g.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            {block(1)}
            {block(3)}
          </li>

          {/* Band: the curved path */}
          <li ref={bandRef} className="relative list-none" style={{ height: BAND }} aria-hidden="true">
            {path && (
            <svg className="absolute inset-0 overflow-visible" width={bandW} height={BAND} viewBox={`0 0 ${bandW} ${BAND}`} fill="none" focusable="false">
              {/* leaders from nodes into their milestone blocks */}
              {LAYOUT.map((l, i) => (
                <line
                  key={i}
                  x1={px(l.x)}
                  x2={px(l.x)}
                  y1={yOf(l)}
                  y2={l.pos === 'high' ? 0 : BAND}
                  stroke={i === 3 ? '#FF7A1A' : 'rgba(18,48,74,0.25)'}
                  strokeWidth="1"
                />
              ))}
              {/* faint full route */}
              <path d={path.before} stroke="rgba(18,48,74,0.14)" strokeWidth="1" />
              <path d={path.after} stroke="rgba(18,48,74,0.14)" strokeWidth="1" />
              {/* BA era: thin thread */}
              <motion.path
                d={path.before}
                stroke="#FF7A1A"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: reduce ? 1 : 0 }}
                animate={{ pathLength: show ? 1 : 0 }}
                transition={{ duration: reduce ? 0 : DRAW * SHIFT_FRAC, ease: 'linear' }}
              />
              {/* after the shift: the thread thickens into the current role */}
              <motion.path
                d={path.after}
                stroke="#FF7A1A"
                strokeWidth="3.5"
                strokeLinecap="round"
                initial={{ pathLength: reduce ? 1 : 0 }}
                animate={{ pathLength: show ? 1 : 0 }}
                transition={{ duration: reduce ? 0 : DRAW * (1 - SHIFT_FRAC), delay: reduce ? 0 : DRAW * SHIFT_FRAC, ease: 'linear' }}
              />
            </svg>
            )}

            {/* nodes */}
            {LAYOUT.map((l, i) => {
              const big = l.kind === 'ux';
              const half = big ? 13 : 9;
              return (
                <motion.span
                  key={i}
                  {...nodeAnim(l.x)}
                  className="absolute block"
                  style={{ left: `calc(${l.x}% - ${half}px)`, top: yOf(l) - half }}
                >
                  <CareerNode kind={l.kind} size={big ? 'lg' : 'md'} />
                </motion.span>
              );
            })}

            {/* shift point: BA -> UX */}
            <motion.span
              {...nodeAnim(SHIFT.x)}
              className="absolute block w-[11px] h-[11px] rounded-full border-2 border-[#FF7A1A] bg-paper"
              style={{ left: `calc(${SHIFT.x}% - 5.5px)`, top: SHIFT.y - 5.5 }}
            />
            <motion.span
              {...nodeAnim(SHIFT.x)}
              className="absolute block"
              style={{ left: `calc(${SHIFT.x}% + 18px)`, top: SHIFT.y + 4 }}
            >
              <ShiftLabel />
            </motion.span>
          </li>

          {/* Bottom row: milestones below the path */}
          <li className="grid list-none">
            {block(0)}
            {block(2)}
          </li>
        </ol>
      </div>

      {/* ===== MOBILE / TABLET: vertical thread ===== */}
      <motion.ol
        className="lg:hidden relative mt-12 sm:mt-14 text-left"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {milestones.map((m, idx) => {
          const l = LAYOUT[idx];
          const last = idx === milestones.length - 1;
          const next = LAYOUT[idx + 1];
          const thick = next && next.kind === 'ux';
          return (
            <li key={idx} className={`relative pl-12 ${last ? '' : 'pb-10'}`}>
              {!last && (
                <motion.span
                  className={`absolute left-[12px] top-[14px] bottom-0 origin-top bg-[#FF7A1A] ${thick ? 'w-[3px] left-[11px]' : 'w-[1.5px]'}`}
                  variants={{
                    hidden: { scaleY: reduce ? 1 : 0 },
                    show: { scaleY: 1, transition: { duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.2 + idx * 0.45, ease: 'linear' } },
                  }}
                  aria-hidden="true"
                />
              )}
              <motion.span
                className="absolute left-0 top-0 w-[26px] h-[26px] flex items-center justify-center"
                variants={{
                  hidden: { opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.4 },
                  show: { opacity: 1, scale: 1, transition: { duration: reduce ? 0 : 0.4, delay: reduce ? 0 : idx * 0.45, ease: EASE } },
                }}
                aria-hidden="true"
              >
                <CareerNode kind={l.kind} size={l.kind === 'ux' ? 'lg' : 'md'} />
              </motion.span>
              {thick && (
                <span className="absolute left-[2px] bottom-[14px] z-[1]" aria-hidden="true">
                  <ShiftLabel />
                </span>
              )}
              <motion.article
                className={thick ? 'pb-10' : ''}
                variants={{
                  hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 },
                  show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.1 + idx * 0.45, ease: EASE } },
                }}
              >
                <MilestoneBody m={m} current={m.isCurrent} compact />
              </motion.article>
            </li>
          );
        })}
      </motion.ol>
    </Chapter>
  );
}
