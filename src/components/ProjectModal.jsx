import React, { useState, useEffect } from 'react';
import {
  X,
  ExternalLink,
  Calendar,
  Layers,
  Tag,
  CheckCircle2,
  Cpu,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Image as ImageIcon,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ProjectModal({ project, onClose }) {
  const { t: fullT } = useLanguage();
  const t = fullT?.portfolio;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // List of images for slider (from project.images or default cover)
  const images = project?.images && project.images.length > 0
    ? project.images
    : [
        {
          id: '01-cover',
          src: project?.image,
          label: project?.title,
          slotPurpose: project?.subtitle || project?.description,
        },
      ];

  const currentImg = images[activeImageIndex] || images[0];

  const handlePrev = (e) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isZoomOpen) {
          setIsZoomOpen(false);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomOpen, images.length]);

  if (!project) return null;

  const deliverables = project.keyWork && project.keyWork.length > 0
    ? project.keyWork
    : [
        'Nghiên cứu người dùng, kiến trúc thông tin và bản đồ hành trình',
        'Xây dựng hệ thống Design System đa trạng thái và component nguyên tử',
        'Bản mẫu tương tác độ nét cao và kiểm thử chất lượng thiết kế (Design QA)',
      ];

  return (
    <>
      {/* Main Project Detail Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/65 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[94vh] sm:max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 relative animate-scaleUp text-left"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Right Action Buttons: Zoom & Close */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setIsZoomOpen(true)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-900/80 hover:bg-purple-600 text-white flex items-center justify-center shadow-md transition-colors cursor-pointer border border-white/20"
              title={t?.zoomIn || 'Bấm để xem ảnh phóng to'}
            >
              <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-purple-600 flex items-center justify-center shadow-lg transition-colors cursor-pointer border border-slate-100"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Interactive UI Screen Slider */}
          <div className="relative w-full bg-slate-950 overflow-hidden rounded-t-2xl sm:rounded-t-3xl select-none group">
            {/* Main Slide Display */}
            <div
              className="relative aspect-[16/10] sm:aspect-[16/9] w-full flex items-center justify-center cursor-zoom-in overflow-hidden"
              onClick={() => setIsZoomOpen(true)}
              title={t?.zoomIn || 'Bấm để xem ảnh phóng to'}
            >
              <img
                src={currentImg.src}
                alt={currentImg.label || project.title}
                onError={(e) => {
                  if (project.fallbackImage && e.currentTarget.src !== project.fallbackImage) {
                    e.currentTarget.src = project.fallbackImage;
                  }
                }}
                className="w-full h-full object-contain bg-slate-900 transition-opacity duration-300"
              />

              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Top Controls Overlay */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5 sm:gap-2 z-10 pointer-events-auto max-w-[calc(100%-80px)]">
                <span className="bg-purple-600 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md truncate">
                  {project.category}
                </span>
                <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-md flex items-center gap-1 border border-white/10 whitespace-nowrap flex-shrink-0">
                  <ImageIcon className="w-3 h-3 text-purple-400" />
                  <span>
                    {t?.imageCounter || 'Hình'} {activeImageIndex + 1}/{images.length}
                  </span>
                </span>
              </div>

              {/* Slide Caption Bottom Overlay */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 sm:gap-2 pointer-events-none">
                <div className="min-w-0">
                  <h4 className="text-white text-xs sm:text-sm md:text-base font-bold drop-shadow-md truncate">
                    {currentImg.label || `${project.shortTitle || project.title} — Screen ${activeImageIndex + 1}`}
                  </h4>
                  {currentImg.slotPurpose && (
                    <p className="text-slate-300 text-[11px] sm:text-xs mt-0.5 line-clamp-1 drop-shadow-sm font-normal">
                      {currentImg.slotPurpose}
                    </p>
                  )}
                </div>
                <span className="text-[10px] sm:text-[11px] text-purple-300 font-semibold bg-purple-900/70 backdrop-blur-sm px-2 sm:px-2.5 py-0.5 rounded-md border border-purple-400/20 self-start sm:self-auto flex-shrink-0">
                  {t?.zoomIn || 'Click để xem phóng to'}
                </span>
              </div>
            </div>

            {/* Slider Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900/80 hover:bg-purple-600 text-white flex items-center justify-center shadow-lg transition-all duration-200 border border-white/15 z-10 cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900/80 hover:bg-purple-600 text-white flex items-center justify-center shadow-lg transition-all duration-200 border border-white/15 z-10 cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </>
            )}

            {/* Thumbnail Navigation Strip */}
            {images.length > 1 && (
              <div className="bg-slate-900/95 border-t border-slate-800 p-2 sm:p-2.5 flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative flex-shrink-0 w-14 sm:w-20 aspect-[16/10] rounded-md sm:rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-purple-500 scale-105 shadow-md shadow-purple-500/30'
                        : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={img.label}
                      onError={(e) => {
                        if (project.fallbackImage && e.currentTarget.src !== project.fallbackImage) {
                          e.currentTarget.src = project.fallbackImage;
                        }
                      }}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0.5 right-1 text-[8px] sm:text-[9px] font-mono font-bold text-white bg-black/60 px-1 rounded">
                      {idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Details Content */}
          <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-7">
            {/* Header & Summary */}
            <div>
              <span className="text-xs font-bold text-purple-600 uppercase tracking-widest block mb-1">
                Case Study #{project.index || project.id}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-normal leading-snug">
                {project.title}
              </h3>
              <p className="text-slate-600 mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base leading-relaxed">
                {project.summary || project.description}
              </p>
            </div>

            {/* Meta Grid: 2 cols on mobile/tablet, 4 cols on desktop */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 py-3 sm:py-4 border-y border-slate-100 text-xs sm:text-sm">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                  <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500 flex-shrink-0" />
                  <span className="truncate">{t?.client || 'Lĩnh vực'}</span>
                </div>
                <div className="font-semibold text-slate-800 mt-1 truncate">
                  {project.client || project.domain || 'Digital Product'}
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500 flex-shrink-0" />
                  <span className="truncate">{t?.year || 'Năm'}</span>
                </div>
                <div className="font-semibold text-slate-800 mt-1 truncate">{project.year}</div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                  <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500 flex-shrink-0" />
                  <span className="truncate">{t?.role || 'Vai trò'}</span>
                </div>
                <div className="font-semibold text-slate-800 mt-1 truncate">
                  {project.role || 'Product Designer'}
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                  <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500 flex-shrink-0" />
                  <span className="truncate">{t?.platforms || 'Nền tảng'}</span>
                </div>
                <div className="font-semibold text-slate-800 mt-1 truncate">
                  {project.platforms ? project.platforms.slice(0, 2).join(', ') : 'Web · Mobile'}
                </div>
              </div>
            </div>

            {/* Tags / Methodologies */}
            {project.tags && project.tags.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  Lĩnh Vực & Kỹ Năng Thiết Kế Cốt Lõi
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 sm:px-3 py-1 rounded-lg bg-purple-50 text-purple-700 text-xs font-medium border border-purple-100/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Key Deliverables */}
            <div className="space-y-2.5 sm:space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {t?.deliverables || 'Hạng Mục Bàn Giao & Thực Thi'}
              </h4>
              <div className="space-y-2 sm:space-y-2.5 bg-slate-50/70 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-100">
                {deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* System Logic Highlights */}
            {project.systemLogic && project.systemLogic.length > 0 && (
              <div className="space-y-2.5 sm:space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Điểm Sáng Logic Hệ Thống & Kiến Trúc
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.systemLogic.map((logic, idx) => (
                    <div key={idx} className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-purple-50/60 border border-purple-100 text-xs">
                      <span className="font-bold text-purple-900 block mb-1 text-sm">{logic.title}</span>
                      <span className="text-slate-600 leading-relaxed">{logic.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Operational Modules */}
            {project.modules && project.modules.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  Phân Hệ Chức Năng ({project.modules.length} Modules)
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.modules.map((mod, idx) => (
                    <span key={idx} className="px-2.5 sm:px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
                      {mod}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions: Stacks on mobile, inline on tablet & desktop */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-5 border-t border-slate-100">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
              >
                {t?.close || 'Đóng'}
              </button>
              <a
                href="#contact"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm shadow-md shadow-purple-500/20 transition-all min-h-[44px]"
              >
                <span>{t?.discussProject || 'Thảo luận về dự án này'}</span>
                <ExternalLink className="w-4 h-4 flex-shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Image Zoom Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-4 animate-fadeIn"
          onClick={() => setIsZoomOpen(false)}
        >
          {/* Top Bar */}
          <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between z-10 pointer-events-auto">
            <div className="text-white text-left min-w-0 pr-4">
              <h3 className="font-bold text-sm sm:text-base drop-shadow truncate">
                {currentImg.label || project.title}
              </h3>
              <p className="text-xs text-slate-400">
                {t?.imageCounter || 'Hình'} {activeImageIndex + 1} / {images.length}
              </p>
            </div>

            <button
              onClick={() => setIsZoomOpen(false)}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer shadow-lg flex-shrink-0"
              title={t?.closeZoom || 'Đóng'}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Fullscreen Image */}
          <div
            className="relative max-w-6xl max-h-[82vh] sm:max-h-[85vh] w-full h-full flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentImg.src}
              alt={currentImg.label}
              onError={(e) => {
                if (project.fallbackImage && e.currentTarget.src !== project.fallbackImage) {
                  e.currentTarget.src = project.fallbackImage;
                }
              }}
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            />
          </div>

          {/* Prev / Next Arrows in Lightbox */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-purple-600 text-white flex items-center justify-center shadow-xl transition-all cursor-pointer border border-white/20"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-purple-600 text-white flex items-center justify-center shadow-xl transition-all cursor-pointer border border-white/20"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
