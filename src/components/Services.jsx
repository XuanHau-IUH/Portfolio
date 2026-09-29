import React, { useState } from 'react';
import { ChevronDown, Check, Send } from 'lucide-react';
import { services } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function Services() {
  const [openIndex, setOpenIndex] = useState(0);
  const { t: fullT } = useLanguage();
  const t = fullT?.services;

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="services" className="py-16 sm:py-20 md:py-24 lg:py-28 relative bg-stone-100/40">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-5 text-left space-y-4 sm:space-y-6">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-widest bg-amber-100/90 border border-amber-200/80 px-3.5 py-1 rounded-full">
              {t?.badge || 'Giá trị & Kỹ năng'}
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-normal leading-snug">
              {t?.title || 'Tôi Mang Gì Đến Cho Product Team?'}
            </h2>

            <p className="text-stone-600 text-sm sm:text-base md:text-lg leading-relaxed sm:leading-loose">
              {t?.subtitle ||
                'Từ quy tắc nghiệp vụ và mô hình hóa trạng thái đến hệ thống Design System và bàn giao lập trình.'}
            </p>

            {t?.intro && (
              <p className="text-stone-500 text-sm sm:text-base leading-relaxed">
                {t.intro}
              </p>
            )}

            <div className="pt-1 sm:pt-2">
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-semibold text-sm sm:text-base shadow-md shadow-amber-900/20 hover:shadow-lg hover:shadow-amber-900/30 transition-all duration-200 min-h-[48px]"
              >
                <span>{t?.sayHello || 'Liên hệ trao đổi'}</span>
                <Send className="w-4 h-4 flex-shrink-0" />
              </a>
            </div>
          </div>

          {/* Right Column: Accordion / Feature Cards */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            {(t?.items || services).map((service, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={service.id}
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden text-left ${
                    isOpen
                      ? 'border-amber-300 shadow-lg shadow-amber-950/5 ring-1 ring-amber-200'
                      : 'border-stone-200 hover:border-amber-200 shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full p-4 sm:p-6 md:p-7 flex items-center justify-between text-left focus:outline-none cursor-pointer min-h-[56px]"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0 pr-3">
                      <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200/60 px-2.5 py-1 rounded-lg flex-shrink-0">
                        0{index + 1}
                      </span>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-stone-900 truncate sm:overflow-visible sm:whitespace-normal">
                        {service.title}
                      </h3>
                    </div>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'bg-amber-800 text-white rotate-180' : 'bg-stone-100 text-stone-500'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-6 md:px-7 pb-5 sm:pb-7 pt-1 border-t border-stone-100 space-y-3.5 sm:space-y-4 animate-fadeIn">
                      <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                        {service.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 sm:pt-2">
                        {service.skills.map((skill, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2 text-xs sm:text-sm text-stone-700 font-medium">
                            <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                            <span>{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
