import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — Hongdae Boy Map',
  description: 'Privacy Policy for Hongdae Boy Map.',
};

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: '100dvh', background: '#fafaf9', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ position: 'sticky', top: 0, background: 'rgba(250,250,249,0.92)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #e7e5e4', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, zIndex: 10 }}>
        <Link href="/" style={{ fontSize: 13, color: '#78716c', textDecoration: 'none' }}>← Map</Link>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#1c1917', fontFamily: 'monospace' }}>Privacy Policy</span>
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 20px 64px' }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1c1917', margin: '0 0 6px' }}>Privacy Policy</h1>
        <p style={{ fontSize: 13, color: '#a8a29e', margin: '0 0 36px' }}>Last updated: April 2026</p>

        {[
          {
            title: '1. What we collect',
            body: 'When you submit a stamp ("spot"), we store the following data: geographic coordinates (latitude and longitude) of the location you tapped, the type of sighting you selected, the date and time of submission, and a one-way hashed version of your IP address for spam prevention. The IP hash cannot be reversed to identify you.',
          },
          {
            title: '2. What we do NOT collect',
            body: 'We do not collect your name, email address, phone number, device identifiers, or any other personally identifiable information. No account or login is required to use this service.',
          },
          {
            title: '3. Cookies and advertising',
            body: 'This site uses Google AdSense to display advertisements. Google AdSense may use cookies to serve ads based on your prior visits to this website or other websites. You can opt out of personalized advertising by visiting Google\'s Ads Settings at adssettings.google.com.',
          },
          {
            title: '4. Data retention',
            body: 'Submitted stamps are stored indefinitely unless removed by the submitter or by our moderation process. IP hashes are stored alongside stamps and are used solely to enforce rate limits.',
          },
          {
            title: '5. Third-party services',
            body: 'This site uses Mapbox for map rendering and Supabase for data storage. Their respective privacy policies apply to data processed by those services. Links: mapbox.com/legal/privacy and supabase.com/privacy.',
          },
          {
            title: '6. Children\'s privacy',
            body: 'This service is not directed at children under the age of 13. We do not knowingly collect data from children.',
          },
          {
            title: '7. Changes to this policy',
            body: 'We may update this policy from time to time. Continued use of the service after changes constitutes acceptance of the updated policy.',
          },
          {
            title: '8. Contact',
            body: 'If you have questions about this privacy policy, you can reach us via the About page.',
          },
        ].map((section) => (
          <section key={section.title} style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1c1917', margin: '0 0 8px' }}>{section.title}</h2>
            <p style={{ fontSize: 14, color: '#57534e', lineHeight: 1.75, margin: 0 }}>{section.body}</p>
          </section>
        ))}

        <div style={{ marginTop: 40, display: 'flex', gap: 16 }}>
          <Link href="/about" style={{ fontSize: 13, color: '#a8a29e', textDecoration: 'none' }}>About</Link>
          <Link href="/" style={{ fontSize: 13, color: '#a8a29e', textDecoration: 'none' }}>← Back to Map</Link>
        </div>
      </div>
    </div>
  );
}
