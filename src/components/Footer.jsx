import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import Bi from './Bi';
import { Monogram } from './ui/Technical';
import { LinkedinIcon, GithubIcon } from './SocialIcons';

export default function Footer() {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-ink-2 text-[#94A6B8] py-10 sm:py-12 border-t border-white/10 relative text-left">
      <span className="absolute top-0 left-0 w-1/3 thread-h opacity-70" aria-hidden="true" />
      <div className="container-wide">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-7 pb-8 border-b border-white/10">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 flex-shrink-0 rounded-full border border-white/15 flex items-center justify-center">
              <Monogram className="text-[17px] leading-none" />
            </span>
            <div>
              <span className="font-display text-[#F5F7F8] font-bold text-base tracking-tight block">
                XUÂN HẬU
              </span>
              <span className="text-[13px] text-[#94A6B8] sm:whitespace-nowrap">
                <Bi vi="Tư duy sản phẩm · UI/UX · Phân tích nghiệp vụ" en="Product Thinker · UI/UX Designer · Business Analyst" />
              </span>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[15px] order-last w-full pt-6 border-t border-white/10 font-semibold text-[#F5F7F8]/85">
            <a href="#home" className="py-1 hover:text-[#FF7A1A] transition-colors">{isVi ? "Trang chủ" : "Home"}</a>
            <a href="#about" className="py-1 hover:text-[#FF7A1A] transition-colors">{isVi ? "Giới thiệu" : "About"}</a>
            <a href="#services" className="py-1 hover:text-[#FF7A1A] transition-colors">{isVi ? "Kỹ năng" : "Capabilities"}</a>
            <a href="#journey" className="py-1 hover:text-[#FF7A1A] transition-colors">{isVi ? "Kinh nghiệm" : "Experience"}</a>
            <a href="#portfolio" className="py-1 hover:text-[#FF7A1A] transition-colors">{isVi ? "Dự án" : "Projects"}</a>
            <a href="#process" className="py-1 hover:text-[#FF7A1A] transition-colors">{isVi ? "Quy trình" : "Process"}</a>
            <a href="#contact" className="py-1 hover:text-[#FF7A1A] transition-colors">{isVi ? "Liên hệ" : "Contact"}</a>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3 ">
            <a
              href={personalInfo.socials.linkedin || 'https://linkedin.com'}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full border border-white/15 hover:border-[#FF7A1A] text-[#F5F7F8]/85 hover:text-[#FF7A1A] flex items-center justify-center transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.github || 'https://github.com'}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 rounded-full border border-white/15 hover:border-[#FF7A1A] text-[#F5F7F8]/85 hover:text-[#FF7A1A] flex items-center justify-center transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Email"
              className="w-10 h-10 rounded-full border border-white/15 hover:border-[#FF7A1A] text-[#F5F7F8]/85 hover:text-[#FF7A1A] flex items-center justify-center transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-[#FF7A1A] hover:bg-[#E8680A] text-[#061826] flex items-center justify-center transition-colors cursor-pointer ml-2"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-[#94A6B8] text-center sm:text-left">
          <span>© 2026 Nguyễn Xuân Hậu. <Bi vi="Bảo lưu mọi quyền." en="All rights reserved." /></span>
          <span><Bi vi="Thiết kế và xây dựng với sự tỉ mỉ lấy người dùng làm trung tâm." en="Designed & built with user-centered precision." /></span>
        </div>
      </div>
    </footer>
  );
}
