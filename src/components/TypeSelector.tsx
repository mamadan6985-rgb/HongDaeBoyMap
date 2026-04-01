'use client';

import { SpotType, TYPE_CONFIG } from '@/types';

interface Props {
  onSelect: (type: SpotType) => void;
  onCancel: () => void;
  isDark?: boolean;
}

export default function TypeSelector({ onSelect, onCancel }: Props) {
  const panelBg = '#ffffff';
  const titleColor = '#1c1917';
  const subtitleColor = '#a8a29e';
  const labelColor = '#1c1917';
  const handleColor = '#e5e7eb';
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
      // sm:items-center — handled inline below via media query workaround
    >
      {/* Backdrop */}
      <div
        onClick={onCancel}
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
          padding: '24px 20px 32px',
          boxShadow: '0 -4px 40px rgba(0,0,0,0.15)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div
          style={{
            width: 40,
            height: 4,
            background: handleColor,
            borderRadius: 9999,
            margin: '0 auto 16px',
          }}
        />

        <h2
          style={{
            fontSize: 17,
            fontWeight: 700,
            color: titleColor,
            margin: '0 0 4px',
          }}
        >
          Who did you spot?
        </h2>
        <p
          style={{
            fontSize: 12,
            color: subtitleColor,
            margin: '0 0 18px',
            fontStyle: 'italic',
          }}
        >
          He&apos;s out there. He&apos;s always out there.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {(Object.entries(TYPE_CONFIG) as [SpotType, (typeof TYPE_CONFIG)[SpotType]][]).map(
            ([type, config]) => (
              <button
                key={type}
                onClick={() => onSelect(type)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 14px',
                  borderRadius: 14,
                  border: `2px solid ${config.color}30`,
                  background: `${config.color}08`,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'transform 0.1s, background 0.1s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = `${config.color}18`;
                  (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.015)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = `${config.color}08`;
                  (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                }}
              >
                {/* Color dot */}
                <span
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: config.color,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      fontWeight: 600,
                      color: labelColor,
                    }}
                  >
                    {config.label}
                  </p>
                  <p
                    style={{
                      margin: '2px 0 0',
                      fontSize: 11,
                      color: '#a8a29e',
                      fontStyle: 'italic',
                    }}
                  >
                    {config.quote}
                  </p>
                </div>
              </button>
            )
          )}
        </div>

        <button
          onClick={onCancel}
          style={{
            marginTop: 14,
            width: '100%',
            padding: '10px 0',
            background: 'none',
            border: 'none',
            fontSize: 13,
            color: '#a8a29e',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
