'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, CreditCard, Smartphone, Building2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { fadeInUp } from '@/lib/animations';
import { useCart } from '@/context/CartContext';
import type { CartItem } from '@/types';

const STEPS = ['Shipping', 'Billing', 'Payment', 'Review'];

const PAYMENT_METHODS = [
  { id: 'card',  label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, Amex' },
  { id: 'apple', label: 'Apple Pay',           icon: Smartphone, desc: 'Touch ID or Face ID' },
  { id: 'bank',  label: 'Bank Transfer',       icon: Building2,  desc: 'Direct bank transfer' },
];

const COUNTRIES = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Other'];

function StepIndicator({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center justify-center mb-14">
      {steps.map((step, i) => {
        const done = i < current;
        const isCurrent = i === current;
        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-semibold transition-all"
                style={{
                  background: done ? 'var(--color-ink)' : isCurrent ? 'var(--color-surface)' : 'transparent',
                  border: `1.5px solid ${done ? 'var(--color-ink)' : isCurrent ? 'var(--color-ink)' : 'var(--color-divider-strong)'}`,
                  color: done ? '#FFFFFF' : isCurrent ? 'var(--color-ink)' : 'var(--color-ink-faint)',
                }}
              >
                {done ? <Check size={14} /> : i + 1}
              </div>
              <span
                className="text-[10px] uppercase tracking-[1.5px] mt-2.5 font-semibold"
                style={{
                  color: isCurrent
                    ? 'var(--color-ink)'
                    : done ? 'var(--color-ink-soft)' : 'var(--color-ink-faint)',
                }}
              >
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className="w-12 sm:w-20 h-px mx-3 transition-colors mb-7"
                style={{ background: i < current ? 'var(--color-ink)' : 'var(--color-divider)' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function FormInput({
  label,
  placeholder,
  type = 'text',
  required = false,
}: { label: string; placeholder: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="input-label">
        {label}
        {required && <span className="text-[var(--color-accent)] ml-1">*</span>}
      </label>
      <input type={type} placeholder={placeholder} className="input" required={required} />
    </div>
  );
}

function FormSelect({
  label,
  options,
  required = false,
}: { label: string; options: string[]; required?: boolean }) {
  return (
    <div>
      <label className="input-label">
        {label}
        {required && <span className="text-[var(--color-accent)] ml-1">*</span>}
      </label>
      <select className="input cursor-pointer" required={required}>
        <option value="">Select {label}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function AddressForm({ title, showSameAs = false }: { title: string; showSameAs?: boolean }) {
  return (
    <div>
      <h3 className="heading-md mb-6">{title}</h3>
      {showSameAs && (
        <label className="flex items-center gap-3 mb-6 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 accent-[var(--color-ink)]" />
          <span className="text-[13px] text-[var(--color-ink-soft)]">Same as shipping address</span>
        </label>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2"><FormInput label="Full Name" placeholder="Amara Nwosu" required /></div>
        <FormInput label="Email" placeholder="amara@example.com" type="email" required />
        <FormInput label="Phone" placeholder="+1 555 0100" type="tel" />
        <div className="sm:col-span-2"><FormInput label="Street Address" placeholder="123 Crown Street, Apt 4B" required /></div>
        <FormInput label="City" placeholder="New York" required />
        <FormInput label="State / Province" placeholder="NY" required />
        <FormInput label="Postal Code" placeholder="10001" required />
        <FormSelect label="Country" options={COUNTRIES} required />
      </div>
    </div>
  );
}

function PaymentStep() {
  const [selected, setSelected] = useState('card');

  return (
    <div>
      <h3 className="heading-md mb-6">Payment Method</h3>
      <div className="space-y-3 mb-8">
        {PAYMENT_METHODS.map((method) => {
          const active = selected === method.id;
          return (
            <button
              key={method.id}
              onClick={() => setSelected(method.id)}
              className="w-full flex items-center gap-4 p-5 transition-all text-left"
              style={{
                background: active ? 'var(--color-accent-soft)' : 'var(--color-surface)',
                border: `1px solid ${active ? 'var(--color-accent)' : 'var(--color-divider-strong)'}`,
              }}
            >
              <div className="w-10 h-10 inline-flex items-center justify-center flex-shrink-0 border border-[var(--color-divider-strong)]">
                <method.icon size={16} className="text-[var(--color-accent)]" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[14px] text-[var(--color-ink)]">{method.label}</p>
                <p className="text-[12px] text-[var(--color-ink-muted)]">{method.desc}</p>
              </div>
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ border: `1.5px solid ${active ? 'var(--color-accent)' : 'var(--color-divider-strong)'}` }}
              >
                {active && <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)]" />}
              </div>
            </button>
          );
        })}
      </div>

      {selected === 'card' && (
        <div className="space-y-4">
          <FormInput label="Card Number" placeholder="1234 5678 9012 3456" />
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Expiry Date" placeholder="MM / YY" />
            <FormInput label="CVV" placeholder="123" />
          </div>
          <FormInput label="Cardholder Name" placeholder="Amara Nwosu" />
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
      <h3 className="heading-md mb-6">Review Your Order</h3>

      <div className="divide-y divide-[var(--color-divider)] border-y border-[var(--color-divider)] mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-4">
            <div className="relative w-14 h-16 overflow-hidden flex-shrink-0 bg-[var(--color-paper-soft)]">
              <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[14px] truncate text-[var(--color-ink)]">{item.name}</p>
              <p className="text-[12px] text-[var(--color-ink-muted)]">
                {item.color} · Size {item.size} · Qty {item.quantity}
              </p>
            </div>
            <span className="font-serif font-semibold text-[15px] text-[var(--color-ink)]">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <dl className="space-y-2">
        {[
          ['Subtotal', formatPrice(subtotal)],
          ['Shipping', shipping === 0 ? 'Complimentary' : formatPrice(shipping)],
          ['Tax', formatPrice(tax)],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between text-[13px]">
            <dt className="text-[var(--color-ink-muted)]">{label}</dt>
            <dd className="text-[var(--color-ink)] font-medium">{value}</dd>
          </div>
        ))}
        <div className="flex justify-between items-baseline pt-4 mt-4 border-t border-[var(--color-divider)]">
          <dt className="text-[11px] uppercase tracking-[2px] font-semibold text-[var(--color-ink)]">Total</dt>
          <dd className="font-serif font-bold text-[22px] text-[var(--color-ink)]">{formatPrice(total)}</dd>
        </div>
      </dl>

      <div className="mt-8 pt-6 border-t border-[var(--color-divider)]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] uppercase tracking-[1.5px] text-[var(--color-ink-muted)]">Shipping to</span>
          <button onClick={() => onEdit(0)} className="text-[11px] uppercase tracking-[1px] hover:underline text-[var(--color-accent)]">
            Edit
          </button>
        </div>
        <p className="text-[14px] text-[var(--color-ink)]">123 Crown Street, New York, NY 10001</p>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const [step, setStep]               = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { items, subtotal, shipping, tax, total, clearCart } = useCart();

  const stepContent = [
    <AddressForm key="shipping" title="Shipping Address" />,
    <AddressForm key="billing"  title="Billing Address" showSameAs />,
    <PaymentStep key="payment" />,
    <ReviewStep
      key="review"
      onEdit={(s) => setStep(s)}
      items={items}
      subtotal={subtotal}
      shipping={shipping}
      tax={tax}
      total={total}
    />,
  ];

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[72px]">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center px-6 max-w-md">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 border border-[var(--color-success)]/40">
            <Check size={36} className="text-[var(--color-success)]" />
          </div>
          <h1 className="heading-lg mb-3">Order Placed</h1>
          <p className="caption mb-2">Order #BC-2026-1003</p>
          <p className="body-sm mb-10">
            Thank you for your order. You&apos;ll receive a confirmation email shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/account/orders" className="btn">View Order</Link>
            <Link href="/shop" className="btn btn-outline">Continue Shopping</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[72px]">
      <div className="page-header">
        <div className="container">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[1.5px] mb-5 text-[var(--color-ink-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            <ChevronLeft size={14} />
            Back to Cart
          </Link>
          <h1 className="heading-xl">Checkout</h1>
        </div>
      </div>

      <div className="container py-12">
        <StepIndicator steps={STEPS} current={step} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-14 items-start">
          {/* Form */}
          <div>
            <div className="card-static p-8 md:p-10">
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

              <div className="flex items-center justify-between mt-10 pt-8 border-t border-[var(--color-divider)]">
                {step > 0 ? (
                  <button onClick={() => setStep(step - 1)} className="btn btn-outline">
                    <ChevronLeft size={14} />
                    Back
                  </button>
                ) : <div />}

                {step < STEPS.length - 1 ? (
                  <button onClick={() => setStep(step + 1)} className="btn">
                    Continue
                    <ChevronRight size={14} />
                  </button>
                ) : (
                  <button
                    onClick={() => { clearCart(); setOrderPlaced(true); }}
                    className="btn btn-gold"
                  >
                    <Check size={14} />
                    Place Order — {formatPrice(total)}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order summary */}
          <aside className="card-static p-7 sticky top-24">
            <h3 className="heading-md mb-5">Order Summary</h3>

            <div className="divide-y divide-[var(--color-divider)] border-y border-[var(--color-divider)] mb-5">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-3">
                  <div className="relative w-11 h-14 overflow-hidden flex-shrink-0 bg-[var(--color-paper-soft)]">
                    <Image src={item.image} alt={item.name} fill sizes="44px" className="object-cover" />
                    <span
                      className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full inline-flex items-center justify-center text-white font-bold bg-[var(--color-accent)]"
                      style={{ fontSize: 9 }}
                    >
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium truncate text-[var(--color-ink)]">{item.name}</p>
                    <p className="text-[11px] text-[var(--color-ink-muted)]">{item.size} · {item.color}</p>
                  </div>
                  <span className="text-[12px] font-semibold text-[var(--color-ink)]">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <dl className="space-y-2.5">
              <div className="flex justify-between text-[13px]">
                <dt className="text-[var(--color-ink-muted)]">Subtotal</dt>
                <dd className="text-[var(--color-ink)] font-medium">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-[13px]">
                <dt className="text-[var(--color-ink-muted)]">Shipping</dt>
                <dd className="font-medium" style={{ color: shipping === 0 ? 'var(--color-success)' : 'var(--color-ink)' }}>
                  {shipping === 0 ? 'Complimentary' : formatPrice(shipping)}
                </dd>
              </div>
              <div className="flex justify-between text-[13px]">
                <dt className="text-[var(--color-ink-muted)]">Tax</dt>
                <dd className="text-[var(--color-ink)] font-medium">{formatPrice(tax)}</dd>
              </div>
              <div className="flex justify-between items-baseline pt-4 mt-2 border-t border-[var(--color-divider)]">
                <dt className="text-[11px] uppercase tracking-[2px] font-semibold text-[var(--color-ink)]">Total</dt>
                <dd className="font-serif font-bold text-[20px] text-[var(--color-ink)]">{formatPrice(total)}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </div>
  );
}
