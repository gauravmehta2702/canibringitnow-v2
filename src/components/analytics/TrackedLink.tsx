'use client';

import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { trackAffiliateClick, trackOutboundClick } from '@/lib/analyticsEvents';

type Props = ComponentProps<typeof Link> & {
  children: ReactNode;
  trackingLabel?: string;
  affiliate?: boolean;
};

export default function TrackedLink({ children, trackingLabel, affiliate, href, onClick, ...props }: Props) {
  return (
    <Link
      href={href}
      onClick={(event) => {
        const url = typeof href === 'string' ? href : href.toString();
        if (affiliate) trackAffiliateClick(url, trackingLabel);
        else trackOutboundClick(url, trackingLabel);
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
