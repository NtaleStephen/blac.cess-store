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
import { ArrowRight, Crown } from 'lucide-react';

export default function HomePage() {
  const { ref: featRef, inView: featInView } = useInView();
  const { ref: newRef,  inView: newInView  } = useInView();

  const featuredProducts = useMemo(() => mockProducts.filter((p) => p.featured), []);
  const newProducts      = useMemo(() => mockProducts.filter((p) => p.isNew).slice(0, 4), []);

  return (
    <div>
      <Hero />

      {/* Divider */}
      <div className="section-divider" />

      {/* Featured band */}
      <FeaturedSection />

      {/* Divider */}
      <div className="section-divider" />

      {/* Featured Products */}
      <section className="py-24 px-4">
        <div className="container">
          <div className="text-center mb-14">
            <span className="section-label" style={{ textAlign: 'center' }}>Curated Selection</span>
            <h2 className="page-title">Featured Pieces</h2>
          </div>

          <motion.div
            ref={featRef}
            initial="hidden"
            animate={featInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7"
          >
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link href="/shop" className="glass-btn inline-flex items-center gap-2 px-8">
              View All Products
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* New Arrivals */}
      <section className="py-24 px-4">
        <div className="container">
          <div className="text-center mb-14">
            <span className="section-label" style={{ textAlign: 'center' }}>Just Dropped</span>
            <h2 className="page-title">New Arrivals</h2>
          </div>

          <motion.div
            ref={newRef}
            initial="hidden"
            animate={newInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7"
          >
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link href="/shop/new-arrivals" className="glass-btn inline-flex items-center gap-2 px-8">
              View All New Arrivals
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand story */}
      <section
        className="py-28 px-4"
        style={{ background: 'linear-gradient(160deg, #111111 0%, #000000 55%, #0A0A0A 100%)' }}
      >
        <div className="container text-center" style={{ maxWidth: 760, margin: '0 auto' }}>
          <Crown
            size={42}
            style={{ color: '#D4A574', margin: '0 auto 28px', opacity: 0.8 }}
            strokeWidth={1}
          />
          <h2
            className="font-serif text-white mb-6"
            style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 600 }}
          >
            Worn by Those Who Know
          </h2>
          <p
            className="leading-relaxed mb-10 mx-auto"
            style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', maxWidth: 500 }}
          >
            BLAC.CESS was born from a belief that luxury and cultural pride are inseparable. Every
            stitch carries intention. Every motif tells a story. Every garment is an act of
            self-assertion.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-semibold uppercase transition-all duration-300 hover:gap-4"
            style={{ color: '#D4A574', fontSize: 13, letterSpacing: '2px', fontFamily: 'Inter, sans-serif' }}
          >
            Start Shopping
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
