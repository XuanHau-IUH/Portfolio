import React from 'react';
import { Quote, Star } from 'lucide-react';
import { personalInfo } from '../data/projectsData';
import { useLanguage } from '../context/LanguageContext';

export default function Testimonial() {
  const { t } = useLanguage();

  return (
    <section id="perspective" className="py-20 md:py-28 relative overflow-hidden bg-slate-50/40">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full">
            {t.testimonial.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.testimonial.title}
          </h2>
          <p className="text-slate-500 text-sm max-w-lg mx-auto">
            {t.testimonial.subtitle}
          </p>
        </div>

        {/* Testimonial Quote Card matching original UI */}
        <div className="relative bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 transition-all duration-300">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Quote className="w-6 h-6 rotate-180" />
          </div>

          <p className="text-lg sm:text-xl md:text-2xl text-slate-800 font-medium leading-relaxed italic max-w-2xl mx-auto min-h-[70px] flex items-center justify-center">
            "{t.testimonial.quote}"
          </p>

          {/* Rating Stars */}
          <div className="flex items-center justify-center gap-1.5 my-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>

          {/* Author info */}
          <div className="flex flex-col items-center">
            <img
              src={personalInfo.avatar}
              alt={personalInfo.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-purple-500 shadow-md mb-2"
            />
            <h4 className="text-base font-bold text-slate-900">
              {personalInfo.name}
            </h4>
            <p className="text-xs sm:text-sm text-purple-600 font-medium">
              {personalInfo.role}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 mt-5 leading-relaxed max-w-xl mx-auto">
            {t.testimonial.supporting}
          </p>
        </div>
      </div>
    </section>
  );
}
