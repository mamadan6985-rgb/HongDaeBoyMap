'use client';

import { useEffect, useRef } from 'react';

const PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ?? '';
const SLOT_ID = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID ?? '';

export default function AdBanner() {
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!PUB_ID || !SLOT_ID) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle ?? []).push({});
    } catch {}
  }, []);

  // Show placeholder when env vars are not set
  if (!PUB_ID || !SLOT_ID) {
    return (
      <div
        style={{
          width: '100%',
          height: 60,
          background: 'rgba(0,0,0,0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 10, color: '#ccc', fontFamily: 'monospace' }}>AD</span>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 60, flexShrink: 0, overflow: 'hidden' }}>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '60px' }}
        data-ad-client={PUB_ID}
        data-ad-slot={SLOT_ID}
        data-ad-format="horizontal"
        data-full-width-responsive="true"
      />
    </div>
  );
}
