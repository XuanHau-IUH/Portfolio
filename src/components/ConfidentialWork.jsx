import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Lock, FileText } from 'lucide-react';
import Bi from './Bi';
import { useLanguage } from '../context/LanguageContext';
import Chapter, { ChapterHeader } from './ui/Chapter';
import Reveal from './ui/Reveal';
import { CropMarks } from './ui/Technical';

const entries = [
  {
    id: 'is-group',
    company: 'IS GROUP',
    type: { vi: 'Phân tích nghiệp vụ · Retail · E-commerce · POS', en: 'Business Analysis · Retail · E-commerce · POS' },
    title: { vi: 'Phân tích nghiệp vụ Retail & E-commerce', en: 'Retail & E-commerce Business Analysis' },
    scope: null,
    context: {
      vi: 'Tham gia phân tích các sản phẩm Retail và E-commerce, tập trung chuyển yêu cầu nghiệp vụ thành tài liệu, flow và wireframe để đội phát triển có thể triển khai.',
      en: 'Analyzed Retail and E-commerce products, turning business requirements into documents, flows and wireframes the development team could build from.',
    },
    flow: [
      { vi: 'Yêu cầu', en: 'Requirement' },
      { vi: 'Quy trình nghiệp vụ', en: 'Business Process' },
      { vi: 'BRD / SRS', en: 'BRD / SRS' },
      { vi: 'Use Case / Flow', en: 'Use Case / Flow' },
      { vi: 'Wireframe', en: 'Wireframe' },
      { vi: 'Làm rõ với Dev', en: 'Dev Clarification' },
      { vi: 'UAT', en: 'UAT' },
    ],
    contribution: [
      { vi: 'Thu thập và làm rõ yêu cầu với stakeholder.', en: 'Gathered and clarified requirements with stakeholders.' },
      { vi: 'Phân tích quy trình nghiệp vụ cho các luồng Retail, E-commerce và POS.', en: 'Analyzed business processes across Retail, E-commerce and POS flows.' },
      { vi: 'Xây dựng BRD, SRS và Use Case.', en: 'Authored BRD, SRS and Use Case documents.' },
      { vi: 'Mô hình hóa luồng nghiệp vụ và luồng người dùng.', en: 'Modeled business and user flows.' },
      { vi: 'Xây dựng Wireframe và Prototype bằng Figma.', en: 'Built wireframes and prototypes in Figma.' },
      { vi: 'Đề xuất hướng xử lý workflow và hỗ trợ đánh giá tính khả thi của tính năng.', en: 'Proposed workflow approaches and supported feature feasibility assessment.' },
      { vi: 'Phối hợp Developer và QA để làm rõ yêu cầu.', en: 'Worked with Developers and QA to clarify requirements.' },
      { vi: 'Hỗ trợ UAT trước khi triển khai.', en: 'Supported UAT before release.' },
    ],
    chips: ['Requirement Analysis', 'BRD / SRS', 'Use Case', 'Business Process', 'User Flow', 'Wireframe', 'Prototype', 'UAT'],
    note: { vi: 'Giao diện của khách hàng không thể công khai.', en: 'Client UI cannot be publicly disclosed.' },
  },
  {
    id: 'dotb',
    company: 'DOTB',
    type: { vi: 'Hỗ trợ phân tích nghiệp vụ · CRM / EMS', en: 'Business Analysis Support · CRM / EMS' },
    title: { vi: 'Đóng góp phân tích nghiệp vụ cho EdTech', en: 'EdTech Business Analysis Contribution' },
    scope: { vi: 'ĐÓNG GÓP CHO MỘT SỐ TÍNH NĂNG ĐƯỢC GIAO', en: 'SELECTED FEATURE CONTRIBUTION' },
    context: {
      vi: 'Tham gia hỗ trợ phân tích một số enhancement trong hệ thống CRM / EMS thuộc domain EdTech, tập trung vào làm rõ yêu cầu, phân tích ảnh hưởng và chuẩn hóa tài liệu trước khi chuyển cho đội phát triển.',
      en: 'Supported the analysis of selected enhancements in a CRM / EMS system in the EdTech domain, focusing on clarifying requirements, analyzing impact and standardizing documentation before handing over to the development team.',
    },
    flow: [
      { vi: 'Yêu cầu thay đổi', en: 'Change Request' },
      { vi: 'Phân tích ảnh hưởng', en: 'Impact Analysis' },
      { vi: 'Làm rõ yêu cầu', en: 'Requirement Clarification' },
      { vi: 'Tài liệu hóa', en: 'Documentation' },
      { vi: 'Hỗ trợ Dev / QA', en: 'Dev / QA Support' },
    ],
    contribution: [
      { vi: 'Tiếp nhận và làm rõ change request trong phạm vi được giao.', en: 'Received and clarified change requests within the assigned scope.' },
      { vi: 'Phân tích luồng nghiệp vụ hiện tại và mức ảnh hưởng của enhancement.', en: 'Analyzed the current business flow and the impact of each enhancement.' },
      { vi: 'Trao đổi với stakeholder / đội nội bộ để thống nhất hành vi mong đợi.', en: 'Aligned on expected behavior with stakeholders and the internal team.' },
      { vi: 'Hỗ trợ chuẩn bị hoặc cập nhật BRD, SRS, User Story / Product Backlog.', en: 'Helped prepare or update BRD, SRS and User Story / Product Backlog.' },
      { vi: 'Mô hình hóa flow bằng BPMN / Activity Diagram khi cần.', en: 'Modeled flows with BPMN / Activity Diagrams when needed.' },
      { vi: 'Dùng wireframe / mockup để hỗ trợ diễn giải yêu cầu.', en: 'Used wireframes / mockups to help explain requirements.' },
      { vi: 'Phối hợp Developer và QA trong làm rõ yêu cầu và UAT.', en: 'Collaborated with Developers and QA on clarification and UAT.' },
    ],
    chips: ['Change Request Analysis', 'Impact Analysis', 'BRD / SRS', 'User Story', 'BPMN', 'Wireframe', 'Dev / QA Clarification', 'UAT Support'],
    note: { vi: 'Giao diện sản phẩm và tài liệu nội bộ không thể công khai.', en: 'Product UI and internal documentation cannot be publicly disclosed.' },
  },
];

