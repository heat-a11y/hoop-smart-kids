import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import BasketballCourt from '../court/BasketballCourt';
import { BallHandlerAvatar, TeammateAvatar, DefenderAvatar } from '../court/Avatars';
import CoachBear from './CoachBear';
import sfx from '../../services/SFXEngine';
import { useLanguage } from '../../context/LanguageContext';
import { useGame } from '../../context/GameContext';
import scenarios from '../../data/offenseScenarios';

export default function SpacingGame({ onComplete, onAdvance }) {
  const { lang } = useLanguage();
  const { addXP, soundEnabled } = useGame();
  const scenario = scenarios.spacing;
  const text = lang === 'en' ? scenario.en : scenario.zh;
  const d = scenario.diagram;
  const target = d.targetZone;
  const svgRef = useRef(null);

  const [moved, setMoved] = useState(false);
  const [playerPos, setPlayerPos] = useState({ x: d.positions[0].startX, y: d.positions[0].startY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ dx: 0, dy: 0 });
  const [inZone, setInZone] = useState(false);
  const [phase, setPhase] = useState('playing'); // playing | feedback
  const [showCoach, setShowCoach] = useState(false);

  const svgCoords = useCallback((clientX, clientY) => {
    const svg = svgRef.current?.querySelector('svg');
    if (!svg) return null;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    const svgPt = pt.matrixTransform(ctm.inverse());
    return { x: svgPt.x, y: svgPt.y };
  }, []);

  const isInTargetZone = useCallback((x, y) => {
    if (!target) return false;
    return (
      x >= target.x &&
      x <= target.x + target.width &&
      y >= target.y &&
      y <= target.y + target.height
    );
  }, [target]);

  const handlePointerDown = useCallback((e) => {
    if (moved || phase !== 'playing') return;
    const coords = svgCoords(e.clientX, e.clientY);
    if (!coords) return;
    const dx = coords.x - playerPos.x;
    const dy = coords.y - playerPos.y;
    if (Math.abs(dx) > 40 || Math.abs(dy) > 40) return;
    setDragOffset({ dx, dy });
    setIsDragging(true);
    e.preventDefault();
    e.target.setPointerCapture?.(e.pointerId);
  }, [moved, phase, playerPos, svgCoords]);

  // Global pointer move/up for drag
  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e) => {
      const coords = svgCoords(e.clientX, e.clientY);
      if (!coords) return;
      const newX = coords.x - dragOffset.dx;
      const newY = coords.y - dragOffset.dy;
      setPlayerPos({ x: Math.max(30, Math.min(370, newX)), y: Math.max(30, Math.min(290, newY)) });
      setInZone(isInTargetZone(
        Math.max(30, Math.min(370, newX)),
        Math.max(30, Math.min(290, newY))
      ));
    };
    const onUp = () => {
      setIsDragging(false);
      if (inZone) {
        setMoved(true);
        if (soundEnabled) sfx.whistle();
      } else {
        setPlayerPos({ x: d.positions[0].startX, y: d.positions[0].startY });
      }
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [isDragging, dragOffset, svgCoords, isInTargetZone, inZone, soundEnabled, d]);



  const handleConfirmMove = useCallback(() => {
    if (!moved) return;
    setPhase('feedback');
    addXP(100, { drill: true, module: 'offense', correct: true });
    setTimeout(() => setShowCoach(true), 400);
  }, [moved, addXP]);

  const handleStayPaint = useCallback(() => {
    if (moved || phase !== 'playing') return;
    setPhase('feedback');
    if (soundEnabled) sfx.wrong();
    setTimeout(() => setShowCoach(true), 400);
  }, [moved, phase, soundEnabled]);

  const handleNext = useCallback(() => {
    setShowCoach(false);
    setMoved(false);
    setInZone(false);
    setIsDragging(false);
    setPhase('playing');
    setPlayerPos({ x: d.positions[0].startX, y: d.positions[0].startY });
    onComplete();
  }, [onComplete, d]);

  return (
    <div className="px-4 md:px-8 mb-8">
      <motion.div className="mb-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">📐</span>
          <span className="text-[10px] font-bold text-neon-yellow uppercase tracking-widest">
            {lang === 'en' ? 'Scenario C' : '场景C'}
          </span>
        </div>
        <h2 className="font-display text-xl md:text-2xl font-bold text-white">{text.title}</h2>
        <p className="text-sm text-court-wood-light/70 font-semibold">{text.subtitle}</p>
      </motion.div>

      <motion.div
        className="bg-dark-card/40 backdrop-blur-sm border border-white/5 rounded-3xl p-4 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="bg-white/5 rounded-2xl px-4 py-3 mb-4 border border-white/5">
          <p className="text-sm text-white/80 leading-relaxed">{text.setup}</p>
        </div>

        {phase === 'playing' && !moved && !isDragging && (
          <motion.div className="text-center mb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-xs font-display font-bold text-neon-yellow">
              {lang === 'en'
                ? '👆 Drag the highlighted player to the open wing area!'
                : '👆 将高亮球员拖拽到空位侧翼区域！'}
            </p>
          </motion.div>
        )}

        {isDragging && (
          <motion.div className="text-center mb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className={`text-xs font-display font-bold ${inZone ? 'text-success-green' : 'text-white/60'}`}>
              {inZone
                ? (lang === 'en' ? '✅ Release to drop!' : '✅ 松开放置！')
                : (lang === 'en' ? 'Drag to the green zone...' : '拖拽到绿色区域...')}
            </p>
          </motion.div>
        )}

        <div className="relative" ref={svgRef}>
          <BasketballCourt width={400} half="top">
            {/* Other players crowded in paint */}
            {d.positions.slice(1).map((pos) => (
              pos.defender ? (
                <DefenderAvatar key={pos.id} x={pos.x} y={pos.y} label={pos.label} animate delay={0.2} />
              ) : (
                <TeammateAvatar key={pos.id} x={pos.x} y={pos.y} label={pos.label} animate delay={0.2} />
              )
            ))}

            {/* Target zone — highlighted when hovering */}
            {!moved && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: isDragging && inZone ? 0.6 : [0, 0.3, 0] }}
                transition={isDragging && inZone ? {} : { repeat: Infinity, duration: 1.5 }}
              >
                <rect
                  x={target.x} y={target.y}
                  width={target.width} height={target.height}
                  fill={inZone ? '#2ECC71' : '#2ECC71'}
                  opacity={inZone ? 0.3 : 0.12}
                  rx="8"
                  stroke="#2ECC71"
                  strokeWidth={inZone ? 3 : 2}
                  strokeDasharray="4,3"
                />
                <text
                  x={target.x + target.width / 2}
                  y={target.y + target.height / 2 + 3}
                  textAnchor="middle" fill="#2ECC71" fontSize="8" fontWeight="bold"
                >
                  {lang === 'en' ? 'DROP HERE' : '拖到这里'}
                </text>
              </motion.g>
            )}

            {/* Draggable player */}
            <g
              style={{ cursor: moved ? 'default' : isDragging ? 'grabbing' : 'grab' }}
              onPointerDown={!moved ? handlePointerDown : undefined}
            >
              {/* Highlight ring when not moved */}
              {!moved && !isDragging && (
                <circle cx={playerPos.x} cy={playerPos.y} r="24" fill="none" stroke="#FFE135" strokeWidth="2" strokeDasharray="4,3" opacity="0.6" />
              )}
              {/* Drag trail */}
              {isDragging && (
                <line x1={d.positions[0].startX} y1={d.positions[0].startY} x2={playerPos.x} y2={playerPos.y} stroke="#FFE135" strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />
              )}
              <BallHandlerAvatar x={playerPos.x} y={playerPos.y} label={d.positions[0].label} size={18} glow />
              <circle cx={playerPos.x} cy={playerPos.y} r="28" fill="transparent" />
            </g>

            {/* Success visualization */}
            {moved && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <line x1={playerPos.x + 15} y1={playerPos.y} x2={playerPos.x + 45} y2={playerPos.y - 10} stroke="#2ECC71" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.5" />
                <line x1={playerPos.x + 15} y1={playerPos.y + 5} x2={playerPos.x + 35} y2={playerPos.y + 25} stroke="#2ECC71" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.5" />
                <text x={playerPos.x + 50} y={playerPos.y - 5} fill="#2ECC71" fontSize="7" fontWeight="bold">✓ spacing</text>
              </motion.g>
            )}

            {/* Crowded label */}
            {!moved && !isDragging && (
              <text x={290} y={230} textAnchor="middle" fill="#EF4444" fontSize="7" fontWeight="bold" opacity="0.6">✗ TOO CROWDED</text>
            )}
          </BasketballCourt>
        </div>
      </motion.div>

      {/* Action buttons */}
      {phase === 'playing' && (
        <motion.div className="space-y-2.5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          {!moved ? (
            <motion.button
              onClick={handleStayPaint}
              className="w-full py-3 bg-dark-card/60 border border-white/5 rounded-2xl font-display font-bold text-sm text-white/70 hover:bg-dark-card-hover transition-colors"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              {lang === 'en' ? "I'll stay in the paint" : '我留在禁区'}
            </motion.button>
          ) : (
            <motion.button
              onClick={handleConfirmMove}
              className="w-full py-4 bg-gradient-to-r from-success-green to-emerald-600 rounded-2xl font-display font-bold text-white text-base shadow-xl shadow-success-green/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
            >
              {lang === 'en' ? '✅ Confirm I moved to the wing!' : '✅ 确认移动到侧翼！'}
            </motion.button>
          )}
        </motion.div>
      )}

      <CoachBear
        show={showCoach}
        type={moved ? 'correct' : 'wrong'}
        title={lang === 'en' ? (moved ? text.choices[0].en.title : text.choices[1].en.title) : (moved ? text.choices[0].zh.title : text.choices[1].zh.title)}
        feedback={lang === 'en' ? (moved ? text.choices[0].en.feedback : text.choices[1].en.feedback) : (moved ? text.choices[0].zh.feedback : text.choices[1].zh.feedback)}
        tip={lang === 'en' ? (moved ? text.choices[0].en.tip : text.choices[1].en.tip) : (moved ? text.choices[0].zh.tip : text.choices[1].zh.tip)}
        onNext={onAdvance || (onComplete ? handleNext : undefined)}
        onDismiss={() => setShowCoach(false)}
      />
    </div>
  );
}
