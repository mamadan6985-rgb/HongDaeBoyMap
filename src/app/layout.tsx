import type { Metadata } from 'next';
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap" rel="stylesheet" />
        {PUB_ID && (
          // eslint-disable-next-line @next/next/no-sync-scripts
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUB_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
