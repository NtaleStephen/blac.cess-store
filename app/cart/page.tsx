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
    <div className="min-h-screen" style={{ background: '#F5F1EB', paddingTop: 72 }}>

      {/* Page header */}
      <div className="page-header">
        <div className="container py-10">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm mb-4 hover:text-brand-gold transition-colors duration-200"
            style={{ color: 'rgba(42,42,42,0.5)' }}
          >
            <ArrowLeft size={14} />
            Continue Shopping
          </Link>
          <h1 className="page-title">Shopping Cart</h1>
          {items.length > 0 && (
            <p className="text-sm mt-1.5" style={{ color: 'rgba(42,42,42,0.5)' }}>
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        {items.length === 0 ? (
          <div className="text-center py-28">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: 'rgba(212,165,116,0.1)', border: '1px solid rgba(212,165,116,0.25)' }}
            >
              <ShoppingBag size={32} style={{ color: '#D4A574' }} strokeWidth={1.5} />
            </div>
            <h2 className="font-serif mb-3" style={{ fontSize: 24, color: '#2A2A2A' }}>
              Your cart is empty
            </h2>
            <p className="text-sm mb-8" style={{ color: 'rgba(42,42,42,0.5)' }}>
              Start shopping to add items to your cart
            </p>
            <Link href="/shop" className="btn btn-gold inline-flex items-center gap-2">
              <ShoppingBag size={14} />
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
                className="flex flex-col gap-4"
              >
                <AnimatePresence>
                  {items.map((item: CartItem) => (
                    <motion.div
                      key={item.id}
                      variants={fadeInUp}
                      exit={{ opacity: 0, x: -20, transition: { duration: 0.22 } }}
                      className="rounded-xl p-5 flex gap-5"
                      style={{ background: '#FFFFFF', boxShadow: '0 1px 4px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.05)' }}
                    >
                      {/* Thumbnail */}
                      <Link href={`/shop/product/${item.productId}`} className="flex-shrink-0">
                        <div className="relative rounded-xl overflow-hidden" style={{ width: 90, height: 112 }}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="90px"
                            className="object-cover"
                          />
                        </div>
                      </Link>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <Link href={`/shop/product/${item.productId}`}>
                            <h3
                              className="font-serif font-semibold leading-tight hover:text-brand-gold transition-colors duration-200"
                              style={{ fontSize: 15, color: '#2A2A2A' }}
                            >
                              {item.name}
                            </h3>
                          </Link>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="btn-icon flex-shrink-0"
                            style={{ minWidth: 34, minHeight: 34, width: 34, height: 34 }}
                            aria-label="Remove item"
                          >
                            <X size={14} style={{ color: 'rgba(42,42,42,0.55)' }} />
                          </button>
                        </div>

                        {/* Colour & size */}
                        <div className="flex items-center gap-3 mt-1.5 mb-3">
                          <div
                            className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                            style={{ background: getColorHex(item.productId, item.color), border: '1px solid rgba(0,0,0,0.12)' }}
                            title={item.color}
                          />
                          <span className="text-xs capitalize" style={{ color: 'rgba(42,42,42,0.6)' }}>{item.color}</span>
                          <span className="text-xs" style={{ color: 'rgba(42,42,42,0.28)' }}>•</span>
                          <span className="text-xs" style={{ color: 'rgba(42,42,42,0.6)' }}>Size {item.size}</span>
                        </div>

                        <div className="flex items-center justify-between flex-wrap gap-2">
                          {/* Quantity control */}
                          <div
                            className="flex items-center rounded-lg overflow-hidden"
                            style={{ border: '1.5px solid rgba(42,42,42,0.15)' }}
                          >
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-3 py-2 transition-colors duration-200 hover:bg-gray-50"
                              style={{ color: '#2A2A2A' }}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span
                              className="px-4 py-2 text-sm font-semibold text-center"
                              style={{ color: '#2A2A2A', borderLeft: '1.5px solid rgba(42,42,42,0.1)', borderRight: '1.5px solid rgba(42,42,42,0.1)', minWidth: 44 }}
                            >
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-3 py-2 transition-colors duration-200 hover:bg-gray-50"
                              style={{ color: '#2A2A2A' }}
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          {/* Line price */}
                          <span className="font-bold" style={{ color: '#2A2A2A', fontSize: 15 }}>
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Order summary */}
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
