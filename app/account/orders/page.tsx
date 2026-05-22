'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import { mockOrders } from '@/lib/mock-data';
import { formatPrice, formatDate } from '@/lib/utils';
import { OrderStatus } from '@/types';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending:    'Pending',
  processing: 'Processing',
  shipped:    'Shipped',
  delivered:  'Delivered',
  cancelled:  'Cancelled',
};

const STATUS_COLORS: Record<OrderStatus, { fg: string; bg: string }> = {
  pending:    { fg: '#B8680A', bg: 'rgba(255,193,7,0.12)' },
  processing: { fg: '#1565C0', bg: 'rgba(33,150,243,0.12)' },
  shipped:    { fg: '#2E7D32', bg: 'rgba(76,175,80,0.12)' },
  delivered:  { fg: '#1B5E20', bg: 'rgba(46,125,50,0.12)' },
  cancelled:  { fg: '#C62828', bg: 'rgba(244,67,54,0.12)' },
};

const FILTERS = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

function StatusBadge({ status }: { status: OrderStatus }) {
  const c = STATUS_COLORS[status];
  return (
    <span
      className="inline-block px-3 py-1 text-[10px] uppercase tracking-[1.5px] font-semibold"
      style={{ background: c.bg, color: c.fg }}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

export default function OrdersPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? mockOrders
    : mockOrders.filter((o) => o.status === activeFilter.toLowerCase());

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
      <header className="mb-8">
        <h2 className="heading-lg">Orders</h2>
        <p className="body-sm mt-2">View your order history and track shipments.</p>
      </header>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap mb-8 border-b border-[var(--color-divider)] pb-4">
        {FILTERS.map((f) => {
          const active = activeFilter === f;
          return (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="px-4 h-9 text-[11px] uppercase tracking-[1.5px] font-semibold transition-all"
              style={{
                background: active ? 'var(--color-ink)' : 'transparent',
                border: `1px solid ${active ? 'var(--color-ink)' : 'var(--color-divider-strong)'}`,
                color: active ? '#FFFFFF' : 'var(--color-ink-soft)',
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 border border-[var(--color-divider-strong)]">
            <Package size={26} className="text-[var(--color-accent)]" strokeWidth={1.4} />
          </div>
          {activeFilter === 'All' ? (
            <>
              <h3 className="heading-md mb-2">No orders yet</h3>
              <p className="body-sm mb-8">When you place orders, they&apos;ll appear here.</p>
              <Link href="/shop" className="btn btn-gold">Start Shopping</Link>
            </>
          ) : (
            <>
              <h3 className="heading-md mb-2">No {activeFilter.toLowerCase()} orders</h3>
              <p className="body-sm mb-8">Try a different filter to see your orders.</p>
              <button onClick={() => setActiveFilter('All')} className="btn">View All Orders</button>
            </>
          )}
        </div>
      ) : (
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-4">
          {filtered.map((order) => (
            <motion.article key={order.id} variants={fadeInUp} className="card-static p-6">
              <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
                <div>
                  <p className="font-serif font-semibold text-[17px] text-[var(--color-ink)]">
                    {order.orderNumber}
                  </p>
                  <p className="text-[11px] uppercase tracking-[1.5px] mt-1 text-[var(--color-ink-muted)]">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <StatusBadge status={order.status} />
              </div>

              <p className="text-[13px] mb-5 text-[var(--color-ink-soft)]">
                {order.items.map((item, i) => (
                  <span key={item.id}>
                    {item.name} ×{item.quantity}
                    {i < order.items.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>

              <div className="flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-[var(--color-divider)]">
                <div>
                  <span className="text-[11px] uppercase tracking-[1.5px] text-[var(--color-ink-muted)]">Total </span>
                  <span className="font-serif font-bold text-[18px] text-[var(--color-ink)]">
                    {formatPrice(order.total)}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  {order.trackingNumber && (
                    <span className="text-[11px] text-[var(--color-ink-muted)]">
                      Tracking: <span className="text-[var(--color-ink)]">{order.trackingNumber}</span>
                    </span>
                  )}
                  <span className="text-[11px] uppercase tracking-[1.5px] text-[var(--color-ink-muted)]">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
