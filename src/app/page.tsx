'use client';

import dynamic from 'next/dynamic';
import AdBanner, { AD_HEIGHT } from '@/components/AdBanner';
import IntroPopup from '@/components/IntroPopup';
import ActivityFeed from '@/components/ActivityFeed';
import Link from 'next/link';
import { TYPE_CONFIG } from '@/types';

const HongdaeMap = dynamic(() => import('@/components/HongdaeMap'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0A0A0A' }}>
      <p style={{ color: 'rgba(240,235,227,0.3)', fontSize: '13px', fontFamily: 'monospace' }}>Loading map...</p>
    </div>
  ),
});

const TYPES_META = [
  {
    key: 'open_minded',
    emoji: '🔴',
    desc: 'The original archetype. Rocking a slim-fit black leather jacket, gel-slicked hair, and the latest iPhone. His opener — "Are you open-minded?" — has become so infamous it spawned an entire internet genre. Usually found near the Hongdae entrance or the main club strip. Confidence level: 10/10. Self-awareness level: pending.',
  },
  {
    key: 'language_exchange',
    emoji: '🔵',
    desc: 'This one leads with education. "Just friends, I teach you Korean — you teach me English!" He\'s sporting an oversized hoodie, tote bag from an indie bookstore, round frames, and a Starbucks tumbler. Harmless? Usually. Genuinely wants language practice? …Maybe.',
  },
  {
    key: 'kdrama',
    emoji: '🟣',
    desc: 'He\'s seen every episode of every drama and carries himself accordingly. Long wool coat, all-black underneath, a cologne situation that announces his arrival 10 seconds before he appears. His opening line sounds like it was written for a season finale. The intense stare is included at no extra charge.',
  },
  {
    key: 'studied_abroad',
    emoji: '🟢',
    desc: 'He\'s been abroad. He will let you know. Canada Goose or Uniqlo basics, confident Konglish, and a natural ability to name-drop cities. "Oh I lived in New York." "I did a semester in London." He means well. He really does.',
  },
] as const;

