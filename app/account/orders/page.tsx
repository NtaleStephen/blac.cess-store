'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import { mockOrders } from '@/lib/mock-data';
import { formatPrice, formatDate } from '@/lib/utils';
import { OrderStatus } from '@/types';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const STATUS_STYLES: Record<OrderStatus, { label: string; bg: string; color: string; border: string }> = {
  pending:    { label: 'Pending',    bg: 'rgba(255,193,7,0.12)',   color: '#F57C00', border: 'rgba(255,193,7,0.3)' },
  processing: { label: 'Processing', bg: 'rgba(33,150,243,0.12)',  color: '#1976D2', border: 'rgba(33,150,243,0.3)' },
  shipped:    { label: 'Shipped',    bg: 'rgba(76,175,80,0.12)',   color: '#388E3C', border: 'rgba(76,175,80,0.3)' },
  delivered:  { label: 'Delivered',  bg: 'rgba(46,125,50,0.12)',   color: '#2E7D32', border: 'rgba(46,125,50,0.3)' },
  cancelled:  { label: 'Cancelled',  bg: 'rgba(244,67,54,0.12)',   color: '#C62828', border: 'rgba(244,67,54,0.3)' },
};

const FILTERS = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

function StatusBadge({ status }: { status: OrderStatus }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className="inline-block px-3 py-1 rounded-full font-semibold"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}`, fontSize: '11px', letterSpacing: '0.5px' }}
    >
      {s.label}
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
      <div className="mb-8">
        <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-1" style={{ letterSpacing: '3px' }}>
          My Account
        </p>
        <h1 className="text-brand-charcoal" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 600 }}>
          Orders
        </h1>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
            style={{
              background: activeFilter === f ? 'rgba(212,165,116,0.2)' : 'rgba(255,255,255,0.06)',
              border: `1px solid ${activeFilter === f ? 'rgba(212,165,116,0.5)' : 'rgba(212,165,116,0.15)'}`,
              color: activeFilter === f ? '#D4A574' : 'rgba(42,42,42,0.6)',
              fontSize: '12px',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(212,165,116,0.1)', border: '1px solid rgba(212,165,116,0.2)' }}>
            <Package size={28} className="text-brand-gold" strokeWidth={1.5} />
          </div>
          {activeFilter === 'All' ? (
            <>
              <h3 className="text-brand-charcoal mb-2" style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px' }}>No orders yet</h3>
              <p className="text-brand-charcoal/50 text-sm mb-6">When you place orders, they&apos;ll appear here.</p>
              <Link href="/shop" className="glass-btn glass-btn-primary inline-flex items-center gap-2">
                Start Shopping
              </Link>
            </>
          ) : (
            <>
              <h3 className="text-brand-charcoal mb-2" style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px' }}>No {activeFilter.toLowerCase()} orders</h3>
              <p className="text-brand-charcoal/50 text-sm mb-6">Try a different filter to see your orders.</p>
              <button
                onClick={() => setActiveFilter('All')}
                className="glass-btn glass-btn-primary inline-flex items-center gap-2"
              >
                View All Orders
              </button>
            </>
          )}
        </div>
      ) : (
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-4">
          {filtered.map((order) => (
            <motion.div
              key={order.id}
              variants={fadeInUp}
              className="card rounded-2xl p-5"
            >
              {/* Order header */}
              <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
                <div>
                  <p className="font-semibold text-brand-charcoal" style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px' }}>
                    {order.orderNumber}
                  </p>
                  <p className="text-brand-charcoal/50 text-xs mt-0.5">{formatDate(order.createdAt)}</p>
                </div>
                <StatusBadge status={order.status} />
              </div>

              {/* Items preview */}
              <div className="text-sm text-brand-charcoal/60 mb-4">
                {order.items.map((item, i) => (
                  <span key={item.id}>
                    {item.name} &times;{item.quantity}
                    {i < order.items.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between flex-wrap gap-3 pt-3" style={{ borderTop: '1px solid rgba(212,165,116,0.1)' }}>
                <div>
                  <span className="text-brand-charcoal/50 text-xs">Total: </span>
                  <span className="font-bold" style={{ color: '#D4A574', fontSize: '15px' }}>
                    {formatPrice(order.total)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {order.trackingNumber && (
                    <span className="text-xs text-brand-charcoal/45">
                      Tracking: {order.trackingNumber}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-brand-charcoal/40 text-xs font-semibold">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
