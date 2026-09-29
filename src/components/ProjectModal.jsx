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
  FileCode,
  Smartphone,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ProjectModal({ project, onClose }) {
  const { t: fullT } = useLanguage();
  const t = fullT?.portfolio;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [imgErrors, setImgErrors] = useState({});

  // Reset image index and error states when project changes
  useEffect(() => {
    setActiveImageIndex(0);
    setImgErrors({});
  }, [project?.id, project?.slug]);

  // List of images for slider (from project.images or default cover)
  const images = project?.images && project.images.length > 0
    ? project.images
    : [
        {
          id: '01-cover',
          src: project?.image,
          label: project?.title,
          slotPurpose: project?.subtitle || project?.description,
          expectedFile: '01-cover-ha-long-luxe.webp',
          aspectRatio: '16/10',
        },
      ];

  const currentImg = images[activeImageIndex] || images[0];
  const isCurrentImgError = Boolean(imgErrors[activeImageIndex] || !currentImg?.src);

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

  const isHaLongLuxe = project.slug === 'ha-long-luxe';
  const isVevuive = project.slug === 'vevuive';

  const deliverables = project.keyWork && project.keyWork.length > 0
    ? project.keyWork
    : [
        'Nghiên cứu người dùng, kiến trúc thông tin và bản đồ hành trình',
        'Xây dựng hệ thống Design System đa trạng thái và component nguyên tử',
        'Bản mẫu tương tác độ nét cao và kiểm thử chất lượng thiết kế (Design QA)',
      ];

  const derivedExpectedFile = currentImg.expectedFile || (currentImg.src ? currentImg.src.split('/').pop() : 'screenshot.webp');

  return (
    <>
      {/* Main Project Detail Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-stone-900/70 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[94vh] sm:max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 relative animate-scaleUp text-left"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Right Action Buttons: Zoom & Close */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setIsZoomOpen(true)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-stone-900/80 hover:bg-amber-800 text-white flex items-center justify-center shadow-md transition-colors cursor-pointer border border-white/20"
              title={t?.zoomIn || 'Bấm để xem ảnh phóng to'}
            >
              <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-amber-800 flex items-center justify-center shadow-lg transition-colors cursor-pointer border border-stone-200"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Interactive UI Screen Slider */}
          <div className="relative w-full bg-stone-950 overflow-hidden rounded-t-2xl sm:rounded-t-3xl select-none group">
            {/* Main Slide Display */}
            <div
              className="relative aspect-[16/10] sm:aspect-[16/9] w-full flex items-center justify-center cursor-zoom-in overflow-hidden"
              onClick={() => setIsZoomOpen(true)}
              title={t?.zoomIn || 'Bấm để xem ảnh phóng to'}
            >
              {!isCurrentImgError ? (
                <img
                  src={currentImg.src}
                  alt={currentImg.label || project.title}
                  onError={(e) => {
                    if (project.fallbackImage && e.currentTarget.src !== project.fallbackImage) {
                      e.currentTarget.src = project.fallbackImage;
                    } else {
                      setImgErrors((prev) => ({ ...prev, [activeImageIndex]: true }));
                    }
                  }}
                  className="w-full h-full object-contain bg-stone-900 transition-opacity duration-300"
                />
              ) : (
                /* Technical slot placeholder for missing images (NO stock photos) */
                <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between text-left select-none overflow-hidden bg-gradient-to-br from-stone-900 via-[#1c1917] to-[#292524]">
                  {/* Subtle Grid Background Pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.08] pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 1px 1px, #d97706 1px, transparent 0)',
                      backgroundSize: '24px 24px',
                    }}
                  />

                  {/* Top Bar with Slot Badge */}
                  <div className="relative z-10 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider uppercase bg-amber-500/15 border border-amber-500/30 text-amber-300">
                      {currentImg.aspectRatio === 'mobile' ? (
                        <Smartphone className="w-3 h-3 text-amber-400" />
                      ) : (
                        <Layers className="w-3 h-3 text-amber-400" />
                      )}
                      <span>{currentImg.aspectRatio === 'mobile' ? 'Mobile Screen Slot' : 'Image Slot'}</span>
                    </span>

                    <span className="text-[11px] font-mono text-stone-400 uppercase tracking-widest">
                      {currentImg.aspectRatio === 'mobile' ? 'MOBILE (9:16)' : '16:10'}
                    </span>
                  </div>

                  {/* Middle Info */}
                  <div className="relative z-10 my-auto py-4 space-y-2 max-w-2xl">
                    <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400/90 font-mono">
                      {project.shortTitle || project.title}
                    </div>
                    <h4 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
                      {currentImg.label || `${project.shortTitle} — Screen ${activeImageIndex + 1}`}
                    </h4>
                    {(currentImg.slotPurpose || currentImg.description) && (
                      <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                        {currentImg.slotPurpose || currentImg.description}
                      </p>
                    )}
                  </div>

                  {/* Bottom Notice */}
                  <div className="relative z-10 pt-3 border-t border-stone-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <div className="flex items-center gap-2 text-stone-300 bg-stone-950/70 px-3 py-1.5 rounded-lg border border-stone-800">
                      <FileCode className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span className="text-stone-400">Waiting for:</span>
                      <span className="text-amber-300 font-semibold">{derivedExpectedFile}</span>
                    </div>
                    <span className="text-[11px] text-stone-500">
                      {activeImageIndex + 1} / {images.length}
                    </span>
                  </div>
                </div>
              )}

              {/* Gradient overlay for text readability when real image is present */}
              {!isCurrentImgError && (
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />
              )}

              {/* Top Controls Overlay */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5 sm:gap-2 z-10 pointer-events-auto max-w-[calc(100%-80px)]">
                <span className="bg-amber-800 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md truncate">
                  {project.category}
                </span>
                <span className="bg-stone-900/80 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-md flex items-center gap-1 border border-white/10 whitespace-nowrap flex-shrink-0">
                  <ImageIcon className="w-3 h-3 text-amber-400" />
                  <span>
                    {t?.imageCounter || 'Hình'} {activeImageIndex + 1}/{images.length}
                  </span>
                </span>
              </div>

              {/* Slide Caption Bottom Overlay when real image is present */}
              {!isCurrentImgError && (
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 sm:gap-2 pointer-events-none">
                  <div className="min-w-0">
                    <h4 className="text-white text-xs sm:text-sm md:text-base font-bold drop-shadow-md truncate">
                      {currentImg.label || `${project.shortTitle || project.title} — Screen ${activeImageIndex + 1}`}
                    </h4>
                    {(currentImg.slotPurpose || currentImg.description) && (
                      <p className="text-stone-300 text-[11px] sm:text-xs mt-0.5 line-clamp-1 drop-shadow-sm font-normal">
                        {currentImg.slotPurpose || currentImg.description}
                      </p>
                    )}
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-amber-200 font-semibold bg-stone-900/90 backdrop-blur-sm px-2 sm:px-2.5 py-0.5 rounded-md border border-amber-600/30 self-start sm:self-auto flex-shrink-0">
                    {t?.zoomIn || 'Click để xem phóng to'}
                  </span>
                </div>
              )}
            </div>

            {/* Slider Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-stone-900/80 hover:bg-amber-800 text-white flex items-center justify-center shadow-lg transition-all duration-200 border border-white/15 z-10 cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-stone-900/80 hover:bg-amber-800 text-white flex items-center justify-center shadow-lg transition-all duration-200 border border-white/15 z-10 cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </>
            )}

            {/* Thumbnail Navigation Strip */}
            {images.length > 1 && (
              <div className="bg-stone-900/95 border-t border-stone-800 p-2 sm:p-2.5 flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none">
                {images.map((img, idx) => {
                  const isThumbErr = Boolean(imgErrors[idx] || !img.src);
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative flex-shrink-0 w-14 sm:w-20 aspect-[16/10] rounded-md sm:rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-amber-600 scale-105 shadow-md shadow-amber-900/30'
                          : 'border-transparent opacity-50 hover:opacity-100'
                      }`}
                    >
                      {!isThumbErr ? (
                        <img
                          src={img.src}
                          alt={img.label}
                          onError={() => setImgErrors((prev) => ({ ...prev, [idx]: true }))}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-stone-950 flex flex-col items-center justify-center text-amber-400 font-mono text-[9px] font-bold border border-amber-600/20">
                          <span>SLOT</span>
                        </div>
                      )}
                      <span className="absolute bottom-0.5 right-1 text-[8px] sm:text-[9px] font-mono font-bold text-white bg-black/60 px-1 rounded">
                        {idx + 1}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Project Details Content */}
          <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-7">
            {/* Header & Summary */}
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block mb-1">
                {t?.caseStudyNumber || 'HỒ SƠ DỰ ÁN'} #{project.index || (project.id < 10 ? '0' + project.id : project.id)}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-stone-900 tracking-normal leading-snug">
                {project.detailTitle || project.title}
              </h3>
              <p className="text-stone-600 mt-2.5 sm:mt-3 text-sm sm:text-base leading-relaxed">
                {project.summary || project.intro || project.description}
              </p>
            </div>

            {/* Meta Grid: 2 cols on mobile/tablet, 4 cols on desktop */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 py-3.5 sm:py-4 border-y border-stone-200 text-xs sm:text-sm">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-stone-400 font-medium">
                  <Layers className="w-4 h-4 text-amber-700 flex-shrink-0" />
                  <span className="truncate">{t?.client || 'Lĩnh vực'}</span>
                </div>
                <div className="font-semibold text-stone-800 mt-1 truncate">
                  {project.domain || project.client || 'Digital Product'}
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-stone-400 font-medium">
                  <Calendar className="w-4 h-4 text-amber-700 flex-shrink-0" />
                  <span className="truncate">{t?.year || 'Năm'}</span>
                </div>
                <div className="font-semibold text-stone-800 mt-1 truncate">{project.year}</div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-stone-400 font-medium">
                  <Tag className="w-4 h-4 text-amber-700 flex-shrink-0" />
                  <span className="truncate">{t?.role || 'Vai trò'}</span>
                </div>
                <div className="font-semibold text-stone-800 mt-1 truncate">
                  {project.role || 'Product Designer'}
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-stone-400 font-medium">
                  <Cpu className="w-4 h-4 text-amber-700 flex-shrink-0" />
                  <span className="truncate">{t?.platforms || 'Nền tảng'}</span>
                </div>
                <div className="font-semibold text-stone-800 mt-1 truncate">
                  {project.platforms ? (Array.isArray(project.platforms) ? project.platforms.join(' · ') : project.platforms) : 'B2C Web · B2B · Admin · Mobile'}
                </div>
              </div>
            </div>

            {/* Core Skill Tags (8 tags) */}
            {project.tags && project.tags.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2.5">
                  {t?.coreSkills || 'Lĩnh Vực & Kỹ Năng Thiết Kế Cốt Lõi'}
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-amber-100/80 text-amber-900 text-xs sm:text-sm font-medium border border-amber-200/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* HA LONG LUXE SPECIFIC DETAILED CONTENT SECTIONS */}
            {isHaLongLuxe && (
              <>
                {/* 4. Project Overview / Challenge (Bài toán) */}
                {project.challenge && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block">
                      {project.challenge.sectionLabel || 'BÀI TOÁN'}
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold text-stone-900">
                      {project.challenge.title}
                    </h4>
                    <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-stone-50/80 border border-stone-200 text-stone-700 text-sm sm:text-base leading-relaxed space-y-3">
                      {project.challenge.content.split('\n\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. Product Ecosystem */}
                {project.ecosystem && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                      HỆ SINH THÁI SẢN PHẨM
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-stone-900">
                      {project.ecosystem.title}
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                      {project.ecosystem.groups.map((grp, idx) => (
                        <div
                          key={idx}
                          className="p-4 sm:p-4.5 rounded-xl sm:rounded-2xl bg-amber-50/70 border border-amber-200/70 flex flex-col justify-between"
                        >
                          <div>
                            <span className="font-mono text-xs font-bold text-amber-900 uppercase block mb-1.5">
                              {grp.name}
                            </span>
                            <p className="text-stone-700 text-xs sm:text-sm font-medium leading-relaxed">
                              {grp.flow}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. Booking Journey */}
                {project.bookingJourney && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                      HÀNH TRÌNH ĐẶT CHỖ
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-stone-900">
                      {project.bookingJourney.title}
                    </h5>
                    <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-stone-50/80 border border-stone-200">
                      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                        {project.bookingJourney.steps.map((step, idx) => (
                          <React.Fragment key={idx}>
                            <span className="px-2.5 py-1 rounded-md bg-white border border-stone-200 font-semibold text-stone-800 shadow-xs">
                              {step}
                            </span>
                            {idx < project.bookingJourney.steps.length - 1 && (
                              <ArrowRight className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. Deck & Cabin Selection */}
                {project.deckCabinSelection && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                      TRẢI NGHIỆM CHỌN BOONG & CABIN
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-stone-900">
                      {project.deckCabinSelection.title}
                    </h5>
                    <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-stone-50/80 border border-stone-200 text-stone-700 text-sm sm:text-base leading-relaxed space-y-3">
                      {project.deckCabinSelection.content.split('\n\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                    {project.deckCabinSelection.designDecisions && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {project.deckCabinSelection.designDecisions.map((dec, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/70 text-left"
                          >
                            <span className="font-bold text-amber-900 block text-xs sm:text-sm mb-1">
                              {dec.title}
                            </span>
                            <span className="text-stone-600 text-xs leading-relaxed block">
                              {dec.description}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 8. Booking Information */}
                {project.bookingInformation && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                      THÔNG TIN ĐẶT CHỖ & CHECKOUT
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-stone-900">
                      {project.bookingInformation.title}
                    </h5>
                    <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-stone-50/80 border border-stone-200 text-stone-700 text-sm sm:text-base leading-relaxed space-y-3">
                      {project.bookingInformation.content.split('\n\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* 9. Admin Operations */}
                {project.adminOperations && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                      VẬN HÀNH NỘI BỘ (ADMIN OPERATIONS)
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-stone-900">
                      {project.adminOperations.title}
                    </h5>
                    <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-stone-50/80 border border-stone-200 text-stone-700 text-sm sm:text-base leading-relaxed space-y-3">
                      <p>{project.adminOperations.content}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 py-1">
                        {project.adminOperations.highlights.map((hl, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-lg bg-white border border-stone-200 font-semibold text-amber-900 text-xs sm:text-sm flex items-center gap-2"
                          >
                            <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                      <p>{project.adminOperations.content2}</p>
                    </div>
                  </div>
                )}

                {/* 10. Fleet & Inventory */}
                {project.fleetInventory && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                      CẤU TRÚC ĐỘI TÀU & INVENTORY
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-stone-900">
                      {project.fleetInventory.title}
                    </h5>
                    <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-stone-50/80 border border-stone-200 text-stone-700 text-sm sm:text-base leading-relaxed space-y-3">
                      {project.fleetInventory.content.split('\n\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* 11. B2B Booking */}
                {project.b2bBooking && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                      ĐẠI LÝ B2B (AGENCY BOOKING)
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-stone-900">
                      {project.b2bBooking.title}
                    </h5>
                    <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-stone-50/80 border border-stone-200 text-stone-700 text-sm sm:text-base leading-relaxed">
                      <p>{project.b2bBooking.content}</p>
                    </div>
                  </div>
                )}

                {/* 12. Responsive Design */}
                {project.responsiveDesign && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                      THIẾT KẾ ĐA NỀN TẢNG (RESPONSIVE DESIGN)
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-stone-900">
                      {project.responsiveDesign.title}
                    </h5>
                    <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-stone-50/80 border border-stone-200 text-stone-700 text-sm sm:text-base leading-relaxed">
                      <p>{project.responsiveDesign.content}</p>
                    </div>
                  </div>
                )}

                {/* 13. Design QA & Handoff */}
                {project.designQaHandoff && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                      DESIGN QA & BÀN GIAO (HANDOFF)
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-stone-900">
                      {project.designQaHandoff.title}
                    </h5>
                    <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-stone-50/80 border border-stone-200 text-stone-700 text-sm sm:text-base leading-relaxed space-y-3">
                      <p>{project.designQaHandoff.content}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                        {project.designQaHandoff.qaFocus.map((focus, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-lg bg-white border border-stone-200 text-xs font-medium text-stone-800 flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                            <span className="truncate">{focus}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 14. Project Scope (Phạm vi hệ thống: 14 compact pills/tags) */}
                {project.modules && project.modules.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2.5">
                      PHẠM VI HỆ THỐNG ({project.modules.length} Modules)
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.modules.map((mod, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-lg bg-stone-100 text-stone-700 text-xs sm:text-sm font-medium border border-stone-200/60"
                        >
                          {mod}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* VEVUIVE SPECIFIC DETAILED CONTENT SECTIONS */}
            {isVevuive && (
              <>
                {/* Challenge */}
                {project.challenge && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block">
                      BÀI TOÁN
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold text-stone-900">
                      {project.challenge.title}
                    </h4>
                    <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-stone-50/80 border border-stone-200 text-stone-700 text-sm sm:text-base leading-relaxed space-y-3">
                      {project.challenge.content.split('\n\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ecosystem */}
                {project.productEcosystem && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                      HỆ SINH THÁI SẢN PHẨM
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-stone-900">
                      {project.productEcosystem.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-stone-600">
                      {project.productEcosystem.supportingCopy}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {project.productEcosystem.groups.map((grp, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/70"
                        >
                          <span className="font-mono text-xs font-bold text-amber-900 uppercase block mb-1.5">
                            0{idx + 1} {grp.name}
                          </span>
                          <ul className="space-y-1 text-xs text-stone-700">
                            {grp.items.map((it, itIdx) => (
                              <li key={itIdx} className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0" />
                                <span>{it}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Booking Journey */}
                {project.bookingJourney && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                      HÀNH TRÌNH ĐẶT VÉ
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-stone-900">
                      {project.bookingJourney.title}
                    </h5>
                    <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-stone-50/80 border border-stone-200 space-y-3">
                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                        {project.bookingJourney.content}
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                        {project.bookingJourney.steps.map((step, idx) => (
                          <div key={idx} className="p-2.5 bg-white border border-stone-200 rounded-lg">
                            <span className="font-mono text-[10px] text-amber-700 font-bold block">{String(idx + 1).padStart(2, '0')}</span>
                            <span className="font-semibold text-stone-800 leading-snug">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Web to Mobile */}
                {project.webToMobile && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                      THÍCH ỨNG WEB SANG MOBILE
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-stone-900">
                      {project.webToMobile.title}
                    </h5>
                    <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 italic font-bold text-amber-950 text-sm">
                      "{project.webToMobile.highlightQuote}"
                    </div>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                      {project.webToMobile.content}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {project.webToMobile.designPrinciples.map((dp, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-white border border-stone-200">
                          <span className="font-mono text-xs font-bold text-amber-800 uppercase block mb-1">
                            0{idx + 1} · {dp.title}
                          </span>
                          <p className="text-xs text-stone-600">{dp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Insurance Integration */}
                {project.insuranceIntegration && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                      TÍCH HỢP BẢO HIỂM (BA CONTRIBUTION)
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-stone-900">
                      {project.insuranceIntegration.title}
                    </h5>
                    <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900">
                      ⭐ Nguyên tắc: {project.insuranceIntegration.designPrinciple}
                    </div>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                      {project.insuranceIntegration.content}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                      {project.insuranceIntegration.areas.map((a, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-white border border-stone-200 space-y-1">
                          <span className="font-mono text-[11px] font-bold text-amber-800 uppercase block">0{idx + 1} · {a.name}</span>
                          <p className="text-xs text-stone-600 leading-relaxed">{a.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* System States */}
                {project.systemStates && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                      TRẠNG THÁI HỆ THỐNG
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-stone-900">
                      {project.systemStates.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                      {project.systemStates.content}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                      {project.systemStates.states.map((st, idx) => (
                        <div key={idx} className="p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-center font-semibold text-stone-800">
                          {st}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Scope */}
                {project.productScope && project.productScope.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2.5">
                      PHẠM VI TÍNH NĂNG ({project.productScope.length} Modules)
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.productScope.map((mod, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-lg bg-amber-50/70 text-amber-900 text-xs sm:text-sm font-semibold border border-amber-200/70"
                        >
                          {mod}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reflection */}
                {project.reflection && (
                  <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-amber-50/70 border border-amber-200/70 space-y-1.5">
                    <span className="font-bold text-amber-900 text-xs uppercase tracking-wider block">
                      {project.reflection.title}
                    </span>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                      {project.reflection.content}
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Standard Key Deliverables & System Logic for other projects */}
            {!isHaLongLuxe && !isVevuive && (
              <>
                {/* Key Deliverables */}
                <div className="space-y-2.5 sm:space-y-3">
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                    {t?.deliverables || 'Hạng Mục Bàn Giao & Thực Thi'}
                  </h4>
                  <div className="space-y-2.5 sm:space-y-3 bg-stone-50/80 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-stone-200">
                    {deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-stone-700 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Logic Highlights */}
                {project.systemLogic && project.systemLogic.length > 0 && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                      {t?.systemLogicTitle || 'Điểm Sáng Logic Hệ Thống & Kiến Trúc'}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {project.systemLogic.map((logic, idx) => (
                        <div key={idx} className="p-4 sm:p-4.5 rounded-xl sm:rounded-2xl bg-amber-50/70 border border-amber-200/70">
                          <span className="font-bold text-amber-900 block mb-1 text-sm sm:text-base">{logic.title}</span>
                          <span className="text-stone-600 leading-relaxed text-xs sm:text-sm">{logic.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Operational Modules */}
                {project.modules && project.modules.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2.5">
                      {t?.modulesTitle || 'Phân Hệ Chức Năng'} ({project.modules.length} {t?.modulesUnit || 'Modules'})
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.modules.map((mod, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-lg bg-stone-100 text-stone-700 text-xs sm:text-sm font-medium border border-stone-200/60">
                          {mod}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Actions: Stacks on mobile, inline on tablet & desktop */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-5 border-t border-stone-200">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-medium text-sm hover:bg-stone-100 transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
              >
                {t?.close || 'Đóng'}
              </button>
              <a
                href="#contact"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-semibold text-sm shadow-md shadow-amber-900/20 transition-all min-h-[44px]"
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
              <p className="text-xs text-stone-400">
                {t?.imageCounter || 'Hình'} {activeImageIndex + 1} / {images.length}
              </p>
            </div>

            <button
              onClick={() => setIsZoomOpen(false)}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-stone-900 flex items-center justify-center transition-colors cursor-pointer shadow-lg flex-shrink-0"
              title={t?.closeZoom || 'Đóng'}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Fullscreen Image / Placeholder */}
          <div
            className="relative max-w-6xl max-h-[82vh] sm:max-h-[85vh] w-full h-full flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            {!isCurrentImgError ? (
              <img
                src={currentImg.src}
                alt={currentImg.label}
                onError={() => setImgErrors((prev) => ({ ...prev, [activeImageIndex]: true }))}
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              />
            ) : (
              <div className="max-w-xl w-full p-8 rounded-2xl bg-stone-900 border border-amber-600/30 text-left text-white space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase bg-amber-500/15 border border-amber-500/30 text-amber-300">
                    Image Slot #{activeImageIndex + 1}
                  </span>
                  <span className="text-xs font-mono text-stone-400">
                    {currentImg.aspectRatio === 'mobile' ? 'MOBILE' : '16:10'}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-mono text-amber-400 uppercase">{project.shortTitle}</div>
                  <h3 className="text-xl font-bold mt-1 text-white">{currentImg.label}</h3>
                  <p className="text-sm text-stone-300 mt-2">{currentImg.slotPurpose || currentImg.description}</p>
                </div>
                <div className="pt-3 border-t border-stone-800 flex items-center gap-2 text-xs font-mono text-stone-300">
                  <FileCode className="w-4 h-4 text-amber-400" />
                  <span>Waiting for:</span>
                  <span className="text-amber-300 font-semibold">{derivedExpectedFile}</span>
                </div>
              </div>
            )}
          </div>

          {/* Prev / Next Arrows in Lightbox */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-amber-800 text-white flex items-center justify-center shadow-xl transition-all cursor-pointer border border-white/20"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-amber-800 text-white flex items-center justify-center shadow-xl transition-all cursor-pointer border border-white/20"
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
