import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import CoachBear from './CoachBear';
import TeamSpiritMeter from './TeamSpiritMeter';
import sfx from '../../services/SFXEngine';
import { useLanguage } from '../../context/LanguageContext';
import { useGame } from '../../context/GameContext';
import scenarios from '../../data/communicationScenarios';

export default function EncouragementGame({ onComplete, onAdvance }) {
  const { lang } = useLanguage();
  const { addXP, soundEnabled } = useGame();
  const scenario = scenarios.encouragement;
  const text = lang === 'en' ? scenario.en : scenario.zh;
  const spiritEvents = scenario.teamSpiritEvents;

  const [phase, setPhase] = useState('intro');
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showCoach, setShowCoach] = useState(false);
  const [spirit, setSpirit] = useState(50);
  const [spiritMessage, setSpiritMessage] = useState('');
  const [showSpiritChange, setShowSpiritChange] = useState(false);

  const handleChoice = useCallback((choice) => {
    setSelectedChoice(choice);
    setPhase('feedback');

    if (choice.correct === true) {
      addXP(100, { drill: true, module: 'communication', correct: true });
      if (soundEnabled) sfx.whistle();
    } else {
      if (soundEnabled) sfx.wrong();
    }

    // Update team spirit
    const eventKey = choice.id === 'encourage' ? 'encourage' : choice.id === 'blame' ? 'blame' : 'silent';
    const event = spiritEvents[eventKey];
    if (event) {
      setSpirit(prev => Math.min(100, Math.max(0, prev + event.gain)));
      setSpiritMessage(lang === 'en' ? event.message : (event.messageZh || event.message));
      setShowSpiritChange(true);
      setTimeout(() => setShowSpiritChange(false), 2000);
    }

    setTimeout(() => setShowCoach(true), 500);
  }, [addXP, spiritEvents, lang]);

  const handleNext = useCallback(() => {
    setShowCoach(false);
    setSelectedChoice(null);
    setPhase('intro');
    setSpirit(50);
    setSpiritMessage('');
    setShowSpiritChange(false);
    onComplete();
  }, [onComplete]);

  const getChoiceText = (choice) => lang === 'en' ? choice.en : (choice.zh || choice.en);

  return (
    <div className="px-4 md:px-8 mb-8">
      {/* Header */}
      <motion.div className="mb-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">💪</span>
          <span className="text-[10px] font-bold text-success-green uppercase tracking-widest">
            {lang === 'en' ? 'Drill C' : '训练C'}
          </span>
        </div>
        <h2 className="font-display text-xl md:text-2xl font-bold text-white">{text.title}</h2>
        <p className="text-sm text-court-wood-light/70 font-semibold">{text.subtitle}</p>
      </motion.div>

      {/* Team Spirit Meter */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mb-4"
      >
        <TeamSpiritMeter value={spirit} />
      </motion.div>

      {/* Spirit change animation */}
      <AnimatePresence>
        {showSpiritChange && (
          <motion.div
            className={`text-center py-2 mb-3 rounded-2xl font-display font-bold text-sm ${
              spirit >= 50 ? 'bg-success-green/10 text-success-green border border-success-green/20' : 'bg-basketball-red/10 text-basketball-red border border-basketball-red/20'
            }`}
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {spiritMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game card */}
      <motion.div
        className="bg-dark-card/40 backdrop-blur-sm border border-white/5 rounded-3xl p-5 mb-4"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
      >
        {/* Setup */}
        <div className="bg-white/5 rounded-2xl px-5 py-4 mb-4 border border-white/5">
          <p className="text-sm text-white/80 leading-relaxed">{text.setup}</p>
        </div>

        {/* Scene visual - mood indicator */}
        <div className="flex items-center justify-center mb-5">
          <motion.div
            className="relative"
            animate={phase === 'intro' ? { y: [0, -5, 0] } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="text-7xl mb-2 text-center">😞</div>
            <p className="text-center text-xs text-white/50 font-medium">
              {text.initialReaction}
            </p>
            {/* Teammate bubble */}
            <motion.div
              className="absolute -top-3 -right-3 text-sm bg-dark-card rounded-full w-8 h-8 flex items-center justify-center border border-white/10"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              💔
            </motion.div>
          </motion.div>
        </div>

        {/* Choices */}
        {phase === 'intro' && (
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 decision-grid" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            {text.choices.map((choice) => (
              <motion.button
                key={choice.id}
                onClick={() => handleChoice(choice)}
                className={`w-full text-left rounded-2xl p-4 border-2 transition-all ${
                  choice.correct
                    ? 'bg-dark-card/60 border-white/5 hover:border-success-green/40 hover:bg-dark-card-hover'
                    : 'bg-dark-card/60 border-white/5 hover:border-basketball-red/30 hover:bg-dark-card-hover'
                }`}
                whileHover={{ scale: 1.01, x: 4 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-start gap-3">
                  <span className={`flex-shrink-0 mt-0.5 ${
                    choice.correct ? 'text-success-green' : 'text-basketball-red/60'
                  }`}>
                    {choice.correct ? '💪' : '😤'}
                  </span>
                  <p className="font-display font-bold text-sm text-white leading-relaxed">
                    {choice.label}
                  </p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Result card */}
      <AnimatePresence>
        {phase === 'feedback' && selectedChoice && !showCoach && (
          <motion.div
            className={`rounded-2xl p-4 border ${
              selectedChoice.correct
                ? 'bg-success-green/10 border-success-green/30'
                : 'bg-basketball-red/10 border-basketball-red/30'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-center text-xs text-white/60">
              {lang === 'en' ? 'Tap to hear Coach Bear →' : '点击听取熊教练建议 →'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coach Bear */}
      {showCoach && selectedChoice && (
        <CoachBear
          show={showCoach}
          type={selectedChoice.correct ? 'correct' : 'wrong'}
          title={getChoiceText(selectedChoice).title}
          feedback={getChoiceText(selectedChoice).feedback}
          tip={getChoiceText(selectedChoice).tip}
          onNext={onAdvance || (onComplete ? handleNext : undefined)}
          onDismiss={() => setShowCoach(false)}
        />
      )}
    </div>
  );
}
