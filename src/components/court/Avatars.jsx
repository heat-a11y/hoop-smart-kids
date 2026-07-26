import { motion } from 'framer-motion';

/**
 * 🟡 Ball Handler — energetic kid avatar with basketball and glowing aura.
 */
export function BallHandlerAvatar({ x, y, size = 20, label = '', animate = false, delay = 0, glow = false, pulse = false, onClick }) {
  const r = size;
  const avatar = (
    <g className={onClick ? 'cursor-pointer' : ''} onClick={onClick} style={{ pointerEvents: onClick ? 'auto' : 'none' }}>
      {/* Glow aura */}
      {glow && (
        <>
          <circle cx={x} cy={y} r={r * 1.8} fill="none" stroke="#FBBF24" strokeWidth="2" opacity="0.2" className="animate-pulse" />
          <circle cx={x} cy={y} r={r * 2.2} fill="#FBBF24" opacity="0.06" />
        </>
      )}

      {/* Shadow */}
      <ellipse cx={x + 2} cy={y + r * 0.9} rx={r * 0.6} ry={r * 0.2} fill="rgba(0,0,0,0.2)" />

      {/* Body circle */}
      <circle cx={x} cy={y} r={r * 0.85} fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" filter="url(#softShadow)" />

      {/* Jersey */}
      <circle cx={x} cy={y + r * 0.05} r={r * 0.5} fill="#F59E0B" opacity="0.4" />

      {/* Eyes */}
      <g>
        {/* Left eye */}
        <circle cx={x - r * 0.28} cy={y - r * 0.1} r={r * 0.12} fill="#1A1A2E" />
        <circle cx={x - r * 0.24} cy={y - r * 0.13} r={r * 0.04} fill="white" opacity="0.8" />
        {/* Right eye */}
        <circle cx={x + r * 0.28} cy={y - r * 0.1} r={r * 0.12} fill="#1A1A2E" />
        <circle cx={x + r * 0.32} cy={y - r * 0.13} r={r * 0.04} fill="white" opacity="0.8" />
      </g>

      {/* Smile */}
      <path d={`M ${x - r * 0.2} ${y + r * 0.15} Q ${x} ${y + r * 0.35}, ${x + r * 0.2} ${y + r * 0.15}`} fill="none" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" />

      {/* Basketball in hand */}
      <g transform={`translate(${x + r * 0.6}, ${y - r * 0.4})`}>
        <circle cx={0} cy={0} r={r * 0.32} fill="#F97316" stroke="#7C2D12" strokeWidth="1" />
        <path d={`M 0 ${-r * 0.32} Q ${r * 0.16} 0, 0 ${r * 0.32}`} fill="none" stroke="#7C2D12" strokeWidth="0.5" opacity="0.5" />
        <path d={`M ${-r * 0.32} 0 Q 0 ${-r * 0.16}, ${r * 0.32} 0`} fill="none" stroke="#7C2D12" strokeWidth="0.5" opacity="0.5" />
      </g>

      {/* Jersey number */}
      {label && (
        <text x={x} y={y + r * 0.55} textAnchor="middle" fill="#B45309" fontSize={r * 0.45} fontWeight="bold" fontFamily="Nunito, sans-serif" style={{ pointerEvents: 'none' }}>
          {label.charAt(0)}
        </text>
      )}
    </g>
  );

  if (!animate) return avatar;
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={pulse ? { opacity: 1, scale: [1, 1.08, 1] } : { opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 200, damping: 15, ...(pulse && { repeat: Infinity, duration: 1.5 }) }}
    >
      {avatar}
    </motion.g>
  );
}

/**
 * 🔵 Teammate — friendly blue cartoon avatar with smile and jersey number.
 */
