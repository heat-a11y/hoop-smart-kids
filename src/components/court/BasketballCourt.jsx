/**
 * BasketballCourt — SVG tactical court with responsive viewBox scaling,
 * dual-input (touch + mouse) pointer events, and safe touch zones.
 *
 * Scales automatically from 320px mobile to widescreen desktop.
 * Supports half='top' (defense, basket at top) and half='bottom' (offense, basket at bottom).
 */
export default function BasketballCourt({ children, width = 400, height = 640, className = '', half = 'top' }) {
  const padding = 20;
  const isBottom = half === 'bottom';
  const courtY = isBottom ? height / 2 : 0;
  const basketY = isBottom ? height - padding - 4 : padding + 4;
  const courtH = height / 2 - padding - 8;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`w-full max-w-lg mx-auto h-auto touch-none select-none ${className}`}
      style={{
        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
        maxHeight: '50vh',
        touchAction: 'manipulation',
      }}
    >
      <defs>
        {/* Wood grain pattern */}
        <pattern id="woodGrain" patternUnits="userSpaceOnUse" width="20" height="20">
          <rect width="20" height="20" fill="#C97B3E" />
          <line x1="0" y1="18" x2="20" y2="18" stroke="#B86C30" strokeWidth="0.5" opacity="0.3" />
          <line x1="0" y1="14" x2="20" y2="14" stroke="#B86C30" strokeWidth="0.3" opacity="0.2" />
          <line x1="0" y1="6" x2="20" y2="6" stroke="#B86C30" strokeWidth="0.3" opacity="0.15" />
        </pattern>

        {/* Court floor gradient */}
        <linearGradient id="courtGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4A04A" />
          <stop offset="50%" stopColor="#C88D3A" />
          <stop offset="100%" stopColor="#B87D30" />
        </linearGradient>

        {/* Clip path */}
        <clipPath id="courtClip">
          <rect x={padding} y={courtY + padding} width={width - 2 * padding} height={courtH} rx="4" />
        </clipPath>

        {/* Glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Soft shadow */}
        <filter id="softShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
        </filter>

        {/* Success glow */}
        <filter id="successGlow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Arrow head marker */}
        <marker id="arrowYellow" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
          <polygon points="0,0 6,3 0,6" fill="#FFE135" />
        </marker>
        <marker id="arrowGreen" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
          <polygon points="0,0 6,3 0,6" fill="#2ECC71" />
        </marker>
      </defs>

      {/* Court base */}
      <rect
        x={padding} y={courtY + padding}
        width={width - 2 * padding} height={courtH}
        fill="url(#woodGrain)" rx="6"
        stroke="#8B6914" strokeWidth="2"
      />

      {/* Court border */}
      <rect
        x={padding + 8} y={courtY + padding + 8}
        width={width - 2 * padding - 16} height={courtH - 16}
        fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.85" rx="2"
      />

      {/* Half-court line */}
      <line
        x1={width / 2} y1={courtY + padding + 8}
        x2={width / 2} y2={courtY + height / 2 - padding - 8}
        stroke="white" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="6,4"
      />

      {/* Center circle */}
      <circle
        cx={width / 2} cy={courtY + height / 2 - padding - 8}
        r="30" fill="none" stroke="white" strokeWidth="1.5"
        strokeOpacity="0.4" strokeDasharray="4,4"
      />

      {/* Three-point arc */}
      {isBottom ? (
        <path
          d={`M ${width * 0.25} ${courtY + height / 2 - padding - 8} Q ${width / 2} ${courtY + height / 2 + 20}, ${width * 0.75} ${courtY + height / 2 - padding - 8}`}
          fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.6"
        />
      ) : (
        <path
          d={`M ${width * 0.25} ${courtY + padding + 8} Q ${width / 2} ${courtY + padding - 20}, ${width * 0.75} ${courtY + padding + 8}`}
          fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.6"
        />
      )}

      {/* Free-throw line */}
      <line
        x1={width * 0.3} y1={isBottom ? courtY + height / 2 - height * 0.35 : courtY + height * 0.35}
        x2={width * 0.7} y2={isBottom ? courtY + height / 2 - height * 0.35 : courtY + height * 0.35}
        stroke="white" strokeWidth="1.5" strokeOpacity="0.6"
      />

      {/* Key / Lane */}
      {isBottom ? (
        <rect
          x={width * 0.3}
          y={courtY + height / 2 - height * 0.35 + padding + 8}
          width={width * 0.4}
          height={height * 0.35 - padding - 8}
          fill="none" stroke="white" strokeWidth="1.5"
          strokeOpacity="0.5" strokeDasharray="4,3"
        />
      ) : (
        <rect
          x={width * 0.3} y={courtY + padding + 8}
          width={width * 0.4} height={height * 0.35 - padding - 8}
          fill="none" stroke="white" strokeWidth="1.5"
          strokeOpacity="0.5" strokeDasharray="4,3"
        />
      )}

      {/* Basket / Hoop */}
      <g transform={`translate(${width / 2}, ${basketY})`}>
        <rect x="-12" y="-2" width="24" height="4" fill="white" opacity="0.8" rx="1" />
        <ellipse cx="0" cy="6" rx="10" ry="3" fill="none" stroke="red" strokeWidth="2.5" />
        <path d="M -8 8 Q -5 16 0 18 Q 5 16 8 8" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
      </g>

      {/* Paint label */}
      {isBottom ? (
        <text x={width / 2} y={courtY + height / 2 - height * 0.2} textAnchor="middle" fill="white" fontSize="9" opacity="0.15" fontWeight="bold">PAINT</text>
      ) : (
        <text x={width / 2} y={courtY + height * 0.2} textAnchor="middle" fill="white" fontSize="9" opacity="0.15" fontWeight="bold">PAINT</text>
      )}

      {/* Three-point label */}
      {isBottom ? (
        <text x={width * 0.88} y={courtY + height / 2 - padding - 20} textAnchor="middle" fill="white" fontSize="7" opacity="0.2">3PT</text>
      ) : (
        <text x={width * 0.88} y={courtY + padding + 20} textAnchor="middle" fill="white" fontSize="7" opacity="0.2">3PT</text>
      )}

      {/* Children (avatars, ball, arrows, overlays) */}
      <g>
        {children}
      </g>
    </svg>
  );
}
