'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Package, Heart, Settings, LogOut, Menu, X } from 'lucide-react';
import { mockUser } from '@/lib/mock-data';

const NAV_ITEMS = [
  { label: 'Profile', href: '/account', icon: User },
  { label: 'My Orders', href: '/account/orders', icon: Package },
  { label: 'Wishlist', href: '/account/wishlist', icon: Heart },
  { label: 'Settings', href: '/account/settings', icon: Settings },
];

function AccountSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="h-full flex flex-col p-5">
      {/* User info */}
      <div className="flex items-center gap-3 mb-6 pb-5" style={{ borderBottom: '1px solid rgba(212,165,116,0.12)' }}>
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-lg"
          style={{ background: 'linear-gradient(135deg, #D4A574, #E8B88A)' }}
        >
          {mockUser.name[0]}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-brand-charcoal truncate" style={{ fontFamily: 'Playfair Display, serif', fontSize: '15px' }}>
            {mockUser.name}
          </p>
          <p className="text-brand-charcoal/50 text-xs truncate">{mockUser.email}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="glass-btn-icon ml-auto flex-shrink-0 lg:hidden">
            <X size={16} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200"
              style={{
                background: active ? 'rgba(212,165,116,0.15)' : 'transparent',
                color: active ? '#D4A574' : 'rgba(42,42,42,0.7)',
                fontWeight: active ? 600 : 400,
                fontSize: '14px',
              }}
            >
              <Icon size={16} style={{ color: active ? '#D4A574' : 'rgba(42,42,42,0.45)' }} />
              {label}
              {active && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: '#D4A574' }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="pt-4 mt-4" style={{ borderTop: '1px solid rgba(212,165,116,0.12)' }}>
        <Link
          href="/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 hover:bg-red-50 group"
          style={{ color: 'rgba(42,42,42,0.5)' }}
        >
          <LogOut size={16} className="group-hover:text-red-400 transition-colors" />
          <span className="group-hover:text-red-500 transition-colors">Sign Out</span>
        </Link>
      </div>
    </div>
  );
}

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="bg-brand-cream min-h-screen" style={{ paddingTop: '72px' }}>
      <div className="container py-8">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <div
            className="hidden lg:block w-64 flex-shrink-0 rounded-2xl self-start sticky top-24"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(212,165,116,0.15)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <AccountSidebar />
          </div>

          {/* Mobile sidebar toggle */}
          <button
            className="glass-btn flex items-center gap-2 fixed bottom-6 right-6 z-40 lg:hidden shadow-lg"
            style={{ fontSize: '13px', padding: '12px 18px' }}
            onClick={() => setMobileOpen(true)}
            aria-label="Open account menu"
          >
            <Menu size={16} />
            Menu
          </button>

          {/* Mobile overlay */}
          {mobileOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
          )}

          {/* Mobile drawer */}
          <div
            className={`fixed top-0 left-0 h-full w-72 z-50 lg:hidden transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
            style={{
              background: 'rgba(245,241,235,0.97)',
              backdropFilter: 'blur(20px)',
              borderRight: '1px solid rgba(212,165,116,0.2)',
              paddingTop: '72px',
            }}
          >
            <AccountSidebar onClose={() => setMobileOpen(false)} />
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