export default function Home() {
  return (
    <>
      <IntroPopup />
      <AdBanner />

      {/* ── MAP SECTION ── */}
      <div style={{ height: `calc(100dvh - ${AD_HEIGHT}px)`, position: 'relative' }}>
        <HongdaeMap />
        <ActivityFeed />

        {/* Scroll-down hint */}
        <div
          style={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            pointerEvents: 'none',
            opacity: 0.45,
          }}
        >
          <span style={{ fontSize: 10, color: '#F0EBE3', fontFamily: "'Courier New', monospace", letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            scroll to learn more
          </span>
          <span style={{ color: '#F0EBE3', fontSize: 12 }}>↓</span>
        </div>
      </div>

      {/* ── CONTENT SECTION ── */}
      <div style={{ background: '#0A0A0A', color: '#F0EBE3' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '72px 24px 80px' }}>

          {/* What is Hongdae Boy Map */}
          <section style={{ marginBottom: 72 }}>
            <p style={{ margin: '0 0 12px', fontSize: 11, color: '#FFE500', fontFamily: "'Courier New', monospace", letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              About the project
            </p>
            <h2 style={{ margin: '0 0 24px', fontSize: 52, fontFamily: "'Bebas Neue', cursive", color: '#F0EBE3', letterSpacing: '0.04em', lineHeight: 1 }}>
              What is Hongdae Boy Map?
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: 'rgba(240,235,227,0.7)' }}>
                Hongdae Boy Map is a community-powered, crowd-sourced sighting platform built around one of Seoul&apos;s most recognizable internet phenomena: the &quot;Hongdae Boy.&quot; Born from a wave of viral content in 2025, the meme captures a very specific archetype — a man who frequents the Hongdae area of Seoul and approaches foreign women with a set of suspiciously familiar opening lines.
              </p>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: 'rgba(240,235,227,0.7)' }}>
                The catalyst? A parody video by content creator Sean Solo that racked up over 29 million views on TikTok, turning what locals had quietly observed for years into a globally recognized cultural meme. Suddenly, travelers arriving in Seoul knew exactly what to expect — and wanted a way to share their encounters in real time.
              </p>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: 'rgba(240,235,227,0.7)' }}>
                Hongdae Boy Map gives you that. Tap anywhere on the map where you spotted one, choose the type that fits best, and your stamp appears instantly — visible to everyone. It&apos;s lighthearted, anonymous, and a little chaotic. Just like Hongdae itself.
              </p>
            </div>
          </section>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginBottom: 72 }} />

          {/* The 4 Types */}
          <section style={{ marginBottom: 72 }}>
            <p style={{ margin: '0 0 12px', fontSize: 11, color: '#FFE500', fontFamily: "'Courier New', monospace", letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Field guide
            </p>
            <h2 style={{ margin: '0 0 36px', fontSize: 52, fontFamily: "'Bebas Neue', cursive", color: '#F0EBE3', letterSpacing: '0.04em', lineHeight: 1 }}>
              The 4 Types of Hongdae Guys
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {TYPES_META.map(({ key, emoji, desc }) => {
                const config = TYPE_CONFIG[key as keyof typeof TYPE_CONFIG];
                return (
                  <div
                    key={key}
                    style={{
                      padding: '20px 22px',
                      borderRadius: 16,
                      background: `${config.color}0D`,
                      border: `1px solid ${config.color}25`,
                      borderLeft: `4px solid ${config.color}`,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <span style={{ fontSize: 18 }}>{emoji}</span>
                      <h3 style={{ margin: 0, fontSize: 22, fontFamily: "'Bebas Neue', cursive", color: config.color, letterSpacing: '0.05em' }}>
                        {config.label}
                      </h3>
                    </div>
                    <p style={{ margin: '0 0 10px', fontSize: 14, lineHeight: 1.7, color: 'rgba(240,235,227,0.65)' }}>
                      {desc}
                    </p>
                    <p style={{ margin: 0, fontSize: 12, color: 'rgba(240,235,227,0.35)', fontFamily: "'Courier New', monospace", fontStyle: 'italic' }}>
                      {config.fashion}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginBottom: 72 }} />

          {/* Travel Tips */}
          <section style={{ marginBottom: 72 }}>
            <p style={{ margin: '0 0 12px', fontSize: 11, color: '#FFE500', fontFamily: "'Courier New', monospace", letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Seoul travel
            </p>
            <h2 style={{ margin: '0 0 28px', fontSize: 52, fontFamily: "'Bebas Neue', cursive", color: '#F0EBE3', letterSpacing: '0.04em', lineHeight: 1 }}>
              Safe & Fun Tips for Hongdae
            </h2>
            <p style={{ margin: '0 0 24px', fontSize: 15, lineHeight: 1.8, color: 'rgba(240,235,227,0.7)' }}>
              Hongdae is one of Seoul&apos;s most vibrant and youth-centered districts — home to live music venues, indie art galleries, street performers, and some of the city&apos;s best late-night food. Here&apos;s how to enjoy it to the fullest.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { tip: 'Stick to well-lit, busy streets.', detail: "Hongdae's main drag is always packed and safe. Smaller side streets at night warrant the usual city caution." },
                { tip: 'Know your exit options.', detail: 'Hongdae Station (Line 2) runs until around 1am. After that, night buses and taxis are readily available and easy to hail.' },
                { tip: 'Trust your instincts.', detail: "Unsolicited approaches happen — that's literally what this site is about. A simple 'no thank you' or just walking away is always valid and totally normal." },
                { tip: 'The street food is worth it.', detail: "Tteokbokki, Korean fried chicken, budae jjigae — Hongdae's street food scene is elite. Eat everything you can find." },
                { tip: 'Weekends get wild.', detail: 'Saturday nights especially. Plan for crowds and book your accommodation in advance if visiting on a weekend.' },
                { tip: 'Explore beyond the main strip.', detail: 'Yeonnam-dong and Mangwon-dong, just east of Hongdae, offer a calmer, trendier side of the area with great cafes and local shops.' },
              ].map(({ tip, detail }, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, padding: '16px 18px', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 16, color: '#FFE500', flexShrink: 0, marginTop: 1 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 700, color: '#F0EBE3' }}>{tip}</p>
                    <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: 'rgba(240,235,227,0.55)' }}>{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginBottom: 72 }} />

          {/* Story behind the meme */}
          <section style={{ marginBottom: 72 }}>
            <p style={{ margin: '0 0 12px', fontSize: 11, color: '#FFE500', fontFamily: "'Courier New', monospace", letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              The backstory
            </p>
            <h2 style={{ margin: '0 0 24px', fontSize: 52, fontFamily: "'Bebas Neue', cursive", color: '#F0EBE3', letterSpacing: '0.04em', lineHeight: 1 }}>
              The Viral Story Behind the Meme
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: 'rgba(240,235,227,0.7)' }}>
                The &quot;Hongdae Boy&quot; phenomenon didn&apos;t appear overnight. Travelers to Seoul&apos;s Hongdae district had been sharing similar stories for years across travel forums, Reddit threads, and group chats. The area&apos;s unique mix of foreign tourists, international students, and nightlife created a particular social ecosystem — one that apparently generated a very consistent type of encounter.
              </p>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: 'rgba(240,235,227,0.7)' }}>
                When creator Sean Solo dropped a parody video in 2025 naming and categorizing these archetypes with surgical precision, it struck a nerve worldwide. 29 million TikTok views later, the meme had gone fully global. Comment sections filled with &quot;this happened to me,&quot; &quot;which type did you get,&quot; and &quot;Seoul really has a type-based system.&quot;
              </p>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: 'rgba(240,235,227,0.7)' }}>
                Hongdae Boy Map is the logical next step: a real-time, crowd-sourced visualization of the meme, playing out live on the streets of Seoul. It&apos;s absurd. It&apos;s funny. And somehow, the pins keep appearing.
              </p>
            </div>
          </section>

          {/* How to Use */}
          <section style={{ marginBottom: 72 }}>
            <p style={{ margin: '0 0 12px', fontSize: 11, color: '#FFE500', fontFamily: "'Courier New', monospace", letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              How it works
            </p>
            <h2 style={{ margin: '0 0 28px', fontSize: 52, fontFamily: "'Bebas Neue', cursive", color: '#F0EBE3', letterSpacing: '0.04em', lineHeight: 1 }}>
              How to Use the Map
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'Tap anywhere on the map where you spotted a Hongdae Boy.',
                'Choose which of the 4 types best describes him.',
                'Your stamp appears on the map instantly for everyone to see.',
                'Tap any stamp to view details — outfit, opening line, and time spotted.',
                'Tap your own stamp to remove it if needed.',
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 20, color: '#FFE500', flexShrink: 0, lineHeight: 1.3 }}>
                    {i + 1}.
                  </span>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'rgba(240,235,227,0.65)' }}>{step}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: '#080808' }}>
          <div style={{ maxWidth: 760, margin: '0 auto', padding: '28px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ margin: 0, fontSize: 12, fontFamily: "'Bebas Neue', cursive", color: '#FFE500', letterSpacing: '0.08em' }}>
              📍 HONGDAE BOY MAP
            </p>
            <div style={{ display: 'flex', gap: 20 }}>
              {[
                { label: 'About', href: '/about' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
              ].map(({ label, href }) => (
                <Link key={href} href={href} style={{ fontSize: 12, color: 'rgba(240,235,227,0.3)', textDecoration: 'none', fontFamily: "'Courier New', monospace" }}>
                  {label}
                </Link>
              ))}
            </div>
            <p style={{ margin: 0, fontSize: 11, color: 'rgba(240,235,227,0.2)', fontFamily: "'Courier New', monospace" }}>
              © 2025 Hongdae Boy Map · Community project
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
