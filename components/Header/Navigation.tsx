'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingBag, Search, User, Menu, X, Crown, LogOut, Package, Heart, Settings } from 'lucide-react';
import { mockUser } from '@/lib/mock-data';
import { useCart } from '@/context/CartContext';

const NAV_LINKS = [
  { label: 'Crop Tops',  href: '/shop/crop-tops' },
  { label: 'Sweatpants', href: '/shop/sweatpants' },
  { label: 'Hoodies',    href: '/shop/hoodies' },
  { label: 'New',        href: '/shop/new-arrivals' },
];

const ACCOUNT_LINKS = [
  { label: 'My Account', href: '/account',          icon: User },
  { label: 'My Orders',  href: '/account/orders',   icon: Package },
  { label: 'Wishlist',   href: '/account/wishlist',  icon: Heart },
  { label: 'Settings',   href: '/account/settings', icon: Settings },
];

export default function Navigation() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router   = useRouter();
  const { itemCount } = useCart();

  const isHomepage = pathname === '/';
  const useDark    = scrolled || !isHomepage;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const iconBg    = useDark ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.12)';
  const iconBdr   = useDark ? 'rgba(212,165,116,0.22)' : 'rgba(255,255,255,0.2)';
  const iconColor = useDark ? '#2A2A2A' : 'rgba(255,255,255,0.88)';

  return (
    <>
      {/* ── Header ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${useDark ? 'glass-nav shadow-sm' : 'bg-transparent'}`}
        style={{ height: 72 }}
      >
        <div className="container h-full flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <Crown
              size={21}
              style={{ color: '#D4A574', transition: 'transform 0.3s' }}
              className="group-hover:scale-110"
            />
            <span
              className="font-serif font-bold tracking-widest uppercase text-[18px] transition-colors duration-300"
              style={{ letterSpacing: '3px', color: useDark ? '#2A2A2A' : '#FFFFFF' }}
            >
              BLAC.CESS
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => {
              const active = pathname === href || pathname.startsWith(href + '/');
              return (
                <Link
                  key={label}
                  href={href}
                  className={`nav-link ${active ? 'active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                  style={{ color: active ? '#D4A574' : (useDark ? '#2A2A2A' : 'rgba(255,255,255,0.88)') }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              className="glass-btn-icon"
              style={{ background: iconBg, borderColor: iconBdr }}
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <Search size={18} style={{ color: iconColor }} />
            </button>

            {/* Account dropdown */}
            <div ref={accountRef} className="relative">
              <button
                className="glass-btn-icon"
                style={{ background: iconBg, borderColor: iconBdr }}
                onClick={() => setAccountOpen(!accountOpen)}
                aria-label="Account"
                aria-expanded={accountOpen}
                aria-haspopup="true"
              >
                <User size={18} style={{ color: iconColor }} />
              </button>

              {accountOpen && (
                <div
                  className="absolute right-0 top-full mt-2 rounded-xl overflow-hidden z-50"
                  style={{
                    width: 220,
                    background: 'rgba(245,241,235,0.98)',
                    border: '1px solid rgba(212,165,116,0.2)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  }}
                >
                  <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(212,165,116,0.12)' }}>
                    <p className="font-serif font-semibold text-sm" style={{ color: '#2A2A2A' }}>{mockUser.name}</p>
                    <p className="text-xs truncate mt-0.5" style={{ color: 'rgba(42,42,42,0.5)' }}>{mockUser.email}</p>
                  </div>
                  <div className="py-1">
                    {ACCOUNT_LINKS.map(({ label, href, icon: Icon }) => (
                      <Link
                        key={label}
                        href={href}
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150"
                        style={{ color: '#2A2A2A' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,165,116,0.1)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <Icon size={15} style={{ color: 'rgba(42,42,42,0.5)' }} />
                        {label}
                      </Link>
                    ))}
                  </div>
                  <div className="py-1" style={{ borderTop: '1px solid rgba(212,165,116,0.12)' }}>
                    <Link
                      href="/login"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150"
                      style={{ color: 'rgba(220,50,50,0.8)' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(220,50,50,0.05)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <LogOut size={15} />
                      Sign Out
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link
              href="/cart"
              className="glass-btn-icon relative"
              style={{ background: iconBg, borderColor: iconBdr }}
              aria-label={`Cart, ${itemCount} items`}
            >
              <ShoppingBag size={18} style={{ color: iconColor }} />
              {itemCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full flex items-center justify-center text-white font-bold"
                  style={{ background: '#D4A574', fontSize: 10 }}
                >
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <div className="lg:hidden">
              <button
                className="glass-btn-icon"
                style={{ background: iconBg, borderColor: iconBdr }}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
              >
                {mobileOpen
                  ? <X    size={18} style={{ color: iconColor }} />
                  : <Menu size={18} style={{ color: iconColor }} />
                }
              </button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div
            className="px-4 py-3"
            style={{ borderTop: '1px solid rgba(212,165,116,0.12)', background: 'rgba(245,241,235,0.97)' }}
          >
            <div className="container" style={{ maxWidth: 600 }}>
              <input
                type="search"
                placeholder="Search products…"
                className="glass-input"
                aria-label="Search products"
                autoFocus
                onKeyDown={(e) => {
                  const val = (e.currentTarget as HTMLInputElement).value.trim();
                  if (e.key === 'Enter' && val) {
                    router.push(`/shop?q=${encodeURIComponent(val)}`);
                    setSearchOpen(false);
                  }
                  if (e.key === 'Escape') setSearchOpen(false);
                }}
              />
            </div>
          </div>
        )}
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 left-0 h-full z-50 lg:hidden transition-transform duration-300 ease-in-out overflow-y-auto ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{
          width: 'min(300px, 88vw)',
          background: 'rgba(245,241,235,0.99)',
          borderRight: '1px solid rgba(212,165,116,0.2)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between p-5" style={{ borderBottom: '1px solid rgba(212,165,116,0.1)' }}>
          <div className="flex items-center gap-2">
            <Crown size={20} style={{ color: '#D4A574' }} />
            <span className="font-serif font-bold text-sm tracking-widest" style={{ letterSpacing: '3px', color: '#2A2A2A' }}>
              BLAC.CESS
            </span>
          </div>
          <button className="glass-btn-icon" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <X size={18} style={{ color: '#2A2A2A' }} />
          </button>
        </div>

        {/* User info */}
        <div className="px-5 py-5" style={{ borderBottom: '1px solid rgba(212,165,116,0.1)' }}>
          <div className="flex items-center gap-4">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-[17px]"
              style={{ background: 'linear-gradient(135deg, #D4A574, #E8B88A)' }}
            >
              {mockUser.name[0]}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm truncate" style={{ color: '#2A2A2A' }}>{mockUser.name}</p>
              <p className="text-xs mt-0.5 truncate" style={{ color: 'rgba(42,42,42,0.5)' }}>{mockUser.email}</p>
            </div>
          </div>
        </div>

        {/* Shop nav */}
        <nav className="px-4 pt-6 pb-4">
          <p className="px-2 mb-3 text-[11px] font-semibold uppercase tracking-[1.5px]" style={{ color: 'rgba(42,42,42,0.4)' }}>Shop</p>
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const active = pathname === href || pathname.startsWith(href + '/');
              return (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center py-3.5 px-3 text-sm font-medium rounded-xl transition-colors duration-200"
                  style={{
                    color: active ? '#D4A574' : '#2A2A2A',
                    background: active ? 'rgba(212,165,116,0.1)' : 'transparent',
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Account nav */}
        <nav className="px-4 pt-5 pb-4" style={{ borderTop: '1px solid rgba(212,165,116,0.1)' }}>
          <p className="px-2 mb-3 text-[11px] font-semibold uppercase tracking-[1.5px]" style={{ color: 'rgba(42,42,42,0.4)' }}>Account</p>
          <div className="flex flex-col gap-1">
            {ACCOUNT_LINKS.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 py-3.5 px-3 text-sm font-medium rounded-xl transition-colors duration-200"
                style={{ color: '#2A2A2A' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,165,116,0.08)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <Icon size={15} style={{ color: 'rgba(42,42,42,0.5)' }} />
                {label}
              </Link>
            ))}
            <Link
              href="/cart"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 py-3.5 px-3 text-sm font-medium rounded-xl transition-colors duration-200"
              style={{ color: '#2A2A2A' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,165,116,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <ShoppingBag size={15} style={{ color: 'rgba(42,42,42,0.5)' }} />
              Cart
              {itemCount > 0 && (
                <span className="ml-auto text-xs font-bold" style={{ color: '#D4A574' }}>{itemCount}</span>
              )}
            </Link>
          </div>
        </nav>

        {/* Sign out */}
        <div className="px-4 py-5" style={{ borderTop: '1px solid rgba(212,165,116,0.1)' }}>
          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 py-3 px-3 text-sm font-medium rounded-xl transition-colors duration-200"
            style={{ color: 'rgba(220,50,50,0.75)' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(220,50,50,0.05)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <LogOut size={15} />
            Sign Out
          </Link>
        </div>
      </div>
    </>
  );
}
