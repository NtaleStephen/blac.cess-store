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
        <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-1" style={{ letterSpacing: '3px' }}>
          My Account
        </p>
        <h1 className="text-brand-charcoal" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 600 }}>
          Wishlist
        </h1>
        {items.length > 0 && (
          <p className="text-brand-charcoal/50 text-sm mt-1">{items.length} saved {items.length === 1 ? 'item' : 'items'}</p>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(212,165,116,0.1)', border: '1px solid rgba(212,165,116,0.2)' }}>
            <Heart size={28} className="text-brand-gold" strokeWidth={1.5} />
          </div>
          <h3 className="text-brand-charcoal mb-2" style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px' }}>
            Your wishlist is empty
          </h3>
          <p className="text-brand-charcoal/50 text-sm mb-6">Save items you love to find them again easily.</p>
          <Link href="/shop" className="glass-btn glass-btn-primary inline-flex items-center gap-2">
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
                className="rounded-2xl overflow-hidden group"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(212,165,116,0.15)', backdropFilter: 'blur(10px)' }}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-400 group-hover:scale-105"
                  />
                  {/* Remove button */}
                  <button
                    onClick={() => remove(product.id)}
                    className="glass-btn-icon absolute top-3 right-3"
                    style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}
                    aria-label="Remove from wishlist"
                  >
                    <X size={14} className="text-white" />
                  </button>
                </div>

                {/* Info */}
                <div className="p-4">
                  <Link href={`/shop/product/${product.id}`}>
                    <h3
                      className="text-brand-charcoal font-semibold mb-1 hover:text-brand-gold transition-colors duration-200 truncate"
                      style={{ fontFamily: 'Playfair Display, serif', fontSize: '15px' }}
                    >
                      {product.name}
                    </h3>
                  </Link>
                  <p className="font-bold mb-3" style={{ color: '#D4A574', fontSize: '15px' }}>
                    {formatPrice(product.price)}
                  </p>
                  <div className="flex gap-2">
                    <Link
                      href={`/shop/product/${product.id}`}
                      className="glass-btn glass-btn-primary flex-1 flex items-center justify-center gap-1.5"
                      style={{ fontSize: '11px', letterSpacing: '1px', padding: '9px 12px' }}
                    >
                      <ShoppingBag size={12} />
                      Add to Cart
                    </Link>
                    <button
                      onClick={() => remove(product.id)}
                      className="glass-btn-icon"
                      aria-label="Remove from wishlist"
                    >
                      <Heart size={14} className="fill-red-400 text-red-400" />
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
