/**
 * TrophyBadges — Inline SVG trophy badges for IQ milestone tiers.
 * No external images. Pure SVG paths.
 *
 * Tiers:
 *   Rookie (0-300 IQ)     — Bronze star / 篮球菜鸟
 *   Floor General (300-700) — Silver shield / 控场大师
 *   IQ Genius (700+)        — Gold crown / 篮球学霸
 */
import { useLanguage } from '../context/LanguageContext';

/** Bronze rookie star badge */
function RookieBadge({ unlocked = false, size = 64 }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 64 64" className={unlocked ? '' : 'opacity-30 grayscale'}>
      {/* Shield background */}
      <path d="M32 4 L54 16 L54 38 Q54 50 32 60 Q10 50 10 38 L10 16 Z" fill={unlocked ? '#CD7F32' : '#4A4A4A'} stroke={unlocked ? '#A0652F' : '#333'} strokeWidth="2" />
      {/* Inner circle */}
      <circle cx="32" cy="28" r="14" fill={unlocked ? '#F5DEB3' : '#3A3A3A'} />
      {/* Star */}
      {unlocked && (
        <path d="M32 18 L35 24 L42 25 L37 30 L38 37 L32 33 L26 37 L27 30 L22 25 L29 24 Z" fill="#8B6914" />
      )}
      {/* Label */}
      <text x="32" y="52" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="Nunito, sans-serif">
        ROOKIE
      </text>
    </svg>
  );
}

/** Silver Floor General shield badge */
function FloorGeneralBadge({ unlocked = false, size = 64 }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 64 64" className={unlocked ? '' : 'opacity-30 grayscale'}>
      {/* Shield */}
      <path d="M32 2 L56 14 V38 Q56 54 32 62 Q8 54 8 38 V14 Z" fill={unlocked ? '#C0C0C0' : '#4A4A4A'} stroke={unlocked ? '#9E9E9E' : '#333'} strokeWidth="2" />
      {/* Chevron */}
      <path d="M22 28 L32 18 L42 28" fill="none" stroke={unlocked ? '#4A4A4A' : '#333'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 34 L32 24 L42 34" fill="none" stroke={unlocked ? '#4A4A4A' : '#333'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="32" y="48" textAnchor="middle" fill={unlocked ? '#4A4A4A' : '#666'} fontSize="5.5" fontWeight="bold" fontFamily="Nunito, sans-serif">
        FLOOR GEN
      </text>
    </svg>
  );
}

/** Gold IQ Genius crown badge */
function GeniusBadge({ unlocked = false, size = 64 }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 64 64" className={unlocked ? '' : 'opacity-30 grayscale'}>
      {/* Crown */}
      <path d="M8 44 L8 18 L20 28 L32 14 L44 28 L56 18 L56 44 Z" fill={unlocked ? '#FFD700' : '#4A4A4A'} stroke={unlocked ? '#DAA520' : '#333'} strokeWidth="2" />
      {/* Jewels */}
      <circle cx="20" cy="28" r="3" fill={unlocked ? '#FF6B6B' : '#555'} />
      <circle cx="32" cy="20" r="3" fill={unlocked ? '#4FC3F7' : '#555'} />
      <circle cx="44" cy="28" r="3" fill={unlocked ? '#FF6B6B' : '#555'} />
      {/* Brain sparkle */}
      <text x="32" y="38" textAnchor="middle" fontSize="10" dominantBaseline="central">
        {unlocked ? '🧠' : '❓'}
      </text>
      <text x="32" y="54" textAnchor="middle" fill={unlocked ? '#B8860B' : '#666'} fontSize="5" fontWeight="bold" fontFamily="Nunito, sans-serif">
        GENIUS
      </text>
    </svg>
  );
}

/** Trophy case — renders all three milestone badges with labels */
export default function TrophyBadges({ totalXP, size = 64 }) {
  const { lang } = useLanguage();

  const tiers = [
    { Badge: RookieBadge, minXP: 0, labelEn: 'Rookie', labelZh: '篮球菜鸟', unlocked: true },
    { Badge: FloorGeneralBadge, minXP: 300, labelEn: 'Floor General', labelZh: '控场大师', unlocked: totalXP >= 300 },
    { Badge: GeniusBadge, minXP: 700, labelEn: 'Basketball IQ Genius', labelZh: '篮球学霸', unlocked: totalXP >= 700 },
  ];

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6 py-4">
      {tiers.map((tier, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5">
          <tier.Badge unlocked={tier.unlocked} size={size} />
          <span className={`text-[10px] font-bold font-display text-center ${tier.unlocked ? 'text-white/80' : 'text-white/30'}`}>
            {lang === 'en' ? tier.labelEn : tier.labelZh}
          </span>
          {tier.unlocked && (
            <span className="text-[8px] text-success-green/60 font-bold">
              ✅
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export { RookieBadge, FloorGeneralBadge, GeniusBadge };
