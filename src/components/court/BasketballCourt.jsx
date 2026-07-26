/**
 * BasketballCourt — SVG tactical court with responsive viewBox scaling.
 * Supports half='top' (offense / front court, attacking basket at top)
 * and half='bottom' (defense / back court, defending basket at bottom).
 *
 * Coordinates in 0-320 space; when half='bottom' children are translated +320.
 * Three-point line is correctly drawn FURTHER from the basket than the free-throw line.
 */

function CourtHalf({ cx, w, baseY, dir }) {
  // baseY = inner-baseline y coordinate (where basket sits)
  // dir = 1 for top half (y increases into court), -1 for bottom half (y decreases into court)
  const paintH = 72; // key height from baseline into court
  const ftY = baseY + paintH * dir; // free-throw line
  const arcCtrlY = baseY + 232 * dir; // control point for 3pt arc — arcs peak ~140px from baseline
  const labelY = baseY + 110 * dir;

  return (
    <g>
      {/* Three-point arc — extends from baseline INTO the court, peaking behind the free-throw line */}
      <path
        d={`M ${w * 0.22} ${baseY} Q ${cx} ${arcCtrlY}, ${w * 0.78} ${baseY}`}
        fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.6"
      />

      {/* Free-throw line */}
      <line
        x1={w * 0.3} y1={ftY}
        x2={w * 0.7} y2={ftY}
        stroke="white" strokeWidth="1.5" strokeOpacity="0.6"
      />

      {/* Paint / Key */}
      <rect
        x={w * 0.3} y={dir > 0 ? baseY : ftY}
        width={w * 0.4} height={paintH}
        fill="none" stroke="white" strokeWidth="1.5"
        strokeOpacity="0.5" strokeDasharray="4,3"
      />

      {/* Basket / Hoop — on the baseline */}
      <g transform={`translate(${cx}, ${baseY})`}>
        <rect x="-12" y="-2" width="24" height="4" fill="white" opacity="0.8" rx="1" />
        <ellipse cx="0" cy="6" rx="10" ry="3" fill="none" stroke="red" strokeWidth="2.5" />
        <path d="M -8 8 Q -5 16 0 18 Q 5 16 8 8" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
      </g>

      {/* Paint label */}
      <text x={cx} y={labelY} textAnchor="middle" fill="white" fontSize="9" opacity="0.15" fontWeight="bold">PAINT</text>

      {/* Three-point label */}
      <text x={w * 0.88} y={baseY + 20 * dir} textAnchor="middle" fill="white" fontSize="7" opacity="0.2">3PT</text>
    </g>
  );
}

export default function BasketballCourt({ children, width = 400, height = 640, className = '', half = 'top' }) {
  const padding = 20;
  const isBottom = half === 'bottom';
  const courtY = isBottom ? height / 2 : 0;
  const courtH = height / 2 - padding - 8;
  const cx = width / 2;

  // Baseline (inner border) for each half

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
        <pattern id="woodGrain" patternUnits="userSpaceOnUse" width="20" height="20">
          <rect width="20" height="20" fill="#C97B3E" />
          <line x1="0" y1="18" x2="20" y2="18" stroke="#B86C30" strokeWidth="0.5" opacity="0.3" />
          <line x1="0" y1="14" x2="20" y2="14" stroke="#B86C30" strokeWidth="0.3" opacity="0.2" />
          <line x1="0" y1="6" x2="20" y2="6" stroke="#B86C30" strokeWidth="0.3" opacity="0.15" />
        </pattern>
        <linearGradient id="courtGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4A04A" />
          <stop offset="50%" stopColor="#C88D3A" />
          <stop offset="100%" stopColor="#B87D30" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
        </filter>
        <filter id="successGlow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
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

      {/* Court inner border */}
      <rect
        x={padding + 8} y={courtY + padding + 8}
        width={width - 2 * padding - 16} height={courtH - 16}
        fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.85" rx="2"
      />

      {/* Half-court / center line */}
      <line
        x1={padding + 8} y1={courtY + height / 2}
        x2={width - padding - 8} y2={courtY + height / 2}
        stroke="white" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="6,4"
      />
      {/* Center circle */}
      <circle
        cx={cx} cy={courtY + height / 2}
        r="30" fill="none" stroke="white" strokeWidth="1.5"
        strokeOpacity="0.4" strokeDasharray="4,4"
      />

      {/* ==================== HALF COURTS ==================== */}
      {isBottom ? (
        <CourtHalf cx={cx} w={width} baseY={height - padding - 8} dir={-1} label="defense" />
      ) : (
        <CourtHalf cx={cx} w={width} baseY={padding + 8} dir={1} label="offense" />
      )}

      {/* Children — translated to correct half */}
      {half === 'bottom' ? (
        <g transform={`translate(0, ${height / 2})`}>
          {children}
        </g>
      ) : (
        <g>
          {children}
        </g>
      )}
    </svg>
  );
}
