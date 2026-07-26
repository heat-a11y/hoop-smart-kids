import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BasketballCourt from '../court/BasketballCourt';
import { BallHandlerAvatar, TeammateAvatar, DefenderAvatar } from '../court/Avatars';
import Basketball from '../court/Basketball';
import CoachBear from './CoachBear';
import sfx from '../../services/SFXEngine';
import { useLanguage } from '../../context/LanguageContext';
import { useGame } from '../../context/GameContext';
import scenarios from '../../data/communicationScenarios';

export default function CallScreenGame({ onComplete }) {
  const { lang } = useLanguage();
  const { addXP, soundEnabled } = useGame();
  const scenario = scenarios.callScreen;
  const text = lang === 'en' ? scenario.en : scenario.zh;
  const d = scenario.diagram;

  const [selectedChoice, setSelectedChoice] = useState(null);
  const [phase, setPhase] = useState('intro'); // intro | feedback
  const [showCoach, setShowCoach] = useState(false);
  const [screenAnim, setScreenAnim] = useState(false);

  const handleChoice = useCallback((choice) => {
    setSelectedChoice(choice);
    setPhase('feedback');
    setScreenAnim(true);

    if (choice.correct === true) {
      addXP(100, { drill: true, module: 'communication', correct: true });
      if (soundEnabled) sfx.whistle();
    } else {
      if (soundEnabled) sfx.wrong();
    }

    setTimeout(() => setShowCoach(true), 500);
  }, [addXP, soundEnabled]);

  const handleNext = useCallback(() => {
    setShowCoach(false);
    setSelectedChoice(null);
    setPhase('intro');
    setScreenAnim(false);
    onComplete();
  }, [onComplete]);

  const getChoiceText = (choice) => lang === 'en' ? choice.en : (choice.zh || choice.en);

  return (
    <div className="px-4 md:px-8 mb-8">
      {/* Header */}
      <motion.div className="mb-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">📢</span>
          <span className="text-[10px] font-bold text-neon-yellow uppercase tracking-widest">
            {lang === 'en' ? 'Drill A' : '训练A'}
          </span>
        </div>
        <h2 className="font-display text-xl md:text-2xl font-bold text-white">{text.title}</h2>
        <p className="text-sm text-court-wood-light/70 font-semibold">{text.subtitle}</p>
      </motion.div>

      {/* Court */}
      <motion.div
        className="bg-dark-card/40 backdrop-blur-sm border border-white/5 rounded-3xl p-4 mb-4"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
      >
        <div className="bg-white/5 rounded-2xl px-4 py-3 mb-4 border border-white/5">
          <p className="text-sm text-white/80 leading-relaxed">{text.setup}</p>
        </div>

        {phase === 'intro' && (
          <motion.p className="text-xs font-display font-bold text-neon-yellow text-center mb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {text.instruction}
          </motion.p>
        )}

        <div className="relative">
          <BasketballCourt width={400} height={320}>
            {/* Ball Handler */}
            <BallHandlerAvatar x={d.ballHandler.x} y={d.ballHandler.y} label={d.ballHandler.label} animate />
            <Basketball x={d.ballHandler.x + 12} y={d.ballHandler.y} animate />

            {/* You - defending ball handler */}
            <DefenderAvatar x={d.defenderYou.x} y={d.defenderYou.y} label={d.defenderYou.label} animate glow />
            <DefenderAvatar x={d['teammate guarding'].x} y={d['teammate guarding'].y} label={d['teammate guarding'].label} animate delay={0.2} />

            {/* Screener - animated movement */}
            <motion.g
              animate={screenAnim ? { opacity: 0.4 } : {}}
              transition={{ duration: 0.5 }}
            >
              <TeammateAvatar
                x={screenAnim ? d.screener.x - 30 : d.screener.x}
                y={screenAnim ? d.screener.y + 20 : d.screener.y}
                label={d.screener.label}
                animate
                pulse={!screenAnim}
                delay={0.15}
              />
            </motion.g>

            {/* Screen path arrow */}
            {!screenAnim && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 0.6 }}>
                <path d={`M ${d.screenArrow.from.x} ${d.screenArrow.from.y} Q ${d.screenArrow.from.x - 20} ${(d.screenArrow.from.y + d.screenArrow.to.y) / 2}, ${d.screenArrow.to.x} ${d.screenArrow.to.y}`} fill="none" stroke="#FFE135" strokeWidth="1.5" strokeDasharray="4,3" />
                <polygon points={`${d.screenArrow.to.x + 3},${d.screenArrow.to.y - 4} ${d.screenArrow.to.x},${d.screenArrow.to.y} ${d.screenArrow.to.x + 3},${d.screenArrow.to.y + 4}`} fill="#FFE135" />
                <text x={d.screenArrow.from.x - 25} y={(d.screenArrow.from.y + d.screenArrow.to.y) / 2} fill="#FFE135" fontSize="7">⚠️ screen</text>
              </motion.g>
            )}

            {/* Blind side indicator */}
            <text x={d.defenderYou.x - 30} y={d.defenderYou.y - 15} fill="#EF4444" fontSize="6" fontWeight="bold" opacity="0.7">
              BLIND!
            </text>

            {/* Result overlay */}
            <AnimatePresence>
              {selectedChoice && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {selectedChoice.correct === true ? (
                    <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                      <circle cx={d['teammate guarding'].x + 20} cy={d['teammate guarding'].y - 15} r="12" fill="#2ECC71" filter="url(#successGlow)" />
                      <text x={d['teammate guarding'].x + 20} y={d['teammate guarding'].y - 11} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">✓</text>
                      <text x={d['teammate guarding'].x} y={d['teammate guarding'].y - 25} textAnchor="middle" fill="#2ECC71" fontSize="7" fontWeight="bold">PREPARED!</text>
                    </motion.g>
                  ) : (
                    <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                      <circle cx={d['teammate guarding'].x + 20} cy={d['teammate guarding'].y - 15} r="12" fill="#EF4444" />
                      <text x={d['teammate guarding'].x + 20} y={d['teammate guarding'].y - 11} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">✗</text>
                      <text x={d['teammate guarding'].x - 5} y={d['teammate guarding'].y - 25} textAnchor="middle" fill="#EF4444" fontSize="7" fontWeight="bold">BLINDSIDED!</text>
                      {/* Connected screen arrow */}
                      <path d={`M ${d.screener.x - 30} ${d.screener.y + 20} L ${d['teammate guarding'].x} ${d['teammate guarding'].y}`} stroke="#EF4444" strokeWidth="2" strokeDasharray="4,2" opacity="0.6" />
                    </motion.g>
                  )}
                </motion.g>
              )}
            </AnimatePresence>
          </BasketballCourt>
        </div>
      </motion.div>

      {/* Choice buttons */}
      {phase === 'intro' && (
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 decision-grid" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          {text.choices.map((choice) => (
            <motion.button
              key={choice.id}
              onClick={() => handleChoice(choice)}
              className="w-full text-left bg-dark-card/60 hover:bg-dark-card-hover border border-white/5 hover:border-neon-yellow/40 rounded-2xl p-4 transition-all"
              whileHover={{ scale: 1.01, x: 4 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-start gap-3">
                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm ${
                  choice.correct ? 'bg-success-green/20 text-success-green' : 'bg-basketball-red/20 text-basketball-red'
                }`}>
                  {choice.correct ? '✅' : '❌'}
                </span>
                <p className="font-display font-bold text-sm text-white pt-1">{choice.label}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Coach Bear */}
      {showCoach && selectedChoice && (
        <CoachBear
          show={showCoach}
          type={selectedChoice.correct ? 'correct' : 'wrong'}
          title={getChoiceText(selectedChoice).title}
          feedback={getChoiceText(selectedChoice).feedback}
          tip={getChoiceText(selectedChoice).tip}
          onNext={onComplete ? handleNext : undefined}
          onDismiss={() => setShowCoach(false)}
        />
      )}
    </div>
  );
}
