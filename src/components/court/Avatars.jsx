import { motion } from 'framer-motion';

/**
 * Shared jersey-styled avatar components — no faces, no directional ambiguity.
 * Clean athletic silhouettes that work at any court position.
 */

/**
 * 🟡 Ball Handler — gold jersey with basketball icon and glow.
 */
export function BallHandlerAvatar({ x, y, size = 20, label = '', animate = false, delay = 0, glow = false, pulse = false, onClick }) {
  const r = size;
  const avatar = (
    <g className={onClick ? 'cursor-pointer' : ''} onClick={onClick} style={{ pointerEvents: onClick ? 'auto' : 'none' }}>
      {/* Glow aura */}
      {glow && (
        <>
          <circle cx={x} cy={y} r={r * 1.6} fill="none" stroke="#FBBF24" strokeWidth="2" opacity="0.25" className="animate-pulse" />
          <circle cx={x} cy={y} r={r * 2.0} fill="#FBBF24" opacity="0.06" />
        </>
      )}

      {/* Shadow */}
      <ellipse cx={x} cy={y + r * 0.85} rx={r * 0.55} ry={r * 0.18} fill="rgba(0,0,0,0.2)" />

      {/* Jersey body */}
      <circle cx={x} cy={y} r={r * 0.82} fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" filter="url(#softShadow)" />

      {/* Jersey stripe */}
      <path d={`M ${x - r * 0.25} ${y - r * 0.5} L ${x - r * 0.15} ${y + r * 0.5} L ${x + r * 0.15} ${y + r * 0.5} L ${x + r * 0.25} ${y - r * 0.5}`} fill="#F59E0B" opacity="0.35" />

      {/* Basketball icon at bottom (dribbling, not shooting) */}
      <g transform={`translate(${x + r * 0.4}, ${y + r * 0.3})`}>
        <circle cx={0} cy={0} r={r * 0.28} fill="#F97316" stroke="#7C2D12" strokeWidth="1.2" />
        <path d={`M 0 ${-r * 0.28} Q ${r * 0.14} 0, 0 ${r * 0.28}`} fill="none" stroke="#7C2D12" strokeWidth="0.6" opacity="0.6" />
        <path d={`M ${-r * 0.28} 0 Q 0 ${-r * 0.14}, ${r * 0.28} 0`} fill="none" stroke="#7C2D12" strokeWidth="0.6" opacity="0.6" />
      </g>

      {/* Star accent at top */}
      <polygon
        points={`${x - r * 0.38},${y - r * 0.25} ${x - r * 0.3},${y - r * 0.4} ${x - r * 0.22},${y - r * 0.25} ${x - r * 0.42},${y - r * 0.33} ${x - r * 0.18},${y - r * 0.33}`}
        fill="white" opacity="0.3"
      />

      {/* Jersey number */}
      {label && (
        <text x={x} y={y + r * 0.45} textAnchor="middle" fill="#B45309" fontSize={r * 0.42} fontWeight="bold" fontFamily="Nunito, sans-serif" style={{ pointerEvents: 'none' }}>
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
 * 🔵 Teammate — blue jersey with clean athletic silhouette.
 */
export function TeammateAvatar({ x, y, size = 18, label = '', animate = false, delay = 0, pulse = false, onClick }) {
  const r = size;
  const avatar = (
    <g className={onClick ? 'cursor-pointer' : ''} onClick={onClick} style={{ pointerEvents: onClick ? 'auto' : 'none' }}>
      {/* Shadow */}
      <ellipse cx={x} cy={y + r * 0.85} rx={r * 0.5} ry={r * 0.15} fill="rgba(0,0,0,0.15)" />

      {/* Jersey body */}
      <circle cx={x} cy={y} r={r * 0.78} fill="#3B82F6" stroke="#2563EB" strokeWidth="1.5" filter="url(#softShadow)" />

      {/* Jersey stripes */}
      <rect x={x - r * 0.28} y={y - r * 0.2} width={r * 0.56} height={r * 0.28} rx={r * 0.06} fill="#2563EB" opacity="0.3" />
      <line x1={x - r * 0.3} y1={y - r * 0.45} x2={x - r * 0.2} y2={y + r * 0.45} stroke="#2563EB" strokeWidth={r * 0.06} opacity="0.2" strokeLinecap="round" />
      <line x1={x + r * 0.3} y1={y - r * 0.45} x2={x + r * 0.2} y2={y + r * 0.45} stroke="#2563EB" strokeWidth={r * 0.06} opacity="0.2" strokeLinecap="round" />

      {/* Shoulder accents */}
      <circle cx={x - r * 0.35} cy={y - r * 0.15} r={r * 0.06} fill="#2563EB" opacity="0.15" />
      <circle cx={x + r * 0.35} cy={y - r * 0.15} r={r * 0.06} fill="#2563EB" opacity="0.15" />

      {/* Jersey number */}
      {label && (
        <text x={x} y={y + r * 0.45} textAnchor="middle" fill="white" fontSize={r * 0.4} fontWeight="bold" fontFamily="Nunito, sans-serif" style={{ pointerEvents: 'none' }}>
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
 * 🔴 Defender — red jersey with shield motif, wide defensive silhouette.
 */
export function DefenderAvatar({ x, y, size = 18, label = '', animate = false, delay = 0, glow = false, pulse = false, onClick }) {
  const r = size;
  const avatar = (
    <g className={onClick ? 'cursor-pointer' : ''} onClick={onClick} style={{ pointerEvents: onClick ? 'auto' : 'none' }}>
      {/* Glow ring */}
      {glow && <circle cx={x} cy={y} r={r * 1.5} fill="none" stroke="#EF4444" strokeWidth="1.5" opacity="0.2" className="animate-pulse" />}

      {/* Shadow */}
      <ellipse cx={x} cy={y + r * 0.9} rx={r * 0.55} ry={r * 0.18} fill="rgba(0,0,0,0.15)" />

      {/* Extended arms (defensive stance) — symmetric, pointing DOWN (back to basket) */}
      <line x1={x - r * 0.5} y1={y - r * 0.05} x2={x - r * 0.5 - r * 0.5} y2={y + r * 0.25} stroke="#DC2626" strokeWidth={r * 0.15} strokeLinecap="round" />
      <line x1={x + r * 0.5} y1={y - r * 0.05} x2={x + r * 0.5 + r * 0.5} y2={y + r * 0.25} stroke="#DC2626" strokeWidth={r * 0.15} strokeLinecap="round" />

      {/* Wide legs */}
      <line x1={x - r * 0.25} y1={y + r * 0.5} x2={x - r * 0.45} y2={y + r * 0.85} stroke="#B91C1C" strokeWidth={r * 0.14} strokeLinecap="round" />
      <line x1={x + r * 0.25} y1={y + r * 0.5} x2={x + r * 0.45} y2={y + r * 0.85} stroke="#B91C1C" strokeWidth={r * 0.14} strokeLinecap="round" />

      {/* Jersey body */}
      <circle cx={x} cy={y} r={r * 0.75} fill="#EF4444" stroke="#DC2626" strokeWidth="1.5" filter="url(#softShadow)" />

      {/* Shield emblem */}
      <path
        d={`M ${x - r * 0.2} ${y - r * 0.3} L ${x + r * 0.2} ${y - r * 0.3} L ${x + r * 0.25} ${y + r * 0.05} Q ${x} ${y + r * 0.25}, ${x - r * 0.25} ${y + r * 0.05} Z`}
        fill="#DC2626" opacity="0.35"
      />
      <line x1={x - r * 0.08} y1={y - r * 0.12} x2={x - r * 0.08} y2={y + r * 0.02} stroke="white" strokeWidth={r * 0.04} strokeLinecap="round" opacity="0.4" />
      <line x1={x + r * 0.08} y1={y - r * 0.12} x2={x + r * 0.08} y2={y + r * 0.02} stroke="white" strokeWidth={r * 0.04} strokeLinecap="round" opacity="0.4" />

      {/* Number */}
      {label && (
        <text x={x} y={y + r * 0.55} textAnchor="middle" fill="white" fontSize={r * 0.38} fontWeight="bold" fontFamily="Nunito, sans-serif" style={{ pointerEvents: 'none' }}>
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
 * 🐻 Coach Hoopy — cute bear mascot SVG (facing direction is handled by the parent SVG).
 * No directional features — symmetric face design.
 */
export function CoachHoopyAvatar({ size = 48, animating = false, type = 'correct' }) {
  const s = size;

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
        <rect x={-s * 0.55} y={s * 0.2} width={s * 0.2} height={s * 0.25} rx={s * 0.03} fill="#D97706" stroke="#B45309" strokeWidth="1" />
        <rect x={-s * 0.52} y={s * 0.23} width={s * 0.14} height={s * 0.03} rx="1" fill="white" opacity="0.4" />
        <rect x={-s * 0.52} y={s * 0.28} width={s * 0.1} height={s * 0.03} rx="1" fill="white" opacity="0.3" />
        <rect x={-s * 0.52} y={s * 0.33} width={s * 0.12} height={s * 0.03} rx="1" fill="white" opacity="0.3" />
      </g>

      {/* Right arm */}
      <g>
        <line x1={s * 0.25} y1={s * 0.2} x2={s * 0.45} y2={s * 0.1} stroke="#7C3AED" strokeWidth={s * 0.1} strokeLinecap="round" />
        {/* Whistle string */}
        <path d={`M ${s * 0.45} ${s * 0.1} Q ${s * 0.45} ${s * 0.05}, ${s * 0.4} ${s * 0.02}`} fill="none" stroke="#6B7280" strokeWidth="0.8" />
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

      {/* Eyes — animated, symmetric */}
      <motion.g
        animate={animating ? { x: [0, 1, 0, -1, 0] } : {}}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      >
        <circle cx={-s * 0.12} cy={-s * 0.22} r={s * 0.06} fill="white" />
        <circle cx={-s * 0.1} cy={-s * 0.22} r={s * 0.035} fill="#1E1B4B" />
        <circle cx={-s * 0.08} cy={-s * 0.24} r={s * 0.015} fill="white" opacity="0.8" />
        <circle cx={s * 0.12} cy={-s * 0.22} r={s * 0.06} fill="white" />
        <circle cx={s * 0.14} cy={-s * 0.22} r={s * 0.035} fill="#1E1B4B" />
        <circle cx={s * 0.16} cy={-s * 0.24} r={s * 0.015} fill="white" opacity="0.8" />
      </motion.g>

      {/* Eyebrows */}
      <line x1={-s * 0.18} y1={-s * 0.3} x2={-s * 0.08} y2={-s * 0.28} stroke="#5B21B6" strokeWidth="1.2" strokeLinecap="round" />
      <line x1={s * 0.08} y1={-s * 0.28} x2={s * 0.18} y2={-s * 0.3} stroke="#5B21B6" strokeWidth="1.2" strokeLinecap="round" />

      {/* Smile */}
      <path d={`M ${-s * 0.08} ${-s * 0.03} Q ${0} ${-s * 0.01}, ${s * 0.08} ${-s * 0.03}`} fill="none" stroke="#5B21B6" strokeWidth="1.2" strokeLinecap="round" />

      {/* Whistle lanyard */}
      <path d={`M ${-s * 0.15} ${s * 0.05} Q ${0} ${s * 0.12}, ${s * 0.15} ${s * 0.05}`} fill="none" stroke="#6B7280" strokeWidth="0.8" opacity="0.5" />

      {/* Coach hat */}
      <ellipse cx={0} cy={-s * 0.38} rx={s * 0.28} ry={s * 0.04} fill="#5B21B6" />
      <path d={`M ${-s * 0.2} ${-s * 0.38} Q ${0} ${-s * 0.55}, ${s * 0.2} ${-s * 0.38}`} fill="#5B21B6" stroke="#4C1D95" strokeWidth="0.8" />

      {/* Reaction emoji bubble */}
      {type && (
        <g transform={`translate(${s * 0.35}, ${-s * 0.45})`}>
          <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.3 }}>
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
