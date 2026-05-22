import Link from 'next/link';
import { ShieldOff } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-[72px] bg-[var(--color-paper)]">
      <div className="text-center px-6 max-w-md">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-7 border border-[var(--color-danger)]/30">
          <ShieldOff size={30} className="text-[var(--color-danger)]" strokeWidth={1.4} />
        </div>
        <h1 className="heading-lg mb-3">Access Restricted</h1>
        <p className="body mb-10">
          This area requires administrator credentials. Please sign in with an authorized
          account to continue.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/login" className="btn">Sign In</Link>
          <Link href="/" className="btn btn-outline">Go Home</Link>
        </div>
      </div>
    </div>
  );
}
