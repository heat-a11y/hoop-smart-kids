import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BasketballCourt from '../court/BasketballCourt';
import { BallHandlerAvatar, TeammateAvatar, DefenderAvatar } from '../court/Avatars';
import Basketball from '../court/Basketball';
import CoachBear from './CoachBear';
import sfx from '../../services/SFXEngine';
import { useLanguage } from '../../context/LanguageContext';
import { useGame } from '../../context/GameContext';
import scenarios from '../../data/offenseScenarios';

export default function TripleThreatGame({ onComplete }) {
  const { lang, t } = useLanguage();
  const { addXP, soundEnabled } = useGame();
  const scenario = scenarios.tripleThreat;
  const text = lang === 'en' ? scenario.en : scenario.zh;
  const d = scenario.diagram;

  const [phase, setPhase] = useState('intro'); // intro | playing | feedback
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showCoach, setShowCoach] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleChoice = useCallback((choice) => {
    setSelectedChoice(choice);
    setPhase('feedback');

    if (choice.correct === true) {
      addXP(100, { drill: true, module: 'offense', correct: true });
      if (soundEnabled) sfx.whistle();
    }

    setTimeout(() => {
      setShowResult(true);
      setTimeout(() => setShowCoach(true), 400);
    }, 300);
  }, [addXP, soundEnabled]);

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

  const choiceLabels = ['A', 'B', 'C'];

  return (
    <div className="px-4 md:px-8 mb-8">
      {/* Header */}
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">🏀</span>
          <span className="text-[10px] font-bold text-court-orange uppercase tracking-widest">
            {lang === 'en' ? 'Scenario A' : '场景A'}
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
        {/* Setup Description */}
        <div className="bg-white/5 rounded-2xl px-4 py-3 mb-4 border border-white/5">
          <p className="text-sm text-white/80 leading-relaxed">
            {text.setup}
          </p>
        </div>

        {/* Court Diagram */}
        <div className="relative">
          <BasketballCourt width={400} height={320}>
            {/* Teammates */}
            <TeammateAvatar x={d.teammate1.x} y={d.teammate1.y} label={d.teammate1.label} animate delay={0.2} />
            <TeammateAvatar x={d.teammate2.x} y={d.teammate2.y} label={d.teammate2.label} animate delay={0.3} />
            <TeammateAvatar x={d.teammate3.x} y={d.teammate3.y} label={d.teammate3.label} animate delay={0.4} />

            {/* Defenders */}
            <DefenderAvatar x={d.defender1.x} y={d.defender1.y} label={d.defender1.label} animate delay={0.15} />
            <DefenderAvatar x={d.defender2.x} y={d.defender2.y} label={d.defender2.label} animate delay={0.25} />
            <DefenderAvatar x={d.defender3.x} y={d.defender3.y} label={d.defender3.label} animate delay={0.35} />

            {/* Ball Handler - glowing */}
            <BallHandlerAvatar x={d.ballHandler.x} y={d.ballHandler.y} label={d.ballHandler.label} animate glow pulse delay={0.1} />

            {/* Basketball */}
            <Basketball x={d.ballHandler.x} y={d.ballHandler.y - 16} animate delay={0.5} />

            {/* Sagging off arrow */}
            {d.saggingArrow && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {/* Arrow line */}
                <line
                  x1={d.saggingArrow.from.x}
                  y1={d.saggingArrow.from.y}
                  x2={d.saggingArrow.to.x}
                  y2={d.saggingArrow.to.y}
                  stroke="#FFE135"
                  strokeWidth="2"
                  strokeDasharray="4,3"
                  markerEnd="url(#arrowYellow)"
                />
                {/* Arrowhead */}
                <polygon
                  points={`${d.saggingArrow.to.x},${d.saggingArrow.to.y} ${d.saggingArrow.to.x - 4},${d.saggingArrow.to.y - 4} ${d.saggingArrow.to.x + 4},${d.saggingArrow.to.y - 4}`}
                  fill="#FFE135"
                />
                {/* Label */}
                <text
                  x={d.saggingArrow.from.x + 25}
                  y={(d.saggingArrow.from.y + d.saggingArrow.to.y) / 2 + 4}
                  fill="#FFE135"
                  fontSize="8"
                  fontWeight="bold"
                >
                  {d.saggingArrow.label}
                </text>
              </motion.g>
            )}

            {/* Result overlay - animated path */}
            <AnimatePresence>
              {showResult && selectedChoice && (
                <ResultOverlay choice={selectedChoice} diagram={d} />
              )}
            </AnimatePresence>
          </BasketballCourt>
        </div>
      </motion.div>

      {/* Choice Buttons */}
      {phase === 'intro' && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 decision-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {text.choices.map((choice, i) => {
            const choiceText = lang === 'en' ? choice.en : (choice.zh || choice.en);
            return (
              <motion.button
                key={choice.id}
                onClick={() => handleChoice(choice)}
                className="group relative overflow-hidden text-left bg-dark-card/60 hover:bg-dark-card-hover border border-white/5 hover:border-court-orange/40 rounded-2xl p-4 transition-all"
                whileHover={{ scale: 1.01, x: 4 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-start gap-3">
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm ${
                    i === 0 ? 'bg-success-green/20 text-success-green' :
                    i === 1 ? 'bg-basketball-red/20 text-basketball-red' :
                    'bg-neon-yellow/20 text-neon-yellow'
                  }`}>
                    {choiceLabels[i]}
                  </span>
                  <div>
                    <p className="font-display font-bold text-sm text-white">
                      {choice.label}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      )}

      {/* Results summary */}
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
                  ? (lang === 'en' ? 'Correct! +100 IQ Points' : '正确！+100篮球智商')
                  : selectedChoice.correct === 'suboptimal'
                  ? (lang === 'en' ? 'Sub-optimal Choice' : '可以更好')
                  : (lang === 'en' ? 'Not quite!' : '不太对！')}
              </span>
            </div>

            <button
              onClick={() => setShowCoach(true)}
              className="text-xs text-white/60 hover:text-white transition-colors underline underline-offset-2"
            >
              {lang === 'en' ? 'Tap for Coach Bear explanation →' : '点击听取熊教练解释 →'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coach Bear */}
      {showCoach && selectedChoice && (
        <CoachBear
          show={showCoach}
          type={getResultType(selectedChoice)}
          title={lang === 'en' ? selectedChoice.en.title : (selectedChoice.zh ? selectedChoice.zh.title : selectedChoice.en.title)}
          feedback={lang === 'en' ? selectedChoice.en.feedback : (selectedChoice.zh ? selectedChoice.zh.feedback : selectedChoice.en.feedback)}
          tip={lang === 'en' ? selectedChoice.en.tip : (selectedChoice.zh ? selectedChoice.zh.tip : selectedChoice.en.tip)}
          onNext={onComplete ? handleNext : undefined}
          onDismiss={() => setShowCoach(false)}
        />
      )}
    </div>
  );
}

function ResultOverlay({ choice, diagram }) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Green check or red X near the ball handler */}
      {choice.correct === true ? (
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
        >
          <circle cx={diagram.ballHandler.x + 30} cy={diagram.ballHandler.y - 20} r="12" fill="#2ECC71" filter="url(#successGlow)" />
          <text x={diagram.ballHandler.x + 30} y={diagram.ballHandler.y - 16} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">✓</text>
          {/* Shot path */}
          <line x1={diagram.ballHandler.x} y1={diagram.ballHandler.y - 16} x2={diagram.ballHandler.x + 15} y2={diagram.ballHandler.y - 60} stroke="#2ECC71" strokeWidth="2" strokeDasharray="4,2" opacity="0.6" />
        </motion.g>
      ) : choice.correct === 'suboptimal' ? (
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
        >
          <circle cx={diagram.ballHandler.x - 30} cy={diagram.ballHandler.y - 10} r="12" fill="#FFE135" />
          <text x={diagram.ballHandler.x - 30} y={diagram.ballHandler.y - 6} textAnchor="middle" fill="#1A1A2E" fontSize="14" fontWeight="bold">!</text>
          {/* Back pass arrow */}
          <path d={`M ${diagram.ballHandler.x} ${diagram.ballHandler.y} Q ${diagram.ballHandler.x - 40} ${diagram.ballHandler.y + 20}, ${diagram.ballHandler.x - 60} ${diagram.ballHandler.y}`} fill="none" stroke="#FFE135" strokeWidth="2" strokeDasharray="4,2" opacity="0.6" />
          <polygon points={`${diagram.ballHandler.x - 60},${diagram.ballHandler.y} ${diagram.ballHandler.x - 55},${diagram.ballHandler.y - 5} ${diagram.ballHandler.x - 55},${diagram.ballHandler.y + 5}`} fill="#FFE135" opacity="0.6" />
        </motion.g>
      ) : (
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
        >
          <circle cx={diagram.ballHandler.x + 20} cy={diagram.ballHandler.y + 25} r="12" fill="#EF4444" filter="url(#successGlow)" />
          <text x={diagram.ballHandler.x + 20} y={diagram.ballHandler.y + 29} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">✗</text>
          {/* Drive into traffic */}
          <path d={`M ${diagram.ballHandler.x} ${diagram.ballHandler.y + 5} Q ${diagram.ballHandler.x + 15} ${diagram.ballHandler.y + 20}, ${diagram.ballHandler.x + 5} ${diagram.ballHandler.y + 35}`} fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="4,2" opacity="0.6" />
          <text x={diagram.ballHandler.x + 30} y={diagram.ballHandler.y + 40} fill="#EF4444" fontSize="7" opacity="0.8">TO!</text>
        </motion.g>
      )}
    </motion.g>
  );
}
