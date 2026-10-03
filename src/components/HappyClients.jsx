import React from 'react';
import { clientLogos } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function HappyClients() {
  const { t: fullT } = useLanguage();
  const t = fullT?.clients;

  return (
    <section className="py-16 md:py-20 border-b border-[#D9E2EC] bg-[#F6F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold text-[#FF7A1A] uppercase tracking-widest bg-[#FFF2E6] border border-[#FFD4B2] px-3 py-1 rounded-full">
            {t?.badge || 'Partners & Organizations'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#102A43] tracking-tight">
            {t?.title || 'Career & Organizations'}
          </h2>
          <p className="text-[#627D98] text-xs sm:text-sm">
            {t?.subtitle ||
              'Technical data foundation → Business Analysis → System Analysis → Product & UIUX Design.'}
          </p>
        </div>

        {/* Logos Row */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 lg:gap-20 opacity-75">
          {clientLogos.map((client, idx) => (
            <div
              key={idx}
              className="text-[#627D98] hover:text-[#FF7A1A] font-bold text-xl sm:text-2xl tracking-tighter transition-all duration-300 hover:scale-105 cursor-pointer select-none"
            >
              {client.logoText}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
