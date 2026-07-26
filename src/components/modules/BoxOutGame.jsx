import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BasketballCourt from '../court/BasketballCourt';
import { BallHandlerAvatar, TeammateAvatar, DefenderAvatar } from '../court/Avatars';
import Basketball from '../court/Basketball';
import CoachBear from './CoachBear';
import sfx from '../../services/SFXEngine';
import { useLanguage } from '../../context/LanguageContext';
import { useGame } from '../../context/GameContext';
import scenarios from '../../data/defenseScenarios';

const ARC_DURATION = 2200; // ms for full ball arc
const PERFECT_WINDOW = 400; // ms window around peak for "perfect"

export default function BoxOutGame({ onComplete, onAdvance }) {
  const { lang } = useLanguage();
  const { addXP, soundEnabled } = useGame();
  const scenario = scenarios.boxOut;
  const text = lang === 'en' ? scenario.en : scenario.zh;
  const d = scenario.diagram;

  const [phase, setPhase] = useState('intro'); // intro | shooting | result | feedback
  const [ballPos, setBallPos] = useState({ x: d.ballArc.start.x, y: d.ballArc.start.y });
  const [shotStartTime, setShotStartTime] = useState(0);
  const [result, setResult] = useState(null); // 'early' | 'perfect' | 'late' | 'missed'
  const [showCoach, setShowCoach] = useState(false);
  const [showBoxOutEffect, setShowBoxOutEffect] = useState(false);
  const animRef = useRef(null);
  const hasTapped = useRef(false);

  // Start the shot arc
  const startShot = useCallback(() => {
    setPhase('shooting');
    setResult(null);
    hasTapped.current = false;
    setShowBoxOutEffect(false);

    const startTime = Date.now();
    setShotStartTime(startTime);

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / ARC_DURATION, 1);

      // Quadratic bezier: start → peak → end (basket)
      const start = d.ballArc.start;
      const peak = d.ballArc.peak;
      const end = d.ballArc.end;

      const t = progress;
      const inv = 1 - t;
      const x = inv * inv * start.x + 2 * inv * t * peak.x + t * t * end.x;
      // Higher arc
      const y = inv * inv * start.y + 2 * inv * t * (peak.y - 15) + t * t * end.y;

      setBallPos({ x, y });

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        // Ball reached rim - if user hasn't tapped, it's late/missed
        if (!hasTapped.current) {
          setResult('late');
          setPhase('result');
          setTimeout(() => setShowCoach(true), 400);
        }
      }
    };

    animRef.current = requestAnimationFrame(animate);
  }, [d]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  // Handle BOX OUT tap
  const handleBoxOut = useCallback(() => {
    if (hasTapped.current || phase !== 'shooting') return;
    hasTapped.current = true;

    if (animRef.current) cancelAnimationFrame(animRef.current);

    const elapsed = Date.now() - shotStartTime;
    const peakTime = ARC_DURATION / 2;

    let newResult;
    if (elapsed < peakTime - PERFECT_WINDOW / 2) {
      newResult = 'early';
      if (soundEnabled) sfx.wrong();
    } else if (elapsed > peakTime + PERFECT_WINDOW / 2) {
      newResult = 'late';
      if (soundEnabled) sfx.wrong();
    } else {
      newResult = 'perfect';
      addXP(100, { drill: true, module: 'defense', correct: true });
      if (soundEnabled) sfx.whistle();
    }

    setResult(newResult);
    setPhase('result');
    setShowBoxOutEffect(newResult === 'perfect');

    // Freeze ball at current position briefly, then show coach
    setTimeout(() => setShowCoach(true), 500);
  }, [phase, shotStartTime, addXP]);

  const handleNext = useCallback(() => {
    setShowCoach(false);
    setResult(null);
    setShowBoxOutEffect(false);
    setPhase('intro');
    setBallPos({ x: d.ballArc.start.x, y: d.ballArc.start.y });
    onComplete();
  }, [onComplete, d]);

  const getResultFeedback = () => {
    if (result === 'perfect') {
      return {
        type: 'correct',
        title: lang === 'en' ? '🏆 PERFECT BOX OUT!' : '🏆 完美卡位！',
        feedback: lang === 'en' ? text.perfectFeedback : text.perfectFeedbackZh,
        tip: lang === 'en' ? 'Watch the ball, not the player. When the shot goes up, find your man first, then go get the ball!' : '看球，不要看人。投篮出手时，先找到你的人，再去抢球！',
      };
    }
    if (result === 'early') {
      return {
        type: 'suboptimal',
        title: lang === 'en' ? '⏰ A bit early' : '⏰ 有点早了',
        feedback: lang === 'en' ? text.earlyFeedback : text.earlyFeedbackZh,
        tip: lang === 'en' ? 'Let the shot reach its peak before making contact. Anticipate, don\'t guess!' : '让球到达最高点再发力。预判，但不是猜测！',
      };
    }
    return {
      type: 'wrong',
      title: lang === 'en' ? '⏰ Too late!' : '⏰ 太晚了！',
      feedback: lang === 'en' ? text.lateFeedback : text.lateFeedbackZh,
      tip: lang === 'en' ? 'Start moving when the ball is at its peak. That gives you time to seal and secure.' : '当球到达最高点时开始移动。这样你就有时间卡位和抢板。',
    };
  };

  const feedback = result ? getResultFeedback() : null;

  return (
    <div className="px-4 md:px-8 mb-8">
      {/* Header */}
      <motion.div className="mb-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">💪</span>
          <span className="text-[10px] font-bold text-neon-yellow uppercase tracking-widest">
            {lang === 'en' ? 'Drill C' : '训练C'}
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
          <motion.p
            className="text-xs font-display font-bold text-neon-yellow text-center mb-3"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            {text.instruction}
          </motion.p>
        )}

        <div className="relative">
          <BasketballCourt width={400} height={320}>
            {/* Basket */}
            <g transform={`translate(${d.basket.x}, ${d.basket.y})`}>
              <rect x="-12" y="-2" width="24" height="4" fill="white" opacity="0.8" rx="1" />
              <ellipse cx="0" cy="6" rx="10" ry="3" fill="none" stroke="red" strokeWidth="2.5" />
              <path d="M -8 8 Q -5 16 0 18 Q 5 16 8 8" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
            </g>

            {/* Shooter */}
            <TeammateAvatar x={d.shooter.x} y={d.shooter.y} label={d.shooter.label} animate delay={0.1} />

            {/* YOU - defender */}
            <DefenderAvatar x={d.defenderYou.x} y={d.defenderYou.y} label={d.defenderYou.label} animate glow={(phase === 'shooting')} pulse={(phase === 'shooting')} />

            {/* Opponent (box out target) */}
            <TeammateAvatar x={d.opponent.x} y={d.opponent.y} label={d.opponent.label} animate delay={0.2} />

            {/* Basketball on arc */}
            {phase === 'shooting' && (
              <Basketball x={ballPos.x} y={ballPos.y} size={8} />
            )}

            {/* Ball arc trail (ghost) */}
            {phase === 'shooting' && (
              <path
                d={`M ${d.ballArc.start.x} ${d.ballArc.start.y} Q ${d.ballArc.peak.x} ${d.ballArc.peak.y - 15}, ${d.ballArc.end.x} ${d.ballArc.end.y}`}
                fill="none"
                stroke="white"
                strokeWidth="1"
                strokeDasharray="3,4"
                opacity="0.15"
              />
            )}

            {/* Box out effect */}
            {showBoxOutEffect && (
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring' }}
              >
                {/* Seal icon */}
                <circle cx={d.defenderYou.x - 20} cy={d.defenderYou.y - 20} r="14" fill="#2ECC71" filter="url(#successGlow)" />
                <text x={d.defenderYou.x - 20} y={d.defenderYou.y - 16} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">💪</text>

                {/* Box out arrow */}
                <path d={`M ${d.defenderYou.x} ${d.defenderYou.y} Q ${(d.defenderYou.x + d.opponent.x) / 2} ${(d.defenderYou.y + d.opponent.y) / 2 - 20}, ${d.opponent.x} ${d.opponent.y}`} fill="none" stroke="#FFE135" strokeWidth="3" strokeDasharray="5,3" opacity="0.8" />
                <polygon points={`${d.opponent.x + 5},${d.opponent.y - 3} ${d.opponent.x},${d.opponent.y} ${d.opponent.x + 5},${d.opponent.y + 3}`} fill="#FFE135" opacity="0.8" />
                <text x={(d.defenderYou.x + d.opponent.x) / 2 + 10} y={(d.defenderYou.y + d.opponent.y) / 2 - 20} fill="#FFE135" fontSize="7" fontWeight="bold">SEAL!</text>

                {/* Rebound effect */}
                <motion.g
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ y: -20, opacity: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  <text x={d.defenderYou.x} y={d.defenderYou.y + 30} textAnchor="middle" fill="#2ECC71" fontSize="10" fontWeight="bold">
                    REBOUND!
                  </text>
                </motion.g>
              </motion.g>
            )}

            {/* Result indicator */}
            {phase === 'result' && result !== 'perfect' && (
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring' }}
              >
                <circle
                  cx={d.defenderYou.x + 25}
                  cy={d.defenderYou.y - 15}
                  r="12"
                  fill={result === 'early' ? '#FFE135' : '#EF4444'}
                />
                <text
                  x={d.defenderYou.x + 25}
                  y={d.defenderYou.y - 11}
                  textAnchor="middle"
                  fill={result === 'early' ? '#1A1A2E' : 'white'}
                  fontSize="11"
                  fontWeight="bold"
                >
                  {result === 'early' ? '!' : '✗'}
                </text>
                {result === 'early' && (
                  <text x={d.defenderYou.x + 25} y={d.defenderYou.y} textAnchor="middle" fill="#FFE135" fontSize="6" fontWeight="bold">EARLY</text>
                )}
                {result === 'late' && (
                  <text x={d.ballArc.end.x} y={d.ballArc.end.y + 18} textAnchor="middle" fill="#EF4444" fontSize="7" fontWeight="bold" opacity="0.8">LOST IT!</text>
                )}
              </motion.g>
            )}
          </BasketballCourt>
        </div>
      </motion.div>

      {/* Action button */}
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.button
            key="start"
            onClick={startShot}
            className="w-full py-4 bg-gradient-to-r from-neon-yellow to-yellow-500 rounded-2xl font-display font-bold text-night-sky text-base shadow-xl shadow-neon-yellow/20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            🏀 {lang === 'en' ? 'Shot goes up!' : '投篮出手！'}
          </motion.button>
        )}

        {phase === 'shooting' && (
          <motion.button
            key="boxout"
            onClick={handleBoxOut}
            className="w-full py-5 bg-gradient-to-r from-court-orange to-basketball-red rounded-2xl font-display font-bold text-white text-lg shadow-xl shadow-court-orange/30 relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Pulsing glow */}
            <motion.div
              className="absolute inset-0 bg-white/10"
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            />
            <span className="relative z-10">
              💪 {lang === 'en' ? 'BOX OUT NOW!' : '卡位！'}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Coach Bear */}
      {showCoach && feedback && (
        <CoachBear
          show={showCoach}
          type={feedback.type}
          title={feedback.title}
          feedback={feedback.feedback}
          tip={feedback.tip}
          onNext={onAdvance || (onComplete ? handleNext : undefined)}
          onDismiss={() => setShowCoach(false)}
        />
      )}
    </div>
  );
}
