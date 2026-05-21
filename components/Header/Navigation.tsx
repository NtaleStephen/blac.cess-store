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
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [searchOpen, setSearchOpen]     = useState(false);
  const [accountOpen, setAccountOpen]   = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const pathname   = usePathname();
  const router     = useRouter();
  const { itemCount } = useCart();
  const isHomepage = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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

  // On hero (homepage, not scrolled) — use transparent dark overlay so white text shows
  const heroMode = isHomepage && !scrolled;

  const navBg    = heroMode ? 'rgba(0,0,0,0)' : '#FFFFFF';
  const navBdr   = heroMode ? 'transparent' : 'rgba(42,42,42,0.08)';
  const shadow   = !heroMode && scrolled ? '0 1px 20px rgba(0,0,0,0.07)' : 'none';
  const textCol  = heroMode ? '#FFFFFF' : '#2A2A2A';
  const iconBg   = heroMode ? 'rgba(255,255,255,0.1)' : 'transparent';
  const iconBdr  = heroMode ? 'rgba(255,255,255,0.2)' : 'rgba(42,42,42,0.12)';

  return (
    <>
      {/* ── Main navbar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{ height: 68, background: navBg, borderBottom: `1px solid ${navBdr}`, boxShadow: shadow }}
      >
        <div className="container h-full flex items-center gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <Crown size={20} style={{ color: '#D4A574', transition: 'transform 0.2s' }} className="group-hover:scale-110" />
            <span
              className="font-serif font-bold text-[17px] uppercase tracking-[3px] transition-colors duration-200"
              style={{ color: textCol }}
            >
              BLAC.CESS
            </span>
          </Link>

          {/* Desktop nav — centered */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => {
              const active = pathname === href || pathname.startsWith(href + '/');
              return (
                <Link
                  key={label}
                  href={href}
                  className={`nav-link ${active ? 'active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                  style={{ color: active ? '#D4A574' : textCol }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 ml-auto">

            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              className="nav-icon-btn"
              style={{ background: iconBg, borderColor: iconBdr, color: textCol }}
            >
              <Search size={17} />
            </button>

            {/* Account dropdown */}
            <div ref={accountRef} className="relative">
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                aria-label="Account"
                aria-expanded={accountOpen}
                className="nav-icon-btn"
                style={{ background: iconBg, borderColor: iconBdr, color: textCol }}
              >
                <User size={17} />
              </button>

              {accountOpen && (
                <div
                  className="absolute right-0 top-full mt-2 rounded-xl overflow-hidden z-50"
                  style={{
                    width: 216,
                    background: '#FFFFFF',
                    border: '1px solid rgba(42,42,42,0.1)',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.14)',
                  }}
                >
                  <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(42,42,42,0.07)' }}>
                    <p className="font-serif font-semibold text-sm" style={{ color: '#2A2A2A' }}>{mockUser.name}</p>
                    <p className="text-xs mt-0.5 truncate" style={{ color: 'rgba(42,42,42,0.5)' }}>{mockUser.email}</p>
                  </div>
                  <div className="py-1">
                    {ACCOUNT_LINKS.map(({ label, href, icon: Icon }) => (
                      <Link
                        key={label}
                        href={href}
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#2A2A2A] hover:bg-[#F5F1EB] transition-colors duration-150"
                      >
                        <Icon size={14} style={{ color: 'rgba(42,42,42,0.45)' }} />
                        {label}
                      </Link>
                    ))}
                  </div>
                  <div className="py-1" style={{ borderTop: '1px solid rgba(42,42,42,0.07)' }}>
                    <Link
                      href="/login"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-red-50 transition-colors duration-150"
                      style={{ color: 'rgba(200,40,40,0.8)' }}
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
              className="nav-icon-btn relative"
              style={{ background: iconBg, borderColor: iconBdr, color: textCol }}
              aria-label={`Cart, ${itemCount} items`}
            >
              <ShoppingBag size={17} />
              {itemCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-[17px] h-[17px] rounded-full flex items-center justify-center text-white font-bold"
                  style={{ background: '#D4A574', fontSize: 9 }}
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
                className="nav-icon-btn"
                style={{ background: iconBg, borderColor: iconBdr, color: textCol }}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div
            className="px-4 py-3"
            style={{ background: '#FFFFFF', borderTop: '1px solid rgba(42,42,42,0.08)' }}
          >
            <div className="container" style={{ maxWidth: 560 }}>
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
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className={`fixed top-0 left-0 h-full z-50 lg:hidden transition-transform duration-300 ease-in-out overflow-y-auto ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ width: 'min(300px, 88vw)', background: '#FFFFFF', borderRight: '1px solid rgba(42,42,42,0.08)' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: '1px solid rgba(42,42,42,0.08)' }}
        >
          <div className="flex items-center gap-2">
            <Crown size={18} style={{ color: '#D4A574' }} />
            <span className="font-serif font-bold text-sm tracking-[3px] uppercase" style={{ color: '#2A2A2A' }}>
              BLAC.CESS
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="btn-icon"
            aria-label="Close"
          >
            <X size={16} style={{ color: '#2A2A2A' }} />
          </button>
        </div>

        {/* User strip */}
        <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: '1px solid rgba(42,42,42,0.06)' }}>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #D4A574, #E8B88A)', fontSize: 16 }}
          >
            {mockUser.name[0]}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm truncate" style={{ color: '#2A2A2A' }}>{mockUser.name}</p>
            <p className="text-xs truncate mt-0.5" style={{ color: 'rgba(42,42,42,0.5)' }}>{mockUser.email}</p>
          </div>
        </div>

        {/* Shop links */}
        <nav className="px-3 pt-5 pb-4">
          <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[2px]" style={{ color: 'rgba(42,42,42,0.38)' }}>Shop</p>
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-3 py-3.5 text-sm font-medium rounded-lg transition-colors duration-150"
                style={{ color: active ? '#D4A574' : '#2A2A2A', background: active ? 'rgba(212,165,116,0.08)' : 'transparent' }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Account links */}
        <nav className="px-3 py-4" style={{ borderTop: '1px solid rgba(42,42,42,0.06)' }}>
          <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[2px]" style={{ color: 'rgba(42,42,42,0.38)' }}>Account</p>
          {ACCOUNT_LINKS.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-3.5 text-sm font-medium rounded-lg text-[#2A2A2A] hover:bg-[#F5F1EB] transition-colors duration-150"
            >
              <Icon size={14} style={{ color: 'rgba(42,42,42,0.45)' }} />
              {label}
            </Link>
          ))}
          <Link
            href="/cart"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 px-3 py-3.5 text-sm font-medium rounded-lg text-[#2A2A2A] hover:bg-[#F5F1EB] transition-colors duration-150"
          >
            <ShoppingBag size={14} style={{ color: 'rgba(42,42,42,0.45)' }} />
            Cart {itemCount > 0 && <span className="ml-auto text-xs font-bold" style={{ color: '#D4A574' }}>{itemCount}</span>}
          </Link>
        </nav>

        {/* Sign out */}
        <div className="px-3 py-4" style={{ borderTop: '1px solid rgba(42,42,42,0.06)' }}>
          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors duration-150"
            style={{ color: 'rgba(200,40,40,0.75)' }}
          >
            <LogOut size={14} />
            Sign Out
          </Link>
        </div>
      </div>
    </>
  );
}
