import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Database, Layers, GitMerge, Cpu, CheckCircle2, Target, ArrowRight } from 'lucide-react';
import Bi from './Bi';
import Chapter, { ChapterHeader } from './ui/Chapter';
import { translations } from '../context/LanguageContext';

const EASE = [0.22, 1, 0.36, 1];

const businessItems = [
  <Bi vi="Thu thập & phân tích yêu cầu" en="Requirement Analysis" />,
  <Bi vi="Quy tắc nghiệp vụ" en="Operational Rules" />,
  <Bi vi="Phân quyền & vai trò" en="Roles & Permissions" />,
  <Bi vi="Ràng buộc dữ liệu" en="Data Constraints" />,
  <Bi vi="Trạng thái & luồng" en="States & Transitions" />,
  <Bi vi="Các trường hợp đặc biệt" en="Exception Handling" />,
];

const experienceItems = [
  <Bi vi="Kiến trúc thông tin" en="Information Architecture" />,
  <Bi vi="Luồng người dùng" en="User Flow" />,
  <Bi vi="Thiết kế tương tác" en="Interaction Design" />,
  <Bi vi="Trạng thái giao diện" en="UI States & Edge Views" />,
  <Bi vi="Giao diện đáp ứng" en="Responsive Interface" />,
  <Bi vi="Kiểm thử & tối ưu" en="Design QA & Specs" />,
];

const principles = [
  {
    title: <Bi vi="Hiểu đúng nghiệp vụ" en="Logic Before Pixels" />,
    desc: <Bi vi="Đào sâu vấn đề, làm rõ yêu cầu và tìm ra giải pháp phù hợp." en="Deep-dive into problems, clarify requirements, and uncover proper solutions." />,
    icon: Cpu,
  },
  {
    title: <Bi vi="Thiết kế lấy người dùng làm trung tâm" en="Design the State, Not Only Happy Path" />,
    desc: <Bi vi="Biến logic phức tạp thành trải nghiệm đơn giản, dễ sử dụng." en="Transform complex operational logic into simple, intuitive user flows." />,
    icon: CheckCircle2,
  },
  {
    title: <Bi vi="Tạo ra giá trị thực tế" en="Clarify Before Assuming" />,
    desc: <Bi vi="Sản phẩm không chỉ đẹp mà còn hiệu quả, đo lường được và có thể mở rộng." en="Deliver interfaces that are not only aesthetic, but scalable and measurable." />,
    icon: Target,
  },
];

// Existing bridge copy (UNDERSTAND / STRUCTURE / TRANSLATE) from the language file.
const bridgeVi = translations.vi.about.bridge.steps;
const bridgeEn = translations.en.about.bridge.steps;
const bridgeSteps = bridgeEn.map((s, i) => ({
  step: s.step,
  name: s.name,
  desc: <Bi vi={bridgeVi[i].desc} en={s.desc} />,
}));

const STAGES = [
  {
    key: 'ba',
    n: '01',
    icon: Database,
    title: 'Business Analysis',
    tag: 'BUSINESS LOGIC',
    sub: <Bi vi="Yêu cầu & Ràng buộc nghiệp vụ" en="Requirements & Business Rules" />,
    io: <Bi vi="ĐẦU VÀO" en="INPUT" />,
  },
  {
    key: 'pt',
    n: '02',
    icon: GitMerge,
    title: 'Product Thinking',
    tag: 'BA → UX',
    sub: <Bi vi="Biến logic phức tạp thành giải pháp hệ thống" en="Translating logic into systems" />,
    io: <Bi vi="CẦU NỐI" en="BRIDGE" />,
  },
  {
    key: 'ux',
    n: '03',
    icon: Layers,
    title: 'UI/UX Execution',
    tag: 'PRODUCT EXPERIENCE',
    sub: <Bi vi="Kiến trúc & Trải nghiệm giao diện" en="Architecture & User Interface" />,
    io: <Bi vi="ĐẦU RA" en="OUTPUT" />,
  },
];

/* ------------------------------------------------------------------ */
/* Stage contents                                                       */
/* ------------------------------------------------------------------ */

function PanelTag({ children }) {
  return <div className="text-[13px] leading-[19px] font-bold text-[#061826] uppercase tracking-[0.08em]">{children}</div>;
}

