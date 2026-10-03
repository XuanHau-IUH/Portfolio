import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t: fullT } = useLanguage();
  const t = fullT?.testimonial;

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden bg-[#F6F1E8]">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] md:w-[600px] h-[300px] sm:h-[350px] bg-[#0B2235]/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-5 sm:px-6 md:px-8 lg:px-8 text-center">
        {/* Section Header */}
        <div className="space-y-3 mb-10 sm:mb-14">
          <span className="text-xs font-bold text-[#FF7A1A] uppercase tracking-widest bg-[#FFF2E6] border border-[#FFD4B2] px-3.5 py-1 rounded-full">
            {t?.badge || 'Triết lý cốt lõi'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#102A43] tracking-normal leading-snug mt-3">
            {t?.title || 'Góc Nhìn Thiết Kế Của Tôi'}
          </h2>
          <p className="text-[#627D98] text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed mt-2">
            {t?.subtitle ||
              'Nền tảng Business Analysis định hình từng quyết định giao diện như thế nào.'}
          </p>
        </div>

        {/* Testimonial Quote Card */}
        <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl shadow-slate-200/50 border border-[#D9E2EC] transition-all duration-300">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#FFF2E6] text-[#FF7A1A] flex items-center justify-center mx-auto mb-5 sm:mb-6 shadow-sm">
            <Quote className="w-5 h-5 sm:w-6 sm:h-6 rotate-180" />
          </div>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#102A43] font-medium leading-relaxed italic max-w-2xl mx-auto min-h-[70px] sm:min-h-[85px] flex items-center justify-center">
            "{current.quote}"
          </p>

          {/* Rating Stars */}
          <div className="flex items-center justify-center gap-1.5 my-5 sm:my-6">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-[#FF7A1A] text-[#FF7A1A]" />
            ))}
          </div>

          {/* Author info */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#0B2235] shadow-md mb-2 bg-[#FFF2E6] flex items-center justify-center">
              <img
                src={current.avatar}
                alt={current.author}
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-sm sm:text-base font-bold text-[#102A43]">
              {current.author}
            </h4>
            <p className="text-xs sm:text-sm text-[#627D98]">
              {current.role}
            </p>
          </div>

          {/* Controls with min 44px touch target */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button
              onClick={prevTestimonial}
              className="w-11 h-11 rounded-full bg-white hover:bg-[#0B2235] text-[#102A43] hover:text-white border border-[#D9E2EC] flex items-center justify-center transition-colors cursor-pointer min-h-[44px] min-w-[44px] shadow-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx ? 'w-7 bg-[#FF7A1A]' : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-11 h-11 rounded-full bg-white hover:bg-[#0B2235] text-[#102A43] hover:text-white border border-[#D9E2EC] flex items-center justify-center transition-colors cursor-pointer min-h-[44px] min-w-[44px] shadow-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
