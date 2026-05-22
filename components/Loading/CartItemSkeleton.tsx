export default function CartItemSkeleton() {
  return (
    <div className="py-6 flex gap-5 border-b border-[var(--color-divider)]" aria-hidden="true">
      <div className="skeleton flex-shrink-0" style={{ width: 96, height: 120 }} />
      <div className="flex-1 space-y-3">
        <div className="skeleton h-5 w-2/3" />
        <div className="skeleton h-3 w-1/2" />
        <div className="flex justify-between items-center pt-4">
          <div className="skeleton h-9 w-28" />
          <div className="skeleton h-5 w-20" />
        </div>
      </div>
    </div>
  );
}
