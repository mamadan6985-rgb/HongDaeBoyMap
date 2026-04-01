'use client';

import { useEffect, useRef } from 'react';

const PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ?? '';
const SLOT_ID = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID ?? '';

const BANNER_H = 60;

export default function AdBanner() {
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!PUB_ID || !SLOT_ID) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle ?? []).push({});
    } catch {}
  }, []);

  if (!PUB_ID || !SLOT_ID) {
    return (
      <div
        style={{
          width: '100%',
          height: BANNER_H,
          flexShrink: 0,
          background: 'rgba(0,0,0,0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontSize: 10, color: '#ccc', fontFamily: 'monospace' }}>AD</span>
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        height: BANNER_H,
        maxHeight: BANNER_H,
        flexShrink: 0,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          height: BANNER_H,
          maxHeight: BANNER_H,
          overflow: 'hidden',
        }}
        data-ad-client={PUB_ID}
        data-ad-slot={SLOT_ID}
        data-ad-format="horizontal"
      />
    </div>
  );
}
