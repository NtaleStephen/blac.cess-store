'use client';

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
  const { ref: gridRef, inView: gridInView } = useInView();
  const { ref: newRef, inView: newInView } = useInView();
  const featuredProducts = mockProducts.filter((p) => p.featured);
  const newProducts = mockProducts.filter((p) => p.isNew).slice(0, 4);

  return (
    <div>
      <Hero />

      {/* Section divider */}
      <div className="section-divider mx-auto max-w-4xl" />

      {/* Featured Section */}
      <FeaturedSection />

      {/* Featured Products Grid */}
      <section className="py-16 px-4">
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label" style={{ display: 'block', textAlign: 'center' }}>Curated Selection</span>
            <h2 className="page-title">Featured Pieces</h2>
          </div>

          <motion.div
            ref={gridRef}
            initial="hidden"
            animate={gridInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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

      {/* Section divider */}
      <div className="section-divider mx-auto max-w-4xl" />

      {/* New Arrivals */}
      <section className="py-16 px-4">
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label" style={{ display: 'block', textAlign: 'center' }}>Just Dropped</span>
            <h2 className="page-title">New Arrivals</h2>
          </div>

          <motion.div
            ref={newRef}
            initial="hidden"
            animate={newInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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

      {/* Story section */}
      <section className="py-24 px-4 bg-brand-navy">
        <div className="container max-w-4xl text-center">
          <Crown size={40} className="text-brand-gold mx-auto mb-6 opacity-80" strokeWidth={1} />
          <h2
            className="text-white mb-6"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(28px, 5vw, 48px)',
              fontWeight: 600,
            }}
          >
            Worn by Those Who Know
          </h2>
          <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
            BLAC.CESS was born from a belief that luxury and cultural pride are inseparable. Every
            stitch carries intention. Every motif tells a story. Every garment is an act of
            self-assertion.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-brand-gold text-sm font-semibold uppercase tracking-widest hover:gap-4 transition-all duration-300"
            style={{ letterSpacing: '2px' }}
          >
            Start Shopping
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
