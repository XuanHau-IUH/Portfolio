import React from 'react';
import { Download, FolderKanban } from 'lucide-react';
import { personalInfo } from '../data/projectsData';
import { useLanguage } from '../context/LanguageContext';
import { DribbbleIcon, LinkedinIcon, InstagramIcon, BehanceIcon } from './SocialIcons';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Floating Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl shadow-slate-200/60 border border-slate-100 relative overflow-hidden">
          {/* Subtle background glow inside card */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-50 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Avatar with Social Links */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="w-56 sm:w-64 aspect-square rounded-2xl overflow-hidden bg-slate-100 shadow-md border border-slate-100">
                <img
                  src={personalInfo.aboutImage}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Social icons row directly below photo */}
              <div className="flex items-center gap-2.5 mt-5">
                <a
                  href="#contact"
                  className="w-10 h-10 rounded-xl bg-purple-50 hover:bg-purple-600 text-purple-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                  aria-label="Dribbble"
                >
                  <DribbbleIcon className="w-4 h-4" />
                </a>
                <a
                  href="#contact"
                  className="w-10 h-10 rounded-xl bg-purple-50 hover:bg-purple-600 text-purple-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href="#contact"
                  className="w-10 h-10 rounded-xl bg-purple-50 hover:bg-purple-600 text-purple-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="#contact"
                  className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-xs tracking-tight shadow-sm hover:bg-purple-700 transition-colors"
                  aria-label="Behance"
                >
                  <BehanceIcon />
                </a>
              </div>
            </div>

            {/* Right: Bio & Actions */}
            <div className="lg:col-span-8 text-left space-y-6">
              <div>
                <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full">
                  {t.about.badge}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight leading-tight">
                  {t.about.role}
                </h2>
              </div>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                {t.about.bio}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#portfolio"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200"
                >
                  <FolderKanban className="w-4 h-4" />
                  <span>{t.about.myProjects}</span>
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-purple-50/50 text-purple-700 font-semibold text-sm border-2 border-purple-200 hover:border-purple-300 shadow-sm transition-all duration-200"
                  title={t.about.cvNote}
                >
                  <Download className="w-4 h-4 text-purple-600" />
                  <span>{t.about.downloadCv}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
