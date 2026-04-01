export type SpotType = 'open_minded' | 'language_exchange' | 'kdrama' | 'studied_abroad';

export interface Spot {
  id: string;
  lat: number;
  lng: number;
  type: SpotType;
  created_at: string;
}

export const TYPE_CONFIG: Record<
  SpotType,
  { label: string; color: string; quote: string; fashion: string }
> = {
  open_minded: {
    label: 'Open-minded Guy',
    color: '#EF4444',
    quote: '"Are you open-minded?"',
    fashion: 'Black leather jacket · slim jeans · gel hair · latest iPhone',
  },
  language_exchange: {
    label: 'Language Exchange Guy',
    color: '#3B82F6',
    quote: '"Just friends, I teach you Korean~"',
    fashion: 'Oversized hoodie · tote bag · round glasses · Starbucks tumbler',
  },
  kdrama: {
    label: 'K-Drama Guy',
    color: '#8B5CF6',
    quote: '"I\'ve never seen anyone so beautiful"',
    fashion: 'Long wool coat · all-black · excessive cologne · intense stare',
  },
  studied_abroad: {
    label: 'Studied Abroad Guy',
    color: '#22C55E',
    quote: '"Oh I lived in [city]!"',
    fashion: 'Canada Goose or Uniqlo basics · confident Konglish',
  },
};

export const VALID_TYPES: SpotType[] = [
  'open_minded',
  'language_exchange',
  'kdrama',
  'studied_abroad',
];
