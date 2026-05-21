'use client';

import { useState, useMemo } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { mockProducts } from '@/lib/mock-data';
import { Product } from '@/types';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import FilterPanel from '@/components/Filters/FilterPanel';
import SortDropdown from '@/components/Filters/SortDropdown';

interface FilterState {
  categories: string[];
  sizes: string[];
  colors: string[];
  priceMin: number;
  priceMax: number;
}

const DEFAULT_FILTERS: FilterState = { categories: [], sizes: [], colors: [], priceMin: 0, priceMax: 500 };

function applySort(products: Product[], sort: string): Product[] {
  const result = [...products];
  switch (sort) {
    case 'price-asc': result.sort((a, b) => a.price - b.price); break;
    case 'price-desc': result.sort((a, b) => b.price - a.price); break;
    case 'rating': result.sort((a, b) => b.rating - a.rating); break;
    case 'popular': result.sort((a, b) => b.reviewCount - a.reviewCount); break;
    default: break;
  }
  return result;
}

export default function NewArrivalsPage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sort, setSort] = useState('newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const products = useMemo(() => {
    let result = mockProducts.filter((p) => p.isNew);

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }
    if (filters.colors.length > 0) {
      result = result.filter((p) => p.colors.some((c) => filters.colors.includes(c.name)));
    }
    if (filters.sizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => filters.sizes.includes(s.size) && s.available));
    }
    result = result.filter((p) => p.price >= filters.priceMin && p.price <= filters.priceMax);

    return applySort(result, sort);
  }, [filters, sort]);

  return (
    <div className="bg-brand-cream min-h-screen" style={{ paddingTop: '72px' }}>
      {/* Header */}
      <div className="page-header">
        <div className="container py-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-brand-charcoal/45 mb-5" style={{ fontSize: '11px' }}>
            <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link href="/shop" className="hover:text-brand-gold transition-colors">Shop</Link>
            <ChevronRight size={10} />
            <span className="text-brand-gold" aria-current="page">New Arrivals</span>
          </nav>

          <span className="section-label">Just Dropped</span>
          <h1 className="page-title mb-3">New Arrivals</h1>
          <p className="text-brand-charcoal/55 text-sm max-w-xl leading-relaxed">
            The latest additions to the BLAC.CESS collection. Fresh drops rooted in cultural heritage
            and modern minimalist design — be the first to wear them.
          </p>
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

        <div className="flex gap-8">
          <div className="hidden lg:block w-60 flex-shrink-0">
            <FilterPanel
              filters={filters}
              onChange={setFilters}
              isMobileOpen={mobileFilterOpen}
              onMobileClose={() => setMobileFilterOpen(false)}
            />
          </div>
          <div className="flex-1 min-w-0">
            <ProductGrid products={products} columns={3} />
          </div>
        </div>
      </div>
    </div>
  );
}
