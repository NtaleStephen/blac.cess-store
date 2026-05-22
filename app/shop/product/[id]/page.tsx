'use client';

import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, ShoppingBag, Heart, Share2, Star, Truck, RefreshCw, Shield, Check, Minus, Plus } from 'lucide-react';
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

  const related   = getRelatedProducts(product);
  const reviews   = mockReviews.filter((r) => r.productId === product.id);
  const avgRating = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : product.rating;

  const tabContent: Record<string, React.ReactNode> = {
    Description: (
      <div className="space-y-4 body">
        <p>{product.description}</p>
        <p>
          Each BLAC.CESS piece is crafted with intention — honoring the rich heritage of African
          artistry while embracing modern minimalist design. Premium materials, exceptional fit,
          and cultural significance in every stitch.
        </p>
      </div>
    ),
    Details: (
      <dl className="divide-y divide-[var(--color-divider)] border-y border-[var(--color-divider)]">
        {[
          ['Material', '95% Premium French Terry, 5% Elastane'],
          ['Origin',   'Artisan crafted'],
          ['Care',     'Cold wash, hang dry, do not bleach'],
          ['Fit',      'True to size — see size guide'],
          ['Category', product.category.replace(/-/g, ' ')],
        ].map(([label, value]) => (
          <div key={label} className="flex gap-6 py-4">
            <dt className="text-[11px] uppercase tracking-[1.5px] w-32 flex-shrink-0 text-[var(--color-ink-muted)]">
              {label}
            </dt>
            <dd className="text-[14px] capitalize text-[var(--color-ink)]">{value}</dd>
          </div>
        ))}
      </dl>
    ),
    Shipping: (
      <div className="space-y-5">
        {[
          { icon: Truck,     title: 'Complimentary shipping on orders over $200', desc: 'Standard: 5–7 business days' },
          { icon: RefreshCw, title: '30-day returns',                              desc: 'Unworn items in original packaging' },
          { icon: Shield,    title: 'Authenticity guaranteed',                     desc: 'Every piece is verified by our team' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-4">
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 border border-[var(--color-divider-strong)]">
              <Icon size={16} className="text-[var(--color-accent)]" />
            </div>
            <div>
              <p className="font-semibold text-[14px] text-[var(--color-ink)]">{title}</p>
              <p className="text-[12px] mt-1 text-[var(--color-ink-muted)]">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  };

  return (
    <div className="min-h-screen pt-[72px]">
      <div className="container py-10">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 mb-10 text-[11px] uppercase tracking-[1.5px] text-[var(--color-ink-muted)]"
        >
          <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link href="/shop" className="hover:text-[var(--color-accent)] transition-colors">Shop</Link>
          <ChevronRight size={10} />
          <Link
            href={`/shop/${product.category}`}
            className="hover:text-[var(--color-accent)] transition-colors capitalize"
          >
            {product.category.replace(/-/g, ' ')}
          </Link>
          <ChevronRight size={10} />
          <span className="text-[var(--color-ink)]">{product.name}</span>
        </nav>

        {/* Main product section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24">
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
            <div className="mb-8">
              {product.isNew && (
                <span className="badge badge-new mb-4">New Arrival</span>
              )}
              <h1 className="heading-xl mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      style={{
                        color: star <= Math.round(avgRating) ? 'var(--color-accent)' : 'var(--color-divider-strong)',
                        fill:  star <= Math.round(avgRating) ? 'var(--color-accent)' : 'var(--color-divider-strong)',
                      }}
                    />
                  ))}
                </div>
                <span className="text-[13px] text-[var(--color-ink-muted)]">
                  {avgRating.toFixed(1)} · {product.reviewCount} reviews
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-serif font-bold text-[32px] text-[var(--color-ink)]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="line-through text-[16px] text-[var(--color-ink-faint)]">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Color selector */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <p className="text-[11px] font-semibold uppercase tracking-[1.5px] mb-3 text-[var(--color-ink)]">
                  Color: <span className="font-normal normal-case tracking-normal text-[var(--color-accent)]">{selectedColor}</span>
                </p>
                <div className="flex items-center gap-3">
                  {product.colors.map((color) => {
                    const active = selectedColor === color.name;
                    return (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        title={color.name}
                        className="rounded-full transition-transform"
                        style={{
                          width: 30,
                          height: 30,
                          background: color.hex,
                          border: active ? '1.5px solid var(--color-ink)' : '1px solid var(--color-divider-strong)',
                          outline: active ? '2px solid var(--color-paper)' : 'none',
                          outlineOffset: -4,
                          transform: active ? 'scale(1.12)' : 'scale(1)',
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[var(--color-ink)]">
                  Size:{' '}
                  <span
                    className="font-normal normal-case tracking-normal"
                    style={{ color: selectedSize ? 'var(--color-accent)' : 'var(--color-ink-muted)' }}
                  >
                    {selectedSize || 'Select a size'}
                  </span>
                  {sizeError && (
                    <span className="ml-2 font-normal normal-case tracking-normal text-[var(--color-danger)]">
                      — required
                    </span>
                  )}
                </p>
                <button className="text-[11px] uppercase tracking-[1px] hover:underline text-[var(--color-accent)]">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => {
                  const active = selectedSize === s.size;
                  return (
                    <button
                      key={s.size}
                      onClick={() => { if (s.available) { setSelectedSize(s.size); setSizeError(false); } }}
                      disabled={!s.available}
                      className="min-w-[48px] h-12 px-4 text-[13px] font-semibold transition-all"
                      style={{
                        background: active ? 'var(--color-ink)' : 'var(--color-surface)',
                        border: `1px solid ${active ? 'var(--color-ink)' : 'var(--color-divider-strong)'}`,
                        color: !s.available ? 'var(--color-ink-faint)' : active ? '#FFFFFF' : 'var(--color-ink)',
                        cursor: s.available ? 'pointer' : 'not-allowed',
                        opacity: s.available ? 1 : 0.45,
                        textDecoration: !s.available ? 'line-through' : 'none',
                      }}
                    >
                      {s.size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <p className="text-[11px] font-semibold uppercase tracking-[1.5px] mb-3 text-[var(--color-ink)]">
                Quantity
              </p>
              <div className="inline-flex items-center border border-[var(--color-divider-strong)]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 inline-flex items-center justify-center text-[var(--color-ink)] hover:bg-[var(--color-paper-soft)] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="w-14 h-12 inline-flex items-center justify-center text-[14px] font-semibold border-x border-[var(--color-divider-strong)]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  className="w-12 h-12 inline-flex items-center justify-center text-[var(--color-ink)] hover:bg-[var(--color-paper-soft)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
              <p className="text-[12px] mt-2 text-[var(--color-ink-muted)]">
                {quantity >= product.stock
                  ? `Maximum quantity (${product.stock} in stock)`
                  : `${product.stock} in stock`}
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className={`btn flex-1 ${added ? 'btn-gold' : ''}`}
              >
                {added ? <Check size={14} /> : <ShoppingBag size={14} />}
                {added ? 'Added to Cart' : 'Add to Cart'}
              </button>
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className="icon-btn h-[50px] w-[50px]"
                aria-label="Wishlist"
              >
                <Heart
                  size={16}
                  style={{
                    color: wishlisted ? 'var(--color-danger)' : 'currentColor',
                    fill:  wishlisted ? 'var(--color-danger)' : 'none',
                  }}
                />
              </button>
              <button className="icon-btn h-[50px] w-[50px]" aria-label="Share">
                <Share2 size={16} />
              </button>
            </div>

            {/* Trust strip */}
            <div className="grid grid-cols-3 border border-[var(--color-divider)] divide-x divide-[var(--color-divider)]">
              {[
                { icon: Truck,     label: 'Free Shipping' },
                { icon: RefreshCw, label: '30-Day Returns' },
                { icon: Shield,    label: 'Authentic' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 py-4 text-center">
                  <Icon size={16} className="text-[var(--color-accent)]" />
                  <span className="text-[10px] uppercase tracking-[1.5px] text-[var(--color-ink-muted)]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mb-24">
          <div className="flex gap-0 mb-10 border-b border-[var(--color-divider)]">
            {TABS.map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-6 py-4 text-[11px] uppercase tracking-[1.5px] font-semibold transition-colors relative"
                  style={{
                    color: active ? 'var(--color-ink)' : 'var(--color-ink-muted)',
                    borderBottom: active ? '1.5px solid var(--color-ink)' : '1.5px solid transparent',
                    marginBottom: '-1.5px',
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>
          <div className="max-w-2xl">{tabContent[activeTab]}</div>
        </div>

        {/* Reviews */}
        <div className="mb-24">
          <header className="mb-10">
            <span className="eyebrow">Verified Customer Voices</span>
            <h2 className="heading-lg">Customer Reviews</h2>
          </header>

          {reviews.length === 0 ? (
            <p className="body-sm">No reviews yet. Be the first to review this piece.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-divider)] border border-[var(--color-divider)]">
              {reviews.map((review) => (
                <article key={review.id} className="p-7 bg-[var(--color-surface)]">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-[14px] bg-[var(--color-accent)]">
                        {review.userName[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-[14px] text-[var(--color-ink)]">{review.userName}</p>
                        {review.verified && (
                          <p className="text-[10px] uppercase tracking-[1px] text-[var(--color-success)]">
                            ✓ Verified Purchase
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="text-[11px] text-[var(--color-ink-muted)]">{formatDate(review.date)}</span>
                  </div>
                  <div className="flex items-center gap-0.5 mb-3">
                    {[1,2,3,4,5].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        style={{
                          color: star <= review.rating ? 'var(--color-accent)' : 'var(--color-divider-strong)',
                          fill:  star <= review.rating ? 'var(--color-accent)' : 'var(--color-divider-strong)',
                        }}
                      />
                    ))}
                  </div>
                  <p className="font-serif font-semibold text-[15px] mb-2 text-[var(--color-ink)]">{review.title}</p>
                  <p className="body-sm">{review.comment}</p>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <header className="mb-10 text-center">
              <span className="eyebrow">Pairs Well With</span>
              <h2 className="heading-lg">You May Also Like</h2>
            </header>
            <ProductGrid products={related} columns={4} />
          </div>
        )}
      </div>
    </div>
  );
}
