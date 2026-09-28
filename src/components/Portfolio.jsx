import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { portfolioProjects } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import ProjectModal from './ProjectModal';

export default function Portfolio() {
  const [activeCategoryKey, setActiveCategoryKey] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const { t: fullT } = useLanguage();
  const t = fullT?.portfolio;

  const categories = [
    { key: "All", label: t?.categories?.['All'] || 'Tất cả' },
    { key: "Vertical SaaS", label: t?.categories?.['Vertical SaaS'] || 'Vertical SaaS' },
    { key: "Travel & Booking", label: t?.categories?.['Travel & Booking'] || 'Du lịch & Đặt vé' },
    { key: "Internal Operations", label: t?.categories?.['Internal Operations'] || 'Vận hành nội bộ' },
    { key: "Hybrid BA + UX", label: t?.categories?.['Hybrid BA + UX'] || 'Kết hợp BA + UX' },
  ];

  const filteredProjects = activeCategoryKey === "All"
    ? portfolioProjects
    : portfolioProjects.filter((p) => p.category === activeCategoryKey);

  return (
    <section id="portfolio" className="py-16 sm:py-20 md:py-24 lg:py-28 relative bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-14">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-100/80 px-3.5 py-1 rounded-full">
            {t?.badge || "Dự án"}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-normal leading-snug">
            {t?.title || "Dự Án Tiêu Biểu"}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t?.subtitle || "Khám phá 7 sản phẩm số thực tế trải dài từ Vertical SaaS, cổng đặt vé du lịch, kho vận nội bộ đến hệ sinh thái đa kênh."}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-14">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategoryKey(cat.key)}
              className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer min-h-[40px] flex items-center justify-center ${
                activeCategoryKey === cat.key
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25 scale-105'
                  : 'bg-white text-slate-600 hover:text-purple-600 hover:bg-purple-50/60 border border-slate-200/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid: 1 col on mobile, 2 cols on tablet, 3 cols on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.slice(0, visibleCount).map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer flex flex-col text-left"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={project.image}
                  alt={project.title}
                  onError={(e) => {
                    if (project.fallbackImage && e.currentTarget.src !== project.fallbackImage) {
                      e.currentTarget.src = project.fallbackImage;
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white/90 backdrop-blur-sm text-purple-700 text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                    {t?.viewCaseStudy || "Xem chi tiết"}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 md:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider block mb-2">
                    {t?.categories?.[project.category] || project.category}
                  </span>
                  {/* Full natural line wrap for long titles without truncation */}
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-2.5 line-clamp-3 leading-relaxed font-normal">
                    {project.description}
                  </p>
                </div>

                {/* Footer link */}
                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between min-h-[40px]">
                  <span className="text-xs font-bold text-slate-700 group-hover:text-purple-600 inline-flex items-center gap-1 transition-colors">
                    {t?.seeCaseStudy || "Xem chi tiết"}
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {project.year}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {filteredProjects.length > visibleCount ? (
          <div className="mt-10 sm:mt-14 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm shadow-md shadow-purple-500/25 hover:shadow-lg hover:shadow-purple-500/35 transition-all cursor-pointer min-h-[48px]"
            >
              <span>{t?.moreWork || "Xem tất cả 7 dự án"}</span>
            </button>
          </div>
        ) : (
          <div className="mt-10 sm:mt-14 text-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm shadow-md shadow-purple-500/25 hover:shadow-lg hover:shadow-purple-500/35 transition-all min-h-[48px]"
            >
              <span>{t?.discussProject || "Bắt đầu dự án cùng tôi"}</span>
            </a>
          </div>
        )}
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
