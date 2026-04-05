'use client';

import dynamic from 'next/dynamic';
import AdBanner, { AD_HEIGHT } from '@/components/AdBanner';
import IntroPopup from '@/components/IntroPopup';

const HongdaeMap = dynamic(() => import('@/components/HongdaeMap'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100vw', height: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f0eb' }}>
      <p style={{ color: '#a8a29e', fontSize: '14px', fontFamily: 'monospace' }}>Loading map...</p>
    </div>
  ),
});

export default function Home() {
  return (
    <>
      <IntroPopup />
      <AdBanner />
      <div style={{ paddingTop: AD_HEIGHT, height: '100dvh', boxSizing: 'border-box' }}>
        <HongdaeMap />
      </div>
    </>
  );
}