export function TeammateAvatar({ x, y, size = 18, label = '', animate = false, delay = 0, pulse = false, onClick }) {
  const r = size;
  const avatar = (
    <g className={onClick ? 'cursor-pointer' : ''} onClick={onClick} style={{ pointerEvents: onClick ? 'auto' : 'none' }}>
      {/* Shadow */}
      <ellipse cx={x + 1} cy={y + r * 0.85} rx={r * 0.5} ry={r * 0.15} fill="rgba(0,0,0,0.15)" />

      {/* Body */}
      <circle cx={x} cy={y} r={r * 0.8} fill="#3B82F6" stroke="#2563EB" strokeWidth="1.5" filter="url(#softShadow)" />

      {/* Jersey stripe */}
      <rect x={x - r * 0.3} y={y - r * 0.15} width={r * 0.6} height={r * 0.25} rx={r * 0.08} fill="#2563EB" opacity="0.3" />

      {/* Eyes */}
      <circle cx={x - r * 0.22} cy={y - r * 0.08} r={r * 0.1} fill="white" />
      <circle cx={x - r * 0.19} cy={y - r * 0.1} r={r * 0.04} fill="#1A1A2E" />
      <circle cx={x + r * 0.22} cy={y - r * 0.08} r={r * 0.1} fill="white" />
      <circle cx={x + r * 0.25} cy={y - r * 0.1} r={r * 0.04} fill="#1A1A2E" />

      {/* Friendly smile */}
      <path d={`M ${x - r * 0.15} ${y + r * 0.15} Q ${x} ${y + r * 0.3}, ${x + r * 0.15} ${y + r * 0.15}`} fill="none" stroke="#1E3A5F" strokeWidth="1.2" strokeLinecap="round" />

      {/* Cheek blush */}
      <circle cx={x - r * 0.38} cy={y + r * 0.05} r={r * 0.08} fill="#F472B6" opacity="0.3" />
      <circle cx={x + r * 0.38} cy={y + r * 0.05} r={r * 0.08} fill="#F472B6" opacity="0.3" />

      {/* Jersey number */}
      {label && (
        <text x={x} y={y + r * 0.5} textAnchor="middle" fill="white" fontSize={r * 0.4} fontWeight="bold" fontFamily="Nunito, sans-serif" style={{ pointerEvents: 'none' }}>
          {label.charAt(0)}
        </text>
      )}
    </g>
  );

  if (!animate) return avatar;
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={pulse ? { opacity: 1, scale: [1, 1.06, 1] } : { opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 200, damping: 15, ...(pulse && { repeat: Infinity, duration: 2 }) }}
    >
      {avatar}
    </motion.g>
  );
}

/**
 * 🔴 Defender — playful red avatar with wide defense stance and open arms.
 */
export function DefenderAvatar({ x, y, size = 18, label = '', animate = false, delay = 0, glow = false, pulse = false, onClick }) {
  const r = size;
  const armSpan = r * 0.55;
  const avatar = (
    <g className={onClick ? 'cursor-pointer' : ''} onClick={onClick} style={{ pointerEvents: onClick ? 'auto' : 'none' }}>
      {/* Glow when active */}
      {glow && <circle cx={x} cy={y} r={r * 1.6} fill="none" stroke="#EF4444" strokeWidth="1.5" opacity="0.2" className="animate-pulse" />}

      {/* Shadow */}
      <ellipse cx={x + 1} cy={y + r * 0.95} rx={r * 0.6} ry={r * 0.18} fill="rgba(0,0,0,0.15)" />

      {/* Open arms (defense stance) — left */}
      <line x1={x - r * 0.5} y1={y - r * 0.1} x2={x - r * 0.5 - armSpan} y2={y - r * 0.4} stroke="#DC2626" strokeWidth={r * 0.18} strokeLinecap="round" />
      {/* Right arm */}
      <line x1={x + r * 0.5} y1={y - r * 0.1} x2={x + r * 0.5 + armSpan} y2={y - r * 0.4} stroke="#DC2626" strokeWidth={r * 0.18} strokeLinecap="round" />

      {/* Legs (wide stance) */}
      <line x1={x - r * 0.3} y1={y + r * 0.5} x2={x - r * 0.5} y2={y + r * 0.85} stroke="#B91C1C" strokeWidth={r * 0.16} strokeLinecap="round" />
      <line x1={x + r * 0.3} y1={y + r * 0.5} x2={x + r * 0.5} y2={y + r * 0.85} stroke="#B91C1C" strokeWidth={r * 0.16} strokeLinecap="round" />

      {/* Body */}
      <circle cx={x} cy={y} r={r * 0.78} fill="#EF4444" stroke="#DC2626" strokeWidth="1.5" filter="url(#softShadow)" />

      {/* Determined eyes */}
      <g>
        {/* Left eye — angled for determination */}
        <line x1={x - r * 0.35} y1={y - r * 0.12} x2={x - r * 0.1} y2={y - r * 0.05} stroke="#7F1D1D" strokeWidth={r * 0.12} strokeLinecap="round" />
        <line x1={x + r * 0.1} y1={y - r * 0.05} x2={x + r * 0.35} y2={y - r * 0.12} stroke="#7F1D1D" strokeWidth={r * 0.12} strokeLinecap="round" />
      </g>

      {/* Gritted smile */}
      <path d={`M ${x - r * 0.15} ${y + r * 0.18} Q ${x} ${y + r * 0.28}, ${x + r * 0.15} ${y + r * 0.18}`} fill="none" stroke="#7F1D1D" strokeWidth="1" strokeLinecap="round" />

      {/* Label */}
      {label && (
        <text x={x} y={y + r * 0.6} textAnchor="middle" fill="white" fontSize={r * 0.38} fontWeight="bold" fontFamily="Nunito, sans-serif" style={{ pointerEvents: 'none' }}>
          {label.charAt(0)}
        </text>
      )}
    </g>
  );

  if (!animate) return avatar;
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={pulse ? { opacity: 1, scale: [1, 1.05, 1] } : { opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 200, damping: 15, ...(pulse && { repeat: Infinity, duration: 1.2 }) }}
    >
      {avatar}
    </motion.g>
  );
}

