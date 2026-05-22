import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
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
    <aside className="card-static p-8 sticky top-[96px]">
      <h2 className="heading-md mb-6">Order Summary</h2>

      <div className="space-y-3 mb-6">
        <Row
          label={`Subtotal (${itemCount} ${itemCount === 1 ? 'item' : 'items'})`}
          value={formatPrice(subtotal)}
        />
        <Row
          label="Shipping"
          value={shipping === 0 ? 'Complimentary' : formatPrice(shipping)}
        />
        {shipping === 0 && (
          <p className="text-[12px] text-[var(--color-success)] -mt-1">
            You qualify for complimentary shipping.
          </p>
        )}
        <Row label="Estimated Tax" value={formatPrice(tax)} />
      </div>

      {/* Total */}
      <div className="flex justify-between items-baseline py-5 mb-6 border-y border-[var(--color-divider)]">
        <span className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--color-ink)]">
          Total
        </span>
        <span className="font-serif font-bold text-[24px] text-[var(--color-ink)]">
          {formatPrice(total)}
        </span>
      </div>

      {/* Promo */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Promo code"
          className="input flex-1"
        />
        <button className="btn btn-outline btn-sm h-[50px]">Apply</button>
      </div>

      {showButton && (
        <Link href="/checkout" className="btn btn-block">
          Proceed to Checkout
          <ArrowRight size={14} />
        </Link>
      )}

      <Link href="/shop" className="cart-text-link block text-center mt-4">
        Continue Shopping
      </Link>
    </aside>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-[14px]">
      <span className="text-[var(--color-ink-muted)]">{label}</span>
      <span className="font-medium text-[var(--color-ink)]">{value}</span>
    </div>
  );
}
