'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-[var(--color-night)]"
      style={{ minHeight: '100vh' }}
    >
      {/* Subtle warm glow behind text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(184,149,106,0.12) 0%, transparent 55%)',
        }}
      />

      <div className="container relative z-10">
        <div
          className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center pt-28 lg:pt-0 pb-20 lg:pb-0"
          style={{ minHeight: '100vh' }}
        >
          {/* LEFT — Text */}
          <div className="text-center lg:text-left lg:pr-6 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mb-7 lg:mb-9 inline-block"
            >
              <span
                className="inline-block text-[11px] font-semibold uppercase tracking-[4px] pb-2 text-[var(--color-accent)]"
                style={{ borderBottom: '1px solid rgba(184,149,106,0.4)' }}
              >
                Cultural Design
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="display text-white mb-6"
              style={{ fontSize: 'clamp(56px, 8vw, 108px)', lineHeight: 0.95 }}
            >
              blac.cess
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mb-10 text-white/60 text-[13px] uppercase tracking-[4px] max-w-xs mx-auto lg:mx-0"
            >
              Cultural Design in Every Thread
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mb-10 text-white/45 text-[15px] leading-relaxed max-w-md mx-auto lg:mx-0"
            >
              Heritage motifs, modern silhouettes. Crafted to celebrate
              African artistry in every stitch.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
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

          {/* RIGHT — Staggered product images */}
          <div className="order-1 lg:order-2 relative w-full h-[440px] sm:h-[520px] lg:h-[640px]">
            {/* Decorative accent line */}
            <div
              className="hidden lg:block absolute top-2 right-0 w-20 h-px z-10"
              style={{ background: 'var(--color-accent)' }}
            />
            <div
              className="hidden lg:block absolute -bottom-2 left-0 w-20 h-px z-10"
              style={{ background: 'var(--color-accent)' }}
            />

            {/* Image 1 — beige hoodie (back, larger) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="absolute top-0 left-0 w-[62%] h-[78%] z-0"
            >
              <div
                className="relative w-full h-full overflow-hidden bg-[var(--color-paper-soft)]"
                style={{
                  boxShadow: '0 30px 70px rgba(0,0,0,0.55)',
                  border: '1px solid rgba(184,149,106,0.18)',
                }}
              >
                <Image
                  src="/hero/hoodie-beige.png"
                  alt="Heritage motif hoodie in beige"
                  fill
                  priority
                  sizes="(min-width: 1024px) 30vw, 60vw"
                  className="object-cover"
                  style={{ objectPosition: 'center 30%' }}
                />
              </div>
            </motion.div>

            {/* Image 2 — black hoodie (front, smaller, offset) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="absolute bottom-0 right-0 w-[56%] h-[68%] z-10"
            >
              <div
                className="relative w-full h-full overflow-hidden"
                style={{
                  background: '#1A1A1A',
                  boxShadow: '0 30px 70px rgba(0,0,0,0.7)',
                  border: '1px solid rgba(184,149,106,0.35)',
                }}
              >
                <Image
                  src="/hero/hoodie-black.png"
                  alt="Heritage motif hoodie in black"
                  fill
                  sizes="(min-width: 1024px) 28vw, 56vw"
                  className="object-cover"
                  style={{ objectPosition: 'center 30%' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-3 pointer-events-none z-20"
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
