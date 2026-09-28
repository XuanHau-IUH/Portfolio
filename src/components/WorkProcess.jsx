import React from 'react';
import { 
  Search, 
  Brain, 
  ShieldCheck, 
  GitFork, 
  Palette, 
  PlayCircle, 
  CheckSquare, 
  Code2 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const stepIcons = [
  Search,
  Brain,
  ShieldCheck,
  GitFork,
  Palette,
  PlayCircle,
  CheckSquare,
  Code2,
];

export default function WorkProcess() {
  const { t } = useLanguage();

  return (
    <section id="process" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Section Title & Intro */}
          <div className="lg:col-span-4 text-left space-y-4 lg:sticky lg:top-28">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full">
              {t.process.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {t.process.title}
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              {t.process.subtitle}
            </p>
            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors"
              >
                {t.process.learnMore}
              </a>
            </div>
          </div>

          {/* Right Column: Process Cards Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {t.process.steps.map((item, idx) => {
              const IconComponent = stepIcons[idx] || Search;
              return (
                <div
                  key={idx}
                  className="bg-white p-7 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300 group text-left flex flex-col justify-between"
                >
                  <div>
                    {/* Process Icon */}
                    <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-sm mb-5">
                      <IconComponent className="w-6 h-6" />
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
