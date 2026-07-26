/**
 * InteractiveCourt.tsx — Zero-dependency, ultra-responsive SVG court engine.
 *
 * Built for Hoop Smart Kids / 篮球小能手.
 *
 * Features:
 * — responsive viewBox scaling (800×500, xMidYMid meet)
 * — unified Pointer Events (touch + mouse drag-and-drop)
 * — inline SVG avatars (Offense, Defense, Hero) — no framer-motion
 * — dynamic target rings (green open / red pressure) with CSS pulse
 * — animated pass/shoot trajectories with stroke-dasharray dashes
 * — touch-action: none on canvas
 * — mobile-first: 320px → 4K
 *
 * Usage:
 *   <InteractiveCourt
 *     players={[
 *       { id: 'pg', type: 'offense', x: 400, y: 320, label: 'PG', draggable: true },
 *       { id: 'd1', type: 'defense', x: 400, y: 240, label: 'D' },
 *     ]}
 *     zones={[
 *       { x: 300, y: 260, type: 'open', label: 'Pass!' },
 *     ]}
 *     trajectories={[
 *       { from: { x: 400, y: 320 }, to: { x: 300, y: 260 }, type: 'pass' },
 *     ]}
 *     onPlayerDrag={(id, x, y) => console.log(id, x, y)}
 *     onCourtTap={(x, y) => console.log(x, y)}
 *   />
 */

import React, { useState, useRef, useCallback, useMemo } from 'react';

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface Point {
  x: number;
  y: number;
}

export interface PlayerDef {
  id: string;
  type: 'offense' | 'defense' | 'hero';
  x: number;
  y: number;
  label?: string;
  draggable?: boolean;
  size?: number;
}

export interface TargetZone {
  x: number;
  y: number;
  type: 'open' | 'pressure';
  label?: string;
  size?: number;
}

export interface Trajectory {
  from: Point;
  to: Point;
  type: 'pass' | 'shoot';
  color?: string;
  animated?: boolean;
}

