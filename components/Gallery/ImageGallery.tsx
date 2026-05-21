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
          className="relative rounded-2xl overflow-hidden cursor-zoom-in"
          style={{ aspectRatio: '4/5' }}
          onClick={() => setLightbox(true)}
        >
          <Image
            src={images[active]}
            alt={`${alt} - view ${active + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-all duration-400"
            priority
          />
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="glass-btn-icon absolute left-3 top-1/2 -translate-y-1/2"
                style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}
                aria-label="Previous image"
              >
                <ChevronLeft size={16} className="text-white" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="glass-btn-icon absolute right-3 top-1/2 -translate-y-1/2"
                style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}
                aria-label="Next image"
              >
                <ChevronRight size={16} className="text-white" />
              </button>
              <span
                className="absolute bottom-3 right-3 text-white text-xs px-2 py-1 rounded-full"
                style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', fontSize: '10px' }}
              >
                {active + 1} / {images.length}
              </span>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-200"
                style={{
                  width: '72px',
                  height: '90px',
                  border: `2px solid ${i === active ? '#D4A574' : 'rgba(212,165,116,0.15)'}`,
                  opacity: i === active ? 1 : 0.6,
                }}
                aria-label={`View image ${i + 1}`}
              >
                <Image src={src} alt={`${alt} thumbnail ${i + 1}`} fill className="object-cover" sizes="72px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(10px)' }}
          onClick={() => setLightbox(false)}
        >
          <button
            className="glass-btn-icon absolute top-4 right-4"
            style={{ background: 'rgba(255,255,255,0.1)' }}
            onClick={() => setLightbox(false)}
            aria-label="Close lightbox"
          >
            <X size={18} className="text-white" />
          </button>

          {images.length > 1 && (
            <>
              <button
                className="glass-btn-icon absolute left-4 top-1/2 -translate-y-1/2"
                style={{ background: 'rgba(255,255,255,0.1)' }}
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous"
              >
                <ChevronLeft size={20} className="text-white" />
              </button>
              <button
                className="glass-btn-icon absolute right-4 top-1/2 -translate-y-1/2"
                style={{ background: 'rgba(255,255,255,0.1)' }}
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next"
              >
                <ChevronRight size={20} className="text-white" />
              </button>
            </>
          )}

          <div
            className="relative max-w-3xl max-h-screen mx-4"
            style={{ width: 'min(600px, 90vw)', height: 'min(750px, 85vh)' }}
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

          <span
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-xs"
            style={{ fontSize: '12px' }}
          >
            {active + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
}
