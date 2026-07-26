import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveCourt, { PlayerDefenseSVG } from '../court/InteractiveCourt';
import { BallHandlerAvatar, TeammateAvatar, DefenderAvatar } from '../court/Avatars';
import Basketball from '../court/Basketball';
import CoachBear from './CoachBear';
import sfx from '../../services/SFXEngine';
import { useLanguage } from '../../context/LanguageContext';
import { useGame } from '../../context/GameContext';
import scenarios from '../../data/defenseScenarios';

// The correct pistol position (ball-you-man triangle midpoint)
const CORRECT_POS = { x: 260, y: 170, r: 25 };

// Target zones on court (400x320 coordinate space)
const POSITIONS = [
  { id: 'correct',  x: 260, y: 170, labelEn: '✅ Pistol',    labelZh: '✅ 手枪位', correct: true },
  { id: 'wrong1',   x: 290, y: 200, labelEn: '❌ Too close', labelZh: '❌ 太近',    correct: false },
  { id: 'wrong2',   x: 200, y: 130, labelEn: '❌ Ball-watch',labelZh: '❌ 只看球',   correct: false },
  { id: 'wrong3',   x: 310, y: 160, labelEn: '❌ Overplay',  labelZh: '❌ 过度抢前', correct: false },
];

function VisionCone({ fromX, fromY, target1X, target1Y, target2X, target2Y, color = '#00D4FF' }) {
  return (
    <g opacity="0.15">
      {/* Vision triangle to ball */}
      <polygon
        points={`${fromX},${fromY} ${target1X},${target1Y} ${fromX + (target1X - fromX) * 0.3},${fromY + (target1Y - fromY) * 0.3}`}
        fill={color}
        opacity="0.4"
      >
        <animate attributeName="opacity" values="0.4;0.2;0.4" dur="2s" repeatCount="indefinite" />
      </polygon>
      {/* Vision triangle to man */}
      <polygon
        points={`${fromX},${fromY} ${target2X},${target2Y} ${fromX + (target2X - fromX) * 0.3},${fromY + (target2Y - fromY) * 0.3}`}
        fill={color}
        opacity="0.4"
      >
        <animate attributeName="opacity" values="0.4;0.2;0.4" dur="2s" repeatCount="indefinite" />
      </polygon>
      {/* Line to ball */}
      <line x1={fromX} y1={fromY} x2={target1X} y2={target1Y} stroke={color} strokeWidth="1.5" strokeDasharray="4,3" opacity="0.6" />
      {/* Line to man */}
      <line x1={fromX} y1={fromY} x2={target2X} y2={target2Y} stroke={color} strokeWidth="1.5" strokeDasharray="4,3" opacity="0.6" />
    </g>
  );
}

