import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveCourt from '../court/InteractiveCourt';
import Basketball from '../court/Basketball';
import { useLanguage } from '../../context/LanguageContext';

/**
 * FiveOutScene — Interactive playbook viewer with timeline scrubber.
 * Renders a half-court with animated players, ball, arrows, and timeline text.
 * User can drag the slider or hit play to watch the play unfold.
 */
export default function FiveOutScene({ scenario, onComplete }) {
  const { lang } = useLanguage();
  const text = lang === 'en' ? scenario.en : scenario.zh;
  const d = scenario;
  const animFrameRef = useRef(null);
  const [t, setT] = useState(0); // 0 to 1 timeline position
  const [isPlaying, setIsPlaying] = useState(false);

  // Interpolate between keyframes at current t
  const interpolate = useCallback((keyframes, tVal) => {
    if (!keyframes || keyframes.length === 0) return { x: 200, y: 200 };
    if (keyframes.length === 1) return { x: keyframes[0].x, y: keyframes[0].y };
    if (tVal <= keyframes[0].t) return { x: keyframes[0].x, y: keyframes[0].y };
    if (tVal >= keyframes[keyframes.length - 1].t) return { x: keyframes[keyframes.length - 1].x, y: keyframes[keyframes.length - 1].y };

    for (let i = 0; i < keyframes.length - 1; i++) {
      const a = keyframes[i];
      const b = keyframes[i + 1];
      if (tVal >= a.t && tVal <= b.t) {
        const ratio = (tVal - a.t) / (b.t - a.t);
        return {
          x: a.x + (b.x - a.x) * ratio,
          y: a.y + (b.y - a.y) * ratio,
        };
      }
    }
    return { x: keyframes[keyframes.length - 1].x, y: keyframes[keyframes.length - 1].y };
  }, []);

  // Get current timeline description
  const currentDesc = text.timeline.reduce((best, item) => {
    return (item.at <= t && item.at > (best?.at || -1)) ? item : best;
  }, null);

  // Get arrows that should be visible at current t
  const visibleArrows = (d.arrows || []).filter(arr => {
    return Math.abs(arr.fromT - t) < 0.08 || (t >= arr.fromT - 0.04 && t <= arr.fromT + 0.04);
  });

  // Play animation
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      return;
    }

    const speed = 0.004; // per frame
    let lastTime = 0;

    const animate = (time) => {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;
      
      setT(prev => {
        const next = prev + speed * (delta / 16);
        if (next >= 1) {
          setIsPlaying(false);
          return 1;
        }
        return next;
      });
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  const handlePlayPause = useCallback(() => {
    if (t >= 1) setT(0);
    setIsPlaying(p => !p);
  }, [t]);

  const handleSliderChange = useCallback((e) => {
    const val = parseFloat(e.target.value);
    setT(val);
    if (isPlaying) setIsPlaying(false);
  }, [isPlaying]);

  // Ball position
  const ballPos = interpolate(d.ball, t);

  // Player and defender positions
  const playerPositions = d.players.map(p => ({
    ...p,
    pos: interpolate(p.keyframes, t),
  }));
  const defenderPositions = (d.defenders || []).map(p => ({
    ...p,
    pos: interpolate(p.keyframes, t),
  }));

  // Arrow opacity based on proximity to current t
  const getArrowOpacity = (arrowT) => {
    const diff = Math.abs(arrowT - t);
    if (diff < 0.04) return 1;
    if (diff < 0.12) return 1 - (diff - 0.04) / 0.08;
    return 0;
  };

  return (
    <div className="px-4 md:px-8 mb-8">
      {/* Header */}
      <motion.div className="mb-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-display text-xl md:text-2xl font-bold text-white">{text.title}</h2>
        <p className="text-sm text-court-wood-light/70 font-semibold">{text.subtitle}</p>
      </motion.div>

      {/* Court */}
      <motion.div
        className="bg-dark-card/40 backdrop-blur-sm border border-white/5 rounded-3xl p-4 mb-4"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-white/5 rounded-2xl px-4 py-3 mb-4 border border-white/5">
          <p className="text-sm text-white/80 leading-relaxed">{text.setup}</p>
        </div>

        <div className="relative">
          <InteractiveCourt simple width={400} half={d.half || 'top'}>
            {/* Defenders */}
            {defenderPositions.map(p => (
              <g key={`def-${p.id}`}>
                <circle cx={p.pos.x} cy={p.pos.y} r={14} fill="#EF4444" opacity={0.85} stroke="#DC2626" strokeWidth={2} />
                <text x={p.pos.x} y={p.pos.y + 4} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="Nunito, sans-serif">
                  {p.label}
                </text>
              </g>
            ))}

            {/* Offense players */}
            {playerPositions.map(p => (
              <g key={`player-${p.id}`}>
                {/* Glow */}
                <circle cx={p.pos.x} cy={p.pos.y} r={18} fill={p.color} opacity={0.15} />
                {/* Player circle */}
                <circle cx={p.pos.x} cy={p.pos.y} r={13} fill={p.color} opacity={0.9} stroke="white" strokeWidth={2} />
                {/* Player label */}
                <text x={p.pos.x} y={p.pos.y + 4} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="Nunito, sans-serif">
                  {p.label}
                </text>
                {/* Player name label above */}
                <text x={p.pos.x} y={p.pos.y - 18} textAnchor="middle" fill={p.color} fontSize="10" fontWeight="bold" fontFamily="Nunito, sans-serif" opacity={0.9}>
                  {p.label}
                </text>
              </g>
            ))}

            {/* Basketball */}
            <Basketball x={ballPos.x} y={ballPos.y - 12} animate={false} delay={0} />

            {/* Arrows (visible at specific times) */}
            {visibleArrows.map((arr, i) => {
              const opacity = getArrowOpacity(arr.fromT);
              if (opacity <= 0) return null;
              const midX = (arr.fromX + arr.toX) / 2;
              const midY = Math.min(arr.fromY, arr.toY) - 30;
              const dashed = arr.dashed ? '5,4' : 'none';
              return (
                <g key={`arrow-${i}`} opacity={opacity}>
                  {/* Arrow path */}
                  <path
                    d={`M ${arr.fromX} ${arr.fromY} Q ${midX} ${midY}, ${arr.toX} ${arr.toY}`}
                    fill="none"
                    stroke={arr.color}
                    strokeWidth={2.5}
                    strokeDasharray={dashed}
                    strokeLinecap="round"
                    opacity={0.8}
                  />
                  {/* Arrowhead */}
                  <polygon
                    points={`${arr.toX},${arr.toY} ${arr.toX - 8},${arr.toY - 5} ${arr.toX - 8},${arr.toY + 5}`}
                    fill={arr.color}
                    opacity={0.9}
                    transform={`rotate(${Math.atan2(arr.toY - midY, arr.toX - midX) * 180 / Math.PI}, ${arr.toX}, ${arr.toY})`}
                  />
                  {/* Arrow label */}
                  <text
                    x={midX} y={midY - 8}
                    textAnchor="middle" fill={arr.color}
                    fontSize="9" fontWeight="bold" fontFamily="Nunito, sans-serif"
                  >
                    {arr.label}
                  </text>
                </g>
              );
            })}
          </InteractiveCourt>
        </div>

        {/* Timeline description */}
        <AnimatePresence mode="wait">
          {currentDesc && (
            <motion.div
              key={currentDesc.at}
              className="mt-4 bg-white/5 border border-white/10 rounded-2xl px-4 py-3"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-sm text-white/90 font-medium leading-relaxed">{currentDesc.text}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Playback Controls */}
        <div className="mt-4 flex items-center gap-4">
          {/* Play/Pause button */}
          <button
            onClick={handlePlayPause}
            className="flex-shrink-0 w-12 h-12 rounded-full bg-court-orange hover:bg-court-orange/80 flex items-center justify-center transition-all shadow-lg shadow-court-orange/30"
          >
            <span className="text-lg">
              {isPlaying ? '⏸️' : t >= 1 ? '🔄' : '▶️'}
            </span>
          </button>

          {/* Slider */}
          <div className="flex-1 relative">
            <input
              type="range"
              min={0}
              max={1}
              step={0.002}
              value={t}
              onChange={handleSliderChange}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                WebkitAppearance: 'none',
                appearance: 'none',
                background: `linear-gradient(to right, #FF6B35 ${t * 100}%, rgba(255,255,255,0.15) ${t * 100}%)`,
                outline: 'none',
                borderRadius: '8px',
                height: '8px',
              }}
            />
            {/* Timeline markers */}
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-white/40 font-semibold">0%</span>
              <span className="text-[10px] text-white/40 font-semibold">50%</span>
              <span className="text-[10px] text-white/40 font-semibold">100%</span>
            </div>
          </div>

          {/* T position display */}
          <div className="flex-shrink-0 w-14 text-center">
            <span className="text-sm font-bold text-white/70 font-display">
              {Math.round(t * 100)}%
            </span>
          </div>
        </div>

        {/* Timeline stage dots */}
        <div className="flex justify-between mt-3 px-1">
          {text.timeline.map((item, i) => (
            <button
              key={i}
              onClick={() => { setT(item.at); if (isPlaying) setIsPlaying(false); }}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                t >= item.at - 0.02
                  ? 'bg-court-orange scale-125'
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              title={item.text}
            />
          ))}
        </div>
      </motion.div>

      {/* Complete button */}
      <motion.button
        onClick={onComplete}
        className="w-full py-3.5 bg-gradient-to-r from-success-green to-emerald-600 rounded-2xl font-display font-bold text-white shadow-xl hover:shadow-success-green/30"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {lang === 'en' ? '✓ Got it! Mark Complete' : '✓ 明白了！标记完成'}
      </motion.button>
    </div>
  );
}
