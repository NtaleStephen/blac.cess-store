import ProductGridSkeleton from '@/components/Loading/ProductGridSkeleton';

export default function ShopLoading() {
  return (
    <div className="min-h-screen pt-[72px]">
      {/* Header skeleton */}
      <div className="page-header">
        <div className="container">
          <div className="skeleton h-3 w-24 mb-3" />
          <div className="skeleton h-12 w-64" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="container py-10">
        <div className="flex justify-between items-center mb-8">
          <div className="skeleton h-4 w-24" />
          <div className="skeleton h-10 w-48" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 items-start">
          <div className="hidden lg:block">
            <div className="skeleton h-[480px] w-full" />
          </div>
          <ProductGridSkeleton count={8} />
        </div>
      </div>
    </div>
  );
}
