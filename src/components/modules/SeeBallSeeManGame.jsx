import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BasketballCourt from '../court/BasketballCourt';
import { BallHandlerAvatar, TeammateAvatar, DefenderAvatar } from '../court/Avatars';
import Basketball from '../court/Basketball';
import SightLines from '../court/SightLines';
import CoachBear from './CoachBear';
import sfx from '../../services/SFXEngine';
import { useLanguage } from '../../context/LanguageContext';
import { useGame } from '../../context/GameContext';
import scenarios from '../../data/defenseScenarios';

export default function SeeBallSeeManGame({ onComplete, onAdvance }) {
  const { lang } = useLanguage();
  const { addXP, soundEnabled } = useGame();
  const scenario = scenarios.seeBallSeeMan;
  const text = lang === 'en' ? scenario.en : scenario.zh;
  const d = scenario.diagram;

  const [playerPos, setPlayerPos] = useState({ x: d.defenderStart.x, y: d.defenderStart.y });
  const [selectedPos, setSelectedPos] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showCoach, setShowCoach] = useState(false);
  const [showSightLines, setShowSightLines] = useState(false);
  const [phase, setPhase] = useState('intro');

  const handleTapCourt = useCallback((position) => {
    if (phase !== 'intro') return;
    setPlayerPos({ x: position.x, y: position.y });
    setSelectedPos(position);
    setPhase('feedback');

    if (position.correct) {
      addXP(100, { drill: true, module: 'defense', correct: true });
      if (soundEnabled) sfx.whistle();
    } else {
      if (soundEnabled) sfx.wrong();
    }

    setTimeout(() => {
      setShowFeedback(true);
      setShowSightLines(true);
      setTimeout(() => setShowCoach(true), 400);
    }, 300);
  }, [phase, addXP, soundEnabled]);

  const handleNext = useCallback(() => {
    setShowCoach(false);
    setShowFeedback(false);
    setShowSightLines(false);
    setSelectedPos(null);
    setPhase('intro');
    setPlayerPos({ x: d.defenderStart.x, y: d.defenderStart.y });
    onComplete();
  }, [onComplete, d]);

  const getPosText = (pos) => {
    return lang === 'en' ? pos.en : (pos.zh || pos.en);
  };

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
          <motion.p
            className="text-xs font-display font-bold text-neon-yellow text-center mb-3"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            {text.instruction}
          </motion.p>
        )}

        {/* Court */}
        <div className="relative">
          <BasketballCourt width={400} height={320}>
            {/* Ball Handler */}
            <BallHandlerAvatar x={d.ballHandler.x} y={d.ballHandler.y} label={d.ballHandler.label} animate />
            <Basketball x={d.ballHandler.x + 12} y={d.ballHandler.y} animate />

            {/* Offensive player (your man) */}
            <TeammateAvatar x={d.offensivePlayer.x} y={d.offensivePlayer.y} label={d.offensivePlayer.label} animate pulse delay={0.2} />

            {/* Teammates */}
            <TeammateAvatar x={d.teammate.x} y={d.teammate.y} label={d.teammate.label} animate delay={0.3} />
            <TeammateAvatar x={d.otherTeammate.x} y={d.otherTeammate.y} label={d.otherTeammate.label} animate delay={0.4} />

            {/* Clickable position markers */}
            {phase === 'intro' && text.positions.map((pos) => (
              <motion.g
                key={pos.id}
                onClick={() => handleTapCourt(pos)}
                className="cursor-pointer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.7, scale: 1 }}
                transition={{ type: 'spring', delay: 0.5 }}
                whileHover={{ opacity: 1, scale: 1.15 }}
              >
                <circle cx={pos.x} cy={pos.y} r="14" fill="white" opacity="0.08" stroke="white" strokeWidth="1" strokeDasharray="3,2" />
                <text x={pos.x} y={pos.y + 3} textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">{pos.label}</text>
              </motion.g>
            ))}

            {/* Player dot (you) - follows selection */}
            <DefenderAvatar x={playerPos.x} y={playerPos.y} label="You" glow={selectedPos?.correct} animate />

            {/* Sight lines when feedback shown */}
            {showSightLines && selectedPos?.correct && (
              <SightLines
                fromX={playerPos.x}
                fromY={playerPos.y}
                target1X={d.ballHandler.x}
                target1Y={d.ballHandler.y}
                target2X={d.offensivePlayer.x}
                target2Y={d.offensivePlayer.y}
                color="#00D4FF"
                labelEn="Ball-You-Man Triangle"
                labelZh="球-你-人 三角"
                lang={lang}
              />
            )}

            {/* Result feedback */}
            {showFeedback && selectedPos && (
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring' }}
              >
                <circle
                  cx={selectedPos.x}
                  cy={selectedPos.y - 22}
                  r="12"
                  fill={selectedPos.correct ? '#2ECC71' : '#EF4444'}
                  filter="url(#successGlow)"
                />
                <text
                  x={selectedPos.x}
                  y={selectedPos.y - 18}
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {selectedPos.correct ? '✓' : '✗'}
                </text>
                {!selectedPos.correct && (
                  <text
                    x={d.ballHandler.x + 15}
                    y={d.ballHandler.y - 20}
                    fill="#EF4444"
                    fontSize="6"
                    fontWeight="bold"
                    opacity="0.8"
                  >
                    BACKDOOR!
                  </text>
                )}
              </motion.g>
            )}
          </BasketballCourt>
        </div>
      </motion.div>

      {/* Coach Bear */}
      {showCoach && selectedPos && (
        <CoachBear
          show={showCoach}
          type={selectedPos.correct ? 'correct' : 'wrong'}
          title={selectedPos.label}
          feedback={getPosText(selectedPos).feedback}
          tip={getPosText(selectedPos).tip}
          onNext={onAdvance || (onComplete ? handleNext : undefined)}
          onDismiss={() => setShowCoach(false)}
        />
      )}
    </div>
  );
}
