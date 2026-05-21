import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Header/Navigation';
import Footer from '@/components/Footer/Footer';

export const metadata: Metadata = {
  title: 'BLAC.CESS | Cultural Luxury in Every Thread',
  description: 'Premium luxury clothing celebrating African heritage. Shop crop tops, sweatpants, and hoodies crafted with cultural artistry.',
  keywords: 'luxury fashion, African heritage, crop tops, sweatpants, hoodies, cultural clothing',
  openGraph: {
    title: 'BLAC.CESS | Cultural Luxury in Every Thread',
    description: 'Premium luxury clothing celebrating African heritage.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-brand-cream text-brand-charcoal">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Navigation />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
