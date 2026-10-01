import React from 'react';
import { Layers, Network, Wrench, LayoutGrid, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Bi from './Bi';

export default function Services() {
  const { language, t: fullT } = useLanguage();
  const isVi = language === 'vi';
  const t = fullT?.services;

  const capabilities = [
    {
      id: 'uiux',
      icon: Layers,
      iconBg: 'bg-[#FFF2E6] text-[#FF7A00] border-[#FFD4B2]',
      title: <Bi vi="Thiết kế sản phẩm & UI/UX" en="Product & UI/UX Design" />,
      description: <Bi vi="Nghiên cứu người dùng, thiết kế trải nghiệm và giao diện sản phẩm số hiện đại, dễ sử dụng." en="User research, intuitive interaction design, and modern implementation-ready interfaces." />,
      tags: [
        <Bi vi="Nghiên cứu người dùng" en="User Research" />,
        <Bi vi="Thiết kế UI/UX" en="UI/UX Design" />,
        <Bi vi="Tạo nguyên mẫu" en="Prototyping" />,
        <Bi vi="Hệ thống thiết kế" en="Design System" />,
        <Bi vi="Kiểm thử khả dụng" en="Usability Testing" />,
        <Bi vi="Kiến trúc thông tin" en="Information Architecture" />,
      ],
    },
    {
      id: 'ba',
      icon: Network,
      iconBg: 'bg-blue-50 text-[#0E2A47] border-blue-200',
      title: <Bi vi="Phân tích nghiệp vụ & tư duy hệ thống" en="Business Analysis & System Thinking" />,
      description: <Bi vi="Phân tích yêu cầu, mô hình hóa nghiệp vụ và đề xuất giải pháp hệ thống hiệu quả." en="Requirement analysis, business flow modeling, and scalable system solution architecture." />,
      tags: [
        <Bi vi="Phân tích yêu cầu" en="Requirement Analysis" />,
        <Bi vi="Luồng nghiệp vụ" en="Business Flow" />,
        <Bi vi="Ca sử dụng & câu chuyện người dùng" en="Use Case & User Story" />,
        <Bi vi="Mô hình hóa quy trình" en="Process Modeling" />,
        <Bi vi="Thiết kế hệ thống" en="System Design" />,
        <Bi vi="Vai trò & phân quyền" en="Roles & Permissions" />,
      ],
    },
    {
      id: 'tools',
      icon: Wrench,
      iconBg: 'bg-[#FFF2E6] text-[#FF7A00] border-[#FFD4B2]',
      title: <Bi vi="Công cụ & quy trình làm việc" en="Tools & Workflow" />,
      description: <Bi vi="Sử dụng thành thạo các công cụ thiết kế, quản lý dự án và làm việc nhóm." en="Proficient in industry design systems, documentation, and agile team workflows." />,
      toolGroups: [
        {
          label: <Bi vi="CÔNG CỤ" en="TOOLS" />,
          items: ['Jira', 'Figma', 'Draw.io', 'Visual Paradigm', 'MySQL', 'Microsoft Office'],
        },
        {
          label: <Bi vi="KIẾN THỨC NỀN" en="TECHNICAL FOUNDATION" />,
          items: [
            (isVi ? "SQL" : "SQL"),
            (isVi ? "Cơ sở dữ liệu" : "Databases"),
            (isVi ? "API cơ bản" : "API basics"),
          ],
        },
        {
          label: <Bi vi="AI HỖ TRỢ" en="AI TOOLS" />,
          items: ['ChatGPT', 'Codex', 'Claude', 'Stitch'],
        },
      ],
    },
  ];

  const softSkills = [
    (isVi ? "Giao tiếp với stakeholder" : "Stakeholder communication"),
    (isVi ? "Làm rõ yêu cầu" : "Requirement clarification"),
    (isVi ? "Phối hợp đa chức năng" : "Cross-functional collaboration"),
    (isVi ? "Giải quyết vấn đề có cấu trúc" : "Structured problem solving"),
    (isVi ? "Chủ động & có trách nhiệm" : "Ownership & proactivity"),
    (isVi ? "Chú ý chi tiết" : "Attention to detail"),
    (isVi ? "Cân nhắc đánh đổi khi ra quyết định sản phẩm" : "Product trade-off thinking"),
  ];

  return (
    <section id="services" className="py-16 sm:py-20 md:py-24 lg:py-24 relative bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end pb-8 sm:pb-12 border-b border-[#D9E2EC]/80">
          <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-left">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full typo-eyebrow bg-[#FFF2E6] text-[#FF7A00] border border-[#FFD4B2]">
              <LayoutGrid className="w-4 h-4 text-[#FF7A00] flex-shrink-0" />
              <span><Bi vi="KỸ NĂNG CHUYÊN MÔN" en="CORE CAPABILITIES" /></span>
            </span>

            <h2 className="typo-h2 text-[#102A43]">
              <Bi vi="Nền tảng tạo nên" en="The Foundation for" />{' '}
              <span className="text-[#FF7A00] block">
                <Bi vi="sản phẩm tốt hơn" en="Better Products" />
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 text-left">
            <div className="border-l-2 border-[#FF7A00] pl-4 sm:pl-5 py-1">
              <p className="typo-lead text-[#486581] max-w-[54ch]">
                <Bi vi="Sự kết hợp giữa tư duy nghiệp vụ, thiết kế trải nghiệm và công cụ phù hợp giúp tôi xây dựng sản phẩm toàn diện hơn, từ chiến lược đến chi tiết giao diện." en="Bridging business thinking, user experience design, and modern tooling enables me to build comprehensive digital products from strategy down to interaction details." />
              </p>
            </div>
          </div>
        </div>

        {/* 3 Capabilities Cards (Image 1 3-column layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 mt-10 sm:mt-12 text-left">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.id}
                className="bg-white rounded-3xl p-6 sm:p-7 md:p-8 border border-[#D9E2EC] shadow-sm hover:shadow-xl hover:shadow-slate-900/5 hover:border-[#FF7A00] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Icon + Number */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs ${cap.iconBg} group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="tabular-nums text-xs font-bold text-slate-400 group-hover:text-[#FF7A00] transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title: 19px / 28px / 600 */}
                  <h3 className="text-[19px] leading-[28px] font-bold text-[#102A43] group-hover:text-[#0E2A47] transition-colors">
                    {cap.title}
                  </h3>

                  {/* Description: 14px / 22px / 400 */}
                  <p className="typo-small text-[#627D98] mt-2.5 leading-relaxed">
                    {cap.description}
                  </p>

                  {/* Tags or Tools Chips */}
                  {cap.tags && (
                    <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-slate-100">
                      {cap.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 text-[#0E2A47] border border-[#D9E2EC] group-hover:border-slate-300 transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {cap.toolGroups && (
                    <div className="pt-6 mt-6 border-t border-slate-100 space-y-4">
                      {cap.toolGroups.map((g, gIdx) => (
                        <div key={gIdx}>
                          <div className="text-[13px] font-bold tracking-[0.06em] text-[#829AB1] mb-2">{g.label}</div>
                          <div className="flex flex-wrap gap-2">
                            {g.items.map((it, iIdx) => (
                              <span
                                key={iIdx}
                                className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 text-[#0E2A47] border border-[#D9E2EC]"
                              >
                                {it}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Soft skills */}
        <div className="mt-6 sm:mt-8 rounded-3xl border border-[#D9E2EC] bg-white p-6 sm:p-7 text-left">
          <div className="text-[13px] font-bold tracking-[0.06em] text-[#FF7A00] mb-4">
            <Bi vi="KỸ NĂNG MỀM" en="SOFT SKILLS" />
          </div>
          <div className="flex flex-wrap gap-2.5">
            {softSkills.map((sk, i) => (
              <span key={i} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold bg-[#F8FAFC] text-[#0E2A47] border border-[#D9E2EC]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
                {sk}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
