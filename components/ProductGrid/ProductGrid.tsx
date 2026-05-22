'use client';

import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/animations';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Product } from '@/types';

interface ProductGridProps {
  products: Product[];
  columns?: 3 | 4;
}

export default function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  const gridClass = columns === 3
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12'
    : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12';

  if (products.length === 0) {
    return (
      <div className="py-24 text-center border-y border-[var(--color-divider)]">
        <p className="text-[13px] uppercase tracking-[2px] text-[var(--color-ink-muted)]">
          No products found.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className={gridClass}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  );
}
