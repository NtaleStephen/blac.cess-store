'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Check, Star } from 'lucide-react';
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
      <div
        className="h-full flex flex-col rounded-xl overflow-hidden"
        style={{
          background: '#FFFFFF',
          boxShadow: '0 1px 4px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.04)',
          transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.1), 0 16px 40px rgba(0,0,0,0.07)';
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-5px)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.04)';
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        }}
      >
        {/* Image */}
        <Link href={`/shop/product/${product.id}`} className="block relative flex-shrink-0" style={{ aspectRatio: '4/5', overflow: 'hidden' }}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'rgba(0,0,0,0.12)' }}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span
                className="text-white font-semibold uppercase px-2.5 py-1 rounded text-center"
                style={{ background: '#D4A574', fontSize: 9, letterSpacing: '1px' }}
              >
                New
              </span>
            )}
            {product.originalPrice && (
              <span
                className="text-white font-semibold uppercase px-2.5 py-1 rounded text-center"
                style={{ background: '#DC2626', fontSize: 9, letterSpacing: '1px' }}
              >
                Sale
              </span>
            )}
          </div>

          {/* Low stock */}
          {product.stock > 0 && product.stock <= 8 && (
            <div className="absolute top-3 right-3">
              <span
                className="font-semibold px-2.5 py-1 rounded text-center"
                style={{ background: 'rgba(0,0,0,0.7)', color: 'rgba(255,255,255,0.9)', fontSize: 9 }}
              >
                {product.stock} left
              </span>
            </div>
          )}

          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }}
            className="absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
            aria-label="Add to wishlist"
          >
            <Heart
              size={14}
              style={{ color: wishlisted ? '#ef4444' : '#2A2A2A', fill: wishlisted ? '#ef4444' : 'none' }}
            />
          </button>
        </Link>

        {/* Info */}
        <div className="p-4 flex flex-col flex-1 gap-2.5">
          {/* Name */}
          <Link href={`/shop/product/${product.id}`}>
            <h3
              className="font-serif font-semibold leading-snug transition-colors duration-150 hover:text-[#D4A574]"
              style={{ fontSize: 14, color: '#2A2A2A' }}
            >
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map((n) => (
              <Star
                key={n}
                size={10}
                style={{
                  color: n <= Math.round(product.rating) ? '#D4A574' : '#D5D0CA',
                  fill:  n <= Math.round(product.rating) ? '#D4A574' : '#D5D0CA',
                }}
              />
            ))}
            <span className="ml-1 text-[11px]" style={{ color: 'rgba(42,42,42,0.45)' }}>
              ({product.reviewCount})
            </span>
          </div>

          {/* Color swatches */}
          {product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap">
              {product.colors.map((color) => {
                const active = selectedColor === color.name;
                return (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                    style={{
                      width: 16, height: 16,
                      borderRadius: '50%',
                      background: color.hex,
                      border: active ? '2px solid #D4A574' : '1.5px solid rgba(42,42,42,0.18)',
                      transform: active ? 'scale(1.25)' : 'scale(1)',
                      transition: 'all 0.15s ease',
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
          <div className="flex items-baseline gap-2 mt-auto pt-1">
            <span className="font-bold" style={{ fontSize: 15, color: '#2A2A2A' }}>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="line-through text-xs" style={{ color: 'rgba(42,42,42,0.35)' }}>
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 rounded-lg transition-all duration-200 font-semibold uppercase"
            style={{
              height: 42,
              background: added ? '#D4A574' : '#2A2A2A',
              color: '#FFFFFF',
              fontSize: 11,
              letterSpacing: '1.5px',
              border: 'none',
              cursor: 'pointer',
            }}
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
