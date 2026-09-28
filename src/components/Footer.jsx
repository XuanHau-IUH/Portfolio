import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { personalInfo } from '../data/projectsData';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B1120] text-slate-400 py-12 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Identity */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-purple-600/30 font-mono">
              NXH
            </div>
            <div className="text-left">
              <span className="text-white font-bold text-base tracking-tight block">
                NGUYEN XUAN HAU<span className="text-purple-500">.</span>
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                Product / UIUX Designer
              </span>
            </div>
          </Link>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium">
            <a href={isHomePage ? '#home' : '/#home'} className="hover:text-white transition-colors">{t.nav.home}</a>
            <a href={isHomePage ? '#about' : '/#about'} className="hover:text-white transition-colors">{t.nav.about}</a>
            <a href={isHomePage ? '#process' : '/#process'} className="hover:text-white transition-colors">{t.nav.process}</a>
            <a href={isHomePage ? '#portfolio' : '/#portfolio'} className="hover:text-white transition-colors">{t.nav.portfolio}</a>
            <a href={isHomePage ? '#services' : '/#services'} className="hover:text-white transition-colors">{t.nav.services}</a>
            <a href={isHomePage ? '#contact' : '/#contact'} className="hover:text-white transition-colors">{t.nav.contact}</a>
          </div>

          {/* Scroll to Top */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500">
              © 2026 {personalInfo.name}. {t.footer.rights}
            </span>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-slate-800 hover:bg-purple-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 shadow-md"
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
