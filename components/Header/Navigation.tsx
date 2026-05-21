'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, User, Menu, X, Crown } from 'lucide-react';
import { mockCartItems } from '@/lib/mock-data';

const navLinks = [
  { label: 'Crop Tops', href: '/shop/crop-tops' },
  { label: 'Sweatpants', href: '/shop/sweatpants' },
  { label: 'Hoodies', href: '/shop/hoodies' },
  { label: 'New', href: '/shop?filter=new' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cartCount = mockCartItems.reduce((acc, item) => acc + item.quantity, 0);

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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-nav shadow-sm' : 'bg-transparent'
        }`}
        style={{ height: '72px' }}
      >
        <div className="container h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Crown
              size={22}
              className="text-brand-gold transition-transform duration-300 group-hover:scale-110"
            />
            <span
              className="text-xl font-bold tracking-widest uppercase"
              style={{
                fontFamily: 'Playfair Display, serif',
                letterSpacing: '3px',
                color: isScrolled ? '#2A2A2A' : '#FFFFFF',
                transition: 'color 0.3s',
              }}
            >
              BLAC.CESS
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="nav-link"
                style={{ color: isScrolled ? '#2A2A2A' : 'rgba(255,255,255,0.85)' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              className="glass-btn-icon"
              style={{
                background: isScrolled ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.2)',
                borderColor: isScrolled ? 'rgba(212,165,116,0.2)' : 'rgba(255,255,255,0.2)',
              }}
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <Search size={18} style={{ color: isScrolled ? '#2A2A2A' : 'rgba(255,255,255,0.85)' }} />
            </button>

            {/* Account */}
            <Link
              href="/account"
              className="glass-btn-icon"
              style={{
                background: isScrolled ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.2)',
                borderColor: isScrolled ? 'rgba(212,165,116,0.2)' : 'rgba(255,255,255,0.2)',
              }}
              aria-label="Account"
            >
              <User size={18} style={{ color: isScrolled ? '#2A2A2A' : 'rgba(255,255,255,0.85)' }} />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="glass-btn-icon relative"
              style={{
                background: isScrolled ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.2)',
                borderColor: isScrolled ? 'rgba(212,165,116,0.2)' : 'rgba(255,255,255,0.2)',
              }}
              aria-label="Cart"
            >
              <ShoppingBag size={18} style={{ color: isScrolled ? '#2A2A2A' : 'rgba(255,255,255,0.85)' }} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: '#D4A574', fontSize: '10px' }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger (mobile) */}
            <button
              className="glass-btn-icon md:hidden"
              style={{
                background: isScrolled ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.2)',
                borderColor: isScrolled ? 'rgba(212,165,116,0.2)' : 'rgba(255,255,255,0.2)',
              }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? (
                <X size={18} style={{ color: isScrolled ? '#2A2A2A' : 'rgba(255,255,255,0.85)' }} />
              ) : (
                <Menu size={18} style={{ color: isScrolled ? '#2A2A2A' : 'rgba(255,255,255,0.85)' }} />
              )}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-brand-gold/10 px-4 py-3 bg-brand-cream/90 backdrop-blur-lg">
            <div className="container max-w-2xl mx-auto">
              <input
                type="search"
                placeholder="Search products..."
                className="glass-input"
                aria-label="Search products"
                autoFocus
              />
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 left-0 h-full w-72 z-50 md:hidden transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'rgba(245, 241, 235, 0.97)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(212, 165, 116, 0.2)',
        }}
      >
        <div className="flex items-center justify-between p-5 border-b border-brand-gold/10">
          <div className="flex items-center gap-2">
            <Crown size={20} className="text-brand-gold" />
            <span className="font-bold tracking-widest text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>
              BLAC.CESS
            </span>
          </div>
          <button
            className="glass-btn-icon"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="p-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 px-4 text-brand-charcoal font-medium rounded-lg hover:bg-brand-gold/10 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <div className="section-divider my-4" />
          <Link
            href="/account"
            onClick={() => setMobileOpen(false)}
            className="block py-3 px-4 text-brand-charcoal font-medium rounded-lg hover:bg-brand-gold/10 transition-colors duration-200"
          >
            Account
          </Link>
          <Link
            href="/cart"
            onClick={() => setMobileOpen(false)}
            className="block py-3 px-4 text-brand-charcoal font-medium rounded-lg hover:bg-brand-gold/10 transition-colors duration-200"
          >
            Cart {cartCount > 0 && `(${cartCount})`}
          </Link>
        </nav>
      </div>
    </>
  );
}
