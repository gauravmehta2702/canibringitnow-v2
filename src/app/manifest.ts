import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Can I Bring It Now',
    short_name: 'Bring It?',
    description: 'Check airline baggage, airport security and customs rules before you fly.',
    start_url: '/?source=pwa',
    scope: '/',
    display: 'standalone',
    background_color: '#f8fbff',
    theme_color: '#2563eb',
    orientation: 'portrait-primary',
    categories: ['travel', 'utilities', 'productivity'],
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Open Travel Rule Matrix',
        short_name: 'Matrix',
        description: 'Check an item, airline and destination.',
        url: '/check/',
        icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }],
      },
      {
        name: 'Search travel rules',
        short_name: 'Search',
        description: 'Search for power banks, medication, liquids, food and more.',
        url: '/search/',
        icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }],
      },
    ],
  };
}
