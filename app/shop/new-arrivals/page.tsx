'use client';

import { useState, useMemo } from 'react';
import { SlidersHorizontal, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { mockProducts } from '@/lib/mock-data';
import { FilterState } from '@/types';
import { applySort } from '@/lib/utils';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import FilterPanel from '@/components/Filters/FilterPanel';
import SortDropdown from '@/components/Filters/SortDropdown';

const DEFAULT_FILTERS: FilterState = { categories: [], sizes: [], colors: [], priceMin: 0, priceMax: 500 };

export default function NewArrivalsPage() {
  const [filters, setFilters]                   = useState<FilterState>(DEFAULT_FILTERS);
  const [sort, setSort]                         = useState('newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const products = useMemo(() => {
    let result = mockProducts.filter((p) => p.isNew);
    if (filters.categories.length > 0) result = result.filter((p) => filters.categories.includes(p.category));
    if (filters.colors.length > 0)     result = result.filter((p) => p.colors.some((c) => filters.colors.includes(c.name)));
    if (filters.sizes.length > 0)      result = result.filter((p) => p.sizes.some((s) => filters.sizes.includes(s.size) && s.available));
    result = result.filter((p) => p.price >= filters.priceMin && p.price <= filters.priceMax);
    return applySort(result, sort);
  }, [filters, sort]);

  return (
    <div className="min-h-screen pt-[72px]">
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 mb-5 text-[11px] uppercase tracking-[1.5px] text-[var(--color-ink-muted)]"
          >
            <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link href="/shop" className="hover:text-[var(--color-accent)] transition-colors">Shop</Link>
            <ChevronRight size={10} />
            <span className="text-[var(--color-accent)]" aria-current="page">New Arrivals</span>
          </nav>
          <span className="eyebrow">Just Dropped</span>
          <h1 className="heading-xl mb-4">New Arrivals</h1>
          <p className="body max-w-xl">
            The latest additions to the blac.cess collection. Fresh drops rooted in cultural
            heritage and modern minimalist design — be the first to wear them.
          </p>
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

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 items-start">
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            isMobileOpen={mobileFilterOpen}
            onMobileClose={() => setMobileFilterOpen(false)}
          />
          <ProductGrid products={products} columns={3} />
        </div>
      </div>
    </div>
  );
}
