import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export default function Gallery({ images, title }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen, closeLightbox, prev, next]);

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="group relative overflow-hidden aspect-square cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D71920] focus:ring-offset-2"
            aria-label={`View ${title} image ${index + 1}`}
          >
            <img
              src={img}
              alt={`${title} gallery image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                e.target.src = `https://placehold.co/400x400/D71920/FFFFFF?text=Photo+${index + 1}`;
              }}
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-[#D71920]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <ZoomIn size={28} className="text-white" />
            </div>
            {/* Red border on hover */}
            <div className="absolute inset-0 border-2 border-[#D71920] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} image gallery`}
        >
          {/* Close button */}
          <button
            className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
            onClick={closeLightbox}
            aria-label="Close gallery"
          >
            <X size={20} />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Prev button */}
          {images.length > 1 && (
            <button
              className="absolute left-5 w-12 h-12 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Main image */}
          <div
            className="max-w-5xl max-h-[85vh] w-full px-20"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentIndex]}
              alt={`${title} image ${currentIndex + 1}`}
              className="w-full h-full object-contain max-h-[85vh]"
              onError={(e) => {
                e.target.src = `https://placehold.co/800x600/D71920/FFFFFF?text=Photo+${currentIndex + 1}`;
              }}
            />
          </div>

          {/* Next button */}
          {images.length > 1 && (
            <button
              className="absolute right-5 w-12 h-12 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                  className={`w-12 h-8 overflow-hidden transition-all duration-200 ${
                    i === currentIndex
                      ? 'ring-2 ring-[#D71920] opacity-100'
                      : 'opacity-50 hover:opacity-80'
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = `https://placehold.co/48x32/D71920/FFFFFF?text=${i+1}`; }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
