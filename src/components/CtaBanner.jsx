import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Bi from './Bi';

export default function CtaBanner() {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  return (
    <section id="cta" className="py-12 sm:py-16 md:py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-8">
        <div className="bg-[#081B2E] rounded-3xl p-8 sm:p-12 md:p-14 lg:p-16 text-white relative overflow-hidden shadow-2xl border border-slate-800">
          {/* Subtle background aura */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FF7A00]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#163E63]/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 text-left space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 text-[#FF7A00] text-xs tabular-nums font-bold border border-slate-700">
                <MessageCircle className="w-4 h-4 text-[#FF7A00] flex-shrink-0" />
                <span><Bi vi="CÙNG TẠO RA NHỮNG SẢN PHẨM CÓ GIÁ TRỊ" en="READY TO BUILD VALUABLE PRODUCTS" /></span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                <Bi vi="Sẵn sàng trao đổi về ý tưởng hoặc " en="Open for product discussion or " />{' '}
                <span className="text-[#FF7A00]">
                  <Bi vi="cơ hội hợp tác" en="partnership opportunities" />
                </span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base max-w-[56ch] leading-relaxed">
                <Bi vi="Tôi luôn cởi mở với những dự án thú vị, cơ hội học hỏi và kết nối cùng những người cùng chí hướng." en="Always eager to contribute to meaningful digital products, complex SaaS systems, and user-centered design challenges." />
              </p>
            </div>

            {/* Right Action Button with Curved Annotation */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center relative">
              <div className="relative flex items-center">
                {/* Subtle curved arrow pointing to button on desktop */}
                <svg className="hidden sm:block absolute -left-12 -top-8 w-12 h-10 text-[#FF7A00] pointer-events-none" viewBox="0 0 50 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 6 10 C 18 10, 28 22, 38 28" />
                  <path d="M 30 28 L 38 28 L 36 20" />
                </svg>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#FF7A00] hover:bg-[#E96800] text-white font-semibold text-sm shadow-xl shadow-[#FF7A00]/30 hover:shadow-2xl hover:shadow-[#FF7A00]/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer min-h-[48px]"
                >
                  <span><Bi vi="Liên hệ với tôi" en="Get in Touch" /></span>
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
