'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero/Hero';
import FeaturedSection from '@/components/Featured/FeaturedSection';
import ProductCard from '@/components/ProductCard/ProductCard';
import { mockProducts } from '@/lib/mock-data';
import { useInView } from '@/hooks/useInView';
import { staggerContainer } from '@/lib/animations';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  const { ref: featRef, inView: featInView } = useInView();
  const { ref: newRef,  inView: newInView  } = useInView();

  const featuredProducts = useMemo(() => mockProducts.filter((p) => p.featured), []);
  const newProducts      = useMemo(() => mockProducts.filter((p) => p.isNew).slice(0, 4), []);

  return (
    <div>
      <Hero />

      {/* Featured / brand story band */}
      <FeaturedSection />

      {/* Featured Products */}
      <section className="py-24 px-4" style={{ background: '#F5F1EB' }}>
        <div className="container">
          <div className="text-center mb-14">
            <span className="section-eyebrow">Curated Selection</span>
            <h2 className="section-heading">Featured Pieces</h2>
          </div>

          <motion.div
            ref={featRef}
            initial="hidden"
            animate={featInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link href="/shop" className="btn btn-outline">
              View All Products
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24 px-4" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="text-center mb-14">
            <span className="section-eyebrow">Just Dropped</span>
            <h2 className="section-heading">New Arrivals</h2>
          </div>

          <motion.div
            ref={newRef}
            initial="hidden"
            animate={newInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link href="/shop/new-arrivals" className="btn btn-outline">
              View All New Arrivals
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand story — full dark band */}
      <section
        className="py-32 px-4 text-center"
        style={{ background: '#0A0A0A' }}
      >
        <div className="container" style={{ maxWidth: 680 }}>
          <span
            className="inline-block text-[11px] font-semibold uppercase tracking-[4px] mb-8"
            style={{ color: '#D4A574', fontFamily: 'Inter, sans-serif', borderBottom: '1px solid rgba(212,165,116,0.35)', paddingBottom: 8 }}
          >
            Our Story
          </span>
          <h2
            className="font-serif text-white mb-6"
            style={{ fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 600, lineHeight: 1.15 }}
          >
            Worn by Those<br />Who Know
          </h2>
          <p
            className="leading-relaxed mb-10 mx-auto"
            style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', maxWidth: 480 }}
          >
            BLAC.CESS was born from a belief that luxury and cultural pride are inseparable. Every
            stitch carries intention. Every motif tells a story. Every garment is an act of
            self-assertion.
          </p>
          <Link
            href="/shop"
            className="btn btn-gold"
            style={{ paddingLeft: 40, paddingRight: 40 }}
          >
            Start Shopping
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