/**
 * 🐻 Coach Hoopy — cute cartoon bear mascot SVG (standalone, no external assets).
 * Animated eyes, whistle, clipboard, and bouncing.
 */
export function CoachHoopyAvatar({ size = 48, animating = false, type = 'correct' }) {
  const s = size;

  const getEmotion = () => {
    switch (type) {
      case 'correct': return { eyeOffset: 0, mouthArc: s * 0.08 };
      case 'wrong': return { eyeOffset: -s * 0.02, mouthArc: -s * 0.04 };
      case 'suboptimal': return { eyeOffset: s * 0.01, mouthArc: s * 0.02 };
      default: return { eyeOffset: 0, mouthArc: s * 0.06 };
    }
  };

  const emotion = getEmotion();

  return (
    <motion.g
      animate={animating ? { y: [0, -3, 0] } : {}}
      transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
    >
      {/* Shadow */}
      <ellipse cx={s * 0.05} cy={s * 0.95} rx={s * 0.35} ry={s * 0.08} fill="rgba(0,0,0,0.15)" />

      {/* Body */}
      <ellipse cx={0} cy={s * 0.3} rx={s * 0.3} ry={s * 0.35} fill="#8B5CF6" stroke="#7C3AED" strokeWidth="1.5" filter="url(#softShadow)" />

      {/* Belly */}
      <ellipse cx={0} cy={s * 0.35} rx={s * 0.18} ry={s * 0.22} fill="#A78BFA" opacity="0.4" />

      {/* Jersey stripe */}
      <rect x={-s * 0.08} y={s * 0.1} width={s * 0.16} height={s * 0.3} rx={s * 0.03} fill="#7C3AED" opacity="0.3" />

      {/* Left arm with clipboard */}
      <g>
        <line x1={-s * 0.25} y1={s * 0.2} x2={-s * 0.45} y2={s * 0.35} stroke="#7C3AED" strokeWidth={s * 0.1} strokeLinecap="round" />
        {/* Clipboard */}
        <rect x={-s * 0.55} y={s * 0.2} width={s * 0.2} height={s * 0.25} rx={s * 0.03} fill="#D97706" stroke="#B45309" strokeWidth="1" />
        <rect x={-s * 0.52} y={s * 0.23} width={s * 0.14} height={s * 0.03} rx="1" fill="white" opacity="0.4" />
        <rect x={-s * 0.52} y={s * 0.28} width={s * 0.1} height={s * 0.03} rx="1" fill="white" opacity="0.3" />
        <rect x={-s * 0.52} y={s * 0.33} width={s * 0.12} height={s * 0.03} rx="1" fill="white" opacity="0.3" />
      </g>

      {/* Right arm with whistle */}
      <g>
        <line x1={s * 0.25} y1={s * 0.2} x2={s * 0.45} y2={s * 0.1} stroke="#7C3AED" strokeWidth={s * 0.1} strokeLinecap="round" />
        {/* Whistle string */}
        <path d={`M ${s * 0.45} ${s * 0.1} Q ${s * 0.45} ${s * 0.05}, ${s * 0.4} ${s * 0.02}`} fill="none" stroke="#6B7280" strokeWidth="1" />
        {/* Whistle body */}
        <rect x={s * 0.35} y={-s * 0.02} width={s * 0.12} height={s * 0.06} rx={s * 0.01} fill="#F59E0B" stroke="#B45309" strokeWidth="0.5" />
      </g>

      {/* Head */}
      <circle cx={0} cy={-s * 0.15} r={s * 0.32} fill="#8B5CF6" stroke="#7C3AED" strokeWidth="1.5" />

      {/* Ears */}
      <circle cx={-s * 0.25} cy={-s * 0.38} r={s * 0.1} fill="#7C3AED" stroke="#6D28D9" strokeWidth="1" />
      <circle cx={-s * 0.25} cy={-s * 0.38} r={s * 0.05} fill="#A78BFA" />
      <circle cx={s * 0.25} cy={-s * 0.38} r={s * 0.1} fill="#7C3AED" stroke="#6D28D9" strokeWidth="1" />
      <circle cx={s * 0.25} cy={-s * 0.38} r={s * 0.05} fill="#A78BFA" />

      {/* Snout */}
      <ellipse cx={0} cy={-s * 0.08} rx={s * 0.15} ry={s * 0.1} fill="#A78BFA" />

      {/* Nose */}
      <ellipse cx={0} cy={-s * 0.11} rx={s * 0.06} ry={s * 0.04} fill="#1E1B4B" />

      {/* Eyes — animated */}
      <motion.g
        animate={animating ? { x: [0, 1, 0, -1, 0] } : {}}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      >
        {/* Left eye */}
        <circle cx={-s * 0.12} cy={-s * 0.22} r={s * 0.06} fill="white" />
        <circle cx={-s * 0.1} cy={-s * 0.22 + emotion.eyeOffset} r={s * 0.035} fill="#1E1B4B" />
        <circle cx={-s * 0.08} cy={-s * 0.24 + emotion.eyeOffset} r={s * 0.015} fill="white" opacity="0.8" />

        {/* Right eye */}
        <circle cx={s * 0.12} cy={-s * 0.22} r={s * 0.06} fill="white" />
        <circle cx={s * 0.14} cy={-s * 0.22 + emotion.eyeOffset} r={s * 0.035} fill="#1E1B4B" />
        <circle cx={s * 0.16} cy={-s * 0.24 + emotion.eyeOffset} r={s * 0.015} fill="white" opacity="0.8" />
      </motion.g>

      {/* Eyebrows (expressive) */}
      <line x1={-s * 0.18} y1={-s * 0.3} x2={-s * 0.08} y2={-s * 0.28} stroke="#5B21B6" strokeWidth="1.5" strokeLinecap="round" />
      <line x1={s * 0.08} y1={-s * 0.28} x2={s * 0.18} y2={-s * 0.3} stroke="#5B21B6" strokeWidth="1.5" strokeLinecap="round" />

      {/* Mouth */}
      <path
        d={`M ${-s * 0.08} ${-s * 0.03} Q ${0} ${-s * 0.03 + emotion.mouthArc}, ${s * 0.08} ${-s * 0.03}`}
        fill="none"
        stroke="#5B21B6"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Whistle lanyard around neck */}
      <path d={`M ${-s * 0.15} ${s * 0.05} Q ${0} ${s * 0.12}, ${s * 0.15} ${s * 0.05}`} fill="none" stroke="#6B7280" strokeWidth="0.8" opacity="0.5" />

      {/* Coach hat */}
      <ellipse cx={0} cy={-s * 0.38} rx={s * 0.28} ry={s * 0.04} fill="#5B21B6" />
      <path d={`M ${-s * 0.2} ${-s * 0.38} Q ${0} ${-s * 0.55}, ${s * 0.2} ${-s * 0.38}`} fill="#5B21B6" stroke="#4C1D95" strokeWidth="0.8" />

      {/* Reaction emoji bubble */}
      {type && (
        <g transform={`translate(${s * 0.35}, ${-s * 0.45})`}>
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.3 }}
          >
            <circle cx={0} cy={0} r={s * 0.12} fill="white" stroke="#E5E7EB" strokeWidth="0.5" />
            <text x={0} y={s * 0.02} textAnchor="middle" fontSize={s * 0.14} dominantBaseline="central">
              {type === 'correct' ? '🎉' : type === 'wrong' ? '💪' : type === 'suboptimal' ? '🤔' : '🏆'}
            </text>
          </motion.g>
        </g>
      )}
    </motion.g>
  );
}
