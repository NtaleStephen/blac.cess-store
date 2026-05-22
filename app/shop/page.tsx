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
    <div className="min-h-screen pt-[72px]">

      {/* Page header */}
      <div className="page-header">
        <div className="container">
          <span className="eyebrow">{query ? 'Search Results' : 'All Products'}</span>
          <h1 className="heading-xl">{query ? `"${query}"` : 'Shop'}</h1>
          {query && (
            <p className="body-sm mt-3">
              {products.length} result{products.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>
      </div>

      <div className="container py-10">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden inline-flex items-center gap-2 px-4 h-10 border border-[var(--color-divider-strong)] text-[11px] uppercase tracking-[1.5px] font-semibold hover:bg-[var(--color-paper-soft)] transition-colors"
              onClick={() => setMobileFilterOpen(true)}
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>
            <p className="text-[12px] uppercase tracking-[1.5px] text-[var(--color-ink-muted)]">
              <span className="font-semibold text-[var(--color-ink)]">{products.length}</span> products
            </p>
          </div>
          <SortDropdown value={sort} onChange={setSort} />
        </div>

        {/* Content layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 items-start">
          {/* Filter sidebar */}
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            isMobileOpen={mobileFilterOpen}
            onMobileClose={() => setMobileFilterOpen(false)}
          />

          {/* Grid */}
          <ProductGrid products={products} columns={3} />
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
