'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;

  return window.localStorage.getItem('cibin_cookie_consent') === 'accepted';
}

export default function TrackPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    const queryString = searchParams.toString();
    const pagePath = queryString ? `${pathname}?${queryString}` : pathname;

    // AnalyticsScripts already records the initial page load.
    // Skip this first render to prevent duplicate page_view events.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!hasAnalyticsConsent()) return;

    let attempts = 0;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const sendPageView = () => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'page_view', {
          page_path: pagePath,
          page_location: window.location.href,
          page_title: document.title,
        });

        return;
      }

      attempts += 1;

      if (attempts < 10) {
        timeoutId = setTimeout(sendPageView, 250);
      }
    };

    sendPageView();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [pathname, searchParams]);

  return null;
}