export default function SeeBallSeeManGame({ onComplete, onAdvance }) {
  const { lang } = useLanguage();
  const { addXP, soundEnabled } = useGame();
  const scenario = scenarios.seeBallSeeMan;
  const text = lang === 'en' ? scenario.en : scenario.zh;
  const d = scenario.diagram;

  const [playerPos, setPlayerPos] = useState({ x: d.defenderStart.x, y: d.defenderStart.y });
  const [phase, setPhase] = useState('intro'); // intro | feedback
  const [selectedPos, setSelectedPos] = useState(null);
  const [showCoach, setShowCoach] = useState(false);
  const [showSightLines, setShowSightLines] = useState(false);
  const [distanceToCorrect, setDistanceToCorrect] = useState(999);
  const dragTargetId = 'defender-you';

  // Check if player is in the correct zone
  useEffect(() => {
    if (phase !== 'intro') return;
    const dx = playerPos.x - CORRECT_POS.x;
    const dy = playerPos.y - CORRECT_POS.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    setDistanceToCorrect(dist);

    // Auto-snap when close enough
    if (dist < 30) {
      const correctPos = POSITIONS.find(p => p.correct === true);
      if (correctPos) {
        handleSelectPosition(correctPos);
      }
    }
  }, [playerPos, phase]);

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

    setTimeout(() => {
      setTimeout(() => setShowCoach(true), 400);
    }, 300);
  }, [phase, addXP, soundEnabled]);

  const handleDrag = useCallback((id, x, y) => {
    if (phase !== 'intro') return;
    setPlayerPos({ x, y });
  }, [phase]);

  const handleCourtTap = useCallback((x, y) => {
    // Check if tap is near any position
    for (const pos of POSITIONS) {
      const dx = x - pos.x;
      const dy = y - pos.y;
      if (Math.sqrt(dx * dx + dy * dy) < 28) {
        handleSelectPosition(pos);
        return;
      }
    }
  }, [POSITIONS, handleSelectPosition]);

  const handleNext = useCallback(() => {
    setShowCoach(false);
    setShowSightLines(false);
    setSelectedPos(null);
    setPhase('intro');
    setPlayerPos({ x: d.defenderStart.x, y: d.defenderStart.y });
    setDistanceToCorrect(999);
    onComplete();
  }, [onComplete, d]);

  const getPosText = (pos) => lang === 'en' ? pos.en : (pos.zh || pos.en);

  return (
    <div className="px-4 md:px-8 mb-8">
      {/* Header */}
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

      {/* Setup + Court */}
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
              👆 {lang === 'en' ? 'Drag your defender into position!' : '拖动你的防守者！'}
            </p>
            {/* Distance indicator */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-white/40">{lang === 'en' ? 'Distance:' : '距离：'}</span>
              <span className={`text-[10px] font-bold font-mono ${
                distanceToCorrect < 40 ? 'text-success-green' : distanceToCorrect < 70 ? 'text-neon-yellow' : 'text-basketball-red'
              }`}>
                {Math.round(distanceToCorrect)}px
              </span>
            </div>
          </motion.div>
        )}

        {/* Court */}
        <div className="relative">
          <InteractiveCourt
            simple
            width={400}
            half="top"
            onCourtTap={handleCourtTap}
          >
            {/* Ball Handler */}
            <BallHandlerAvatar x={d.ballHandler.x} y={d.ballHandler.y} label={d.ballHandler.label} animate />
            <Basketball x={d.ballHandler.x + 12} y={d.ballHandler.y} animate />

            {/* Offensive player (your man) */}
            <TeammateAvatar x={d.offensivePlayer.x} y={d.offensivePlayer.y} label={d.offensivePlayer.label} animate pulse delay={0.2} />

            {/* Teammates */}
            <TeammateAvatar x={d.teammate.x} y={d.teammate.y} label={d.teammate.label} animate delay={0.3} />
            <TeammateAvatar x={d.otherTeammate.x} y={d.otherTeammate.y} label={d.otherTeammate.label} animate delay={0.4} />

            {/* Draggable defender - using the InteractiveCourt's built-in drag through pointer events */}
            <g
              onPointerDown={(e) => {
                if (phase !== 'intro') return;
                const svg = e.currentTarget.closest('svg');
                if (!svg) return;
                const pt = svg.createSVGPoint();
                pt.x = e.clientX;
                pt.y = e.clientY;
                const ctm = svg.getScreenCTM();
                if (!ctm) return;
                const svgPt = pt.matrixTransform(ctm.inverse());
                handleDrag('defender', svgPt.x, svgPt.y);
                const target = e.currentTarget;
                target.setPointerCapture(e.pointerId);
                e.preventDefault();
                
                const onMove = (ev) => {
                  const p = svg.createSVGPoint();
                  p.x = ev.clientX;
                  p.y = ev.clientY;
                  const svgP = p.matrixTransform(svg.getScreenCTM().inverse());
                  handleDrag('defender', svgP.x, svgP.y);
                  ev.preventDefault();
                };
                const onUp = () => {
                  target.removeEventListener('pointermove', onMove);
                  target.removeEventListener('pointerup', onUp);
                  try { target.releasePointerCapture(e.pointerId); } catch {}
                };
                target.addEventListener('pointermove', onMove);
                target.addEventListener('pointerup', onUp);
              }}
              style={{ cursor: phase === 'intro' ? 'grab' : 'default', touchAction: 'none' }}
            >
              <DefenderAvatar
                x={playerPos.x}
                y={playerPos.y}
                label="You"
                glow={selectedPos?.correct}
                animate
              />
            </g>

            {/* Target zone markers / drop targets */}
            {phase === 'intro' && POSITIONS.map((pos) => {
              const dx = playerPos.x - pos.x;
              const dy = playerPos.y - pos.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const isHovering = dist < 28;
              return (
                <g key={pos.id}>
                  {/* Ghost target circle */}
                  <circle
                    cx={pos.x} cy={pos.y} r="16"
                    fill={pos.correct ? 'rgba(46,204,113,0.08)' : 'rgba(239,68,68,0.08)'}
                    stroke={pos.correct ? '#2ECC71' : '#EF4444'}
                    strokeWidth={isHovering ? 2.5 : 1}
                    strokeDasharray="4,3"
                    opacity={isHovering ? 0.8 : 0.4}
                  />
                  <text x={pos.x} y={pos.y + 3} textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" opacity={isHovering ? 0.9 : 0.5}>
                    {lang === 'en' ? pos.labelEn : pos.labelZh}
                  </text>
                </g>
              );
            })}

            {/* Dynamic Vision Cone */}
            {phase === 'intro' && (
              <VisionCone
                fromX={playerPos.x}
                fromY={playerPos.y}
                target1X={d.ballHandler.x}
                target1Y={d.ballHandler.y}
                target2X={d.offensivePlayer.x}
                target2Y={d.offensivePlayer.y}
                color="#00D4FF"
              />
            )}

            {/* Sight lines when correct */}
            {showSightLines && selectedPos?.correct && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Ball-You-Man triangle */}
                <polygon
                  points={`${playerPos.x},${playerPos.y} ${d.ballHandler.x},${d.ballHandler.y} ${d.offensivePlayer.x},${d.offensivePlayer.y}`}
                  fill="#00D4FF" opacity="0.08"
                />
                <line x1={playerPos.x} y1={playerPos.y} x2={d.ballHandler.x} y2={d.ballHandler.y} stroke="#00D4FF" strokeWidth="2" strokeDasharray="4,3" opacity="0.8" />
                <line x1={playerPos.x} y1={playerPos.y} x2={d.offensivePlayer.x} y2={d.offensivePlayer.y} stroke="#00D4FF" strokeWidth="2" strokeDasharray="4,3" opacity="0.8" />
                <circle cx={playerPos.x} cy={playerPos.y} r="6" fill="#00D4FF" filter="url(#successGlow)" />
                <text x={(playerPos.x + d.ballHandler.x + d.offensivePlayer.x) / 3} y={(playerPos.y + d.ballHandler.y + d.offensivePlayer.y) / 3} textAnchor="middle" fill="#00D4FF" fontSize="8" fontWeight="bold">
                  {lang === 'en' ? 'Ball-You-Man Triangle' : '球-你-人 三角'}
                </text>
              </motion.g>
            )}

            {/* Result feedback */}
            {phase === 'feedback' && selectedPos && (
              <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring' }}>
                <circle cx={selectedPos.x} cy={selectedPos.y - 22} r="12" fill={selectedPos.correct ? '#2ECC71' : '#EF4444'} filter="url(#successGlow)" />
                <text x={selectedPos.x} y={selectedPos.y - 18} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                  {selectedPos.correct ? '✓' : '✗'}
                </text>
                {!selectedPos.correct && (
                  <text x={d.ballHandler.x + 15} y={d.ballHandler.y - 20} fill="#EF4444" fontSize="6" fontWeight="bold" opacity="0.8">BACKDOOR!</text>
                )}
              </motion.g>
            )}
          </InteractiveCourt>
        </div>
      </motion.div>

      {/* Feedback overlay before CoachBear */}
      <AnimatePresence>
        {phase === 'feedback' && selectedPos && !showCoach && (
          <motion.div
            className={`rounded-2xl p-4 border ${
              selectedPos.correct ? 'bg-success-green/10 border-success-green/30' : 'bg-basketball-red/10 border-basketball-red/30'
            }`}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{selectedPos.correct ? '✅' : '❌'}</span>
              <span className={`font-display font-bold text-sm ${selectedPos.correct ? 'text-success-green' : 'text-basketball-red'}`}>
                {selectedPos.correct
                  ? (lang === 'en' ? 'Perfect position! +100 IQ' : '完美位置！+100')
                  : (lang === 'en' ? 'Not quite! Try dragging to the pistol spot' : '不太对！拖到手枪位置')}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coach Bear — always rendered so exit animation plays */}
      <CoachBear
        show={showCoach}
        type={selectedPos?.correct ? 'correct' : 'wrong'}
        title={selectedPos?.label || ''}
        feedback={selectedPos ? getPosText(selectedPos).feedback : ''}
        tip={selectedPos ? getPosText(selectedPos).tip : ''}
        onNext={onAdvance || (onComplete ? handleNext : undefined)}
        onDismiss={() => setShowCoach(false)}
      />
    </div>
  );
}
