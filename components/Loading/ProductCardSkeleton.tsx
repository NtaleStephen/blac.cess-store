export default function ProductCardSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="skeleton" style={{ aspectRatio: '4/5', width: '100%' }} />
      <div className="pt-4 space-y-2.5">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-1/2" />
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="skeleton w-4 h-4 rounded-full" />
          ))}
        </div>
        <div className="skeleton h-4 w-16" />
        <div className="skeleton h-10 w-full mt-2" />
      </div>
    </div>
  );
}
