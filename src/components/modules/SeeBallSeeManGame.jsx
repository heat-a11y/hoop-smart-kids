import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveCourt from '../court/InteractiveCourt';
import { BallHandlerAvatar, TeammateAvatar } from '../court/Avatars';
import Basketball from '../court/Basketball';
import CoachBear from './CoachBear';
import sfx from '../../services/SFXEngine';
import { useLanguage } from '../../context/LanguageContext';
import { useGame } from '../../context/GameContext';
import scenarios from '../../data/defenseScenarios';

const CORRECT_POS = { x: 260, y: 170 };

function VisionCone({ fromX, fromY, target1X, target1Y, target2X, target2Y, color = '#00D4FF' }) {
  return (
    <g opacity="0.15">
      <polygon points={`${fromX},${fromY} ${target1X},${target1Y} ${fromX + (target1X - fromX) * 0.3},${fromY + (target1Y - fromY) * 0.3}`} fill={color} opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.2;0.4" dur="2s" repeatCount="indefinite" />
      </polygon>
      <polygon points={`${fromX},${fromY} ${target2X},${target2Y} ${fromX + (target2X - fromX) * 0.3},${fromY + (target2Y - fromY) * 0.3}`} fill={color} opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.2;0.4" dur="2s" repeatCount="indefinite" />
      </polygon>
      <line x1={fromX} y1={fromY} x2={target1X} y2={target1Y} stroke={color} strokeWidth="1.5" strokeDasharray="4,3" opacity="0.6" />
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
  const positions = text.positions;

  const [playerPos, setPlayerPos] = useState({ x: d.defenderStart.x, y: d.defenderStart.y });
  const [phase, setPhase] = useState('intro');
  const [selectedPos, setSelectedPos] = useState(null);
  const [showCoach, setShowCoach] = useState(false);
  const [showSightLines, setShowSightLines] = useState(false);

  // Auto-detect when dragged into a zone
  useEffect(() => {
    if (phase !== 'intro') return;
    for (const pos of positions) {
      const dx = playerPos.x - pos.x;
      const dy = playerPos.y - pos.y;
      if (Math.sqrt(dx * dx + dy * dy) < 28) {
        handleSelectPosition(pos);
        return;
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
    setTimeout(() => setTimeout(() => setShowCoach(true), 400), 300);
  }, [phase, addXP, soundEnabled]);

  const handleDrag = useCallback((_id, x, y) => {
    if (phase !== 'intro') return;
    setPlayerPos({ x, y });
  }, [phase]);

  const handleNext = useCallback(() => {
    setShowCoach(false);
    setShowSightLines(false);
    setSelectedPos(null);
    setPhase('intro');
    setPlayerPos({ x: d.defenderStart.x, y: d.defenderStart.y });
    onComplete();
  }, [onComplete, d]);

  const distToCorrect = Math.sqrt(
    (playerPos.x - CORRECT_POS.x) ** 2 + (playerPos.y - CORRECT_POS.y) ** 2
  );

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

      <motion.div className="bg-dark-card/40 backdrop-blur-sm border border-white/5 rounded-3xl p-4 mb-4"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="bg-white/5 rounded-2xl px-4 py-3 mb-4 border border-white/5">
          <p className="text-sm text-white/80 leading-relaxed">{text.setup}</p>
        </div>

        {phase === 'intro' && (
          <motion.div className="flex items-center justify-between mb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-xs font-display font-bold text-neon-yellow">
              👆 {lang === 'en' ? 'Drag your defender into the green pistol zone!' : '将你的防守者拖到绿色手枪位！'}
            </p>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-white/40">{lang === 'en' ? 'Dist:' : '距离：'}</span>
              <span className={`text-[10px] font-bold font-mono ${
                distToCorrect < 40 ? 'text-success-green' : distToCorrect < 70 ? 'text-neon-yellow' : 'text-basketball-red'
              }`}>{Math.round(distToCorrect)}px</span>
            </div>
          </motion.div>
        )}

        <div className="relative" style={{ touchAction: 'none' }}>
          <InteractiveCourt
            simple={false} width={400} half="bottom"
            players={[
              { id: 'defender-you', type: 'hero', x: playerPos.x, y: playerPos.y, label: 'You', draggable: phase === 'intro' },
            ]}
            onPlayerDrag={handleDrag}
          >
            <BallHandlerAvatar x={d.ballHandler.x} y={d.ballHandler.y} label={d.ballHandler.label} animate />
            <Basketball x={d.ballHandler.x + 12} y={d.ballHandler.y} animate />
            <TeammateAvatar x={d.offensivePlayer.x} y={d.offensivePlayer.y} label={d.offensivePlayer.label} animate pulse delay={0.2} />
            <TeammateAvatar x={d.teammate.x} y={d.teammate.y} label={d.teammate.label} animate delay={0.3} />
            <TeammateAvatar x={d.otherTeammate.x} y={d.otherTeammate.y} label={d.otherTeammate.label} animate delay={0.4} />

            {/* Zone markers */}
            {phase === 'intro' && positions.map((pos) => {
              const dx = playerPos.x - pos.x;
              const dy = playerPos.y - pos.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const near = dist < 28;
              return (
                <g key={pos.id}>
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

            {showSightLines && (
              <VisionCone fromX={playerPos.x} fromY={playerPos.y}
                target1X={d.ballHandler.x} target1Y={d.ballHandler.y}
                target2X={d.offensivePlayer.x} target2Y={d.offensivePlayer.y} />
            )}

            {phase === 'intro' && (
              <g opacity="0.25">
                <path d={`M ${d.defenderStart.x} ${d.defenderStart.y} Q 275 150, 260 170`}
                  fill="none" stroke="#00D4FF" strokeWidth="1.5" strokeDasharray="4,3" />
                <text x="270" y="148" textAnchor="middle" fill="#00D4FF" fontSize="6" fontWeight="bold">
                  {lang === 'en' ? 'drag →' : '拖拽 →'}
                </text>
              </g>
            )}
          </InteractiveCourt>
        </div>
      </motion.div>

      <AnimatePresence>
        {phase === 'feedback' && selectedPos && !showCoach && (
          <motion.div className={`mt-4 rounded-2xl p-4 border ${
            selectedPos.correct ? 'bg-success-green/10 border-success-green/30' : 'bg-basketball-red/10 border-basketball-red/30'
          }`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
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
