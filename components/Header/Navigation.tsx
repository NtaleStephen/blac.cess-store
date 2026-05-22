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
  { label: 'Wishlist',   href: '/account/wishlist', icon: Heart },
  { label: 'Settings',   href: '/account/settings', icon: Settings },
];

export default function Navigation() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const pathname   = usePathname();
  const router     = useRouter();
  const { itemCount } = useCart();
  const isHomepage = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Hero mode = homepage at top of page → transparent navbar, white text
  const heroMode = isHomepage && !scrolled;

  const navClass = [
    'navbar',
    scrolled && !heroMode ? 'navbar-scrolled' : '',
    heroMode ? 'navbar-on-dark' : '',
  ].filter(Boolean).join(' ');

  const iconBtnClass = heroMode ? 'icon-btn icon-btn-light' : 'icon-btn';

  return (
    <>
      {/* ── Main navbar ── */}
      <header className={navClass}>
        <div className="container h-full flex items-center gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <Crown size={20} className="text-[var(--color-accent)] transition-transform group-hover:scale-110" />
            <span className="font-serif font-bold text-[16px] uppercase tracking-[3px]">
              BLAC.CESS
            </span>
          </Link>

          {/* Desktop nav — centered */}
          <nav className="hidden lg:flex items-center gap-9 flex-1 justify-center" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => {
              const active = pathname === href || pathname.startsWith(href + '/');
              return (
                <Link
                  key={label}
                  href={href}
                  className={`nav-link ${active ? 'active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 ml-auto">

            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              className={iconBtnClass}
            >
              <Search size={16} />
            </button>

            {/* Account dropdown */}
            <div ref={accountRef} className="relative">
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                aria-label="Account"
                aria-expanded={accountOpen}
                className={iconBtnClass}
              >
                <User size={16} />
              </button>

              {accountOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-56 bg-[var(--color-surface)] border border-[var(--color-divider)] overflow-hidden z-50"
                  style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
                >
                  <div className="px-4 py-3 border-b border-[var(--color-divider)]">
                    <p className="font-serif font-semibold text-[14px] text-[var(--color-ink)]">{mockUser.name}</p>
                    <p className="text-[12px] mt-0.5 truncate text-[var(--color-ink-muted)]">{mockUser.email}</p>
                  </div>
                  <div className="py-1">
                    {ACCOUNT_LINKS.map(({ label, href, icon: Icon }) => (
                      <Link
                        key={label}
                        href={href}
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-[var(--color-ink-soft)] hover:bg-[var(--color-paper-soft)] transition-colors"
                      >
                        <Icon size={14} className="text-[var(--color-ink-muted)]" />
                        {label}
                      </Link>
                    ))}
                  </div>
                  <div className="py-1 border-t border-[var(--color-divider)]">
                    <Link
                      href="/login"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-[var(--color-danger)] hover:bg-[var(--color-paper-soft)] transition-colors"
                    >
                      <LogOut size={14} />
                      Sign Out
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link
              href="/cart"
              className={`${iconBtnClass} relative`}
              aria-label={`Cart, ${itemCount} items`}
            >
              <ShoppingBag size={16} />
              {itemCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full flex items-center justify-center text-white font-bold bg-[var(--color-accent)]"
                  style={{ fontSize: 9 }}
                >
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                className={iconBtnClass}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="px-4 py-3 bg-[var(--color-surface)] border-t border-[var(--color-divider)]">
            <div className="container" style={{ maxWidth: 600 }}>
              <input
                type="search"
                placeholder="Search products…"
                className="input"
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
          className="fixed inset-0 z-40 lg:hidden bg-black/55"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className={`fixed top-0 left-0 h-full z-50 lg:hidden transition-transform duration-300 ease-in-out overflow-y-auto bg-[var(--color-surface)] border-r border-[var(--color-divider)] ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ width: 'min(320px, 88vw)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-divider)]">
          <div className="flex items-center gap-2">
            <Crown size={18} className="text-[var(--color-accent)]" />
            <span className="font-serif font-bold text-[14px] tracking-[3px] uppercase">
              BLAC.CESS
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="icon-btn"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* User strip */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-[var(--color-divider)]">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 bg-[var(--color-accent)]"
            style={{ fontSize: 15 }}
          >
            {mockUser.name[0]}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-[14px] truncate text-[var(--color-ink)]">{mockUser.name}</p>
            <p className="text-[12px] truncate mt-0.5 text-[var(--color-ink-muted)]">{mockUser.email}</p>
          </div>
        </div>

        {/* Shop links */}
        <nav className="px-3 pt-5 pb-4">
          <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[2px] text-[var(--color-ink-muted)]">Shop</p>
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-3 py-3.5 text-[14px] font-medium transition-colors"
                style={{
                  color: active ? 'var(--color-accent)' : 'var(--color-ink)',
                  background: active ? 'var(--color-accent-soft)' : 'transparent',
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Account links */}
        <nav className="px-3 py-4 border-t border-[var(--color-divider)]">
          <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[2px] text-[var(--color-ink-muted)]">Account</p>
          {ACCOUNT_LINKS.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-3.5 text-[14px] font-medium text-[var(--color-ink)] hover:bg-[var(--color-paper-soft)] transition-colors"
            >
              <Icon size={14} className="text-[var(--color-ink-muted)]" />
              {label}
            </Link>
          ))}
          <Link
            href="/cart"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 px-3 py-3.5 text-[14px] font-medium text-[var(--color-ink)] hover:bg-[var(--color-paper-soft)] transition-colors"
          >
            <ShoppingBag size={14} className="text-[var(--color-ink-muted)]" />
            Cart
            {itemCount > 0 && (
              <span className="ml-auto text-[12px] font-bold text-[var(--color-accent)]">{itemCount}</span>
            )}
          </Link>
        </nav>

        {/* Sign out */}
        <div className="px-3 py-4 border-t border-[var(--color-divider)]">
          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 px-3 py-3 text-[14px] font-medium text-[var(--color-danger)] hover:bg-[var(--color-paper-soft)] transition-colors"
          >
            <LogOut size={14} />
            Sign Out
          </Link>
        </div>
      </div>
    </>
  );
}
