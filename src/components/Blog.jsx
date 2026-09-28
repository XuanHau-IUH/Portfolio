import React, { useState } from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';
import { projects } from '../data/projectsData';
import { useLanguage } from '../context/LanguageContext';
import ProjectModal from './ProjectModal';
import ProjectImage from './ProjectImage';

export default function Blog() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState(null);

  // Show the three secondary projects: 05 Insurance Integration, 06 Smart Car Wash, 07 Corporate Website
  const secondaryProjects = projects.filter((p) => !p.featured);

  return (
    <section id="blog" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3.5 py-1 rounded-full">
            {t.blog.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.blog.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t.blog.subtitle}
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {secondaryProjects.map((project) => (
            <article
              key={project.slug}
              onClick={() => setSelectedProject(project)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer flex flex-col text-left justify-between"
            >
              {/* Card Image Slot */}
              <div className="p-3 pb-0">
                <div className="relative group overflow-hidden rounded-xl">
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
                    <span className="bg-white/95 backdrop-blur-md text-purple-700 text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                      {t.portfolio.viewCaseStudy}
                    </span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                      PROJECT {project.index}
                    </span>
                    <span className="text-slate-400 font-medium">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors leading-snug line-clamp-1">
                    {project.title}
                  </h3>

                  <div className="text-xs font-semibold text-purple-700">
                    {project.role}
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed font-normal line-clamp-2">
                    {project.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <Layers className="w-3 h-3 text-purple-500" />
                    <span className="truncate max-w-[140px] sm:max-w-none">
                      {project.platforms[0]}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 hover:text-purple-700 transition-colors">
                    <span>{t.blog.readArticle}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Carousel indicator dots matching original UI */}
        <div className="flex items-center justify-center gap-2 mt-12">
          <span className="w-8 h-2.5 rounded-full bg-purple-600" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-200 hover:bg-purple-300 transition-colors cursor-pointer" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-200 hover:bg-purple-300 transition-colors cursor-pointer" />
        </div>
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
