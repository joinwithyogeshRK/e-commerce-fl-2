import type { Metadata, Viewport } from 'next';
import { Inter_Tight, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { CartProvider, WishlistProvider } from '@/lib/cart';
import Navigation from '@/components/Navigation';
import CartDrawer from '@/components/ui/CartDrawer';
import Grain from '@/components/ui/Grain';

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
});

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ATELIER NOIR — Wear Your Style',
  description:
    'A premium fashion house for considered wardrobes. Outerwear, tailoring, footwear and accessories, presented as a cinematic campaign.',
  keywords: [
    'fashion',
    'luxury clothing',
    'premium e-commerce',
    'outerwear',
    'accessories',
  ],
  openGraph: {
    title: 'ATELIER NOIR — Wear Your Style',
    description: 'Premium fashion, presented as a cinematic campaign.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#07070b',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${interTight.variable} ${instrument.variable}`}>
      <body className="bg-ink font-sans text-bone antialiased">
        <CartProvider>
          <WishlistProvider>
            <Grain />
            <Navigation />
            <main>{children}</main>
            <CartDrawer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
