'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Crown } from 'lucide-react';
import { useParallax } from '@/hooks/useParallax';

export default function Hero() {
  const parallaxOffset = useParallax(0.4);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <section
      className="relative overflow-hidden flex items-center justify-center"
      style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #1A1A1A 0%, #000000 50%, #2A2A2A 100%)' }}
    >
      {/* Parallax background layer */}
      <div
        className="absolute inset-0"
        style={{
          transform: mounted ? `translateY(${parallaxOffset}px)` : 'none',
          willChange: 'transform',
        }}
      >
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(212,165,116,0.08) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Cultural accent - top left */}
      <div
        className="absolute top-1/4 left-8 opacity-10 hidden lg:block"
        style={{
          transform: mounted ? `translateY(${parallaxOffset * 0.6}px)` : 'none',
          willChange: 'transform',
        }}
      >
        <Crown size={120} className="text-brand-gold" strokeWidth={0.8} />
      </div>

      {/* Cultural accent - bottom right */}
      <div
        className="absolute bottom-1/4 right-8 opacity-10 hidden lg:block"
        style={{
          transform: mounted ? `translateY(${parallaxOffset * 0.3}px)` : 'none',
          willChange: 'transform',
          rotate: '180deg',
        }}
      >
        <Crown size={80} className="text-brand-gold" strokeWidth={0.8} />
      </div>

      {/* Decorative gold lines */}
      <div
        className="absolute left-0 top-1/2 w-24 h-px opacity-30 hidden lg:block"
        style={{ background: 'linear-gradient(to right, transparent, #D4A574)' }}
      />
      <div
        className="absolute right-0 top-1/2 w-24 h-px opacity-30 hidden lg:block"
        style={{ background: 'linear-gradient(to left, transparent, #D4A574)' }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mb-6"
        >
          <span
            className="inline-block text-brand-gold text-xs font-semibold tracking-widest uppercase border border-brand-gold/30 px-4 py-2 rounded-full"
            style={{ letterSpacing: '3px' }}
          >
            Cultural Luxury
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-white mb-6"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(56px, 10vw, 100px)',
            fontWeight: 700,
            letterSpacing: '-1px',
            lineHeight: 1.05,
          }}
        >
          BLAC.CESS
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="text-white/60 mb-10 mx-auto max-w-md"
          style={{ fontSize: '14px', letterSpacing: '3px', textTransform: 'uppercase' }}
        >
          Cultural Luxury in Every Thread
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/shop"
            className="glass-btn glass-btn-primary flex items-center gap-2 px-8 py-4"
            style={{
              background: 'rgba(212,165,116,0.2)',
              borderColor: 'rgba(212,165,116,0.5)',
              color: '#D4A574',
              fontSize: '13px',
              letterSpacing: '2px',
              borderRadius: '12px',
            }}
          >
            EXPLORE NOW
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/shop?filter=new"
            className="glass-btn"
            style={{
              color: 'rgba(255,255,255,0.7)',
              borderColor: 'rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.05)',
              fontSize: '13px',
              letterSpacing: '1px',
              borderRadius: '12px',
            }}
          >
            New Arrivals
          </Link>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-xs tracking-widest uppercase" style={{ letterSpacing: '2px' }}>
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-brand-gold/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
