import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t: fullT } = useLanguage();
  const tNav = fullT?.nav;
  const tFooter = fullT?.footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B1120] text-slate-400 py-10 sm:py-12 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-purple-600/30">
              H
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              xuanhau<span className="text-purple-500">.</span>
            </span>
          </div>

          {/* Quick Links with clear spacing and wrapping */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-6 gap-y-2.5 text-xs sm:text-sm font-medium">
            <a href="#home" className="hover:text-white transition-colors py-1">{tNav?.home || 'Trang chủ'}</a>
            <a href="#about" className="hover:text-white transition-colors py-1">{tNav?.about || 'Giới thiệu'}</a>
            <a href="#process" className="hover:text-white transition-colors py-1">{tNav?.process || 'Quy trình'}</a>
            <a href="#portfolio" className="hover:text-white transition-colors py-1">{tNav?.portfolio || 'Dự án'}</a>
            <a href="#journey" className="hover:text-white transition-colors py-1">{tNav?.journey || 'Hành trình'}</a>
            <a href="#services" className="hover:text-white transition-colors py-1">{tNav?.services || 'Kỹ năng'}</a>
            <a href="#contact" className="hover:text-white transition-colors py-1">{tNav?.contact || 'Liên hệ'}</a>
          </div>

          {/* Copyright & Scroll to Top */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-right">
            <span className="text-xs text-slate-500">
              © 2026 {personalInfo.name}. {tFooter?.rights || 'Bảo lưu mọi quyền.'}
            </span>
            <button
              onClick={scrollToTop}
              className="w-11 h-11 rounded-full bg-slate-800 hover:bg-purple-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 shadow-md cursor-pointer min-h-[44px] min-w-[44px]"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
