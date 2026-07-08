export const analyticsConfig = {
  ga4MeasurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || '',
  clarityProjectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || '',
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  enableAnalytics:
    process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true' ||
    process.env.NODE_ENV === 'production',
};

export function hasGA4() {
  return Boolean(analyticsConfig.ga4MeasurementId);
}

export function hasClarity() {
  return Boolean(analyticsConfig.clarityProjectId);
}

export function hasGoogleVerification() {
  return Boolean(analyticsConfig.googleSiteVerification);
}
