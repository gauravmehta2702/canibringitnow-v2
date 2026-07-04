export function trackRevenueClick(productId: string, source: string) {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(
    new CustomEvent('cibit_revenue_click', {
      detail: {
        productId,
        source,
        timestamp: new Date().toISOString(),
      },
    }),
  );

  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (gtag) {
    gtag('event', 'affiliate_click', {
      product_id: productId,
      click_source: source,
    });
  }
}
