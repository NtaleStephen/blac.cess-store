export default function CartItemSkeleton() {
  return (
    <div
      className="glass"
      style={{ padding: '16px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}
      aria-hidden="true"
    >
      <div
        className="skeleton"
        style={{ width: '80px', height: '100px', borderRadius: '8px', flexShrink: 0 }}
      />
      <div style={{ flex: 1 }}>
        <div className="skeleton" style={{ height: '18px', width: '68%', marginBottom: '8px' }} />
        <div className="skeleton" style={{ height: '13px', width: '42%', marginBottom: '4px' }} />
        <div className="skeleton" style={{ height: '13px', width: '35%', marginBottom: '16px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="skeleton" style={{ height: '36px', width: '96px', borderRadius: '8px' }} />
          <div className="skeleton" style={{ height: '18px', width: '56px' }} />
        </div>
      </div>
    </div>
  );
}
