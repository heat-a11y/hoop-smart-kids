import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BasketballCourt from '../court/BasketballCourt';
import { BallHandlerAvatar, TeammateAvatar, DefenderAvatar } from '../court/Avatars';
import Basketball from '../court/Basketball';
import CoachBear from './CoachBear';
import sfx from '../../services/SFXEngine';
import { useLanguage } from '../../context/LanguageContext';
import { useGame } from '../../context/GameContext';
import scenarios from '../../data/defenseScenarios';

export default function HelpRecoverGame({ onComplete }) {
  const { lang } = useLanguage();
  const { addXP, soundEnabled } = useGame();
  const scenario = scenarios.helpRecover;
  const text = lang === 'en' ? scenario.en : scenario.zh;
  const d = scenario.diagram;

  const [phase, setPhase] = useState('setup'); // setup | decision | helping | recovered | feedback
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showCoach, setShowCoach] = useState(false);
  const [animPhase, setAnimPhase] = useState(0); // 0=none, 1=sliding, 2=blocked, 3=recovering, 4=done

  // Trigger sequential animations for help path
  useEffect(() => {
    if (phase !== 'helping') return;

    const sequence = async () => {
      setAnimPhase(1);
      await new Promise(r => setTimeout(r, 600));
      setAnimPhase(2);
      await new Promise(r => setTimeout(r, 500));
      setAnimPhase(3);
      await new Promise(r => setTimeout(r, 500));
      setAnimPhase(4);
    };
    sequence();
  }, [phase]);

  // After animation completes, show feedback
  useEffect(() => {
    if (animPhase === 4 && selectedChoice?.correct) {
      const timer = setTimeout(() => setShowCoach(true), 300);
      return () => clearTimeout(timer);
    }
  }, [animPhase, selectedChoice]);

  const handleChoice = useCallback((choice) => {
    setSelectedChoice(choice);
    if (choice.correct) {
      setPhase('helping');
      addXP(100, { drill: true, module: 'defense', correct: true });
      if (soundEnabled) sfx.whistle();
    } else {
      setPhase('feedback');
      if (soundEnabled) sfx.wrong();
      setTimeout(() => setShowCoach(true), 300);
    }
  }, [addXP, soundEnabled]);

  const handleNext = useCallback(() => {
    setShowCoach(false);
    setSelectedChoice(null);
    setAnimPhase(0);
    setPhase('setup');
    onComplete();
  }, [onComplete]);

  const getChoiceText = (choice) => lang === 'en' ? choice.en : (choice.zh || choice.en);

  // Animated positions
  const helpX = d.helpPath.to.x;
  const helpY = d.helpPath.to.y;
  const recoverX = d.helpPath.mid.x;
  const recoverY = d.helpPath.mid.y - 30;

  return (
    <div className="px-4 md:px-8 mb-8">
      {/* Header */}
      <motion.div className="mb-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">🛡️</span>
          <span className="text-[10px] font-bold text-court-orange uppercase tracking-widest">
            {lang === 'en' ? 'Drill B' : '训练B'}
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

        <div className="relative">
          <BasketballCourt width={400} height={320}>
            {/* Basket */}
            <g transform={`translate(${d.basket.x}, ${d.basket.y})`}>
              <rect x="-12" y="-2" width="24" height="4" fill="white" opacity="0.8" rx="1" />
              <ellipse cx="0" cy="6" rx="10" ry="3" fill="none" stroke="red" strokeWidth="2.5" />
            </g>

            {/* Ball Handler driving */}
            <BallHandlerAvatar x={d.ballHandler.x} y={d.ballHandler.y} label={d.ballHandler.label} animate glow pulse delay={0.1} />
            <Basketball x={d.ballHandler.x + 10} y={d.ballHandler.y + 5} animate />

            {/* Beaten defender */}
            <DefenderAvatar x={d.defenderBeaten.x} y={d.defenderBeaten.y} label={d.defenderBeaten.label} animate delay={0.15} />

            {/* Your man (off ball) */}
            <TeammateAvatar x={d.helpDefenderMan.x} y={d.helpDefenderMan.y} label={d.helpDefenderMan.label} animate delay={0.2} pulse={phase === 'setup'} />

            {/* YOU - help defender */}
            <DefenderAvatar
              x={animPhase >= 1 ? helpX : animPhase >= 3 ? recoverX : d.helpDefender.x}
              y={animPhase >= 1 ? helpY : animPhase >= 3 ? recoverY : d.helpDefender.y}
              label="You"
              glow={animPhase >= 1}
              animate
              delay={0.1}
            />

            {/* Help path arrow (on setup) */}
            {phase === 'setup' && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 0.6 }}>
                <path d={`M ${d.helpPath.from.x} ${d.helpPath.from.y} Q ${d.helpPath.from.x + 20} ${d.helpPath.from.y + 30}, ${d.helpPath.to.x} ${d.helpPath.to.y}`} fill="none" stroke="#00D4FF" strokeWidth="1.5" strokeDasharray="4,3" />
                <polygon points={`${d.helpPath.to.x - 3},${d.helpPath.to.y - 5} ${d.helpPath.to.x},${d.helpPath.to.y} ${d.helpPath.to.x - 3},${d.helpPath.to.y + 5}`} fill="#00D4FF" />
                <text x={d.helpPath.from.x + 20} y={d.helpPath.from.y + 20} fill="#00D4FF" fontSize="7" fontWeight="bold">help?</text>
              </motion.g>
            )}

            {/* Animated help result */}
            {animPhase >= 2 && (
              <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring' }}>
                {/* Block icon */}
                <circle cx={helpX + 15} cy={helpY - 15} r="10" fill="#2ECC71" filter="url(#successGlow)" />
                <text x={helpX + 15} y={helpY - 11} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">🛑</text>
                <text x={helpX + 10} y={helpY + 20} fill="#2ECC71" fontSize="7" fontWeight="bold">STOP!</text>
              </motion.g>
            )}

            {/* Recover path */}
            {animPhase >= 3 && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 0.2 }}>
                <path d={`M ${helpX} ${helpY} Q ${(helpX + recoverX) / 2 + 10} ${(helpY + recoverY) / 2 - 20}, ${recoverX} ${recoverY}`} fill="none" stroke="#2ECC71" strokeWidth="1.5" strokeDasharray="4,3" />
                <text x={(helpX + recoverX) / 2 + 15} y={(helpY + recoverY) / 2 - 15} fill="#2ECC71" fontSize="7" fontWeight="bold">recover!</text>
              </motion.g>
            )}

            {animPhase >= 4 && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <text x={helpX - 15} y={helpY + 40} fill="#2ECC71" fontSize="8" fontWeight="bold">✅ HELD + RECOVERED!</text>
              </motion.g>
            )}

            {/* Wrong choice result */}
            {phase === 'feedback' && selectedChoice && !selectedChoice.correct && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <path d={`M ${d.ballHandler.x} ${d.ballHandler.y} L ${d.basket.x} ${d.basket.y + 6}`} stroke="#EF4444" strokeWidth="2" strokeDasharray="4,2" opacity="0.6" />
                <circle cx={d.basket.x} cy={d.basket.y + 6} r="10" fill="#EF4444" filter="url(#successGlow)" />
                <text x={d.basket.x} y={d.basket.y + 10} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">✗</text>
                <text x={d.basket.x} y={d.basket.y + 22} textAnchor="middle" fill="#EF4444" fontSize="7" fontWeight="bold" opacity="0.8">EASY LAYUP</text>
              </motion.g>
            )}
          </BasketballCourt>
        </div>
      </motion.div>

      {/* Decision buttons */}
      {phase === 'setup' && (
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 decision-grid" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          {text.choices.map((choice) => (
            <motion.button
              key={choice.id}
              onClick={() => handleChoice(choice)}
              className="w-full text-left bg-dark-card/60 hover:bg-dark-card-hover border border-white/5 hover:border-court-orange/40 rounded-2xl p-4 transition-all"
              whileHover={{ scale: 1.01, x: 4 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-start gap-3">
                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm ${choice.correct ? 'bg-success-green/20 text-success-green' : 'bg-basketball-red/20 text-basketball-red'}`}>
                  {choice.correct ? '✅' : '❌'}
                </span>
                <p className="font-display font-bold text-sm text-white pt-1">{choice.label}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Animating indicator */}
      {phase === 'helping' && animPhase < 4 && (
        <motion.div className="text-center py-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="inline-flex items-center gap-2 bg-neon-blue/10 border border-neon-blue/30 rounded-2xl px-5 py-3">
            <motion.span className="inline-block w-3 h-3 bg-neon-blue rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} />
            <span className="font-display font-bold text-sm text-neon-blue">
              {animPhase === 1 ? (lang === 'en' ? '🛡️ Sliding to help...' : '🛡️ 滑步协防中...') :
               animPhase === 2 ? (lang === 'en' ? '✋ Cut off the drive!' : '✋ 挡住突破！') :
               (lang === 'en' ? '🏃 Recovering back...' : '🏃 回位中...')}
            </span>
          </div>
        </motion.div>
      )}

      {/* Coach Bear */}
      {showCoach && selectedChoice && (
        <CoachBear
          show={showCoach}
          type={selectedChoice.correct ? 'correct' : 'wrong'}
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
