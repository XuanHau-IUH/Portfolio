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

  const steps = t?.steps
    ? t.steps.map((st, idx) => ({
        ...st,
        icon: workProcess[idx]?.icon || 'Search',
      }))
    : workProcess;

  return (
    <section id="process" className="py-16 sm:py-20 md:py-24 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Section Title & Intro */}
          <div className="lg:col-span-4 text-left space-y-4 sm:space-y-5">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-100/80 px-3.5 py-1 rounded-full">
              {t?.badge || 'Quy trình'}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-normal leading-snug">
              {t?.title || 'Quy Trình Làm Việc'}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed sm:leading-loose">
              {t?.subtitle ||
                'Mỗi dự án đều tuân theo khung thiết kế lấy con người làm trung tâm, kết hợp chặt chẽ giữa phân tích nghiệp vụ, kiến trúc thông tin và thiết kế giao diện.'}
            </p>
            <div className="pt-1 sm:pt-2">
              <a
                href="#contact"
                className="inline-flex items-center min-h-[44px] text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors"
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
                  className="bg-white p-5 sm:p-6 md:p-7 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300 group text-left relative overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-sm">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-purple-500 transition-colors">
                        {item.step}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
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
