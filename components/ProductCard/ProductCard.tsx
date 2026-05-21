'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Heart } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { fadeInUp } from '@/lib/animations';
import { useInView } from '@/hooks/useInView';

interface ProductCardProps {
  product: Product;
  animate?: boolean;
}

export default function ProductCard({ product, animate = true }: ProductCardProps) {
  const { ref, inView } = useInView();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? '');
  const [wishlisted, setWishlisted] = useState(false);

  const card = (
    <div
      ref={ref}
      className="group cursor-pointer h-full"
    >
      <div
        className="rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300"
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(212,165,116,0.15)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Image */}
        <div className="relative overflow-hidden flex-shrink-0" style={{ aspectRatio: '4/5' }}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Wishlist button */}
          <button
            onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }}
            className="glass-btn-icon absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}
            aria-label="Add to wishlist"
          >
            <Heart
              size={14}
              className={wishlisted ? 'fill-red-400 text-red-400' : 'text-white'}
            />
          </button>

          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-1">
            {product.isNew && (
              <span
                className="text-white font-bold uppercase px-2 py-1 rounded-md text-center"
                style={{
                  background: 'rgba(212,165,116,0.92)',
                  backdropFilter: 'blur(10px)',
                  fontSize: '9px',
                  letterSpacing: '1px',
                }}
              >
                New
              </span>
            )}
            {product.originalPrice && (
              <span
                className="text-white font-bold uppercase px-2 py-1 rounded-md text-center"
                style={{
                  background: 'rgba(220,38,38,0.85)',
                  backdropFilter: 'blur(10px)',
                  fontSize: '9px',
                  letterSpacing: '1px',
                }}
              >
                Sale
              </span>
            )}
            {product.stock > 0 && product.stock <= 8 && (
              <span
                className="font-semibold px-2 py-1 rounded-md text-center"
                style={{
                  background: 'rgba(0,0,0,0.65)',
                  backdropFilter: 'blur(8px)',
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '9px',
                }}
              >
                {product.stock} left
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col flex-1">
          <Link href={`/shop/product/${product.id}`} className="block mb-auto">
            <h3
              className="text-brand-charcoal font-semibold mb-1 leading-tight hover:text-brand-gold transition-colors duration-200"
              style={{ fontFamily: 'Playfair Display, serif', fontSize: '15px' }}
            >
              {product.name}
            </h3>
            <p
              className="text-brand-charcoal/50 mb-2 leading-snug line-clamp-2"
              style={{ fontSize: '12px', fontStyle: 'italic' }}
            >
              {product.description}
            </p>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {[1,2,3,4,5].map((star) => (
              <Star
                key={star}
                size={10}
                className={star <= Math.round(product.rating) ? 'text-brand-gold fill-brand-gold' : 'text-brand-charcoal/20'}
              />
            ))}
            <span className="text-brand-charcoal/50 ml-1" style={{ fontSize: '11px' }}>
              ({product.reviewCount})
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
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: color.hex,
                    border: selectedColor === color.name
                      ? '2px solid #D4A574'
                      : '1.5px solid rgba(42,42,42,0.25)',
                    transform: selectedColor === color.name ? 'scale(1.2)' : 'scale(1)',
                    boxShadow: selectedColor === color.name ? '0 0 0 2px rgba(212,165,116,0.2)' : 'none',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#D4A574' }}>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-brand-charcoal/35 line-through" style={{ fontSize: '13px' }}>
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Add to cart */}
          <Link
            href={`/shop/product/${product.id}`}
            className="glass-btn glass-btn-primary w-full flex items-center justify-center gap-2"
            style={{ fontSize: '11px', letterSpacing: '1.5px', padding: '10px 16px' }}
          >
            <ShoppingBag size={13} />
            Add to Cart
          </Link>
        </div>
      </div>
    </div>
  );

  if (!animate) return card;

  return (
    <motion.div
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className="h-full"
    >
      {card}
    </motion.div>
  );
}
