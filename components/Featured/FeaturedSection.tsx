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
      <div className="container">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="relative overflow-hidden rounded-2xl"
          style={{
            padding: 'clamp(2.5rem, 5vw, 4rem)',
            background: 'rgba(255,255,255,0.65)',
            border: '1px solid rgba(212,165,116,0.18)',
            borderLeft: '4px solid rgba(212,165,116,0.5)',
            boxShadow: '0 4px 24px rgba(42,42,42,0.06)',
          }}
        >
          {/* Decorative crown */}
          <div
            className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none hidden md:block"
            style={{ opacity: 0.04 }}
          >
            <Crown size={220} style={{ color: '#D4A574' }} strokeWidth={0.5} />
          </div>

          <div className="relative z-10" style={{ maxWidth: 520 }}>
            <span className="section-label">Heritage &amp; Modern Design</span>

            <h2 className="font-serif mb-4" style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 600, color: '#2A2A2A' }}>
              This Season&apos;s Collection
            </h2>

            <p className="leading-relaxed mb-8" style={{ fontSize: 14, color: 'rgba(42,42,42,0.6)', maxWidth: 420 }}>
              Each piece celebrates African heritage through meticulous craftsmanship. Tribal motifs,
              crown emblems, and cultural symbols — woven into garments that transcend fashion.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/shop/new-arrivals" className="glass-btn glass-btn-primary inline-flex items-center gap-2">
                Shop New Arrivals
                <ArrowRight size={14} />
              </Link>
              <Link href="/shop" className="glass-btn inline-flex items-center gap-2">
                View All
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
