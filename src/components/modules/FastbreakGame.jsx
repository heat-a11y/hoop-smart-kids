import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveCourt from '../court/InteractiveCourt';
import { BallHandlerAvatar, TeammateAvatar, DefenderAvatar } from '../court/Avatars';
import Basketball from '../court/Basketball';
import CoachBear from './CoachBear';
import sfx from '../../services/SFXEngine';
import { useLanguage } from '../../context/LanguageContext';
import { useGame } from '../../context/GameContext';
import scenarios from '../../data/offenseScenarios';

const COUNTDOWN_SEC = 3;

export default function FastbreakGame({ onComplete, onAdvance }) {
  const { lang } = useLanguage();
  const { addXP, soundEnabled } = useGame();
  const scenario = scenarios.fastbreak;
  const text = lang === 'en' ? scenario.en : scenario.zh;
  const d = scenario.diagram;

  const [phase, setPhase] = useState('intro'); // intro | driving | decision | feedback
  const [defenderY, setDefenderY] = useState(d.defender1.y);
  const [countdown, setCountdown] = useState(COUNTDOWN_SEC);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showCoach, setShowCoach] = useState(false);
  const [teammateGlow, setTeammateGlow] = useState(false);

  // Animate defender moving toward ball handler
  const startDrive = useCallback(() => {
    setPhase('driving');
    setCountdown(COUNTDOWN_SEC);

    const startY = d.defender1.y;
    const endY = d.ballHandler.y - 30;
    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setDefenderY(startY + (endY - startY) * progress);
      if (progress < 1) requestAnimationFrame(animate);
      else {
        setPhase('decision');
        setTeammateGlow(true);
      }
    };
    requestAnimationFrame(animate);
  }, [d]);

  // Countdown timer during decision phase — ref-based to avoid interval reset
  const countdownRef = useRef(countdown);
  useEffect(() => { countdownRef.current = countdown; }, [countdown]);
  const phaseRef = useRef(phase);
  useEffect(() => { phaseRef.current = phase; }, [phase]);

  useEffect(() => {
    if (phase !== 'decision') return;
    const endTime = Date.now() + countdown * 1000;

    const timer = setInterval(() => {
      const remaining = Math.ceil((endTime - Date.now()) / 1000);
      if (remaining <= 0) {
        clearInterval(timer);
        // Auto-fail — ran out of time
        const timeoutChoice = {
          id: 'timeout',
          label: '⏰ Time expired!',
          correct: 'suboptimal',
          en: { title: 'Too slow!', feedback: "You hesitated! In a fastbreak, hesitation lets the defense recover. Make the read and pass quickly!", tip: 'In 2-on-1, decide fast. The defender commits? Pass immediately.' },
          zh: { title: '太慢了！', feedback: '你犹豫了！快攻中犹豫会让防守恢复。快速阅读并传出球！', tip: '2对1快攻中要快速决定。防守扑向你？立即传球。' },
        };
        setSelectedChoice(timeoutChoice);
        setPhase('feedback');
        setTimeout(() => setShowCoach(true), 500);
      } else if (remaining !== countdownRef.current) {
        setCountdown(remaining);
      }
    }, 250);

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, lang]);

  // Tap teammate to pass (correct action)
  const handleTapTeammate = useCallback(() => {
    if (phase !== 'decision') return;
    const correctChoice = text.choices.find(c => c.correct === true);
    if (correctChoice) {
      setSelectedChoice(correctChoice);
      setPhase('feedback');
      addXP(100, { drill: true, module: 'offense', correct: true });
      if (soundEnabled) sfx.whistle();
      setTimeout(() => setShowCoach(true), 500);
    }
  }, [phase, text, addXP, soundEnabled]);

  // Wrong choice buttons (drive or pull up)
  const handleWrongChoice = useCallback((choiceId) => {
    if (phase !== 'decision') return;
    const wrongChoice = text.choices.find(c => c.id === choiceId && c.correct !== true);
    if (!wrongChoice) return;
    setSelectedChoice(wrongChoice);
    setPhase('feedback');
    if (soundEnabled) sfx.wrong();
    setTimeout(() => setShowCoach(true), 500);
  }, [phase, text, soundEnabled]);

  const handleNext = useCallback(() => {
    setShowCoach(false);
    setSelectedChoice(null);
    setPhase('intro');
    setDefenderY(d.defender1.y);
    setCountdown(COUNTDOWN_SEC);
    setTeammateGlow(false);
    onComplete();
  }, [onComplete, d]);

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
          <span className="text-lg">⚡</span>
          <span className="text-[10px] font-bold text-neon-blue uppercase tracking-widest">
            {lang === 'en' ? 'Scenario B' : '场景B'}
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

        {/* Court Diagram */}
        <div className="relative">
          <InteractiveCourt simple width={400} half="bottom">
            {/* Teammate cutting to basket - tappable when glowing */}
            <g
              onClick={phase === 'decision' ? handleTapTeammate : undefined}
              className={phase === 'decision' ? 'cursor-pointer' : ''}
              style={{ pointerEvents: phase === 'decision' ? 'auto' : 'none' }}
            >
              <TeammateAvatar x={d.teammate1.x} y={d.teammate1.y} label={d.teammate1.label} animate pulse={teammateGlow} delay={0.3} />
              {/* Teammate glow ring when ready */}
              {teammateGlow && (
                <circle cx={d.teammate1.x} cy={d.teammate1.y} r="28" fill="none" stroke="#2ECC71" strokeWidth="3" opacity="0.4" className="animate-ping" />
              )}
            </g>

            {/* Ball Handler */}
            <BallHandlerAvatar x={d.ballHandler.x} y={d.ballHandler.y} label={d.ballHandler.label} animate glow delay={0.1} />
            <Basketball x={d.ballHandler.x + 10} y={d.ballHandler.y - 5} animate delay={0.2} />

            {/* Defender - animated */}
            <DefenderAvatar x={d.defender1.x} y={defenderY} label={d.defender1.label} animate delay={0.15} glow={phase === 'decision'} pulse={phase === 'decision'} />

            {/* Drive path arrow */}
            {phase === 'intro' && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 0.6 }}>
                <path d={`M ${d.pathArrow.from.x} ${d.pathArrow.from.y} Q ${d.pathArrow.to.x} ${d.pathArrow.to.y + 30}, ${d.pathArrow.to.x} ${d.pathArrow.to.y}`} fill="none" stroke="#FFE135" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.5" />
                <polygon points={`${d.pathArrow.to.x},${d.pathArrow.to.y} ${d.pathArrow.to.x - 4},${d.pathArrow.to.y - 5} ${d.pathArrow.to.x + 4},${d.pathArrow.to.y - 5}`} fill="#FFE135" opacity="0.5" />
                <text x={d.pathArrow.from.x + 20} y={d.pathArrow.from.y - 15} fill="#FFE135" fontSize="7" opacity="0.6">drive</text>
              </motion.g>
            )}

            {/* Pass trajectory on correct answer */}
            <AnimatePresence>
              {selectedChoice?.correct === true && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <motion.path
                    d={`M ${d.ballHandler.x} ${d.ballHandler.y - 5} Q ${(d.ballHandler.x + d.teammate1.x) / 2} ${(d.ballHandler.y + d.teammate1.y) / 2 - 30}, ${d.teammate1.x} ${d.teammate1.y}`}
                    fill="none" stroke="#2ECC71" strokeWidth="3" strokeDasharray="6,3"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6 }} filter="url(#successGlow)"
                  />
                  <polygon points={`${d.teammate1.x + 5},${d.teammate1.y - 2} ${d.teammate1.x},${d.teammate1.y} ${d.teammate1.x + 5},${d.teammate1.y + 2}`} fill="#2ECC71" filter="url(#successGlow)" />
                  <motion.circle cx={d.teammate1.x + 20} cy={d.teammate1.y - 15} r="10" fill="#2ECC71" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }} />
                  <text x={d.teammate1.x + 20} y={d.teammate1.y - 11} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">✓</text>
                  <text x={d.teammate1.x + 20} y={d.teammate1.y + 20} fill="#2ECC71" fontSize="7" fontWeight="bold" textAnchor="middle">EASY 2!</text>
                </motion.g>
              )}
            </AnimatePresence>
          </InteractiveCourt>
        </div>
      </motion.div>

      {/* Countdown Timer */}
      {phase === 'decision' && (
        <motion.div
          className="flex items-center justify-center gap-3 mb-4"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
        >
          <motion.div
            key={countdown}
            className={`w-14 h-14 rounded-full flex items-center justify-center font-display font-bold text-2xl ${
              countdown <= 1 ? 'bg-basketball-red/20 text-basketball-red border-basketball-red/40' :
              countdown <= 2 ? 'bg-neon-yellow/20 text-neon-yellow border-neon-yellow/40' :
              'bg-success-green/20 text-success-green border-success-green/40'
            } border-2`}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring' }}
          >
            {countdown}
          </motion.div>
          <span className="font-display font-bold text-sm text-white/70">
            {lang === 'en' ? 'Pass to teammate!' : '传给队友！'}
          </span>
        </motion.div>
      )}

      {/* Action buttons based on stage */}
      {phase === 'intro' && (
        <motion.button
          onClick={startDrive}
          className="w-full py-4 bg-gradient-to-r from-neon-blue to-blue-600 rounded-2xl font-display font-bold text-white text-base shadow-xl shadow-neon-blue/20"
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        >
          🏃 {lang === 'en' ? 'Drive to the basket!' : '突破篮下！'}
        </motion.button>
      )}

      {phase === 'driving' && (
        <motion.div className="w-full py-4 bg-gradient-to-r from-neon-blue/30 to-blue-600/30 rounded-2xl flex items-center justify-center gap-2 border border-neon-blue/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.span className="inline-block w-3 h-3 bg-neon-blue rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} />
          <span className="font-display font-bold text-sm text-neon-blue">{lang === 'en' ? 'Defender closing in...' : '防守者正在逼近...'}</span>
        </motion.div>
      )}

      {/* Wrong decision fallback buttons */}
      {phase === 'decision' && (
        <motion.div className="grid grid-cols-2 gap-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <motion.button
            onClick={() => handleWrongChoice('B')}
            className="py-3 bg-basketball-red/20 border border-basketball-red/30 rounded-xl font-display font-bold text-sm text-basketball-red hover:bg-basketball-red/30 transition-all"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          >
            💪 {lang === 'en' ? 'Force the shot' : '强行投篮'}
          </motion.button>
          <motion.button
            onClick={() => handleWrongChoice('C')}
            className="py-3 bg-neon-yellow/20 border border-neon-yellow/30 rounded-xl font-display font-bold text-sm text-neon-yellow hover:bg-neon-yellow/30 transition-all"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          >
            🏃 {lang === 'en' ? 'Pull up mid-range' : '急停中投'}
          </motion.button>
        </motion.div>
      )}

      {/* Coach Bear — always rendered so exit animation plays */}
      <CoachBear
        show={showCoach}
        type={selectedChoice ? getResultType(selectedChoice) : 'correct'}
        title={selectedChoice?.en?.title || selectedChoice?.zh?.title || (lang === 'en' ? 'Great try!' : '不错的尝试！')}
        feedback={selectedChoice?.en?.feedback || selectedChoice?.zh?.feedback || (lang === 'en' ? 'Keep learning!' : '继续学习！')}
        tip={selectedChoice?.en?.tip || selectedChoice?.zh?.tip || (lang === 'en' ? 'Practice makes perfect!' : '熟能生巧！')}
        onNext={onAdvance || (onComplete ? handleNext : undefined)}
        onDismiss={() => setShowCoach(false)}
      />
    </div>
  );
}
