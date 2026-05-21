import ProductGridSkeleton from '@/components/Loading/ProductGridSkeleton';

export default function ShopLoading() {
  return (
    <div style={{ paddingTop: '72px' }}>
      {/* Header skeleton */}
      <section
        style={{
          padding: '48px 24px 32px',
          borderBottom: '1px solid rgba(212, 165, 116, 0.1)',
          textAlign: 'center',
        }}
      >
        <div
          className="skeleton"
          style={{ height: '14px', width: '100px', borderRadius: '4px', margin: '0 auto 12px' }}
        />
        <div
          className="skeleton"
          style={{ height: '40px', width: '200px', borderRadius: '8px', margin: '0 auto' }}
        />
      </section>

      {/* Content skeleton */}
      <section style={{ padding: '48px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
            {/* Filter sidebar skeleton (desktop only) */}
            <div className="hidden lg:block" style={{ width: '256px', flexShrink: 0 }}>
              <div className="skeleton" style={{ height: '480px', borderRadius: '16px' }} />
            </div>

            {/* Grid area */}
            <div style={{ flex: 1 }}>
              {/* Sort bar skeleton */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '24px',
                }}
              >
                <div className="skeleton" style={{ height: '14px', width: '100px', borderRadius: '4px' }} />
                <div className="skeleton" style={{ height: '40px', width: '160px', borderRadius: '8px' }} />
              </div>
              <ProductGridSkeleton count={8} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
