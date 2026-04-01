'use client';

import { Spot, SpotType, TYPE_CONFIG } from '@/types';

interface Props {
  spot: Spot;
  isOwner: boolean;
  isDark?: boolean;
  onDelete: () => void;
  onClose: () => void;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function StampDetail({ spot, isOwner, isDark = false, onDelete, onClose }: Props) {
  const config = TYPE_CONFIG[spot.type as SpotType];

  const panelBg = isDark ? '#1c1917' : '#ffffff';
  const titleColor = isDark ? '#f5f5f4' : '#1c1917';
  const subtitleColor = isDark ? '#78716c' : '#a8a29e';
  const bodyColor = isDark ? '#a8a29e' : '#57534e';
  const handleColor = isDark ? '#44403c' : '#e5e7eb';
  const dividerColor = isDark ? '#292524' : '#f5f5f4';

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 20,
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: 'relative',
          background: panelBg,
          borderRadius: '20px 20px 0 0',
          width: '100%',
          maxWidth: '420px',
          padding: '20px 20px 32px',
          boxShadow: '0 -4px 40px rgba(0,0,0,0.15)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div style={{ width: 40, height: 4, background: handleColor, borderRadius: 9999, margin: '0 auto 18px' }} />

        {/* Type badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: config.color, flexShrink: 0 }} />
          <span style={{ fontSize: 16, fontWeight: 700, color: config.color }}>{config.label}</span>
          <span style={{ marginLeft: 'auto', fontSize: 11, color: subtitleColor }}>{timeAgo(spot.created_at)}</span>
        </div>

        <div style={{ borderTop: `1px solid ${dividerColor}`, paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Fashion */}
          <div>
            <p style={{ margin: '0 0 3px', fontSize: 11, color: subtitleColor, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Outfit</p>
            <p style={{ margin: 0, fontSize: 13, color: bodyColor }}>{config.fashion}</p>
          </div>

          {/* Quote */}
          <div>
            <p style={{ margin: '0 0 3px', fontSize: 11, color: subtitleColor, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Opening line</p>
            <p style={{ margin: 0, fontSize: 14, color: titleColor, fontStyle: 'italic' }}>{config.quote}</p>
          </div>
        </div>

        {/* Actions */}
        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {isOwner && (
            <button
              onClick={onDelete}
              style={{
                width: '100%',
                padding: '11px 0',
                borderRadius: 12,
                border: '1.5px solid #FCA5A5',
                background: '#FEF2F2',
                color: '#EF4444',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Remove my stamp
            </button>
          )}
          <button
            onClick={onClose}
            style={{
              width: '100%',
              padding: '10px 0',
              background: 'none',
              border: 'none',
              fontSize: 13,
              color: subtitleColor,
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
