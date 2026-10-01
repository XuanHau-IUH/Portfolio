import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import Bi from './Bi';
import { LinkedinIcon, GithubIcon } from './SocialIcons';

export default function Footer() {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#081B2E] text-slate-300 py-10 sm:py-12 border-t border-slate-800 relative text-left">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 pb-8 border-b border-slate-800">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF7A00] flex items-center justify-center text-white font-bold text-base shadow-md shadow-[#FF7A00]/25">
              XH
            </div>
            <div>
              <span className="text-white font-bold text-base tracking-tight block">
                XUÂN HẬU
              </span>
              <span className="text-xs text-slate-400">
                <Bi vi="Tư duy sản phẩm · Nhà thiết kế UI/UX · Chuyên viên phân tích nghiệp vụ" en="Product Thinker · UI/UX Designer · Business Analyst" />
              </span>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 text-xs font-semibold text-slate-300">
            <a href="#home" className="hover:text-[#FF7A00] transition-colors"><Bi vi="Trang chủ" en="Home" /></a>
            <a href="#about" className="hover:text-[#FF7A00] transition-colors"><Bi vi="Giới thiệu" en="About" /></a>
            <a href="#services" className="hover:text-[#FF7A00] transition-colors"><Bi vi="Kỹ năng" en="Capabilities" /></a>
            <a href="#journey" className="hover:text-[#FF7A00] transition-colors"><Bi vi="Kinh nghiệm" en="Experience" /></a>
            <a href="#portfolio" className="hover:text-[#FF7A00] transition-colors"><Bi vi="Dự án" en="Projects" /></a>
            <a href="#process" className="hover:text-[#FF7A00] transition-colors"><Bi vi="Quy trình" en="Process" /></a>
            <a href="#contact" className="hover:text-[#FF7A00] transition-colors"><Bi vi="Liên hệ" en="Contact" /></a>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.socials.linkedin || 'https://linkedin.com'}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-[#FF7A00] text-slate-300 hover:text-white flex items-center justify-center transition-colors shadow-xs"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.github || 'https://github.com'}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-[#FF7A00] text-slate-300 hover:text-white flex items-center justify-center transition-colors shadow-xs"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Email"
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-[#FF7A00] text-slate-300 hover:text-white flex items-center justify-center transition-colors shadow-xs"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-xl bg-[#163E63] hover:bg-[#FF7A00] text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer ml-2"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>© 2026 Nguyễn Xuân Hậu. <Bi vi="Bảo lưu mọi quyền." en="All rights reserved." /></span>
          <span><Bi vi="Thiết kế và xây dựng với sự tỉ mỉ lấy người dùng làm trung tâm." en="Designed & built with user-centered precision." /></span>
        </div>
      </div>
    </footer>
  );
}