function ItemGrid({ items, warm, tag, wide }) {
  const num = (idx) => (
    <span className={`text-[13px] font-bold tabular-nums flex-shrink-0 ${warm ? 'text-[#C25A0A]' : 'text-[#486581]'}`}>
      {String(idx + 1).padStart(2, '0')}
    </span>
  );
  if (wide) {
    return (
      <div>
        <PanelTag>{tag}</PanelTag>
        <ol className="mt-4 grid grid-cols-3 gap-x-8">
          {items.map((item, idx) => (
            <li key={idx} className="relative pt-3 pb-5 border-t border-[#061826]/12">
              <span className={`absolute -top-[3px] left-0 w-[5px] h-[5px] ${warm ? 'bg-[#FF7A1A]' : 'bg-[#061826]/50'}`} aria-hidden="true" />
              {num(idx)}
              <div className="mt-1 font-display text-[18px] leading-[25px] font-semibold text-[#10202C]">{item}</div>
            </li>
          ))}
        </ol>
      </div>
    );
  }
  return (
    <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-baseline gap-3 py-2.5 border-b border-[#061826]/10 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0">
          {num(idx)}
          <span className="text-[15px] leading-[22px] font-medium text-[#10202C] min-w-0">{item}</span>
        </li>
      ))}
    </ol>
  );
}

