'use client';

import dynamic from 'next/dynamic';
import AdBanner from '@/components/AdBanner';

const HongdaeMap = dynamic(() => import('@/components/HongdaeMap'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f0eb',
      }}
    >
      <p style={{ color: '#a8a29e', fontSize: '14px', fontFamily: 'monospace' }}>
        Loading map...
      </p>
    </div>
  ),
});

export default function Home() {
  return (
    <>
      <AdBanner />
      <HongdaeMap />
    </>
  );
}
