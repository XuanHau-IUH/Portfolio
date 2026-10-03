import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Layers, FileCode, Smartphone, ZoomIn } from 'lucide-react';
import ImageLightboxModal from './ImageLightboxModal';

export default function ProjectImage({
  src,
  alt = 'Project Image',
  projectName = 'Project',
  label = 'Interface Mockup',
  expectedFile,
  description,
  aspectRatio = '16/10',
  className = '',
  caption,
  priority = false,
  allowZoom = true
}) {
  const { language } = useLanguage();
  const isVi = language === 'vi';
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Derive expected file name if not provided directly
  const derivedFilename = expectedFile || (src ? src.split('/').pop() : 'screenshot.webp');

  const canZoom = src && !hasError && allowZoom;

  // Aspect ratio classes
  const getAspectClass = () => {
    switch (aspectRatio) {
      case '16/9':
        return 'aspect-[16/9]';
      case '4/3':
        return 'aspect-[4/3]';
      case '21/9':
      case 'wide':
        return 'aspect-[21/9]';
      case 'mobile':
        return 'aspect-[9/16] max-w-[320px] mx-auto';
      case 'square':
        return 'aspect-square';
      case '16/10':
      default:
        return 'aspect-[16/10]';
    }
  };

  const handleImageClick = (e) => {
    if (canZoom) {
      e.preventDefault();
      e.stopPropagation();
      setIsLightboxOpen(true);
    }
  };

  return (
    <>
      <figure className={`w-full overflow-hidden ${className}`}>
        <div
          onClick={handleImageClick}
          className={`relative w-full rounded-lg md:rounded-xl overflow-hidden transition-all duration-300 ${getAspectClass()} ${
            canZoom ? 'cursor-zoom-in group/img' : ''
          } ${
            hasError || !src
              ? 'bg-gradient-to-br from-[#0B2235] via-[#061826] to-[#0A192F] border border-[#FF7A1A]/30 shadow-lg shadow-[#0B2235]/30'
              : 'bg-[#EFE8DA] ring-1 ring-[#061826]/10'
          }`}
        >
          {/* Real Image */}
          {src && !hasError && (
            <>
              <img
                src={src}
                alt={alt}
                loading={priority ? 'eager' : 'lazy'}
                onLoad={() => setLoaded(true)}
                onError={() => setHasError(true)}
                className={`w-full h-full object-cover object-top transition-all duration-500 ${
                  loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              />

              {/* Hover Zoom Hint Overlay */}
              {canZoom && (
                <div className="absolute inset-0 bg-[#061826]/30 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                  <span className="bg-[#0B2235]/95 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-xl border border-[#12304A] inline-flex items-center gap-1.5 transform scale-95 group-hover/img:scale-100 transition-transform">
                    <ZoomIn className="w-3.5 h-3.5 text-[#FF7A1A]" />
                    <span>{isVi ? 'Phóng to ảnh' : 'Enlarge image'}</span>
                  </span>
                </div>
              )}
            </>
          )}

        {/* Polished Technical Placeholder when Image is Missing / Not yet exported */}
        {(hasError || !src) && (
          <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-left select-none overflow-hidden">
            {/* Ambient Background Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-[0.08] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #FF7A1A 1px, transparent 0)',
                backgroundSize: '24px 24px'
              }}
            />
            
            {/* Top Bar with Slot Badge */}
            <div className="relative z-10 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full typo-eyebrow bg-[#FF7A1A]/15 border border-[#FF7A1A]/30 text-[#FF7A1A]">
                {aspectRatio === 'mobile' ? (
                  <Smartphone className="w-3 h-3 text-[#FF7A1A]" />
                ) : (
                  <Layers className="w-3 h-3 text-[#FF7A1A]" />
                )}
                <span>Image Slot</span>
              </span>

              <span className="typo-caption tabular-nums text-slate-400 uppercase tracking-widest hidden sm:inline-block">
                {aspectRatio.toUpperCase()}
              </span>
            </div>

            {/* Middle: Project Title & Image Label */}
            <div className="relative z-10 my-auto py-4 space-y-2">
              <div className="typo-eyebrow text-[#FF7A1A]">
                {projectName}
              </div>
              <h4 className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-snug">
                {label}
              </h4>
              {description && (
                <p className="typo-small text-slate-300 max-w-xl leading-relaxed font-normal">
                  {description}
                </p>
              )}
            </div>

            {/* Bottom: Monospace Waiting File Notice */}
            <div className="relative z-10 pt-2 border-t border-[#12304A] flex flex-wrap items-center justify-between gap-2 text-xs tabular-nums">
              <div className="flex items-center gap-2 text-slate-300 bg-[#061826]/80 px-3 py-1.5 rounded-lg border border-[#12304A]">
                <FileCode className="w-3.5 h-3.5 text-[#FF7A1A] flex-shrink-0" />
                <span className="text-slate-400">Waiting for:</span>
                <span className="text-[#FF7A1A] font-semibold">{derivedFilename}</span>
              </div>
              {src && (
                <span className="typo-caption text-slate-400 truncate max-w-[240px] hidden md:inline">
                  {src}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Caption if provided */}
      {caption && (
        <figcaption className="mt-3 pl-3 border-l-2 border-[#FF7A1A] text-[13px] leading-[20px] text-[#486581] text-left font-medium">
          {caption}
        </figcaption>
      )}
    </figure>

    {/* Lightbox Zoom Modal */}
    {isLightboxOpen && (
      <ImageLightboxModal
        src={src}
        alt={alt}
        title={label || projectName}
        caption={caption || description}
        onClose={() => setIsLightboxOpen(false)}
      />
    )}
  </>
  );
}
