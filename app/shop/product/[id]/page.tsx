'use client';

import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, ShoppingBag, Heart, Share2, Star, Truck, RefreshCw, Shield } from 'lucide-react';
import { getProductById, getRelatedProducts, mockReviews } from '@/lib/mock-data';
import { formatPrice, formatDate } from '@/lib/utils';
import ImageGallery from '@/components/Gallery/ImageGallery';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import { fadeInUp } from '@/lib/animations';
import { useCart } from '@/context/CartContext';

const TABS = ['Description', 'Details', 'Shipping'];

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProductById(id);

  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name ?? '');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Description');
  const [wishlisted, setWishlisted] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const { addItem } = useCart();

  if (!product) notFound();

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addItem({
      id: `${product.id}-${selectedColor}-${selectedSize}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity,
      color: selectedColor,
      size: selectedSize,
      category: product.category,
    });
  };

  const related = getRelatedProducts(product);
  const reviews = mockReviews.filter((r) => r.productId === product.id);
  const avgRating = reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : product.rating;

  const tabContent: Record<string, React.ReactNode> = {
    Description: (
      <div>
        <p className="text-brand-charcoal/70 leading-relaxed mb-4" style={{ fontSize: '14px' }}>{product.description}</p>
        <p className="text-brand-charcoal/70 leading-relaxed" style={{ fontSize: '14px' }}>
          Each BLAC.CESS piece is crafted with intention — honoring the rich heritage of African artistry while
          embracing modern minimalist design. Premium materials, exceptional fit, and cultural significance
          in every stitch.
        </p>
      </div>
    ),
    Details: (
      <div className="space-y-3">
        {[
          ['Material', '95% Premium French Terry, 5% Elastane'],
          ['Origin', 'Artisan crafted'],
          ['Care', 'Cold wash, hang dry, do not bleach'],
          ['Fit', 'True to size — see size guide'],
          ['Category', product.category.replace(/-/g, ' ')],
        ].map(([label, value]) => (
          <div key={label} className="flex gap-4" style={{ borderBottom: '1px solid rgba(212,165,116,0.1)', paddingBottom: '12px' }}>
            <span className="text-brand-charcoal/50 text-sm w-24 flex-shrink-0">{label}</span>
            <span className="text-brand-charcoal text-sm capitalize">{value}</span>
          </div>
        ))}
      </div>
    ),
    Shipping: (
      <div className="space-y-4">
        {[
          { icon: Truck, title: 'Free shipping on orders over $200', desc: 'Standard: 5-7 business days' },
          { icon: RefreshCw, title: '30-day returns', desc: 'Unworn items in original packaging' },
          { icon: Shield, title: 'Authenticity guaranteed', desc: 'Every piece is verified by our team' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-3">
            <div className="glass-btn-icon flex-shrink-0" style={{ background: 'rgba(212,165,116,0.1)', minWidth: '40px', minHeight: '40px' }}>
              <Icon size={16} className="text-brand-gold" />
            </div>
            <div>
              <p className="text-brand-charcoal font-semibold text-sm">{title}</p>
              <p className="text-brand-charcoal/55 text-xs mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  };

  return (
    <div className="bg-brand-cream min-h-screen" style={{ paddingTop: '72px' }}>
      <div className="container py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-xs text-brand-charcoal/50" style={{ fontSize: '11px' }}>
          <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link href="/shop" className="hover:text-brand-gold transition-colors">Shop</Link>
          <ChevronRight size={10} />
          <Link href={`/shop/${product.category}`} className="hover:text-brand-gold transition-colors capitalize">
            {product.category.replace(/-/g, ' ')}
          </Link>
          <ChevronRight size={10} />
          <span className="text-brand-charcoal/70">{product.name}</span>
        </div>

        {/* Main product section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image gallery */}
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <ImageGallery images={product.images} alt={product.name} />
          </motion.div>

          {/* Product info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Header */}
            <div className="mb-6">
              {product.isNew && (
                <span
                  className="inline-block text-white font-bold uppercase mb-3 px-3 py-1 rounded-full text-xs"
                  style={{ background: 'rgba(212,165,116,0.9)', letterSpacing: '1.5px', fontSize: '10px' }}
                >
                  New Arrival
                </span>
              )}
              <h1
                className="text-brand-charcoal mb-3"
                style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 600, lineHeight: 1.2 }}
              >
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={star <= Math.round(avgRating) ? 'text-brand-gold fill-brand-gold' : 'text-brand-charcoal/20'}
                    />
                  ))}
                </div>
                <span className="text-sm text-brand-charcoal/60">
                  {avgRating.toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span
                  className="font-bold"
                  style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', color: '#D4A574' }}
                >
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-brand-charcoal/40 line-through text-lg">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Color selector */}
            {product.colors.length > 0 && (
              <div className="mb-5">
                <p className="text-brand-charcoal font-semibold text-sm mb-3 uppercase tracking-wider" style={{ letterSpacing: '1.5px', fontSize: '11px' }}>
                  Color: <span className="text-brand-gold normal-case tracking-normal" style={{ letterSpacing: '0' }}>{selectedColor}</span>
                </p>
                <div className="flex items-center gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      title={color.name}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: color.hex,
                        border: selectedColor === color.name ? '2.5px solid #D4A574' : '2px solid rgba(42,42,42,0.2)',
                        boxShadow: selectedColor === color.name ? '0 0 0 3px rgba(212,165,116,0.2)' : 'none',
                        transform: selectedColor === color.name ? 'scale(1.15)' : 'scale(1)',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size selector */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-brand-charcoal font-semibold text-sm uppercase tracking-wider" style={{ letterSpacing: '1.5px', fontSize: '11px' }}>
                  Size: <span className="text-brand-gold normal-case" style={{ letterSpacing: '0' }}>{selectedSize || 'Select a size'}</span>
                  {sizeError && <span className="ml-2 text-red-500 font-normal normal-case" style={{ fontSize: '11px', letterSpacing: 0 }}>— required</span>}
                </p>
                <button className="text-brand-gold text-xs hover:underline" style={{ fontSize: '11px' }}>
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    onClick={() => { if (s.available) { setSelectedSize(s.size); setSizeError(false); } }}
                    disabled={!s.available}
                    className="px-4 py-2 rounded-lg font-semibold transition-all duration-200 text-sm"
                    style={{
                      background: selectedSize === s.size ? 'rgba(212,165,116,0.2)' : 'rgba(255,255,255,0.06)',
                      border: `1.5px solid ${selectedSize === s.size ? 'rgba(212,165,116,0.7)' : 'rgba(212,165,116,0.2)'}`,
                      color: !s.available ? 'rgba(42,42,42,0.25)' : selectedSize === s.size ? '#D4A574' : '#2A2A2A',
                      cursor: s.available ? 'pointer' : 'not-allowed',
                      opacity: s.available ? 1 : 0.5,
                      textDecoration: !s.available ? 'line-through' : 'none',
                    }}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-brand-charcoal font-semibold text-sm uppercase tracking-wider mb-3" style={{ letterSpacing: '1.5px', fontSize: '11px' }}>
                Quantity
              </p>
              <div className="flex items-center gap-0 rounded-xl overflow-hidden inline-flex" style={{ border: '1px solid rgba(212,165,116,0.25)' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-brand-charcoal transition-colors duration-200 hover:bg-brand-gold/10"
                  style={{ fontSize: '18px', lineHeight: 1, minWidth: '44px' }}
                >
                  −
                </button>
                <span className="px-6 py-3 font-semibold text-brand-charcoal text-sm border-x" style={{ borderColor: 'rgba(212,165,116,0.25)', minWidth: '56px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  className="px-4 py-3 text-brand-charcoal transition-colors duration-200 hover:bg-brand-gold/10 disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ fontSize: '18px', lineHeight: 1, minWidth: '44px' }}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              {quantity >= product.stock ? (
                <p className="text-xs mt-2 font-semibold" style={{ color: '#D4A574' }}>
                  Maximum quantity reached ({product.stock} in stock)
                </p>
              ) : (
                <p className="text-brand-charcoal/45 text-xs mt-2">
                  {product.stock} in stock
                </p>
              )}
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                className="glass-btn glass-btn-primary flex-1 flex items-center justify-center gap-2"
                style={{ fontSize: '12px', letterSpacing: '1.5px', padding: '14px' }}
              >
                <ShoppingBag size={15} />
                Add to Cart
              </button>
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className="glass-btn-icon"
                aria-label="Wishlist"
              >
                <Heart
                  size={18}
                  className={wishlisted ? 'fill-red-400 text-red-400' : 'text-brand-charcoal'}
                />
              </button>
              <button className="glass-btn-icon" aria-label="Share">
                <Share2 size={18} className="text-brand-charcoal" />
              </button>
            </div>

            {/* Trust badges */}
            <div
              className="rounded-xl p-4 flex items-center justify-around"
              style={{ background: 'rgba(212,165,116,0.05)', border: '1px solid rgba(212,165,116,0.12)' }}
            >
              {[
                { icon: Truck, label: 'Free Shipping' },
                { icon: RefreshCw, label: '30-Day Returns' },
                { icon: Shield, label: 'Authentic' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1 text-center">
                  <Icon size={16} className="text-brand-gold" />
                  <span className="text-brand-charcoal/60" style={{ fontSize: '10px' }}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs: Description / Details / Shipping */}
        <div className="mb-20">
          <div className="flex gap-0 mb-8" style={{ borderBottom: '1px solid rgba(212,165,116,0.15)' }}>
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-3 text-sm font-semibold transition-all duration-200 relative"
                style={{
                  color: activeTab === tab ? '#D4A574' : 'rgba(42,42,42,0.5)',
                  borderBottom: activeTab === tab ? '2px solid #D4A574' : '2px solid transparent',
                  marginBottom: '-1px',
                  letterSpacing: '0.5px',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="max-w-2xl">
            {tabContent[activeTab]}
          </div>
        </div>

        {/* Reviews section */}
        <div className="mb-20">
          <h2
            className="text-brand-charcoal mb-8"
            style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 600 }}
          >
            Customer Reviews
          </h2>

          {reviews.length === 0 ? (
            <p className="text-brand-charcoal/50 text-sm">No reviews yet. Be the first to review this product.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="card rounded-2xl p-5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm"
                        style={{ background: '#D4A574' }}
                      >
                        {review.userName[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-brand-charcoal text-sm">{review.userName}</p>
                        {review.verified && (
                          <p className="text-xs" style={{ color: '#388E3C', fontSize: '10px' }}>✓ Verified Purchase</p>
                        )}
                      </div>
                    </div>
                    <span className="text-brand-charcoal/40 text-xs">{formatDate(review.date)}</span>
                  </div>
                  <div className="flex items-center gap-0.5 mb-2">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} size={11} className={star <= review.rating ? 'text-brand-gold fill-brand-gold' : 'text-brand-charcoal/20'} />
                    ))}
                  </div>
                  <p className="font-semibold text-brand-charcoal text-sm mb-1">{review.title}</p>
                  <p className="text-brand-charcoal/60 text-sm leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2
              className="text-brand-charcoal mb-8"
              style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 600 }}
            >
              You May Also Like
            </h2>
            <ProductGrid products={related} columns={4} />
          </div>
        )}
      </div>
    </div>
  );
}
