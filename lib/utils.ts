import type { Product } from '@/types';

export function applySort(products: Product[], sort: string): Product[] {
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

export const formatPrice = (price: number): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

export const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export const cn = (...classes: (string | undefined | null | false)[]): string =>
  classes.filter(Boolean).join(' ');

export const truncate = (str: string, length: number): string =>
  str.length > length ? str.substring(0, length) + '...' : str;
