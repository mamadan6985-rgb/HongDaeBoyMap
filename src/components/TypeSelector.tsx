'use client';

import { SpotType, TYPE_CONFIG } from '@/types';

interface Props {
  onSelect: (type: SpotType) => void;
  onCancel: () => void;
  isDark?: boolean;
}

export default function TypeSelector({ onSelect, onCancel }: Props) {
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
        onClick={onCancel}
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
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div
          style={{
            width: 36,
            height: 3,
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 9999,
            margin: '0 auto 20px',
          }}
        />

        <h2
          style={{
            fontSize: 30,
            fontWeight: 400,
            fontFamily: "'Bebas Neue', cursive",
            color: '#F0EBE3',
            margin: '0 0 3px',
            letterSpacing: '0.04em',
          }}
        >
          Who did you spot?
        </h2>
        <p
          style={{
            fontSize: 12,
            color: 'rgba(240,235,227,0.4)',
            margin: '0 0 18px',
            fontStyle: 'italic',
            fontFamily: "'Courier New', monospace",
          }}
        >
          He&apos;s out there. He&apos;s always out there.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(Object.entries(TYPE_CONFIG) as [SpotType, (typeof TYPE_CONFIG)[SpotType]][]).map(
            ([type, config]) => (
              <button
                key={type}
                onClick={() => onSelect(type)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '13px 16px',
                  borderRadius: 14,
                  border: `1.5px solid ${config.color}30`,
                  background: `${config.color}0D`,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s, border-color 0.15s, transform 0.1s',
                  borderLeft: `4px solid ${config.color}`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = `${config.color}22`;
                  el.style.borderColor = `${config.color}80`;
                  el.style.transform = 'scale(1.018)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = `${config.color}0D`;
                  el.style.borderColor = `${config.color}30`;
                  el.style.borderLeftColor = config.color;
                  el.style.transform = 'scale(1)';
                }}
              >
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 18,
                      fontWeight: 400,
                      fontFamily: "'Bebas Neue', cursive",
                      color: config.color,
                      letterSpacing: '0.05em',
                      lineHeight: 1.1,
                    }}
                  >
                    {config.label}
                  </p>
                  <p
                    style={{
                      margin: '3px 0 0',
                      fontSize: 11,
                      color: 'rgba(240,235,227,0.45)',
                      fontStyle: 'italic',
                      fontFamily: "'Courier New', monospace",
                      lineHeight: 1.4,
                    }}
                  >
                    {config.quote}
                  </p>
                </div>
                <span style={{ fontSize: 16, opacity: 0.3, color: config.color }}>→</span>
              </button>
            )
          )}
        </div>

        <button
          onClick={onCancel}
          style={{
            marginTop: 14,
            width: '100%',
            padding: '11px 0',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12,
            fontSize: 13,
            color: 'rgba(240,235,227,0.35)',
            cursor: 'pointer',
            fontFamily: "'Courier New', monospace",
            letterSpacing: '0.05em',
          }}
        >
          cancel
        </button>
      </div>
    </div>
  );
}
