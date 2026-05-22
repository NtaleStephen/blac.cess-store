import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navigation from '@/components/Header/Navigation';
import Footer from '@/components/Footer/Footer';
import { CartProvider } from '@/context/CartContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#D4A574',
};

export const metadata: Metadata = {
  title: {
    default: 'blac.cess | Cultural Luxury in Every Thread',
    template: '%s | blac.cess',
  },
  description: 'Premium luxury clothing celebrating African heritage. Shop crop tops, sweatpants, and hoodies crafted with cultural artistry.',
  keywords: ['luxury fashion', 'African heritage', 'crop tops', 'sweatpants', 'hoodies', 'cultural clothing'],
  openGraph: {
    title: 'blac.cess | Cultural Luxury in Every Thread',
    description: 'Premium luxury clothing celebrating African heritage.',
    type: 'website',
    siteName: 'blac.cess',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'blac.cess | Cultural Luxury in Every Thread',
    description: 'Premium luxury clothing celebrating African heritage.',
  },
  robots: {
    index: true,
    follow: true,
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
      <body>
        <CartProvider>
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <Navigation />
          <main id="main-content">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
