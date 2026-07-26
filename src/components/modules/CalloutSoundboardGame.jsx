import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import CoachBear from './CoachBear';
import TeamSpiritMeter from './TeamSpiritMeter';
import sfx from '../../services/SFXEngine';
import { useLanguage } from '../../context/LanguageContext';
import { useGame } from '../../context/GameContext';
import scenarios from '../../data/communicationScenarios';

export default function CalloutSoundboardGame({ onComplete, onAdvance }) {
  const { lang } = useLanguage();
  const { addXP, soundEnabled } = useGame();
  const scenario = scenarios.calloutBoard;
  const text = lang === 'en' ? scenario.en : scenario.zh;
  const buttons = scenario.en.buttons; // Buttons are language-invariant (id + emoji + color)

  const [currentRound, setCurrentRound] = useState(0);
  const [selectedCall, setSelectedCall] = useState(null);
  const [showCoach, setShowCoach] = useState(false);
  const [completed, setCompleted] = useState(new Set());
  const [phase, setPhase] = useState('playing'); // playing | feedback

  const rounds = text.rounds;
  const round = rounds[currentRound];

  const handleTapCall = useCallback((callId) => {
    if (phase !== 'playing') return;
    setSelectedCall(callId);
    setPhase('feedback');

    const isCorrect = callId === round.correctCall;
    if (isCorrect) {
      addXP(100, { drill: true, module: 'communication', correct: true });
      if (soundEnabled) sfx.whistle();
      setCompleted(prev => new Set([...prev, currentRound]));
    } else {
      if (soundEnabled) sfx.wrong();
    }

    setTimeout(() => setShowCoach(true), 300);
  }, [phase, round, currentRound, addXP]);

  const handleNext = useCallback(() => {
    setShowCoach(false);
    setSelectedCall(null);
    setPhase('playing');

    if (currentRound < rounds.length - 1) {
      setCurrentRound(prev => prev + 1);
    } else {
      onComplete();
    }
  }, [currentRound, rounds.length, onComplete]);

  const getRoundFeedback = () => {
    const r = round;
    if (selectedCall === r.correctCall) {
      const fb = lang === 'en' ? r.en : r.zh;
      return { type: 'correct', title: fb.title, feedback: fb.feedback, tip: fb.tip };
    }
    const correctButton = buttons.find(b => b.id === r.correctCall);
    return {
      type: 'wrong',
      title: lang === 'en' ? 'Not the right call!' : '口令不对！',
      feedback: lang === 'en'
        ? `That's not the call for this situation. For this scenario, you need to shout "${correctButton?.labelEn || r.correctCall}" to trigger the right team response.`
        : '这个场景的口令不对。这种情况下，你需要喊出正确的口令来触发团队反应。',
      tip: lang === 'en' ? 'Match the call to the situation. Ball pressure? = "BALL!" Help needed? = "HELP!" Got the board? = "GOT REBOUND!"' : '把口令和场景匹配。紧逼？="压球" 协防？="协防" 抢到板？="我的篮板"',
    };
  };

  const feedback = (phase === 'feedback' && selectedCall) ? getRoundFeedback() : null;

  return (
    <div className="px-4 md:px-8 mb-8">
      {/* Header */}
      <motion.div className="mb-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">🔊</span>
          <span className="text-[10px] font-bold text-neon-blue uppercase tracking-widest">
            {lang === 'en' ? 'Drill B' : '训练B'}
          </span>
        </div>
        <h2 className="font-display text-xl md:text-2xl font-bold text-white">{text.title}</h2>
        <p className="text-sm text-court-wood-light/70 font-semibold">{text.subtitle}</p>
      </motion.div>

      {/* Main card */}
      <motion.div
        className="bg-dark-card/40 backdrop-blur-sm border border-white/5 rounded-3xl p-5 mb-4"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
      >
        {/* Progress */}
        <div className="flex items-center gap-2 mb-4">
          {rounds.map((r, i) => (
            <div
              key={r.id}
              className={`flex-1 h-1.5 rounded-full transition-all ${
                completed.has(i) ? 'bg-success-green' : i === currentRound ? 'bg-neon-blue' : 'bg-white/10'
              }`}
            />
          ))}
        </div>

        {/* Scenario */}
        <div className="bg-white/5 rounded-2xl px-5 py-6 mb-5 border border-white/5 text-center">
          <p className="text-base text-white/90 leading-relaxed font-medium">
            {round.scene}
          </p>
        </div>

        {/* Soundboard buttons */}
        <div className="grid grid-cols-1 gap-3">
          {buttons.map((btn) => {
            const isSelected = selectedCall === btn.id;
            const isCorrect = round.correctCall === btn.id;
            const showResult = phase === 'feedback';

            return (
              <motion.button
                key={btn.id}
                onClick={() => handleTapCall(btn.id)}
                disabled={showResult}
                className={`relative overflow-hidden text-left rounded-2xl p-4 border-2 transition-all ${
                  showResult && isCorrect
                    ? 'bg-success-green/20 border-success-green shadow-lg shadow-success-green/20'
                    : showResult && isSelected && !isCorrect
                    ? 'bg-basketball-red/20 border-basketball-red'
                    : 'bg-dark-card/60 border-white/5 hover:border-neon-blue/40 hover:bg-dark-card-hover'
                } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
                whileHover={!showResult ? { scale: 1.01, x: 4 } : {}}
                whileTap={!showResult ? { scale: 0.99 } : {}}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${btn.color} flex items-center justify-center text-xl shadow-lg`}>
                    {btn.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="font-display font-bold text-base text-white">
                      {btn.labelEn}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-white/30">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? 'Tap' : '点击'}</span>
                  </div>

                  {/* Result indicator */}
                  {showResult && (
                    <span className="text-xl">
                      {isCorrect ? '✅' : isSelected ? '❌' : ''}
                    </span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Coach Bear */}
      {feedback && (
        <CoachBear
          show={showCoach}
          type={feedback.type}
          title={feedback.title}
          feedback={feedback.feedback}
          tip={feedback.tip}
          onNext={onAdvance || (currentRound < rounds.length - 1 || onComplete ? handleNext : undefined)}
          onDismiss={() => setShowCoach(false)}
        />
      )}
    </div>
  );
}
