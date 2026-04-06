'use client';

import { useEffect, useState } from 'react';
import { Spot, SpotType, TYPE_CONFIG } from '@/types';

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function ActivityFeed() {
  const [spots, setSpots] = useState<Spot[]>([]);

  useEffect(() => {
    const load = () =>
      fetch('/api/spots')
        .then((r) => r.json())
        .then((data: Spot[]) => {
          const sorted = [...data].sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          setSpots(sorted.slice(0, 4));
        })
        .catch(() => {});
    load();
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, []);

  if (spots.length === 0) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 60,
        right: 12,
        background: 'rgba(10,10,10,0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: 14,
        padding: '10px 13px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.07)',
        pointerEvents: 'none',
        minWidth: 168,
        maxWidth: 200,
      }}
    >
      <p style={{
        margin: '0 0 8px',
        fontSize: 10,
        fontFamily: "'Bebas Neue', cursive",
        color: '#FFE500',
        letterSpacing: '0.1em',
      }}>
        RECENT SIGHTINGS
      </p>
      {spots.map((spot) => {
        const config = TYPE_CONFIG[spot.type as SpotType];
        return (
          <div key={spot.id} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: config.color,
              flexShrink: 0,
              boxShadow: `0 0 4px ${config.color}80`,
            }} />
            <span style={{
              fontSize: 10,
              color: 'rgba(240,235,227,0.55)',
              fontFamily: "'Courier New', monospace",
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {config.label} · {timeAgo(spot.created_at)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
