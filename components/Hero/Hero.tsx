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
      style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #1A1A1A 0%, #000000 55%, #2A2A2A 100%)' }}
    >
      {/* Parallax glow layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transform: mounted ? `translateY(${parallaxOffset}px)` : 'none', willChange: 'transform' }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(212,165,116,0.07) 0%, transparent 65%)' }}
        />
      </div>

      {/* Cultural accent — top-left */}
      <div
        className="absolute top-1/4 left-10 opacity-[0.07] hidden lg:block pointer-events-none"
        style={{ transform: mounted ? `translateY(${parallaxOffset * 0.55}px)` : 'none', willChange: 'transform' }}
      >
        <Crown size={130} style={{ color: '#D4A574' }} strokeWidth={0.7} />
      </div>

      {/* Cultural accent — bottom-right */}
      <div
        className="absolute bottom-1/4 right-10 opacity-[0.05] hidden lg:block pointer-events-none"
        style={{ transform: mounted ? `translateY(${parallaxOffset * 0.28}px)` : 'none', willChange: 'transform', rotate: '180deg' }}
      >
        <Crown size={90} style={{ color: '#D4A574' }} strokeWidth={0.7} />
      </div>

      {/* Thin gold edge lines */}
      <div className="absolute left-0 top-1/2 w-28 h-px hidden lg:block pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(212,165,116,0.28))' }} />
      <div className="absolute right-0 top-1/2 w-28 h-px hidden lg:block pointer-events-none"
        style={{ background: 'linear-gradient(to left, transparent, rgba(212,165,116,0.28))' }} />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 w-full" style={{ maxWidth: 860, margin: '0 auto' }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="mb-7"
        >
          <span
            className="inline-block text-xs font-semibold tracking-[3px] uppercase rounded-full px-5 py-2"
            style={{
              color: '#D4A574',
              border: '1px solid rgba(212,165,116,0.3)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Cultural Luxury
          </span>
        </motion.div>

        {/* Brand name */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          className="text-white mb-6 font-serif"
          style={{
            fontSize: 'clamp(58px, 11vw, 108px)',
            fontWeight: 700,
            letterSpacing: '-1px',
            lineHeight: 1.02,
          }}
        >
          BLAC.CESS
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42, ease: 'easeOut' }}
          className="mb-12 mx-auto"
          style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: 13,
            letterSpacing: '3.5px',
            textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif',
            maxWidth: 380,
          }}
        >
          Cultural Luxury in Every Thread
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.62, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/shop"
            className="glass-btn glass-btn-primary"
            style={{ color: '#D4A574', borderColor: 'rgba(212,165,116,0.5)', background: 'rgba(212,165,116,0.16)', paddingLeft: 32, paddingRight: 32 }}
          >
            EXPLORE NOW
            <ArrowRight size={15} />
          </Link>
          <Link
            href="/shop/new-arrivals"
            className="glass-btn"
            style={{ color: 'rgba(255,255,255,0.72)', borderColor: 'rgba(255,255,255,0.14)', background: 'rgba(255,255,255,0.06)' }}
          >
            New Arrivals
          </Link>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.7 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span
          className="text-xs tracking-[2px] uppercase"
          style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'Inter, sans-serif' }}
        >
          Scroll
        </span>
        <div
          className="w-px h-10"
          style={{ background: 'linear-gradient(to bottom, rgba(212,165,116,0.4), transparent)' }}
        />
      </motion.div>
    </section>
  );
}
