import React from 'react';
import { Download, FolderKanban } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { DribbbleIcon, LinkedinIcon } from './SocialIcons';

export default function About() {
  const { language, t: fullT } = useLanguage();
  const t = fullT?.about;

  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-8">
        {/* Main Floating Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 lg:p-14 shadow-xl shadow-stone-200/50 border border-stone-200/80 relative overflow-hidden">
          {/* Subtle warm background glow inside card */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 lg:gap-14 items-center">
            {/* Left: Avatar with Social Links (Tablet: 35-40%, Desktop: 33%, Mobile: Stacked) */}
            <div className="md:col-span-5 lg:col-span-4 flex flex-col items-center">
              <div className="w-48 sm:w-60 md:w-full max-w-[260px] aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-100 shadow-md border border-stone-200 flex items-center justify-center">
                <img
                  src={personalInfo.aboutImage || personalInfo.avatar}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Social icons row directly below photo */}
              <div className="flex items-center gap-2.5 mt-5 sm:mt-6">
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-11 h-11 rounded-xl bg-stone-100 hover:bg-amber-800 text-stone-700 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="w-11 h-11 rounded-xl bg-stone-100 hover:bg-amber-800 text-stone-700 hover:text-white flex items-center justify-center font-bold text-xs tracking-tight shadow-sm transition-all"
                >
                  Git
                </a>
              </div>
            </div>

            {/* Right: Bio & Actions (Tablet: 60-65%, Desktop: 67%) */}
            <div className="md:col-span-7 lg:col-span-8 text-left space-y-5 sm:space-y-7">
              <div>
                <span className="text-xs font-bold text-amber-900 uppercase tracking-widest bg-amber-100/90 border border-amber-200/80 px-3.5 py-1 rounded-full">
                  {t?.badge || 'Giới thiệu'}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 mt-3 sm:mt-4 tracking-normal leading-snug">
                  {t?.role || 'Chuyên viên Thiết kế Sản phẩm tập trung vào các hệ thống phức tạp'}
                </h2>
              </div>

              <p className="text-stone-600 text-sm sm:text-base md:text-lg leading-relaxed sm:leading-loose font-normal">
                {language === 'en' ? personalInfo.bio : (t?.bio || personalInfo.bio)}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
                <a
                  href="#portfolio"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:py-4 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-semibold text-sm shadow-md shadow-amber-900/20 hover:shadow-lg hover:shadow-amber-900/30 transition-all duration-200 min-h-[48px]"
                >
                  <FolderKanban className="w-4 h-4 flex-shrink-0" />
                  <span>{t?.myProjects || 'Xem dự án'}</span>
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:py-4 rounded-xl bg-white hover:bg-amber-50/70 text-stone-800 hover:text-amber-900 font-semibold text-sm border-2 border-stone-300 hover:border-amber-300 shadow-sm transition-all duration-200 min-h-[48px]"
                >
                  <Download className="w-4 h-4 text-amber-800 flex-shrink-0" />
                  <span>{t?.downloadCv || 'Tải CV (PDF)'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