const EASE = [0.22, 1, 0.36, 1];

/**
 * Renders a whole block once per language in the same grid cell (inactive one invisible),
 * so list items never get per-item gaps and VI/EN heights stay identical.
 */
function BiSwap({ render }) {
  const { language } = useLanguage();
  return (
    <div className="grid">
      {['vi', 'en'].map((l) => (
        <div key={l} lang={l} aria-hidden={language !== l} className={`[grid-area:1/1] min-w-0 ${language === l ? '' : 'invisible select-none pointer-events-none'}`}>
          {render(l)}
        </div>
      ))}
    </div>
  );
}

/**
 * Analysis flow drawn as the orange logic thread: each connector draws before the next node appears.
 * Horizontal on desktop, vertical on smaller screens.
 */
function AnalysisFlow({ steps }) {
  const reduce = useReducedMotion();
  const n = steps.length;
  return (
    <motion.ol
      className="relative grid grid-cols-1 lg:grid-flow-col lg:auto-cols-fr lg:gap-x-3"
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      {steps.map((s, i) => {
        const last = i === n - 1;
        const at = 0.1 + i * 0.16;
        return (
          <li key={i} className="relative flex lg:flex-col items-start gap-3 lg:gap-4 pb-4 lg:pb-0 lg:pr-2">
            {!last && (
              <>
                <motion.span
                  aria-hidden="true"
                  className="hidden lg:block absolute top-[7px] left-[15px] w-[calc(100%-3px)] h-[1.5px] bg-[#FF7A1A] origin-left"
                  variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.22, delay: at + 0.08, ease: 'easeInOut' } } }}
                />
                <motion.span
                  aria-hidden="true"
                  className="lg:hidden absolute left-[7px] top-[15px] h-full w-[1.5px] bg-[#FF7A1A] origin-top"
                  variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.22, delay: at + 0.08, ease: 'easeInOut' } } }}
                />
              </>
            )}
            <motion.span
              aria-hidden="true"
              className={`relative z-10 w-[15px] h-[15px] rounded-full flex-shrink-0 border-2 border-[#FF7A1A] ${last ? 'bg-[#FF7A1A] ring-4 ring-[#FF7A1A]/20' : 'bg-[#FBF8F2]'}`}
              variants={{ hidden: { opacity: 0, scale: 0.4 }, show: { opacity: 1, scale: 1, transition: { duration: 0.3, delay: at, ease: EASE } } }}
            />
            <motion.span
              className="min-w-0 -mt-[3px] lg:mt-0"
              variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, delay: at + 0.04, ease: EASE } } }}
            >
              <span className="block text-[13px] leading-[16px] font-semibold tabular-nums tracking-[0.12em] text-[#627D98]">{String(i + 1).padStart(2, '0')}</span>
              <span className="block mt-1 text-[15px] leading-[21px] font-semibold text-[#102A43]">
                <Bi vi={s.vi} en={s.en} />
              </span>
            </motion.span>
          </li>
        );
      })}
    </motion.ol>
  );
}

