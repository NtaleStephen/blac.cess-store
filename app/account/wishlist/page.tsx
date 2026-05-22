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
      <header className="mb-8">
        <h2 className="heading-lg">Wishlist</h2>
        {items.length > 0 && (
          <p className="body-sm mt-2">
            {items.length} saved {items.length === 1 ? 'item' : 'items'}
          </p>
        )}
      </header>

      {items.length === 0 ? (
        <div className="text-center py-24">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 border border-[var(--color-divider-strong)]">
            <Heart size={26} className="text-[var(--color-accent)]" strokeWidth={1.4} />
          </div>
          <h3 className="heading-md mb-2">Your wishlist is empty</h3>
          <p className="body-sm mb-8">Save items you love to find them again easily.</p>
          <Link href="/shop" className="btn btn-gold">Explore Collection</Link>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10"
        >
          <AnimatePresence>
            {items.map((product) => (
              <motion.article
                key={product.id}
                variants={fadeInUp}
                exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
                className="product-card group"
              >
                <div className="product-card-image relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <button
                    onClick={() => remove(product.id)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove from wishlist"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="pt-4">
                  <Link href={`/shop/product/${product.id}`}>
                    <h3 className="font-serif font-semibold text-[15px] text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors truncate">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="font-serif font-semibold text-[16px] mt-1 mb-3 text-[var(--color-ink)]">
                    {formatPrice(product.price)}
                  </p>
                  <div className="flex gap-2">
                    <Link
                      href={`/shop/product/${product.id}`}
                      className="btn btn-sm btn-block flex-1"
                    >
                      <ShoppingBag size={12} />
                      Add to Cart
                    </Link>
                    <button
                      onClick={() => remove(product.id)}
                      className="icon-btn"
                      aria-label="Remove from wishlist"
                    >
                      <Heart size={14} style={{ color: 'var(--color-danger)', fill: 'var(--color-danger)' }} />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}
