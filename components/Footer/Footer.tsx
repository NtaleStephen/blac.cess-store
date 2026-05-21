import Link from 'next/link';
import { Crown } from 'lucide-react';

const SHOP_LINKS = [
  { label: 'Crop Tops',    href: '/shop/crop-tops' },
  { label: 'Sweatpants',   href: '/shop/sweatpants' },
  { label: 'Hoodies',      href: '/shop/hoodies' },
  { label: 'New Arrivals', href: '/shop/new-arrivals' },
  { label: 'All Products', href: '/shop' },
];

const HELP_LINKS = [
  { label: 'About Us',            href: '#' },
  { label: 'Size Guide',          href: '#' },
  { label: 'Shipping Info',       href: '#' },
  { label: 'Returns & Exchanges', href: '#' },
  { label: 'Contact Us',          href: '#' },
  { label: 'FAQ',                 href: '#' },
];

const LEGAL = [
  { label: 'Privacy',  href: '#' },
  { label: 'Terms',    href: '#' },
  { label: 'Cookies',  href: '#' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="container py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Crown size={20} style={{ color: '#D4A574' }} />
              <span className="font-serif font-bold text-white text-xl uppercase" style={{ letterSpacing: '3px' }}>
                BLAC.CESS
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)', maxWidth: 220 }}>
              Cultural luxury in every thread. Celebrating African heritage through modern design.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase mb-5" style={{ letterSpacing: '2px' }}>Shop</h4>
            <ul className="space-y-3.5">
              {SHOP_LINKS.map(({ label, href }) => (
                <li key={label}><Link href={href} className="footer-link">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase mb-5" style={{ letterSpacing: '2px' }}>Help</h4>
            <ul className="space-y-3.5">
              {HELP_LINKS.map(({ label, href }) => (
                <li key={label}><Link href={href} className="footer-link">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase mb-5" style={{ letterSpacing: '2px' }}>Stay Updated</h4>
            <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.42)' }}>
              First to know — new drops, exclusive offers.
            </p>
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            <input
              id="footer-email"
              type="email"
              placeholder="Your email"
              autoComplete="email"
              className="w-full mb-2 rounded-lg px-4 text-sm outline-none transition-all duration-200"
              style={{
                height: 44,
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                fontFamily: 'Inter, sans-serif',
              }}
            />
            <button
              type="button"
              className="w-full rounded-lg text-xs font-semibold uppercase transition-all duration-200"
              style={{
                height: 44,
                background: '#D4A574',
                color: '#FFFFFF',
                border: 'none',
                letterSpacing: '1.5px',
                cursor: 'pointer',
              }}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>
            &copy; 2026 BLAC.CESS. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {LEGAL.map(({ label, href }) => (
              <Link key={label} href={href} className="footer-legal">{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
