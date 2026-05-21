'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero/Hero';
import FeaturedSection from '@/components/Featured/FeaturedSection';
import { mockProducts } from '@/lib/mock-data';
import { useInView } from '@/hooks/useInView';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Star, ArrowRight, Crown } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types';

function ProductCard({ product }: { product: Product }) {
  const { ref, inView } = useInView();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className="group cursor-pointer"
    >
      <div
        className="glass rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(212,165,116,0.15)',
        }}
      >
        {/* Image container */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.isNew && (
            <span
              className="absolute top-3 right-3 text-white text-xs font-bold uppercase px-3 py-1 rounded-md"
              style={{
                background: 'rgba(212,165,116,0.9)',
                backdropFilter: 'blur(10px)',
                letterSpacing: '1px',
                fontSize: '10px',
              }}
            >
              New
            </span>
          )}
          {product.stock <= 10 && product.stock > 0 && (
            <span
              className="absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-md"
              style={{
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(8px)',
                color: 'rgba(255,255,255,0.8)',
                fontSize: '10px',
              }}
            >
              Only {product.stock} left
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <h3
            className="text-brand-charcoal font-semibold mb-1 truncate"
            style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px' }}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <Star size={12} className="text-brand-gold fill-brand-gold" />
            <span className="text-xs text-brand-charcoal/60">
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Color swatches */}
          {product.colors.length > 0 && (
            <div className="flex items-center gap-2 mb-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  title={color.name}
                  className="rounded-full transition-all duration-200"
                  style={{
                    width: '20px',
                    height: '20px',
                    background: color.hex,
                    border: selectedColor === color.name
                      ? '2px solid #D4A574'
                      : '1px solid rgba(42,42,42,0.2)',
                    boxShadow: selectedColor === color.name
                      ? '0 0 0 2px rgba(212,165,116,0.2)'
                      : 'none',
                    transform: selectedColor === color.name ? 'scale(1.15)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <span
                className="font-bold"
                style={{ fontSize: '16px', color: '#D4A574' }}
              >
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-brand-charcoal/40 text-sm line-through ml-2">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <Link
            href={`/shop/product/${product.id}`}
            className="glass-btn glass-btn-primary w-full mt-3 text-center"
            style={{ fontSize: '12px', letterSpacing: '1.5px', padding: '10px 16px' }}
          >
            <ShoppingBag size={14} />
            Add to Cart
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  const { ref: gridRef, inView: gridInView } = useInView();
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
            <span
              className="text-brand-gold text-xs font-semibold tracking-widest uppercase mb-3 block"
              style={{ letterSpacing: '3px' }}
            >
              Curated Selection
            </span>
            <h2
              className="text-brand-charcoal"
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 600 }}
            >
              Featured Pieces
            </h2>
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
            <span
              className="text-brand-gold text-xs font-semibold tracking-widest uppercase mb-3 block"
              style={{ letterSpacing: '3px' }}
            >
              Just Dropped
            </span>
            <h2
              className="text-brand-charcoal"
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 600 }}
            >
              New Arrivals
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
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
