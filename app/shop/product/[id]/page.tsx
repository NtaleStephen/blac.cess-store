export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container py-32">
      <h1 className="text-4xl" style={{ fontFamily: 'Playfair Display, serif' }}>Product Detail</h1>
      <p className="mt-4 text-brand-charcoal/60">Product {params.id} coming soon...</p>
    </div>
  );
}
