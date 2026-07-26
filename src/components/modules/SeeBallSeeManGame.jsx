import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveCourt from '../court/InteractiveCourt';
import { TeammateAvatar } from '../court/Avatars';
import Basketball from '../court/Basketball';
import CoachBear from './CoachBear';
import sfx from '../../services/SFXEngine';
import { useLanguage } from '../../context/LanguageContext';
import { useGame } from '../../context/GameContext';
import scenarios from '../../data/defenseScenarios';

const CORRECT_POS = { x: 260, y: 170 };

function VisionCone({ fromX, fromY, target1X, target1Y, target2X, target2Y }) {
  return (
    <g opacity="0.15">
      <polygon points={`${fromX},${fromY} ${target1X},${target1Y} ${fromX + (target1X - fromX) * 0.3},${fromY + (target1Y - fromY) * 0.3}`} fill="#00D4FF" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.2;0.4" dur="2s" repeatCount="indefinite" />
      </polygon>
      <polygon points={`${fromX},${fromY} ${target2X},${target2Y} ${fromX + (target2X - fromX) * 0.3},${fromY + (target2Y - fromY) * 0.3}`} fill="#00D4FF" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.2;0.4" dur="2s" repeatCount="indefinite" />
      </polygon>
      <line x1={fromX} y1={fromY} x2={target1X} y2={target1Y} stroke="#00D4FF" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.6" />
      <line x1={fromX} y1={fromY} x2={target2X} y2={target2Y} stroke="#00D4FF" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.6" />
    </g>
  );
}

