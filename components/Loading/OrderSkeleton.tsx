export default function OrderSkeleton() {
  return (
    <div
      className="glass"
      style={{ padding: '24px', marginBottom: '16px' }}
      aria-hidden="true"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <div className="skeleton" style={{ height: '18px', width: '120px', marginBottom: '8px' }} />
          <div className="skeleton" style={{ height: '13px', width: '88px' }} />
        </div>
        <div className="skeleton" style={{ height: '28px', width: '80px', borderRadius: '20px' }} />
      </div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        {[0, 1].map((i) => (
          <div
            key={i}
            className="skeleton"
            style={{ width: '60px', height: '76px', borderRadius: '8px' }}
          />
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: '16px',
          borderTop: '1px solid rgba(212,165,116,0.1)',
        }}
      >
        <div className="skeleton" style={{ height: '13px', width: '100px' }} />
        <div className="skeleton" style={{ height: '18px', width: '64px' }} />
      </div>
    </div>
  );
}
