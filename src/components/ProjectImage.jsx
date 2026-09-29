import React, { useState } from 'react';
import { Layers, FileCode, Smartphone } from 'lucide-react';

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
  priority = false
}) {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Derive expected file name if not provided directly
  const derivedFilename = expectedFile || (src ? src.split('/').pop() : 'screenshot.webp');

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

  return (
    <figure className={`w-full overflow-hidden ${className}`}>
      <div
        className={`relative w-full rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 ${getAspectClass()} ${
          hasError || !src
            ? 'bg-gradient-to-br from-stone-900 via-[#1c1917] to-[#292524] border border-amber-600/20 shadow-lg shadow-stone-950/30'
            : 'bg-stone-100 border border-stone-200/80 shadow-sm hover:shadow-md'
        }`}
      >
        {/* Real Image */}
        {src && !hasError && (
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
        )}

        {/* Polished Technical Placeholder when Image is Missing / Not yet exported */}
        {(hasError || !src) && (
          <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-left select-none overflow-hidden">
            {/* Ambient Background Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-[0.07] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #d97706 1px, transparent 0)',
                backgroundSize: '24px 24px'
              }}
            />
            
            {/* Top Bar with Slot Badge */}
            <div className="relative z-10 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider uppercase bg-amber-500/15 border border-amber-500/30 text-amber-300">
                {aspectRatio === 'mobile' ? (
                  <Smartphone className="w-3 h-3 text-amber-400" />
                ) : (
                  <Layers className="w-3 h-3 text-amber-400" />
                )}
                <span>Image Slot</span>
              </span>

              <span className="text-[11px] font-mono text-stone-400/80 uppercase tracking-widest hidden sm:inline-block">
                {aspectRatio.toUpperCase()}
              </span>
            </div>

            {/* Middle: Project Title & Image Label */}
            <div className="relative z-10 my-auto py-4 space-y-2">
              <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400/90 font-mono">
                {projectName}
              </div>
              <h4 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
                {label}
              </h4>
              {description && (
                <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed font-normal">
                  {description}
                </p>
              )}
            </div>

            {/* Bottom: Monospace Waiting File Notice */}
            <div className="relative z-10 pt-2 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-stone-300 bg-stone-950/60 px-3 py-1.5 rounded-lg border border-stone-800">
                <FileCode className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span className="text-stone-400">Waiting for:</span>
                <span className="text-amber-300 font-semibold">{derivedFilename}</span>
              </div>
              {src && (
                <span className="text-[11px] text-stone-500 truncate max-w-[240px] hidden md:inline">
                  {src}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Caption if provided */}
      {caption && (
        <figcaption className="mt-3 text-xs sm:text-sm text-slate-500 text-center font-medium">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
