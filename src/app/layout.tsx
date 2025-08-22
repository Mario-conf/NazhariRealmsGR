import type { Metadata } from 'next';
import { PT_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/lib/site-config';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
});
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    template: `%s | ${siteConfig.name}`,
    default: `${siteConfig.name} - Tu Club de Senderismo en Granada`,
  },
  description: 'Descubre rutas de senderismo increíbles en Granada y Sierra Nevada. Únete a nuestra comunidad de aventureros y explora la naturaleza con seguridad.',
  keywords: ['senderismo Granada', 'club de senderismo', 'rutas Sierra Nevada', 'montañismo Andalucía', 'excursiones naturaleza', 'grupo de montaña'],
  openGraph: {
    title: `${siteConfig.name} - Tu Club de Senderismo en Granada`,
    description: 'Descubre rutas de senderismo increíbles en Granada y Sierra Nevada. Únete a nuestra comunidad de aventureros y explora la naturaleza con seguridad.',
    url: APP_URL,
    siteName: siteConfig.name,
    images: [
      {
        url: '/opengraph-image.jpg', // Ruta en la carpeta /public
        width: 1200,
        height: 630,
        alt: 'Paisaje de montaña épico en Sierra Nevada',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - Tu Club de Senderismo en Granada`,
    description: 'Descubre rutas de senderismo increíbles en Granada y Sierra Nevada. Únete a nuestra comunidad de aventureros y explora la naturaleza con seguridad.',
    images: ['/twitter-image.jpg'], // Ruta en la carpeta /public
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
    languages: {
      'es': '/es',
      'en': '/en',
      'de': '/de',
      'it': '/it',
      'fr': '/fr',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${ptSans.variable} ${playfair.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
