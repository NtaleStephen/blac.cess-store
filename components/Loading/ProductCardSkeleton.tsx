export default function ProductCardSkeleton() {
  return (
    <div
      className="glass"
      style={{ overflow: 'hidden', borderRadius: '16px', pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <div className="skeleton" style={{ aspectRatio: '4/5', width: '100%', borderRadius: 0 }} />
      <div style={{ padding: '16px' }}>
        <div className="skeleton" style={{ height: '20px', width: '72%', marginBottom: '8px' }} />
        <div className="skeleton" style={{ height: '13px', width: '88%', marginBottom: '4px' }} />
        <div className="skeleton" style={{ height: '13px', width: '55%', marginBottom: '14px' }} />
        <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="skeleton"
              style={{ width: '20px', height: '20px', borderRadius: '50%' }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div className="skeleton" style={{ height: '18px', width: '64px' }} />
          <div className="skeleton" style={{ height: '14px', width: '48px' }} />
        </div>
        <div className="skeleton" style={{ height: '44px', width: '100%', borderRadius: '12px' }} />
      </div>
    </div>
  );
}
