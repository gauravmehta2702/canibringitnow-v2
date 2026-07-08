import { Suspense } from 'react';
import AnalyticsScripts from '@/components/analytics/AnalyticsScripts';
import TrackPageView from '@/components/analytics/TrackPageView';

export default function AnalyticsProvider() {
  return (
    <>
      <AnalyticsScripts />
      <Suspense fallback={null}>
        <TrackPageView />
      </Suspense>
    </>
  );
}
