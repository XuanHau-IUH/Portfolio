import React from 'react';
import { X, ExternalLink, Calendar, User, CheckCircle2, Layers, Compass, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import ProjectImage from './ProjectImage';

export default function ProjectModal({ project, onClose }) {
  const { language, t } = useLanguage();
  if (!project) return null;

  const isVi = language === 'vi';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative animate-scaleUp text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 text-slate-600 hover:text-purple-600 flex items-center justify-center shadow-md hover:bg-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Header */}
        <div className="w-full relative bg-slate-100 rounded-t-3xl overflow-hidden p-3 pb-0">
          <ProjectImage
            src={project.cover}
            projectName={project.shortTitle}
            label={project.coverLabel}
            expectedFile={project.images[0]?.expectedFile || '01-cover.webp'}
            description={project.summary}
            aspectRatio="16/10"
            alt={project.title}
          />
          <div className="absolute top-6 left-6 z-10 bg-purple-600 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md">
            {project.tags[0] || project.productType}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-lg">
                PROJECT {project.index}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {project.productType}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
              {project.title}
            </h3>
            
            <p className="text-slate-600 mt-2.5 text-sm sm:text-base leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-slate-100 text-xs">
            <div>
              <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                <User className="w-3.5 h-3.5 text-purple-500" />
                <span>{t.portfolio.role}</span>
              </div>
              <div className="font-bold text-slate-800 mt-1 text-xs sm:text-sm">
                {project.role}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                <Compass className="w-3.5 h-3.5 text-purple-500" />
                <span>{t.portfolio.client}</span>
              </div>
              <div className="font-bold text-slate-800 mt-1 text-xs sm:text-sm truncate">
                {project.domain}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                <Layers className="w-3.5 h-3.5 text-purple-500" />
                <span>{isVi ? 'Nền tảng' : 'Platforms'}</span>
              </div>
              <div className="font-bold text-slate-800 mt-1 text-xs sm:text-sm truncate">
                {project.platforms.slice(0, 2).join(', ')}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                <Calendar className="w-3.5 h-3.5 text-purple-500" />
                <span>{t.portfolio.year}</span>
              </div>
              <div className="font-bold text-slate-800 mt-1 text-xs sm:text-sm">
                {project.year}
              </div>
            </div>
          </div>

          {/* Technologies & Tags */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              {isVi ? 'Đặc điểm kiến trúc & Công cụ' : 'Architectural Focus & Tools'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg bg-purple-50 text-purple-700 text-xs font-medium border border-purple-100/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Key Deliverables & System Highlights */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t.portfolio.deliverables}
            </h4>
            <ul className="text-xs sm:text-sm text-slate-600 space-y-2">
              {project.keyWork.slice(0, 5).map((work, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{work}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <Link
              to={`/work/${project.slug}`}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-700 transition-colors"
            >
              <span>{isVi ? 'Xem toàn bộ trang Case Study chi tiết' : 'Open Full Case Study Page'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium text-xs sm:text-sm hover:bg-slate-50 transition-colors"
              >
                {t.portfolio.close}
              </button>
              <a
                href="#contact"
                onClick={onClose}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-purple-500/20 transition-all"
              >
                <span>{t.portfolio.discussProject}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
