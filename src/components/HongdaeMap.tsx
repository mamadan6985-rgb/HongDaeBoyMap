'use client';

import { useState, useCallback, useEffect } from 'react';
import Map, { Marker, NavigationControl, type MapMouseEvent } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import TypeSelector from './TypeSelector';
import StampMarker from './StampMarker';
import { Spot, SpotType, TYPE_CONFIG } from '@/types';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';

const INITIAL_VIEW = {
  longitude: 126.9227,
  latitude: 37.5563,
  zoom: 15,
};

export default function HongdaeMap() {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [pendingLocation, setPendingLocation] = useState<{ lng: number; lat: number } | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
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
    setPendingLocation({ lng: e.lngLat.lng, lat: e.lngLat.lat });
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
          const saved: Spot = await res.json();
          setSpots((prev) => prev.map((s) => (s.id === newSpot.id ? saved : s)));
        }
      } catch {
        // Keep local state even if API fails
      }
    },
    [pendingLocation]
  );

  const overlayBg = isDark ? 'rgba(28,25,23,0.92)' : 'rgba(255,255,255,0.92)';
  const titleColor = isDark ? '#f5f5f4' : '#1c1917';
  const subtitleColor = isDark ? '#78716c' : '#a8a29e';
  const legendTextColor = isDark ? '#a8a29e' : '#57534e';
  const countColor = isDark ? '#44403c' : '#d6d3d1';

  return (
    <div style={{ width: '100%', flex: 1, position: 'relative' }}>
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={INITIAL_VIEW}
        style={{ width: '100%', height: '100%' }}
        mapStyle={isDark ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11'}
        minZoom={11}
        maxZoom={18}
        onClick={handleMapClick}
        cursor={pendingLocation ? 'default' : 'crosshair'}
      >
        <NavigationControl position="top-right" />

        {spots.map((spot) => (
          <Marker key={spot.id} longitude={spot.lng} latitude={spot.lat} anchor="center">
            <div onClick={(e) => e.stopPropagation()}>
              <StampMarker type={spot.type} id={spot.id} />
            </div>
          </Marker>
        ))}
      </Map>

      {/* Title overlay */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          background: overlayBg,
          backdropFilter: 'blur(8px)',
          borderRadius: 14,
          padding: '10px 16px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
          pointerEvents: 'none',
        }}
      >
        <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: titleColor, fontFamily: 'monospace' }}>
          Hongdae Boy Map
        </p>
        <p style={{ margin: '2px 0 0', fontSize: 11, color: subtitleColor }}>
          tap anywhere to spot
        </p>
      </div>

      {/* Legend */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: 16,
          background: overlayBg,
          backdropFilter: 'blur(8px)',
          borderRadius: 14,
          padding: '10px 14px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
          pointerEvents: 'none',
        }}
      >
        {(Object.entries(TYPE_CONFIG) as [SpotType, (typeof TYPE_CONFIG)[SpotType]][]).map(([type, config]) => (
          <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: config.color, flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: legendTextColor, whiteSpace: 'nowrap' }}>{config.label}</span>
          </div>
        ))}
        <p style={{ margin: '6px 0 0', fontSize: 10, color: countColor }}>{spots.length} spotted</p>
      </div>

      {pendingLocation && (
        <TypeSelector isDark={isDark} onSelect={handleTypeSelect} onCancel={() => setPendingLocation(null)} />
      )}
    </div>
  );
}
