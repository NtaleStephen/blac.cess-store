'use client';

import { motion } from 'framer-motion';
import { Crown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useInView } from '@/hooks/useInView';
import { fadeInUp } from '@/lib/animations';

export default function FeaturedSection() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="py-20 px-4">
      <div className="container max-w-6xl">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="relative overflow-hidden rounded-2xl p-8 md:p-12"
          style={{
            background: 'rgba(212, 165, 116, 0.06)',
            border: '1px solid rgba(212, 165, 116, 0.2)',
            borderLeft: '4px solid rgba(212, 165, 116, 0.5)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Decorative crown - background */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none hidden md:block">
            <Crown size={200} className="text-brand-gold" strokeWidth={0.5} />
          </div>

          {/* Glow effect */}
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(212,165,116,0.15) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          <div className="relative z-10 max-w-xl">
            <span
              className="text-brand-gold text-xs font-semibold tracking-widest uppercase mb-3 block"
              style={{ letterSpacing: '3px' }}
            >
              Heritage & Modern Design
            </span>

            <h2
              className="text-brand-charcoal mb-4"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              This Season&apos;s Collection
            </h2>

            <p className="text-brand-charcoal/60 text-sm leading-relaxed mb-8 max-w-md">
              Each piece celebrates African heritage through meticulous craftsmanship. Tribal motifs,
              crown emblems, and cultural symbols — woven into garments that transcend fashion.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop?filter=new" className="glass-btn glass-btn-primary inline-flex items-center gap-2">
                Shop New Arrivals
                <ArrowRight size={15} />
              </Link>
              <Link href="/shop?filter=featured" className="glass-btn inline-flex items-center gap-2">
                View Featured
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
