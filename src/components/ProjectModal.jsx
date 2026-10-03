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
import ImageLightboxModal from './ImageLightboxModal';

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
  const isKhoMA = project.slug === 'ma-warehouse' || project.slug === 'kho-ma';
  const isTourismSystem = project.slug === 'tourism-omnichannel' || project.slug === 'khu-du-lich';
  const isCorporateWebsite = project.slug === 'corporate-website';

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
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#061826]/80 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[94vh] sm:max-h-[92vh] overflow-y-auto shadow-2xl border border-[#D9E2EC] relative animate-scaleUp text-left"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Right Action Buttons: Zoom & Close */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setIsZoomOpen(true)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0B2235]/80 hover:bg-[#FF7A1A] text-white flex items-center justify-center shadow-md transition-colors cursor-pointer border border-white/20"
              title={t?.zoomIn || 'Bấm để xem ảnh phóng to'}
            >
              <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-[#102A43] hover:text-[#FF7A1A] flex items-center justify-center shadow-lg transition-colors cursor-pointer border border-[#D9E2EC]"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Interactive UI Screen Slider */}
          <div className="relative w-full bg-[#061826] overflow-hidden rounded-t-2xl sm:rounded-t-3xl select-none group">
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
                  className="w-full h-full object-contain bg-[#061826] transition-opacity duration-300"
                />
              ) : (
                /* Technical slot placeholder for missing images (NO stock photos) */
                <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between text-left select-none overflow-hidden bg-gradient-to-br from-[#0B2235] via-[#061826] to-[#0A192F]">
                  {/* Subtle Grid Background Pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.08] pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 1px 1px, #FF7A1A 1px, transparent 0)',
                      backgroundSize: '24px 24px',
                    }}
                  />

                  {/* Top Bar with Slot Badge */}
                  <div className="relative z-10 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs tabular-nums font-semibold tracking-wider uppercase bg-[#FF7A1A]/15 border border-[#FF7A1A]/30 text-[#FF7A1A]">
                      {currentImg.aspectRatio === 'mobile' ? (
                        <Smartphone className="w-3 h-3 text-[#FF7A1A]" />
                      ) : (
                        <Layers className="w-3 h-3 text-[#FF7A1A]" />
                      )}
                      <span>{currentImg.aspectRatio === 'mobile' ? 'Mobile Screen Slot' : 'Image Slot'}</span>
                    </span>

                    <span className="text-xs tabular-nums text-slate-400 uppercase tracking-widest">
                      {currentImg.aspectRatio === 'mobile' ? 'MOBILE (9:16)' : '16:10'}
                    </span>
                  </div>

                  {/* Middle Info */}
                  <div className="relative z-10 my-auto py-4 space-y-2 max-w-2xl">
                    <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF7A1A] tabular-nums">
                      {project.shortTitle || project.title}
                    </div>
                    <h4 className="text-lg sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
                      {currentImg.label || `${project.shortTitle} — Screen ${activeImageIndex + 1}`}
                    </h4>
                    {(currentImg.slotPurpose || currentImg.description) && (
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                        {currentImg.slotPurpose || currentImg.description}
                      </p>
                    )}
                  </div>

                  {/* Bottom Notice */}
                  <div className="relative z-10 pt-3 border-t border-[#12304A] flex flex-wrap items-center justify-between gap-2 text-xs tabular-nums">
                    <div className="flex items-center gap-2 text-slate-300 bg-[#061826]/80 px-3 py-1.5 rounded-lg border border-[#12304A]">
                      <FileCode className="w-3.5 h-3.5 text-[#FF7A1A] flex-shrink-0" />
                      <span className="text-slate-400">Waiting for:</span>
                      <span className="text-[#FF7A1A] font-semibold">{derivedExpectedFile}</span>
                    </div>
                    <span className="text-xs text-slate-500">
                      {activeImageIndex + 1} / {images.length}
                    </span>
                  </div>
                </div>
              )}

              {/* Gradient overlay for text readability when real image is present */}
              {!isCurrentImgError && (
                <div className="absolute inset-0 bg-gradient-to-t from-[#061826]/90 via-transparent to-transparent pointer-events-none" />
              )}

              {/* Top Controls Overlay */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5 sm:gap-2 z-10 pointer-events-auto max-w-[calc(100%-80px)]">
                <span className="bg-[#FF7A1A] text-white text-xs sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md truncate">
                  {project.category}
                </span>
                <span className="bg-[#0B2235]/80 backdrop-blur-md text-white text-xs sm:text-xs font-semibold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-md flex items-center gap-1 border border-white/10 whitespace-nowrap flex-shrink-0">
                  <ImageIcon className="w-3 h-3 text-[#FF7A1A]" />
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
                      <p className="text-slate-300 text-xs sm:text-xs mt-0.5 line-clamp-1 drop-shadow-sm font-normal">
                        {currentImg.slotPurpose || currentImg.description}
                      </p>
                    )}
                  </div>
                  <span className="text-xs sm:text-xs text-white font-semibold bg-[#0B2235]/90 backdrop-blur-sm px-2 sm:px-2.5 py-0.5 rounded-md border border-[#3B82C4]/40 self-start sm:self-auto flex-shrink-0">
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
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0B2235]/80 hover:bg-[#FF7A1A] text-white flex items-center justify-center shadow-lg transition-all duration-200 border border-white/15 z-10 cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0B2235]/80 hover:bg-[#FF7A1A] text-white flex items-center justify-center shadow-lg transition-all duration-200 border border-white/15 z-10 cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </>
            )}

            {/* Thumbnail Navigation Strip */}
            {images.length > 1 && (
              <div className="bg-[#061826]/95 border-t border-[#12304A] p-2 sm:p-2.5 flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none">
                {images.map((img, idx) => {
                  const isThumbErr = Boolean(imgErrors[idx] || !img.src);
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative flex-shrink-0 w-14 sm:w-20 aspect-[16/10] rounded-md sm:rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-[#FF7A1A] scale-105 shadow-md shadow-[#FF7A1A]/30'
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
                        <div className="w-full h-full bg-[#061826] flex flex-col items-center justify-center text-[#FF7A1A] tabular-nums text-xs font-bold border border-[#FF7A1A]/30">
                          <span>SLOT</span>
                        </div>
                      )}
                      <span className="absolute bottom-0.5 right-1 text-xs sm:text-xs tabular-nums font-bold text-white bg-black/60 px-1 rounded">
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
              <span className="typo-eyebrow text-[#FF7A1A] block mb-1">
                {t?.caseStudyNumber || 'HỒ SƠ DỰ ÁN'} #{project.index || (project.id < 10 ? '0' + project.id : project.id)}
              </span>
              <h3 className="typo-h3 text-[#102A43]">
                {project.detailTitle || project.title}
              </h3>
              <p className="typo-lead text-[#627D98] mt-2.5 sm:mt-3 max-w-[62ch]">
                {project.summary || project.intro || project.description}
              </p>
            </div>

            {/* Meta Grid: 2 cols on mobile/tablet, 4 cols on desktop */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-[#D9E2EC] typo-caption">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-[#627D98] font-medium">
                  <Layers className="w-4 h-4 text-[#0B2235] flex-shrink-0" />
                  <span>{t?.client || 'Lĩnh vực'}</span>
                </div>
                <div className="typo-small-semibold text-[#102A43] mt-1 leading-snug break-words">
                  {project.domain || project.client || 'Digital Product'}
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-[#627D98] font-medium">
                  <Calendar className="w-4 h-4 text-[#0B2235] flex-shrink-0" />
                  <span>{t?.year || 'Năm'}</span>
                </div>
                <div className="typo-small-semibold text-[#102A43] mt-1">{project.year}</div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-[#627D98] font-medium">
                  <Tag className="w-4 h-4 text-[#0B2235] flex-shrink-0" />
                  <span>{t?.role || 'Vai trò'}</span>
                </div>
                <div className="typo-small-semibold text-[#102A43] mt-1 leading-snug break-words">
                  {project.role || 'Product Designer'}
                </div>
                {project.metadata?.baContribution && (
                  <div className="typo-caption text-[#FF7A1A] font-semibold mt-1 leading-snug">
                    + {project.metadata.baContribution}
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-[#627D98] font-medium">
                  <Cpu className="w-4 h-4 text-[#0B2235] flex-shrink-0" />
                  <span>{t?.platforms || 'Nền tảng'}</span>
                </div>
                <div className="typo-small-semibold text-[#102A43] mt-1 leading-snug break-words">
                  {project.platforms ? (Array.isArray(project.platforms) ? project.platforms.join(' · ') : project.platforms) : 'B2C Web · B2B · Admin · Mobile'}
                </div>
              </div>
            </div>

            {/* Core Skill Tags (8 tags) */}
            {project.tags && project.tags.length > 0 && (
              <div>
                <h4 className="typo-eyebrow text-[#627D98] mb-2.5">
                  {t?.coreSkills || 'Lĩnh Vực & Kỹ Năng Thiết Kế Cốt Lõi'}
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-[#FFF2E6] text-[#FF7A1A] typo-caption font-semibold border border-[#FFD4B2]"
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
                    <span className="text-xs font-bold text-[#FF7A1A] uppercase tracking-widest block">
                      {project.challenge.sectionLabel || 'BÀI TOÁN'}
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold text-[#102A43]">
                      {project.challenge.title}
                    </h4>
                    <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-[#D9E2EC] text-[#627D98] text-sm sm:text-base leading-relaxed space-y-3">
                      {project.challenge.content.split('\n\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. Product Ecosystem */}
                {project.ecosystem && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-[#627D98] uppercase tracking-wider">
                      HỆ SINH THÁI SẢN PHẨM
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-[#102A43]">
                      {project.ecosystem.title}
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                      {project.ecosystem.groups.map((grp, idx) => (
                        <div
                          key={idx}
                          className="p-4 sm:p-4.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-[#D9E2EC] flex flex-col justify-between"
                        >
                          <div>
                            <span className="tabular-nums text-xs font-bold text-[#0B2235] uppercase block mb-1.5">
                              {grp.name}
                            </span>
                            <p className="text-[#627D98] text-xs sm:text-sm font-medium leading-relaxed">
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
                    <h4 className="text-xs font-bold text-[#627D98] uppercase tracking-wider">
                      HÀNH TRÌNH ĐẶT CHỖ
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-[#102A43]">
                      {project.bookingJourney.title}
                    </h5>
                    <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-[#D9E2EC]">
                      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                        {project.bookingJourney.steps.map((step, idx) => (
                          <React.Fragment key={idx}>
                            <span className="px-2.5 py-1 rounded-md bg-white border border-[#D9E2EC] font-semibold text-[#102A43] shadow-xs">
                              {step}
                            </span>
                            {idx < project.bookingJourney.steps.length - 1 && (
                              <ArrowRight className="w-3.5 h-3.5 text-[#FF7A1A] flex-shrink-0" />
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
                    <h4 className="text-xs font-bold text-[#627D98] uppercase tracking-wider">
                      TRẢI NGHIỆM CHỌN BOONG & CABIN
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-[#102A43]">
                      {project.deckCabinSelection.title}
                    </h5>
                    <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-[#D9E2EC] text-[#627D98] text-sm sm:text-base leading-relaxed space-y-3">
                      {project.deckCabinSelection.content.split('\n\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                    {project.deckCabinSelection.designDecisions && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {project.deckCabinSelection.designDecisions.map((dec, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl bg-slate-50 border border-[#D9E2EC] text-left"
                          >
                            <span className="font-bold text-[#0B2235] block text-xs sm:text-sm mb-1">
                              {dec.title}
                            </span>
                            <span className="text-[#627D98] text-xs leading-relaxed block">
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
                    <h4 className="text-xs font-bold text-[#627D98] uppercase tracking-wider">
                      THÔNG TIN ĐẶT CHỖ & CHECKOUT
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-[#102A43]">
                      {project.bookingInformation.title}
                    </h5>
                    <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-[#D9E2EC] text-[#627D98] text-sm sm:text-base leading-relaxed space-y-3">
                      {project.bookingInformation.content.split('\n\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* 9. Admin Operations */}
                {project.adminOperations && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-[#627D98] uppercase tracking-wider">
                      VẬN HÀNH NỘI BỘ (ADMIN OPERATIONS)
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-[#102A43]">
                      {project.adminOperations.title}
                    </h5>
                    <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-[#D9E2EC] text-[#627D98] text-sm sm:text-base leading-relaxed space-y-3">
                      <p>{project.adminOperations.content}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 py-1">
                        {project.adminOperations.highlights.map((hl, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-lg bg-white border border-[#D9E2EC] font-semibold text-[#102A43] text-xs sm:text-sm flex items-center gap-2"
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
                    <h4 className="text-xs font-bold text-[#627D98] uppercase tracking-wider">
                      CẤU TRÚC ĐỘI TÀU & INVENTORY
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-[#102A43]">
                      {project.fleetInventory.title}
                    </h5>
                    <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-[#D9E2EC] text-[#627D98] text-sm sm:text-base leading-relaxed space-y-3">
                      {project.fleetInventory.content.split('\n\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* 11. B2B Booking */}
                {project.b2bBooking && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-[#627D98] uppercase tracking-wider">
                      ĐẠI LÝ B2B (AGENCY BOOKING)
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-[#102A43]">
                      {project.b2bBooking.title}
                    </h5>
                    <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-[#D9E2EC] text-[#627D98] text-sm sm:text-base leading-relaxed">
                      <p>{project.b2bBooking.content}</p>
                    </div>
                  </div>
                )}

                {/* 12. Responsive Design */}
                {project.responsiveDesign && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-[#627D98] uppercase tracking-wider">
                      THIẾT KẾ ĐA NỀN TẢNG (RESPONSIVE DESIGN)
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-[#102A43]">
                      {project.responsiveDesign.title}
                    </h5>
                    <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-[#D9E2EC] text-[#627D98] text-sm sm:text-base leading-relaxed">
                      <p>{project.responsiveDesign.content}</p>
                    </div>
                  </div>
                )}

                {/* 13. Design QA & Handoff */}
                {project.designQaHandoff && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-[#627D98] uppercase tracking-wider">
                      DESIGN QA & BÀN GIAO (HANDOFF)
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-[#102A43]">
                      {project.designQaHandoff.title}
                    </h5>
                    <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-[#D9E2EC] text-[#627D98] text-sm sm:text-base leading-relaxed space-y-3">
                      <p>{project.designQaHandoff.content}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                        {project.designQaHandoff.qaFocus.map((focus, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-lg bg-white border border-[#D9E2EC] text-xs font-medium text-[#102A43] flex items-center gap-1.5"
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
                    <h4 className="text-xs font-bold text-[#627D98] uppercase tracking-wider mb-2.5">
                      PHẠM VI HỆ THỐNG ({project.modules.length} Modules)
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.modules.map((mod, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-lg bg-slate-100 text-[#102A43] text-xs sm:text-sm font-medium border border-[#D9E2EC]"
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
                    <span className="text-xs font-bold text-[#FF7A1A] uppercase tracking-widest block">
                      BÀI TOÁN
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold text-[#102A43]">
                      {project.challenge.title}
                    </h4>
                    <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-[#D9E2EC] text-[#627D98] text-sm sm:text-base leading-relaxed space-y-3">
                      {project.challenge.content.split('\n\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ecosystem */}
                {project.productEcosystem && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-[#627D98] uppercase tracking-wider">
                      HỆ SINH THÁI SẢN PHẨM
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-[#102A43]">
                      {project.productEcosystem.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-[#627D98]">
                      {project.productEcosystem.supportingCopy}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {project.productEcosystem.groups.map((grp, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-slate-50 border border-[#D9E2EC]"
                        >
                          <span className="tabular-nums text-xs font-bold text-[#0B2235] uppercase block mb-1.5">
                            0{idx + 1} {grp.name}
                          </span>
                          <ul className="space-y-1 text-xs text-[#627D98]">
                            {grp.items.map((it, itIdx) => (
                              <li key={itIdx} className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A1A] flex-shrink-0" />
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
                    <h4 className="text-xs font-bold text-[#627D98] uppercase tracking-wider">
                      HÀNH TRÌNH ĐẶT VÉ
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-[#102A43]">
                      {project.bookingJourney.title}
                    </h5>
                    <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-[#D9E2EC] space-y-3">
                      <p className="text-xs sm:text-sm text-[#627D98] leading-relaxed">
                        {project.bookingJourney.content}
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                        {project.bookingJourney.steps.map((step, idx) => (
                          <div key={idx} className="p-2.5 bg-white border border-[#D9E2EC] rounded-lg">
                            <span className="tabular-nums text-xs text-[#FF7A1A] font-bold block">{String(idx + 1).padStart(2, '0')}</span>
                            <span className="font-semibold text-[#102A43] leading-snug">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Web to Mobile */}
                {project.webToMobile && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-[#627D98] uppercase tracking-wider">
                      THÍCH ỨNG WEB SANG MOBILE
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-[#102A43]">
                      {project.webToMobile.title}
                    </h5>
                    <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-l-[#FF7A1A] border border-[#D9E2EC] italic font-bold text-[#102A43] text-sm">
                      "{project.webToMobile.highlightQuote}"
                    </div>
                    <p className="text-xs sm:text-sm text-[#627D98] leading-relaxed">
                      {project.webToMobile.content}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {project.webToMobile.designPrinciples.map((dp, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-white border border-[#D9E2EC]">
                          <span className="tabular-nums text-xs font-bold text-[#0B2235] uppercase block mb-1">
                            0{idx + 1} · {dp.title}
                          </span>
                          <p className="text-xs text-[#627D98]">{dp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Insurance Integration */}
                {project.insuranceIntegration && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-[#627D98] uppercase tracking-wider">
                      TÍCH HỢP BẢO HIỂM (BA CONTRIBUTION)
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-[#102A43]">
                      {project.insuranceIntegration.title}
                    </h5>
                    <div className="p-3 rounded-lg bg-[#FFF2E6] border border-[#FFD4B2] text-xs font-bold text-[#FF7A1A]">
                      ⭐ Nguyên tắc: {project.insuranceIntegration.designPrinciple}
                    </div>
                    <p className="text-xs sm:text-sm text-[#627D98] leading-relaxed">
                      {project.insuranceIntegration.content}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                      {project.insuranceIntegration.areas.map((a, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-white border border-[#D9E2EC] space-y-1">
                          <span className="tabular-nums text-xs font-bold text-[#0B2235] uppercase block">0{idx + 1} · {a.name}</span>
                          <p className="text-xs text-[#627D98] leading-relaxed">{a.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* System States */}
                {project.systemStates && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-[#627D98] uppercase tracking-wider">
                      TRẠNG THÁI HỆ THỐNG
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-[#102A43]">
                      {project.systemStates.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-[#627D98] leading-relaxed">
                      {project.systemStates.content}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                      {project.systemStates.states.map((st, idx) => (
                        <div key={idx} className="p-2.5 bg-slate-50 border border-[#D9E2EC] rounded-lg text-center font-semibold text-[#102A43]">
                          {st}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Scope */}
                {project.productScope && project.productScope.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-[#627D98] uppercase tracking-wider mb-2.5">
                      PHẠM VI TÍNH NĂNG ({project.productScope.length} Modules)
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.productScope.map((mod, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-lg bg-slate-100 text-[#102A43] text-xs sm:text-sm font-semibold border border-[#D9E2EC]"
                        >
                          {mod}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reflection */}
                {project.reflection && (
                  <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-[#D9E2EC] space-y-1.5">
                    <span className="font-bold text-[#0B2235] text-xs uppercase tracking-wider block">
                      {project.reflection.title}
                    </span>
                    <p className="text-xs sm:text-sm text-[#627D98] leading-relaxed">
                      {project.reflection.content}
                    </p>
                  </div>
                )}
              </>
            )}

            {/* KHO MA SPECIFIC DETAILED CONTENT SECTIONS */}
            {isKhoMA && (
              <>
                {/* Challenge */}
                {project.challenge && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <span className="text-xs font-bold text-[#FF7A1A] uppercase tracking-widest block">
                      BÀI TOÁN
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold text-[#102A43]">
                      {project.challenge.title}
                    </h4>
                    <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-[#D9E2EC] text-[#627D98] text-sm sm:text-base leading-relaxed space-y-3">
                      {(project.challenge.content || '').split('\n\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Operational Overview */}
                {project.operationalOverview && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-[#627D98] uppercase tracking-wider">
                      TỔNG QUAN VẬN HÀNH
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-[#102A43]">
                      {project.operationalOverview.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-[#627D98] leading-relaxed">
                      {project.operationalOverview.content}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {(project.operationalOverview.kpis || []).map((kpi, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-[#D9E2EC] text-xs font-semibold text-[#102A43] flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A1A] flex-shrink-0" />
                          <span>{kpi}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Managing Ticket Inventory */}
                {project.ticketInventorySection && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-[#627D98] uppercase tracking-wider">
                      QUẢN LÝ KHO VÉ & TRUY VẾT
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-[#102A43]">
                      {project.ticketInventorySection.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-[#627D98] leading-relaxed">
                      {project.ticketInventorySection.content}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {(project.ticketInventorySection.keyAreas || []).map((area, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-white border border-[#D9E2EC] space-y-1">
                          <span className="font-bold text-xs text-[#0B2235] block">{area.title}</span>
                          <p className="text-xs text-[#627D98] leading-relaxed">{area.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Guided Refund Flow */}
                {project.guidedRefundFlow && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-[#627D98] uppercase tracking-wider">
                      LUỒNG TẠO YÊU CẦU HOÀN / HỦY VÉ (3 BƯỚC)
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-[#102A43]">
                      {project.guidedRefundFlow.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-[#627D98] leading-relaxed">
                      {project.guidedRefundFlow.content}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {(project.guidedRefundFlow.steps || []).map((st, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-[#D9E2EC] space-y-1">
                          <span className="tabular-nums text-xs font-bold text-[#0B2235] uppercase block">
                            BƯỚC {st.step} · {st.title}
                          </span>
                          <p className="text-xs text-[#627D98] leading-relaxed">{st.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ticket-Level Processing */}
                {project.ticketLevelProcessing && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-[#627D98] uppercase tracking-wider">
                      XỬ LÝ CẤP ĐỘ VÉ & WORKING CONTEXT
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-[#102A43]">
                      {project.ticketLevelProcessing.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-[#627D98] leading-relaxed">
                      {project.ticketLevelProcessing.content}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {(project.ticketLevelProcessing.features || []).map((feat, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white text-[#102A43] border border-[#D9E2EC] rounded-lg font-medium shadow-2xs">
                          ✓ {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Decision States */}
                {project.decisionStates && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-[#627D98] uppercase tracking-wider">
                      TRẠNG THÁI QUYẾT ĐỊNH MINH BẠCH
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-[#102A43]">
                      {project.decisionStates.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-[#627D98] leading-relaxed">
                      {project.decisionStates.content}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {(project.decisionStates.states || []).map((st, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-white border border-[#D9E2EC] space-y-1">
                          <span className="font-bold text-xs text-[#102A43] block">{st.title}</span>
                          <p className="text-xs text-[#627D98] leading-relaxed">{st.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Multi-role Workflow */}
                {project.multiRoleWorkflow && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-[#627D98] uppercase tracking-wider">
                      VẬN HÀNH ĐA VAI TRÒ
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-[#102A43]">
                      {project.multiRoleWorkflow.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-[#627D98] leading-relaxed">
                      {project.multiRoleWorkflow.content}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {(project.multiRoleWorkflow.roles || []).map((r, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-[#D9E2EC] space-y-1">
                          <span className="tabular-nums text-xs font-bold text-[#0B2235] uppercase block">0{idx + 1} · {r.role}</span>
                          <p className="text-xs text-[#627D98] leading-relaxed">{r.scope}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Scope */}
                {project.modules && project.modules.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-[#627D98] uppercase tracking-wider mb-2.5">
                      PHẠM VI HỆ THỐNG ({project.modules.length} Modules)
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.modules.map((mod, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-lg bg-slate-100 text-[#102A43] text-xs sm:text-sm font-semibold border border-[#D9E2EC]"
                        >
                          {mod}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* TOURISM SYSTEM (KHU DU LỊCH) DEDICATED SECTIONS */}
            {isTourismSystem && (
              <>
                {/* 01. Operational Surfaces */}
                {project.operationalSurfaces && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-[#3B82C4] uppercase tracking-wider">
                      01 · ĐA BỀ MẶT VẬN HÀNH LIÊN KẾT
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-[#102A43]">
                      {project.operationalSurfaces.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-[#627D98] leading-relaxed">
                      {project.operationalSurfaces.content}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                      {(project.operationalSurfaces.surfaces || []).map((surf, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-[#D9E2EC] space-y-1">
                          <span className="tabular-nums text-xs font-bold text-[#0B2235] uppercase block">0{idx + 1} · {surf.name}</span>
                          <p className="text-xs text-[#627D98] leading-snug">{surf.purpose}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 02. Product & Ticket Inventory */}
                {project.productInventory && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-[#3B82C4] uppercase tracking-wider">
                      02 · QUẢN TRỊ SẢN PHẨM & KHO VÉ
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-[#102A43]">
                      {project.productInventory.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-[#627D98] leading-relaxed">
                      {project.productInventory.content}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(project.productInventory.keyAreas || []).map((area, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-white border border-[#D9E2EC] space-y-1">
                          <span className="font-bold text-xs text-[#0B2235] block">{area.title}</span>
                          <p className="text-xs text-[#627D98] leading-relaxed">{area.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 03. Customer Booking Experience */}
                {project.bookableExperience && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-[#3B82C4] uppercase tracking-wider">
                      03 · TRẢI NGHIỆM ĐẶT VÉ TRỰC QUAN
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-[#102A43]">
                      {project.bookableExperience.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-[#627D98] leading-relaxed">
                      {project.bookableExperience.content}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {(project.bookableExperience.features || []).map((feat, idx) => (
                        <span key={idx} className="px-3 py-1 bg-[#FFF2E6] text-[#FF7A1A] border border-[#FFD4B2] rounded-lg font-medium">
                          ✓ {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 04. Counter POS */}
                {project.counterPos && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-[#3B82C4] uppercase tracking-wider">
                      04 · BÁN VÉ TẠI QUẦY (COUNTER POS)
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-[#102A43]">
                      {project.counterPos.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-[#627D98] leading-relaxed">
                      {project.counterPos.content}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {(project.counterPos.posWorkflow || []).map((wf, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-white border border-[#D9E2EC] text-xs font-semibold text-[#102A43] flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A1A] flex-shrink-0" />
                          <span>{wf}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 05. Ticket Issuance */}
                {project.ticketIssuance && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-[#3B82C4] uppercase tracking-wider">
                      05 · PHÁT HÀNH VÉ ĐIỆN TỬ
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-[#102A43]">
                      {project.ticketIssuance.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-[#627D98] leading-relaxed">
                      {project.ticketIssuance.content}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                      {(project.ticketIssuance.ticketElements || []).map((elem, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-[#D9E2EC] text-xs font-medium text-[#102A43]">
                          ✓ {elem}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 06. Check-in Validation */}
                {project.checkinValidation && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-[#3B82C4] uppercase tracking-wider">
                      06 · SOÁT VÉ CHECK-IN TẠI CỔNG
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-[#102A43]">
                      {project.checkinValidation.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-[#627D98] leading-relaxed">
                      {project.checkinValidation.content}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                      {(project.checkinValidation.validationSteps || []).map((step, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-white border border-[#D9E2EC] text-xs text-[#102A43]">
                          <span className="font-bold text-[#0B2235] block mb-0.5">0{idx + 1}</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 07. State Design */}
                {project.checkinStates && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-[#3B82C4] uppercase tracking-wider">
                      07 · THIẾT KẾ ĐA TRẠNG THÁI (STATE DESIGN)
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-[#102A43]">
                      {project.checkinStates.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-[#627D98] leading-relaxed">
                      {project.checkinStates.content}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {(project.checkinStates.states || []).map((st, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-white border border-[#D9E2EC] space-y-1">
                          <span className="font-bold text-xs text-[#102A43] block">{st.title}</span>
                          <p className="text-xs text-[#627D98] leading-relaxed">{st.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 08. Ticket Lifecycle */}
                {project.ticketLifecycleSection && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-[#3B82C4] uppercase tracking-wider">
                      08 · VÒNG ĐỜI TẤM VÉ DU LỊCH (LIFECYCLE)
                    </h4>
                    <h5 className="text-base sm:text-lg font-bold text-[#102A43]">
                      {project.ticketLifecycleSection.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-[#627D98] leading-relaxed">
                      {project.ticketLifecycleSection.content}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                      {(project.ticketLifecycleSection.lifecycleSteps || []).map((step, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-[#D9E2EC] space-y-1">
                          <span className="tabular-nums text-xs font-bold text-[#0B2235] uppercase block">GIAI ĐOẠN 0{idx + 1}</span>
                          <p className="text-xs text-[#627D98] leading-snug">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Scope */}
                {project.modules && project.modules.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-[#627D98] uppercase tracking-wider mb-2.5">
                      PHẠM VI HỆ THỐNG ({project.modules.length} Phân Hệ)
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.modules.map((mod, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-lg bg-slate-100 text-[#102A43] text-xs sm:text-sm font-semibold border border-[#D9E2EC]"
                        >
                          {mod}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* TECHERA CORPORATE WEBSITE SPECIFIC CONTENT */}
            {isCorporateWebsite && (
              <>
                {/* 01. Website Information Architecture */}
                <div className="space-y-2.5 sm:space-y-3">
                  <h4 className="text-xs font-bold text-[#FF7A1A] uppercase tracking-wider">
                    01 · KIẾN TRÚC THÔNG TIN & ĐIỀU HƯỚNG WEBSITE
                  </h4>
                  <h5 className="text-base sm:text-lg font-bold text-[#102A43]">
                    Phân Tầng Cấu Trúc Đa Dạng Nội Dung Trong Một Hệ Thống Thống Nhất
                  </h5>
                  <p className="text-xs sm:text-sm text-[#627D98] leading-relaxed">
                    Website kết hợp truyền thông sản phẩm công nghệ, thông tin doanh nghiệp và nội dung biên tập dưới một hệ thống điều hướng đồng nhất. Cấu trúc thông tin phân tầng giúp định hướng khách hàng từ bước làm quen với TECHERA đến hiểu sâu giải pháp, xem dự án thực tế và gửi yêu cầu tư vấn.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    <div className="p-3 rounded-xl bg-slate-50 border border-[#D9E2EC] space-y-1">
                      <span className="tabular-nums text-xs font-bold text-[#0B2235] uppercase block">01 · Doanh Nghiệp</span>
                      <p className="text-xs text-[#627D98] leading-snug">Trang chủ định vị, Về chúng tôi, Đối tác công nghệ</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-[#D9E2EC] space-y-1">
                      <span className="tabular-nums text-xs font-bold text-[#0B2235] uppercase block">02 · Giải Pháp</span>
                      <p className="text-xs text-[#627D98] leading-snug">Hệ sinh thái dịch vụ số, Vé, Sân golf, ERP, CRM</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-[#D9E2EC] space-y-1">
                      <span className="tabular-nums text-xs font-bold text-[#0B2235] uppercase block">03 · Dự Án & Tri Thức</span>
                      <p className="text-xs text-[#627D98] leading-snug">Danh mục dự án, Chi tiết dự án, Case Study, Blog</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-[#D9E2EC] space-y-1">
                      <span className="tabular-nums text-xs font-bold text-[#FF7A1A] uppercase block">04 · Chuyển Đổi</span>
                      <p className="text-xs text-[#627D98] leading-snug">Trang liên hệ văn phòng, Đăng ký tư vấn chuyển đổi số</p>
                    </div>
                  </div>
                </div>

                {/* 02. Responsive Adaptation */}
                <div className="space-y-2.5 sm:space-y-3">
                  <h4 className="text-xs font-bold text-[#FF7A1A] uppercase tracking-wider">
                    02 · THÍCH ỨNG BỐ CỤC THEO CẤU TRÚC (RESPONSIVE BY STRUCTURE)
                  </h4>
                  <h5 className="text-base sm:text-lg font-bold text-[#102A43]">
                    Tái Thiết Kế Bố Cục Chuyên Biệt Theo Viewport Thay Vì Co Giãn Tỷ Lệ
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-white border border-[#D9E2EC] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#0B2235]">DESKTOP</span>
                        <span className="text-xs tabular-nums px-2 py-0.5 rounded bg-slate-100 text-slate-600">1280px</span>
                      </div>
                      <p className="text-xs text-[#627D98] leading-relaxed">Lưới đa cột, thanh điều hướng Mega Menu toàn cảnh, bảng năng lực mật độ cao.</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white border border-[#D9E2EC] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#0B2235]">TABLET</span>
                        <span className="text-xs tabular-nums px-2 py-0.5 rounded bg-slate-100 text-slate-600">768px – 900px</span>
                      </div>
                      <p className="text-xs text-[#627D98] leading-relaxed">Tái cấu trúc 2 cột linh hoạt, tối ưu khoảng chạm nút bấm cảm ứng.</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white border border-[#D9E2EC] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#102A43]">MOBILE</span>
                        <span className="text-xs tabular-nums px-2 py-0.5 rounded bg-[#FFF2E6] text-[#FF7A1A]">390px</span>
                      </div>
                      <p className="text-xs text-[#627D98] leading-relaxed">Ngăn xếp 1 cột dọc, thanh điều hướng thu gọn dạng menu trượt, CTA bám sát ngón cái.</p>
                    </div>
                  </div>
                </div>

                {/* Key Deliverables */}
                <div className="space-y-2.5 sm:space-y-3">
                  <h4 className="text-xs font-bold text-[#627D98] uppercase tracking-wider">
                    {t?.deliverables || 'Hạng Mục Bàn Giao & Thực Thi'}
                  </h4>
                  <div className="space-y-2.5 sm:space-y-3 bg-slate-50 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-[#D9E2EC]">
                    {deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-[#102A43] leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Logic Highlights */}
                {project.systemLogic && project.systemLogic.length > 0 && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-[#627D98] uppercase tracking-wider">
                      {t?.systemLogicTitle || 'Điểm Sáng Logic Hệ Thống & Kiến Trúc'}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {project.systemLogic.map((logic, idx) => (
                        <div key={idx} className="p-4 sm:p-4.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-[#D9E2EC]">
                          <span className="font-bold text-[#0B2235] block mb-1 text-sm sm:text-base">{logic.title}</span>
                          <span className="text-[#627D98] leading-relaxed text-xs sm:text-sm">{logic.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Operational Modules */}
                {project.modules && project.modules.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-[#627D98] uppercase tracking-wider mb-2.5">
                      {t?.modulesTitle || 'Phân Hệ Chức Năng'} ({project.modules.length} {t?.modulesUnit || 'Modules'})
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.modules.map((mod, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-lg bg-slate-100 text-[#102A43] text-xs sm:text-sm font-medium border border-[#D9E2EC]">
                          {mod}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Standard Key Deliverables & System Logic for other projects */}
            {!isHaLongLuxe && !isVevuive && !isKhoMA && !isTourismSystem && !isCorporateWebsite && (
              <>
                {/* Key Deliverables */}
                <div className="space-y-2.5 sm:space-y-3">
                  <h4 className="text-xs font-bold text-[#627D98] uppercase tracking-wider">
                    {t?.deliverables || 'Hạng Mục Bàn Giao & Thực Thi'}
                  </h4>
                  <div className="space-y-2.5 sm:space-y-3 bg-slate-50 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-[#D9E2EC]">
                    {deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-[#102A43] leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Logic Highlights */}
                {project.systemLogic && project.systemLogic.length > 0 && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <h4 className="text-xs font-bold text-[#627D98] uppercase tracking-wider">
                      {t?.systemLogicTitle || 'Điểm Sáng Logic Hệ Thống & Kiến Trúc'}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {project.systemLogic.map((logic, idx) => (
                        <div key={idx} className="p-4 sm:p-4.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-[#D9E2EC]">
                          <span className="font-bold text-[#0B2235] block mb-1 text-sm sm:text-base">{logic.title}</span>
                          <span className="text-[#627D98] leading-relaxed text-xs sm:text-sm">{logic.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Operational Modules */}
                {project.modules && project.modules.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-[#627D98] uppercase tracking-wider mb-2.5">
                      {t?.modulesTitle || 'Phân Hệ Chức Năng'} ({project.modules.length} {t?.modulesUnit || 'Modules'})
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.modules.map((mod, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-lg bg-slate-100 text-[#102A43] text-xs sm:text-sm font-medium border border-[#D9E2EC]">
                          {mod}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Actions: Stacks on mobile, inline on tablet & desktop */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-5 border-t border-[#D9E2EC]">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-[#D9E2EC] text-[#102A43] font-medium text-sm hover:bg-slate-100 transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
              >
                {t?.close || 'Đóng'}
              </button>
              <a
                href="#contact"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#FF7A1A] hover:bg-[#E8680A] text-white font-semibold text-sm shadow-md shadow-[#FF7A1A]/25 transition-all min-h-[44px]"
              >
                <span>{t?.discussProject || 'Thảo luận về dự án này'}</span>
                <ExternalLink className="w-4 h-4 flex-shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Lightbox Image Zoom Modal with Zoom in/out, pan, reset */}
      {isZoomOpen && !isCurrentImgError && (
        <ImageLightboxModal
          src={currentImg.src}
          alt={currentImg.label}
          title={currentImg.label || project.title}
          caption={currentImg.slotPurpose || currentImg.description}
          currentIndex={activeImageIndex}
          totalCount={images.length}
          onPrev={handlePrev}
          onNext={handleNext}
          onClose={() => setIsZoomOpen(false)}
        />
      )}
    </>
  );
}
