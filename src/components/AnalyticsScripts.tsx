"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

function hasAnalyticsConsent() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem("cibin_cookie_consent") === "accepted";
}

export default function AnalyticsScripts() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(hasAnalyticsConsent());

    const onConsent = () => {
      setEnabled(hasAnalyticsConsent());
    };

    window.addEventListener("cibin-cookie-consent", onConsent);
    return () => window.removeEventListener("cibin-cookie-consent", onConsent);
  }, []);

  if (!enabled) return null;

  return (
    <>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                anonymize_ip: true,
                send_page_view: true
              });
            `}
          </Script>
        </>
      )}

      {CLARITY_ID && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>
      )}
    </>
  );
}
