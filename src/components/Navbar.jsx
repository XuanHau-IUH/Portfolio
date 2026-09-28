import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t: fullT } = useLanguage();
  const t = fullT?.nav;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t?.home || 'Trang chủ', href: '#home' },
    { name: t?.about || 'Giới thiệu', href: '#about' },
    { name: t?.process || 'Quy trình', href: '#process' },
    { name: t?.portfolio || 'Dự án', href: '#portfolio' },
    { name: t?.journey || 'Hành trình', href: '#journey' },
    { name: t?.services || 'Kỹ năng', href: '#services' },
    { name: t?.contact || 'Liên hệ', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md shadow-sm shadow-purple-500/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-2.5 group py-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-purple-500/25 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-xl tracking-tight">H</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 text-lg tracking-tight group-hover:text-purple-600 transition-colors">
                xuanhau<span className="text-purple-600">.</span>
              </span>
            </div>
          </a>

          {/* Desktop Nav Links (Visible at 1024px+) */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Action Area: Language Toggle & CTA Button (1024px+) */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-purple-200/80 bg-purple-50/80 text-purple-700 hover:bg-purple-100 hover:border-purple-300 transition-all duration-200 shadow-sm cursor-pointer min-h-[36px]"
              title="Switch language / Đổi ngôn ngữ"
              aria-label="Switch language"
            >
              <Globe className="w-3.5 h-3.5 text-purple-600" />
              <span className={language === 'vi' ? 'text-purple-700 font-extrabold' : 'text-slate-400'}>VI</span>
              <span className="text-purple-300">/</span>
              <span className={language === 'en' ? 'text-purple-700 font-extrabold' : 'text-slate-400'}>EN</span>
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold shadow-md shadow-purple-500/25 hover:shadow-lg hover:shadow-purple-500/35 hover:-translate-y-0.5 transition-all min-h-[44px]"
            >
              <span>{t?.hireMe || 'Hire Me'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Tablet & Mobile Action Area (< 1024px) */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border border-purple-200 bg-purple-50 text-purple-700 min-h-[44px] min-w-[44px] justify-center"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-purple-600" />
              <span>{language === 'vi' ? 'EN' : 'VI'}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl text-slate-700 hover:text-purple-600 hover:bg-purple-50 transition-colors focus:outline-none flex items-center justify-center border border-slate-200/80 bg-white/80"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Tablet & Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-2xl border-b border-purple-100 shadow-2xl px-5 sm:px-6 py-5 mt-2 space-y-2 transition-all">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pb-3 border-b border-slate-100">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center min-h-[44px] px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-purple-600 hover:bg-purple-50/80 transition-all rounded-xl text-left"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full min-h-[48px] py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold shadow-md shadow-purple-500/25 transition-all"
            >
              <span>{t?.hireMe || 'Hire Me'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
