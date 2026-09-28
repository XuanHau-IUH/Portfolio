import React from 'react';
import { ArrowRight, Sparkles, Send } from 'lucide-react';
import { personalInfo } from '../data/projectsData';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-mesh-radial">
      {/* Decorative blurred background aura */}
      <div className="absolute top-12 right-10 w-96 h-96 bg-purple-200/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 left-0 w-80 h-80 bg-pink-100/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Intro & Content */}
          <div className="lg:col-span-7 space-y-7 text-left">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-purple-100/80 text-purple-700">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                {t.hero.badge}
              </span>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                {t.hero.greeting} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800">
                  {t.hero.name}
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-normal">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-base shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/35 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>{t.hero.sayHello}</span>
                <Send className="w-4 h-4" />
              </a>

              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-purple-50/50 text-slate-700 hover:text-purple-600 font-semibold text-base border border-slate-200 hover:border-purple-200 shadow-sm transition-all duration-200"
              >
                <span>{t.hero.viewPortfolio}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Stats Row in Lavender Card */}
            <div className="pt-6">
              <div className="inline-flex flex-wrap sm:flex-nowrap items-center bg-purple-50/90 border border-purple-100/80 rounded-2xl p-4 sm:p-5 shadow-sm divide-y sm:divide-y-0 sm:divide-x divide-purple-200/60">
                {t.hero.stats.map((stat, idx) => (
                  <div key={idx} className="px-5 py-2 sm:py-0 first:pl-2 last:pr-2 text-left">
                    <div className="text-2xl sm:text-3xl font-extrabold text-purple-700 tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-slate-600 whitespace-nowrap mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Portrait with Aura */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="relative">
              {/* Outer soft glow ring */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-400/30 to-pink-300/30 rounded-3xl blur-2xl -z-10" />

              <div className="relative bg-white/70 p-3 sm:p-4 rounded-3xl border border-white/80 shadow-2xl shadow-purple-500/10">
                <div className="overflow-hidden rounded-2xl w-72 sm:w-80 md:w-96 aspect-[4/5] bg-slate-100">
                  <img
                    src={personalInfo.heroImage}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Floating Experience Badge */}
                <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg border border-purple-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
                    UX
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {t.hero.specialty}
                    </div>
                    <div className="text-sm font-bold text-slate-900">
                      {t.hero.specialtyTitle}
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
