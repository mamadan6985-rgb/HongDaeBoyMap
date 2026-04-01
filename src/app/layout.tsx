import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

const PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ?? '';

export const metadata: Metadata = {
  title: 'Hongdae Boy Map',
  description: 'Spot and share Hongdae boy sightings on the map',
  openGraph: {
    title: 'Hongdae Boy Map',
    description: "He's out there. He's always out there.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', flexDirection: 'column', height: '100dvh' }}>
        {PUB_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUB_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        {children}
      </body>
    </html>
  );
}
