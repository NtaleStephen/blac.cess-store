'use client';

import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, ShoppingBag, Heart, Share2, Star, Truck, RefreshCw, Shield, Check } from 'lucide-react';
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
  const [selectedSize, setSelectedSize]   = useState('');
  const [quantity, setQuantity]           = useState(1);
  const [activeTab, setActiveTab]         = useState('Description');
  const [wishlisted, setWishlisted]       = useState(false);
  const [added, setAdded]                 = useState(false);
  const [sizeError, setSizeError]         = useState(false);
  const { addItem } = useCart();

  if (!product) notFound();

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: `${product.id}-${selectedColor}-${selectedSize}-${Date.now()}-${i}`,
        productId: product.id,
        name:     product.name,
        image:    product.image,
        price:    product.price,
        quantity: 1,
        color:    selectedColor,
        size:     selectedSize,
        category: product.category,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const related  = getRelatedProducts(product);
  const reviews  = mockReviews.filter((r) => r.productId === product.id);
  const avgRating = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : product.rating;

  const tabContent: Record<string, React.ReactNode> = {
    Description: (
      <div>
        <p className="leading-relaxed mb-4" style={{ fontSize: '14px', color: 'rgba(42,42,42,0.7)' }}>{product.description}</p>
        <p className="leading-relaxed" style={{ fontSize: '14px', color: 'rgba(42,42,42,0.7)' }}>
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
          <div key={label} className="flex gap-4 pb-3" style={{ borderBottom: '1px solid rgba(42,42,42,0.07)' }}>
            <span className="text-sm w-24 flex-shrink-0" style={{ color: 'rgba(42,42,42,0.5)' }}>{label}</span>
            <span className="text-sm capitalize" style={{ color: '#2A2A2A' }}>{value}</span>
          </div>
        ))}
      </div>
    ),
    Shipping: (
      <div className="space-y-4">
        {[
          { icon: Truck,     title: 'Free shipping on orders over $200', desc: 'Standard: 5-7 business days' },
          { icon: RefreshCw, title: '30-day returns',                     desc: 'Unworn items in original packaging' },
          { icon: Shield,    title: 'Authenticity guaranteed',            desc: 'Every piece is verified by our team' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-3">
            <div
              className="rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ width: 40, height: 40, background: 'rgba(212,165,116,0.1)', border: '1px solid rgba(212,165,116,0.2)' }}
            >
              <Icon size={16} style={{ color: '#D4A574' }} />
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: '#2A2A2A' }}>{title}</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(42,42,42,0.55)' }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  };

  return (
    <div className="min-h-screen" style={{ background: '#F5F1EB', paddingTop: 72 }}>
      <div className="container py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8" style={{ fontSize: '11px', color: 'rgba(42,42,42,0.5)' }}>
          <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link href="/shop" className="hover:text-brand-gold transition-colors">Shop</Link>
          <ChevronRight size={10} />
          <Link href={`/shop/${product.category}`} className="hover:text-brand-gold transition-colors capitalize">
            {product.category.replace(/-/g, ' ')}
          </Link>
          <ChevronRight size={10} />
          <span style={{ color: '#2A2A2A' }}>{product.name}</span>
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
                  className="inline-block text-white font-bold uppercase mb-3 px-3 py-1 rounded"
                  style={{ background: '#D4A574', letterSpacing: '1.5px', fontSize: '10px' }}
                >
                  New Arrival
                </span>
              )}
              <h1
                className="font-serif mb-3"
                style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 600, color: '#2A2A2A', lineHeight: 1.2 }}
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
                      style={{
                        color: star <= Math.round(avgRating) ? '#D4A574' : 'rgba(42,42,42,0.2)',
                        fill:  star <= Math.round(avgRating) ? '#D4A574' : 'rgba(42,42,42,0.2)',
                      }}
                    />
                  ))}
                </div>
                <span className="text-sm" style={{ color: 'rgba(42,42,42,0.6)' }}>
                  {avgRating.toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="font-serif font-bold" style={{ fontSize: '30px', color: '#2A2A2A' }}>
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="line-through text-lg" style={{ color: 'rgba(42,42,42,0.4)' }}>
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Color selector */}
            {product.colors.length > 0 && (
              <div className="mb-5">
                <p className="font-semibold uppercase mb-3" style={{ letterSpacing: '1.5px', fontSize: '11px', color: '#2A2A2A' }}>
                  Color: <span className="font-normal normal-case" style={{ letterSpacing: 0, color: '#D4A574' }}>{selectedColor}</span>
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
                <p className="font-semibold uppercase" style={{ letterSpacing: '1.5px', fontSize: '11px', color: '#2A2A2A' }}>
                  Size: <span className="font-normal normal-case" style={{ letterSpacing: 0, color: selectedSize ? '#D4A574' : 'rgba(42,42,42,0.5)' }}>
                    {selectedSize || 'Select a size'}
                  </span>
                  {sizeError && <span className="ml-2 font-normal normal-case" style={{ fontSize: '11px', letterSpacing: 0, color: '#DC2626' }}>— required</span>}
                </p>
                <button className="text-xs hover:underline" style={{ color: '#D4A574', fontSize: '11px' }}>
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
                      background: selectedSize === s.size ? '#2A2A2A' : '#FFFFFF',
                      border: `1.5px solid ${selectedSize === s.size ? '#2A2A2A' : 'rgba(42,42,42,0.18)'}`,
                      color: !s.available ? 'rgba(42,42,42,0.25)' : selectedSize === s.size ? '#FFFFFF' : '#2A2A2A',
                      cursor: s.available ? 'pointer' : 'not-allowed',
                      opacity: s.available ? 1 : 0.45,
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
              <p className="font-semibold uppercase mb-3" style={{ letterSpacing: '1.5px', fontSize: '11px', color: '#2A2A2A' }}>
                Quantity
              </p>
              <div className="flex items-center rounded-lg overflow-hidden inline-flex" style={{ border: '1.5px solid rgba(42,42,42,0.15)' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 transition-colors duration-200 hover:bg-gray-50"
                  style={{ fontSize: '18px', lineHeight: 1, minWidth: '44px', color: '#2A2A2A' }}
                >
                  −
                </button>
                <span
                  className="px-6 py-3 font-semibold text-sm text-center"
                  style={{ borderLeft: '1.5px solid rgba(42,42,42,0.1)', borderRight: '1.5px solid rgba(42,42,42,0.1)', minWidth: '56px', color: '#2A2A2A' }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  className="px-4 py-3 transition-colors duration-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ fontSize: '18px', lineHeight: 1, minWidth: '44px', color: '#2A2A2A' }}
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
                <p className="text-xs mt-2" style={{ color: 'rgba(42,42,42,0.45)' }}>
                  {product.stock} in stock
                </p>
              )}
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                className={`btn flex-1 ${added ? 'btn-gold' : ''}`}
                style={{ fontSize: '12px', letterSpacing: '1.5px' }}
              >
                {added ? <Check size={15} /> : <ShoppingBag size={15} />}
                {added ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className="btn-icon"
                aria-label="Wishlist"
              >
                <Heart
                  size={18}
                  style={{
                    color: wishlisted ? '#ef4444' : '#2A2A2A',
                    fill:  wishlisted ? '#ef4444' : 'none',
                  }}
                />
              </button>
              <button className="btn-icon" aria-label="Share">
                <Share2 size={18} style={{ color: '#2A2A2A' }} />
              </button>
            </div>

            {/* Trust badges */}
            <div
              className="rounded-xl p-4 flex items-center justify-around"
              style={{ background: '#FFFFFF', border: '1px solid rgba(42,42,42,0.08)' }}
            >
              {[
                { icon: Truck,     label: 'Free Shipping' },
                { icon: RefreshCw, label: '30-Day Returns' },
                { icon: Shield,    label: 'Authentic' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1 text-center">
                  <Icon size={16} style={{ color: '#D4A574' }} />
                  <span style={{ fontSize: '10px', color: 'rgba(42,42,42,0.6)' }}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mb-20">
          <div className="flex gap-0 mb-8" style={{ borderBottom: '2px solid rgba(42,42,42,0.08)' }}>
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-3 text-sm font-semibold transition-all duration-200 relative"
                style={{
                  color: activeTab === tab ? '#D4A574' : 'rgba(42,42,42,0.5)',
                  borderBottom: activeTab === tab ? '2px solid #D4A574' : '2px solid transparent',
                  marginBottom: '-2px',
                  letterSpacing: '0.5px',
                  background: 'none',
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

        {/* Reviews */}
        <div className="mb-20">
          <h2 className="font-serif mb-8" style={{ fontSize: '28px', fontWeight: 600, color: '#2A2A2A' }}>
            Customer Reviews
          </h2>
          {reviews.length === 0 ? (
            <p className="text-sm" style={{ color: 'rgba(42,42,42,0.5)' }}>No reviews yet. Be the first to review this product.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-xl p-5"
                  style={{ background: '#FFFFFF', boxShadow: '0 1px 4px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)' }}
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
                        <p className="font-semibold text-sm" style={{ color: '#2A2A2A' }}>{review.userName}</p>
                        {review.verified && (
                          <p style={{ color: '#2E7D32', fontSize: '10px' }}>✓ Verified Purchase</p>
                        )}
                      </div>
                    </div>
                    <span className="text-xs" style={{ color: 'rgba(42,42,42,0.4)' }}>{formatDate(review.date)}</span>
                  </div>
                  <div className="flex items-center gap-0.5 mb-2">
                    {[1,2,3,4,5].map((star) => (
                      <Star
                        key={star}
                        size={11}
                        style={{
                          color: star <= review.rating ? '#D4A574' : 'rgba(42,42,42,0.2)',
                          fill:  star <= review.rating ? '#D4A574' : 'rgba(42,42,42,0.2)',
                        }}
                      />
                    ))}
                  </div>
                  <p className="font-semibold text-sm mb-1" style={{ color: '#2A2A2A' }}>{review.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(42,42,42,0.6)' }}>{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="font-serif mb-8" style={{ fontSize: '28px', fontWeight: 600, color: '#2A2A2A' }}>
              You May Also Like
            </h2>
            <ProductGrid products={related} columns={4} />
          </div>
        )}
      </div>
    </div>
  );
}