function BridgeContent() {
  return (
    <div>
      <PanelTag>
        <Bi vi="KẾT NỐI TẠO NÊN SẢN PHẨM TỐT HƠN" en="BRIDGING BUSINESS & USER" />
      </PanelTag>
      {/* Mini flow: UNDERSTAND → STRUCTURE → TRANSLATE */}
      <ol className="mt-3 lg:mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-x-6 lg:gap-x-8">
        {bridgeSteps.map((s, i) => (
          <li key={s.step} className="relative py-1.5 sm:py-0">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-bold tabular-nums text-[#C25A0A]">{s.step}</span>
              <span className="font-display text-[15px] font-bold tracking-[0.06em] text-[#061826]">{s.name}</span>
              {i < bridgeSteps.length - 1 && (
                <ArrowRight className="hidden sm:block w-3.5 h-3.5 text-[#FF7A1A] ml-auto" aria-hidden="true" />
              )}
            </div>
            <p className="text-[14px] leading-[20px] text-[#486581] mt-0.5 sm:mt-1 min-w-0">{s.desc}</p>
          </li>
        ))}
      </ol>
      {/* Principles as annotated callouts */}
      <ul className="mt-5 lg:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-8">
        {principles.map((pr, idx) => {
          const Icon = pr.icon;
          return (
            <li key={idx} className="relative pl-4 border-l-2 border-[#FF7A1A]/60">
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-[#E8680A] flex-shrink-0" aria-hidden="true" />
                <h4 className="font-display text-[15px] leading-[21px] font-bold text-[#061826]">{pr.title}</h4>
              </div>
              <p className="text-[14px] leading-[20px] text-[#486581] mt-1">{pr.desc}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function StageContent({ i, wide = false }) {
  if (i === 0) return <ItemGrid items={businessItems} tag="BUSINESS LOGIC" wide={wide} />;
  if (i === 1) return <BridgeContent />;
  return <ItemGrid items={experienceItems} tag="PRODUCT EXPERIENCE" warm wide={wide} />;
}

/* ------------------------------------------------------------------ */

export default function About() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [lit, setLit] = useState(reduce ? 3 : 0); // how many nodes the thread has reached
  const touched = useRef(false);
  const diagramRef = useRef(null);
  const inView = useInView(diagramRef, { once: true, amount: 0.35 });

  // Auto-highlight the stages once, in order, when the diagram enters view.
  useEffect(() => {
    if (!inView) return undefined;
    if (reduce) { setLit(3); return undefined; }
    const timers = [0, 1, 2].map((i) =>
      setTimeout(() => {
        setLit((l) => Math.max(l, i + 1));
        if (!touched.current) setActive(i);
      }, 500 + i * 1300)
    );
    return () => timers.forEach(clearTimeout);
  }, [inView, reduce]);

  const choose = (i) => {
    touched.current = true;
    setActive(i);
    setLit((l) => Math.max(l, i + 1));
  };

  const onKey = (e) => {
    const k = e.key;
    let next = null;
    if (k === 'ArrowRight' || k === 'ArrowDown') next = (active + 1) % 3;
    if (k === 'ArrowLeft' || k === 'ArrowUp') next = (active + 2) % 3;
    if (k === 'Home') next = 0;
    if (k === 'End') next = 2;
    if (next === null) return;
    e.preventDefault();
    choose(next);
    document.getElementById(`about-tab-${next}`)?.focus();
  };

  const seg = (on, axis = 'scaleX', d = 0) => ({
    initial: false,
    animate: { [axis]: on ? 1 : 0 },
    transition: { duration: reduce ? 0 : 0.9, delay: reduce ? 0 : d, ease: EASE },
  });

  return (
    <Chapter id="about" number="01" variant="light" labelledBy="about-title">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end md:pt-8">
        <ChapterHeader
          number="01"
          titleId="about-title"
          className="lg:col-span-7"
          label={<Bi vi="CÁCH TÔI TẠO GIÁ TRỊ" en="HOW I CREATE VALUE" />}
          title={<Bi vi="Nơi Business Logic Trở Thành" en="Where Business Logic Becomes" />}
          accent={<Bi vi="Product Experience" en="Product Experience" />}
        />
        <div className="lg:col-span-5">
          <p className="typo-lead text-[#486581] max-w-[54ch] border-l-2 border-[#FF7A1A] pl-4 sm:pl-5">
            <Bi
              vi="Tôi kết hợp tư duy phân tích nghiệp vụ (Business Analysis) và Thiết kế trải nghiệm (UI/UX Design) để xây dựng những sản phẩm số vừa đúng nghiệp vụ, vừa dễ sử dụng, vừa tạo ra giá trị thực tế cho người dùng và doanh nghiệp."
              en="I combine Business Analysis and UI/UX Design to craft digital systems that honor business logic while remaining intuitive, efficient, and genuinely valuable."
            />
          </p>
        </div>
      </div>

      <div ref={diagramRef} className="mt-12 sm:mt-14 lg:mt-10">
        {/* ============================================================ */}
        {/* DESKTOP: horizontal system diagram + inspector                */}
        {/* ============================================================ */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Lead-in from the previous chapter + base rail */}
            <div className="absolute top-[19px] -left-8 right-0 h-px bg-[#061826]/15" aria-hidden="true" />
            <motion.div
              className="absolute top-[19px] -left-8 w-8 h-[1.5px] bg-[#FF7A1A] origin-left"
              {...seg(inView || reduce, 'scaleX', 0)}
              aria-hidden="true"
            />
            <div role="tablist" aria-label="Business Analysis → Product Thinking → UI/UX Execution" aria-orientation="horizontal" className="grid grid-cols-3 gap-6" onKeyDown={onKey}>
              {STAGES.map((st, i) => {
                const Icon = st.icon;
                const isOn = active === i;
                const reached = lit > i;
                return (
                  <div key={st.key} className="relative">
                    {/* Thread segment leaving this node toward the next (or out, after the last) */}
                    <motion.span
                      className={`absolute top-[19px] left-5 h-[1.5px] bg-[#FF7A1A] origin-left ${i < 2 ? '-right-6' : 'right-0'}`}
                      {...seg(lit > i + 1 || (i === 2 && lit >= 3), 'scaleX', 0.1)}
                      aria-hidden="true"
                    />
                    {i === 2 && (
                      <ArrowRight className={`absolute top-[12px] -right-1 w-4 h-4 transition-colors duration-500 ${lit >= 3 ? 'text-[#FF7A1A]' : 'text-[#061826]/25'}`} aria-hidden="true" />
                    )}
                    <button
                      type="button"
                      role="tab"
                      id={`about-tab-${i}`}
                      aria-selected={isOn}
                      aria-controls={`about-panel-${i}`}
                      tabIndex={isOn ? 0 : -1}
                      onClick={() => choose(i)}
                      onMouseEnter={() => choose(i)}
                      onFocus={() => choose(i)}
                      className="group relative w-full text-left pt-0 pb-5 pr-4 rounded-xl cursor-pointer"
                    >
                      {/* Node */}
                      <span
                        className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 text-[13px] font-bold tabular-nums transition-all duration-500 ${
                          reached ? 'bg-[#FF7A1A] border-[#FF7A1A] text-white' : 'bg-paper border-[#061826]/25 text-[#486581]'
                        } ${isOn ? 'ring-[6px] ring-[#FF7A1A]/20' : ''}`}
                        aria-hidden="true"
                      >
                        {st.n}
                      </span>
                      <span className={`block transition-opacity duration-300 ${isOn ? 'opacity-100' : 'opacity-[0.62] group-hover:opacity-90'}`}>
                      <span className="mt-5 flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] text-[#486581] uppercase">
                        <Icon className="w-4 h-4 text-[#E8680A]" aria-hidden="true" />
                        <span>{st.io}</span>
                        <span className="text-[#061826]/30" aria-hidden="true">·</span>
                        <span>{st.tag}</span>
                      </span>
                      <span className="mt-2 block font-display font-bold text-[#061826] text-[26px] leading-[32px] xl:text-[30px] xl:leading-[36px] tracking-[-0.02em]">
                        {st.title}
                      </span>
                      <span className="mt-1.5 block text-[15px] leading-[22px] text-[#486581]">{st.sub}</span>
                      </span>
                      {/* Active underline */}
                      <span className={`absolute left-0 bottom-0 h-[2px] bg-[#FF7A1A] transition-all duration-500 ${isOn ? 'w-16' : 'w-0'}`} aria-hidden="true" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Inspector: all three panels share one cell, so its height never jumps */}
          <div className="relative mt-6">
            {/* Pointer notch under the active stage */}
            {STAGES.map((st, i) => (
              <span
                key={st.key}
                className={`absolute -top-[7px] w-3.5 h-3.5 rotate-45 bg-white border-l border-t border-[#061826]/12 z-10 transition-opacity duration-300 ${active === i ? 'opacity-100' : 'opacity-0'}`}
                style={{ left: `calc(${i} * (100% + 24px) / 3 + 13px)` }}
                aria-hidden="true"
              />
            ))}
            <div className="relative grid bg-white rounded-2xl border border-[#061826]/12 shadow-[0_30px_60px_-45px_rgba(6,24,38,0.45)]">
              {STAGES.map((st, i) => {
                const isOn = active === i;
                return (
                  <div
                    key={st.key}
                    id={`about-panel-${i}`}
                    role="tabpanel"
                    aria-labelledby={`about-tab-${i}`}
                    aria-hidden={!isOn}
                    className={`[grid-area:1/1] p-7 xl:p-8 transition-opacity duration-300 ${isOn ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                  >
                    <h3 className="sr-only">{st.title}</h3>
                    <StageContent i={i} wide />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MOBILE / TABLET: vertical thread, every stage expanded         */}
        {/* ============================================================ */}
        <ol className="lg:hidden relative" aria-label="Business Analysis → Product Thinking → UI/UX Execution">
          {STAGES.map((st, i) => {
            const Icon = st.icon;
            const reached = lit > i;
            const isOn = active === i;
            return (
              <li key={st.key} className="relative pl-14 sm:pl-16 pb-10 last:pb-2">
                {/* Rail + orange fill */}
                <span className="absolute left-[19px] top-10 bottom-0 w-px bg-[#061826]/15" aria-hidden="true" />
                <motion.span
                  className="absolute left-[19px] top-10 bottom-0 w-[1.5px] bg-[#FF7A1A] origin-top"
                  {...seg(lit > i + 1 || (i === 2 && lit >= 3), 'scaleY', 0.1)}
                  aria-hidden="true"
                />
                <button
                  type="button"
                  onClick={() => choose(i)}
                  aria-pressed={isOn}
                  className="absolute left-0 top-0 w-10 h-10 cursor-pointer"
                  aria-label={st.title}
                >
                  <span
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 text-[13px] font-bold tabular-nums transition-all duration-500 ${
                      reached ? 'bg-[#FF7A1A] border-[#FF7A1A] text-white' : 'bg-paper border-[#061826]/25 text-[#486581]'
                    } ${isOn ? 'ring-[6px] ring-[#FF7A1A]/20' : ''}`}
                    aria-hidden="true"
                  >
                    {st.n}
                  </span>
                </button>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] font-semibold tracking-[0.12em] text-[#486581] uppercase pt-1">
                  <Icon className="w-4 h-4 text-[#E8680A]" aria-hidden="true" />
                  <span>{st.io}</span>
                  <span className="text-[#061826]/30" aria-hidden="true">·</span>
                  <span>{st.tag}</span>
                </div>
                <h3 className="mt-2 font-display font-bold text-[#061826] text-[24px] leading-[30px] tracking-[-0.02em]">{st.title}</h3>
                <p className="mt-1 text-[15px] leading-[22px] text-[#486581]">{st.sub}</p>
                <div className={`mt-4 bg-white rounded-2xl border p-4 sm:p-5 transition-colors duration-300 ${isOn ? 'border-[#FF7A1A]/50' : 'border-[#061826]/12'}`}>
                  <StageContent i={i} />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Chapter>
  );
}
