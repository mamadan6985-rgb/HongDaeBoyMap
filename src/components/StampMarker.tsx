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
    <div
      style={{ transform: `rotate(${rotation}deg)`, pointerEvents: 'none' }}
    >
      <svg
        width="52"
        height="52"
        viewBox="0 0 52 52"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer dashed ring — classic rubber stamp look */}
        <circle
          cx="26"
          cy="26"
          r="24"
          fill="none"
          stroke={config.color}
          strokeWidth="2.5"
          strokeDasharray="4 2.5"
          opacity="0.9"
        />
        {/* Inner tinted fill */}
        <circle cx="26" cy="26" r="19" fill={config.color} opacity="0.1" />
        {/* Inner ring */}
        <circle
          cx="26"
          cy="26"
          r="19"
          fill="none"
          stroke={config.color}
          strokeWidth="1"
          opacity="0.35"
        />
        {/* HONGDAE */}
        <text
          x="26"
          y="23"
          textAnchor="middle"
          fontSize="6.5"
          fontWeight="800"
          fill={config.color}
          fontFamily="'Courier New', Courier, monospace"
          letterSpacing="1.2"
          opacity="0.9"
        >
          HONGDAE
        </text>
        {/* BOY */}
        <text
          x="26"
          y="32"
          textAnchor="middle"
          fontSize="6.5"
          fontWeight="800"
          fill={config.color}
          fontFamily="'Courier New', Courier, monospace"
          letterSpacing="1.2"
          opacity="0.9"
        >
          BOY
        </text>
      </svg>
    </div>
  );
}