export interface InteractiveCourtProps {
  /** ViewBox width (default 800) */
  width?: number;
  /** ViewBox height (default 500) */
  height?: number;
  /** Players to render */
  players?: PlayerDef[];
  /** Target zones (green = open, red = pressure) */
  zones?: TargetZone[];
  /** Pass / shoot trajectories */
  trajectories?: Trajectory[];
  /** Called when a draggable player is moved by pointer */
  onPlayerDrag?: (id: string, x: number, y: number) => void;
  /** Called on tap / click on empty court space */
  onCourtTap?: (x: number, y: number) => void;
  /** Extra SVG children */
  children?: React.ReactNode;
  /** Simple mode: renders court + children only (no built-in players/zones/trajectories). Use children for custom content. */
  simple?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Animation styles — injected once via <style> inside the SVG        */
/* ------------------------------------------------------------------ */

const animationStyles = `
  @keyframes ic-pulse-ring-green {
    0%   { opacity: 0.8; transform: scale(1); }
    50%  { opacity: 0.4; transform: scale(1.25); }
    100% { opacity: 0.8; transform: scale(1); }
  }
  @keyframes ic-pulse-ring-red {
    0%   { opacity: 0.7; transform: scale(1); }
    50%  { opacity: 0.3; transform: scale(1.3); }
    100% { opacity: 0.7; transform: scale(1); }
  }
  @keyframes ic-dash-move {
    to { stroke-dashoffset: -40; }
  }
  @keyframes ic-dash-shoot {
    to { stroke-dashoffset: -60; }
  }
  @keyframes ic-glow-pulse {
    0%   { opacity: 0.15; }
    50%  { opacity: 0.35; }
    100% { opacity: 0.15; }
  }
  @keyframes ic-bounce {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-3px); }
  }
  .ic-zone-open {
    animation: ic-pulse-ring-green 2s ease-in-out infinite;
    transform-origin: center;
  }
  .ic-zone-pressure {
    animation: ic-pulse-ring-red 1.5s ease-in-out infinite;
    transform-origin: center;
  }
  .ic-dash-pass {
    stroke-dasharray: 8 6;
    animation: ic-dash-move 0.8s linear infinite;
  }
  .ic-dash-shoot {
    stroke-dasharray: 10 8;
    animation: ic-dash-shoot 1s linear infinite;
  }
  .ic-glow {
    animation: ic-glow-pulse 2s ease-in-out infinite;
  }
  .ic-player-draggable {
    cursor: grab;
  }
  .ic-player-draggable:active {
    cursor: grabbing;
  }
  .ic-player-hero-glow {
    animation: ic-glow-pulse 1.5s ease-in-out infinite;
  }
`;

/* ------------------------------------------------------------------ */
/*  Inline SVG Components — no framer-motion, all pure SVG + CSS      */
/* ------------------------------------------------------------------ */

/** Offense player: blue jersey, basketball icon at bottom */
function PlayerOffenseSVG({
  x, y, size = 22, label = '', draggable = false, isDragging = false,
}: {
  x: number; y: number; size?: number; label?: string;
  draggable?: boolean; isDragging?: boolean;
}) {
  const r = size;
  return (
    <g className={draggable ? 'ic-player-draggable' : ''} opacity={isDragging ? 0.7 : 1}>
      {/* Shadow */}
      <ellipse cx={x} cy={y + r * 0.85} rx={r * 0.5} ry={r * 0.16} fill="rgba(0,0,0,0.15)" />
      {/* Jersey body */}
      <circle cx={x} cy={y} r={r * 0.8} fill="#3B82F6" stroke="#2563EB" strokeWidth="2" />
      {/* Shoulder stripes */}
      <line x1={x - r * 0.35} y1={y - r * 0.3} x2={x - r * 0.25} y2={y + r * 0.4} stroke="#2563EB" strokeWidth={r * 0.06} opacity="0.25" strokeLinecap="round" />
      <line x1={x + r * 0.35} y1={y - r * 0.3} x2={x + r * 0.25} y2={y + r * 0.4} stroke="#2563EB" strokeWidth={r * 0.06} opacity="0.25" strokeLinecap="round" />
      {/* Basketball at bottom */}
      <g transform={`translate(${x + r * 0.35}, ${y + r * 0.3})`}>
        <circle cx={0} cy={0} r={r * 0.26} fill="#F97316" stroke="#7C2D12" strokeWidth="1" />
        <path d={`M 0 ${-r * 0.26} Q ${r * 0.12} 0, 0 ${r * 0.26}`} fill="none" stroke="#7C2D12" strokeWidth="0.5" opacity="0.6" />
        <path d={`M ${-r * 0.26} 0 Q 0 ${-r * 0.12}, ${r * 0.26} 0`} fill="none" stroke="#7C2D12" strokeWidth="0.5" opacity="0.6" />
      </g>
      {/* Number */}
      {label && (
        <text x={x} y={y + r * 0.45} textAnchor="middle" fill="white" fontSize={r * 0.42} fontWeight="bold" fontFamily="Nunito, sans-serif">
          {label.charAt(0)}
        </text>
      )}
    </g>
  );
}

/** Defense player: red jersey, wide stance, shield, arms down */
function PlayerDefenseSVG({
  x, y, size = 20, label = '', draggable = false, isDragging = false,
}: {
  x: number; y: number; size?: number; label?: string;
  draggable?: boolean; isDragging?: boolean;
}) {
  const r = size;
  return (
    <g className={draggable ? 'ic-player-draggable' : ''} opacity={isDragging ? 0.7 : 1}>
      {/* Shadow */}
      <ellipse cx={x} cy={y + r * 0.9} rx={r * 0.5} ry={r * 0.15} fill="rgba(0,0,0,0.12)" />
      {/* Arms — extended down (back to basket) */}
      <line x1={x - r * 0.45} y1={y - r * 0.05} x2={x - r * 0.9} y2={y + r * 0.2} stroke="#DC2626" strokeWidth={r * 0.14} strokeLinecap="round" />
      <line x1={x + r * 0.45} y1={y - r * 0.05} x2={x + r * 0.9} y2={y + r * 0.2} stroke="#DC2626" strokeWidth={r * 0.14} strokeLinecap="round" />
      {/* Wide legs */}
      <line x1={x - r * 0.25} y1={y + r * 0.5} x2={x - r * 0.45} y2={y + r * 0.85} stroke="#B91C1C" strokeWidth={r * 0.12} strokeLinecap="round" />
      <line x1={x + r * 0.25} y1={y + r * 0.5} x2={x + r * 0.45} y2={y + r * 0.85} stroke="#B91C1C" strokeWidth={r * 0.12} strokeLinecap="round" />
      {/* Jersey body */}
      <circle cx={x} cy={y} r={r * 0.72} fill="#EF4444" stroke="#DC2626" strokeWidth="2" />
      {/* Shield emblem */}
      <path d={`M ${x - r * 0.18} ${y - r * 0.28} L ${x + r * 0.18} ${y - r * 0.28} L ${x + r * 0.22} ${y + r * 0.05} Q ${x} ${y + r * 0.2}, ${x - r * 0.22} ${y + r * 0.05} Z`} fill="#DC2626" opacity="0.3" />
      {/* Number */}
      {label && (
        <text x={x} y={y + r * 0.55} textAnchor="middle" fill="white" fontSize={r * 0.38} fontWeight="bold" fontFamily="Nunito, sans-serif">
          {label.charAt(0)}
        </text>
      )}
    </g>
  );
}

/** Hero player: gold jersey, star aura glow */
function PlayerHeroSVG({
  x, y, size = 24, label = '', draggable = false, isDragging = false,
}: {
  x: number; y: number; size?: number; label?: string;
  draggable?: boolean; isDragging?: boolean;
}) {
  const r = size;
  return (
    <g className={draggable ? 'ic-player-draggable' : ''} opacity={isDragging ? 0.7 : 1}>
      {/* Star glow aura */}
      <circle cx={x} cy={y} r={r * 1.8} fill="none" stroke="#FBBF24" strokeWidth="2" opacity="0.15" className="ic-player-hero-glow" />
      <circle cx={x} cy={y} r={r * 2.2} fill="#FBBF24" opacity="0.04" />
      {/* Shadow */}
      <ellipse cx={x} cy={y + r * 0.85} rx={r * 0.5} ry={r * 0.15} fill="rgba(0,0,0,0.15)" />
      {/* Jersey body */}
      <circle cx={x} cy={y} r={r * 0.8} fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" />
      {/* Star accents */}
      <polygon points={`${x - r * 0.35},${y - r * 0.22} ${x - r * 0.27},${y - r * 0.38} ${x - r * 0.19},${y - r * 0.22} ${x - r * 0.38},${y - r * 0.3} ${x - r * 0.16},${y - r * 0.3}`} fill="white" opacity="0.3" />
      <polygon points={`${x + r * 0.35},${y - r * 0.22} ${x + r * 0.27},${y - r * 0.38} ${x + r * 0.19},${y - r * 0.22} ${x + r * 0.38},${y - r * 0.3} ${x + r * 0.16},${y - r * 0.3}`} fill="white" opacity="0.3" />
      {/* Basketball at bottom */}
      <g transform={`translate(${x + r * 0.35}, ${y + r * 0.3})`}>
        <circle cx={0} cy={0} r={r * 0.24} fill="#F97316" stroke="#7C2D12" strokeWidth="1" />
        <path d={`M 0 ${-r * 0.24} Q ${r * 0.1} 0, 0 ${r * 0.24}`} fill="none" stroke="#7C2D12" strokeWidth="0.5" opacity="0.6" />
      </g>
      {/* Number */}
      {label && (
        <text x={x} y={y + r * 0.45} textAnchor="middle" fill="#B45309" fontSize={r * 0.42} fontWeight="bold" fontFamily="Nunito, sans-serif">
          {label.charAt(0)}
        </text>
      )}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  Court Background                                                  */
/* ------------------------------------------------------------------ */

function CourtBackground({ w, h, pad }: { w: number; h: number; pad: number }) {
  return (
    <g>
      {/* Wood court */}
      <rect x={pad} y={pad} width={w - 2 * pad} height={h - 2 * pad} fill="#D4A04A" rx="6" stroke="#8B6914" strokeWidth="2" />
      {/* Inner border */}
      <rect x={pad + 10} y={pad + 10} width={w - 2 * pad - 20} height={h - 2 * pad - 20} fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.85" rx="2" />

      {/* Wood grain lines */}
      {[0.15, 0.35, 0.55, 0.75, 0.9].map((pct, i) => (
        <line key={i} x1={pad + 12} y1={pad + h * 0.12 * (pct + 0.1)} x2={w - pad - 12} y2={pad + h * 0.12 * (pct + 0.1)} stroke="#B86C30" strokeWidth={0.3 + (i % 2) * 0.2} opacity={0.12 + i * 0.02} />
      ))}

      {/* Half-court line */}
      <line x1={w / 2} y1={pad + 10} x2={w / 2} y2={h - pad - 10} stroke="white" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="6,4" />

      {/* Center circle */}
      <circle cx={w / 2} cy={h - pad - 10} r="36" fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="4,4" />

      {/* Three-point arc */}
      <path d={`M ${w * 0.2} ${pad + 10} Q ${w / 2} ${pad - 30}, ${w * 0.8} ${pad + 10}`} fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" />

      {/* Free-throw line */}
      <line x1={w * 0.28} y1={h * 0.3} x2={w * 0.72} y2={h * 0.3} stroke="white" strokeWidth="1.5" strokeOpacity="0.6" />

      {/* Key / Lane */}
      <rect x={w * 0.28} y={pad + 10} width={w * 0.44} height={h * 0.3 - pad - 10} fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="4,3" />

      {/* Basket */}
      <g transform={`translate(${w / 2}, ${pad + 6})`}>
        <rect x="-14" y="-2" width="28" height="4" fill="white" opacity="0.8" rx="1" />
        <ellipse cx="0" cy="7" rx="12" ry="3.5" fill="none" stroke="red" strokeWidth="2.5" />
        <path d="M -9 10 Q -5 18 0 20 Q 5 18 9 10" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
      </g>

      {/* Labels */}
      <text x={w / 2} y={h * 0.15} textAnchor="middle" fill="white" fontSize="11" opacity="0.12" fontWeight="bold" fontFamily="Nunito, sans-serif">PAINT</text>
      <text x={w * 0.88} y={pad + 22} textAnchor="middle" fill="white" fontSize="8" opacity="0.15" fontFamily="Nunito, sans-serif">3PT</text>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                    */
/* ------------------------------------------------------------------ */

const InteractiveCourt: React.FC<InteractiveCourtProps> = ({
  width = 800,
  height = 500,
  players = [],
  zones = [],
  trajectories = [],
  onPlayerDrag,
  onCourtTap,
  children,
  simple = false,
}) => {
  const padding = 24;
  const svgRef = useRef<SVGSVGElement>(null);

  /* ---- Drag state ---- */
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ dx: number; dy: number }>({ dx: 0, dy: 0 });
  // We track current positions locally so dragging is responsive
  const [localPlayers, setLocalPlayers] = useState<PlayerDef[]>(players);

  // Sync when external players change (but not during drag)
  const prevPlayersRef = useRef(players);
  if (players !== prevPlayersRef.current && dragId === null) {
    prevPlayersRef.current = players;
    // Only reset if not actively dragging
    if (JSON.stringify(players) !== JSON.stringify(localPlayers)) {
      setLocalPlayers(players);
    }
  }

  /* ---- Coordinate conversion ---- */
  const svgCoords = useCallback((clientX: number, clientY: number): Point | null => {
    const svg = svgRef.current;
    if (!svg) return null;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    const svgPt = pt.matrixTransform(ctm.inverse());
    return { x: svgPt.x, y: svgPt.y };
  }, []);

  /* ---- Pointer Handlers ---- */
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const coords = svgCoords(e.clientX, e.clientY);
    if (!coords) return;

    // Check if we hit a draggable player
    const hitPlayer = localPlayers.find(
      p => p.draggable && Math.abs(p.x - coords.x) < (p.size || 22) * 1.5 && Math.abs(p.y - coords.y) < (p.size || 22) * 1.5
    );

    if (hitPlayer) {
      setDragId(hitPlayer.id);
      setDragOffset({ dx: coords.x - hitPlayer.x, dy: coords.y - hitPlayer.y });
      (e.target as SVGElement).setPointerCapture?.(e.pointerId);
      e.preventDefault();
    } else if (onCourtTap) {
      onCourtTap(coords.x, coords.y);
    }
  }, [svgCoords, localPlayers, onCourtTap]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragId) return;
    const coords = svgCoords(e.clientX, e.clientY);
    if (!coords) return;

    const newX = coords.x - dragOffset.dx;
    const newY = coords.y - dragOffset.dy;

    setLocalPlayers(prev =>
      prev.map(p => (p.id === dragId ? { ...p, x: newX, y: newY } : p))
    );
    e.preventDefault();
  }, [dragId, dragOffset, svgCoords]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (dragId) {
      const player = localPlayers.find(p => p.id === dragId);
      if (player && onPlayerDrag) {
        onPlayerDrag(dragId, player.x, player.y);
      }
      setDragId(null);
      try { (e.target as SVGElement).releasePointerCapture?.(e.pointerId); } catch {}
      e.preventDefault();
    }
  }, [dragId, localPlayers, onPlayerDrag]);

  /* ---- Trajectory rendering ---- */
  const trajectoryEls = useMemo(() => trajectories.map((t, i) => {
    const midX = (t.from.x + t.to.x) / 2;
    const midY = Math.min(t.from.y, t.to.y) - 40;
    const color = t.color || (t.type === 'pass' ? '#2ECC71' : '#FBBF24');
    const dashClass = t.type === 'pass' ? 'ic-dash-pass' : 'ic-dash-shoot';
    return (
      <g key={`traj-${i}`}>
        {/* Glow behind path */}
        <path
          d={`M ${t.from.x} ${t.from.y} Q ${midX} ${midY}, ${t.to.x} ${t.to.y}`}
          fill="none"
          stroke={color}
          strokeWidth="5"
          opacity="0.08"
        />
        {/* Animated dashed path */}
        <path
          d={`M ${t.from.x} ${t.from.y} Q ${midX} ${midY}, ${t.to.x} ${t.to.y}`}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          className={t.animated !== false ? dashClass : ''}
          opacity="0.85"
        />
        {/* Arrowhead */}
        {(() => {
          const dx = t.to.x - (midX + (t.to.x - midX) * 0.5);
          const dy = t.to.y - (midY + (t.to.y - midY) * 0.5);
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          return (
            <polygon
              points={`${t.to.x},${t.to.y} ${t.to.x - 8},${t.to.y - 5} ${t.to.x - 8},${t.to.y + 5}`}
              fill={color}
              opacity="0.9"
              transform={`rotate(${angle}, ${t.to.x}, ${t.to.y})`}
            />
          );
        })()}
      </g>
    );
  }), [trajectories]);

  /* ---- Zone rendering ---- */
  const zoneEls = useMemo(() => zones.map((z, i) => {
    const r = z.size || 28;
    const isOpen = z.type === 'open';
    const cls = isOpen ? 'ic-zone-open' : 'ic-zone-pressure';
    const color = isOpen ? '#2ECC71' : '#EF4444';
    return (
      <g key={`zone-${i}`}>
        {/* Outer glow ring */}
        <circle
          cx={z.x} cy={z.y} r={r * 1.6}
          fill="none" stroke={color}
          strokeWidth="3" opacity="0.15"
          className={cls}
        />
        {/* Main ring */}
        <circle
          cx={z.x} cy={z.y} r={r}
          fill="none" stroke={color}
          strokeWidth="2.5" opacity="0.5"
          strokeDasharray="4,3"
        />
        {/* Inner dot */}
        <circle cx={z.x} cy={z.y} r="4" fill={color} opacity="0.6" />
        {/* Label */}
        {z.label && (
          <text
            x={z.x} y={z.y - r - 6}
            textAnchor="middle" fill={color}
            fontSize="10" fontWeight="bold"
            fontFamily="Nunito, sans-serif"
          >
            {z.label}
          </text>
        )}
      </g>
    );
  }), [zones]);

  /* ---- Player rendering ---- */
  const playerEls = useMemo(() => localPlayers.map((p) => {
    const size = p.size || (p.type === 'hero' ? 24 : p.type === 'offense' ? 22 : 20);
    const isDragging = dragId === p.id;
    const common = { key: p.id, x: p.x, y: p.y, size, label: p.label || '', draggable: p.draggable, isDragging };

    if (p.type === 'hero') return <PlayerHeroSVG {...common} />;
    if (p.type === 'defense') return <PlayerDefenseSVG {...common} />;
    return <PlayerOffenseSVG {...common} />;
  }), [localPlayers, dragId]);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      className={`w-full mx-auto h-auto select-none ${simple ? 'max-w-lg' : 'max-w-2xl'}`}
      style={{
        touchAction: 'none',
        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
        maxHeight: '55vh',
        WebkitUserSelect: 'none',
        userSelect: 'none',
      }}
      onPointerDown={!simple ? handlePointerDown : undefined}
      onPointerMove={!simple ? handlePointerMove : undefined}
      onPointerUp={!simple ? handlePointerUp : undefined}
      onPointerLeave={!simple ? handlePointerUp : undefined}
    >
      {/* Animation keyframes via inline <style> */}
      <defs>
        <style>{animationStyles}</style>
        <filter id="ic-glow-filter">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Shared filters used by avatar components */}
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

      {/* Court backdrop */}
      <CourtBackground w={width} h={height} pad={padding} />

      {/* Trajectories (render behind players) */}
      {!simple && trajectoryEls}

      {/* Zones */}
      {!simple && zoneEls}

      {/* Players */}
      {!simple && playerEls}

      {/* Extra children */}
      {children}
    </svg>
  );
};

export default InteractiveCourt;
export { PlayerOffenseSVG, PlayerDefenseSVG, PlayerHeroSVG };
