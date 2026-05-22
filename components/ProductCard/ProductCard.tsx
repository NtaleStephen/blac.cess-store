'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Check, Star } from 'lucide-react';
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
    <div ref={ref} className="product-card group">
      {/* Image */}
      <Link
        href={`/shop/product/${product.id}`}
        className="product-card-image block relative"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && <span className="badge badge-new">New</span>}
          {product.originalPrice && <span className="badge badge-sale">Sale</span>}
        </div>

        {product.stock > 0 && product.stock <= 8 && (
          <span className="badge badge-low absolute top-3 right-3">
            {product.stock} left
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          aria-label="Add to wishlist"
        >
          <Heart
            size={14}
            style={{
              color: wishlisted ? '#B83333' : '#1A1A1A',
              fill:  wishlisted ? '#B83333' : 'none',
            }}
          />
        </button>
      </Link>

      {/* Info */}
      <div className="pt-4 flex flex-col gap-2.5">
        {/* Name */}
        <Link href={`/shop/product/${product.id}`}>
          <h3 className="font-serif font-semibold text-[15px] text-[var(--color-ink)] leading-snug hover:text-[var(--color-accent)] transition-colors">
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
                color: n <= Math.round(product.rating) ? '#B8956A' : '#D5CFC2',
                fill:  n <= Math.round(product.rating) ? '#B8956A' : '#D5CFC2',
              }}
            />
          ))}
          <span className="ml-1 text-[11px] text-[var(--color-ink-muted)]">
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
                  aria-label={color.name}
                  className="rounded-full transition-transform duration-150"
                  style={{
                    width: 16,
                    height: 16,
                    background: color.hex,
                    border: active
                      ? '1.5px solid var(--color-ink)'
                      : '1px solid var(--color-divider-strong)',
                    outline: active ? '2px solid var(--color-paper)' : 'none',
                    outlineOffset: -3,
                    transform: active ? 'scale(1.15)' : 'scale(1)',
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 pt-1">
          <span className="font-serif font-semibold text-[16px] text-[var(--color-ink)]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="line-through text-[12px] text-[var(--color-ink-faint)]">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          className={`btn btn-block btn-sm mt-2 ${added ? 'btn-gold' : ''}`}
          style={added ? undefined : undefined}
        >
          {added ? <Check size={13} /> : null}
          {added ? 'Added' : 'Add to Cart'}
        </button>
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
