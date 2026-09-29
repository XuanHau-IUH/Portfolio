import React from 'react';
import {
  Search,
  Brain,
  ShieldCheck,
  GitFork,
  Palette,
  PlayCircle,
  CheckSquare,
  Code2,
  BarChart3,
  Rocket,
} from 'lucide-react';
import { workProcess } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

const iconMap = {
  Search,
  Brain,
  ShieldCheck,
  GitFork,
  Palette,
  PlayCircle,
  CheckSquare,
  Code2,
  BarChart3,
  Rocket,
};

export default function WorkProcess() {
  const { t: fullT } = useLanguage();
  const t = fullT?.process;

  // Use workProcess from projectsData as the single source of truth for which steps exist
  const steps = workProcess.map((wp, idx) => {
    const localized = t?.steps?.[idx];
    return {
      ...wp,
      title: localized?.title || wp.title,
      description: localized?.description || wp.description,
      step: localized?.step || wp.step || String(idx + 1).padStart(2, '0'),
      icon: wp.icon,
    };
  });

  return (
    <section id="process" className="py-16 sm:py-20 md:py-24 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Section Title & Intro */}
          <div className="lg:col-span-4 text-left space-y-4 sm:space-y-5">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-widest bg-amber-100/90 border border-amber-200/80 px-3.5 py-1 rounded-full">
              {t?.badge || 'Quy trình'}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-normal leading-snug">
              {t?.title || 'Quy Trình Làm Việc'}
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed sm:leading-loose">
              {t?.subtitle ||
                'Mỗi dự án đều tuân theo khung thiết kế lấy con người làm trung tâm, kết hợp chặt chẽ giữa phân tích nghiệp vụ, kiến trúc thông tin và thiết kế giao diện.'}
            </p>
            <div className="pt-1 sm:pt-2">
              <a
                href="#contact"
                className="inline-flex items-center min-h-[44px] text-sm font-semibold text-amber-800 hover:text-amber-900 transition-colors"
              >
                {t?.learnMore || 'Learn more about our methodology →'}
              </a>
            </div>
          </div>

          {/* Right Column: 8-Step Process Cards Grid (1 col mobile, 2 col tablet/desktop) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            {steps.map((item, idx) => {
              const IconComponent = iconMap[item.icon] || Search;
              return (
                <div
                  key={idx}
                  className="bg-white p-5 sm:p-6 md:p-7 rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl hover:shadow-stone-300/40 hover:border-amber-300 hover:-translate-y-1 transition-all duration-300 group text-left relative overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-amber-50 text-amber-800 border border-amber-200/60 flex items-center justify-center group-hover:bg-amber-800 group-hover:text-white transition-all duration-300 shadow-sm">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <span className="text-xs font-mono font-bold text-stone-400 group-hover:text-amber-700 transition-colors">
                        {item.step}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-2 group-hover:text-amber-800 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