function Label({ children }) {
  return (
    <div className="flex items-center gap-3 text-[13px] leading-[16px] font-bold tracking-[0.14em] text-[#486581] mb-5">
      <span className="w-6 h-px bg-[#FF7A1A]" aria-hidden="true" />
      {children}
    </div>
  );
}

/** NDA treatment: redacted lines + lock note. Bars are decorative. */
function Redacted({ note }) {
  return (
    <div className="relative rounded-xl border border-dashed border-[#061826]/25 p-5 bg-[repeating-linear-gradient(135deg,transparent_0_10px,rgba(6,24,38,0.035)_10px_11px)]">
      <div className="space-y-2 mb-5" aria-hidden="true">
        {['94%', '78%', '86%', '42%'].map((w, i) => (
          <span key={i} className="block h-2.5 rounded-[3px] bg-[#061826]/[0.13]" style={{ width: w }} />
        ))}
      </div>
      <div className="flex items-start gap-3 text-[14px] leading-[21px] text-[#486581]">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#061826]/25 bg-[#FBF8F2] flex-shrink-0">
          <Lock className="w-3.5 h-3.5 text-[#334E68]" aria-hidden="true" />
        </span>
        <p>
          <span className="font-bold tracking-[0.06em] text-[#334E68]"><Bi vi="DỰ ÁN BẢO MẬT" en="CONFIDENTIAL PROJECT" /></span>
          <br />
          <Bi vi={note.vi} en={note.en} />
        </p>
      </div>
    </div>
  );
}

