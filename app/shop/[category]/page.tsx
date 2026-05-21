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

const CATEGORY_META: Record<string, { title: string; description: string }> = {
  'crop-tops': {
    title: 'Crop Tops',
    description: 'Cultural artistry meets contemporary silhouettes. Premium crop tops with African-inspired embroidery and motifs.',
  },
  sweatpants: {
    title: 'Sweatpants',
    description: 'Luxury comfort redefined. Heavyweight French terry lounge pants with crown and cultural emblems.',
  },
  hoodies: {
    title: 'Hoodies',
    description: 'Statement outerwear rooted in heritage. Premium hoodies with detailed cultural embroidery and royal motifs.',
  },
};

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
    default: result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
  }
  return result;
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sort, setSort] = useState('newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const meta = CATEGORY_META[params.category] ?? { title: params.category.replace(/-/g, ' '), description: '' };

  const products = useMemo(() => {
    let result = mockProducts.filter((p) => p.category === params.category);

    if (filters.colors.length > 0) {
      result = result.filter((p) => p.colors.some((c) => filters.colors.includes(c.name)));
    }
    if (filters.sizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => filters.sizes.includes(s.size) && s.available));
    }
    result = result.filter((p) => p.price >= filters.priceMin && p.price <= filters.priceMax);

    return applySort(result, sort);
  }, [params.category, filters, sort]);

  return (
    <div className="bg-brand-cream min-h-screen" style={{ paddingTop: '72px' }}>
      {/* Header */}
      <div
        className="border-b"
        style={{ borderColor: 'rgba(212,165,116,0.15)', background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(10px)' }}
      >
        <div className="container py-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-brand-charcoal/50 mb-4" style={{ fontSize: '11px' }}>
            <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link href="/shop" className="hover:text-brand-gold transition-colors">Shop</Link>
            <ChevronRight size={10} />
            <span className="text-brand-gold capitalize">{meta.title}</span>
          </div>

          <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-2" style={{ letterSpacing: '3px' }}>
            Collection
          </p>
          <h1
            className="text-brand-charcoal mb-3"
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 600 }}
          >
            {meta.title}
          </h1>
          <p className="text-brand-charcoal/60 text-sm max-w-xl">{meta.description}</p>
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
          {/* Filter sidebar - desktop only */}
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
