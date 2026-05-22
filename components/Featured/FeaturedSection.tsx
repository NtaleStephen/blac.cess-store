'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useInView } from '@/hooks/useInView';
import { fadeInUp } from '@/lib/animations';

const STATS = [
  { number: '500+', label: 'Pieces crafted' },
  { number: '3',    label: 'Collections' },
  { number: '98%',  label: 'Happy customers' },
  { number: '2+',   label: 'Years of luxury' },
];

export default function FeaturedSection() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="section section-paper">
      <div className="container">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center"
        >
          {/* Text */}
          <div>
            <span className="eyebrow">This Season</span>
            <h2 className="heading-xl mb-6">
              Heritage &amp; Modern<br />Design
            </h2>
            <p className="body-lg mb-10 max-w-md">
              Each piece celebrates African heritage through meticulous craftsmanship.
              Tribal motifs, crown emblems, and cultural symbols — woven into garments
              that transcend fashion.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/shop/new-arrivals" className="btn btn-gold">
                Shop New Arrivals
                <ArrowRight size={14} />
              </Link>
              <Link href="/shop" className="btn btn-outline">
                View All
              </Link>
            </div>
          </div>

          {/* Decorative stat panel */}
          <div className="grid grid-cols-2 gap-px bg-[var(--color-divider)] border border-[var(--color-divider)]">
            {STATS.map(({ number, label }) => (
              <div key={label} className="p-8 bg-[var(--color-surface)]">
                <p className="font-serif font-bold text-[var(--color-accent)] mb-2"
                   style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}>
                  {number}
                </p>
                <p className="text-[12px] uppercase tracking-[1.5px] text-[var(--color-ink-muted)]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
