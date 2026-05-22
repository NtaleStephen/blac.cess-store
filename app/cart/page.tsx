'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Minus, Plus, ArrowLeft } from 'lucide-react';
import { mockProducts } from '@/lib/mock-data';
import { CartItem } from '@/types';
import CartSummary from '@/components/Cart/CartSummary';
import { formatPrice } from '@/lib/utils';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useCart } from '@/context/CartContext';

function getColorHex(productId: string, colorName: string): string {
  const product = mockProducts.find((p) => p.id === productId);
  return product?.colors.find((c) => c.name === colorName)?.hex ?? '#2A2A2A';
}

export default function CartPage() {
  const { items, itemCount, subtotal, shipping, tax, total, removeItem, updateQuantity } = useCart();

  return (
    <div className="min-h-screen pt-[72px]">

      {/* Page header — sits on body ground, no white slab */}
      <div className="page-header">
        <div className="container">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[1.5px] mb-5 text-[var(--color-ink-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            <ArrowLeft size={14} />
            Continue Shopping
          </Link>
          <h1 className="heading-xl">Shopping Cart</h1>
          {items.length > 0 && (
            <p className="body-sm mt-3">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in your bag
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container py-14">
        {items.length === 0 ? (
          <div className="text-center py-28">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-[var(--color-divider-strong)]">
              <ShoppingBag size={28} className="text-[var(--color-accent)]" strokeWidth={1.4} />
            </div>
            <h2 className="heading-md mb-3">Your bag is empty</h2>
            <p className="body-sm mb-8 max-w-sm mx-auto">
              Discover pieces crafted with cultural intention.
            </p>
            <Link href="/shop" className="btn btn-gold">
              <ShoppingBag size={14} />
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-14 items-start">

            {/* Cart items */}
            <div>
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="flex flex-col divide-y divide-[var(--color-divider)] border-y border-[var(--color-divider)]"
              >
                <AnimatePresence>
                  {items.map((item: CartItem) => (
                    <motion.li
                      key={item.id}
                      variants={fadeInUp}
                      exit={{ opacity: 0, x: -20, transition: { duration: 0.22 } }}
                      className="py-6 flex gap-5"
                    >
                      {/* Thumbnail */}
                      <Link href={`/shop/product/${item.productId}`} className="flex-shrink-0">
                        <div className="relative overflow-hidden w-[96px] h-[120px] bg-[var(--color-paper-soft)]">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </div>
                      </Link>

                      {/* Details */}
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <Link href={`/shop/product/${item.productId}`}>
                            <h3 className="font-serif font-semibold text-[16px] text-[var(--color-ink)] leading-tight hover:text-[var(--color-accent)] transition-colors">
                              {item.name}
                            </h3>
                          </Link>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] transition-colors p-1 -m-1"
                            aria-label="Remove item"
                          >
                            <X size={16} />
                          </button>
                        </div>

                        <div className="flex items-center gap-3 mt-2 mb-auto">
                          <div className="flex items-center gap-1.5">
                            <span
                              className="w-3 h-3 rounded-full border border-[var(--color-divider-strong)]"
                              style={{ background: getColorHex(item.productId, item.color) }}
                              title={item.color}
                            />
                            <span className="text-[12px] text-[var(--color-ink-muted)] capitalize">{item.color}</span>
                          </div>
                          <span className="w-px h-3 bg-[var(--color-divider-strong)]" />
                          <span className="text-[12px] text-[var(--color-ink-muted)]">Size {item.size}</span>
                        </div>

                        <div className="flex items-end justify-between flex-wrap gap-3 mt-4">
                          {/* Quantity control */}
                          <div className="flex items-center border border-[var(--color-divider-strong)]">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-3 h-9 text-[var(--color-ink)] hover:bg-[var(--color-paper-soft)] transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-4 h-9 inline-flex items-center text-[13px] font-semibold text-[var(--color-ink)] border-x border-[var(--color-divider-strong)] min-w-[44px] justify-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-3 h-9 text-[var(--color-ink)] hover:bg-[var(--color-paper-soft)] transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          {/* Line price */}
                          <span className="font-serif font-semibold text-[18px] text-[var(--color-ink)]">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>
            </div>

            {/* Order summary */}
            <div>
              <CartSummary
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
                itemCount={itemCount}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
