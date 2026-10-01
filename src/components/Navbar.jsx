import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Bi from './Bi';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const isVi = language === 'vi';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: isVi ? 'Trang chủ' : 'Home', href: '#home' },
    { name: isVi ? 'Giới thiệu' : 'About', href: '#about' },
    { name: isVi ? 'Kỹ năng' : 'Capabilities', href: '#services' },
    { name: isVi ? 'Kinh nghiệm' : 'Experience', href: '#journey' },
    { name: isVi ? 'Dự án' : 'Projects', href: '#portfolio' },
    { name: isVi ? 'Liên hệ' : 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#081B2E]/95 backdrop-blur-md shadow-lg shadow-[#081B2E]/20 border-b border-slate-800 py-3'
          : 'bg-[#081B2E] border-b border-slate-800/80 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo (XH XUÂN HẬU from Image 1) */}
          <a href="#home" className="flex items-center gap-2.5 group py-1">
            <div className="w-9 h-9 rounded-xl bg-[#FF7A00] flex items-center justify-center text-white shadow-md shadow-[#FF7A00]/25 group-hover:scale-105 transition-all">
              <span className="font-bold text-sm tracking-wider">XH</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-white text-base tracking-tight group-hover:text-[#FF7A00] transition-colors">
                XUÂN HẬU
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-semibold text-white/85 hover:text-[#FF7A00] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#FF7A00] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Action Area: Language Toggle & CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white border border-slate-700 bg-slate-800/70 hover:bg-slate-800 transition-all duration-200 cursor-pointer min-h-[36px]"
              title="Switch language / Đổi ngôn ngữ"
              aria-label="Switch language"
            >
              <Globe className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span className={language === 'vi' ? 'text-[#FF7A00]' : 'text-white/60'}>VI</span>
              <span className="text-white/30">/</span>
              <span className={language === 'en' ? 'text-[#FF7A00]' : 'text-white/60'}>EN</span>
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FF7A00] hover:bg-[#E96800] text-white text-xs font-bold shadow-md shadow-[#FF7A00]/25 hover:shadow-lg hover:shadow-[#FF7A00]/35 hover:-translate-y-0.5 transition-all min-h-[40px] cursor-pointer"
            >
              <span><Bi vi="Liên hệ với tôi" en="Contact Me" /></span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Tablet & Mobile Action Area */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border border-slate-700 bg-slate-800 text-white min-h-[40px]"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span className="text-white font-bold">{language === 'vi' ? 'EN' : 'VI'}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-[40px] min-h-[40px] p-2 rounded-xl text-white hover:text-[#FF7A00] hover:bg-slate-800 transition-colors flex items-center justify-center border border-slate-700 bg-[#081B2E]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#081B2E] border-b border-slate-800 px-6 py-5 shadow-2xl animate-fadeIn text-left">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-white/90 hover:text-[#FF7A00] py-2 border-b border-slate-800/60"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#FF7A00] text-white text-xs font-bold shadow-md shadow-[#FF7A00]/25"
              >
                <span><Bi vi="Liên hệ với tôi" en="Contact Me" /></span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
