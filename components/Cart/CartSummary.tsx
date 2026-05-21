import Link from 'next/link';
import { ArrowRight, Tag } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
  showButton?: boolean;
}

export default function CartSummary({ subtotal, shipping, tax, total, itemCount, showButton = true }: CartSummaryProps) {
  return (
    <div
      className="rounded-xl p-7 sticky top-24"
      style={{ background: '#FFFFFF', boxShadow: '0 1px 4px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.05)' }}
    >
      <h2 className="font-serif font-semibold mb-6" style={{ fontSize: 18, color: '#2A2A2A' }}>
        Order Summary
      </h2>

      <div className="space-y-3 mb-5">
        <Row label={`Subtotal (${itemCount} ${itemCount === 1 ? 'item' : 'items'})`} value={formatPrice(subtotal)} />
        <Row
          label="Shipping"
          value={shipping === 0 ? 'FREE' : formatPrice(shipping)}
          accent={shipping === 0}
        />
        {shipping === 0 && (
          <p className="text-xs" style={{ color: '#2E7D32', marginTop: -4 }}>
            You qualify for free shipping!
          </p>
        )}
        <Row label="Estimated Tax" value={formatPrice(tax)} />
      </div>

      {/* Total */}
      <div
        className="flex justify-between items-center py-4 mb-5"
        style={{ borderTop: '1px solid rgba(42,42,42,0.08)', borderBottom: '1px solid rgba(42,42,42,0.08)' }}
      >
        <span className="font-semibold" style={{ fontSize: 15, color: '#2A2A2A' }}>Total</span>
        <span className="font-serif font-bold" style={{ fontSize: 22, color: '#2A2A2A' }}>
          {formatPrice(total)}
        </span>
      </div>

      {/* Promo */}
      <div className="flex gap-2 mb-5">
        <input
          type="text"
          placeholder="Promo code"
          className="glass-input flex-1"
          style={{ height: 44 }}
        />
        <button
          className="btn btn-sm btn-outline"
          style={{ gap: 6 }}
        >
          <Tag size={12} />
          Apply
        </button>
      </div>

      {showButton && (
        <Link href="/checkout" className="btn btn-gold w-full" style={{ width: '100%' }}>
          Proceed to Checkout
          <ArrowRight size={14} />
        </Link>
      )}

      <Link href="/shop" className="cart-text-link block text-center mt-3">
        Continue Shopping
      </Link>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span style={{ color: 'rgba(42,42,42,0.55)' }}>{label}</span>
      <span className="font-medium" style={{ color: accent ? '#2E7D32' : '#2A2A2A' }}>{value}</span>
    </div>
  );
}
