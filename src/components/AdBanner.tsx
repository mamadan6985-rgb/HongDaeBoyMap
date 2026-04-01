'use client';

import { useEffect } from 'react';

const PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ?? '';
const SLOT_ID = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID ?? '';

export const AD_HEIGHT = 50;

export default function AdBanner() {
  useEffect(() => {
    if (!PUB_ID || !SLOT_ID) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle ?? []).push({});
    } catch {}
  }, []);

  const style: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: AD_HEIGHT,
    zIndex: 100,
    overflow: 'hidden',
    background: '#fff',
  };

  if (!PUB_ID || !SLOT_ID) {
    return (
      <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.04)' }}>
        <span style={{ fontSize: 10, color: '#ccc', fontFamily: 'monospace' }}>AD</span>
      </div>
    );
  }

  return (
    <div style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: AD_HEIGHT, maxHeight: AD_HEIGHT }}
        data-ad-client={PUB_ID}
        data-ad-slot={SLOT_ID}
        data-ad-format="horizontal"
      />
    </div>
  );
}
