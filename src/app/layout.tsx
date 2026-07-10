import type { Metadata, Viewport } from 'next';
import MobileBottomNav from '@/components/MobileBottomNav';
import PWARegister from '@/components/PWARegister';
import AnalyticsScripts from '@/components/AnalyticsScripts';
import CookieConsent from '@/components/CookieConsent';
import SiteFooter from '@/components/SiteFooter';
import { buildOrganizationJsonLd, buildWebsiteJsonLd } from '@/lib/siteSeo';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Can I Bring It Now? Travel Rules Checker',
    template: '%s | Can I Bring It Now',
  },
  description:
    'Check airline baggage, airport security and customs rules for power banks, liquids, food, medication, baby items and more.',
  metadataBase: new URL('https://canibringitnow.com'),
  applicationName: 'Can I Bring It Now',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Can I Bring It Now',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'Can I Bring It Now?',
    description: 'Know what you can bring before you fly.',
    url: 'https://canibringitnow.com',
    siteName: 'Can I Bring It Now',
    type: 'website',
    images: [
      {
        url: '/icons/icon-512.png',
        width: 512,
        height: 512,
        alt: 'Can I Bring It Now app icon',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Can I Bring It Now?',
    description: 'Know what you can bring before you fly.',
    images: ['/icons/icon-512.png'],
  },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2563eb',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const siteSchemas = [buildOrganizationJsonLd(), buildWebsiteJsonLd()];

  return (
    <html lang="en">
      <body className="min-h-screen pb-20 antialiased md:pb-0">
        {siteSchemas.map((schema, index) => (
          <script
            key={`site-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <AnalyticsScripts />
        {children}
        <SiteFooter />
        <CookieConsent />
        <MobileBottomNav />
        <PWARegister />
      </body>
    </html>
  );
}
