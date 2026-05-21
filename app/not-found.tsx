import Link from 'next/link';
import { Crown, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: 'linear-gradient(160deg, #F5F1EB 0%, #EDE9E3 100%)',
        textAlign: 'center',
      }}
    >
      {/* Crown accent */}
      <Crown
        size={48}
        style={{ color: '#D4A574', marginBottom: '24px', opacity: 0.7 }}
        strokeWidth={1}
      />

      {/* 404 number */}
      <div
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(80px, 15vw, 140px)',
          fontWeight: 700,
          lineHeight: 1,
          color: 'transparent',
          WebkitTextStroke: '2px rgba(212, 165, 116, 0.4)',
          marginBottom: '16px',
          letterSpacing: '-4px',
        }}
      >
        404
      </div>

      {/* Heading */}
      <h1
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(22px, 4vw, 32px)',
          fontWeight: 600,
          color: '#2A2A2A',
          marginBottom: '12px',
        }}
      >
        Page Not Found
      </h1>

      <p
        style={{
          color: 'rgba(42, 42, 42, 0.6)',
          fontSize: '15px',
          maxWidth: '360px',
          lineHeight: 1.6,
          marginBottom: '40px',
        }}
      >
        The page you're looking for has moved, been removed, or doesn't exist.
      </p>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/"
          className="glass-btn glass-btn-primary"
          style={{ gap: '8px' }}
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
        <Link href="/shop" className="glass-btn" style={{ gap: '8px' }}>
          <Search size={16} />
          Browse Shop
        </Link>
      </div>

      {/* Decorative divider */}
      <div
        style={{
          marginTop: '64px',
          width: '160px',
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(212,165,116,0.4), transparent)',
        }}
      />
      <p
        style={{
          marginTop: '16px',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '3px',
          color: 'rgba(212, 165, 116, 0.6)',
          textTransform: 'uppercase',
        }}
      >
        BLAC.CESS
      </p>
    </div>
  );
}
