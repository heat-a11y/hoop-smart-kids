import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const [moved, setMoved] = useState(false);
  const [playerPos, setPlayerPos] = useState({ x: d.positions[0].startX, y: d.positions[0].startY });
  const [showTarget, setShowTarget] = useState(false);
  const [phase, setPhase] = useState('playing'); // playing | feedback
  const [showCoach, setShowCoach] = useState(false);

  const handleTapWing = useCallback(() => {
    if (moved || phase !== 'playing') return;

    const target = d.targetZone;
    setPlayerPos({ x: target.x + target.width / 2, y: target.y + target.height / 2 });
    setMoved(true);
    setShowTarget(true);
  }, [moved, phase, d]);

  const handleConfirmMove = useCallback(() => {
    if (!moved) return;
    setPhase('feedback');
    addXP(100, { drill: true, module: 'offense', correct: true });
    if (soundEnabled) sfx.whistle();
    setTimeout(() => setShowCoach(true), 400);
  }, [moved, addXP, soundEnabled]);

  const handleStayPaint = useCallback(() => {
    if (moved || phase !== 'playing') return;
    setPhase('feedback');
    if (soundEnabled) sfx.wrong();
    setTimeout(() => setShowCoach(true), 400);
  }, [moved, phase, soundEnabled]);

  const handleNext = useCallback(() => {
    setShowCoach(false);
    setMoved(false);
    setShowTarget(false);
    setPhase('playing');
    setPlayerPos({ x: d.positions[0].startX, y: d.positions[0].startY });
    onComplete();
  }, [onComplete, d]);

  return (
    <div className="px-4 md:px-8 mb-8">
      {/* Header */}
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">📐</span>
          <span className="text-[10px] font-bold text-neon-yellow uppercase tracking-widest">
            {lang === 'en' ? 'Scenario C' : '场景C'}
          </span>
        </div>
        <h2 className="font-display text-xl md:text-2xl font-bold text-white">
          {text.title}
        </h2>
        <p className="text-sm text-court-wood-light/70 font-semibold">
          {text.subtitle}
        </p>
      </motion.div>

      {/* Court + Setup */}
      <motion.div
        className="bg-dark-card/40 backdrop-blur-sm border border-white/5 rounded-3xl p-4 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="bg-white/5 rounded-2xl px-4 py-3 mb-4 border border-white/5">
          <p className="text-sm text-white/80 leading-relaxed">
            {text.setup}
          </p>
        </div>

        {/* Interactive instruction */}
        {phase === 'playing' && !moved && (
          <motion.div
            className="text-center mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-xs font-display font-bold text-neon-yellow">
              {lang === 'en'
                ? '👆 Tap the highlighted player, then tap the open wing area!'
                : '👆 点击高亮球员，然后点击空位侧翼区域！'}
            </p>
          </motion.div>
        )}

        {/* Court Diagram */}
        <div className="relative">
          <BasketballCourt width={400} half="top">
            {/* Other players crowded in paint */}
            {d.positions.slice(1).map((pos) => (
              pos.defender ? (
                <DefenderAvatar
                  key={pos.id}
                  x={pos.x}
                  y={pos.y}
                  label={pos.label}
                  animate
                  delay={0.2}
                />
              ) : (
                <TeammateAvatar
                  key={pos.id}
                  x={pos.x}
                  y={pos.y}
                  label={pos.label}
                  animate
                  delay={0.2}
                />
              )
            ))}

            {/* Movable player */}
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={
                moved
                  ? { opacity: 1, scale: 1, x: 0, y: 0 }
                  : { opacity: 1, scale: [1, 1.2, 1] }
              }
              transition={
                moved
                  ? { type: 'spring', stiffness: 100, damping: 15 }
                  : { repeat: Infinity, duration: 1.2 }
              }
              className={!moved ? 'cursor-pointer' : ''}
              onClick={!moved ? handleTapWing : undefined}
            >
              {/* Glow ring for attention */}
              {!moved && (
                <circle
                  cx={playerPos.x}
                  cy={playerPos.y}
                  r="24"
                  fill="none"
                  stroke="#FFE135"
                  strokeWidth="2"
                  strokeDasharray="4,3"
                  opacity="0.6"
                />
              )}
              <BallHandlerAvatar
                x={playerPos.x}
                y={playerPos.y}
                label={d.positions[0].label}
                size={18}
                glow
              />
            </motion.g>

            {/* Target zone */}
            {!moved && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <rect
                  x={d.targetZone.x}
                  y={d.targetZone.y}
                  width={d.targetZone.width}
                  height={d.targetZone.height}
                  fill="#2ECC71"
                  opacity="0.15"
                  rx="8"
                  stroke="#2ECC71"
                  strokeWidth="2"
                  strokeDasharray="4,3"
                />
                <text
                  x={d.targetZone.x + d.targetZone.width / 2}
                  y={d.targetZone.y + d.targetZone.height / 2 + 3}
                  textAnchor="middle"
                  fill="#2ECC71"
                  fontSize="8"
                  fontWeight="bold"
                >
                  OPEN WING
                </text>
              </motion.g>
            )}

            {/* Success visualization */}
            {moved && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {/* Spacing lines showing open lanes */}
                <line x1={playerPos.x + 15} y1={playerPos.y} x2={playerPos.x + 45} y2={playerPos.y - 10} stroke="#2ECC71" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.5" />
                <line x1={playerPos.x + 15} y1={playerPos.y + 5} x2={playerPos.x + 35} y2={playerPos.y + 25} stroke="#2ECC71" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.5" />
                <text x={playerPos.x + 50} y={playerPos.y - 5} fill="#2ECC71" fontSize="7" fontWeight="bold">✓ spacing</text>
              </motion.g>
            )}

            {/* Crowded label */}
            {!moved && (
              <text x={290} y={230} textAnchor="middle" fill="#EF4444" fontSize="7" fontWeight="bold" opacity="0.6">
                ✗ TOO CROWDED
              </text>
            )}
          </BasketballCourt>
        </div>
      </motion.div>

      {/* Action buttons */}
      {phase === 'playing' && (
        <motion.div
          className="space-y-2.5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {!moved ? (
            <motion.button
              onClick={handleStayPaint}
              className="w-full py-3 bg-dark-card/60 border border-white/5 rounded-2xl font-display font-bold text-sm text-white/70 hover:bg-dark-card-hover transition-colors"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              {lang === 'en' ? 'I\'ll stay in the paint' : '我留在禁区'}
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

      {/* Coach Bear — always rendered so exit animation plays */}
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
