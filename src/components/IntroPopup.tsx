'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { SpotType, TYPE_CONFIG } from '@/types';

const INTRO_KEY = 'hbm_intro_v1';
const TYPES: SpotType[] = ['open_minded', 'language_exchange', 'kdrama', 'studied_abroad'];

const SKIN = '#F0C090';
const SKIN_S = '#D4956A';
const HAIR = '#111118';

/* ── 캐릭터 SVG ─────────────────────────────────────── */

function OpenMindedSVG() {
  return (
    <svg viewBox="0 0 160 210" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      {/* 바디 — 블랙 가죽재킷 */}
      <path d="M18 128 Q22 106 46 100 L80 113 L114 100 Q138 106 142 128 L146 210 H14Z" fill="#111"/>
      {/* 재킷 왼쪽 라펠 */}
      <path d="M46 100 L80 113 L63 152 L36 162Z" fill="#1e1e1e"/>
      {/* 재킷 오른쪽 라펠 */}
      <path d="M114 100 L80 113 L97 152 L124 162Z" fill="#1e1e1e"/>
      {/* 이너 셔츠 */}
      <rect x="63" y="113" width="34" height="40" rx="2" fill="#222"/>
      {/* 재킷 지퍼 디테일 */}
      <line x1="80" y1="113" x2="80" y2="210" stroke="#333" strokeWidth="1.5"/>
      {/* 소매 스티치 */}
      <path d="M18 128 Q12 148 14 170" stroke="#111" strokeWidth="14" fill="none" strokeLinecap="round"/>
      <path d="M142 128 Q148 148 146 170" stroke="#111" strokeWidth="14" fill="none" strokeLinecap="round"/>
      {/* 오른손 — 아이폰 들고 있음 */}
      <path d="M142 148 Q152 145 150 162" stroke="#111" strokeWidth="10" fill="none" strokeLinecap="round"/>
      <rect x="144" y="158" width="14" height="24" rx="4" fill="#1a1a2e"/>
      <rect x="146" y="160" width="10" height="20" rx="2.5" fill="#4a9eff" opacity="0.9"/>
      <rect x="148" y="155" width="6" height="4" rx="1" fill="#333"/>
      {/* 목 */}
      <rect x="72" y="86" width="16" height="20" rx="3" fill={SKIN}/>
      {/* 머리 */}
      <ellipse cx="80" cy="62" rx="28" ry="30" fill={SKIN}/>
      {/* 귀 */}
      <ellipse cx="52" cy="63" rx="5" ry="7" fill={SKIN_S}/>
      <ellipse cx="108" cy="63" rx="5" ry="7" fill={SKIN_S}/>
      {/* 투블럭 헤어 — 위쪽 볼륨 */}
      <path d="M52 44 Q58 28 80 26 Q102 28 108 44 L108 56 Q100 47 80 45 Q60 47 52 56Z" fill={HAIR}/>
      {/* 옆머리 짧게 (투블럭 특징) */}
      <path d="M52 44 L51 70 Q53 76 56 78 L54 56Z" fill={HAIR} opacity="0.55"/>
      <path d="M108 44 L109 70 Q107 76 104 78 L106 56Z" fill={HAIR} opacity="0.55"/>
      {/* 젤 광택 */}
      <path d="M66 34 Q73 30 82 31" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.35"/>
      {/* 눈썹 — 짙고 자연스러운 */}
      <path d="M63 55 Q70 52 76 54" stroke={HAIR} strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <path d="M84 54 Q90 52 97 55" stroke={HAIR} strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      {/* 눈 */}
      <ellipse cx="70" cy="63" rx="5.5" ry="5" fill="white"/>
      <ellipse cx="90" cy="63" rx="5.5" ry="5" fill="white"/>
      <ellipse cx="71" cy="63.5" rx="3.5" ry="3.8" fill={HAIR}/>
      <ellipse cx="91" cy="63.5" rx="3.5" ry="3.8" fill={HAIR}/>
      <circle cx="72.5" cy="62" r="1.1" fill="white"/>
      <circle cx="92.5" cy="62" r="1.1" fill="white"/>
      {/* 코 */}
      <path d="M78 68 Q80 72 82 68" stroke={SKIN_S} strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      {/* 비죽 웃음 (smirk) */}
      <path d="M74 77 Q81 82 86 77" stroke={SKIN_S} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function LanguageExchangeSVG() {
  return (
    <svg viewBox="0 0 160 210" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      {/* 오버핏 후드티 */}
      <path d="M12 130 Q16 106 42 100 L80 118 L118 100 Q144 106 148 130 L152 210 H8Z" fill="#7B8FB5"/>
      {/* 후드 */}
      <path d="M42 100 Q58 92 80 90 Q102 92 118 100 Q102 108 80 110 Q58 108 42 100Z" fill="#6A7EA4"/>
      {/* 캥거루 포켓 */}
      <rect x="52" y="158" width="56" height="24" rx="6" fill="#6A7EA4"/>
      <line x1="80" y1="158" x2="80" y2="182" stroke="#5A6E94" strokeWidth="1.5"/>
      {/* 토트백 스트랩 */}
      <path d="M30 112 Q22 135 24 175 Q26 183 34 185" stroke="#8B6914" strokeWidth="5" fill="none" strokeLinecap="round"/>
      {/* 토트백 */}
      <rect x="10" y="175" width="34" height="30" rx="5" fill="#C9A227"/>
      <path d="M16 175 Q27 165 38 175" stroke="#8B6914" strokeWidth="3" fill="none"/>
      <rect x="16" y="183" width="22" height="14" rx="2" fill="#B8911F"/>
      <text x="27" y="193" fontSize="5.5" fill="#6B4E0A" fontFamily="monospace" textAnchor="middle" fontWeight="bold">TOTE</text>
      {/* 스타벅스 컵 오른손 */}
      <path d="M148 138 Q158 133 155 158" stroke="#7B8FB5" strokeWidth="11" fill="none" strokeLinecap="round"/>
      <rect x="145" y="155" width="17" height="26" rx="4" fill="#00704A"/>
      <rect x="145" y="163" width="17" height="2" fill="#005C38"/>
      <circle cx="153" cy="160" r="4.5" fill="#005C38"/>
      <circle cx="153" cy="160" r="2.5" fill="#00704A"/>
      <path d="M149 173 L157 173" stroke="#005C38" strokeWidth="1.2"/>
      {/* 목 */}
      <rect x="72" y="86" width="16" height="22" rx="3" fill={SKIN}/>
      {/* 머리 */}
      <ellipse cx="80" cy="62" rx="28" ry="30" fill={SKIN}/>
      {/* 귀 */}
      <ellipse cx="52" cy="63" rx="5" ry="7" fill={SKIN_S}/>
      <ellipse cx="108" cy="63" rx="5" ry="7" fill={SKIN_S}/>
      {/* 자연스러운 머리 */}
      <path d="M53 47 Q59 30 80 28 Q101 30 107 47 L106 58 Q98 48 80 46 Q62 48 54 58Z" fill={HAIR}/>
      {/* 동그란 안경 */}
      <circle cx="68" cy="63" r="10.5" fill="none" stroke="#5C3A1E" strokeWidth="2.5"/>
      <circle cx="92" cy="63" r="10.5" fill="none" stroke="#5C3A1E" strokeWidth="2.5"/>
      <path d="M78.5 63 L81.5 63" stroke="#5C3A1E" strokeWidth="2.2"/>
      <path d="M57.5 61 L53 58.5" stroke="#5C3A1E" strokeWidth="2" strokeLinecap="round"/>
      <path d="M102.5 61 L107 58.5" stroke="#5C3A1E" strokeWidth="2" strokeLinecap="round"/>
      {/* 안경 렌즈 반사 */}
      <path d="M61 56 Q65 54 68 56" stroke="white" strokeWidth="1" fill="none" opacity="0.4"/>
      <path d="M85 56 Q89 54 92 56" stroke="white" strokeWidth="1" fill="none" opacity="0.4"/>
      {/* 눈 */}
      <ellipse cx="68" cy="63" rx="4" ry="4" fill="white"/>
      <ellipse cx="92" cy="63" rx="4" ry="4" fill="white"/>
      <ellipse cx="68.5" cy="63.5" rx="2.8" ry="3" fill={HAIR}/>
      <ellipse cx="92.5" cy="63.5" rx="2.8" ry="3" fill={HAIR}/>
      {/* 눈썹 */}
      <path d="M62 51 Q68 48 74 50" stroke={HAIR} strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M86 50 Q92 48 98 51" stroke={HAIR} strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* 코 */}
      <path d="M78 68 Q80 72 82 68" stroke={SKIN_S} strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      {/* 친근한 미소 */}
      <path d="M70 77 Q80 85 90 77" stroke={SKIN_S} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function KDramaSVG() {
  return (
    <svg viewBox="0 0 160 220" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      {/* 롱 울코트 — 카멜 */}
      <path d="M14 128 Q18 104 44 98 L80 112 L116 98 Q142 104 146 128 L150 220 H10Z" fill="#C8A96E"/>
      {/* 코트 라펠 (크고 드라마틱) */}
      <path d="M44 98 L80 112 L58 165 L28 175Z" fill="#B8955A"/>
      <path d="M116 98 L80 112 L102 165 L132 175Z" fill="#B8955A"/>
      {/* 올블랙 터틀넥 */}
      <rect x="58" y="112" width="44" height="55" rx="2" fill="#111"/>
      {/* 터틀넥 카라 */}
      <path d="M66 92 Q80 88 94 92 L94 112 Q80 107 66 112Z" fill="#111"/>
      {/* 코트 단추 */}
      <circle cx="80" cy="145" r="3" fill="#9A7840"/>
      <circle cx="80" cy="163" r="3" fill="#9A7840"/>
      <circle cx="80" cy="181" r="3" fill="#9A7840"/>
      {/* 코트 벨트 */}
      <rect x="10" y="188" width="140" height="7" rx="3" fill="#9A7840" opacity="0.6"/>
      {/* 왼손 — 주머니에 */}
      <path d="M14 155 Q6 168 8 184" stroke="#C8A96E" strokeWidth="12" fill="none" strokeLinecap="round"/>
      {/* 목 */}
      <path d="M66 88 Q80 84 94 88 L94 100 Q80 95 66 100Z" fill={SKIN}/>
      {/* 머리 */}
      <ellipse cx="80" cy="60" rx="28" ry="30" fill={SKIN}/>
      {/* 귀 */}
      <ellipse cx="52" cy="61" rx="5" ry="7" fill={SKIN_S}/>
      <ellipse cx="108" cy="61" rx="5" ry="7" fill={SKIN_S}/>
      {/* 바람에 휘날리는 머리 (드라마틱) */}
      <path d="M53 43 Q57 26 80 24 Q103 26 110 40 L112 52 Q104 43 80 41 Q56 43 52 53Z" fill={HAIR}/>
      {/* 바람 효과 — 오른쪽으로 */}
      <path d="M108 36 Q120 30 128 36 Q122 44 112 48Z" fill={HAIR} opacity="0.75"/>
      <path d="M106 26 Q116 20 122 28 Q116 34 108 36Z" fill={HAIR} opacity="0.5"/>
      {/* 눈썹 — 일자형 (시리어스) */}
      <path d="M62 52 L77 53" stroke={HAIR} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M83 53 L98 52" stroke={HAIR} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* 눈 — 강렬한 눈빛 */}
      <ellipse cx="70" cy="61" rx="6" ry="5.5" fill="white"/>
      <ellipse cx="90" cy="61" rx="6" ry="5.5" fill="white"/>
      <ellipse cx="71" cy="61" rx="4.2" ry="4.2" fill={HAIR}/>
      <ellipse cx="91" cy="61" rx="4.2" ry="4.2" fill={HAIR}/>
      {/* 눈빛 광택 */}
      <circle cx="72.5" cy="59.5" r="1.3" fill="white"/>
      <circle cx="92.5" cy="59.5" r="1.3" fill="white"/>
      {/* 눈두덩 음영 (진한 눈매) */}
      <path d="M64 57 Q70 55 76 57" stroke={HAIR} strokeWidth="1" fill="none" opacity="0.4"/>
      <path d="M84 57 Q90 55 96 57" stroke={HAIR} strokeWidth="1" fill="none" opacity="0.4"/>
      {/* 코 */}
      <path d="M77 67 Q80 72 83 67" stroke={SKIN_S} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      {/* 진지한 입 */}
      <path d="M72 78 Q80 81 88 78" stroke={SKIN_S} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function StudiedAbroadSVG() {
  return (
    <svg viewBox="0 0 160 210" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      {/* 패딩 점퍼 (캐나다구스 스타일) */}
      <path d="M18 128 Q22 106 46 100 L80 114 L114 100 Q138 106 142 128 L146 210 H14Z" fill="#1C1C1C"/>
      {/* 퀼팅 라인 */}
      <path d="M18 132 Q80 127 142 132" stroke="#2A2A2A" strokeWidth="2" fill="none"/>
      <path d="M16 148 Q80 143 144 148" stroke="#2A2A2A" strokeWidth="2" fill="none"/>
      <path d="M14 164 Q80 159 146 164" stroke="#2A2A2A" strokeWidth="2" fill="none"/>
      <path d="M14 180 Q80 175 146 180" stroke="#2A2A2A" strokeWidth="2" fill="none"/>
      {/* 칼라 */}
      <path d="M46 100 Q60 93 80 91 Q100 93 114 100 Q100 108 80 110 Q60 108 46 100Z" fill="#252525"/>
      {/* 캐나다구스 암 배지 (오른팔) */}
      <ellipse cx="130" cy="138" rx="10" ry="12" fill="#CC0000"/>
      <circle cx="130" cy="136" r="5.5" fill="white"/>
      <circle cx="130" cy="136" r="3.5" fill="#CC0000"/>
      <line x1="127" y1="136" x2="133" y2="136" stroke="white" strokeWidth="1"/>
      <line x1="130" y1="133" x2="130" y2="139" stroke="white" strokeWidth="1"/>
      {/* 소매 오른쪽 */}
      <path d="M114 105 Q142 110 144 148 Q138 158 128 162" stroke="#1C1C1C" strokeWidth="18" fill="none" strokeLinecap="round"/>
      {/* 소매 왼쪽 — 손 제스처 */}
      <path d="M46 105 Q18 110 16 148" stroke="#1C1C1C" strokeWidth="18" fill="none" strokeLinecap="round"/>
      <path d="M16 148 Q8 155 10 166" stroke="#1C1C1C" strokeWidth="10" fill="none" strokeLinecap="round"/>
      {/* 말하는 말풍선 */}
      <rect x="100" y="40" width="52" height="26" rx="8" fill="white" opacity="0.95"/>
      <path d="M108 66 L112 74 L116 66" fill="white" opacity="0.95"/>
      <text x="126" y="57" fontSize="7" fill="#1C1C1C" textAnchor="middle" fontWeight="bold">Oh I lived</text>
      <text x="126" y="66" fontSize="7" fill="#CC0000" textAnchor="middle" fontWeight="bold">in NYC~</text>
      {/* 지퍼 */}
      <path d="M80 110 L80 210" stroke="#333" strokeWidth="2" fill="none"/>
      {/* 목 */}
      <rect x="72" y="84" width="16" height="22" rx="3" fill={SKIN}/>
      {/* 머리 */}
      <ellipse cx="80" cy="60" rx="28" ry="30" fill={SKIN}/>
      {/* 귀 */}
      <ellipse cx="52" cy="61" rx="5" ry="7" fill={SKIN_S}/>
      <ellipse cx="108" cy="61" rx="5" ry="7" fill={SKIN_S}/>
      {/* 깔끔한 헤어 */}
      <path d="M53 44 Q59 27 80 25 Q101 27 107 44 L106 56 Q98 46 80 44 Q62 46 54 56Z" fill={HAIR}/>
      {/* 자신감 있는 눈썹 (살짝 올라감) */}
      <path d="M63 52 Q69 49 75 51" stroke={HAIR} strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <path d="M85 51 Q91 49 97 52" stroke={HAIR} strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      {/* 눈 */}
      <ellipse cx="69" cy="61" rx="5.5" ry="5.5" fill="white"/>
      <ellipse cx="91" cy="61" rx="5.5" ry="5.5" fill="white"/>
      <ellipse cx="70" cy="61.5" rx="3.8" ry="3.8" fill={HAIR}/>
      <ellipse cx="92" cy="61.5" rx="3.8" ry="3.8" fill={HAIR}/>
      <circle cx="71.5" cy="60" r="1.2" fill="white"/>
      <circle cx="93.5" cy="60" r="1.2" fill="white"/>
      {/* 코 */}
      <path d="M78 67 Q80 71 82 67" stroke={SKIN_S} strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      {/* 자신감 있는 미소 */}
      <path d="M70 76 Q80 84 90 76" stroke={SKIN_S} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

const CHARACTER_IMAGES: Record<SpotType, string> = {
  open_minded: '/images/type-open-minded.jpeg',
  language_exchange: '/images/type-language-exchange.jpeg',
  kdrama: '/images/type-kdrama.jpeg',
  studied_abroad: '/images/type-studied-abroad.jpeg',
};

/* ── 팝업 컴포넌트 ────────────────────────────────────── */

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';
const MAP_BG = `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/126.9227,37.5563,14.5,0/720x600@2x?access_token=${MAPBOX_TOKEN}`;

// page 0 = intro, page 1~4 = types
const TOTAL_PAGES = TYPES.length + 1;

export default function IntroPopup() {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(0);
  const touchStartX = useRef(0);

  useEffect(() => { setVisible(true); }, []);

  const close = useCallback(() => setVisible(false), []);
  const next = useCallback(() => setPage((p) => Math.min(p + 1, TOTAL_PAGES - 1)), []);
  const prev = useCallback(() => setPage((p) => Math.max(p - 1, 0)), []);

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) next();
    if (diff < -50) prev();
  };

  if (!visible) return null;

  const isIntro = page === 0;
  const typeIndex = Math.max(0, page - 1);
  const type = TYPES[typeIndex];
  const config = TYPE_CONFIG[type];
  const isLast = page === TOTAL_PAGES - 1;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}>
      <div
        style={{ width: '88%', maxWidth: 360, background: 'white', borderRadius: 24, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', userSelect: 'none' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >

        {isIntro ? (
          /* ── 인트로 슬라이드 ── */
          <>
            <div style={{
              height: 300, position: 'relative', overflow: 'hidden',
              backgroundImage: `url(${MAP_BG})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
            }}>
              {/* 어두운 오버레이 */}
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.52)' }} />
              {/* Skip */}
              <button onClick={close} style={{ position: 'absolute', right: 14, top: 14, background: 'rgba(255,255,255,0.18)', border: 'none', borderRadius: 8, fontSize: 12, color: 'rgba(255,255,255,0.7)', cursor: 'pointer', padding: '4px 10px', zIndex: 2 }}>
                Skip
              </button>
              {/* 중앙 텍스트 */}
              <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 28px', textAlign: 'center' }}>
                <p style={{ margin: '0 0 10px', fontSize: 18, color: 'white', fontFamily: "'Rock Salt', cursive", lineHeight: 1.4 }}>
                  🇰🇷 HONGDAE BOY MAP 📍
                </p>
                <p style={{ margin: '0 0 20px', fontSize: 14, color: 'rgba(255,255,255,0.92)', fontWeight: 600, lineHeight: 1.6 }}>
                  Spotted a Hongdae Boy?<br />Tap the map, drop a pin.
                </p>
                <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em' }}>
                  SWIPE TO SEE THE TYPES →
                </p>
              </div>
            </div>

            <div style={{ padding: '14px 20px 18px' }}>
              {/* 도트 — 인트로 포함 */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 12 }}>
                {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
                  <button key={i} onClick={() => setPage(i)}
                    style={{ width: i === page ? 18 : 6, height: 6, borderRadius: 9999, background: i === page ? '#1c1917' : '#e5e7eb', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.2s' }}
                  />
                ))}
              </div>
              <button onClick={next} style={{ width: '100%', padding: '13px 0', borderRadius: 14, background: '#1c1917', color: 'white', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' }}>
                Which one was it? →
              </button>
            </div>
          </>
        ) : (
          /* ── 캐릭터 슬라이드 ── */
          <>
            {/* 캐릭터 이미지 + 인용 오버레이 */}
            <div style={{ height: 200, background: `${config.color}10`, position: 'relative', overflow: 'hidden' }}>
              <img
                src={CHARACTER_IMAGES[type]}
                alt={config.label}
                style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }}
              />
              {/* Skip */}
              <button onClick={close} style={{ position: 'absolute', right: 10, top: 10, background: 'rgba(0,0,0,0.28)', border: 'none', borderRadius: 8, fontSize: 12, color: 'rgba(255,255,255,0.75)', cursor: 'pointer', padding: '4px 10px', zIndex: 2 }}>
                Skip
              </button>
              {/* 하단 그라데이션 + 명언 */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.72))', padding: '28px 14px 10px', pointerEvents: 'none' }}>
                <p style={{ margin: 0, fontSize: 13, fontStyle: 'italic', fontWeight: 700, color: 'white', lineHeight: 1.45, textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
                  {config.quote}
                </p>
              </div>
              {/* 화살표 */}
              {page > 1 && (
                <button onClick={prev} style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.88)', border: 'none', borderRadius: '50%', width: 30, height: 30, fontSize: 13, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  ←
                </button>
              )}
              {!isLast && (
                <button onClick={next} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.88)', border: 'none', borderRadius: '50%', width: 30, height: 30, fontSize: 13, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  →
                </button>
              )}
            </div>

            {/* 타입 정보 */}
            <div style={{ padding: '14px 20px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: config.color, flexShrink: 0 }} />
                <p style={{ margin: 0, fontSize: 18, fontWeight: 900, color: config.color, letterSpacing: '-0.01em' }}>{config.label}</p>
              </div>
              <p style={{ margin: '0 0 12px', fontSize: 12, color: '#78716c', lineHeight: 1.6 }}>{config.fashion}</p>

              {/* 도트 */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 12 }}>
                {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
                  <button key={i} onClick={() => setPage(i)}
                    style={{ width: i === page ? 18 : 6, height: 6, borderRadius: 9999, background: i === page ? config.color : '#e5e7eb', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.2s' }}
                  />
                ))}
              </div>

              {isLast ? (
                <button onClick={close} style={{ width: '100%', padding: '13px 0', borderRadius: 14, background: config.color, color: 'white', fontWeight: 800, fontSize: 14, border: 'none', cursor: 'pointer', letterSpacing: '0.02em' }}>
                  Let&apos;s spot! 📍
                </button>
              ) : (
                <button onClick={next} style={{ width: '100%', padding: '13px 0', borderRadius: 14, background: '#f5f5f4', color: '#57534e', fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer' }}>
                  Next →
                </button>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
