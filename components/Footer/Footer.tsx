import Link from 'next/link';
import { Crown, Globe, Camera, MessageCircle } from 'lucide-react';

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

const SOCIAL = [
  { icon: Camera,        label: 'Instagram', href: '#' },
  { icon: MessageCircle, label: 'Twitter',   href: '#' },
  { icon: Globe,         label: 'Website',   href: '#' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy',   href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy',    href: '#' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#1A1A1A', borderTop: '1px solid rgba(212,165,116,0.2)' }}>
      <div className="container py-16 lg:py-20">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-14">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <Crown size={22} style={{ color: '#D4A574' }} />
              <span
                className="font-serif font-bold text-2xl text-white uppercase"
                style={{ letterSpacing: '3px' }}
              >
                BLAC.CESS
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 320 }}>
              Cultural luxury in every thread. Premium clothing celebrating African heritage through
              modern minimalist design.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="glass-btn-icon"
                  style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(212,165,116,0.2)' }}
                  aria-label={label}
                >
                  <Icon size={16} style={{ color: 'rgba(255,255,255,0.6)' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4
              className="text-white font-bold mb-6 text-xs uppercase"
              style={{ letterSpacing: '3px' }}
            >
              Shop
            </h4>
            <ul className="space-y-4">
              {SHOP_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="footer-link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4
              className="text-white font-bold mb-6 text-xs uppercase"
              style={{ letterSpacing: '3px' }}
            >
              Help
            </h4>
            <ul className="space-y-4">
              {HELP_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="footer-link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div
          className="rounded-2xl p-8 md:p-10 mb-12"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,165,116,0.12)' }}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <h3 className="font-serif font-semibold text-xl text-white mb-2">Join the Heritage</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)' }}>
                Be the first to know about new drops, cultural stories, and exclusive offers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                placeholder="Your email address"
                className="glass-input"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  color: 'white',
                  borderColor: 'rgba(212,165,116,0.2)',
                  minWidth: 220,
                }}
                autoComplete="email"
              />
              <button type="button" className="glass-btn glass-btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="flex flex-col items-center gap-5 pt-8 md:flex-row md:justify-between"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="text-xs text-center md:text-left" style={{ color: 'rgba(255,255,255,0.32)' }}>
            &copy; 2026 BLAC.CESS. All rights reserved.
          </p>
          <div className="flex items-center gap-5 flex-wrap justify-center">
            {LEGAL_LINKS.map(({ label, href }) => (
              <Link key={label} href={href} className="footer-legal">{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
