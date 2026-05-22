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
  { label: 'Privacy', href: '#' },
  { label: 'Terms',   href: '#' },
  { label: 'Cookies', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-night)]">
      <div className="container py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-14 mb-16">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Crown size={20} className="text-[var(--color-accent)]" />
              <span className="font-serif font-bold text-white text-[17px] uppercase tracking-[3px]">
                BLAC.CESS
              </span>
            </div>
            <p className="text-[13px] leading-relaxed text-white/45 max-w-[240px]">
              Cultural luxury in every thread. Celebrating African heritage through modern design.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white text-[11px] font-semibold uppercase tracking-[2px] mb-5">Shop</h4>
            <ul className="space-y-3.5">
              {SHOP_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="footer-link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-white text-[11px] font-semibold uppercase tracking-[2px] mb-5">Help</h4>
            <ul className="space-y-3.5">
              {HELP_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="footer-link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white text-[11px] font-semibold uppercase tracking-[2px] mb-5">
              Stay Updated
            </h4>
            <p className="text-[13px] text-white/45 mb-4 max-w-xs">
              First to know — new drops, exclusive offers.
            </p>
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            <input
              id="footer-email"
              type="email"
              placeholder="Your email"
              autoComplete="email"
              className="input input-light mb-2"
            />
            <button type="button" className="btn btn-gold btn-block">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/8"
             style={{ borderTopColor: 'rgba(255,255,255,0.08)' }}>
          <p className="text-[11px] text-white/30 tracking-[0.5px]">
            &copy; 2026 BLAC.CESS. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {LEGAL.map(({ label, href }) => (
              <Link key={label} href={href} className="footer-legal uppercase">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
