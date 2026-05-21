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
    <div className="card rounded-2xl p-7 sticky top-24">
      <h2 className="font-serif font-semibold mb-6" style={{ fontSize: 18, color: '#2A2A2A' }}>
        Order Summary
      </h2>

      <div className="flex flex-col gap-3.5 mb-5">
        <SummaryRow label={`Subtotal (${itemCount} ${itemCount === 1 ? 'item' : 'items'})`} value={formatPrice(subtotal)} />
        <SummaryRow
          label="Shipping"
          value={shipping === 0 ? 'FREE' : formatPrice(shipping)}
          valueColor={shipping === 0 ? '#2E7D32' : undefined}
        />
        {shipping === 0 && (
          <p style={{ fontSize: 12, color: '#2E7D32', marginTop: -8 }}>You qualify for free shipping!</p>
        )}
        <SummaryRow label="Estimated Tax" value={formatPrice(tax)} />
      </div>

      {/* Total */}
      <div
        className="flex justify-between items-center pt-4 mb-6"
        style={{ borderTop: '1px solid rgba(212,165,116,0.15)' }}
      >
        <span className="font-serif font-bold" style={{ fontSize: 16, color: '#2A2A2A' }}>Total</span>
        <span className="font-serif font-bold" style={{ fontSize: 20, color: '#D4A574' }}>
          {formatPrice(total)}
        </span>
      </div>

      {/* Promo code */}
      <div className="flex gap-2 mb-5">
        <input
          type="text"
          placeholder="Promo code"
          className="glass-input flex-1"
          style={{ fontSize: 13, padding: '10px 14px' }}
        />
        <button className="glass-btn" style={{ fontSize: 12, padding: '10px 14px', gap: 6 }}>
          <Tag size={13} />
          Apply
        </button>
      </div>

      {showButton && (
        <Link
          href="/checkout"
          className="glass-btn glass-btn-primary w-full"
          style={{ padding: '14px', letterSpacing: '1.5px' }}
        >
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

function SummaryRow({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span style={{ color: 'rgba(42,42,42,0.58)' }}>{label}</span>
      <span className="font-medium" style={{ color: valueColor ?? '#2A2A2A' }}>{value}</span>
    </div>
  );
}
