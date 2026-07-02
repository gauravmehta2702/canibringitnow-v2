'use client';

import { useEffect, useState } from 'react';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

export default function PWARegister() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
          // Service worker registration should never block the site.
        });
      });
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  if (!installPrompt || dismissed) return null;

  async function handleInstall() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    setInstallPrompt(null);
  }

  return (
    <div className="fixed inset-x-4 bottom-20 z-50 rounded-3xl bg-slate-950 p-4 text-white shadow-2xl ring-1 ring-white/10 md:hidden">
      <p className="font-bold">Add Can I Bring It Now to your phone</p>
      <p className="mt-1 text-sm text-slate-300">Open it like an app before every trip.</p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={handleInstall}
          className="rounded-2xl bg-brand-600 px-4 py-2 text-sm font-bold text-white"
        >
          Add app
        </button>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-bold text-white"
        >
          Later
        </button>
      </div>
    </div>
  );
}
