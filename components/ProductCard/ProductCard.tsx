'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Heart, Check } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { fadeInUp } from '@/lib/animations';
import { useInView } from '@/hooks/useInView';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  animate?: boolean;
}

export default function ProductCard({ product, animate = true }: ProductCardProps) {
  const { ref, inView } = useInView();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? '');
  const [wishlisted, setWishlisted]       = useState(false);
  const [added, setAdded]                 = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const firstSize = product.sizes.find((s) => s.available)?.size ?? '';
    addItem({
      id: `${product.id}-${selectedColor}-${firstSize}-${Date.now()}`,
      productId: product.id,
      name:     product.name,
      image:    product.image,
      price:    product.price,
      quantity: 1,
      color:    selectedColor,
      size:     firstSize,
      category: product.category,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const card = (
    <div ref={ref} className="group cursor-pointer h-full">
      <div className="card rounded-2xl overflow-hidden h-full flex flex-col">

        {/* Image */}
        <div className="relative overflow-hidden flex-shrink-0" style={{ aspectRatio: '4/5' }}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Hover overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ background: 'rgba(0,0,0,0.18)' }}
          />

          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }}
            className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center"
            style={{
              width: 34, height: 34,
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
            aria-label="Add to wishlist"
          >
            <Heart
              size={14}
              style={{ color: wishlisted ? '#ef4444' : 'white', fill: wishlisted ? '#ef4444' : 'none' }}
            />
          </button>

          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-1">
            {product.isNew && (
              <span
                className="text-white font-bold uppercase px-2.5 py-1 rounded-md text-center"
                style={{ background: 'rgba(212,165,116,0.92)', backdropFilter: 'blur(8px)', fontSize: 9, letterSpacing: '1px' }}
              >
                New
              </span>
            )}
            {product.originalPrice && (
              <span
                className="text-white font-bold uppercase px-2.5 py-1 rounded-md text-center"
                style={{ background: 'rgba(220,38,38,0.85)', backdropFilter: 'blur(8px)', fontSize: 9, letterSpacing: '1px' }}
              >
                Sale
              </span>
            )}
            {product.stock > 0 && product.stock <= 8 && (
              <span
                className="font-semibold px-2.5 py-1 rounded-md text-center"
                style={{ background: 'rgba(0,0,0,0.62)', backdropFilter: 'blur(6px)', color: 'rgba(255,255,255,0.88)', fontSize: 9 }}
              >
                {product.stock} left
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-5 flex flex-col flex-1 gap-3">

          {/* Name + description */}
          <Link href={`/shop/product/${product.id}`} className="block">
            <h3
              className="font-serif font-semibold leading-snug mb-1.5 transition-colors duration-200"
              style={{ fontSize: 15, color: '#2A2A2A' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#D4A574')}
              onMouseLeave={e => (e.currentTarget.style.color = '#2A2A2A')}
            >
              {product.name}
            </h3>
            <p
              className="leading-snug line-clamp-2"
              style={{ fontSize: 12, color: 'rgba(42,42,42,0.5)', fontStyle: 'italic' }}
            >
              {product.description}
            </p>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                size={10}
                style={{
                  color: n <= Math.round(product.rating) ? '#D4A574' : 'rgba(42,42,42,0.18)',
                  fill:  n <= Math.round(product.rating) ? '#D4A574' : 'none',
                }}
              />
            ))}
            <span className="ml-1" style={{ fontSize: 11, color: 'rgba(42,42,42,0.45)' }}>
              ({product.reviewCount})
            </span>
          </div>

          {/* Color swatches */}
          {product.colors.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              {product.colors.map((color) => {
                const active = selectedColor === color.name;
                return (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                    style={{
                      width: 18, height: 18,
                      borderRadius: '50%',
                      background: color.hex,
                      border: active ? '2px solid #D4A574' : '1.5px solid rgba(42,42,42,0.2)',
                      transform: active ? 'scale(1.2)' : 'scale(1)',
                      boxShadow: active ? '0 0 0 2px rgba(212,165,116,0.18)' : 'none',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                    aria-label={color.name}
                  />
                );
              })}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mt-auto">
            <span className="font-bold" style={{ fontSize: 16, color: '#D4A574' }}>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="line-through" style={{ fontSize: 13, color: 'rgba(42,42,42,0.32)' }}>
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className="glass-btn glass-btn-primary w-full"
            style={{ fontSize: 11, letterSpacing: '1.5px', padding: '10px 16px', minHeight: 42 }}
          >
            {added ? <Check size={13} /> : <ShoppingBag size={13} />}
            {added ? 'Added!' : 'Add to Cart'}
          </button>
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
