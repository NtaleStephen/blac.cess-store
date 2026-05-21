export default function CategoryPage({ params }: { params: { category: string } }) {
  return (
    <div className="container py-32">
      <h1 className="text-4xl capitalize" style={{ fontFamily: 'Playfair Display, serif' }}>
        {params.category.replace(/-/g, ' ')}
      </h1>
      <p className="mt-4 text-brand-charcoal/60">Category page coming soon...</p>
    </div>
  );
}
