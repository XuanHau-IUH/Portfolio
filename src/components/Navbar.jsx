import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Bi from './Bi';
import { Monogram } from './ui/Technical';

// Sections observed for the active-link highlight, mapped to the nav link they belong to.
const SECTION_TO_LINK = {
  home: '#home',
  about: '#about',
  services: '#services',
  journey: '#journey',
  portfolio: '#portfolio',
  'earlier-work': '#portfolio',
  process: null,
  contact: '#contact',
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState('#home');
  const { language, toggleLanguage } = useLanguage();
  const isVi = language === 'vi';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active-section highlight: whichever section crosses a thin band near the
  // middle of the viewport is considered current.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const els = Object.keys(SECTION_TO_LINK)
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!els.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(SECTION_TO_LINK[entry.target.id]);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

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
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-[padding,background-color,border-color] duration-300 ${
        mobileMenuOpen
          ? 'bg-[#061826] border-white/10 pt-3 pb-0'
          : scrolled
            ? 'bg-[#061826]/95 backdrop-blur-md border-white/10 py-3'
            : 'bg-[#061826]/[0.92] backdrop-blur-md border-white/10 py-4'
      }`}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between gap-4">
          {/* Brand */}
          <a href="#home" className="flex items-center gap-2.5 group py-1 rounded-lg">
            <span className="w-10 h-10 rounded-full border border-white/20 group-hover:border-[#FF7A1A] flex items-center justify-center transition-colors">
              <Monogram className="text-[15px] leading-none" />
            </span>
            <span className="font-display font-bold text-[#F5F7F8] text-base tracking-tight group-hover:text-[#FF7A1A] transition-colors">
              XUÂN HẬU
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-7 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'location' : undefined}
                  className={`text-[14px] font-semibold transition-colors relative py-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#FF7A1A] after:transition-all after:duration-300 ${
                    isActive
                      ? 'text-[#F5F7F8] after:w-full'
                      : 'text-[#F5F7F8]/80 hover:text-[#F5F7F8] after:w-0 hover:after:w-full focus-visible:after:w-full'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Desktop Action Area: Language Toggle & contact link */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-bold text-white border border-white/15 bg-white/5 hover:bg-white/10 transition-colors duration-200 cursor-pointer min-h-[38px]"
              title="Switch language / Đổi ngôn ngữ"
              aria-label="Switch language"
            >
              <Globe className="w-3.5 h-3.5 text-[#FF7A1A]" aria-hidden="true" />
              <span className={language === 'vi' ? 'text-[#FF7A1A]' : 'text-white/70'}>VI</span>
              <span className="text-[#94A6B8]" aria-hidden="true">/</span>
              <span className={language === 'en' ? 'text-[#FF7A1A]' : 'text-white/70'}>EN</span>
            </button>

            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF7A1A] hover:bg-[#E8680A] text-[#061826] text-[14px] font-bold transition-colors min-h-[40px] cursor-pointer"
            >
              <span><Bi vi="Liên hệ với tôi" en="Contact Me" /></span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>

          {/* Tablet & Mobile Action Area */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[13px] font-bold border border-white/15 bg-white/5 text-white min-h-[40px]"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-[#FF7A1A]" aria-hidden="true" />
              <span className="text-white font-bold">{language === 'vi' ? 'EN' : 'VI'}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-[40px] min-h-[40px] p-2 rounded-xl text-white hover:text-[#FF7A1A] hover:bg-white/5 transition-colors flex items-center justify-center border border-white/15"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav"
          className="lg:hidden mt-3 bg-[#061826] border-t border-white/10 px-5 sm:px-6 md:px-8 pt-3 pb-6 animate-fadeIn text-left max-h-[calc(100svh-64px)] overflow-y-auto"
        >
          <nav aria-label="Mobile" className="flex flex-col max-w-7xl mx-auto">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 text-[16px] font-semibold py-3.5 border-b border-white/10 transition-colors ${
                    isActive ? 'text-[#FF7A1A]' : 'text-white/90 hover:text-[#FF7A1A]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? 'bg-[#FF7A1A]' : 'bg-white/20'}`}
                    aria-hidden="true"
                  />
                  {link.name}
                </a>
              );
            })}
            <div className="pt-5">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full min-h-[48px] py-3 rounded-full bg-[#FF7A1A] hover:bg-[#E8680A] text-[#061826] text-[14px] font-bold transition-colors"
              >
                <span><Bi vi="Liên hệ với tôi" en="Contact Me" /></span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
