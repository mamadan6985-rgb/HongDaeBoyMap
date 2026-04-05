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

export default function StampDetail({ spot, isOwner, onDelete, onClose }: Props) {
  const config = TYPE_CONFIG[spot.type as SpotType];

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
        className="fade-in-bg"
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Panel */}
      <div
        className="slide-up"
        style={{
          position: 'relative',
          background: '#0F0F0F',
          borderRadius: '24px 24px 0 0',
          width: '100%',
          maxWidth: '440px',
          padding: '20px 20px 36px',
          boxShadow: '0 -8px 60px rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderBottom: 'none',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Color accent bar at top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${config.color}, ${config.color}00)`,
          }}
        />

        {/* Handle */}
        <div style={{ width: 36, height: 3, background: 'rgba(255,255,255,0.15)', borderRadius: 9999, margin: '4px auto 18px' }} />

        {/* Type badge + time */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <span
            style={{
              padding: '4px 12px',
              borderRadius: 9999,
              background: `${config.color}22`,
              border: `1px solid ${config.color}50`,
              fontSize: 12,
              fontWeight: 400,
              fontFamily: "'Bebas Neue', cursive",
              color: config.color,
              letterSpacing: '0.08em',
            }}
          >
            {config.label}
          </span>
          <span style={{ marginLeft: 'auto', fontSize: 11, color: 'rgba(240,235,227,0.3)', fontFamily: "'Courier New', monospace" }}>
            {timeAgo(spot.created_at)}
          </span>
        </div>

        {/* Quote — hero element */}
        <p
          style={{
            margin: '0 0 16px',
            fontSize: 22,
            fontStyle: 'italic',
            fontWeight: 700,
            color: '#F0EBE3',
            lineHeight: 1.35,
            borderLeft: `3px solid ${config.color}`,
            paddingLeft: 14,
          }}
        >
          {config.quote}
        </p>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 14 }}>
          {/* Outfit */}
          <p style={{ margin: '0 0 3px', fontSize: 10, color: 'rgba(240,235,227,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'Courier New', monospace" }}>
            Outfit
          </p>
          <p style={{ margin: 0, fontSize: 13, color: 'rgba(240,235,227,0.65)', lineHeight: 1.6 }}>
            {config.fashion}
          </p>
        </div>

        {/* Actions */}
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {isOwner && (
            <button
              onClick={onDelete}
              style={{
                width: '100%',
                padding: '12px 0',
                borderRadius: 12,
                border: '1.5px solid rgba(255,59,92,0.4)',
                background: 'rgba(255,59,92,0.08)',
                color: '#FF3B5C',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: "'Courier New', monospace",
                letterSpacing: '0.03em',
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
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              fontSize: 13,
              color: 'rgba(240,235,227,0.3)',
              cursor: 'pointer',
              fontFamily: "'Courier New', monospace",
              letterSpacing: '0.05em',
            }}
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
}
