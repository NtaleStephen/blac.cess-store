'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[var(--color-paper)]">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-7 border border-[var(--color-danger)]/30">
        <AlertTriangle size={32} className="text-[var(--color-danger)]" strokeWidth={1.4} />
      </div>

      <h1 className="heading-lg mb-3">Something Went Wrong</h1>
      <p className="body max-w-sm mb-2">
        An unexpected error occurred. Please try again or return to the homepage.
      </p>

      {error.digest && (
        <p className="text-[11px] mt-2 font-mono text-[var(--color-ink-faint)]">
          Error ID: {error.digest}
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mt-10">
        <button onClick={unstable_retry} className="btn">
          <RefreshCw size={14} />
          Try Again
        </button>
        <Link href="/" className="btn btn-outline">
          <ArrowLeft size={14} />
          Back to Home
        </Link>
      </div>

      {process.env.NODE_ENV === 'development' && (
        <details className="mt-12 max-w-2xl w-full text-left">
          <summary className="cursor-pointer text-[12px] uppercase tracking-[1.5px] text-[var(--color-ink-muted)] mb-3">
            Error details (dev only)
          </summary>
          <pre className="bg-[var(--color-danger)]/5 border border-[var(--color-danger)]/20 p-4 text-[12px] text-[var(--color-danger)] overflow-x-auto whitespace-pre-wrap break-words">
            {error.message}
            {error.stack && `\n\n${error.stack}`}
          </pre>
        </details>
      )}
    </div>
  );
}
