import Link from 'next/link';
import { Crown, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[var(--color-paper)]">
      <Crown size={48} className="text-[var(--color-accent)] opacity-70 mb-6" strokeWidth={1} />

      <div
        className="font-serif font-bold mb-4 leading-none"
        style={{
          fontSize: 'clamp(80px, 15vw, 160px)',
          color: 'transparent',
          WebkitTextStroke: '1.5px var(--color-accent)',
          letterSpacing: '-4px',
        }}
      >
        404
      </div>

      <h1 className="heading-lg mb-3">Page Not Found</h1>
      <p className="body max-w-sm mb-10">
        The page you&apos;re looking for has moved, been removed, or doesn&apos;t exist.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/" className="btn">
          <ArrowLeft size={14} />
          Back to Home
        </Link>
        <Link href="/shop" className="btn btn-outline">
          <Search size={14} />
          Browse Shop
        </Link>
      </div>

      <div
        className="mt-20 w-40 h-px"
        style={{ background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)' }}
      />
      <p className="mt-4 text-[11px] font-semibold tracking-[3px] uppercase text-[var(--color-accent)]/70">
        BLAC.CESS
      </p>
    </div>
  );
}
