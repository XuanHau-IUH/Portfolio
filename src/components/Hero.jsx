import React from 'react';
import { ArrowRight, PenTool, Briefcase, FolderKanban, User } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import Bi from './Bi';

export default function Hero() {
  const { language, t: fullT } = useLanguage();
  const isVi = language === 'vi';
  const t = fullT?.hero;

  const stats = [
    {
      value: '1+',
      label: isVi ? 'Năm kinh nghiệm Business Analyst' : 'Years as a Business Analyst',
      icon: Briefcase,
    },
    {
      value: '~1',
      label: isVi ? 'Năm kinh nghiệm UI/UX Design' : 'Year as a UI/UX Designer',
      icon: PenTool,
    },
    {
      value: '7',
      label: isVi ? 'Dự án sản phẩm thực tế' : 'Real product projects',
      icon: FolderKanban,
    },
  ];

  return (
    <section id="home" className="relative pt-32 pb-14 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24 lg:pt-44 lg:pb-10 overflow-hidden bg-[#F8FAFC]">
      {/* Decorative blurred background aura */}
      <div className="absolute top-12 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-[#FF7A00]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 left-0 w-60 sm:w-80 h-60 sm:h-80 bg-[#0E2A47]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Intro & Content */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
            <div>
              {/* Eyebrow Pill */}
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full typo-eyebrow bg-[#FFF2E6] text-[#FF7A00] border border-[#FFD4B2] mb-3 sm:mb-4">
                <PenTool className="w-4 h-4 text-[#FF7A00] flex-shrink-0" />
                <span><Bi vi="BUSINESS ANALYST · UI/UX DESIGNER" en="BUSINESS ANALYST · UI/UX DESIGNER" /></span>
              </span>

              {/* Title & Name */}
              <h1 className="space-y-1">
                <span className="block text-[#102A43] typo-h1 font-bold">
                  <Bi vi="Xin chào, tôi là" en="Hello, I am" />
                </span>
                <span className="text-[#FF7A00] inline-block typo-display-xl font-bold py-0.5">
                  <Bi vi="Nguyễn Xuân Hậu" en="Nguyen Xuan Hau" />
                </span>
              </h1>

              {/* Role Title */}
              <div className="text-[19px] sm:text-[21px] leading-[30px] font-semibold text-[#0E2A47] mt-2 sm:mt-3">
                Business Analyst & UI/UX Designer
              </div>
            </div>

            {/* Value Statement */}
            <p className="typo-lead text-[#486581] max-w-[56ch] leading-relaxed sm:min-h-[90px]">
              <Bi vi="Tôi kết nối giữa nghiệp vụ và trải nghiệm người dùng, biến những business logic phức tạp thành sản phẩm số dễ sử dụng, hiệu quả và tạo giá trị thực tế cho người dùng." en="I bridge business logic and user experience, turning complex workflows and rules into digital products that are intuitive, efficient, and genuinely valuable." />
            </p>

            {/* CTA Buttons: Pill Shaped */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-[#FF7A00] hover:bg-[#E96800] text-white typo-button shadow-lg shadow-[#FF7A00]/25 hover:shadow-xl hover:shadow-[#FF7A00]/35 hover:-translate-y-0.5 transition-all duration-200 min-h-[48px] whitespace-nowrap cursor-pointer"
              >
                <span><Bi vi="Xem dự án của tôi" en="View My Work" /></span>
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </a>
            </div>

            {/* 3 Stats in a clean horizontal strip with icons */}
            <div className="pt-3 sm:pt-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#D9E2EC] bg-white border border-[#D9E2EC] rounded-2xl p-3 sm:p-5 shadow-sm">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="flex items-center gap-3.5 px-3 py-2 sm:py-0 first:pl-2 last:pr-2">
                      <div className="w-10 h-10 rounded-xl bg-[#FFF2E6] text-[#FF7A00] border border-[#FFD4B2] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[22px] sm:text-[24px] leading-tight font-bold text-[#0E2A47]">
                          {stat.value}
                        </div>
                        <div className="typo-caption text-[#627D98] font-medium mt-0.5 min-h-[38px]">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Portrait with Watermark, Note & Float Pill */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative mt-6 lg:mt-0">

            {/* Handwritten Note with Arrow */}
            <div className="absolute -top-16 sm:-top-[72px] right-0 sm:-right-4 z-20 hidden sm:flex flex-col items-end pointer-events-none">
              <div className="text-right text-[15px] font-medium text-slate-700 italic max-w-[290px] leading-snug">
                <Bi vi="“Biến nghiệp vụ phức tạp thành trải nghiệm đơn giản”" en="“Turning complex business logic into simple experiences”" />
              </div>
              <svg className="w-12 h-10 text-[#FF7A00] mt-1 mr-6" viewBox="0 0 50 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 38 4 C 28 15, 20 28, 12 36" />
                <path d="M 8 28 L 12 36 L 20 34" />
              </svg>
            </div>

            <div className="relative w-full max-w-[320px] sm:max-w-[380px] z-10">
              {/* Outer soft glow ring */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#FF7A00]/15 to-[#0E2A47]/15 rounded-3xl blur-2xl -z-10" />

              <div className="relative bg-white p-3 sm:p-4 rounded-3xl border border-[#D9E2EC] shadow-2xl shadow-slate-900/5">
                <div className="overflow-hidden rounded-2xl w-full aspect-[4/5] bg-gradient-to-b from-slate-100 to-slate-200 flex items-center justify-center">
                  <img
                    src={personalInfo.heroImage || personalInfo.avatar}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Floating Product Thinker Badge (Image 1 style) */}
                <div className="absolute -bottom-4 -left-3 sm:-bottom-5 sm:-left-4 bg-[#081B2E] text-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-3 max-w-[calc(100%-16px)]">
                  <div className="w-8 h-8 rounded-xl bg-[#FF7A00] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="text-left min-w-0">
                    <div className="text-[15px] font-bold text-white tracking-wide">
                      <Bi vi="Tư duy sản phẩm" en="Product Thinker" />
                    </div>
                    <div className="text-[14px] text-slate-300">
                      <Bi vi="Thiết kế lấy người dùng làm trung tâm" en="User-Centered Designer" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
