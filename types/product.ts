export type Category = 'crop-tops' | 'sweatpants' | 'hoodies' | 'shirts';

export interface FilterState {
  categories: string[];
  sizes: string[];
  colors: string[];
  priceMin: number;
  priceMax: number;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSize {
  size: string;
  available: boolean;
}

export interface ProductVariant {
  id: string;
  color: string;
  size: string;
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: Category;
  image: string;
  images: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  stock: number;
  featured: boolean;
  isNew: boolean;
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  tags: string[];
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  date: string;
}
