import { SpotType, TYPE_CONFIG } from '@/types';

interface Props {
  type: SpotType;
  id: string;
}

function getRotation(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  return (Math.abs(hash) % 30) - 15; // -15 to +15 degrees
}

export default function StampMarker({ type, id }: Props) {
  const config = TYPE_CONFIG[type];
  const rotation = getRotation(id);

  return (
    <div style={{ transform: `rotate(${rotation}deg)`, pointerEvents: 'none' }}>
      <div
        className="stamp-drop"
        style={{ filter: `drop-shadow(0 0 8px ${config.color}90)` }}
      >
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Glow ring */}
          <circle
            cx="32"
            cy="32"
            r="30"
            fill={config.color}
            opacity="0.08"
          />
          {/* Outer dashed ring — rubber stamp */}
          <circle
            cx="32"
            cy="32"
            r="29"
            fill="none"
            stroke={config.color}
            strokeWidth="3"
            strokeDasharray="5.5 3"
            opacity="1"
          />
          {/* Inner tinted fill */}
          <circle cx="32" cy="32" r="23" fill={config.color} opacity="0.14" />
          {/* Inner solid ring */}
          <circle
            cx="32"
            cy="32"
            r="23"
            fill="none"
            stroke={config.color}
            strokeWidth="1.5"
            opacity="0.6"
          />
          {/* HONGDAE */}
          <text
            x="32"
            y="29"
            textAnchor="middle"
            fontSize="8"
            fontWeight="900"
            fill={config.color}
            fontFamily="'Courier New', Courier, monospace"
            letterSpacing="1.8"
          >
            HONGDAE
          </text>
          {/* BOY */}
          <text
            x="32"
            y="40"
            textAnchor="middle"
            fontSize="8"
            fontWeight="900"
            fill={config.color}
            fontFamily="'Courier New', Courier, monospace"
            letterSpacing="1.8"
          >
            BOY
          </text>
        </svg>
      </div>
    </div>
  );
}
