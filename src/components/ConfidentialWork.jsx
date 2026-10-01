import React from 'react';
import { Lock, FileText, Check } from 'lucide-react';
import Bi from './Bi';

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

export default function ConfidentialWork() {
  return (
    <section id="earlier-work" className="py-16 sm:py-20 md:py-24 relative bg-white border-t border-[#D9E2EC] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end pb-8 sm:pb-10 border-b border-[#D9E2EC]/80">
          <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-left">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full typo-eyebrow bg-[#FFF2E6] text-[#FF7A00] border border-[#FFD4B2]">
              <Lock className="w-4 h-4 flex-shrink-0" />
              <span><Bi vi="KINH NGHIỆM BA & DỰ ÁN BẢO MẬT" en="EARLIER & CONFIDENTIAL WORK" /></span>
            </span>
            <h2 className="typo-h2 text-[#102A43]">
              <Bi vi="Nền tảng Business Analysis" en="The Business Analysis" />{' '}
              <span className="text-[#FF7A00] block">
                <Bi vi="trước khi chuyển sang thiết kế" en="foundation before design" />
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5 text-left">
            <div className="border-l-2 border-[#FF7A00] pl-4 sm:pl-5 py-1">
              <p className="typo-small text-[#486581] max-w-[54ch]">
                <Bi
                  vi="Các dự án dưới đây chứa thông tin bảo mật của khách hàng nên không đăng tải giao diện sản phẩm. Đây là minh chứng cho nền tảng phân tích nghiệp vụ, không phải case study thiết kế đầy đủ."
                  en="The projects below contain confidential client information, so no product UI is shown. They are supporting evidence of my analysis foundation, not full design case studies."
                />
              </p>
            </div>
          </div>
        </div>

        {/* Entries */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-10 text-left">
          {entries.map((e) => (
            <article key={e.id} className="flex flex-col rounded-3xl border border-[#D9E2EC] bg-[#F8FAFC] p-6 sm:p-7">
              {/* Top row */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[14px] font-bold tracking-[0.08em] text-[#0E2A47]">{e.company}</span>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#627D98] border border-[#D9E2EC] bg-white rounded-xl px-2.5 py-1">
                  <Lock className="w-3.5 h-3.5" />
                  <span><Bi vi="BẢO MẬT" en="CONFIDENTIAL" /></span>
                </span>
              </div>

              <h3 className="text-[22px] leading-[30px] font-bold text-[#102A43] mt-4">
                <Bi vi={e.title.vi} en={e.title.en} />
              </h3>
              <p className="typo-caption text-[#E96800] mt-1.5">
                <Bi vi={e.type.vi} en={e.type.en} />
              </p>

              {e.scope && (
                <span className="inline-flex self-start mt-3 text-[13px] font-bold tracking-[0.06em] text-[#E96800] bg-[#FFF2E6] border border-[#FFD4B2] rounded-xl px-3 py-1">
                  <Bi vi={e.scope.vi} en={e.scope.en} />
                </span>
              )}

              <p className="typo-small text-[#486581] mt-4">
                <Bi vi={e.context.vi} en={e.context.en} />
              </p>

              {/* Abstract delivery flow */}
              <div className="mt-5 rounded-2xl border border-dashed border-[#BCCCDC] bg-white p-4">
                <div className="flex items-center gap-2 text-[13px] font-bold tracking-[0.06em] text-[#627D98] mb-3">
                  <FileText className="w-4 h-4 text-[#FF7A00]" />
                  <Bi vi="LUỒNG PHÂN TÍCH" en="ANALYSIS FLOW" />
                </div>
                <ol className="relative ml-1.5">
                  <span className="absolute left-[5px] top-2 bottom-2 w-px bg-[#FFD4B2]" aria-hidden="true" />
                  {e.flow.map((s, i) => (
                    <li key={i} className="relative flex items-center gap-3 py-1">
                      <span className="relative z-10 w-[11px] h-[11px] rounded-full bg-white border-2 border-[#FF7A00] flex-shrink-0" />
                      <span className="text-[15px] leading-[22px] font-semibold text-[#0E2A47]">
                        <span className="tabular-nums text-[#829AB1] mr-2">{String(i + 1).padStart(2, '0')}</span>
                        <Bi vi={s.vi} en={s.en} />
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Contribution */}
              <div className="mt-5">
                <div className="text-[13px] font-bold tracking-[0.06em] text-[#627D98] mb-2.5">
                  <Bi vi="ĐÓNG GÓP" en="CONTRIBUTION" />
                </div>
                <ul className="space-y-2">
                  {e.contribution.map((c, i) => (
                    <li key={i} className="flex items-start gap-2.5 typo-small text-[#334E68]">
                      <Check className="w-4 h-4 mt-[3px] text-[#FF7A00] flex-shrink-0" />
                      <span><Bi vi={c.vi} en={c.en} /></span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Capabilities */}
              <div className="mt-5 flex flex-wrap gap-2">
                {e.chips.map((c) => (
                  <span key={c} className="text-[13px] leading-[18px] font-semibold text-[#0E2A47] bg-white border border-[#D9E2EC] rounded-lg px-2.5 py-1">
                    {c}
                  </span>
                ))}
              </div>

              {/* NDA note */}
              <div className="mt-auto pt-5">
                <div className="flex items-start gap-2.5 border-t border-[#D9E2EC] pt-4 text-[14px] leading-[21px] text-[#627D98]">
                  <Lock className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#829AB1]" />
                  <p>
                    <span className="font-bold text-[#486581]"><Bi vi="DỰ ÁN BẢO MẬT" en="CONFIDENTIAL PROJECT" /></span>
                    <br />
                    <Bi vi={e.note.vi} en={e.note.en} />
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
