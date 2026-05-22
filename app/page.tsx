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
    <>
      <Hero />

      {/* Brand band — paper ground */}
      <FeaturedSection />

      {/* Featured pieces — alternating soft ground */}
      <section className="section section-soft">
        <div className="container">
          <header className="text-center mb-14 max-w-xl mx-auto">
            <span className="eyebrow">Curated Selection</span>
            <h2 className="heading-lg">Featured Pieces</h2>
          </header>

          <motion.div
            ref={featRef}
            initial="hidden"
            animate={featInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12"
          >
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          <div className="text-center mt-16">
            <Link href="/shop" className="btn btn-outline">
              View All Products
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* New arrivals — surface ground */}
      <section className="section section-surface">
        <div className="container">
          <header className="text-center mb-14 max-w-xl mx-auto">
            <span className="eyebrow">Just Dropped</span>
            <h2 className="heading-lg">New Arrivals</h2>
          </header>

          <motion.div
            ref={newRef}
            initial="hidden"
            animate={newInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12"
          >
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          <div className="text-center mt-16">
            <Link href="/shop/new-arrivals" className="btn btn-outline">
              View All New Arrivals
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand story — dark editorial section */}
      <section className="section section-night text-center">
        <div className="container-narrow">
          <span className="eyebrow">Our Story</span>
          <h2 className="heading-xl text-white mb-6">
            Worn by Those<br />Who Know
          </h2>
          <p className="body-lg text-white/55 mb-10 max-w-md mx-auto">
            blac.cess was born from a belief that cultural design and pride are
            inseparable. Every stitch carries intention. Every motif tells a
            story. Every garment is an act of self-assertion.
          </p>
          <Link href="/shop" className="btn btn-gold btn-lg">
            Start Shopping
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}
