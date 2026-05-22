export default function OrderSkeleton() {
  return (
    <div className="card-static p-6 mb-4" aria-hidden="true">
      <div className="flex justify-between items-start mb-5">
        <div className="space-y-2">
          <div className="skeleton h-5 w-32" />
          <div className="skeleton h-3 w-24" />
        </div>
        <div className="skeleton h-6 w-20" />
      </div>
      <div className="skeleton h-3 w-2/3 mb-5" />
      <div className="flex justify-between pt-4 border-t border-[var(--color-divider)]">
        <div className="skeleton h-4 w-24" />
        <div className="skeleton h-5 w-16" />
      </div>
    </div>
  );
}
