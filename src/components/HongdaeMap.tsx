'use client';

import { useState, useCallback, useEffect } from 'react';
import Map, { Marker, NavigationControl, type MapMouseEvent } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import TypeSelector from './TypeSelector';
import StampMarker from './StampMarker';
import StampDetail from './StampDetail';
import Link from 'next/link';
import { Spot, SpotType, TYPE_CONFIG } from '@/types';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';

const INITIAL_VIEW = {
  longitude: 126.9227,
  latitude: 37.5563,
  zoom: 15,
};

const TOKENS_KEY = 'hbm_tokens';

function loadDeleteTokens(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(TOKENS_KEY) ?? '{}');
  } catch {
    return {};
  }
}

function saveDeleteToken(spotId: string, token: string) {
  const tokens = loadDeleteTokens();
  tokens[spotId] = token;
  localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
}

function removeDeleteToken(spotId: string) {
  const tokens = loadDeleteTokens();
  delete tokens[spotId];
  localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
}

export default function HongdaeMap() {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [pendingLocation, setPendingLocation] = useState<{ lng: number; lat: number } | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [deleteTokens, setDeleteTokens] = useState<Record<string, string>>({});
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setDeleteTokens(loadDeleteTokens());
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    fetch('/api/spots')
      .then((r) => r.json())
      .then((data: Spot[]) => setSpots(data))
      .catch(() => {});
  }, []);

  const handleMapClick = useCallback((e: MapMouseEvent) => {
    setSelectedSpot(null);
    setPendingLocation({ lng: e.lngLat.lng, lat: e.lngLat.lat });
  }, []);

  const handleStampClick = useCallback((spot: Spot) => {
    setPendingLocation(null);
    setSelectedSpot(spot);
  }, []);

  const handleTypeSelect = useCallback(
    async (type: SpotType) => {
      if (!pendingLocation) return;

      const newSpot: Spot = {
        id: crypto.randomUUID(),
        lat: pendingLocation.lat,
        lng: pendingLocation.lng,
        type,
        created_at: new Date().toISOString(),
      };

      setSpots((prev) => [...prev, newSpot]);
      setPendingLocation(null);

      try {
        const res = await fetch('/api/spots', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lat: pendingLocation.lat, lng: pendingLocation.lng, type }),
        });
        if (res.ok) {
          const saved: Spot & { delete_token?: string } = await res.json();
          if (saved.delete_token) {
            saveDeleteToken(saved.id, saved.delete_token);
            setDeleteTokens((prev) => ({ ...prev, [saved.id]: saved.delete_token! }));
          }
          setSpots((prev) => prev.map((s) => (s.id === newSpot.id ? saved : s)));
        }
      } catch {
        // Keep local state even if API fails
      }
    },
    [pendingLocation]
  );

  const handleDelete = useCallback(async () => {
    if (!selectedSpot) return;
    const token = deleteTokens[selectedSpot.id];

    setSpots((prev) => prev.filter((s) => s.id !== selectedSpot.id));
    setSelectedSpot(null);
    removeDeleteToken(selectedSpot.id);
    setDeleteTokens((prev) => {
      const next = { ...prev };
      delete next[selectedSpot.id];
      return next;
    });

    try {
      await fetch(`/api/spots/${selectedSpot.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
    } catch {
      // Already removed from local state
    }
  }, [selectedSpot, deleteTokens]);

  const overlayBg = isDark ? 'rgba(28,25,23,0.92)' : 'rgba(255,255,255,0.92)';
  const titleColor = isDark ? '#f5f5f4' : '#1c1917';
  const subtitleColor = isDark ? '#78716c' : '#a8a29e';
  const legendTextColor = isDark ? '#a8a29e' : '#57534e';
  const countColor = isDark ? '#44403c' : '#d6d3d1';

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Map
        key={isDark ? 'dark' : 'light'}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={INITIAL_VIEW}
        style={{ width: '100%', height: '100%' }}
        mapStyle={isDark ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11'}
        minZoom={11}
        maxZoom={18}
        onClick={handleMapClick}
        cursor={pendingLocation ? 'default' : 'crosshair'}
      >
        <NavigationControl position="bottom-right" />

        {spots.map((spot) => (
          <Marker key={spot.id} longitude={spot.lng} latitude={spot.lat} anchor="center">
            <div
              onClick={(e) => { e.stopPropagation(); handleStampClick(spot); }}
              style={{ cursor: 'pointer' }}
            >
              <StampMarker type={spot.type} id={spot.id} />
            </div>
          </Marker>
        ))}
      </Map>

      {/* Title overlay */}
      <div
        style={{
          position: 'absolute', top: 60, left: 12,
          background: 'rgba(28,25,23,0.92)', backdropFilter: 'blur(8px)',
          borderRadius: 14, padding: '10px 16px',
          boxShadow: 'rgba(0,0,0,0.15) 0px 2px 12px', pointerEvents: 'none',
        }}
      >
        <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: titleColor, fontFamily: 'monospace' }}>
          Hongdae Boy Map
        </p>
        <p style={{ margin: '2px 0 0', fontSize: 11, color: subtitleColor }}>tap anywhere to spot</p>
      </div>

      {/* Legend */}
      <div
        style={{
          position: 'absolute', bottom: 24, left: 16,
          background: overlayBg, backdropFilter: 'blur(8px)',
          borderRadius: 14, padding: '10px 14px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.15)', pointerEvents: 'none',
        }}
      >
        {(Object.entries(TYPE_CONFIG) as [SpotType, (typeof TYPE_CONFIG)[SpotType]][]).map(([type, config]) => (
          <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: config.color, flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: legendTextColor, whiteSpace: 'nowrap' }}>{config.label}</span>
          </div>
        ))}
        <p style={{ margin: '6px 0 0', fontSize: 10, color: countColor }}>{spots.length} spotted</p>
        <div style={{ marginTop: 8, display: 'flex', gap: 10, borderTop: `1px solid ${isDark ? '#292524' : '#e7e5e4'}`, paddingTop: 8 }}>
          <Link href="/about" style={{ fontSize: 10, color: subtitleColor, textDecoration: 'none' }}>About</Link>
          <Link href="/privacy" style={{ fontSize: 10, color: subtitleColor, textDecoration: 'none' }}>Privacy</Link>
        </div>
      </div>

      {pendingLocation && (
        <TypeSelector
          isDark={isDark}
          onSelect={handleTypeSelect}
          onCancel={() => setPendingLocation(null)}
        />
      )}

      {selectedSpot && (
        <StampDetail
          spot={selectedSpot}
          isOwner={!!deleteTokens[selectedSpot.id]}
          isDark={isDark}
          onDelete={handleDelete}
          onClose={() => setSelectedSpot(null)}
        />
      )}
    </div>
  );
}
