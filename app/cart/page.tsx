'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Minus, Plus, ArrowLeft } from 'lucide-react';
import { mockCartItems, mockProducts } from '@/lib/mock-data';

function getColorHex(productId: string, colorName: string): string {
  const product = mockProducts.find((p) => p.id === productId);
  return product?.colors.find((c) => c.name === colorName)?.hex ?? '#2A2A2A';
}
import { CartItem } from '@/types';
import CartSummary from '@/components/Cart/CartSummary';
import { formatPrice } from '@/lib/utils';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(mockCartItems);

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal >= 200 ? 0 : 12;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-brand-cream min-h-screen" style={{ paddingTop: '72px' }}>
      {/* Header */}
      <div className="page-header">
        <div className="container py-8">
          <Link
            href="/shop"
            className="flex items-center gap-2 text-brand-charcoal/50 hover:text-brand-gold transition-colors duration-200 mb-4 text-sm"
          >
            <ArrowLeft size={14} />
            Continue Shopping
          </Link>
          <h1 className="page-title">Shopping Cart</h1>
          {items.length > 0 && (
            <p className="text-brand-charcoal/50 text-sm mt-1.5">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          )}
        </div>
      </div>

      <div className="container py-10">
        {items.length === 0 ? (
          /* Empty state */
          <div className="text-center py-24">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: 'rgba(212,165,116,0.1)', border: '1px solid rgba(212,165,116,0.2)' }}
            >
              <ShoppingBag size={32} className="text-brand-gold" strokeWidth={1.5} />
            </div>
            <h2
              className="text-brand-charcoal mb-3"
              style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px' }}
            >
              Your cart is empty
            </h2>
            <p className="text-brand-charcoal/50 text-sm mb-8">
              Start shopping to add items to your cart
            </p>
            <Link href="/shop" className="glass-btn glass-btn-primary inline-flex items-center gap-2">
              <ShoppingBag size={15} />
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="space-y-4"
              >
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={fadeInUp}
                      exit={{ opacity: 0, x: -20, transition: { duration: 0.25 } }}
                      className="card rounded-2xl p-4 flex gap-4"
                    >
                      {/* Image */}
                      <Link href={`/shop/product/${item.productId}`} className="flex-shrink-0">
                        <div
                          className="relative rounded-xl overflow-hidden"
                          style={{ width: '90px', height: '112px' }}
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="90px"
                            className="object-cover"
                          />
                        </div>
                      </Link>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <Link href={`/shop/product/${item.productId}`}>
                            <h3
                              className="text-brand-charcoal font-semibold leading-tight hover:text-brand-gold transition-colors duration-200"
                              style={{ fontFamily: 'Playfair Display, serif', fontSize: '15px' }}
                            >
                              {item.name}
                            </h3>
                          </Link>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="glass-btn-icon flex-shrink-0"
                            style={{ minWidth: '32px', minHeight: '32px', padding: '6px' }}
                            aria-label="Remove item"
                          >
                            <X size={14} className="text-brand-charcoal/60" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3 mt-1 mb-3">
                          <div
                            className="w-3.5 h-3.5 rounded-full border border-black/15 flex-shrink-0"
                            style={{ background: getColorHex(item.productId, item.color) }}
                            title={item.color}
                          />
                          <span className="text-brand-charcoal/60 text-xs capitalize">{item.color}</span>
                          <span className="text-brand-charcoal/30 text-xs">•</span>
                          <span className="text-brand-charcoal/60 text-xs">Size {item.size}</span>
                        </div>

                        <div className="flex items-center justify-between flex-wrap gap-2">
                          {/* Quantity */}
                          <div
                            className="flex items-center rounded-lg overflow-hidden"
                            style={{ border: '1px solid rgba(212,165,116,0.25)' }}
                          >
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-3 py-1.5 hover:bg-brand-gold/10 transition-colors duration-200"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} className="text-brand-charcoal" />
                            </button>
                            <span
                              className="px-4 py-1.5 text-sm font-semibold text-brand-charcoal border-x"
                              style={{ borderColor: 'rgba(212,165,116,0.25)', minWidth: '42px', textAlign: 'center' }}
                            >
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-3 py-1.5 hover:bg-brand-gold/10 transition-colors duration-200"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} className="text-brand-charcoal" />
                            </button>
                          </div>

                          {/* Price */}
                          <span className="font-bold" style={{ color: '#D4A574', fontSize: '15px' }}>
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
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
