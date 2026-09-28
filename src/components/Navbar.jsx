import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: isHomePage ? '#home' : '/#home' },
    { name: t.nav.about, href: isHomePage ? '#about' : '/#about' },
    { name: t.nav.process, href: isHomePage ? '#process' : '/#process' },
    { name: t.nav.portfolio, href: isHomePage ? '#portfolio' : '/#portfolio' },
    { name: t.nav.services, href: isHomePage ? '#services' : '/#services' },
    { name: t.nav.contact, href: isHomePage ? '#contact' : '/#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm shadow-purple-500/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/25 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-base tracking-tight font-mono">NXH</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-slate-900 text-base sm:text-lg tracking-tight group-hover:text-purple-600 transition-colors">
                NGUYEN XUAN HAU<span className="text-purple-600">.</span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
                Product / UIUX Designer
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTA Button & Language Switcher */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher Pill */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-purple-200 hover:border-purple-400 bg-purple-50/70 hover:bg-purple-100/70 text-purple-700 text-xs font-bold transition-all shadow-xs"
              title="Toggle English / Tiếng Việt"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'vi' ? 'Tiếng Việt (VI)' : 'English (EN)'}</span>
            </button>

            <a
              href={isHomePage ? '#contact' : '/#contact'}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold shadow-md shadow-purple-500/25 hover:shadow-lg hover:shadow-purple-500/35 hover:-translate-y-0.5 transition-all"
            >
              <span>{t.nav.hireMe}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu & Language Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-lg border border-purple-200 bg-purple-50 text-purple-700 text-xs font-bold"
            >
              {language === 'vi' ? 'VI' : 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-purple-600 hover:bg-purple-50 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-purple-100 shadow-xl px-6 pt-4 pb-6 mt-3 space-y-3 transition-all animate-fadeIn text-left">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-slate-700 hover:text-purple-600 hover:pl-2 transition-all rounded-md"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                toggleLanguage();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-purple-200 bg-purple-50 text-purple-700 text-xs font-bold"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Chuyển sang: {language === 'vi' ? 'English' : 'Tiếng Việt'}</span>
            </button>
            <a
              href={isHomePage ? '#contact' : '/#contact'}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm shadow-md shadow-purple-500/20"
            >
              <span>{t.nav.hireMe}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
