'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = useCallback(() => setActive((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setActive((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false);
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, prev, next]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  return (
    <>
      {/* Main image */}
      <div className="space-y-3">
        <div
          className="relative overflow-hidden cursor-zoom-in bg-[var(--color-paper-soft)]"
          style={{ aspectRatio: '4/5' }}
          onClick={() => setLightbox(true)}
        >
          <Image
            src={images[active]}
            alt={`${alt} - view ${active + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 inline-flex items-center justify-center bg-white/90 text-[var(--color-ink)] hover:bg-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 inline-flex items-center justify-center bg-white/90 text-[var(--color-ink)] hover:bg-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={16} />
              </button>
              <span
                className="absolute bottom-3 right-3 text-white text-[10px] uppercase tracking-[1.5px] px-3 py-1 bg-black/55"
              >
                {active + 1} / {images.length}
              </span>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {images.map((src, i) => {
              const isActive = i === active;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="relative overflow-hidden transition-all"
                  style={{
                    aspectRatio: '4/5',
                    border: isActive
                      ? '1.5px solid var(--color-ink)'
                      : '1px solid var(--color-divider)',
                    opacity: isActive ? 1 : 0.65,
                  }}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image
                    src={src}
                    alt={`${alt} thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 w-11 h-11 inline-flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            onClick={() => setLightbox(false)}
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>

          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 inline-flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 inline-flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          <div
            className="relative max-w-3xl max-h-screen mx-4"
            style={{ width: 'min(640px, 90vw)', height: 'min(800px, 85vh)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[active]}
              alt={`${alt} - enlarged`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-[11px] uppercase tracking-[2px]">
            {active + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
}
