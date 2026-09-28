import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function CtaBanner() {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-24 bg-[#0F172A] relative overflow-hidden text-white">
      {/* Decorative background glow rings */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.cta.badge}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl mx-auto">
          {t.cta.title}
        </h2>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
          {t.cta.subtitle}
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#process"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-semibold text-base shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-105 transition-all duration-200"
          >
            <span>{t.cta.button}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-base border border-slate-700 transition-all duration-200"
          >
            <span>{t.nav.hireMe}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
