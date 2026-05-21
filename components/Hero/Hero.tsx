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
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '100vh', background: '#000000' }}
    >
      {/* Subtle warm gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(212,165,116,0.12) 0%, transparent 60%)' }}
      />

      {/* Background text — decorative */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ opacity: mounted ? 0.04 : 0, transition: 'opacity 1s ease' }}
      >
        <span
          className="font-serif font-bold text-white"
          style={{ fontSize: 'clamp(180px, 30vw, 400px)', letterSpacing: '-8px', lineHeight: 1 }}
        >
          BC
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 w-full" style={{ maxWidth: 800, margin: '0 auto' }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8"
        >
          <span
            className="inline-block text-xs font-semibold uppercase tracking-[4px]"
            style={{
              color: '#D4A574',
              fontFamily: 'Inter, sans-serif',
              borderBottom: '1px solid rgba(212,165,116,0.4)',
              paddingBottom: 8,
            }}
          >
            Cultural Luxury
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="font-serif text-white mb-6"
          style={{
            fontSize: 'clamp(64px, 12vw, 120px)',
            fontWeight: 700,
            letterSpacing: '-2px',
            lineHeight: 0.95,
          }}
        >
          BLAC.CESS
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mb-12 mx-auto"
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: 12,
            letterSpacing: '4px',
            textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif',
            maxWidth: 340,
          }}
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
          <Link href="/shop" className="btn btn-gold" style={{ paddingLeft: 36, paddingRight: 36 }}>
            Shop Now
            <ArrowRight size={15} />
          </Link>
          <Link href="/shop/new-arrivals" className="btn btn-white">
            New Arrivals
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <div
          className="w-[1px] h-12"
          style={{ background: 'linear-gradient(to bottom, #D4A574, transparent)' }}
        />
        <span
          className="text-[10px] uppercase tracking-[3px]"
          style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter, sans-serif' }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
