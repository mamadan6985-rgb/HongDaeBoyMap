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
