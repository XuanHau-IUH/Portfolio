import React from 'react';
import { Database, TrendingUp, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const iconMap = {
  Database,
  TrendingUp,
  Cpu,
  Sparkles,
};

export default function CareerJourney() {
  const { t: fullT } = useLanguage();
  const t = fullT?.journey;

  const defaultItems = [
    {
      yearBadge: '2023',
      stage: 'NỀN TẢNG KỸ THUẬT DỮ LIỆU',
      company: 'HPT Vietnam Corporation',
      role: 'Thực tập sinh Quản trị CSDL & Kỹ sư Dữ liệu',
      period: '06/2023 – 09/2023',
      description: 'Xây dựng tư duy cấu trúc dữ liệu, câu lệnh truy vấn và các ràng buộc kỹ thuật của backend.',
      icon: 'Database',
      isCurrent: false,
    },
    {
      yearBadge: '2024–2025',
      stage: 'NỀN TẢNG PHÂN TÍCH NGHIỆP VỤ',
      company: 'IS Group',
      role: 'Business Analyst',
      period: '07/2024 – 02/2025',
      description: 'Phân tích yêu cầu khách hàng, xác định các trường hợp nghiệp vụ và lập tài liệu đặc tả chức năng.',
      icon: 'TrendingUp',
      isCurrent: false,
    },
    {
      yearBadge: '2025–2026',
      stage: 'PHÂN TÍCH HỆ THỐNG & NGHIỆP VỤ',
      company: 'DOTB',
      role: 'Business Analyst — EdTech',
      period: '10/2025 – 01/2026',
      description: 'Phân tích hệ thống sản phẩm giáo dục: quy tắc kinh doanh, phân quyền tài khoản, validation và luồng thao tác.',
      icon: 'Cpu',
      isCurrent: false,
    },
    {
      yearBadge: '2026 – Hiện tại',
      stage: 'THIẾT KẾ SẢN PHẨM & UI/UX',
      company: 'Techera',
      role: 'UIUX Designer / Product Designer',
      period: '02/2026 – Hiện tại',
      description: 'Phụ trách thiết kế trải nghiệm sản phẩm: Kiến trúc thông tin, SaaS đa phân quyền, Responsive Web và Mobile App.',
      icon: 'Sparkles',
      isCurrent: true,
    },
  ];

  const items = t?.items || defaultItems;

  return (
    <section id="journey" className="py-16 sm:py-20 md:py-24 lg:py-28 relative bg-[#FAFBFF]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10 sm:mb-14">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-100/80 px-3.5 py-1 rounded-full">
            {t?.badge || 'HÀNH TRÌNH SỰ NGHIỆP'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-normal leading-snug">
            {t?.title || 'Lộ Trình Nghề Nghiệp'}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            {t?.subtitle ||
              'Nền tảng kỹ thuật dữ liệu → Business Analysis → Phân tích hệ thống → Thiết kế Sản phẩm & UI/UX.'}
          </p>
        </div>

        {/* 4 Cards Grid: 1 col on mobile (connected vertical timeline), 2x2 on tablet, 4 in a row on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6 relative">
          {items.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Database;
            return (
              <div
                key={idx}
                className={`rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 flex flex-col justify-between text-left transition-all duration-300 hover:-translate-y-1.5 relative ${
                  item.isCurrent
                    ? 'bg-white border-2 border-purple-400 shadow-xl shadow-purple-500/10 ring-4 ring-purple-100/60'
                    : 'bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-purple-500/5'
                }`}
              >
                <div>
                  {/* Top Bar: Icon + Year Badge */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-transform ${
                        item.isCurrent
                          ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                          : 'bg-purple-50 text-purple-600'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        item.isCurrent
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.yearBadge}
                    </span>
                  </div>

                  {/* Stage Category */}
                  <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider block mt-4 sm:mt-5 mb-1.5">
                    {item.stage}
                  </span>

                  {/* Company Name */}
                  <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-slate-900 leading-snug">
                    {item.company}
                  </h3>

                  {/* Role Title */}
                  <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
                    {item.role}
                  </p>

                  {/* Period */}
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 font-medium">
                    {item.period}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal mt-3 sm:mt-4">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Tag if Current */}
                {item.isCurrent && (
                  <div className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-purple-100 flex items-center gap-2 text-xs font-bold text-purple-700">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 stroke-[2.5] flex-shrink-0" />
                    <span>{t?.currentRoleTag || 'Vị trí hiện tại'}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
