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
  pending:    { label: 'Pending',    bg: 'rgba(255,193,7,0.1)',  color: '#B8680A', border: 'rgba(255,193,7,0.3)' },
  processing: { label: 'Processing', bg: 'rgba(33,150,243,0.1)', color: '#1565C0', border: 'rgba(33,150,243,0.3)' },
  shipped:    { label: 'Shipped',    bg: 'rgba(76,175,80,0.1)',  color: '#2E7D32', border: 'rgba(76,175,80,0.3)' },
  delivered:  { label: 'Delivered',  bg: 'rgba(46,125,50,0.1)',  color: '#1B5E20', border: 'rgba(46,125,50,0.3)' },
  cancelled:  { label: 'Cancelled',  bg: 'rgba(244,67,54,0.1)',  color: '#C62828', border: 'rgba(244,67,54,0.3)' },
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
        <span className="section-eyebrow">My Account</span>
        <h1 className="font-serif" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 600, color: '#2A2A2A' }}>
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
              background: activeFilter === f ? '#2A2A2A' : '#FFFFFF',
              border: `1.5px solid ${activeFilter === f ? '#2A2A2A' : 'rgba(42,42,42,0.12)'}`,
              color: activeFilter === f ? '#FFFFFF' : 'rgba(42,42,42,0.6)',
              fontSize: '12px',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(212,165,116,0.1)', border: '1px solid rgba(212,165,116,0.2)' }}
          >
            <Package size={28} style={{ color: '#D4A574' }} strokeWidth={1.5} />
          </div>
          {activeFilter === 'All' ? (
            <>
              <h3 className="font-serif mb-2" style={{ fontSize: '20px', color: '#2A2A2A' }}>No orders yet</h3>
              <p className="text-sm mb-6" style={{ color: 'rgba(42,42,42,0.5)' }}>When you place orders, they&apos;ll appear here.</p>
              <Link href="/shop" className="btn btn-gold inline-flex items-center gap-2">
                Start Shopping
              </Link>
            </>
          ) : (
            <>
              <h3 className="font-serif mb-2" style={{ fontSize: '20px', color: '#2A2A2A' }}>No {activeFilter.toLowerCase()} orders</h3>
              <p className="text-sm mb-6" style={{ color: 'rgba(42,42,42,0.5)' }}>Try a different filter to see your orders.</p>
              <button onClick={() => setActiveFilter('All')} className="btn btn-gold">
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
              className="rounded-xl p-5"
              style={{ background: '#FFFFFF', boxShadow: '0 1px 4px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)' }}
            >
              {/* Order header */}
              <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
                <div>
                  <p className="font-serif font-semibold" style={{ fontSize: '16px', color: '#2A2A2A' }}>
                    {order.orderNumber}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(42,42,42,0.5)' }}>{formatDate(order.createdAt)}</p>
                </div>
                <StatusBadge status={order.status} />
              </div>

              {/* Items preview */}
              <div className="text-sm mb-4" style={{ color: 'rgba(42,42,42,0.6)' }}>
                {order.items.map((item, i) => (
                  <span key={item.id}>
                    {item.name} &times;{item.quantity}
                    {i < order.items.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between flex-wrap gap-3 pt-3" style={{ borderTop: '1px solid rgba(42,42,42,0.07)' }}>
                <div>
                  <span className="text-xs" style={{ color: 'rgba(42,42,42,0.5)' }}>Total: </span>
                  <span className="font-bold" style={{ color: '#2A2A2A', fontSize: '15px' }}>
                    {formatPrice(order.total)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {order.trackingNumber && (
                    <span className="text-xs" style={{ color: 'rgba(42,42,42,0.45)' }}>
                      Tracking: {order.trackingNumber}
                    </span>
                  )}
                  <span className="text-xs font-semibold" style={{ color: 'rgba(42,42,42,0.4)' }}>
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
