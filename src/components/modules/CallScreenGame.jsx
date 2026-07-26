import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveCourt from '../court/InteractiveCourt';
import { BallHandlerAvatar, TeammateAvatar, DefenderAvatar } from '../court/Avatars';
import Basketball from '../court/Basketball';
import CoachBear from './CoachBear';
import TeamSpiritMeter from './TeamSpiritMeter';
import sfx from '../../services/SFXEngine';
import { useLanguage } from '../../context/LanguageContext';
import { useGame } from '../../context/GameContext';
import scenarios from '../../data/communicationScenarios';

const SPIRIT_GAIN = 25;
const SPIRIT_LOSS = 15;

export default function CallScreenGame({ onComplete, onAdvance }) {
  const { lang } = useLanguage();
  const { addXP, soundEnabled } = useGame();
  const scenario = scenarios.callScreen;
  const text = lang === 'en' ? scenario.en : scenario.zh;
  const d = scenario.diagram;

  const [selectedChoice, setSelectedChoice] = useState(null);
  const [phase, setPhase] = useState('intro');
  const [showCoach, setShowCoach] = useState(false);
  const [teamSpirit, setTeamSpirit] = useState(50);
  const [screenAnim, setScreenAnim] = useState(false);
  const [showScreenerPath, setShowScreenerPath] = useState(true);

  const handleChoice = useCallback((choice) => {
    setSelectedChoice(choice);
    setPhase('feedback');
    setScreenAnim(true);
    setShowScreenerPath(false);

    if (choice.correct === true) {
      addXP(100, { drill: true, module: 'communication', correct: true });
      setTeamSpirit(prev => Math.min(prev + SPIRIT_GAIN, 100));
      if (soundEnabled) sfx.whistle();
    } else {
      setTeamSpirit(prev => Math.max(prev - SPIRIT_LOSS, 0));
      if (soundEnabled) sfx.wrong();
    }

    setTimeout(() => setShowCoach(true), 500);
  }, [addXP, soundEnabled]);

  const handleNext = useCallback(() => {
    setShowCoach(false);
    setSelectedChoice(null);
    setPhase('intro');
    setScreenAnim(false);
    setShowScreenerPath(true);
    onComplete();
  }, [onComplete]);

  const getChoiceText = (choice) => lang === 'en' ? choice.en : (choice.zh || choice.en);

  const choices = text.choices || [];

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

      {/* Team Morale Bar */}
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
      >
        <TeamSpiritMeter value={teamSpirit} maxValue={100} showLabel={true} />
      </motion.div>

      {/* Court */}
      <motion.div
        className="bg-dark-card/40 backdrop-blur-sm border border-white/5 rounded-3xl p-4 mb-4"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
      >
        <div className="bg-white/5 rounded-2xl px-4 py-3 mb-4 border border-white/5">
          <p className="text-sm text-white/80 leading-relaxed">{text.setup}</p>
        </div>

        <div className="relative">
          <InteractiveCourt simple width={400} half="bottom">
            {/* Ball Handler */}
            <BallHandlerAvatar x={d.ballHandler.x} y={d.ballHandler.y} label={d.ballHandler.label} animate />
            <Basketball x={d.ballHandler.x + 12} y={d.ballHandler.y} animate />

            {/* You - defending ball handler */}
            <DefenderAvatar x={d.defenderYou.x} y={d.defenderYou.y} label={d.defenderYou.label} animate glow />
            <DefenderAvatar x={d['teammate guarding'].x} y={d['teammate guarding'].y} label={d['teammate guarding'].label} animate delay={0.2} />

            {/* Screener - animated movement */}
            <motion.g animate={screenAnim ? { opacity: 0.4 } : {}} transition={{ duration: 0.5 }}>
              <TeammateAvatar
                x={screenAnim ? d.screener.x - 30 : d.screener.x}
                y={screenAnim ? d.screener.y + 20 : d.screener.y}
                label={d.screener.label}
                animate pulse={!screenAnim} delay={0.15}
              />
            </motion.g>

            {/* Screen path arrow */}
            {showScreenerPath && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 0.6 }}>
                <path d={`M ${d.screenArrow.from.x} ${d.screenArrow.from.y} Q ${d.screenArrow.from.x - 20} ${(d.screenArrow.from.y + d.screenArrow.to.y) / 2}, ${d.screenArrow.to.x} ${d.screenArrow.to.y}`} fill="none" stroke="#FFE135" strokeWidth="1.5" strokeDasharray="4,3" />
                <polygon points={`${d.screenArrow.to.x + 3},${d.screenArrow.to.y - 4} ${d.screenArrow.to.x},${d.screenArrow.to.y} ${d.screenArrow.to.x + 3},${d.screenArrow.to.y + 4}`} fill="#FFE135" />
                <text x={d.screenArrow.from.x - 25} y={(d.screenArrow.from.y + d.screenArrow.to.y) / 2} fill="#FFE135" fontSize="7">⚠️ screen</text>
              </motion.g>
            )}

            {/* Blind side indicator */}
            <text x={d.defenderYou.x - 30} y={d.defenderYou.y - 15} fill="#EF4444" fontSize="6" fontWeight="bold" opacity="0.7">BLIND!</text>

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
                      <path d={`M ${d.screener.x - 30} ${d.screener.y + 20} L ${d['teammate guarding'].x} ${d['teammate guarding'].y}`} stroke="#EF4444" strokeWidth="2" strokeDasharray="4,2" opacity="0.6" />
                    </motion.g>
                  )}
                </motion.g>
              )}
            </AnimatePresence>
          </InteractiveCourt>
        </div>
      </motion.div>

      {/* Giant Callout Buttons */}
      {phase === 'intro' && (
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        >
          {choices.map((choice, i) => {
            const isCorrect = choice.correct === true;
            return (
              <motion.button
                key={choice.id}
                onClick={() => handleChoice(choice)}
                className={`relative w-full py-5 px-6 rounded-2xl font-display font-bold text-lg text-white border-2 transition-all shadow-xl ${
                  isCorrect
                    ? 'bg-gradient-to-r from-success-green to-emerald-600 border-success-green/50 shadow-success-green/20'
                    : i === 1
                    ? 'bg-gradient-to-r from-basketball-red to-red-700 border-basketball-red/50 shadow-basketball-red/20'
                    : 'bg-gradient-to-r from-court-orange to-basketball-red border-court-orange/50 shadow-court-orange/20'
                }`}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Emoji icon */}
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">
                  {choice.label?.startsWith('📢') ? '📢' : choice.label?.startsWith('🤐') ? '🤐' : '🔊'}
                </span>
                {/* Label */}
                <span className="block text-center text-xl tracking-wide">
                  {choice.label}
                </span>
                {/* Hint */}
                <span className={`block text-center text-xs mt-1 ${isCorrect ? 'text-white/60' : 'text-white/40'}`}>
                  {isCorrect ? '✅ ' + (lang === 'en' ? 'Correct call!' : '正确口令！') : '❌ ' + (lang === 'en' ? 'Wrong call...' : '错误口令...')}
                </span>
                {/* Animated shine */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12" />
              </motion.button>
            );
          })}
        </motion.div>
      )}

      {/* Spirit Change Feedback */}
      <AnimatePresence>
        {phase === 'feedback' && selectedChoice && (
          <motion.div
            className={`mt-3 text-center font-display font-bold text-sm ${
              selectedChoice.correct ? 'text-success-green' : 'text-basketball-red'
            }`}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          >
            {selectedChoice.correct
              ? (lang === 'en' ? `🔥 Team Spirit +${SPIRIT_GAIN}!` : `🔥 团队士气 +${SPIRIT_GAIN}！`)
              : (lang === 'en' ? `💔 Team Spirit -${SPIRIT_LOSS}...` : `💔 团队士气 -${SPIRIT_LOSS}...`)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coach Bear — always rendered so exit animation plays */}
      <CoachBear
        show={showCoach}
        type={selectedChoice?.correct ? 'correct' : 'wrong'}
        title={selectedChoice ? getChoiceText(selectedChoice).title : ''}
        feedback={selectedChoice ? getChoiceText(selectedChoice).feedback : ''}
        tip={selectedChoice ? getChoiceText(selectedChoice).tip : ''}
        onNext={onAdvance || (onComplete ? handleNext : undefined)}
        onDismiss={() => setShowCoach(false)}
      />
    </div>
  );
}