function Sheet({ e, idx }) {
  const code = `05.${String.fromCharCode(65 + idx)}`;
  return (
    <article
      aria-labelledby={`conf-${e.id}-title`}
      className={`relative bg-[#FBF8F2] border border-[#061826]/12 shadow-[0_28px_56px_-44px_rgba(6,24,38,0.45)] ${idx % 2 ? 'lg:ml-[7%]' : 'lg:mr-[7%]'}`}
    >
      <CropMarks tone="light" size={12} className="-inset-3" />

      {/* Sheet header: document code + stamp */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 sm:px-10 py-4 border-b border-[#061826]/10">
        <div className="flex items-center gap-3 text-[13px] leading-none font-semibold tracking-[0.14em] text-[#486581] tabular-nums">
          <FileText className="w-4 h-4" aria-hidden="true" />
          <span>DOC {code}</span>
          <span className="w-8 h-px bg-[#061826]/25" aria-hidden="true" />
          <span className="text-[#0B2235]">{e.company}</span>
        </div>
        <span className="inline-flex items-center gap-1.5 -rotate-2 text-center text-[13px] leading-none font-bold tracking-[0.16em] text-[#B5560A] border-2 border-[#C25E0A]/70 rounded-[4px] px-3 py-1.5">
          <Lock className="w-3.5 h-3.5" aria-hidden="true" />
          <Bi vi="BẢO MẬT" en="CONFIDENTIAL" />
        </span>
      </div>

      {/* Title block + context */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 px-6 sm:px-10 pt-8 lg:pt-10 pb-8">
        <div className="lg:col-span-5 min-w-0">
          <p aria-hidden="true" className="font-display font-extrabold tracking-[-0.04em] leading-[0.88] text-[#061826] text-[52px] sm:text-[68px] lg:text-[clamp(64px,6.4vw,96px)]">
            {e.company}
          </p>
          <h3 id={`conf-${e.id}-title`} className="mt-5 font-display text-[22px] leading-[30px] font-bold text-[#102A43]">
            <Bi vi={e.title.vi} en={e.title.en} />
          </h3>
          <p className="typo-caption text-[#B5560A] mt-2">
            <Bi vi={e.type.vi} en={e.type.en} />
          </p>
          {e.scope && (
            <span className="inline-flex mt-4 text-[13px] font-bold tracking-[0.08em] text-[#B5560A] border border-dashed border-[#C25E0A]/60 rounded-[4px] px-2.5 py-1">
              <Bi vi={e.scope.vi} en={e.scope.en} />
            </span>
          )}
        </div>
        <div className="lg:col-span-7 min-w-0 flex flex-col gap-6 lg:pt-3">
          <p className="text-[17px] leading-[28px] text-[#334E68] max-w-[62ch]">
            <Bi vi={e.context.vi} en={e.context.en} />
          </p>
          <Redacted note={e.note} />
        </div>
      </div>

      {/* Analysis flow as the logic thread */}
      <div className="px-6 sm:px-10 py-8 border-t border-dashed border-[#061826]/20">
        <Label><Bi vi="LUỒNG PHÂN TÍCH" en="ANALYSIS FLOW" /></Label>
        <AnalysisFlow steps={e.flow} />
      </div>

      {/* Contribution + capability spec */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 px-6 sm:px-10 pt-8 pb-10 border-t border-dashed border-[#061826]/20">
        <div className="lg:col-span-8 min-w-0">
          <Label><Bi vi="ĐÓNG GÓP" en="CONTRIBUTION" /></Label>
          <BiSwap
            render={(l) => (
              <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
                {e.contribution.map((c, i) => (
                  <li key={i} className="flex items-start gap-3 typo-small text-[#334E68]">
                    <span className="mt-[2px] text-[13px] leading-[20px] font-bold tabular-nums text-[#B5560A] flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <span>{c[l]}</span>
                  </li>
                ))}
              </ol>
            )}
          />
        </div>
        <ul className="lg:col-span-4 min-w-0 flex flex-wrap lg:flex-col gap-2 lg:gap-0 lg:border-l lg:border-[#061826]/12 lg:pl-8" aria-label="Skills">
          {e.chips.map((c) => (
            <li
              key={c}
              className="font-mono text-[13px] leading-[18px] font-medium text-[#334E68] border border-[#061826]/15 rounded-[4px] px-2.5 py-1 lg:border-0 lg:border-b lg:border-dashed lg:rounded-none lg:px-0 lg:py-2 lg:flex lg:items-center lg:gap-3"
            >
              <span className="hidden lg:inline-block w-1.5 h-1.5 rounded-full border border-[#FF7A1A]" aria-hidden="true" />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function ConfidentialWork() {
  return (
    <Chapter id="earlier-work" number="05" variant="light" labelledBy="earlier-work-title">
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
        <Reveal className="lg:col-span-7">
          <ChapterHeader
            number="05"
            titleId="earlier-work-title"
            label={<Bi vi="KINH NGHIỆM BA & DỰ ÁN BẢO MẬT" en="EARLIER & CONFIDENTIAL WORK" />}
            title={
              <Bi
                vi={<>Nền tảng Business Analysis <span className="block text-[#FF7A1A]">trước khi chuyển sang thiết kế</span></>}
                en={<>The Business Analysis <span className="block text-[#FF7A1A]">foundation before design</span></>}
              />
            }
          />
        </Reveal>
        <Reveal delay={0.12} className="lg:col-span-5">
          <div className="relative border-l border-dashed border-[#061826]/35 pl-5 sm:pl-6 py-1">
            <span className="absolute -left-[4px] top-[6px] w-[7px] h-[7px] rounded-full bg-[#FF7A1A]" aria-hidden="true" />
            <div className="flex items-start gap-3">
              <Lock className="w-4 h-4 mt-[3px] flex-shrink-0 text-[#B5560A]" aria-hidden="true" />
              <p className="typo-small text-[#486581] max-w-[54ch]">
                <Bi
                  vi="Các dự án dưới đây chứa thông tin bảo mật của khách hàng nên không đăng tải giao diện sản phẩm. Đây là minh chứng cho nền tảng phân tích nghiệp vụ, không phải case study thiết kế đầy đủ."
                  en="The projects below contain confidential client information, so no product UI is shown. They are supporting evidence of my analysis foundation, not full design case studies."
                />
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Dossier sheets, offset like stacked documents */}
      <div className="mt-12 lg:mt-16 space-y-10 lg:space-y-14 text-left">
        {entries.map((e, idx) => (
          <Reveal key={e.id} delay={idx * 0.08} amount={0.08}>
            <Sheet e={e} idx={idx} />
          </Reveal>
        ))}
      </div>
    </Chapter>
  );
}
