import Link from 'next/link';
import { Crown, Globe, Camera, MessageCircle } from 'lucide-react';

const SHOP_LINKS = [
  { label: 'Crop Tops', href: '/shop/crop-tops' },
  { label: 'Sweatpants', href: '/shop/sweatpants' },
  { label: 'Hoodies', href: '/shop/hoodies' },
  { label: 'New Arrivals', href: '/shop' },
  { label: 'All Products', href: '/shop' },
];

const HELP_LINKS = [
  { label: 'About Us', href: '#' },
  { label: 'Size Guide', href: '#' },
  { label: 'Shipping Info', href: '#' },
  { label: 'Returns & Exchanges', href: '#' },
  { label: 'Contact Us', href: '#' },
  { label: 'FAQ', href: '#' },
];

const SOCIAL = [
  { icon: Camera, label: 'Instagram', href: '#' },
  { icon: MessageCircle, label: 'Twitter / X', href: '#' },
  { icon: Globe, label: 'Website', href: '#' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white/80 mt-24">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Crown size={22} className="text-brand-gold" />
              <span
                className="text-2xl font-bold text-white"
                style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '3px' }}
              >
                BLAC.CESS
              </span>
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-xs">
              Cultural luxury in every thread. Premium clothing celebrating African heritage through
              modern minimalist design.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="glass-btn-icon"
                  style={{ borderColor: 'rgba(212,165,116,0.2)', background: 'rgba(255,255,255,0.05)' }}
                  aria-label={label}
                >
                  <Icon size={16} className="text-white/65" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4
              className="text-white font-semibold mb-5 text-xs uppercase"
              style={{ letterSpacing: '2.5px' }}
            >
              Shop
            </h4>
            <ul className="space-y-3">
              {SHOP_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-white/55 text-sm hover:text-brand-gold transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4
              className="text-white font-semibold mb-5 text-xs uppercase"
              style={{ letterSpacing: '2.5px' }}
            >
              Help
            </h4>
            <ul className="space-y-3">
              {HELP_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-white/55 text-sm hover:text-brand-gold transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div
          className="rounded-2xl p-8 mb-12"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(212,165,116,0.12)',
          }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3
                className="text-white font-semibold text-xl mb-1"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Join the Heritage
              </h3>
              <p className="text-white/45 text-sm">
                Be the first to know about new drops, cultural stories, and exclusive offers.
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                placeholder="Your email address"
                className="glass-input flex-1 md:w-64"
                style={{ background: 'rgba(255,255,255,0.06)', color: 'white', borderColor: 'rgba(212,165,116,0.18)' }}
                autoComplete="email"
              />
              <button
                type="button"
                className="glass-btn glass-btn-primary whitespace-nowrap"
                style={{ color: '#D4A574' }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <p className="text-white/35 text-xs">
            &copy; 2026 BLAC.CESS. All rights reserved.
          </p>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {LEGAL_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-white/35 text-xs hover:text-white/60 transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
