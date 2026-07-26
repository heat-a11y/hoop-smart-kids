import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BasketballCourt from '../court/BasketballCourt';
import { BallHandlerAvatar, TeammateAvatar, DefenderAvatar } from '../court/Avatars';
import Basketball from '../court/Basketball';
import CoachBear from './CoachBear';
import sfx from '../../services/SFXEngine';
import { useLanguage } from '../../context/LanguageContext';
import { useGame } from '../../context/GameContext';
import scenarios from '../../data/offenseScenarios';

const STAGES = {
  INTRO: 'intro',
  DRIVING: 'driving',
  DECISION: 'decision',
  FEEDBACK: 'feedback',
};

export default function FastbreakGame({ onComplete }) {
  const { lang } = useLanguage();
  const { addXP, soundEnabled } = useGame();
  const scenario = scenarios.fastbreak;
  const text = lang === 'en' ? scenario.en : scenario.zh;
  const d = scenario.diagram;

  const [stage, setStage] = useState(STAGES.INTRO);
  const [defenderY, setDefenderY] = useState(d.defender1.y);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showCoach, setShowCoach] = useState(false);
  const [animating, setAnimating] = useState(false);

  // Animate defender moving toward ball handler
  const startDrive = useCallback(() => {
    setStage(STAGES.DRIVING);
    setAnimating(true);

    const startY = d.defender1.y;
    const endY = d.ballHandler.y - 30;
    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentY = startY + (endY - startY) * progress;
      setDefenderY(currentY);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimating(false);
        setStage(STAGES.DECISION);
      }
    };
    requestAnimationFrame(animate);
  }, [d]);

  const handleChoice = useCallback((choice) => {
    setSelectedChoice(choice);
    setStage(STAGES.FEEDBACK);

    if (choice.correct === true) {
      addXP(100, { drill: true, module: 'offense', correct: true });
      if (soundEnabled) sfx.whistle();
    } else {
      if (soundEnabled) sfx.wrong();
    }

    setTimeout(() => setShowCoach(true), 500);
  }, [addXP, soundEnabled]);

  const handleNext = useCallback(() => {
    setShowCoach(false);
    setSelectedChoice(null);
    setStage(STAGES.INTRO);
    setDefenderY(d.defender1.y);
    onComplete();
  }, [onComplete, d]);

  const getResultType = (choice) => {
    if (choice.correct === true) return 'correct';
    return 'wrong';
  };

  return (
    <div className="px-4 md:px-8 mb-8">
      {/* Header */}
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">⚡</span>
          <span className="text-[10px] font-bold text-neon-blue uppercase tracking-widest">
            {lang === 'en' ? 'Scenario B' : '场景B'}
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

        {/* Court Diagram */}
        <div className="relative">
          <BasketballCourt width={400} height={320}>
            {/* Teammate cutting to basket */}
            <TeammateAvatar x={d.teammate1.x} y={d.teammate1.y} label={d.teammate1.label} animate pulse delay={0.3} />

            {/* Ball Handler */}
            <BallHandlerAvatar x={d.ballHandler.x} y={d.ballHandler.y} label={d.ballHandler.label} animate glow delay={0.1} />
            <Basketball x={d.ballHandler.x + 10} y={d.ballHandler.y - 5} animate delay={0.2} />

            {/* Defender - animated */}
            <DefenderAvatar
              x={d.defender1.x}
              y={defenderY}
              label={d.defender1.label}
              animate
              delay={0.15}
              glow={stage === STAGES.DECISION}
              pulse={stage === STAGES.DECISION}
            />

            {/* Drive path arrow */}
            {stage === STAGES.INTRO && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.6 }}
              >
                <path d={`M ${d.pathArrow.from.x} ${d.pathArrow.from.y} Q ${d.pathArrow.to.x} ${d.pathArrow.to.y + 30}, ${d.pathArrow.to.x} ${d.pathArrow.to.y}`} fill="none" stroke="#FFE135" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.5" />
                <polygon points={`${d.pathArrow.to.x},${d.pathArrow.to.y} ${d.pathArrow.to.x - 4},${d.pathArrow.to.y - 5} ${d.pathArrow.to.x + 4},${d.pathArrow.to.y - 5}`} fill="#FFE135" opacity="0.5" />
                <text x={d.pathArrow.from.x + 20} y={d.pathArrow.from.y - 15} fill="#FFE135" fontSize="7" opacity="0.6">drive</text>
              </motion.g>
            )}

            {/* Result overlay */}
            <AnimatePresence>
              {selectedChoice && (
                <FastbreakResult choice={selectedChoice} diagram={d} />
              )}
            </AnimatePresence>
          </BasketballCourt>
        </div>
      </motion.div>

      {/* Action buttons based on stage */}
      {stage === STAGES.INTRO && (
        <motion.button
          onClick={startDrive}
          className="w-full py-4 bg-gradient-to-r from-neon-blue to-blue-600 rounded-2xl font-display font-bold text-white text-base shadow-xl shadow-neon-blue/20"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          🏃 {lang === 'en' ? 'Drive to the basket!' : '突破篮下！'}
        </motion.button>
      )}

      {stage === STAGES.DRIVING && (
        <motion.div
          className="w-full py-4 bg-gradient-to-r from-neon-blue/30 to-blue-600/30 rounded-2xl flex items-center justify-center gap-2 border border-neon-blue/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.span
            className="inline-block w-3 h-3 bg-neon-blue rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          />
          <span className="font-display font-bold text-sm text-neon-blue">
            {lang === 'en' ? 'Defender closing in...' : '防守者正在逼近...'}
          </span>
        </motion.div>
      )}

      {stage === STAGES.DECISION && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 decision-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.p
            className="text-sm font-display font-bold text-neon-yellow text-center mb-3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
          >
            {lang === 'en' ? '⚡ Defender committed to you! What now?' : '⚡ 防守者扑向你了！现在怎么办？'}
          </motion.p>

          {text.choices.map((choice) => (
            <motion.button
              key={choice.id}
              onClick={() => handleChoice(choice)}
              className="w-full text-left bg-dark-card/60 hover:bg-dark-card-hover border border-white/5 hover:border-neon-blue/40 rounded-2xl p-4 transition-all"
              whileHover={{ scale: 1.01, x: 4 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-start gap-3">
                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm ${
                  choice.correct ? 'bg-success-green/20 text-success-green' : 'bg-basketball-red/20 text-basketball-red'
                }`}>
                  {choice.id}
                </span>
                <p className="font-display font-bold text-sm text-white pt-1">
                  {choice.label}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Coach Bear */}
      {showCoach && selectedChoice && (
        <CoachBear
          show={showCoach}
          type={getResultType(selectedChoice)}
          title={lang === 'en' ? selectedChoice.en.title : selectedChoice.zh.title}
          feedback={lang === 'en' ? selectedChoice.en.feedback : selectedChoice.zh.feedback}
          tip={lang === 'en' ? selectedChoice.en.tip : selectedChoice.zh.tip}
          onNext={onComplete ? handleNext : undefined}
          onDismiss={() => setShowCoach(false)}
        />
      )}
    </div>
  );
}

function FastbreakResult({ choice, diagram }) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {choice.correct === true ? (
        <>
          {/* Pass arrow */}
          <motion.path
            d={`M ${diagram.ballHandler.x} ${diagram.ballHandler.y - 5} Q ${(diagram.ballHandler.x + diagram.teammate1.x) / 2} ${(diagram.ballHandler.y + diagram.teammate1.y) / 2 - 30}, ${diagram.teammate1.x} ${diagram.teammate1.y}`}
            fill="none"
            stroke="#2ECC71"
            strokeWidth="3"
            strokeDasharray="6,3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6 }}
            filter="url(#successGlow)"
          />
          <polygon points={`${diagram.teammate1.x + 5},${diagram.teammate1.y - 2} ${diagram.teammate1.x},${diagram.teammate1.y} ${diagram.teammate1.x + 5},${diagram.teammate1.y + 2}`} fill="#2ECC71" filter="url(#successGlow)" />
          {/* Checkmark */}
          <motion.circle cx={diagram.teammate1.x + 20} cy={diagram.teammate1.y - 15} r="10" fill="#2ECC71" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }} />
          <text x={diagram.teammate1.x + 20} y={diagram.teammate1.y - 11} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">✓</text>
          {/* Layup text */}
          <text x={diagram.teammate1.x + 20} y={diagram.teammate1.y + 20} fill="#2ECC71" fontSize="7" fontWeight="bold" textAnchor="middle">EASY 2!</text>
        </>
      ) : (
        <>
          {/* X mark */}
          <motion.circle cx={diagram.ballHandler.x + 25} cy={diagram.ballHandler.y - 20} r="10" fill="#EF4444" initial={{ scale: 0 }} animate={{ scale: 1 }} />
          <text x={diagram.ballHandler.x + 25} y={diagram.ballHandler.y - 16} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">✗</text>
          {/* Blocked shot line */}
          <line x1={diagram.ballHandler.x} y1={diagram.ballHandler.y - 5} x2={diagram.ballHandler.x} y2={diagram.ballHandler.y - 35} stroke="#EF4444" strokeWidth="2" strokeDasharray="4,2" opacity="0.6" />
          <text x={diagram.ballHandler.x + 10} y={diagram.ballHandler.y - 38} fill="#EF4444" fontSize="7" opacity="0.8">BLOCKED!</text>
        </>
      )}
    </motion.g>
  );
}
