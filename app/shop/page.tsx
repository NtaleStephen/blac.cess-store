'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';
import { mockProducts } from '@/lib/mock-data';
import { FilterState } from '@/types';
import { applySort } from '@/lib/utils';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import FilterPanel from '@/components/Filters/FilterPanel';
import SortDropdown from '@/components/Filters/SortDropdown';

const DEFAULT_FILTERS: FilterState = {
  categories: [],
  sizes: [],
  colors: [],
  priceMin: 0,
  priceMax: 500,
};

function applyFilters(products: typeof mockProducts, filters: FilterState, query: string) {
  let result = [...products];
  if (query) {
    const q = query.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }
  if (filters.categories.length > 0) result = result.filter((p) => filters.categories.includes(p.category));
  if (filters.colors.length > 0)     result = result.filter((p) => p.colors.some((c) => filters.colors.includes(c.name)));
  if (filters.sizes.length > 0)      result = result.filter((p) => p.sizes.some((s) => filters.sizes.includes(s.size) && s.available));
  result = result.filter((p) => p.price >= filters.priceMin && p.price <= filters.priceMax);
  return result;
}

function ShopPage() {
  const searchParams = useSearchParams();
  const query        = searchParams.get('q') ?? '';
  const [filters, setFilters]                   = useState<FilterState>(DEFAULT_FILTERS);
  const [sort, setSort]                         = useState('newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const products = useMemo(
    () => applySort(applyFilters(mockProducts, filters, query), sort),
    [filters, sort, query],
  );

  return (
    <div className="min-h-screen" style={{ background: '#F5F1EB', paddingTop: 72 }}>

      {/* Page header */}
      <div className="page-header">
        <div className="container py-10">
          <span className="section-label">{query ? 'Search Results' : 'All Products'}</span>
          <h1 className="page-title">{query ? `"${query}"` : 'Shop'}</h1>
          {query && (
            <p className="text-sm mt-1" style={{ color: 'rgba(42,42,42,0.5)' }}>
              {products.length} result{products.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>
      </div>

      <div className="container py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-7 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <button
              className="btn btn-sm btn-outline lg:hidden"
              style={{ gap: 7 }}
              onClick={() => setMobileFilterOpen(true)}
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>
            <p className="text-sm" style={{ color: 'rgba(42,42,42,0.5)' }}>
              <span className="font-semibold" style={{ color: '#2A2A2A' }}>{products.length}</span> products
            </p>
          </div>
          <SortDropdown value={sort} onChange={setSort} />
        </div>

        {/* Content layout */}
        <div className="flex gap-8 items-start">
          {/* Filter sidebar (desktop) */}
          <div className="hidden lg:block w-56 flex-shrink-0">
            <FilterPanel
              filters={filters}
              onChange={setFilters}
              isMobileOpen={mobileFilterOpen}
              onMobileClose={() => setMobileFilterOpen(false)}
            />
          </div>

          {/* Mobile filter panel (handled internally by FilterPanel with overlay) */}
          <div className="lg:hidden">
            <FilterPanel
              filters={filters}
              onChange={setFilters}
              isMobileOpen={mobileFilterOpen}
              onMobileClose={() => setMobileFilterOpen(false)}
            />
          </div>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            <ProductGrid products={products} columns={3} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPageWrapper() {
  return (
    <Suspense>
      <ShopPage />
    </Suspense>
  );
}
