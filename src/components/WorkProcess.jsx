import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import Bi from './Bi';
import Chapter, { ChapterHeader } from './ui/Chapter';
import { CoordLabel, Crosshair } from './ui/Technical';
import { useAnchorPoints, sCurve } from './ui/process-thread';

const EASE = [0.22, 1, 0.36, 1];

const STEPS = [
  {
    num: '01',
    tag: { vi: 'Đầu vào', en: 'Input' },
    title: { vi: 'Tiếp nhận tài liệu BA/PM & yêu cầu từ quản lý', en: 'Receive BA/PM Docs & Management Requirements' },
    desc: { vi: 'Nhận tài liệu từ BA/PM và yêu cầu từ quản lý.', en: 'Receive documents from BA/PM and requirements from management.' },
  },
  {
    num: '02',
    tag: { vi: 'Nghiệp vụ', en: 'Business' },
    title: { vi: 'Research & phân tích nghiệp vụ', en: 'Research & Analyze the Business' },
    desc: { vi: 'Tự tìm hiểu bối cảnh, nghiệp vụ và người dùng.', en: 'Research the context, the business and the users myself.' },
  },
  {
    num: '03',
    tag: { vi: 'Kế hoạch', en: 'Plan' },
    title: { vi: 'Lập kế hoạch & hướng thiết kế', en: 'Plan the Design Approach' },
    desc: { vi: 'Phân tích và tự đưa ra kế hoạch thiết kế.', en: 'Analyze and define the design plan myself.' },
  },
  {
    num: '04',
    tag: { vi: 'Nguyên mẫu', en: 'Prototype' },
    title: { vi: 'Thiết kế chi tiết & nguyên mẫu', en: 'Detail Design & Prototype' },
    desc: { vi: 'Thiết kế giao diện chi tiết và dựng nguyên mẫu.', en: 'Design detailed screens and build the prototype.' },
  },
  {
    num: '05',
    tag: { vi: 'Phản hồi', en: 'Feedback' },
    title: { vi: 'Review với team & tối ưu', en: 'Review with Team & Refine' },
    desc: { vi: 'Review với team và chỉnh sửa theo phản hồi.', en: 'Review with the team and refine from feedback.' },
  },
  {
    num: '06',
    tag: { vi: 'Triển khai', en: 'Delivery' },
    title: { vi: 'Bàn giao cho dev & đồng hành triển khai', en: 'Hand Off to Dev & Support Delivery' },
    desc: { vi: 'Bàn giao cho đội phát triển và đồng hành khi triển khai.', en: 'Hand off to the dev team and stay involved during delivery.' },
  },
];

function useIsDesktop() {
  const q = '(min-width: 1024px)';
  const [ok, setOk] = useState(() => typeof window !== 'undefined' && window.matchMedia?.(q).matches);
  useEffect(() => {
    const m = window.matchMedia?.(q);
    if (!m) return undefined;
    const on = () => setOk(m.matches);
    on();
    m.addEventListener?.('change', on);
    return () => m.removeEventListener?.('change', on);
  }, []);
  return ok;
}

