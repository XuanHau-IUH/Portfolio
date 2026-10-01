import React from 'react';
import { Search, FileText, Lightbulb, Layout, Settings, Rocket, Workflow, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Bi from './Bi';

export default function WorkProcess() {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  const steps = [
    {
      num: '01',
      icon: Search,
      title: <Bi vi="Khám phá & Hiểu vấn đề" en="Discover & Understand" />,
    },
    {
      num: '02',
      icon: FileText,
      title: <Bi vi="Phân tích & Làm rõ yêu cầu" en="Analyze & Clarify Rules" />,
    },
    {
      num: '03',
      icon: Lightbulb,
      title: <Bi vi="Thiết kế giải pháp" en="Conceptualize Solution" />,
    },
    {
      num: '04',
      icon: Layout,
      title: <Bi vi="Thiết kế chi tiết & nguyên mẫu" en="Detail Design & Prototype" />,
    },
    {
      num: '05',
      icon: Settings,
      title: <Bi vi="Kiểm thử & Tối ưu" en="Usability Test & Refine" />,
    },
    {
      num: '06',
      icon: Rocket,
      title: <Bi vi="Triển khai & Đo lường giá trị" en="Deploy & Measure Impact" />,
    },
  ];

  return (
    <section id="process" className="py-16 sm:py-20 md:py-24 lg:py-24 relative bg-white border-b border-[#D9E2EC]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end pb-8 sm:pb-12 border-b border-[#D9E2EC]/80">
          <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-left">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full typo-eyebrow bg-[#FFF2E6] text-[#FF7A00] border border-[#FFD4B2]">
              <Workflow className="w-4 h-4 text-[#FF7A00] flex-shrink-0" />
              <span><Bi vi="QUY TRÌNH LÀM VIỆC" en="WORK PROCESS" /></span>
            </span>

            <h2 className="typo-h2 text-[#102A43]">
              <Bi vi="Từ vấn đề đến" en="From Business Problem to" />{' '}
              <span className="text-[#FF7A00] block">
                <Bi vi="sản phẩm hoàn thiện" en="Polished Product" />
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 text-left">
            <div className="border-l-2 border-[#FF7A00] pl-4 sm:pl-5 py-1">
              <p className="typo-lead text-[#486581] max-w-[54ch]">
                <Bi vi="Quy trình làm việc giúp tôi đảm bảo sản phẩm được phát triển có định hướng, đúng nhu cầu và đạt chất lượng cao." en="A structured, evidence-backed workflow ensuring products align with business goals and user ergonomics." />
              </p>
            </div>
          </div>
        </div>

        {/* 6 Connected Steps Grid (Image 1 style) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 mt-10 sm:mt-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative bg-white p-4 sm:p-5 rounded-2xl border border-[#D9E2EC] shadow-2xs hover:shadow-md hover:border-[#FF7A00] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left group"
              >
                <div>
                  {/* Top Bar: Icon + Step Number */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FFF2E6] text-[#FF7A00] border border-[#FFD4B2] flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF7A00] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="tabular-nums text-xs font-bold text-slate-400 group-hover:text-[#FF7A00] transition-colors">
                      {step.num}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-[14px] sm:text-[15px] leading-[22px] font-bold text-[#102A43] group-hover:text-[#0E2A47] transition-colors mt-2">
                    {step.title}
                  </h3>
                </div>

                {/* Chevron connector sitting in the gap between cards */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-[22px] top-1/2 -translate-y-1/2 z-10 w-7 h-7 items-center justify-center rounded-full bg-white border border-[#FFD4B2] text-[#FF7A00] shadow-sm" aria-hidden="true">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
