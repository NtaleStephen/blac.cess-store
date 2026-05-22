'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden bg-[var(--color-night)]"
      style={{ minHeight: '100vh' }}
    >
      {/* Subtle warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 65%, rgba(184,149,106,0.15) 0%, transparent 55%)',
        }}
      />

      {/* Ghost monogram backdrop */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ opacity: mounted ? 0.04 : 0, transition: 'opacity 1.2s ease' }}
      >
        <span
          className="font-serif font-bold text-white"
          style={{ fontSize: 'clamp(180px, 30vw, 420px)', letterSpacing: '-8px', lineHeight: 1 }}
        >
          BC
        </span>
      </div>

      {/* Content */}
      <div className="container-narrow relative z-10 text-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8"
        >
          <span
            className="inline-block text-[11px] font-semibold uppercase tracking-[4px] pb-2 text-[var(--color-accent)]"
            style={{ borderBottom: '1px solid rgba(184,149,106,0.4)' }}
          >
            Cultural Luxury
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="display text-white mb-6"
          style={{ fontSize: 'clamp(64px, 12vw, 124px)' }}
        >
          BLAC.CESS
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mb-12 mx-auto text-white/55 text-[12px] uppercase tracking-[4px] max-w-xs"
        >
          Cultural Luxury in Every Thread
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link href="/shop" className="btn btn-gold btn-lg">
            Shop Now
            <ArrowRight size={14} />
          </Link>
          <Link href="/shop/new-arrivals" className="btn btn-ghost-light btn-lg">
            New Arrivals
          </Link>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
      >
        <div
          className="w-px h-12"
          style={{ background: 'linear-gradient(to bottom, #B8956A, transparent)' }}
        />
        <span className="text-[10px] uppercase tracking-[3px] text-white/35">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
