import React, { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useProjects } from '../data/localizeProjects';
import { useLanguage } from '../context/LanguageContext';
import CaseStudyPage from '../pages/CaseStudyPage';

export default function CaseStudyOverlay({ slug, onClose, onNavigateProject }) {
  const { language } = useLanguage();
  const projects = useProjects();
  const isVi = language === 'vi';
  const overlayRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex] || projects[0];

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : projects[projects.length - 1];
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : projects[0];

  // Lock body scroll and restore scroll position on unmount
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Reset internal modal scroll position to top when project slug changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [slug]);

  // Handle ESC keyboard key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Backdrop click handler (only close if backdrop element itself is clicked)
  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 bg-[#061826]/75 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 md:p-6 lg:p-8 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — ${isVi ? 'Hồ sơ dự án' : 'Case study'}`}
    >
      {/* Modal Container: min(92vw, 1440px) x 92dvh on Desktop, 100vw x 100dvh on Mobile */}
      <div className="w-full max-w-[1760px] h-full sm:h-[92dvh] max-h-[100dvh] sm:max-h-[92dvh] rounded-none sm:rounded-3xl bg-[#F6F1E8] shadow-2xl border-0 sm:border sm:border-[#D9E2EC] flex flex-col overflow-hidden text-left animate-modalEnter relative">
        
        {/* ==================================================== */}
        {/* STICKY MODAL TOP BAR                                 */}
        {/* ==================================================== */}
        <header className="sticky top-0 z-40 bg-ink/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 md:px-8 py-3.5 flex items-center justify-between gap-4 flex-shrink-0">
          {/* Left: Project Category & Index Breadcrumb */}
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="tabular-nums text-[13px] font-bold text-[#FF7A1A] border border-[#FF7A1A]/60 px-2.5 py-1 rounded-lg whitespace-nowrap">
              {isVi ? `DỰ ÁN ${project.index} / ${projects.length}` : `PROJECT ${project.index} OF ${projects.length}`}
            </span>
            <span className="text-white/30 hidden sm:inline">/</span>
            <span className="typo-label text-white font-semibold truncate hidden sm:inline">
              {project.shortTitle || project.title}
            </span>
            <span className="text-white/30 hidden md:inline">·</span>
            <span className="typo-caption text-white/60 truncate hidden md:inline">
              {project.productType || project.domain}
            </span>
          </div>

          {/* Right Controls: Prev / Next Projects + Close Button */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Desktop Prev / Next Project Switcher */}
            <div className="hidden sm:flex items-center bg-white/5 p-0.5 rounded-full border border-white/15">
              <button
                onClick={() => onNavigateProject(prevProject.slug)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-[#FF7A1A] transition-colors cursor-pointer"
                title={`${isVi ? 'Dự án trước' : 'Previous project'}: ${prevProject.title}`}
                aria-label={isVi ? 'Dự án trước' : 'Previous project'}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="w-px h-3 bg-white/25 mx-0.5" />
              <button
                onClick={() => onNavigateProject(nextProject.slug)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-[#FF7A1A] transition-colors cursor-pointer"
                title={`${isVi ? 'Dự án tiếp theo' : 'Next project'}: ${nextProject.title}`}
                aria-label={isVi ? 'Dự án tiếp theo' : 'Next project'}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Accessible Close Button */}
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#FF7A1A]/60 text-white hover:text-[#FF7A1A] transition-all duration-200 cursor-pointer min-h-[36px]"
              aria-label={isVi ? 'Đóng chi tiết dự án (ESC)' : 'Close case study (ESC)'}
            >
              <span className="typo-label font-semibold">{isVi ? 'Đóng' : 'Close'}</span>
              <span className="text-[13px] tabular-nums text-white/50 hidden sm:inline">ESC</span>
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </header>

        {/* ==================================================== */}
        {/* SCROLLABLE CASE STUDY CONTENT CONTAINER              */}
        {/* ==================================================== */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto overscroll-contain bg-[#F6F1E8]"
        >
          <CaseStudyPage
            isModal={true}
            modalSlug={slug}
            onNavigate={onNavigateProject}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
}
