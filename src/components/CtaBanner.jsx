import React from 'react';
import { ArrowRight, MessageSquareText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function CtaBanner() {
  const { t: fullT } = useLanguage();
  const t = fullT?.cta;

  return (
    <section id="cta" className="py-16 sm:py-20 md:py-24 bg-[#1C1917] relative overflow-hidden text-white">
      {/* Decorative warm background glow rings */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-stone-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-8 lg:px-8 text-center relative z-10 space-y-5 sm:space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-900/40 border border-amber-700/50 text-amber-200 text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
          <MessageSquareText className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{t?.badge || 'Thiết Kế Sản Phẩm & Tư Duy Hệ Thống'}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold tracking-normal leading-tight max-w-4xl mx-auto">
          <span className="block sm:whitespace-nowrap">
            {t?.title || 'Sản phẩm phức tạp cần tư duy rõ ràng.'}
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-stone-100 to-amber-300 block mt-2 sm:whitespace-nowrap">
            {t?.titleHighlight || 'Cùng trao đổi về sản phẩm của bạn!'}
          </span>
        </h2>

        <p className="text-stone-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
          {t?.subtitle ||
            'Tôi kết hợp tư duy Business Analysis và Product Design để chuyển hóa các luồng nghiệp vụ, quy tắc và ràng buộc hệ thống thành trải nghiệm người dùng tối ưu.'}
        </p>

        <div className="pt-2 sm:pt-4">
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 rounded-full bg-amber-700 hover:bg-amber-600 text-white font-semibold text-sm sm:text-base shadow-xl shadow-stone-950/50 hover:shadow-amber-900/30 hover:scale-105 transition-all duration-200 min-h-[48px]"
          >
            <span>{t?.button || 'Thảo luận về dự án'}</span>
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </a>
        </div>
      </div>
    </section>
  );
}
