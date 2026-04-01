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
  { label: string; color: string; quote: string }
> = {
  open_minded: {
    label: 'Open-minded Guy',
    color: '#EF4444',
    quote: '"Are you open-minded?"',
  },
  language_exchange: {
    label: 'Language Exchange Guy',
    color: '#3B82F6',
    quote: '"Just friends, I teach you Korean~"',
  },
  kdrama: {
    label: 'K-Drama Guy',
    color: '#8B5CF6',
    quote: '"I\'ve never seen anyone so beautiful"',
  },
  studied_abroad: {
    label: 'Studied Abroad Guy',
    color: '#22C55E',
    quote: '"Oh I lived in [city]!"',
  },
};

export const VALID_TYPES: SpotType[] = [
  'open_minded',
  'language_exchange',
  'kdrama',
  'studied_abroad',
];
