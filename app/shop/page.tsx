'use client';

import { useState, useMemo } from 'react';
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

function applyFilters(products: typeof mockProducts, filters: FilterState) {
  let result = [...products];
  if (filters.categories.length > 0) result = result.filter((p) => filters.categories.includes(p.category));
  if (filters.colors.length > 0) result = result.filter((p) => p.colors.some((c) => filters.colors.includes(c.name)));
  if (filters.sizes.length > 0) result = result.filter((p) => p.sizes.some((s) => filters.sizes.includes(s.size) && s.available));
  result = result.filter((p) => p.price >= filters.priceMin && p.price <= filters.priceMax);
  return result;
}

export default function ShopPage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sort, setSort] = useState('newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const products = useMemo(() => applySort(applyFilters(mockProducts, filters), sort), [filters, sort]);

  return (
    <div className="bg-brand-cream min-h-screen" style={{ paddingTop: '72px' }}>
      {/* Page header */}
      <div className="page-header">
        <div className="container py-10">
          <span className="section-label">All Products</span>
          <h1 className="page-title">Shop</h1>
        </div>
      </div>

      <div className="container py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <button
              className="glass-btn flex items-center gap-2 lg:hidden"
              style={{ fontSize: '13px', padding: '10px 16px' }}
              onClick={() => setMobileFilterOpen(true)}
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>
            <p className="text-brand-charcoal/50 text-sm">
              <span className="font-semibold text-brand-charcoal">{products.length}</span> products
            </p>
          </div>
          <SortDropdown value={sort} onChange={setSort} />
        </div>

        {/* Layout */}
        <div className="flex gap-8">
          {/* Filter sidebar - desktop only */}
          <div className="hidden lg:block w-60 flex-shrink-0">
            <FilterPanel
              filters={filters}
              onChange={setFilters}
              isMobileOpen={mobileFilterOpen}
              onMobileClose={() => setMobileFilterOpen(false)}
            />
          </div>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            <ProductGrid products={products} columns={3} />
          </div>
        </div>
      </div>
    </div>
  );
}
