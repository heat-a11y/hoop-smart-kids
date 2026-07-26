import { motion } from 'framer-motion';

const teamColors = {
  offense: '#3B82F6',      // Blue
  defense: '#EF4444',      // Red
  ballHandler: '#FBBF24',  // Yellow/Gold
  neutral: '#8B5CF6',      // Purple
};

const playerEmojis = {
  offense: '🔵',
  defense: '🔴',
  ballHandler: '🟡',
};

export default function PlayerDot({
  x,
  y,
  label = '',
  type = 'offense',
  size = 16,
  animate = false,
  delay = 0,
  glow = false,
  pulse = false,
  onClick,
  className = '',
}) {
  const color = teamColors[type] || teamColors.neutral;
  const strokeColor = type === 'ballHandler' ? '#F59E0B' : 'white';

  const dot = (
    <g
      className={`cursor-${onClick ? 'pointer' : 'default'} ${className}`}
      onClick={onClick}
      style={{ pointerEvents: onClick ? 'auto' : 'none' }}
    >
      {/* Glow ring */}
      {glow && (
        <circle
          cx={x}
          cy={y}
          r={size + 8}
          fill="none"
          stroke={color}
          strokeWidth="2"
          opacity="0.4"
          className="animate-pulse"
        />
      )}

      {/* Main circle */}
      <circle
        cx={x}
        cy={y}
        r={size}
        fill={color}
        stroke={strokeColor}
        strokeWidth="2.5"
        filter="url(#softShadow)"
      />

      {/* Inner highlight */}
      <circle
        cx={x - size * 0.25}
        cy={y - size * 0.25}
        r={size * 0.35}
        fill="white"
        opacity="0.25"
      />

      {/* Jersey number */}
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fill="white"
        fontSize={size * 0.8}
        fontWeight="bold"
        fontFamily="Nunito, sans-serif"
        style={{ pointerEvents: 'none' }}
      >
        {label.charAt(0)}
      </text>
    </g>
  );

  if (!animate) return dot;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={
        pulse
          ? { opacity: 1, scale: [1, 1.15, 1] }
          : { opacity: 1, scale: 1 }
      }
      transition={{
        delay,
        type: 'spring',
        stiffness: 200,
        damping: 15,
        ...(pulse && { repeat: Infinity, duration: 1.5 }),
      }}
    >
      {dot}
    </motion.g>
  );
}
