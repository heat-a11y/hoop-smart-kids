import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveCourt from '../court/InteractiveCourt';
import { BallHandlerAvatar, TeammateAvatar, DefenderAvatar } from '../court/Avatars';
import Basketball from '../court/Basketball';
import CoachBear from './CoachBear';
import sfx from '../../services/SFXEngine';
import { useLanguage } from '../../context/LanguageContext';
import { useGame } from '../../context/GameContext';

/**
 * Generic multiple-choice scenario game.
 * Renders any scenario data that has: title, subtitle, setup, choices[], and optional diagram{}.
 */
export default function MultipleChoiceGame({ scenario, moduleKey, onComplete, onAdvance, half: courtHalfProp }) {
  const { lang, t } = useLanguage();
  const { addXP, soundEnabled } = useGame();
  const text = lang === 'en' ? scenario.en : scenario.zh;
  const d = scenario.diagram;

  // Determine court half: explicit half prop wins, else derive from moduleKey
  // Offense (front court) = top half, Defense (back court) = bottom half
  const courtHalf = courtHalfProp || (moduleKey === 'offense' ? 'top' : 'bottom');

  const [phase, setPhase] = useState('intro');
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showCoach, setShowCoach] = useState(false);

  const handleChoice = useCallback((choice) => {
    setSelectedChoice(choice);
    setPhase('feedback');

    if (choice.correct === true) {
      addXP(100, { drill: true, module: moduleKey, correct: true });
      if (soundEnabled) sfx.whistle();
    } else {
      if (soundEnabled) sfx.wrong();
    }

    setTimeout(() => {
      setShowResult(true);
      setTimeout(() => setShowCoach(true), 400);
    }, 300);
  }, [addXP, moduleKey, soundEnabled]);

  const handleNext = useCallback(() => {
    setShowCoach(false);
    setShowResult(false);
    setSelectedChoice(null);
    setPhase('intro');
    onComplete();
  }, [onComplete]);

  const getResultType = (choice) => {
    if (choice.correct === true) return 'correct';
    if (choice.correct === 'suboptimal') return 'suboptimal';
    return 'wrong';
  };

  const choiceLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="px-4 md:px-8 mb-8">
      {/* Header */}
      <motion.div className="mb-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-display text-xl md:text-2xl font-bold text-white">{text.title}</h2>
        <p className="text-sm text-court-wood-light/70 font-semibold">{text.subtitle}</p>
      </motion.div>

      {/* Court Diagram (if present) + Setup */}
      <motion.div
        className="bg-dark-card/40 backdrop-blur-sm border border-white/5 rounded-3xl p-4 mb-4"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
      >
        <div className="bg-white/5 rounded-2xl px-4 py-3 mb-4 border border-white/5">
          <p className="text-sm text-white/80 leading-relaxed">{text.setup}</p>
        </div>

        {d && (
          <div className="relative">
            <InteractiveCourt simple width={400} half={courtHalf}>
              {/* Render diagram players */}
              {d.ballHandler && <BallHandlerAvatar x={d.ballHandler.x} y={d.ballHandler.y} label={d.ballHandler.label} animate glow pulse delay={0.1} />}
              {d.teammate1 && <TeammateAvatar x={d.teammate1.x} y={d.teammate1.y} label={d.teammate1.label} animate delay={0.2} />}
              {d.teammate2 && <TeammateAvatar x={d.teammate2.x} y={d.teammate2.y} label={d.teammate2.label} animate delay={0.25} />}
              {d.teammate3 && <TeammateAvatar x={d.teammate3.x} y={d.teammate3.y} label={d.teammate3.label} animate delay={0.3} />}
              {d.defender1 && <DefenderAvatar x={d.defender1.x} y={d.defender1.y} label={d.defender1.label} animate delay={0.15} />}
              {d.defender2 && <DefenderAvatar x={d.defender2.x} y={d.defender2.y} label={d.defender2.label} animate delay={0.25} />}
              {d.defender3 && <DefenderAvatar x={d.defender3.x} y={d.defender3.y} label={d.defender3.label} animate delay={0.35} />}
              {d.defender4 && <DefenderAvatar x={d.defender4.x} y={d.defender4.y} label={d.defender4.label} animate delay={0.2} />}
              {d.teammate4 && <TeammateAvatar x={d.teammate4.x} y={d.teammate4.y} label={d.teammate4.label} animate delay={0.3} />}
              {d.ballHandler && <Basketball x={d.ballHandler.x} y={d.ballHandler.y - 16} animate delay={0.5} />}
            </InteractiveCourt>
          </div>
        )}
      </motion.div>

      {/* Choice Buttons */}
      {phase === 'intro' && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 decision-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {text.choices.map((choice, i) => (
            <motion.button
              key={choice.id}
              onClick={() => handleChoice(choice)}
              className="group relative overflow-hidden text-left bg-dark-card/60 hover:bg-dark-card-hover border border-white/5 hover:border-court-orange/40 rounded-2xl p-4 transition-all min-h-[52px]"
              whileHover={{ scale: 1.01, x: 4 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-start gap-3">
                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm ${
                  i === 0 ? 'bg-success-green/20 text-success-green' :
                  i === 1 ? 'bg-basketball-red/20 text-basketball-red' :
                  i === 2 ? 'bg-neon-yellow/20 text-neon-yellow' :
                  'bg-neon-blue/20 text-neon-blue'
                }`}>
                  {choiceLabels[i] || i + 1}
                </span>
                <div>
                  <p className="font-display font-bold text-sm text-white">{choice.label}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Feedback result */}
      <AnimatePresence>
        {phase === 'feedback' && selectedChoice && (
          <motion.div
            className={`mt-4 rounded-2xl p-4 border ${
              selectedChoice.correct === true
                ? 'bg-success-green/10 border-success-green/30'
                : selectedChoice.correct === 'suboptimal'
                ? 'bg-neon-yellow/10 border-neon-yellow/30'
                : 'bg-basketball-red/10 border-basketball-red/30'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">
                {selectedChoice.correct === true ? '✅' : selectedChoice.correct === 'suboptimal' ? '⚡' : '❌'}
              </span>
              <span className={`font-display font-bold text-sm ${
                selectedChoice.correct === true ? 'text-success-green' :
                selectedChoice.correct === 'suboptimal' ? 'text-neon-yellow' : 'text-basketball-red'
              }`}>
                {selectedChoice.correct === true
                  ? (lang === 'en' ? 'Correct! +100 IQ' : '正确！+100')
                  : selectedChoice.correct === 'suboptimal'
                  ? (lang === 'en' ? 'Could be better' : '可以更好')
                  : (lang === 'en' ? 'Not quite!' : '不太对！')}
              </span>
            </div>
            <button
              onClick={() => setShowCoach(true)}
              className="text-xs text-white/60 hover:text-white transition-colors underline underline-offset-2"
            >
              {lang === 'en' ? 'Tap for Coach Bear →' : '点击听取熊教练 →'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coach Bear — always rendered so exit animation plays */}
      <CoachBear
        show={showCoach}
        type={selectedChoice ? getResultType(selectedChoice) : 'correct'}
        title={selectedChoice ? (lang === 'en' ? selectedChoice.en?.title : selectedChoice.zh?.title) || (lang === 'en' ? 'Great try!' : '不错的尝试！') : ''}
        feedback={selectedChoice ? (lang === 'en' ? selectedChoice.en?.feedback : selectedChoice.zh?.feedback) || (lang === 'en' ? 'Keep learning!' : '继续学习！') : ''}
        tip={selectedChoice ? (lang === 'en' ? selectedChoice.en?.tip : selectedChoice.zh?.tip) || (lang === 'en' ? 'Practice makes perfect!' : '熟能生巧！') : ''}
        onNext={onAdvance || (onComplete ? handleNext : undefined)}
        onDismiss={() => setShowCoach(false)}
      />
    </div>
  );
}
