import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  Move,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function ImageLightboxModal({
  src,
  alt = 'Image Preview',
  title = '',
  caption = '',
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalCount,
}) {
  const { language } = useLanguage();
  const L = (vi, en) => (language === 'vi' ? vi : en);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef(null);

  // References to keep drag state up to date across asynchronous window events
  const isDraggingRef = useRef(false);
  const dragStartPosRef = useRef({ x: 0, y: 0 });
  const panStartRef = useRef({ x: 0, y: 0 });
  const panRef = useRef(pan);
  panRef.current = pan;
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;

  const hasMovedRef = useRef(false);
  const suppressClickRef = useRef(false);
  const suppressTimerRef = useRef(null);

  // Reset zoom & pan
  const handleReset = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  // Zoom In
  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.35, 4));
  }, []);

  // Zoom Out
  const handleZoomOut = useCallback(() => {
    setZoom((prev) => {
      const next = Math.max(prev - 0.35, 0.5);
      if (next <= 1) setPan({ x: 0, y: 0 });
      return next;
    });
  }, []);

  // When image src changes (e.g. via Next/Prev), reset zoom & pan
  useEffect(() => {
    handleReset();
  }, [src, handleReset]);

  // Drag start handler
  const handleStartDrag = (clientX, clientY, isLeftButton = true) => {
    if (!isLeftButton || zoomRef.current <= 1) return;

    isDraggingRef.current = true;
    hasMovedRef.current = false;
    dragStartPosRef.current = { x: clientX, y: clientY };
    panStartRef.current = { ...panRef.current };
    setIsDragging(true);
  };

  // Drag move handler
  const handleMoveDrag = (clientX, clientY) => {
    if (!isDraggingRef.current) return;

    const dx = clientX - dragStartPosRef.current.x;
    const dy = clientY - dragStartPosRef.current.y;

    // Movement threshold (4px) to separate intentional drag from a stationary click
    if (!hasMovedRef.current && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
      hasMovedRef.current = true;
      suppressClickRef.current = true;
    }

    if (hasMovedRef.current) {
      setPan({
        x: panStartRef.current.x + dx,
        y: panStartRef.current.y + dy,
      });
    }
  };

  // Drag end handler
  const handleEndDrag = () => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    setIsDragging(false);

    if (hasMovedRef.current) {
      suppressClickRef.current = true;
      if (suppressTimerRef.current) clearTimeout(suppressTimerRef.current);
      // Suppress any synthetic clicks that the browser generates immediately after mouseup
      suppressTimerRef.current = setTimeout(() => {
        suppressClickRef.current = false;
        hasMovedRef.current = false;
      }, 150);
    }
  };

  // Attach global mousemove, mouseup, touchmove, touchend to window
  useEffect(() => {
    const handleWindowMouseMove = (e) => {
      if (isDraggingRef.current) {
        e.preventDefault();
        handleMoveDrag(e.clientX, e.clientY);
      }
    };

    const handleWindowMouseUp = () => {
      if (isDraggingRef.current) {
        handleEndDrag();
      }
    };

    const handleWindowTouchMove = (e) => {
      if (isDraggingRef.current && e.touches.length === 1) {
        if (e.cancelable) e.preventDefault();
        handleMoveDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleWindowTouchEnd = () => {
      if (isDraggingRef.current) {
        handleEndDrag();
      }
    };

    window.addEventListener('mousemove', handleWindowMouseMove, { passive: false });
    window.addEventListener('mouseup', handleWindowMouseUp);
    window.addEventListener('touchmove', handleWindowTouchMove, { passive: false });
    window.addEventListener('touchend', handleWindowTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
      window.removeEventListener('touchmove', handleWindowTouchMove);
      window.removeEventListener('touchend', handleWindowTouchEnd);
      if (suppressTimerRef.current) clearTimeout(suppressTimerRef.current);
    };
  }, []);

  // Double click toggles between 1x and 2x
  const handleDoubleClick = (e) => {
    e.stopPropagation();
    if (suppressClickRef.current) return;

    if (zoom > 1) {
      handleReset();
    } else {
      setZoom(2.2);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-' || e.key === '_') {
        handleZoomOut();
      } else if (e.key === '0') {
        handleReset();
      } else if (e.key === 'ArrowLeft' && onPrev) {
        onPrev();
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext, handleZoomIn, handleZoomOut, handleReset]);

  // Prevent background body scroll when open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Non-passive wheel zoom on container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        setZoom((prev) => Math.min(prev + 0.25, 4));
      } else {
        setZoom((prev) => {
          const next = Math.max(prev - 0.25, 0.5);
          if (next <= 1) setPan({ x: 0, y: 0 });
          return next;
        });
      }
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, []);

  // Stage Mouse Down
  const handleStageMouseDown = (e) => {
    if (e.button !== 0) return; // Only primary left-click
    if (zoom > 1) {
      e.preventDefault(); // Prevent native browser ghost dragging
      handleStartDrag(e.clientX, e.clientY, true);
    }
  };

  // Stage Touch Start
  const handleStageTouchStart = (e) => {
    if (zoom > 1 && e.touches.length === 1) {
      handleStartDrag(e.touches[0].clientX, e.touches[0].clientY, true);
    }
  };

  // Click on stage background
  const handleStageClick = (e) => {
    // If we just finished a drag gesture, DO NOT close
    if (suppressClickRef.current) {
      e.stopPropagation();
      return;
    }
    // Only close if user clicked the backdrop outside the image
    if (e.target === containerRef.current) {
      onClose?.();
    }
  };

  // Click directly on the image
  const handleImageClick = (e) => {
    e.stopPropagation();
    if (suppressClickRef.current) return;

    // Single click on 1x zooms to 2x for immediate inspection
    if (zoom === 1) {
      setZoom(2);
    }
  };

  // Root background click
  const handleRootClick = (e) => {
    if (suppressClickRef.current) {
      e.stopPropagation();
      return;
    }
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-[#081B2E]/95 backdrop-blur-md select-none transition-all duration-300 animate-in fade-in"
      onClick={handleRootClick}
    >
      {/* Top Header Controls Bar */}
      <div 
        className="w-full px-4 sm:px-6 py-4 flex items-center justify-between z-20 bg-gradient-to-b from-[#081B2E] to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title / Badge */}
        <div className="flex items-center gap-3 text-left">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF7A00] animate-pulse" />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-white text-sm sm:text-base font-bold tracking-tight truncate max-w-[200px] sm:max-w-md">
                {title || 'Image Preview'}
              </h4>
              {totalCount > 1 && (
                <span className="text-xs tabular-nums font-bold text-[#FF7A00] bg-[#FFF2E6]/10 border border-[#FF7A00]/30 px-2 py-0.5 rounded-full">
                  {currentIndex + 1} / {totalCount}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 tabular-nums hidden sm:block">
              Cuộn chuột để Zoom · Kéo chuột để Pan khi phóng to · Click đúp để chuyển 1x/2x · Esc để đóng
            </p>
          </div>
        </div>

        {/* Action Controls Toolbar */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-[#0E2A47]/90 border border-[#163E63] p-1.5 rounded-full shadow-xl">
          {/* Zoom Out */}
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={zoom <= 0.5}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#163E63] disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
            title={L("Thu nhỏ (-)", "Zoom out (-)")}
            aria-label={L("Thu nhỏ", "Zoom out")}
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          {/* Zoom Percentage Badge / Reset */}
          <button
            type="button"
            onClick={handleReset}
            className="px-2.5 py-1 text-xs tabular-nums font-bold text-[#FF7A00] bg-[#FFF2E6]/10 hover:bg-[#FFF2E6]/20 rounded-full transition-colors border border-[#FF7A00]/30 min-w-[54px] text-center"
            title={L("Bấm để về 100%", "Click to reset to 100%")}
          >
            {Math.round(zoom * 100)}%
          </button>

          {/* Zoom In */}
          <button
            type="button"
            onClick={handleZoomIn}
            disabled={zoom >= 4}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#163E63] disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
            title={L("Phóng to (+)", "Zoom in (+)")}
            aria-label={L("Phóng to", "Zoom in")}
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Reset button */}
          <button
            type="button"
            onClick={handleReset}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#163E63] transition-colors"
            title={L("Đặt lại kích thước ban đầu (0)", "Reset to original size (0)")}
            aria-label={L("Đặt lại kích thước", "Reset zoom")}
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-5 bg-[#163E63] mx-1" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FF7A00] hover:bg-[#E96800] text-white flex items-center justify-center shadow-md transition-colors"
            title={L("Đóng (Esc)", "Close (Esc)")}
            aria-label={L("Đóng xem ảnh", "Close preview")}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Image Stage (Drag & Pan & Zoom Area) */}
      <div
        ref={containerRef}
        onClick={handleStageClick}
        onMouseDown={handleStageMouseDown}
        onTouchStart={handleStageTouchStart}
        className={`relative flex-1 w-full flex items-center justify-center overflow-hidden p-4 sm:p-8 ${
          zoom > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
        }`}
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          onClick={handleImageClick}
          onDoubleClick={handleDoubleClick}
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transition: isDragging ? 'none' : 'transform 0.15s ease-out',
            maxHeight: '85vh',
            maxWidth: '92vw',
            userSelect: 'none',
            WebkitUserDrag: 'none',
          }}
          className="object-contain shadow-2xl rounded-xl pointer-events-auto select-none"
        />

        {/* Gallery Navigation Arrows */}
        {totalCount > 1 && onPrev && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0E2A47]/80 hover:bg-[#FF7A00] text-white flex items-center justify-center shadow-2xl transition-all border border-[#163E63] z-30"
            title={L("Ảnh trước (mũi tên trái)", "Previous image (left arrow)")}
            aria-label={L("Ảnh trước", "Previous image")}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {totalCount > 1 && onNext && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0E2A47]/80 hover:bg-[#FF7A00] text-white flex items-center justify-center shadow-2xl transition-all border border-[#163E63] z-30"
            title={L("Ảnh tiếp theo (mũi tên phải)", "Next image (right arrow)")}
            aria-label={L("Ảnh tiếp theo", "Next image")}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Caption Pill */}
      {(caption || title) && (
        <div 
          className="w-full p-4 z-20 flex justify-center bg-gradient-to-t from-[#081B2E] to-transparent"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="max-w-2xl px-5 py-2.5 rounded-full bg-[#0E2A47]/90 border border-[#163E63] shadow-xl text-center backdrop-blur-md">
            <p className="text-xs sm:text-sm text-slate-200 font-medium">
              {caption || title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
