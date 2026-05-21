'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, CreditCard, Smartphone, Building2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import { fadeInUp } from '@/lib/animations';
import { useCart } from '@/context/CartContext';
import type { CartItem } from '@/types';

const STEPS = ['Shipping', 'Billing', 'Payment', 'Review'];

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, Amex' },
  { id: 'apple', label: 'Apple Pay', icon: Smartphone, desc: 'Touch ID or Face ID' },
  { id: 'bank', label: 'Bank Transfer', icon: Building2, desc: 'Direct bank transfer' },
];

const COUNTRIES = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Other'];

function StepIndicator({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center justify-center mb-10">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300"
              style={{
                background: i < current ? '#D4A574' : i === current ? 'rgba(212,165,116,0.2)' : 'rgba(255,255,255,0.06)',
                border: `2px solid ${i <= current ? '#D4A574' : 'rgba(212,165,116,0.2)'}`,
                color: i < current ? '#fff' : i === current ? '#D4A574' : 'rgba(42,42,42,0.4)',
              }}
            >
              {i < current ? <Check size={14} /> : i + 1}
            </div>
            <span
              className="text-xs mt-1.5 font-medium"
              style={{
                color: i === current ? '#D4A574' : i < current ? '#2A2A2A' : 'rgba(42,42,42,0.4)',
                fontSize: '11px',
                letterSpacing: '0.5px',
              }}
            >
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className="w-12 sm:w-20 h-px mx-2 transition-all duration-300"
              style={{ background: i < current ? '#D4A574' : 'rgba(212,165,116,0.2)' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function GlassInput({ label, placeholder, type = 'text', required = false }: { label: string; placeholder: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-brand-charcoal font-medium mb-1.5" style={{ fontSize: '12px', letterSpacing: '0.5px' }}>
        {label}{required && <span className="text-brand-gold ml-1">*</span>}
      </label>
      <input type={type} placeholder={placeholder} className="glass-input" required={required} />
    </div>
  );
}

function GlassSelect({ label, options, required = false }: { label: string; options: string[]; required?: boolean }) {
  return (
    <div>
      <label className="block text-brand-charcoal font-medium mb-1.5" style={{ fontSize: '12px', letterSpacing: '0.5px' }}>
        {label}{required && <span className="text-brand-gold ml-1">*</span>}
      </label>
      <select
        className="glass-input"
        style={{ cursor: 'pointer' }}
        required={required}
      >
        <option value="">Select {label}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function AddressForm({ title, showSameAs = false }: { title: string; showSameAs?: boolean }) {
  return (
    <div>
      <h3
        className="text-brand-charcoal font-semibold mb-5"
        style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px' }}
      >
        {title}
      </h3>
      {showSameAs && (
        <label className="flex items-center gap-3 mb-5 cursor-pointer">
          <input type="checkbox" className="w-4 h-4" style={{ accentColor: '#D4A574' }} />
          <span className="text-sm text-brand-charcoal/70">Same as shipping address</span>
        </label>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2"><GlassInput label="Full Name" placeholder="Amara Nwosu" required /></div>
        <GlassInput label="Email" placeholder="amara@example.com" type="email" required />
        <GlassInput label="Phone" placeholder="+1 555 0100" type="tel" />
        <div className="sm:col-span-2"><GlassInput label="Street Address" placeholder="123 Crown Street, Apt 4B" required /></div>
        <GlassInput label="City" placeholder="New York" required />
        <GlassInput label="State / Province" placeholder="NY" required />
        <GlassInput label="Postal Code" placeholder="10001" required />
        <GlassSelect label="Country" options={COUNTRIES} required />
      </div>
    </div>
  );
}

function PaymentStep() {
  const [selected, setSelected] = useState('card');

  return (
    <div>
      <h3
        className="text-brand-charcoal font-semibold mb-5"
        style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px' }}
      >
        Payment Method
      </h3>
      <div className="space-y-3 mb-6">
        {PAYMENT_METHODS.map((method) => (
          <button
            key={method.id}
            onClick={() => setSelected(method.id)}
            className="w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 text-left"
            style={{
              background: selected === method.id ? 'rgba(212,165,116,0.1)' : 'rgba(255,255,255,0.6)',
              border: `2px solid ${selected === method.id ? 'rgba(212,165,116,0.6)' : 'rgba(212,165,116,0.15)'}`,
            }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: selected === method.id ? 'rgba(212,165,116,0.2)' : 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(212,165,116,0.2)',
              }}
            >
              <method.icon size={18} className="text-brand-gold" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-brand-charcoal text-sm">{method.label}</p>
              <p className="text-brand-charcoal/50 text-xs">{method.desc}</p>
            </div>
            <div
              className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
              style={{ borderColor: selected === method.id ? '#D4A574' : 'rgba(42,42,42,0.2)' }}
            >
              {selected === method.id && (
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#D4A574' }} />
              )}
            </div>
          </button>
        ))}
      </div>

      {selected === 'card' && (
        <div className="space-y-4">
          <GlassInput label="Card Number" placeholder="1234 5678 9012 3456" />
          <div className="grid grid-cols-2 gap-4">
            <GlassInput label="Expiry Date" placeholder="MM / YY" />
            <GlassInput label="CVV" placeholder="123" />
          </div>
          <GlassInput label="Cardholder Name" placeholder="Amara Nwosu" />
        </div>
      )}
    </div>
  );
}

function ReviewStep({ onEdit, items, subtotal, shipping, tax, total }: {
  onEdit: (step: number) => void;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}) {
  return (
    <div>
      <h3
        className="text-brand-charcoal font-semibold mb-5"
        style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px' }}
      >
        Review Your Order
      </h3>

      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="relative w-14 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-brand-charcoal font-semibold text-sm truncate">{item.name}</p>
              <p className="text-brand-charcoal/50 text-xs">{item.color} · Size {item.size} · Qty {item.quantity}</p>
            </div>
            <span className="font-bold text-sm" style={{ color: '#D4A574' }}>
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-2 pt-4" style={{ borderTop: '1px solid rgba(212,165,116,0.15)' }}>
        {[
          ['Subtotal', formatPrice(subtotal)],
          ['Shipping', shipping === 0 ? 'FREE' : formatPrice(shipping)],
          ['Tax', formatPrice(tax)],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between text-sm">
            <span className="text-brand-charcoal/60">{label}</span>
            <span>{value}</span>
          </div>
        ))}
        <div className="flex justify-between items-center pt-3" style={{ borderTop: '1px solid rgba(212,165,116,0.15)' }}>
          <span className="font-bold text-brand-charcoal" style={{ fontFamily: 'Playfair Display, serif' }}>Total</span>
          <span className="font-bold text-lg" style={{ color: '#D4A574', fontFamily: 'Playfair Display, serif' }}>{formatPrice(total)}</span>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-brand-charcoal/60">Shipping to:</span>
          <button onClick={() => onEdit(0)} className="text-brand-gold text-xs hover:underline">Edit</button>
        </div>
        <p className="text-brand-charcoal text-sm">123 Crown Street, New York, NY 10001</p>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { items, subtotal, shipping, tax, total, clearCart } = useCart();

  const stepContent = [
    <AddressForm key="shipping" title="Shipping Address" />,
    <AddressForm key="billing" title="Billing Address" showSameAs />,
    <PaymentStep key="payment" />,
    <ReviewStep key="review" onEdit={(s) => setStep(s)} items={items} subtotal={subtotal} shipping={shipping} tax={tax} total={total} />,
  ];

  if (orderPlaced) {
    return (
      <div className="bg-brand-cream min-h-screen flex items-center justify-center" style={{ paddingTop: '72px' }}>
        <div className="text-center px-6 max-w-md">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(56,142,60,0.12)', border: '2px solid rgba(56,142,60,0.4)' }}
          >
            <Check size={36} style={{ color: '#388E3C' }} />
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '32px', fontWeight: 600 }} className="text-brand-charcoal mb-3">
            Order Placed!
          </h1>
          <p className="text-brand-charcoal/60 text-sm mb-2">Order #BC-2026-1003</p>
          <p className="text-brand-charcoal/60 text-sm mb-8">
            Thank you for your order. You&apos;ll receive a confirmation email shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/account/orders" className="glass-btn glass-btn-primary inline-flex items-center gap-2">
              View Order
            </Link>
            <Link href="/shop" className="glass-btn inline-flex items-center gap-2">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-cream min-h-screen" style={{ paddingTop: '72px' }}>
      <div className="container py-10">
        <div className="mb-2">
          <Link
            href="/cart"
            className="flex items-center gap-2 text-brand-charcoal/50 hover:text-brand-gold transition-colors duration-200 text-sm mb-6"
          >
            <ChevronLeft size={14} />
            Back to Cart
          </Link>
          <h1
            className="text-brand-charcoal mb-8"
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 600 }}
          >
            Checkout
          </h1>
        </div>

        <StepIndicator steps={STEPS} current={step} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="card rounded-2xl p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  {stepContent[step]}
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: '1px solid rgba(212,165,116,0.12)' }}>
                {step > 0 ? (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="glass-btn flex items-center gap-2"
                    style={{ fontSize: '13px' }}
                  >
                    <ChevronLeft size={14} />
                    Back
                  </button>
                ) : <div />}

                {step < STEPS.length - 1 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="glass-btn glass-btn-primary flex items-center gap-2"
                    style={{ fontSize: '13px' }}
                  >
                    Continue
                    <ChevronRight size={14} />
                  </button>
                ) : (
                  <button
                    onClick={() => { clearCart(); setOrderPlaced(true); }}
                    className="glass-btn glass-btn-primary flex items-center gap-2"
                    style={{ fontSize: '13px', padding: '12px 24px' }}
                  >
                    <Check size={14} />
                    Place Order — {formatPrice(total)}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-2">
            <div className="card rounded-2xl p-6 sticky top-24">
              <h3
                className="text-brand-charcoal font-semibold mb-4"
                style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px' }}
              >
                Order Summary
              </h3>

              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative w-10 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill sizes="40px" className="object-cover" />
                      <div
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ background: '#D4A574', fontSize: '9px' }}
                      >
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-brand-charcoal text-xs font-medium truncate">{item.name}</p>
                      <p className="text-brand-charcoal/50 text-xs">{item.size} · {item.color}</p>
                    </div>
                    <span className="text-xs font-semibold" style={{ color: '#D4A574' }}>
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4" style={{ borderTop: '1px solid rgba(212,165,116,0.12)' }}>
                <div className="flex justify-between text-xs text-brand-charcoal/60">
                  <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-xs text-brand-charcoal/60">
                  <span>Shipping</span>
                  <span style={{ color: shipping === 0 ? '#388E3C' : undefined }}>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-xs text-brand-charcoal/60">
                  <span>Tax</span><span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between items-center pt-3 mt-2" style={{ borderTop: '1px solid rgba(212,165,116,0.12)' }}>
                  <span className="font-bold text-brand-charcoal text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>Total</span>
                  <span className="font-bold" style={{ color: '#D4A574', fontSize: '16px', fontFamily: 'Playfair Display, serif' }}>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
