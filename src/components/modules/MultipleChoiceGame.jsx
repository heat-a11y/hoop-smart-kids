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
 * Generic multiple-choice scenario game with choice-based player animations.
 * Shows animated player movement on the court after the user picks an answer,
 * so they can VISUALLY see what the play looks like.
 *
 * Choices are rendered directly ON the court as clickable zones.
 * Each choice can have a `position: {x, y}` — falls back to auto-layout.
 *
 * Scenario choices can include an `animate` array:
 *   animate: [
 *     { target: 'teammate1', to: {x, y}, label: '✂️ Cut!', color: '#2ECC71' },
 *     { target: 'ballHandler', to: {x, y}, label: '🎯 Pass!', color: '#00D4FF' },
 *   ]
 */
export default function MultipleChoiceGame({ scenario, moduleKey, onComplete, onAdvance, half: courtHalfProp }) {
  const { lang, t: _t } = useLanguage();
  const { addXP, soundEnabled } = useGame();
  const text = lang === 'en' ? scenario.en : scenario.zh;
  const d = scenario.diagram;

  const courtHalf = courtHalfProp || (moduleKey === 'offense' ? 'top' : 'bottom');

  const [phase, setPhase] = useState('intro'); // intro | animating | feedback
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showCoach, setShowCoach] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  const choiceLabels = ['A', 'B', 'C', 'D'];

  const choiceColors = ['#2ECC71', '#EF4444', '#FFE135', '#00D4FF'];
  const choiceBgColors = ['rgba(46,204,113,0.15)', 'rgba(239,68,68,0.15)', 'rgba(255,225,53,0.15)', 'rgba(0,212,255,0.15)'];

  // Default positions on the half-court (width=400, height≈320 active area)
  const getDefaultPosition = (index, total) => {
    const layouts = {
      2: [{ x: 100, y: 140 }, { x: 300, y: 140 }],
      3: [{ x: 200, y: 70 }, { x: 90, y: 200 }, { x: 310, y: 200 }],
      4: [{ x: 90, y: 70 }, { x: 310, y: 70 }, { x: 90, y: 200 }, { x: 310, y: 200 }],
    };
    return (layouts[total] || layouts[3])[index] || { x: 200, y: 140 };
  };

  // Get the animation targets for the selected choice (if any)
  const getChoiceAnimations = (choice) => {
    return choice?.animate || [];
  };

  const handleChoice = useCallback((choice) => {
    setSelectedChoice(choice);
    const animations = getChoiceAnimations(choice);

    if (animations.length > 0) {
      setPhase('animating');

      if (choice.correct === true) {
        addXP(100, { drill: true, module: moduleKey, correct: true });
        if (soundEnabled) sfx.whistle();
      } else {
        if (soundEnabled) sfx.wrong();
      }

      setTimeout(() => {
        setPhase('feedback');
        setTimeout(() => setShowCoach(true), 400);
      }, 1200);
    } else {
      setPhase('feedback');
      if (choice.correct === true) {
        addXP(100, { drill: true, module: moduleKey, correct: true });
        if (soundEnabled) sfx.whistle();
      } else {
        if (soundEnabled) sfx.wrong();
      }
      setTimeout(() => {
        setTimeout(() => setShowCoach(true), 400);
      }, 300);
    }
  }, [addXP, moduleKey, soundEnabled]);

  const handleRetry = useCallback(() => {
    setShowCoach(false);
    setSelectedChoice(null);
    setPhase('intro');
    setRetryKey(k => k + 1);
  }, []);

  const handleNext = useCallback(() => {
    setShowCoach(false);
    setSelectedChoice(null);
    setPhase('intro');
    onComplete();
  }, [onComplete]);

  const getResultType = (choice) => {
    if (choice.correct === true) return 'correct';
    if (choice.correct === 'suboptimal') return 'suboptimal';
    return 'wrong';
  };

  // Resolve animated position for an avatar
  const getAnimatedPos = (avatarKey, defaultPos) => {
    if (phase !== 'animating' || !selectedChoice) return defaultPos;
    const anim = selectedChoice.animate?.find(a => a.target === avatarKey);
    return anim ? anim.to : defaultPos;
  };

  const getAvatarState = (avatarKey) => {
    if (phase !== 'animating' || !selectedChoice) return { animating: false };
    const anim = selectedChoice.animate?.find(a => a.target === avatarKey);
    return { animating: !!anim, path: anim };
  };

  const cutColor = '#2ECC71';

  // Choice pill dimensions
  const pillW = 148;
  const pillH = 44;

  return (
    <div className="px-4 md:px-8 mb-8" key={retryKey}>
      {/* Header */}
      <motion.div className="mb-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
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

        {d && (
          <div className="relative">
            <InteractiveCourt simple width={400} half={courtHalf}>
              {/* Static players (visible before animation or used as base) */}
              {d.ballHandler && (() => {
                const anim = getAvatarState('ballHandler');
                const pos = anim.animating ? anim.path.to : { x: d.ballHandler.x, y: d.ballHandler.y };
                return (
                  <g key="bh">
                    {anim.animating && (
                      <>
                        <path
                          d={`M ${d.ballHandler.x} ${d.ballHandler.y} Q ${(d.ballHandler.x + pos.x) / 2} ${Math.min(d.ballHandler.y, pos.y) - 30}, ${pos.x} ${pos.y}`}
                          fill="none" stroke={cutColor} strokeWidth="2.5" strokeDasharray="6,3" opacity="0.7"
                        />
                        <text x={pos.x + 15} y={pos.y} fill={cutColor} fontSize="8" fontWeight="bold" fontFamily="Nunito, sans-serif">{anim.path.label || ''}</text>
                      </>
                    )}
                    <motion.g
                      animate={anim.animating ? { x: pos.x - d.ballHandler.x, y: pos.y - d.ballHandler.y } : {}}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                    >
                      <BallHandlerAvatar x={d.ballHandler.x} y={d.ballHandler.y} label={d.ballHandler.label} animate glow pulse delay={0.1} />
                    </motion.g>
                  </g>
                );
              })()}

              {d.teammate1 && (() => {
                const anim = getAvatarState('teammate1');
                const pos = anim.animating ? anim.path.to : { x: d.teammate1.x, y: d.teammate1.y };
                return (
                  <g key="t1">
                    {anim.animating && (
                      <>
                        <path
                          d={`M ${d.teammate1.x} ${d.teammate1.y} Q ${(d.teammate1.x + pos.x) / 2} ${Math.min(d.teammate1.y, pos.y) - 30}, ${pos.x} ${pos.y}`}
                          fill="none" stroke={cutColor} strokeWidth="2.5" strokeDasharray="6,3" opacity="0.7"
                        />
                        <text x={pos.x + 15} y={pos.y} fill={cutColor} fontSize="8" fontWeight="bold" fontFamily="Nunito, sans-serif">{anim.path.label || ''}</text>
                      </>
                    )}
                    <motion.g
                      animate={anim.animating ? { x: pos.x - d.teammate1.x, y: pos.y - d.teammate1.y } : {}}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                    >
                      <TeammateAvatar x={d.teammate1.x} y={d.teammate1.y} label={d.teammate1.label} animate delay={0.2} />
                    </motion.g>
                  </g>
                );
              })()}

              {d.teammate2 && <TeammateAvatar x={d.teammate2.x} y={d.teammate2.y} label={d.teammate2.label} animate delay={0.25} />}
              {d.teammate3 && <TeammateAvatar x={d.teammate3.x} y={d.teammate3.y} label={d.teammate3.label} animate delay={0.3} />}

              {d.defender1 && (() => {
                const anim = getAvatarState('defender1');
                const pos = anim.animating ? anim.path.to : { x: d.defender1.x, y: d.defender1.y };
                return (
                  <g key="d1">
                    {anim.animating && (
                      <>
                        <path
                          d={`M ${d.defender1.x} ${d.defender1.y} Q ${(d.defender1.x + pos.x) / 2} ${Math.min(d.defender1.y, pos.y) - 20}, ${pos.x} ${pos.y}`}
                          fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="4,4" opacity="0.5"
                        />
                        <text x={pos.x + 12} y={pos.y} fill="#EF4444" fontSize="7" fontWeight="bold" fontFamily="Nunito, sans-serif">{anim.path.label || ''}</text>
                      </>
                    )}
                    <motion.g
                      animate={anim.animating ? { x: pos.x - d.defender1.x, y: pos.y - d.defender1.y } : {}}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                    >
                      <DefenderAvatar x={d.defender1.x} y={d.defender1.y} label={d.defender1.label} animate delay={0.15} />
                    </motion.g>
                  </g>
                );
              })()}

              {d.defender2 && <DefenderAvatar x={d.defender2.x} y={d.defender2.y} label={d.defender2.label} animate delay={0.25} />}
              {d.defender3 && <DefenderAvatar x={d.defender3.x} y={d.defender3.y} label={d.defender3.label} animate delay={0.35} />}
              {d.defender4 && <DefenderAvatar x={d.defender4.x} y={d.defender4.y} label={d.defender4.label} animate delay={0.2} />}
              {d.teammate4 && <TeammateAvatar x={d.teammate4.x} y={d.teammate4.y} label={d.teammate4.label} animate delay={0.3} />}

              {/* Ball follows ballHandler */}
              {d.ballHandler && (() => {
                const bp = getAnimatedPos('ballHandler', { x: d.ballHandler.x, y: d.ballHandler.y });
                return <Basketball x={bp.x} y={bp.y - 16} animate delay={0.5} />;
              })()}

              {/* ═══════════════════════════════════════════════════════════
                 CHOICE BUTTONS ON THE COURT — interactive SVG foreignObjects
                 Rendered only during intro phase (before a choice is made)
                 ═══════════════════════════════════════════════════════════ */}
              {phase === 'intro' && (
                <g>
                  {text.choices.map((choice, i) => {
                    const pos = choice.position || getDefaultPosition(i, text.choices.length);
                    const color = choiceColors[i % 4];
                    const bg = choiceBgColors[i % 4];
                    const letter = choiceLabels[i] || (i + 1);

                    return (
                      <g key={`choice-${choice.id}`}>
                        <foreignObject
                          x={pos.x - pillW / 2}
                          y={pos.y - pillH / 2}
                          width={pillW}
                          height={pillH}
                        >
                          <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '0 10px',
                            borderRadius: '22px',
                            border: '1px solid rgba(255,255,255,0.12)',
                            background: 'rgba(15,15,30,0.85)',
                            backdropFilter: 'blur(8px)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            fontFamily: '"Nunito", system-ui, sans-serif',
                            boxSizing: 'border-box',
                          }}
                            onMouseEnter={e => {
                              e.currentTarget.style.borderColor = color;
                              e.currentTarget.style.background = bg;
                              e.currentTarget.style.transform = 'scale(1.04)';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                              e.currentTarget.style.background = 'rgba(15,15,30,0.85)';
                              e.currentTarget.style.transform = 'scale(1)';
                            }}
                            onClick={() => handleChoice(choice)}
                          >
                            <span style={{
                              flexShrink: 0,
                              width: '26px',
                              height: '26px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              fontWeight: 800,
                              color: color,
                              background: `${color}22`,
                              border: `1.5px solid ${color}55`,
                            }}>{letter}</span>
                            <span style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              color: '#fff',
                              lineHeight: 1.2,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                            }}>{choice.label}</span>
                          </div>
                        </foreignObject>
                      </g>
                    );
                  })}
                </g>
              )}
            </InteractiveCourt>

            {/* Interactive hint overlay — only visible during intro */}
            {phase === 'intro' && (
              <motion.div
                className="absolute inset-0 flex items-end justify-center pb-3 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-[10px] font-bold text-white/30 font-display tracking-wider uppercase">
                  {lang === 'en' ? '← Tap a choice on the court →' : '← 点击球场上的选项 →'}
                </span>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>

      {/* Animating indicator */}
      <AnimatePresence>
        {phase === 'animating' && (
          <motion.div
            className="mt-4 text-center py-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-neon-blue/10 border border-neon-blue/30 rounded-2xl px-5 py-3">
              <motion.span className="inline-block w-3 h-3 bg-neon-blue rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} />
              <span className="font-display font-bold text-sm text-neon-blue">
                {lang === 'en' ? '▶️ Playing out the play...' : '▶️ 展示跑位中...'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback result */}
      <AnimatePresence>
        {phase === 'feedback' && selectedChoice && !showCoach && (
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
            <div className="flex gap-3">
              <button
                onClick={() => setShowCoach(true)}
                className="text-xs text-white/60 hover:text-white transition-colors underline underline-offset-2"
              >
                {lang === 'en' ? 'Tap for Coach Bear →' : '点击听取熊教练 →'}
              </button>
              <button
                onClick={handleRetry}
                className="text-xs text-white/60 hover:text-white transition-colors underline underline-offset-2 ml-auto"
              >
                {lang === 'en' ? '🔄 Try Again' : '🔄 重试'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coach Bear */}
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
