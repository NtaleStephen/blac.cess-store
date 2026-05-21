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
      {/* Error icon */}
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'rgba(244, 67, 54, 0.08)',
          border: '1px solid rgba(244, 67, 54, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
        }}
      >
        <AlertTriangle size={36} style={{ color: '#F44336' }} strokeWidth={1.5} />
      </div>

      <h1
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(22px, 4vw, 32px)',
          fontWeight: 600,
          color: '#2A2A2A',
          marginBottom: '12px',
        }}
      >
        Something Went Wrong
      </h1>

      <p
        style={{
          color: 'rgba(42, 42, 42, 0.6)',
          fontSize: '15px',
          maxWidth: '360px',
          lineHeight: 1.6,
          marginBottom: '8px',
        }}
      >
        An unexpected error occurred. Please try again or return to the homepage.
      </p>

      {error.digest && (
        <p
          style={{
            fontSize: '12px',
            color: 'rgba(42, 42, 42, 0.35)',
            marginBottom: '8px',
            fontFamily: 'monospace',
          }}
        >
          Error ID: {error.digest}
        </p>
      )}

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '32px' }}>
        <button
          onClick={unstable_retry}
          className="glass-btn glass-btn-primary"
          style={{ gap: '8px' }}
        >
          <RefreshCw size={16} />
          Try Again
        </button>
        <Link href="/" className="glass-btn" style={{ gap: '8px' }}>
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>

      {/* Error details (dev only) */}
      {process.env.NODE_ENV === 'development' && (
        <details
          style={{
            marginTop: '40px',
            maxWidth: '600px',
            width: '100%',
            textAlign: 'left',
          }}
        >
          <summary
            style={{
              cursor: 'pointer',
              fontSize: '13px',
              color: 'rgba(42,42,42,0.5)',
              marginBottom: '8px',
            }}
          >
            Error details (dev only)
          </summary>
          <pre
            style={{
              background: 'rgba(244, 67, 54, 0.05)',
              border: '1px solid rgba(244, 67, 54, 0.15)',
              borderRadius: '8px',
              padding: '16px',
              fontSize: '12px',
              color: '#F44336',
              overflowX: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {error.message}
            {error.stack && `\n\n${error.stack}`}
          </pre>
        </details>
      )}
    </div>
  );
}
