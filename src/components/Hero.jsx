import React from 'react';
import { ArrowRight, Sparkles, Send } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t: fullT } = useLanguage();
  const t = fullT?.hero;

  const stats = t?.stats || personalInfo.stats || [
    { value: 'BA → UX', label: 'Nghiệp vụ đến UI' },
    { value: '7 Dự án', label: 'Sản phẩm thực tế' },
    { value: 'Web · Mobile', label: 'Đa nền tảng' },
  ];

  return (
    <section id="home" className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 md:pt-40 md:pb-28 lg:pt-44 lg:pb-32 overflow-hidden bg-mesh-radial">
      {/* Decorative blurred background aura */}
      <div className="absolute top-12 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 left-0 w-60 sm:w-80 h-60 sm:h-80 bg-stone-300/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          {/* Left Column: Intro & Content */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-100/90 text-amber-900 border border-amber-200/70 mb-3 sm:mb-4">
                <Sparkles className="w-3.5 h-3.5 text-amber-800 flex-shrink-0" />
                <span className="truncate">{t?.badge || personalInfo.availability || 'Sẵn sàng cho các vị trí Product & UI/UX Designer'}</span>
              </span>

              {/* Spacious, elegant typography without clipped diacritics */}
              <h1 className="font-extrabold text-stone-900 tracking-normal">
                <span className="block text-stone-800 mb-2 sm:mb-3 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-normal">
                  {t?.greeting || "Xin chào, tôi là"}
                </span>
                <span className="text-amber-800 tracking-normal inline-block text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight py-1 font-extrabold">
                  {t?.name || personalInfo.name}
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg md:text-xl text-stone-600 max-w-xl leading-relaxed sm:leading-loose font-normal">
              {t?.subtitle || personalInfo.subtitle}
            </p>

            {/* CTA Buttons: Stack on mobile, inline on tablet & desktop */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-semibold text-sm sm:text-base shadow-lg shadow-amber-900/20 hover:shadow-xl hover:shadow-amber-900/30 hover:-translate-y-0.5 transition-all duration-200 min-h-[48px] whitespace-nowrap"
              >
                <span>{t?.sayHello || 'Liên hệ ngay'}</span>
                <Send className="w-4 h-4 flex-shrink-0" />
              </a>

              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-xl bg-white hover:bg-amber-50/70 text-stone-700 hover:text-amber-800 font-semibold text-sm sm:text-base border border-stone-300 hover:border-amber-300 shadow-sm transition-all duration-200 min-h-[48px] whitespace-nowrap"
              >
                <span>{t?.viewPortfolio || 'Xem dự án'}</span>
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </a>
            </div>

            {/* Stats Row: Compact on mobile, spacious on tablet/desktop */}
            <div className="pt-2 sm:pt-4">
              <div className="grid grid-cols-3 divide-x divide-stone-200 bg-stone-100/90 border border-stone-200 rounded-2xl p-2.5 sm:p-4 md:p-5 shadow-sm text-center sm:text-left">
                {stats.map((stat, idx) => (
                  <div key={idx} className="px-1.5 sm:px-3 md:px-4 py-1 sm:py-0 first:pl-1 sm:first:pl-2 last:pr-1 sm:last:pr-2 min-w-0">
                    <div
                      className="text-xs min-[360px]:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-extrabold text-amber-800 tracking-tight whitespace-nowrap overflow-hidden text-ellipsis leading-tight"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-[10px] min-[360px]:text-[11px] sm:text-xs md:text-sm font-medium text-stone-600 truncate whitespace-nowrap mt-0.5 sm:mt-1"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Portrait with Aura */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative mt-4 lg:mt-0">
            <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-none">
              {/* Outer soft glow ring */}
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-300/30 to-stone-300/30 rounded-3xl blur-2xl -z-10" />

              <div className="relative bg-white/80 p-3 sm:p-4 rounded-3xl border border-stone-200 shadow-2xl shadow-stone-300/30">
                <div className="overflow-hidden rounded-2xl w-full aspect-[4/5] bg-stone-100 flex items-center justify-center">
                  <img
                    src={personalInfo.heroImage || personalInfo.avatar}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Floating Experience Badge */}
                <div className="absolute -bottom-3 -left-2 sm:-bottom-4 sm:-left-4 bg-white/95 backdrop-blur-md px-3.5 py-2.5 sm:px-5 sm:py-3 rounded-2xl shadow-lg border border-stone-200 flex items-center gap-2.5 sm:gap-3 max-w-[calc(100%-16px)]">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-800 text-white flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0 shadow-sm">
                    UX
                  </div>
                  <div className="text-left min-w-0">
                    <div className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wider truncate">
                      {t?.specialty || 'Chuyên môn'}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-stone-900 mt-0.5 truncate">
                      {t?.specialtyTitle || personalInfo.specialty || 'Thiết kế BA & UX'}
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
