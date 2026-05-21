'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, X } from 'lucide-react';
import { mockProducts } from '@/lib/mock-data';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { staggerContainer, fadeInUp } from '@/lib/animations';

export default function WishlistPage() {
  const [items, setItems] = useState<Product[]>(
    mockProducts.filter((p) => p.featured).slice(0, 5)
  );

  const remove = (id: string) => setItems((prev) => prev.filter((p) => p.id !== id));

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
      <div className="mb-8">
        <span className="section-eyebrow">My Account</span>
        <h1 className="font-serif" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 600, color: '#2A2A2A' }}>
          Wishlist
        </h1>
        {items.length > 0 && (
          <p className="text-sm mt-1" style={{ color: 'rgba(42,42,42,0.5)' }}>
            {items.length} saved {items.length === 1 ? 'item' : 'items'}
          </p>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(212,165,116,0.1)', border: '1px solid rgba(212,165,116,0.2)' }}
          >
            <Heart size={28} style={{ color: '#D4A574' }} strokeWidth={1.5} />
          </div>
          <h3 className="font-serif mb-2" style={{ fontSize: '20px', color: '#2A2A2A' }}>
            Your wishlist is empty
          </h3>
          <p className="text-sm mb-6" style={{ color: 'rgba(42,42,42,0.5)' }}>Save items you love to find them again easily.</p>
          <Link href="/shop" className="btn btn-gold inline-flex items-center gap-2">
            Explore Collection
          </Link>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence>
            {items.map((product) => (
              <motion.div
                key={product.id}
                variants={fadeInUp}
                exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
                className="rounded-xl overflow-hidden group"
                style={{ background: '#FFFFFF', boxShadow: '0 1px 4px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.05)' }}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Remove button */}
                  <button
                    onClick={() => remove(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100"
                    style={{ background: 'rgba(255,255,255,0.95)', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
                    aria-label="Remove from wishlist"
                  >
                    <X size={13} style={{ color: '#2A2A2A' }} />
                  </button>
                </div>

                {/* Info */}
                <div className="p-4">
                  <Link href={`/shop/product/${product.id}`}>
                    <h3
                      className="font-serif font-semibold mb-1 hover:text-brand-gold transition-colors duration-200 truncate"
                      style={{ fontSize: '15px', color: '#2A2A2A' }}
                    >
                      {product.name}
                    </h3>
                  </Link>
                  <p className="font-bold mb-3" style={{ color: '#2A2A2A', fontSize: '15px' }}>
                    {formatPrice(product.price)}
                  </p>
                  <div className="flex gap-2">
                    <Link
                      href={`/shop/product/${product.id}`}
                      className="btn btn-gold btn-sm flex-1 flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag size={12} />
                      Add to Cart
                    </Link>
                    <button
                      onClick={() => remove(product.id)}
                      className="btn-icon"
                      aria-label="Remove from wishlist"
                    >
                      <Heart size={14} style={{ color: '#ef4444', fill: '#ef4444' }} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}