export default function WorkProcess() {
  const reduce = useReducedMotion();
  const desktop = useIsDesktop();
  const [active, setActive] = useState(0);

  const stageRef = useRef(null);
  const nodeRefs = useRef([]);
  const inView = useInView(stageRef, { once: true, amount: 0.3 });
  const show = reduce || inView;
  const { w, h, pts } = useAnchorPoints(stageRef, nodeRefs, [desktop]);

  // Sequencing: connector k draws, then node k+1 appears as the line reaches it.
  const START = 0.2;
  const STEP = desktop ? 0.5 : 0.14;
  const SEG = desktop ? 0.44 : 0.12;
  const nodeDelay = (i) => (reduce ? 0 : START + i * STEP);
  const segDelay = (i) => (reduce ? 0 : START + i * STEP + 0.04);

  const ready = desktop && w > 0 && pts.length === STEPS.length && pts.every(Boolean);
  const tailEnd = ready ? { x: w - 6, y: pts[5].y } : null;

  return (
    <Chapter id="process" number="06" variant="dark" labelledBy="process-title">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
        <ChapterHeader
          dark
          number="06"
          titleId="process-title"
          className="lg:col-span-7"
          label={<Bi vi="QUY TRÌNH LÀM VIỆC" en="WORK PROCESS" />}
          title={
            <Bi
              vi={<>Từ vấn đề đến <span className="block text-[#FF7A1A]">sản phẩm hoàn thiện</span></>}
              en={<>From Business Problem to <span className="block text-[#FF7A1A]">Polished Product</span></>}
            />
          }
        />
        <div className="lg:col-span-5 text-left">
          <div className="border-l-2 border-[#FF7A1A] pl-4 sm:pl-5 py-1">
            <p className="typo-lead text-[#94A6B8] max-w-[54ch]">
              <Bi
                vi="Tôi nhận tài liệu từ BA/PM và yêu cầu từ quản lý, tự research, phân tích, lên kế hoạch thiết kế rồi bàn giao cho đội phát triển."
                en="I take documents from BA/PM and requirements from management, then research, analyze, plan the design myself and hand it off to the dev team."
              />
            </p>
          </div>
        </div>
      </div>

      {/* JOURNEY STAGE */}
      <div ref={stageRef} className="relative mt-12 sm:mt-14 lg:mt-20">
        {/* Desktop: the logic thread, drawn through the measured station centres */}
        {ready && (
          <svg
            className="hidden lg:block absolute inset-0 pointer-events-none overflow-visible"
            width={w}
            height={h}
            viewBox={`0 0 ${w} ${h}`}
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <linearGradient id="process-tail" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#FF7A1A" stopOpacity="0.9" />
                <stop offset="1" stopColor="#FF7A1A" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* ghost route */}
            {pts.slice(0, -1).map((p, i) => (
              <path key={`g${i}`} d={sCurve(p, pts[i + 1])} stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            ))}
            {/* drawn thread */}
            {pts.slice(0, -1).map((p, i) => (
              <motion.path
                key={`t${i}`}
                d={sCurve(p, pts[i + 1])}
                stroke="#FF7A1A"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={reduce || show ? false : { pathLength: 0 }}
                animate={{ pathLength: show ? 1 : 0 }}
                transition={{ duration: reduce ? 0 : SEG, delay: segDelay(i), ease: 'easeInOut' }}
              />
            ))}
            {/* tail: continues towards chapter 07 */}
            <motion.path
              d={`M ${pts[5].x} ${pts[5].y} L ${tailEnd.x} ${tailEnd.y}`}
              stroke="url(#process-tail)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              initial={reduce || show ? false : { pathLength: 0 }}
              animate={{ pathLength: show ? 1 : 0 }}
              transition={{ duration: reduce ? 0 : 0.5, delay: segDelay(5), ease: 'easeOut' }}
            />
            {/* measurement ticks under each station */}
            {pts.map((p, i) => (
              <path key={`k${i}`} d={`M ${p.x} ${p.y + 30} V ${p.y + 38}`} stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
            ))}
          </svg>
        )}

        {ready && (
          <motion.div
            className="hidden lg:flex absolute items-center gap-2 pointer-events-none"
            style={{ left: tailEnd.x - 52, top: tailEnd.y - 30 }}
            initial={{ opacity: reduce ? 1 : 0 }}
            animate={{ opacity: show ? 1 : 0 }}
            transition={{ duration: 0.4, delay: reduce ? 0 : segDelay(5) + 0.4 }}
            aria-hidden="true"
          >
            <CoordLabel>→ 07</CoordLabel>
          </motion.div>
        )}

        <ol
          className="relative flex flex-col gap-0 lg:grid lg:grid-cols-6 lg:items-start [--process-dy:0px] lg:[--process-dy:46px] xl:[--process-dy:58px]"
        >
          {STEPS.map((step, i) => {
            const last = i === STEPS.length - 1;
            const isActive = active === i;
            return (
              <li
                key={step.num}
                className="group relative flex lg:block gap-5 pb-9 sm:pb-10 lg:pb-0 lg:pr-5 xl:pr-7 text-left"
                style={{ marginTop: `calc(${STEPS.length - 1 - i} * var(--process-dy))` }}
                onMouseEnter={() => setActive(i)}
              >
                {/* Mobile / tablet: vertical connector to the next station */}
                {!last && (
                  <span className="lg:hidden absolute left-[21px] top-11 bottom-0 w-px bg-white/15" aria-hidden="true">
                    <motion.span
                      className="absolute inset-0 bg-[#FF7A1A] origin-top"
                      initial={{ scaleY: reduce ? 1 : 0 }}
                      animate={{ scaleY: show ? 1 : 0 }}
                      transition={{ duration: reduce ? 0 : SEG, delay: segDelay(i), ease: 'easeOut' }}
                    />
                  </span>
                )}

                {/* Station node */}
                <motion.span
                  ref={(el) => { nodeRefs.current[i] = el; }}
                  className={`relative z-10 flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-[13px] font-bold tabular-nums border transition-colors duration-200 bg-[#0B2235] border-[#FF7A1A]/70 text-[#FF7A1A] ${
                    isActive
                      ? 'lg:bg-[#FF7A1A] lg:border-[#FF7A1A] lg:text-[#061826] lg:ring-[6px] lg:ring-[#FF7A1A]/20'
                      : 'lg:border-white/25 lg:text-[#F5F7F8] lg:group-hover:border-[#FF7A1A]'
                  }`}
                  initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.6 }}
                  animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.6 }}
                  transition={{ duration: reduce ? 0 : 0.4, delay: nodeDelay(i), ease: EASE }}
                  aria-hidden="true"
                >
                  {step.num}
                </motion.span>

                <motion.div
                  className="min-w-0 flex-1 pt-1.5 lg:pt-7 max-w-[46ch] lg:max-w-none"
                  initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 14 }}
                  animate={{ opacity: show ? 1 : 0, y: show ? 0 : 14 }}
                  transition={{ duration: reduce ? 0 : 0.5, delay: nodeDelay(i) + 0.1, ease: EASE }}
                >
                  <span className="flex items-center gap-2 whitespace-nowrap text-[12px] leading-none font-semibold uppercase tracking-[0.14em] text-[#94A6B8]">
                    <span className="w-3 h-px bg-[#FF7A1A]" aria-hidden="true" />
                    <Bi vi={step.tag.vi} en={step.tag.en} />
                  </span>
                  <h3 className="mt-3 text-[17px] leading-[26px] lg:text-[15px] lg:leading-[23px] xl:text-[17px] xl:leading-[26px] font-semibold text-[#F5F7F8] [overflow-wrap:anywhere]">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      aria-pressed={desktop ? isActive : undefined}
                      aria-controls={desktop ? 'process-readout' : undefined}
                      className={`text-left rounded-sm cursor-default lg:cursor-pointer transition-colors duration-200 ${isActive ? 'lg:text-[#FF7A1A]' : 'hover:text-[#FFD9BC]'}`}
                    >
                      <Bi vi={step.title.vi} en={step.title.en} />
                    </button>
                  </h3>
                  {/* Inline description: visible on mobile/tablet, screen-reader only on desktop (shown in the readout) */}
                  <p className="mt-2 typo-small text-[#94A6B8] lg:sr-only">
                    <Bi vi={step.desc.vi} en={step.desc.en} />
                  </p>
                </motion.div>
              </li>
            );
          })}
        </ol>

        {/* Desktop readout: the active station's description, set in the empty corner under the rising path */}
        <motion.div
          id="process-readout"
          className="hidden lg:block absolute right-0 bottom-0 w-1/2 pl-6 xl:pl-8"
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: show ? 1 : 0, y: show ? 0 : 16 }}
          transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : START + 5 * STEP + 0.3, ease: EASE }}
          aria-hidden="true"
        >
          <div className="relative border-t border-white/15 pt-5 flex items-start gap-6 xl:gap-8">
            <Crosshair className="absolute -top-[9px] -left-[9px]" />
            <span className="grid flex-shrink-0">
              {STEPS.map((s, i) => (
                <span
                  key={s.num}
                  className={`[grid-area:1/1] font-display font-bold tabular-nums text-[64px] leading-[0.9] xl:text-[84px] tracking-[-0.04em] text-[#FF7A1A] transition-opacity duration-300 ${active === i ? 'opacity-100' : 'opacity-0'}`}
                >
                  {s.num}
                </span>
              ))}
            </span>
            <span className="grid min-w-0 flex-1 pt-1">
              {STEPS.map((s, i) => (
                <span
                  key={s.num}
                  className={`[grid-area:1/1] block transition-[opacity,transform] duration-300 ${active === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5 invisible'}`}
                >
                  <span className="block text-[12px] leading-none font-semibold uppercase tracking-[0.14em] text-[#94A6B8] tabular-nums">
                    <Bi vi={`BƯỚC ${s.num} / 06 · ${s.tag.vi}`} en={`STEP ${s.num} / 06 · ${s.tag.en}`} />
                  </span>
                  <span className="block mt-3 font-display text-[19px] leading-[28px] xl:text-[22px] xl:leading-[32px] font-medium text-[#F5F7F8] max-w-[34ch]">
                    <Bi vi={s.desc.vi} en={s.desc.en} />
                  </span>
                </span>
              ))}
            </span>
          </div>
        </motion.div>
      </div>
    </Chapter>
  );
}
