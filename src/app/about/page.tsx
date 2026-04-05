import type { Metadata } from 'next';
import Link from 'next/link';
import { TYPE_CONFIG } from '@/types';

export const metadata: Metadata = {
  title: 'About — Hongdae Boy Map',
  description: 'What is Hongdae Boy Map? Learn about the service, the types, and how to use it.',
};

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100dvh', background: '#fafaf9', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ position: 'sticky', top: 0, background: 'rgba(250,250,249,0.92)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #e7e5e4', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, zIndex: 10 }}>
        <Link href="/" style={{ fontSize: 13, color: '#78716c', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
          ← Map
        </Link>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#1c1917', fontFamily: 'monospace' }}>About</span>
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 20px 64px' }}>

        {/* Hero */}
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1c1917', margin: '0 0 8px', fontFamily: 'monospace' }}>
          Hongdae Boy Map
        </h1>
        <p style={{ fontSize: 15, color: '#78716c', margin: '0 0 32px', fontStyle: 'italic' }}>
          "He&apos;s out there. He&apos;s always out there."
        </p>

        {/* What is it */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1c1917', margin: '0 0 12px' }}>What is this?</h2>
          <p style={{ fontSize: 14, color: '#57534e', lineHeight: 1.7, margin: '0 0 12px' }}>
            Hongdae Boy Map is a community-driven map where people can anonymously pin sightings of the famous "Hongdae Guy" — a well-known internet meme about a certain type of man who approaches foreign women in Seoul&apos;s Hongdae area.
          </p>
          <p style={{ fontSize: 14, color: '#57534e', lineHeight: 1.7, margin: 0 }}>
            The meme blew up globally in 2025 when content creator Sean Solo&apos;s parody video hit 29 million views on TikTok. This site is a lighthearted, community way to track and share sightings — not a serious warning system.
          </p>
        </section>

        {/* How to use */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1c1917', margin: '0 0 12px' }}>How to use</h2>
          <ol style={{ paddingLeft: 20, margin: 0 }}>
            {[
              'Tap anywhere on the map where you spotted one.',
              'Choose which type best describes him.',
              'Your stamp appears on the map instantly.',
              'Tap any stamp to see details. Tap your own stamp to remove it.',
            ].map((step, i) => (
              <li key={i} style={{ fontSize: 14, color: '#57534e', lineHeight: 1.7, marginBottom: 8 }}>{step}</li>
            ))}
          </ol>
        </section>

        {/* Types */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1c1917', margin: '0 0 16px' }}>The Types</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {(Object.entries(TYPE_CONFIG) as [string, typeof TYPE_CONFIG[keyof typeof TYPE_CONFIG]][]).map(([, config]) => (
              <div key={config.label} style={{ display: 'flex', gap: 14, padding: '14px 16px', borderRadius: 14, border: `1.5px solid ${config.color}25`, background: `${config.color}06` }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: config.color, flexShrink: 0, marginTop: 4 }} />
                <div>
                  <p style={{ margin: '0 0 3px', fontSize: 14, fontWeight: 700, color: '#1c1917' }}>{config.label}</p>
                  <p style={{ margin: '0 0 4px', fontSize: 12, color: '#78716c' }}>{config.fashion}</p>
                  <p style={{ margin: 0, fontSize: 13, color: '#57534e', fontStyle: 'italic' }}>{config.quote}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section style={{ padding: '16px 20px', background: '#f5f5f4', borderRadius: 14 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1c1917', margin: '0 0 8px' }}>Disclaimer</h2>
          <p style={{ fontSize: 13, color: '#78716c', lineHeight: 1.7, margin: 0 }}>
            This site is a parody and community meme project. It is not intended to harass, defame, or target any individual. Stamps mark general areas only — no personal information about any individual is collected or displayed. Users are responsible for the content they submit. False or malicious stamps may be removed.
          </p>
        </section>

        {/* Footer links */}
        <div style={{ marginTop: 40, display: 'flex', gap: 16 }}>
          <Link href="/privacy" style={{ fontSize: 13, color: '#a8a29e', textDecoration: 'none' }}>Privacy Policy</Link>
          <Link href="/" style={{ fontSize: 13, color: '#a8a29e', textDecoration: 'none' }}>← Back to Map</Link>
        </div>
      </div>
    </div>
  );
}
