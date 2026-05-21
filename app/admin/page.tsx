import Link from 'next/link';
import { ShieldOff } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="bg-brand-cream min-h-screen flex items-center justify-center" style={{ paddingTop: '72px' }}>
      <div className="text-center px-6 max-w-md">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(244,67,54,0.08)', border: '1px solid rgba(244,67,54,0.2)' }}
        >
          <ShieldOff size={32} style={{ color: '#C62828' }} strokeWidth={1.5} />
        </div>
        <h1
          className="text-brand-charcoal mb-3"
          style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 600 }}
        >
          Access Restricted
        </h1>
        <p className="text-brand-charcoal/55 text-sm mb-8 leading-relaxed">
          This area requires administrator credentials. Please sign in with an authorised account
          to continue.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/login" className="glass-btn glass-btn-primary inline-flex items-center justify-center gap-2">
            Sign In
          </Link>
          <Link href="/" className="glass-btn inline-flex items-center justify-center gap-2">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
