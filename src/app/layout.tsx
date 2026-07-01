import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Can I Bring It Now? Travel Rules Checker',
  description: 'Check airline baggage, airport security and customs rules for power banks, liquids, food, medication, baby items and more.',
  metadataBase: new URL('https://canibringitnow.com'),
  openGraph: {
    title: 'Can I Bring It Now?',
    description: 'Know what you can bring before you fly.',
    url: 'https://canibringitnow.com',
    siteName: 'Can I Bring It Now',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
