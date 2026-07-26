import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveCourt from '../court/InteractiveCourt';
import { BallHandlerAvatar, TeammateAvatar, DefenderAvatar } from '../court/Avatars';
import Basketball from '../court/Basketball';
import CoachBear from './CoachBear';
import sfx from '../../services/SFXEngine';
import { useLanguage } from '../../context/LanguageContext';
import { useGame } from '../../context/GameContext';
import scenarios from '../../data/offenseScenarios';

// Court-tap target zones (in 400x320 coordinate space)
const TARGETS = {
  shoot:    { x: 200, y: 50,  r: 28, labelEn: '🏀 SHOOT', labelZh: '🏀 投篮', correct: true },
  drive:    { x: 200, y: 120, r: 24, labelEn: '💪 DRIVE', labelZh: '💪 突破', correct: false },
  pass:     { x: 130, y: 250, r: 24, labelEn: '✋ PASS',  labelZh: '✋ 传球', correct: 'suboptimal' },
};

const TARGET_BALL = {
  start: { x: 200, y: 210 },       // ball handler position
  peak:  { x: 200, y: 30  },
  end:   { x: 200, y: 24  },        // basket
};

export default function TripleThreatGame({ onComplete, onAdvance }) {
  const { lang, t: _t } = useLanguage();
  const { addXP, soundEnabled } = useGame();
  const scenario = scenarios.tripleThreat;
  const text = lang === 'en' ? scenario.en : scenario.zh;
  const d = scenario.diagram;

  const [phase, setPhase] = useState('intro');
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showCoach, setShowCoach] = useState(false);
  const [ballFlight, setBallFlight] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Map target ID to actual choice object
  const getChoiceForTarget = (targetId) => {
    const idx = targetId === 'shoot' ? 0 : targetId === 'drive' ? 1 : 2;
    return text.choices[idx] || text.choices[0];
  };

  const handleCourtTap = useCallback((targetId) => {
    if (phase !== 'intro') return;
    const choice = getChoiceForTarget(targetId);
    setSelectedChoice(choice);
    setPhase('animating');

    // Animate ball flight for shoot (correct)
    if (choice.correct === true) {
      setBallFlight(true);
      addXP(100, { drill: true, module: 'offense', correct: true });
      if (soundEnabled) sfx.whistle();
      setTimeout(() => {
        setBallFlight(false);
        setShowResult(true);
        setTimeout(() => setShowCoach(true), 400);
      }, 800);
    } else {
      if (soundEnabled) sfx.wrong();
      setTimeout(() => {
        setShowResult(true);
        setTimeout(() => setShowCoach(true), 400);
      }, 400);
    }
  }, [phase, text, addXP, soundEnabled]);

  const handleNext = useCallback(() => {
    setShowCoach(false);
    setShowResult(false);
    setSelectedChoice(null);
    setBallFlight(false);
    setPhase('intro');
    onComplete();
  }, [onComplete]);

  const getResultType = (choice) => {
    if (choice.correct === true) return 'correct';
    if (choice.correct === 'suboptimal') return 'suboptimal';
    return 'wrong';
  };

  return (
    <div className="px-4 md:px-8 mb-8">
      {/* Header */}
      <motion.div className="mb-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">🏀</span>
          <span className="text-[10px] font-bold text-court-orange uppercase tracking-widest">
            {lang === 'en' ? 'Scenario A' : '场景A'}
          </span>
        </div>
        <h2 className="font-display text-xl md:text-2xl font-bold text-white">{text.title}</h2>
        <p className="text-sm text-court-wood-light/70 font-semibold">{text.subtitle}</p>
      </motion.div>

      {/* Court + Setup */}
      <motion.div
        className="bg-dark-card/40 backdrop-blur-sm border border-white/5 rounded-3xl p-4 mb-4"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
      >
        <div className="bg-white/5 rounded-2xl px-4 py-3 mb-4 border border-white/5">
          <p className="text-sm text-white/80 leading-relaxed">{text.setup}</p>
        </div>

        {/* Instruction hint */}
        {phase === 'intro' && (
          <motion.p
            className="text-xs font-display font-bold text-neon-yellow text-center mb-3"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            👆 {lang === 'en' ? 'Tap a target on the court!' : '点击球场上的目标！'}
          </motion.p>
        )}

        {/* Court Diagram */}
        <div className="relative">
          <InteractiveCourt simple width={400} half="top">
            {/* Teammates */}
            <TeammateAvatar x={d.teammate1.x} y={d.teammate1.y} label={d.teammate1.label} animate delay={0.2} />
            <TeammateAvatar x={d.teammate2.x} y={d.teammate2.y} label={d.teammate2.label} animate delay={0.3} />
            <TeammateAvatar x={d.teammate3.x} y={d.teammate3.y} label={d.teammate3.label} animate delay={0.4} />

            {/* Defenders */}
            <DefenderAvatar x={d.defender1.x} y={d.defender1.y} label={d.defender1.label} animate delay={0.15} />
            <DefenderAvatar x={d.defender2.x} y={d.defender2.y} label={d.defender2.label} animate delay={0.25} />
            <DefenderAvatar x={d.defender3.x} y={d.defender3.y} label={d.defender3.label} animate delay={0.35} />

            {/* Ball Handler */}
            <BallHandlerAvatar x={d.ballHandler.x} y={d.ballHandler.y} label={d.ballHandler.label} animate glow pulse delay={0.1} />

            {/* Basketball - moves during flight */}
            {!ballFlight ? (
              <Basketball x={d.ballHandler.x} y={d.ballHandler.y - 16} animate delay={0.5} />
            ) : (
              <motion.g
                initial={{ x: TARGET_BALL.start.x, y: TARGET_BALL.start.y - 16 }}
                animate={{ x: TARGET_BALL.end.x, y: TARGET_BALL.end.y - 16 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <Basketball x={0} y={0} />
              </motion.g>
            )}

            {/* Sagging off arrow */}
            {d.saggingArrow && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                <line x1={d.saggingArrow.from.x} y1={d.saggingArrow.from.y} x2={d.saggingArrow.to.x} y2={d.saggingArrow.to.y} stroke="#FFE135" strokeWidth="2" strokeDasharray="4,3" markerEnd="url(#arrowYellow)" />
                <polygon points={`${d.saggingArrow.to.x},${d.saggingArrow.to.y} ${d.saggingArrow.to.x - 4},${d.saggingArrow.to.y - 4} ${d.saggingArrow.to.x + 4},${d.saggingArrow.to.y - 4}`} fill="#FFE135" />
                <text x={d.saggingArrow.from.x + 25} y={(d.saggingArrow.from.y + d.saggingArrow.to.y) / 2 + 4} fill="#FFE135" fontSize="8" fontWeight="bold">{d.saggingArrow.label}</text>
              </motion.g>
            )}

            {/* Interactive Tap Targets */}
            {phase === 'intro' && Object.entries(TARGETS).map(([id, tgt]) => (
              <motion.g
                key={id}
                onClick={() => handleCourtTap(id)}
                className="cursor-pointer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', delay: 0.4 + (id === 'shoot' ? 0 : id === 'drive' ? 0.1 : 0.2) }}
                whileHover={{ scale: 1.12 }}
              >
                {/* Outer glow ring */}
                <circle
                  cx={tgt.x} cy={tgt.y} r={tgt.r * 1.4}
                  fill="none" stroke={tgt.correct === true ? '#2ECC71' : tgt.correct === 'suboptimal' ? '#FFE135' : '#EF4444'}
                  strokeWidth="2" opacity="0.2"
                  className={tgt.correct === true ? 'ic-zone-open' : tgt.correct === 'suboptimal' ? '' : 'ic-zone-pressure'}
                />
                {/* Main ring */}
                <circle
                  cx={tgt.x} cy={tgt.y} r={tgt.r}
                  fill={tgt.correct === true ? 'rgba(46,204,113,0.15)' : tgt.correct === 'suboptimal' ? 'rgba(255,225,53,0.12)' : 'rgba(239,68,68,0.15)'}
                  stroke={tgt.correct === true ? '#2ECC71' : tgt.correct === 'suboptimal' ? '#FFE135' : '#EF4444'}
                  strokeWidth="2.5" strokeDasharray="4,3"
                />
                {/* Label */}
                <text x={tgt.x} y={tgt.y + 4} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="Nunito, sans-serif">
                  {lang === 'en' ? tgt.labelEn : tgt.labelZh}
                </text>
              </motion.g>
            ))}

            {/* Ball flight arc path */}
            {ballFlight && (
              <motion.path
                d={`M ${TARGET_BALL.start.x} ${TARGET_BALL.start.y - 16} Q ${TARGET_BALL.peak.x} ${TARGET_BALL.peak.y}, ${TARGET_BALL.end.x} ${TARGET_BALL.end.y - 8}`}
                fill="none" stroke="#2ECC71" strokeWidth="2.5" strokeDasharray="6,3"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                filter="url(#successGlow)"
              />
            )}

            {/* Swoosh effect near basket */}
            {ballFlight && (
              <motion.circle
                cx={TARGET_BALL.end.x} cy={TARGET_BALL.end.y - 4} r="16"
                fill="none" stroke="#2ECC71" strokeWidth="4" opacity="0.3"
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                filter="url(#successGlow)"
              />
            )}

            {/* Result overlay */}
            <AnimatePresence>
              {showResult && selectedChoice && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {selectedChoice.correct === true ? (
                    <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                      <circle cx={d.ballHandler.x + 30} cy={d.ballHandler.y - 20} r="12" fill="#2ECC71" filter="url(#successGlow)" />
                      <text x={d.ballHandler.x + 30} y={d.ballHandler.y - 16} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">✓</text>
                      <line x1={d.ballHandler.x} y1={d.ballHandler.y - 16} x2={d.ballHandler.x + 15} y2={d.ballHandler.y - 60} stroke="#2ECC71" strokeWidth="2" strokeDasharray="4,2" opacity="0.6" />
                    </motion.g>
                  ) : selectedChoice.correct === 'suboptimal' ? (
                    <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                      <circle cx={d.ballHandler.x - 30} cy={d.ballHandler.y - 10} r="12" fill="#FFE135" />
                      <text x={d.ballHandler.x - 30} y={d.ballHandler.y - 6} textAnchor="middle" fill="#1A1A2E" fontSize="14" fontWeight="bold">!</text>
                      <path d={`M ${d.ballHandler.x} ${d.ballHandler.y} Q ${d.ballHandler.x - 40} ${d.ballHandler.y + 20}, ${d.ballHandler.x - 60} ${d.ballHandler.y}`} fill="none" stroke="#FFE135" strokeWidth="2" strokeDasharray="4,2" opacity="0.6" />
                    </motion.g>
                  ) : (
                    <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                      <circle cx={d.ballHandler.x + 20} cy={d.ballHandler.y + 25} r="12" fill="#EF4444" filter="url(#successGlow)" />
                      <text x={d.ballHandler.x + 20} y={d.ballHandler.y + 29} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">✗</text>
                      <path d={`M ${d.ballHandler.x} ${d.ballHandler.y + 5} Q ${d.ballHandler.x + 15} ${d.ballHandler.y + 20}, ${d.ballHandler.x + 5} ${d.ballHandler.y + 35}`} fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="4,2" opacity="0.6" />
                      <text x={d.ballHandler.x + 30} y={d.ballHandler.y + 40} fill="#EF4444" fontSize="7" opacity="0.8">TO!</text>
                    </motion.g>
                  )}
                </motion.g>
              )}
            </AnimatePresence>
          </InteractiveCourt>
        </div>
      </motion.div>

      {/* Choice buttons as fallback / label beneath court */}
      {phase === 'intro' && (
        <motion.div
          className="grid grid-cols-3 gap-2 text-center"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        >
          {Object.entries(TARGETS).map(([id, tgt]) => (
            <div key={id} className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                tgt.correct === true ? 'bg-success-green/20' : tgt.correct === 'suboptimal' ? 'bg-neon-yellow/20' : 'bg-basketball-red/20'
              }`}>
                <span className="text-xs font-bold text-white">
                  {id === 'shoot' ? 'A' : id === 'drive' ? 'B' : 'C'}
                </span>
              </div>
              <span className="text-[10px] text-white/50 font-semibold">
                {lang === 'en' ? tgt.labelEn : tgt.labelZh}
              </span>
            </div>
          ))}
        </motion.div>
      )}

      {/* Coach Bear — always rendered so exit animation plays */}
      <CoachBear
        show={showCoach}
        type={selectedChoice ? getResultType(selectedChoice) : 'correct'}
        title={selectedChoice ? (lang === 'en' ? selectedChoice.en.title : (selectedChoice.zh?.title || selectedChoice.en.title)) : ''}
        feedback={selectedChoice ? (lang === 'en' ? selectedChoice.en.feedback : (selectedChoice.zh?.feedback || selectedChoice.en.feedback)) : ''}
        tip={selectedChoice ? (lang === 'en' ? selectedChoice.en.tip : (selectedChoice.zh?.tip || selectedChoice.en.tip)) : ''}
        onNext={onAdvance || (onComplete ? handleNext : undefined)}
        onDismiss={() => setShowCoach(false)}
      />
    </div>
  );
}
