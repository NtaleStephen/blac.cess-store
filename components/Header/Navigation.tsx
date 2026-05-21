'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingBag, Search, User, Menu, X, Crown, LogOut, Package, Heart, Settings } from 'lucide-react';
import { mockCartItems, mockUser } from '@/lib/mock-data';

const navLinks = [
  { label: 'Crop Tops', href: '/shop/crop-tops' },
  { label: 'Sweatpants', href: '/shop/sweatpants' },
  { label: 'Hoodies', href: '/shop/hoodies' },
  { label: 'New', href: '/shop/new-arrivals' },
];

const accountMenuLinks = [
  { label: 'My Account', href: '/account', icon: User },
  { label: 'My Orders', href: '/account/orders', icon: Package },
  { label: 'Wishlist', href: '/account/wishlist', icon: Heart },
  { label: 'Settings', href: '/account/settings', icon: Settings },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const cartCount = mockCartItems.reduce((acc, item) => acc + item.quantity, 0);
  const isHomepage = pathname === '/';

  // On non-homepage pages, always use the "scrolled" dark style
  const useDark = isScrolled || !isHomepage;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close account dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const iconStyle = {
    background: useDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.2)',
    borderColor: useDark ? 'rgba(212,165,116,0.2)' : 'rgba(255,255,255,0.2)',
  };
  const iconColor = useDark ? '#2A2A2A' : 'rgba(255,255,255,0.85)';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          useDark ? 'glass-nav shadow-sm' : 'bg-transparent'
        }`}
        style={{ height: '72px' }}
      >
        <div className="container h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <Crown
              size={22}
              className="text-brand-gold transition-transform duration-300 group-hover:scale-110"
            />
            <span
              className="text-xl font-bold tracking-widest uppercase"
              style={{
                fontFamily: 'Playfair Display, serif',
                letterSpacing: '3px',
                color: useDark ? '#2A2A2A' : '#FFFFFF',
                transition: 'color 0.3s',
              }}
            >
              BLAC.CESS
            </span>
          </Link>

          {/* Desktop Nav Links — hidden below lg (1024px) */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="nav-link"
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    color: isActive ? '#D4A574' : (useDark ? '#2A2A2A' : 'rgba(255,255,255,0.85)'),
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              className="glass-btn-icon"
              style={iconStyle}
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <Search size={18} style={{ color: iconColor }} />
            </button>

            {/* Account dropdown */}
            <div ref={accountRef} className="relative">
              <button
                className="glass-btn-icon"
                style={iconStyle}
                onClick={() => setAccountOpen(!accountOpen)}
                aria-label="Account"
                aria-expanded={accountOpen}
                aria-haspopup="true"
              >
                <User size={18} style={{ color: iconColor }} />
              </button>

              {accountOpen && (
                <div
                  className="absolute right-0 mt-2 rounded-xl overflow-hidden z-50"
                  style={{
                    width: '220px',
                    top: '100%',
                    background: 'rgba(245,241,235,0.98)',
                    border: '1px solid rgba(212,165,116,0.2)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  }}
                >
                  {/* User header */}
                  <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(212,165,116,0.12)' }}>
                    <p className="font-semibold text-brand-charcoal text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {mockUser.name}
                    </p>
                    <p className="text-brand-charcoal/50 text-xs truncate">{mockUser.email}</p>
                  </div>

                  {/* Links */}
                  <div className="py-1">
                    {accountMenuLinks.map(({ label, href, icon: Icon }) => (
                      <Link
                        key={label}
                        href={href}
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-brand-charcoal hover:bg-brand-gold/10 transition-colors duration-150"
                      >
                        <Icon size={15} className="text-brand-charcoal/50" />
                        {label}
                      </Link>
                    ))}
                  </div>

                  {/* Sign out */}
                  <div className="border-t py-1" style={{ borderColor: 'rgba(212,165,116,0.12)' }}>
                    <Link
                      href="/login"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500/80 hover:bg-red-50 transition-colors duration-150 group"
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
              style={iconStyle}
              aria-label={`Cart, ${cartCount} items`}
            >
              <ShoppingBag size={18} style={{ color: iconColor }} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ background: '#D4A574', fontSize: '10px' }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger — only below lg. Wrapped in div to prevent glass-btn-icon from overriding display:none */}
            <div className="lg:hidden">
              <button
                className="glass-btn-icon"
                style={iconStyle}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
              >
                {mobileOpen
                  ? <X size={18} style={{ color: iconColor }} />
                  : <Menu size={18} style={{ color: iconColor }} />
                }
              </button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-brand-gold/10 px-4 py-3 bg-brand-cream/95 backdrop-blur-lg">
            <div className="container max-w-2xl mx-auto">
              <input
                type="search"
                placeholder="Search products…"
                className="glass-input"
                aria-label="Search products"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const q = (e.currentTarget as HTMLInputElement).value.trim();
                    if (q) {
                      router.push(`/shop?q=${encodeURIComponent(q)}`);
                      setSearchOpen(false);
                    }
                  }
                  if (e.key === 'Escape') setSearchOpen(false);
                }}
              />
            </div>
          </div>
        )}
      </header>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 left-0 h-full z-50 lg:hidden transition-transform duration-300 ease-in-out overflow-y-auto ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          width: 'min(288px, 85vw)',
          background: 'rgba(245,241,235,0.98)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(212,165,116,0.2)',
        }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between p-5 border-b border-brand-gold/10">
          <div className="flex items-center gap-2">
            <Crown size={20} className="text-brand-gold" />
            <span className="font-bold tracking-widest text-sm text-brand-charcoal" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '3px' }}>
              BLAC.CESS
            </span>
          </div>
          <button className="glass-btn-icon" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <X size={18} className="text-brand-charcoal" />
          </button>
        </div>

        {/* User info */}
        <div className="px-5 py-4 border-b border-brand-gold/10">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #D4A574, #E8B88A)', fontSize: '16px' }}
            >
              {mockUser.name[0]}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-brand-charcoal text-sm truncate">{mockUser.name}</p>
              <p className="text-brand-charcoal/50 text-xs truncate">{mockUser.email}</p>
            </div>
          </div>
        </div>

        {/* Shop nav */}
        <nav className="px-4 pt-4 pb-2">
          <p className="text-brand-charcoal/40 text-xs font-semibold uppercase mb-2 px-2" style={{ letterSpacing: '1.5px' }}>Shop</p>
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center py-3 px-3 text-sm font-medium rounded-lg transition-colors duration-200"
                style={{
                  color: isActive ? '#D4A574' : '#2A2A2A',
                  background: isActive ? 'rgba(212,165,116,0.1)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Account nav */}
        <nav className="px-4 py-2 border-t border-brand-gold/10">
          <p className="text-brand-charcoal/40 text-xs font-semibold uppercase mb-2 px-2 mt-2" style={{ letterSpacing: '1.5px' }}>Account</p>
          {accountMenuLinks.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 py-3 px-3 text-sm font-medium text-brand-charcoal rounded-lg hover:bg-brand-gold/10 transition-colors duration-200"
            >
              <Icon size={15} className="text-brand-charcoal/50" />
              {label}
            </Link>
          ))}
          <Link
            href="/cart"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 py-3 px-3 text-sm font-medium text-brand-charcoal rounded-lg hover:bg-brand-gold/10 transition-colors duration-200"
          >
            <ShoppingBag size={15} className="text-brand-charcoal/50" />
            Cart {cartCount > 0 && <span className="ml-auto text-xs font-bold text-brand-gold">{cartCount}</span>}
          </Link>
        </nav>

        {/* Sign out */}
        <div className="px-4 py-4 border-t border-brand-gold/10">
          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 py-2.5 px-3 text-sm font-medium text-red-500/70 rounded-lg hover:bg-red-50 transition-colors duration-200"
          >
            <LogOut size={15} />
            Sign Out
          </Link>
        </div>
      </div>
    </>
  );
}