function HeroDefender({ x, y, onDrag, onDragEnd, draggable = true }) {
  return (
    <motion.g
      drag={draggable}
      dragMomentum={false}
      onDrag={draggable ? (_e, info) => onDrag(x + info.offset.x, y + info.offset.y) : undefined}
      onDragEnd={draggable ? (_e, info) => onDragEnd(x + info.offset.x, y + info.offset.y) : undefined}
      style={{ cursor: draggable ? 'grab' : 'default' }}
      whileTap={draggable ? { cursor: 'grabbing' } : undefined}
    >
      <circle cx={x} cy={y} r={22} fill="none" stroke="#FBBF24" strokeWidth="2" opacity="0.15" className={draggable ? 'ic-player-hero-glow' : ''} />
      <circle cx={x} cy={y} r={28} fill="#FBBF24" opacity="0.04" />
      <ellipse cx={x} cy={y + 20} rx={12} ry={4} fill="rgba(0,0,0,0.15)" />
      <circle cx={x} cy={y} r={19} fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" filter="url(#softShadow)" />
      <polygon points={`${x - 8},${y - 5} ${x - 6.5},${y - 9} ${x - 4.5},${y - 5} ${x - 9},${y - 7} ${x - 4},${y - 7}`} fill="white" opacity="0.3" />
      <polygon points={`${x + 8},${y - 5} ${x + 6.5},${y - 9} ${x + 4.5},${y - 5} ${x + 9},${y - 7} ${x + 4},${y - 7}`} fill="white" opacity="0.3" />
      <g transform={`translate(${x + 8}, ${y + 7})`}>
        <circle cx={0} cy={0} r={5.5} fill="#F97316" stroke="#7C2D12" strokeWidth="1" />
        <path d="M 0 -5.5 Q 2.5 0, 0 5.5" fill="none" stroke="#7C2D12" strokeWidth="0.5" opacity="0.6" />
      </g>
      <text x={x} y={y + 11} textAnchor="middle" fill="#B45309" fontSize={10} fontWeight="bold" fontFamily="Nunito, sans-serif" style={{ pointerEvents: 'none' }}>You</text>
    </motion.g>
  );
}

export default function SeeBallSeeManGame({ onComplete, onAdvance }) {
  const { lang } = useLanguage();
  const { addXP, soundEnabled } = useGame();
  const scenario = scenarios.seeBallSeeMan;
  const text = lang === 'en' ? scenario.en : scenario.zh;
  const d = scenario.diagram;
  const positions = text.positions;

  const svgWidth = 400, svgHeight = 320;
  const [playerPos, setPlayerPos] = useState({ x: d.defenderStart.x, y: d.defenderStart.y });
  const [phase, setPhase] = useState('intro');
  const [selectedPos, setSelectedPos] = useState(null);
  const [showCoach, setShowCoach] = useState(false);
  const [showSightLines, setShowSightLines] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const checkZone = useCallback((pos) => {
    if (phase !== 'intro') return null;
    for (const zone of positions) {
      const dx = pos.x - zone.x;
      const dy = pos.y - zone.y;
      if (Math.sqrt(dx * dx + dy * dy) < 30) return zone;
    }
    return null;
  }, [phase, positions]);

  const handleSelectPosition = useCallback((position) => {
    if (phase !== 'intro') return;
    setSelectedPos(position);
    setPhase('feedback');
    setPlayerPos({ x: position.x, y: position.y });
    if (position.correct) {
      setShowSightLines(true);
      addXP(100, { drill: true, module: 'defense', correct: true });
      if (soundEnabled) sfx.whistle();
    } else {
      if (soundEnabled) sfx.wrong();
    }
    setTimeout(() => setTimeout(() => setShowCoach(true), 400), 300);
  }, [phase, addXP, soundEnabled]);

  const handleCourtTap = useCallback((x, y) => {
    if (phase !== 'intro') return;
    const hit = checkZone({ x, y });
    hit ? handleSelectPosition(hit) : setPlayerPos({ x, y });
  }, [phase, checkZone, handleSelectPosition]);

  const handleDragMove = useCallback((x, y) => {
    if (phase !== 'intro') return;
    setIsDragging(true);
    setPlayerPos({ x, y });
  }, [phase]);

  const handleDragEnd = useCallback((x, y) => {
    if (phase !== 'intro') return;
    setIsDragging(false);
    const hit = checkZone({ x, y });
    if (hit) handleSelectPosition(hit);
  }, [phase, checkZone, handleSelectPosition]);

  const handleNext = useCallback(() => {
    setShowCoach(false);
    setShowSightLines(false);
    setSelectedPos(null);
    setPhase('intro');
    setPlayerPos({ x: d.defenderStart.x, y: d.defenderStart.y });
    onComplete();
  }, [onComplete, d]);

  const dist = Math.sqrt(
    (playerPos.x - CORRECT_POS.x) ** 2 + (playerPos.y - CORRECT_POS.y) ** 2
  );
  const distColor = dist < 40 ? 'text-success-green' : dist < 70 ? 'text-neon-yellow' : 'text-basketball-red';

  const getLabel = (pos) => lang === 'en' ? pos.label : (pos.zh?.label || pos.label);

  return (
    <div className="px-4 md:px-8 mb-8">
      <motion.div className="mb-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">👁️</span>
          <span className="text-[10px] font-bold text-neon-blue uppercase tracking-widest">
            {lang === 'en' ? 'Drill A' : '训练A'}
          </span>
        </div>
        <h2 className="font-display text-xl md:text-2xl font-bold text-white">{text.title}</h2>
        <p className="text-sm text-court-wood-light/70 font-semibold">{text.subtitle}</p>
      </motion.div>

      <motion.div
        className="bg-dark-card/40 backdrop-blur-sm border border-white/5 rounded-3xl p-4 mb-4"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
      >
        <div className="bg-white/5 rounded-2xl px-4 py-3 mb-4 border border-white/5">
          <p className="text-sm text-white/80 leading-relaxed">{text.setup}</p>
        </div>

        {phase === 'intro' && (
          <motion.div className="flex items-center justify-between mb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-xs font-display font-bold text-neon-yellow">
              👆 {lang === 'en' ? 'Drag the gold defender or tap a zone!' : '拖拽金色防守者或点击区域！'}
            </p>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-white/40">{lang === 'en' ? 'Dist:' : '距离：'}</span>
              <span className={`text-[10px] font-bold font-mono ${distColor}`}>{Math.round(dist)}px</span>
            </div>
          </motion.div>
        )}

        <div className="relative" style={{ touchAction: 'none' }}>
          <InteractiveCourt simple width={400} half="bottom" onCourtTap={handleCourtTap}>
            {/* Full-court tap target */}
            <rect x={0} y={0} width={svgWidth} height={svgHeight} fill="transparent"
              onClick={(e) => {
                const svg = e.currentTarget.closest('svg');
                if (!svg) return;
                const pt = svg.createSVGPoint();
                pt.x = e.clientX; pt.y = e.clientY;
                const ctm = svg.getScreenCTM();
                if (!ctm) return;
                const svgPt = pt.matrixTransform(ctm.inverse());
                handleCourtTap(svgPt.x, svgPt.y - svgHeight);
              }}
            />

            {/* Offensive players */}
            <TeammateAvatar x={d.ballHandler.x} y={d.ballHandler.y} label={d.ballHandler.label} animate />
            <Basketball x={d.ballHandler.x + 12} y={d.ballHandler.y} animate />
            <TeammateAvatar x={d.offensivePlayer.x} y={d.offensivePlayer.y} label={d.offensivePlayer.label} animate pulse delay={0.2} />
            <TeammateAvatar x={d.teammate.x} y={d.teammate.y} label={d.teammate.label} animate delay={0.3} />
            <TeammateAvatar x={d.otherTeammate.x} y={d.otherTeammate.y} label={d.otherTeammate.label} animate delay={0.4} />

            {/* Zone markers */}
            {phase === 'intro' && positions.map((pos) => {
              const near = Math.sqrt((playerPos.x - pos.x) ** 2 + (playerPos.y - pos.y) ** 2) < 28;
              return (
                <g key={pos.id} style={{ pointerEvents: 'none' }}>
                  <circle cx={pos.x} cy={pos.y} r="16"
                    fill={pos.correct ? 'rgba(46,204,113,0.08)' : 'rgba(239,68,68,0.08)'}
                    stroke={pos.correct ? '#2ECC71' : '#EF4444'}
                    strokeWidth={near ? 2.5 : 1} strokeDasharray="4,3"
                    opacity={near ? 0.8 : 0.4} />
                  <text x={pos.x} y={pos.y + 3} textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" opacity={near ? 0.9 : 0.5}>
                    {getLabel(pos)}
                  </text>
                </g>
              );
            })}

            {/* Gold defender */}
            <HeroDefender
              x={playerPos.x} y={playerPos.y}
              onDrag={handleDragMove} onDragEnd={handleDragEnd}
              draggable={phase === 'intro'}
            />

            {showSightLines && (
              <VisionCone fromX={playerPos.x} fromY={playerPos.y}
                target1X={d.ballHandler.x} target1Y={d.ballHandler.y}
                target2X={d.offensivePlayer.x} target2Y={d.offensivePlayer.y} />
            )}

            {phase === 'intro' && !isDragging && (
              <g opacity="0.25" style={{ pointerEvents: 'none' }}>
                <path d={`M ${d.defenderStart.x} ${d.defenderStart.y} Q 275 150, 260 170`}
                  fill="none" stroke="#00D4FF" strokeWidth="1.5" strokeDasharray="4,3" />
                <text x="270" y="148" textAnchor="middle" fill="#00D4FF" fontSize="6" fontWeight="bold">
                  {lang === 'en' ? 'tap/drag →' : '点击/拖拽 →'}
                </text>
              </g>
            )}
          </InteractiveCourt>
        </div>
      </motion.div>

      <AnimatePresence>
        {phase === 'feedback' && selectedPos && !showCoach && (
          <motion.div
            className={`mt-4 rounded-2xl p-4 border ${
              selectedPos.correct ? 'bg-success-green/10 border-success-green/30' : 'bg-basketball-red/10 border-basketball-red/30'
            }`}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm text-white/80">
              {selectedPos.correct
                ? (lang === 'en' ? "✅ Perfect! You're in the pistol position." : '✅ 完美！你站在了手枪位置。')
                : (lang === 'en' ? '❌ Not quite — drag to the green zone next time!' : '❌ 不太对——下次拖到绿色区域！')}
            </p>
            <button onClick={() => setShowCoach(true)} className="text-xs text-white/60 hover:text-white underline underline-offset-2 mt-2">
              {lang === 'en' ? 'Tap for Coach Bear →' : '点击听取熊教练 →'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <CoachBear
        show={showCoach}
        type={selectedPos?.correct ? 'correct' : 'wrong'}
        title={selectedPos ? getLabel(selectedPos) : ''}
        feedback={selectedPos ? (lang === 'en' ? selectedPos.en?.feedback : selectedPos.zh?.feedback) || '' : ''}
        tip={selectedPos ? (lang === 'en' ? selectedPos.en?.tip : selectedPos.zh?.tip) || '' : ''}
        onNext={onAdvance || (onComplete ? handleNext : undefined)}
        onDismiss={() => setShowCoach(false)}
      />
    </div>
  );
}
