import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service — Hongdae Boy Map',
  description: 'Terms of Service for Hongdae Boy Map.',
};

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: 'By accessing or using Hongdae Boy Map ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service. We reserve the right to update these terms at any time, and continued use of the Service constitutes acceptance of any changes.',
  },
  {
    title: '2. Description of Service',
    body: 'Hongdae Boy Map is a community-driven, crowd-sourced map platform that allows users to anonymously submit location-based stamps ("sightings") inspired by the "Hongdae Boy" internet meme. The Service is provided for entertainment and community purposes only and is not intended to be used as a serious reporting or warning tool.',
  },
  {
    title: '3. User Conduct',
    body: 'You agree to use the Service only for its intended lighthearted, parody purpose. You must not submit stamps with the intent to harass, defame, stalk, or target any specific individual. You must not spam or flood the map with false, duplicate, or malicious submissions. You must not use the Service in any way that violates applicable local, national, or international law. Violation of these rules may result in your submissions being removed without notice.',
  },
  {
    title: '4. User-Generated Content',
    body: 'Users may submit geographic stamps to the map. By submitting content, you represent that your submission complies with these Terms and that you accept full responsibility for the content you submit. We do not verify the accuracy or appropriateness of user submissions. We reserve the right, but are not obligated, to remove any submission at our sole discretion.',
  },
  {
    title: '5. Parody & Disclaimer',
    body: 'Hongdae Boy Map is a parody community project inspired by a viral internet meme. All content on this site, including user-submitted stamps, is intended in a lighthearted, humorous spirit. Stamps mark approximate geographic areas only and do not contain any personally identifiable information about any individual. The Service is not a reporting tool and should not be used as one.',
  },
  {
    title: '6. Intellectual Property',
    body: 'The design, code, and original content of this website are the property of Hongdae Boy Map. The "Hongdae Boy" meme concept is a community cultural phenomenon and not owned or claimed by this service. User-submitted stamps remain the responsibility of the submitting user.',
  },
  {
    title: '7. Limitation of Liability',
    body: 'Hongdae Boy Map is provided "as is" without any warranties, express or implied. We are not liable for any damages arising from your use of the Service, including but not limited to direct, indirect, incidental, or consequential damages. We do not guarantee the accuracy, reliability, or availability of the Service at any time.',
  },
  {
    title: '8. Third-Party Services',
    body: 'The Service uses third-party providers including Mapbox (map rendering) and Supabase (data storage). Your use of these services through our platform is subject to their respective terms of service and privacy policies.',
  },
  {
    title: '9. Advertising',
    body: 'This Service displays advertisements served by Google AdSense. By using the Service, you acknowledge that Google may use cookies and similar technologies to serve relevant ads. You can opt out of personalized advertising via Google\'s Ads Settings.',
  },
  {
    title: '10. Termination',
    body: 'We reserve the right to terminate or restrict access to the Service for any user who violates these Terms, at our sole discretion and without prior notice.',
  },
  {
    title: '11. Governing Law',
    body: 'These Terms shall be governed by and construed in accordance with applicable law. Any disputes arising from these Terms or your use of the Service shall be resolved through good-faith negotiation.',
  },
  {
    title: '12. Contact',
    body: 'If you have any questions about these Terms of Service, you can contact us at contact@hongdaeboymap.com.',
  },
];

export default function TermsPage() {
  return (
    <div style={{ minHeight: '100dvh', background: '#0A0A0A', color: '#F0EBE3', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ position: 'sticky', top: 0, background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, zIndex: 10 }}>
        <Link href="/" style={{ fontSize: 13, color: 'rgba(240,235,227,0.4)', textDecoration: 'none' }}>← Map</Link>
        <span style={{ fontSize: 15, fontFamily: "'Bebas Neue', cursive", color: '#F0EBE3', letterSpacing: '0.06em' }}>Terms of Service</span>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '48px 24px 80px' }}>
        <h1 style={{ fontSize: 52, fontFamily: "'Bebas Neue', cursive", color: '#F0EBE3', letterSpacing: '0.04em', lineHeight: 1, margin: '0 0 8px' }}>
          Terms of Service
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(240,235,227,0.3)', margin: '0 0 48px', fontFamily: "'Courier New', monospace" }}>
          Last updated: April 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {sections.map((section) => (
            <section key={section.title} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 28 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F0EBE3', margin: '0 0 10px' }}>{section.title}</h2>
              <p style={{ fontSize: 14, color: 'rgba(240,235,227,0.55)', lineHeight: 1.8, margin: 0 }}>{section.body}</p>
            </section>
          ))}
        </div>

        <div style={{ marginTop: 40, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {[
            { label: '← Back to Map', href: '/' },
            { label: 'About', href: '/about' },
            { label: 'Privacy Policy', href: '/privacy' },
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
