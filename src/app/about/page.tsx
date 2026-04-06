import type { Metadata } from 'next';
import Link from 'next/link';
import { TYPE_CONFIG } from '@/types';

export const metadata: Metadata = {
  title: 'About — Hongdae Boy Map',
  description: 'What is Hongdae Boy Map? Learn about the service, the 4 types of Hongdae Guys, how to use the map, and our community guidelines.',
};

const shared = {
  page: { minHeight: '100dvh', background: '#0A0A0A', color: '#F0EBE3', fontFamily: 'system-ui, sans-serif' } as React.CSSProperties,
  header: { position: 'sticky', top: 0, background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, zIndex: 10 } as React.CSSProperties,
  label: { fontSize: 11, color: '#FFE500', fontFamily: "'Courier New', monospace", letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 10px', display: 'block' } as React.CSSProperties,
  h2: { fontSize: 36, fontFamily: "'Bebas Neue', cursive", color: '#F0EBE3', letterSpacing: '0.04em', lineHeight: 1, margin: '0 0 20px' } as React.CSSProperties,
  body: { fontSize: 14, color: 'rgba(240,235,227,0.65)', lineHeight: 1.8, margin: '0 0 14px' } as React.CSSProperties,
  divider: { borderTop: '1px solid rgba(255,255,255,0.07)', margin: '48px 0' } as React.CSSProperties,
};

export default function AboutPage() {
  return (
    <div style={shared.page}>
      {/* Header */}
      <div style={shared.header}>
        <Link href="/" style={{ fontSize: 13, color: 'rgba(240,235,227,0.4)', textDecoration: 'none' }}>← Map</Link>
        <span style={{ fontSize: 15, fontFamily: "'Bebas Neue', cursive", color: '#F0EBE3', letterSpacing: '0.06em' }}>About</span>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Hero */}
        <h1 style={{ fontSize: 56, fontFamily: "'Bebas Neue', cursive", color: '#FFE500', letterSpacing: '0.04em', lineHeight: 1, margin: '0 0 12px' }}>
          📍 Hongdae Boy Map
        </h1>
        <p style={{ fontSize: 16, color: 'rgba(240,235,227,0.5)', margin: '0 0 48px', fontStyle: 'italic', fontFamily: "'Courier New', monospace" }}>
          &quot;He&apos;s out there. He&apos;s always out there.&quot;
        </p>

        {/* What is it */}
        <section style={{ marginBottom: 48 }}>
          <span style={shared.label}>What is this?</span>
          <h2 style={shared.h2}>The Project</h2>
          <p style={shared.body}>
            Hongdae Boy Map is a community-driven, crowd-sourced sighting platform built around one of Seoul&apos;s most recognizable internet phenomena: the &quot;Hongdae Boy.&quot; The meme captures a very specific archetype — a man who frequents Seoul&apos;s Hongdae district and approaches foreign women with a set of suspiciously consistent opening lines.
          </p>
          <p style={shared.body}>
            The meme exploded globally in 2025 when content creator Sean Solo&apos;s parody video hit 29 million views on TikTok, turning what locals had quietly observed for years into a worldwide cultural reference. This site is the next logical step: a real-time, crowd-sourced map of sightings, organized by type.
          </p>
          <p style={{ ...shared.body, margin: 0 }}>
            It&apos;s a parody project. It&apos;s lighthearted and anonymous. No personal information about any individual is ever collected or displayed.
          </p>
        </section>

        <div style={shared.divider} />

        {/* How to use */}
        <section style={{ marginBottom: 48 }}>
          <span style={shared.label}>Instructions</span>
          <h2 style={shared.h2}>How to Use</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              ['Tap the map', 'Tap anywhere on the map where you spotted a Hongdae Boy.'],
              ['Pick his type', 'Choose which of the 4 types best describes him.'],
              ['Stamp placed', 'Your stamp appears on the map instantly for everyone to see.'],
              ['View details', 'Tap any stamp to see the outfit description and opening line.'],
              ['Remove it', 'Tap your own stamp to delete it at any time.'],
            ].map(([title, desc], i) => (
              <div key={i} style={{ display: 'flex', gap: 16, padding: '16px 18px', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 18, color: '#FFE500', flexShrink: 0 }}>{i + 1}.</span>
                <div>
                  <p style={{ margin: '0 0 3px', fontSize: 13, fontWeight: 700, color: '#F0EBE3' }}>{title}</p>
                  <p style={{ margin: 0, fontSize: 13, color: 'rgba(240,235,227,0.5)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={shared.divider} />

        {/* Types */}
        <section style={{ marginBottom: 48 }}>
          <span style={shared.label}>Field Guide</span>
          <h2 style={shared.h2}>The 4 Types</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {(Object.entries(TYPE_CONFIG) as [string, typeof TYPE_CONFIG[keyof typeof TYPE_CONFIG]][]).map(([, config]) => (
              <div key={config.label} style={{ padding: '16px 18px', borderRadius: 14, border: `1px solid ${config.color}25`, background: `${config.color}0A`, borderLeft: `4px solid ${config.color}` }}>
                <p style={{ margin: '0 0 4px', fontSize: 18, fontFamily: "'Bebas Neue', cursive", color: config.color, letterSpacing: '0.04em' }}>{config.label}</p>
                <p style={{ margin: '0 0 6px', fontSize: 12, color: 'rgba(240,235,227,0.4)', fontFamily: "'Courier New', monospace" }}>{config.fashion}</p>
                <p style={{ margin: 0, fontSize: 13, color: 'rgba(240,235,227,0.6)', fontStyle: 'italic' }}>{config.quote}</p>
              </div>
            ))}
          </div>
        </section>

        <div style={shared.divider} />

        {/* FAQ */}
        <section style={{ marginBottom: 48 }}>
          <span style={shared.label}>FAQ</span>
          <h2 style={shared.h2}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              {
                q: 'Is this site targeting real people?',
                a: 'No. Stamps mark general geographic areas only — no photos, names, or personal information about any individual are ever collected or displayed. This is a parody community project inspired by a viral meme.',
              },
              {
                q: 'Who can submit a stamp?',
                a: 'Anyone. No account or login is required. Submissions are completely anonymous.',
              },
              {
                q: 'Can I remove my stamp?',
                a: 'Yes. When you place a stamp, a delete token is saved locally in your browser. Tap your stamp on the map and the option to remove it will appear.',
              },
              {
                q: 'Are stamps moderated?',
                a: 'We reserve the right to remove stamps that are spammy, malicious, or submitted in bad faith. The service is meant to be fun and lighthearted.',
              },
              {
                q: 'Why is it only in Hongdae?',
                a: 'The map is centered on Hongdae but you can pin stamps anywhere in Seoul. The meme originated in Hongdae, so that\'s where most sightings naturally cluster.',
              },
              {
                q: 'How do I contact you?',
                a: 'You can reach us at contact@hongdaeboymap.com — we\'re a small indie project so responses may take a few days.',
              },
            ].map(({ q, a }, i) => (
              <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 20 }}>
                <p style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 700, color: '#F0EBE3' }}>{q}</p>
                <p style={{ margin: 0, fontSize: 14, color: 'rgba(240,235,227,0.55)', lineHeight: 1.7 }}>{a}</p>
              </div>
            ))}
          </div>
        </section>

        <div style={shared.divider} />

        {/* Community Guidelines */}
        <section style={{ marginBottom: 48 }}>
          <span style={shared.label}>Rules</span>
          <h2 style={shared.h2}>Community Guidelines</h2>
          <p style={shared.body}>
            Hongdae Boy Map is meant to be a fun, lighthearted experience. To keep it that way, we ask that you:
          </p>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            {[
              'Only submit stamps in the spirit of the meme — no malicious or targeted use.',
              'Do not spam the map with fake or duplicate stamps.',
              'Do not use this service to harass, defame, or target any specific individual.',
              'Respect that this is a parody community project, not a serious reporting tool.',
            ].map((rule, i) => (
              <li key={i} style={{ fontSize: 14, color: 'rgba(240,235,227,0.6)', lineHeight: 1.8, marginBottom: 6 }}>{rule}</li>
            ))}
          </ul>
        </section>

        <div style={shared.divider} />

        {/* Disclaimer */}
        <section style={{ padding: '20px 22px', background: 'rgba(255,229,0,0.06)', borderRadius: 14, border: '1px solid rgba(255,229,0,0.15)', marginBottom: 48 }}>
          <p style={{ margin: '0 0 8px', fontSize: 13, fontFamily: "'Bebas Neue', cursive", color: '#FFE500', letterSpacing: '0.08em' }}>Disclaimer</p>
          <p style={{ margin: 0, fontSize: 13, color: 'rgba(240,235,227,0.5)', lineHeight: 1.75 }}>
            This site is a parody and community meme project. It is not intended to harass, defame, or target any individual. Stamps mark general areas only — no personal information about any individual is collected or displayed. Users are responsible for the content they submit. False or malicious stamps may be removed without notice.
          </p>
        </section>

        {/* Footer links */}
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {[
            { label: '← Back to Map', href: '/' },
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '/terms' },
          ].map(({ label, href }) => (
            <Link key={href} href={href} style={{ fontSize: 13, color: 'rgba(240,235,227,0.3)', textDecoration: 'none', fontFamily: "'Courier New', monospace" }}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
