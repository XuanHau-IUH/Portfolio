import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import Bi from './Bi';
import Chapter, { ChapterHeader } from './ui/Chapter';
import Reveal from './ui/Reveal';
import { CoordLabel, Crosshair } from './ui/Technical';
import { useSkillsGeometry, buildSkillsPath, SkillsThreadOverlay } from './ui/skills-thread';

const EASE = [0.22, 1, 0.36, 1];
const DRAW = 2.4;

/* ---------- content (existing skills, regrouped) ---------- */

const baSkills = [
  <Bi vi="Phân tích yêu cầu" en="Requirement Analysis" />,
  <Bi vi="Luồng nghiệp vụ" en="Business Flow" />,
  <Bi vi="Ca sử dụng & câu chuyện người dùng" en="Use Case & User Story" />,
  <Bi vi="Mô hình hóa quy trình" en="Process Modeling" />,
  <Bi vi="Thiết kế hệ thống" en="System Design" />,
  <Bi vi="Vai trò & phân quyền" en="Roles & Permissions" />,
];

const uxSkills = [
  <Bi vi="Nghiên cứu người dùng" en="User Research" />,
  <Bi vi="Kiến trúc thông tin" en="Information Architecture" />,
  <Bi vi="Kiểm thử khả dụng" en="Usability Testing" />,
];

const uiSkills = [
  <Bi vi="Thiết kế UI/UX" en="UI/UX Design" />,
  <Bi vi="Tạo nguyên mẫu" en="Prototyping" />,
  <Bi vi="Hệ thống thiết kế" en="Design System" />,
];

const softSkills = [
  <Bi vi="Giao tiếp với stakeholder" en="Stakeholder communication" />,
  <Bi vi="Làm rõ yêu cầu" en="Requirement clarification" />,
  <Bi vi="Phối hợp đa chức năng" en="Cross-functional collaboration" />,
  <Bi vi="Giải quyết vấn đề có cấu trúc" en="Structured problem solving" />,
  <Bi vi="Chủ động & có trách nhiệm" en="Ownership & proactivity" />,
  <Bi vi="Chú ý chi tiết" en="Attention to detail" />,
  <Bi vi="Cân nhắc đánh đổi khi ra quyết định sản phẩm" en="Product trade-off thinking" />,
];

const toolGroups = [
  { label: <Bi vi="CÔNG CỤ" en="TOOLS" />, items: ['Jira', 'Figma', 'Draw.io', 'Visual Paradigm', 'MySQL', 'Microsoft Office'] },
  { label: <Bi vi="KIẾN THỨC NỀN" en="TECHNICAL FOUNDATION" />, items: ['SQL', <Bi vi="Cơ sở dữ liệu" en="Databases" />, <Bi vi="API cơ bản" en="API basics" />] },
  { label: <Bi vi="AI HỖ TRỢ" en="AI TOOLS" />, items: ['ChatGPT', 'Codex', 'Claude', 'Stitch'] },
];

/* ---------- small pieces ---------- */

/** Group index, e.g. "01", in display type. */
function GroupNo({ n, tone = 'orange' }) {
  return (
    <span className={`font-display tabular-nums text-[13px] leading-none font-bold tracking-[0.12em] ${tone === 'orange' ? 'text-[#FF7A1A]' : 'text-[#78A9D4]'}`}>
      {n}
    </span>
  );
}

/** Mobile-only node on the vertical thread (sits on the left rail). */
function MobileNode({ shape = 'circle' }) {
  const base = 'lg:hidden absolute -left-[27px] top-[3px] w-[11px] h-[11px]';
  if (shape === 'square') return <span className={`${base} bg-[#FF7A1A]`} aria-hidden="true" />;
  if (shape === 'hollow') return <span className={`${base} rounded-full border-2 border-[#78A9D4] bg-ink`} aria-hidden="true" />;
  if (shape === 'ring') return <span className={`${base} rounded-full border-2 border-[#FF7A1A] bg-ink`} aria-hidden="true" />;
  return <span className={`${base} rounded-full bg-[#FF7A1A]`} aria-hidden="true" />;
}

/** Core skill row: large display type with an index tick. */
function CoreSkill({ i, children }) {
  return (
    <li className="flex items-baseline gap-3 py-2.5 border-t border-white/[0.09]">
      <span className="tabular-nums text-[13px] leading-none font-semibold text-[#94A6B8] w-6 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
      <span className="font-display text-[17px] leading-[25px] sm:text-[18px] sm:leading-[26px] font-semibold text-[#F5F7F8]">{children}</span>
    </li>
  );
}

