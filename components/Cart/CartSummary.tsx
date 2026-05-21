import Link from 'next/link';
import { ArrowRight, Tag } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
  onCheckout?: () => void;
  showButton?: boolean;
}

export default function CartSummary({
  subtotal,
  shipping,
  tax,
  total,
  itemCount,
  showButton = true,
}: CartSummaryProps) {
  return (
    <div
      className="rounded-2xl p-6 sticky top-24"
      style={{
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(212,165,116,0.2)',
        backdropFilter: 'blur(15px)',
      }}
    >
      <h2
        className="font-semibold mb-5 text-brand-charcoal"
        style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px' }}
      >
        Order Summary
      </h2>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-brand-charcoal/60">Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-brand-charcoal/60">Shipping</span>
          <span className="font-medium" style={{ color: shipping === 0 ? '#388E3C' : undefined }}>
            {shipping === 0 ? 'FREE' : formatPrice(shipping)}
          </span>
        </div>

        {shipping === 0 && (
          <p className="text-xs" style={{ color: '#388E3C' }}>You qualify for free shipping!</p>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-brand-charcoal/60">Estimated Tax</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </div>
      </div>

      <div
        className="flex justify-between items-center pt-4 mb-5"
        style={{ borderTop: '1px solid rgba(212,165,116,0.15)' }}
      >
        <span className="font-bold text-brand-charcoal" style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px' }}>
          Total
        </span>
        <span className="font-bold text-xl" style={{ color: '#D4A574', fontFamily: 'Playfair Display, serif' }}>
          {formatPrice(total)}
        </span>
      </div>

      {/* Promo code */}
      <div className="flex gap-2 mb-5">
        <input
          type="text"
          placeholder="Promo code"
          className="glass-input flex-1"
          style={{ fontSize: '13px', padding: '10px 14px' }}
        />
        <button
          className="glass-btn flex items-center gap-1"
          style={{ fontSize: '12px', padding: '10px 14px', whiteSpace: 'nowrap' }}
        >
          <Tag size={13} />
          Apply
        </button>
      </div>

      {showButton && (
        <Link
          href="/checkout"
          className="glass-btn glass-btn-primary w-full flex items-center justify-center gap-2"
          style={{ fontSize: '12px', letterSpacing: '1.5px', padding: '14px' }}
        >
          Proceed to Checkout
          <ArrowRight size={14} />
        </Link>
      )}

      <Link
        href="/shop"
        className="block text-center mt-3 text-sm text-brand-charcoal/50 hover:text-brand-gold transition-colors duration-200"
        style={{ fontSize: '12px' }}
      >
        Continue Shopping
      </Link>
    </div>
  );
}
