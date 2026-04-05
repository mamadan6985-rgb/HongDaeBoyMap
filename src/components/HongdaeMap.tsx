'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Map, { Marker, NavigationControl, type MapMouseEvent, type MapRef } from 'react-map-gl/mapbox';
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
  const mapRef = useRef<MapRef>(null);
  const [spots, setSpots] = useState<Spot[]>([]);
  const [pendingLocation, setPendingLocation] = useState<{ lng: number; lat: number } | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [deleteTokens, setDeleteTokens] = useState<Record<string, string>>({});
  const [isDark, setIsDark] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

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

  const handleLocate = useCallback(() => {
    if (!navigator.geolocation) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        mapRef.current?.flyTo({ center: [pos.coords.longitude, pos.coords.latitude], zoom: 16, duration: 1200 });
        setIsLocating(false);
      },
      () => setIsLocating(false),
      { timeout: 8000 }
    );
  }, []);

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

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Map
        ref={mapRef}
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
          position: 'absolute',
          top: 60,
          left: 12,
          background: 'rgba(10,10,10,0.88)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: 14,
          padding: '10px 14px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.07)',
          pointerEvents: 'none',
        }}
      >
        <p style={{
          margin: 0,
          fontSize: 20,
          color: '#FFE500',
          fontFamily: "'Bebas Neue', cursive",
          letterSpacing: '0.08em',
          lineHeight: 1,
        }}>
          📍 Hongdae Boy Map
        </p>
        <p style={{
          margin: '4px 0 0',
          fontSize: 10,
          color: 'rgba(240,235,227,0.4)',
          fontFamily: "'Courier New', monospace",
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>
          tap anywhere to spot
        </p>
      </div>

      {/* Legend */}
      <div
        style={{
          position: 'absolute',
          bottom: 58,
          left: 12,
          background: 'rgba(10,10,10,0.88)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: 14,
          padding: '12px 14px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.07)',
          pointerEvents: 'none',
          minWidth: 148,
        }}
      >
        {(Object.entries(TYPE_CONFIG) as [SpotType, (typeof TYPE_CONFIG)[SpotType]][]).map(([type, config]) => (
          <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
            <span style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: config.color,
              flexShrink: 0,
              boxShadow: `0 0 5px ${config.color}80`,
            }} />
            <span style={{
              fontSize: 11,
              color: 'rgba(240,235,227,0.6)',
              whiteSpace: 'nowrap',
              fontFamily: "'Courier New', monospace",
            }}>
              {config.label}
            </span>
          </div>
        ))}

        <div style={{
          marginTop: 8,
          paddingTop: 8,
          borderTop: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <span style={{
            fontSize: 11,
            fontFamily: "'Bebas Neue', cursive",
            color: '#FFE500',
            letterSpacing: '0.06em',
          }}>
            {spots.length} SPOTTED
          </span>
          <span style={{ display: 'flex', gap: 10, pointerEvents: 'auto' }}>
            <Link href="/about" style={{ fontSize: 10, color: 'rgba(240,235,227,0.3)', textDecoration: 'none', fontFamily: "'Courier New', monospace" }}>
              About
            </Link>
            <Link href="/privacy" style={{ fontSize: 10, color: 'rgba(240,235,227,0.3)', textDecoration: 'none', fontFamily: "'Courier New', monospace" }}>
              Privacy
            </Link>
          </span>
        </div>
      </div>

      {/* 현위치 버튼 */}
      <button
        onClick={handleLocate}
        style={{
          position: 'absolute',
          bottom: 172,
          right: 10,
          width: 34,
          height: 34,
          borderRadius: 8,
          background: 'rgba(10,10,10,0.88)',
          backdropFilter: 'blur(8px)',
          border: 'none',
          boxShadow: '0 2px 12px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.1)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isLocating ? 0.5 : 1,
          transition: 'opacity 0.2s',
        }}
        title="Go to my location"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke={isLocating ? 'rgba(240,235,227,0.3)' : '#2979FF'}
          strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="6" />
          <line x1="12" y1="18" x2="12" y2="22" />
          <line x1="2" y1="12" x2="6" y2="12" />
          <line x1="18" y1="12" x2="22" y2="12" />
        </svg>
      </button>

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
