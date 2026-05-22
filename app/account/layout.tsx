'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Package, Heart, Settings, LogOut, Menu, X } from 'lucide-react';
import { mockUser } from '@/lib/mock-data';

const NAV_ITEMS = [
  { label: 'Profile',   href: '/account',          icon: User },
  { label: 'Orders',    href: '/account/orders',   icon: Package },
  { label: 'Wishlist',  href: '/account/wishlist', icon: Heart },
  { label: 'Settings',  href: '/account/settings', icon: Settings },
];

function AccountSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="h-full flex flex-col p-6">
      {/* User info */}
      <div className="flex items-center gap-3 mb-7 pb-6 border-b border-[var(--color-divider)]">
        <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-[17px] bg-[var(--color-accent)]">
          {mockUser.name[0]}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-serif font-semibold text-[14px] truncate text-[var(--color-ink)]">
            {mockUser.name}
          </p>
          <p className="text-[11px] truncate text-[var(--color-ink-muted)]">{mockUser.email}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="icon-btn ml-auto flex-shrink-0 lg:hidden" aria-label="Close menu">
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
              className="flex items-center gap-3 px-3 py-3 text-[13px] uppercase tracking-[1.5px] font-semibold transition-colors"
              style={{
                background: active ? 'var(--color-ink)' : 'transparent',
                color: active ? '#FFFFFF' : 'var(--color-ink-soft)',
              }}
            >
              <Icon size={15} style={{ color: active ? 'var(--color-accent)' : 'var(--color-ink-muted)' }} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="pt-5 mt-5 border-t border-[var(--color-divider)]">
        <Link
          href="/login"
          className="flex items-center gap-3 px-3 py-3 text-[13px] uppercase tracking-[1.5px] font-semibold text-[var(--color-danger)] hover:bg-[var(--color-paper-soft)] transition-colors"
        >
          <LogOut size={15} />
          Sign Out
        </Link>
      </div>
    </div>
  );
}

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen pt-[72px]">
      <div className="page-header">
        <div className="container">
          <span className="eyebrow">My Account</span>
          <h1 className="heading-xl">Account</h1>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 items-start">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block sticky top-24 card-static">
            <AccountSidebar />
          </aside>

          {/* Mobile FAB */}
          <button
            className="fixed bottom-6 right-6 z-40 lg:hidden inline-flex items-center gap-2 px-5 h-12 bg-[var(--color-ink)] text-white text-[11px] uppercase tracking-[1.5px] font-semibold"
            style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.18)' }}
            onClick={() => setMobileOpen(true)}
            aria-label="Open account menu"
          >
            <Menu size={16} />
            Menu
          </button>

          {/* Mobile overlay */}
          {mobileOpen && (
            <div
              className="fixed inset-0 bg-black/55 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
          )}

          {/* Mobile drawer */}
          <div
            className={`fixed top-0 left-0 h-full w-80 z-50 lg:hidden bg-[var(--color-surface)] border-r border-[var(--color-divider)] transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
            style={{ paddingTop: 72 }}
          >
            <AccountSidebar onClose={() => setMobileOpen(false)} />
          </div>

          {/* Main content */}
          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