/** Desktop thread node inside the band, animated when the path reaches it. */
function BandNode({ nodeRef, top, left = 32, shape, show, delay, reduce }) {
  const cls = shape === 'square'
    ? 'w-[13px] h-[13px] bg-[#FF7A1A] ring-[5px] ring-[#FF7A1A]/15'
    : 'w-[13px] h-[13px] rounded-full bg-[#FF7A1A] ring-[5px] ring-[#FF7A1A]/15';
  return (
    <motion.span
      ref={nodeRef}
      className={`absolute block z-[2] ${cls}`}
      style={{ top: top - 6.5, left: left - 6.5 }}
      initial={reduce ? false : { opacity: 0, scale: 0.4 }}
      animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
      transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : delay, ease: EASE }}
      aria-hidden="true"
    />
  );
}

export default function Services() {
  const reduce = useReducedMotion();
  const mapRef = useRef(null);
  const refs = {
    ba: useRef(null),
    ux: useRef(null),
    ui: useRef(null),
    del: useRef(null),
    tools: useRef(null),
  };
  const inView = useInView(mapRef, { once: true, amount: 0.2 });
  const geo = useSkillsGeometry(mapRef, refs);
  const at = geo ? buildSkillsPath(geo).at : { ba: 0.05, ux: 0.35, ui: 0.6, del: 1 };
  const show = reduce || inView;
  const delayOf = (k) => at[k] * DRAW;

  return (
    <Chapter id="services" number="02" variant="dark" labelledBy="services-title">
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
        <Reveal className="lg:col-span-7">
          <ChapterHeader
            dark
            number="02"
            titleId="services-title"
            label={<Bi vi="KỸ NĂNG CHUYÊN MÔN" en="CORE CAPABILITIES" />}
            title={<Bi vi="Nền tảng tạo nên" en="The Foundation for" />}
            accent={<Bi vi="sản phẩm tốt hơn" en="Better Products" />}
          />
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-5 text-left lg:pt-12 xl:pt-0">
          <p className="typo-lead text-white/75 max-w-[54ch] border-l-2 border-[#FF7A1A] pl-4 sm:pl-5">
            <Bi vi="Sự kết hợp giữa tư duy nghiệp vụ, thiết kế trải nghiệm và công cụ phù hợp giúp tôi xây dựng sản phẩm toàn diện hơn, từ chiến lược đến chi tiết giao diện." en="Bridging business thinking, user experience design, and modern tooling enables me to build comprehensive digital products from strategy down to interaction details." />
          </p>
        </Reveal>
      </div>

      {/* Map annotation strip */}
      <div className="mt-10 sm:mt-12 mb-3 flex items-center justify-between gap-4" aria-hidden="true">
        <CoordLabel tone="dark">02.A — <Bi vi="CỐT LÕI" en="CORE" /></CoordLabel>
        <CoordLabel tone="dark" className="hidden sm:inline-flex">BA → UX</CoordLabel>
      </div>

      {/* CAPABILITY MAP */}
      <div ref={mapRef} className="relative text-left">
        <SkillsThreadOverlay geo={geo} inView={inView} duration={DRAW} />

        {/* Mobile / tablet vertical thread */}
        <span className="lg:hidden absolute left-[7px] top-2 bottom-2 w-px thread-v" aria-hidden="true" />

        {/* Blueprint corner marks (desktop) */}
        <Crosshair className="hidden lg:block absolute -left-[8.5px] -top-[8.5px] z-[2]" />
        <Crosshair className="hidden lg:block absolute -right-[8.5px] -bottom-[8.5px] z-[2]" />

        <div className="relative flex flex-col pl-8 lg:pl-0 lg:grid lg:grid-cols-12 lg:border-t lg:border-l border-white/10">
          {/* ===== Row A: headers ===== */}
          {/* A1 — Business Analysis header (CORE) */}
          <Reveal className="order-1 lg:order-none lg:col-span-5 lg:border-r border-white/10 lg:px-8 lg:pt-8 lg:bg-white/[0.025]">
            <div className="relative">
              <MobileNode shape="square" />
              <GroupNo n="01" />
              <h3 className="font-display text-[24px] leading-[32px] sm:text-[28px] sm:leading-[36px] font-bold text-[#F5F7F8] mt-3 max-w-[22ch]">
                <Bi vi="Phân tích nghiệp vụ & tư duy hệ thống" en="Business Analysis & System Thinking" />
              </h3>
              <p className="text-[15px] leading-[24px] text-[#94A6B8] mt-3 max-w-[44ch]">
                <Bi vi="Phân tích yêu cầu, mô hình hóa nghiệp vụ và đề xuất giải pháp hệ thống hiệu quả." en="Requirement analysis, business flow modeling, and scalable system solution architecture." />
              </p>
            </div>
          </Reveal>

          {/* A2 — Product & UI/UX umbrella header (CORE) */}
          <Reveal delay={0.08} className="order-3 lg:order-none lg:col-span-7 lg:border-r border-white/10 lg:px-8 lg:pt-8 mt-12 lg:mt-0">
            <div className="relative">
              <MobileNode shape="ring" />
              <GroupNo n="02 — 03" />
              <h3 className="font-display text-[24px] leading-[32px] sm:text-[28px] sm:leading-[36px] font-bold text-[#F5F7F8] mt-3">
                <Bi vi="Thiết kế sản phẩm & UI/UX" en="Product & UI/UX Design" />
              </h3>
              <p className="text-[15px] leading-[24px] text-[#94A6B8] mt-3 max-w-[48ch]">
                <Bi vi="Nghiên cứu người dùng, thiết kế trải nghiệm và giao diện sản phẩm số hiện đại, dễ sử dụng." en="User research, intuitive interaction design, and modern implementation-ready interfaces." />
              </p>
            </div>
          </Reveal>

          {/* ===== Row B: the thread band (desktop) ===== */}
          <div className="hidden lg:block relative lg:col-span-5 h-[84px] border-r border-white/10 bg-white/[0.025]" aria-hidden="true">
            <span className="absolute left-[32px] top-[18px] bottom-0 w-px bg-white/15" />
            <BandNode nodeRef={refs.ba} top={18} shape="square" show={show} delay={delayOf('ba')} reduce={reduce} />
            <CoordLabel tone="dark" className="absolute left-[46px] top-[34px]">Business Requirement</CoordLabel>
          </div>
          <div className="hidden lg:block relative lg:col-span-4 h-[84px] border-r border-white/10" aria-hidden="true">
            <span className="absolute left-[32px] top-[42px] bottom-0 w-px bg-white/15" />
            <BandNode nodeRef={refs.ux} top={42} shape="circle" show={show} delay={delayOf('ux')} reduce={reduce} />
            <CoordLabel tone="dark" className="absolute left-[46px] top-[58px]">UX Flow</CoordLabel>
          </div>
          <div className="hidden lg:block relative lg:col-span-3 h-[84px] border-r border-white/10" aria-hidden="true">
            <span className="absolute left-[32px] top-[66px] bottom-0 w-px bg-white/15" />
            <BandNode nodeRef={refs.ui} top={66} shape="circle" show={show} delay={delayOf('ui')} reduce={reduce} />
            <CoordLabel tone="dark" className="absolute left-[46px] top-[12px]">Interface</CoordLabel>
          </div>

          {/* ===== Row C: core skills ===== */}
          {/* C1 — BA skills (largest group) */}
          <Reveal delay={0.12} className="order-2 lg:order-none lg:col-span-5 lg:border-r lg:border-b border-white/10 lg:px-8 lg:pb-8 mt-5 lg:mt-0 lg:bg-white/[0.025]">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
              {baSkills.map((s, i) => <CoreSkill key={i} i={i}>{s}</CoreSkill>)}
            </ul>
          </Reveal>

          {/* C2 — Product & UX */}
          <Reveal delay={0.18} className="order-4 lg:order-none lg:col-span-4 lg:border-r lg:border-b border-white/10 lg:px-8 lg:pb-8 mt-8 lg:mt-0">
            <div className="relative">
              <MobileNode shape="circle" />
              <h4 className="flex items-baseline gap-3 font-display text-[19px] leading-[27px] font-bold text-[#F5F7F8] mb-3">
                <GroupNo n="02" />
                <Bi vi="Sản phẩm & UX" en="Product & UX" />
              </h4>
            </div>
            <ul>
              {uxSkills.map((s, i) => <CoreSkill key={i} i={i}>{s}</CoreSkill>)}
            </ul>
          </Reveal>

          {/* C3 — UI & Design Systems */}
          <Reveal delay={0.24} className="order-5 lg:order-none lg:col-span-3 lg:border-r lg:border-b border-white/10 lg:px-8 lg:pb-8 mt-8 lg:mt-0">
            <div className="relative">
              <MobileNode shape="circle" />
              <h4 className="flex items-baseline gap-3 font-display text-[19px] leading-[27px] font-bold text-[#F5F7F8] mb-3">
                <GroupNo n="03" />
                <Bi vi="UI & Hệ thống thiết kế" en="UI & Design Systems" />
              </h4>
            </div>
            <ul>
              {uiSkills.map((s, i) => <CoreSkill key={i} i={i}>{s}</CoreSkill>)}
            </ul>
          </Reveal>

          {/* ===== Row D: supporting layer ===== */}
          {/* D1 — Tools & AI-assisted workflow (matrix) */}
          <div className="order-7 lg:order-none relative lg:col-span-7 lg:border-r lg:border-b border-white/10 lg:px-8 lg:pt-7 lg:pb-7 mt-12 lg:mt-0">
            <span
              ref={refs.tools}
              className="hidden lg:block absolute top-0 left-[32px] -translate-x-1/2 -translate-y-1/2 w-[11px] h-[11px] rounded-full border-2 border-[#78A9D4] bg-ink z-[2]"
              aria-hidden="true"
            />
            <Crosshair className="hidden lg:block absolute -left-[8.5px] -top-[8.5px] z-[2]" />
            <Reveal delay={0.1}>
              <div className="relative">
                <MobileNode shape="hollow" />
                <div className="flex items-center gap-3">
                  <GroupNo n="05" tone="blue" />
                  <CoordLabel tone="dark">02.B</CoordLabel>
                </div>
                <h3 className="font-display text-[19px] leading-[27px] font-bold text-[#F5F7F8] mt-3">
                  <Bi vi="Công cụ & quy trình có AI hỗ trợ" en="Tools & AI-assisted workflow" />
                </h3>
                <p className="text-[15px] leading-[24px] text-[#94A6B8] mt-2 max-w-[52ch]">
                  <Bi vi="Sử dụng thành thạo các công cụ thiết kế, quản lý dự án và làm việc nhóm." en="Proficient in industry design systems, documentation, and agile team workflows." />
                </p>
              </div>
              <dl className="mt-5 border-t border-white/[0.09]">
                {toolGroups.map((g, gi) => (
                  <div key={gi} className="grid grid-cols-1 sm:grid-cols-[176px_1fr] gap-x-5 gap-y-1.5 py-2.5 border-b border-white/[0.09] last:border-b-0">
                    <dt className="text-[13px] leading-[22px] font-bold tracking-[0.08em] text-[#78A9D4]">{g.label}</dt>
                    <dd className="flex flex-wrap items-center gap-x-1 gap-y-1 text-[15px] leading-[22px] text-white/85">
                      {g.items.map((it, ii) => (
                        <span key={ii} className="inline-flex items-center whitespace-nowrap">
                          {ii > 0 && <span className="text-white/25 pr-2" aria-hidden="true">/</span>}
                          <span className="pr-2">{it}</span>
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* D2 — Collaboration & Delivery (soft skills) */}
          <div className="order-6 lg:order-none relative lg:col-span-5 lg:border-r lg:border-b border-white/10 lg:px-8 lg:pt-7 lg:pb-7 mt-12 lg:mt-0">
            <motion.span
              ref={refs.del}
              className="hidden lg:block absolute -top-[7.5px] left-[24.5px] w-[15px] h-[15px] rounded-full border-2 border-[#FF7A1A] bg-ink z-[2]"
              initial={reduce ? false : { opacity: 0, scale: 0.4 }}
              animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
              transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : delayOf('del'), ease: EASE }}
              aria-hidden="true"
            />
            <Crosshair className="hidden lg:block absolute -left-[8.5px] -top-[8.5px] z-[2]" />
            <Reveal delay={0.16}>
              <div className="relative">
                <MobileNode shape="ring" />
                <div className="flex items-center gap-3">
                  <GroupNo n="04" />
                  <span className="text-[13px] leading-none font-bold tracking-[0.08em] text-[#94A6B8]">
                    <Bi vi="KỸ NĂNG MỀM" en="SOFT SKILLS" />
                  </span>
                </div>
                <h3 className="font-display text-[19px] leading-[27px] font-bold text-[#F5F7F8] mt-3">
                  <Bi vi="Phối hợp & bàn giao" en="Collaboration & Delivery" />
                </h3>
              </div>
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 border-t border-white/[0.09]">
                {softSkills.map((sk, i) => (
                  <li key={i} className="flex items-start gap-2.5 py-1.5 border-b border-white/[0.06] text-[15px] leading-[22px] text-white/85">
                    <span className="mt-[8px] w-[5px] h-[5px] rounded-full border border-[#FF7A1A] flex-shrink-0" aria-hidden="true" />
                    <span>{sk}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
