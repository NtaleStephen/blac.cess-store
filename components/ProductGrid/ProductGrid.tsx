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
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';

  if (products.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-brand-charcoal/50 text-sm">No products found.</p>
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
