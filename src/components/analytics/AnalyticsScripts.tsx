import Script from 'next/script';
import { analyticsConfig } from '@/lib/analyticsConfig';

export default function AnalyticsScripts() {
  return (
    <>
      {analyticsConfig.ga4MeasurementId && analyticsConfig.enableAnalytics && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.ga4MeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${analyticsConfig.ga4MeasurementId}', {
                send_page_view: true,
                anonymize_ip: true
              });
            `}
          </Script>
        </>
      )}

      {analyticsConfig.clarityProjectId && analyticsConfig.enableAnalytics && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${analyticsConfig.clarityProjectId}");
          `}
        </Script>
      )}
    </>
  );
}
