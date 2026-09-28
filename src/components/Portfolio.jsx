import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projectsData';
import { useLanguage } from '../context/LanguageContext';
import ProjectModal from './ProjectModal';
import ProjectImage from './ProjectImage';

export default function Portfolio() {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const isVi = language === 'vi';

  const categories = [
    { key: "All", label: isVi ? "Tất cả" : "All" },
    { key: "Vertical SaaS", label: "Vertical SaaS" },
    { key: "Travel Booking", label: isVi ? "Đặt vé du lịch" : "Travel Booking" },
    { key: "Internal Operations", label: isVi ? "Vận hành nội bộ" : "Internal Operations" },
    { key: "Hybrid BA + UX", label: "Hybrid BA + UX" },
  ];

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => {
        if (activeCategory === "Vertical SaaS") return p.tags.includes("Vertical SaaS") || p.productType.includes("Vertical SaaS");
        if (activeCategory === "Travel Booking") return p.tags.includes("Travel Booking") || p.domain.includes("Tourism");
        if (activeCategory === "Internal Operations") return p.tags.includes("Enterprise UX") || p.productType.includes("Internal");
        if (activeCategory === "Hybrid BA + UX") return p.tags.includes("Hybrid BA + UX") || p.role.includes("Business Analysis");
        return true;
      });

  return (
    <section id="portfolio" className="py-20 md:py-28 relative bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-100/80 px-3.5 py-1 rounded-full">
            {t.portfolio.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.portfolio.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t.portfolio.subtitle}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat.key
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25 scale-105'
                  : 'bg-white text-slate-600 hover:text-purple-600 hover:bg-purple-50/60 border border-slate-200/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid: 3 columns matching original UI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.slice(0, visibleCount).map((project) => (
            <div
              key={project.slug}
              onClick={() => setSelectedProject(project)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer flex flex-col text-left justify-between"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <ProjectImage
                  src={project.cover}
                  projectName={project.shortTitle}
                  label={project.coverLabel}
                  expectedFile={project.images[0]?.expectedFile || '01-cover.webp'}
                  description={project.summary}
                  aspectRatio="16/10"
                  alt={project.title}
                />
                <div className="absolute inset-0 bg-purple-900/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white/95 backdrop-blur-sm text-purple-700 text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                    {t.portfolio.viewCaseStudy}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider block mb-2">
                    {project.tags[0] || project.productType}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors leading-snug line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed font-normal">
                    {project.summary}
                  </p>
                </div>

                {/* Footer link */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 group-hover:text-purple-600 inline-flex items-center gap-1 transition-colors">
                    {t.portfolio.seeCaseStudy}
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
        {filteredProjects.length > visibleCount && (
          <div className="mt-14 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm shadow-md shadow-purple-500/25 hover:shadow-lg hover:shadow-purple-500/35 transition-all"
            >
              <span>{t.portfolio.moreWork}</span>
            </button>
          </div>
        )}
      </div>

      {/* Case Study Modal Popup */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
