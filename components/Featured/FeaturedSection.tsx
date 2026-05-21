'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useInView } from '@/hooks/useInView';
import { fadeInUp } from '@/lib/animations';

export default function FeaturedSection() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="py-20 px-4" style={{ background: '#FFFFFF' }}>
      <div className="container">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Text */}
          <div>
            <span className="section-eyebrow">This Season</span>
            <h2 className="font-serif mb-5" style={{ fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 600, color: '#2A2A2A' }}>
              Heritage &amp; Modern<br />Design
            </h2>
            <p className="leading-relaxed mb-8" style={{ fontSize: 15, color: 'rgba(42,42,42,0.65)', maxWidth: 440 }}>
              Each piece celebrates African heritage through meticulous craftsmanship. Tribal motifs,
              crown emblems, and cultural symbols — woven into garments that transcend fashion.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/shop/new-arrivals" className="btn btn-gold">
                Shop New Arrivals
                <ArrowRight size={15} />
              </Link>
              <Link href="/shop" className="btn btn-outline">
                View All
              </Link>
            </div>
          </div>

          {/* Decorative stat panel */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { number: '500+', label: 'Pieces crafted' },
              { number: '3',    label: 'Collections' },
              { number: '98%',  label: 'Happy customers' },
              { number: '2+',   label: 'Years of luxury' },
            ].map(({ number, label }) => (
              <div
                key={label}
                className="rounded-xl p-6"
                style={{ background: '#F5F1EB' }}
              >
                <p className="font-serif font-bold mb-1" style={{ fontSize: 32, color: '#D4A574' }}>{number}</p>
                <p className="text-sm" style={{ color: 'rgba(42,42,42,0.6)', fontFamily: 'Inter, sans-serif' }}>{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
