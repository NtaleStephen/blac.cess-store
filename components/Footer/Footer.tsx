import Link from 'next/link';
import { Crown, Globe, Rss, Share2 } from 'lucide-react';

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
                className="text-2xl font-bold text-white tracking-widest"
                style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '3px' }}
              >
                BLAC.CESS
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Cultural luxury in every thread. Premium clothing celebrating African heritage through
              modern minimalist design.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[Globe, Rss, Share2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="glass-btn-icon"
                  style={{ borderColor: 'rgba(212, 165, 116, 0.2)', background: 'rgba(255,255,255,0.05)' }}
                  aria-label="Social link"
                >
                  <Icon size={16} className="text-white/70" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4
              className="text-white font-semibold mb-4 text-sm uppercase tracking-widest"
              style={{ letterSpacing: '2px' }}
            >
              Shop
            </h4>
            <ul className="space-y-3">
              {['Crop Tops', 'Sweatpants', 'Hoodies', 'New Arrivals', 'Featured'].map((item) => (
                <li key={item}>
                  <Link
                    href="/shop"
                    className="text-white/60 text-sm hover:text-brand-gold transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4
              className="text-white font-semibold mb-4 text-sm uppercase tracking-widest"
              style={{ letterSpacing: '2px' }}
            >
              Help
            </h4>
            <ul className="space-y-3">
              {['About Us', 'Size Guide', 'Shipping Info', 'Returns', 'Contact', 'FAQ'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-white/60 text-sm hover:text-brand-gold transition-colors duration-200"
                  >
                    {item}
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
            border: '1px solid rgba(212,165,116,0.15)',
          }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-white font-semibold text-xl mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                Join the Heritage
              </h3>
              <p className="text-white/50 text-sm">
                Be the first to know about new drops, cultural stories, and exclusive offers.
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="glass-input flex-1 md:w-64"
                style={{ background: 'rgba(255,255,255,0.06)', color: 'white', borderColor: 'rgba(212,165,116,0.2)' }}
              />
              <button className="glass-btn glass-btn-primary whitespace-nowrap" style={{ color: '#D4A574' }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <p className="text-white/40 text-xs">
            &copy; 2026 BLAC.CESS. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <Link key={item} href="#" className="text-white/40 text-xs hover:text-white/60 transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
