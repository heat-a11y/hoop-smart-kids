import { motion } from 'framer-motion';

export default function Basketball({ x, y, size = 10, animate = false, delay = 0 }) {
  const ball = (
    <g>
      {/* Glow */}
      <circle cx={x} cy={y} r={size + 6} fill="#FBBF24" opacity="0.15" />
      {/* Ball */}
      <circle cx={x} cy={y} r={size} fill="#F97316" stroke="#7C2D12" strokeWidth="1.5" />
      {/* Lines */}
      <path d={`M ${x} ${y - size} Q ${x + size * 0.5} ${y}, ${x} ${y + size}`} fill="none" stroke="#7C2D12" strokeWidth="0.8" opacity="0.6" />
      <path d={`M ${x - size} ${y} Q ${x} ${y - size * 0.5}, ${x + size} ${y}`} fill="none" stroke="#7C2D12" strokeWidth="0.8" opacity="0.6" />
      {/* Highlight */}
      <ellipse cx={x - size * 0.3} cy={y - size * 0.3} rx={size * 0.25} ry={size * 0.2} fill="white" opacity="0.2" />
    </g>
  );

  if (!animate) return ball;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 200 }}
    >
      {ball}
    </motion.g>
  );
}
