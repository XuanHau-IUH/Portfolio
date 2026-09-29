import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedProjects } from '../data/projectsI18n';
import ProjectModal from './ProjectModal';

function CardThumbnail({ project, t }) {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const expectedFile = project.expectedFile || (project.image ? project.image.split('/').pop() : '01-cover-ha-long-luxe.webp');

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
      {hasError || !project.image ? (
        <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between text-left select-none overflow-hidden bg-gradient-to-br from-stone-900 via-[#1c1917] to-[#292524] border-b border-amber-600/20">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider uppercase bg-amber-500/15 border border-amber-500/30 text-amber-300">
              <span>Image Slot</span>
            </span>
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">
              16:10
            </span>
          </div>

          <div className="my-auto py-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400/90 font-mono">
              {project.shortTitle || project.title}
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug line-clamp-2 mt-1">
              {project.coverLabel || project.title}
            </h4>
          </div>

          <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center gap-1.5 text-stone-300 bg-stone-950/70 px-2.5 py-1 rounded border border-stone-800">
              <span className="text-stone-400">Waiting for:</span>
              <span className="text-amber-300 font-semibold">{expectedFile}</span>
            </div>
          </div>
        </div>
      ) : (
        <img
          src={project.image}
          alt={project.title}
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            if (project.fallbackImage && e.currentTarget.src !== project.fallbackImage) {
              e.currentTarget.src = project.fallbackImage;
            } else {
              setHasError(true);
            }
          }}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Hover CTA overlay */}
      <div className="absolute inset-0 bg-stone-900/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
        <span className="bg-white/95 backdrop-blur-sm text-amber-900 text-xs font-bold px-4 py-2 rounded-full shadow-lg">
          {t?.viewCaseStudy || 'Xem chi tiết'}
        </span>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeCategoryKey, setActiveCategoryKey] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const { language, t: fullT } = useLanguage();
  const t = fullT?.portfolio;

  const currentProjects = getLocalizedProjects(language);

  const categories = [
    { key: "All", label: t?.categories?.['All'] || 'Tất cả' },
    { key: "Vertical SaaS", label: t?.categories?.['Vertical SaaS'] || 'Vertical SaaS' },
    { key: "Travel & Booking", label: t?.categories?.['Travel & Booking'] || 'Du lịch & Đặt vé' },
    { key: "Internal Operations", label: t?.categories?.['Internal Operations'] || 'Vận hành nội bộ' },
    { key: "Hybrid BA + UX", label: t?.categories?.['Hybrid BA + UX'] || 'Kết hợp BA + UX' },
  ];

  const filteredProjects = activeCategoryKey === "All"
    ? currentProjects
    : currentProjects.filter((p) => p.category === activeCategoryKey);

  return (
    <section id="portfolio" className="py-16 sm:py-20 md:py-24 lg:py-28 relative bg-stone-100/50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-14">
          <span className="text-xs font-bold text-amber-900 uppercase tracking-widest bg-amber-100/90 border border-amber-200/80 px-3.5 py-1 rounded-full">
            {t?.badge || "Dự án"}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-normal leading-snug">
            {t?.title || "Dự Án Tiêu Biểu"}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
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
                  ? 'bg-amber-800 text-white shadow-md shadow-amber-900/25 scale-105'
                  : 'bg-white text-stone-700 hover:text-amber-800 hover:bg-amber-50/70 border border-stone-200'
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
              className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl hover:shadow-stone-300/40 hover:border-amber-300 hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer flex flex-col text-left"
            >
              {/* Thumbnail Container */}
              <CardThumbnail project={project} t={t} />

              {/* Card Body */}
              <div className="p-5 sm:p-6 md:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-2">
                    {t?.categories?.[project.category] || project.category}
                  </span>
                  {/* Full natural line wrap for long titles without truncation */}
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-stone-600 mt-2.5 line-clamp-3 leading-relaxed font-normal">
                    {project.description}
                  </p>
                  {(project.role || project.roleSecondary) && (
                    <div className="flex flex-wrap items-center gap-1.5 mt-3">
                      {project.role && (
                        <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-stone-100 text-stone-700 border border-stone-200/80">
                          {project.role}
                        </span>
                      )}
                      {project.roleSecondary && (
                        <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200/80">
                          {project.roleSecondary}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer link */}
                <div className="pt-4 mt-5 border-t border-stone-100 flex items-center justify-between min-h-[40px]">
                  <span className="text-sm font-bold text-stone-700 group-hover:text-amber-800 inline-flex items-center gap-1.5 transition-colors">
                    {t?.seeCaseStudy || "Xem chi tiết"}
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                  <span className="text-xs sm:text-sm text-stone-400 font-medium">
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
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-amber-800 hover:bg-amber-900 text-white font-semibold text-sm shadow-md shadow-amber-900/25 hover:shadow-lg hover:shadow-amber-900/35 transition-all cursor-pointer min-h-[48px]"
            >
              <span>{t?.moreWork || "Xem tất cả 7 dự án"}</span>
            </button>
          </div>
        ) : (
          <div className="mt-10 sm:mt-14 text-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-amber-800 hover:bg-amber-900 text-white font-semibold text-sm shadow-md shadow-amber-900/25 hover:shadow-lg hover:shadow-amber-900/35 transition-all min-h-[48px]"
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
