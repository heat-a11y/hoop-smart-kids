import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Home, Trophy } from 'lucide-react';
import CoachHoopy from './CoachHoopy';
import StarRating from '../StarRating';
import { useLanguage } from '../../context/LanguageContext';
import { useGame } from '../../context/GameContext';
import sfx from '../../services/SFXEngine';

/**
 * Shared module shell that eliminates duplication across Offense/Defense/Communication modules.
 * Pass drills array, summary config, and the module key for i18n.
 */
export default function ModuleShell({ drills, summary, moduleKey, icon: moduleIcon, onBack }) {
  const { lang, t } = useLanguage();
  const { totalXP, soundEnabled } = useGame();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(new Set());
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (showSummary && soundEnabled) {
      sfx.cheer();
    }
  }, [showSummary, soundEnabled]);

  const drill = drills[currentIndex];
  const DrillComponent = drill.component;

  const handleComplete = useCallback(() => {
    setCompleted(prev => {
      const next = new Set(prev);
      next.add(currentIndex);
      return next;
    });
  }, [currentIndex]);

  const handleAdvance = useCallback(() => {
    // Mark current drill as completed AND advance to the next one
    // Used by CoachBear's "Next Scenario" button — one click = done
    setCompleted(prev => {
      const next = new Set(prev);
      next.add(currentIndex);
      return next;
    });
    // Small delay to let the completion state settle, then advance
    setTimeout(() => {
      if (currentIndex < drills.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setShowSummary(true);
      }
    }, 50);
  }, [currentIndex, drills.length]);

  const handleNext = useCallback(() => {
    if (currentIndex < drills.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowSummary(true);
    }
  }, [currentIndex, drills.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  if (showSummary) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          className="max-w-md w-full bg-dark-card/60 backdrop-blur-sm border border-white/5 rounded-3xl p-8 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring' }}
        >
          <motion.div
            className="text-6xl mb-4"
            initial={{ rotate: -20, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            {summary.icon}
          </motion.div>
          <h2 className="font-display text-2xl font-bold text-white mb-2">
            {summary.title}
          </h2>
          <p className="text-white/60 text-sm mb-6">
            {summary.desc}
          </p>

          <div className="bg-white/5 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Trophy className="w-5 h-5 text-neon-yellow" />
              <span className="font-display font-bold text-lg text-neon-yellow">
                {totalXP}
              </span>
              <span className="text-sm text-white/50">{t('nav.iqPoints')}</span>
            </div>
            <div className="space-y-2">
              {drills.map((d, i) => {
                const stars = completed.has(i) ? 3 : 0;
                return (
                  <div key={d.id} className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{d.icon}</span>
                      <span className="text-xs font-bold text-white">{lang === 'en' ? d.en : d.zh}</span>
                    </div>
                    <StarRating stars={stars} size="sm" animated={false} />
                  </div>
                );
              })}
            </div>
          </div>

          <CoachHoopy
            show={true}
            type="moduleComplete"
            lang={lang}
            onDismiss={() => {}}
          />

          <motion.button
            onClick={onBack}
            className="w-full py-3.5 bg-gradient-to-r from-court-orange to-basketball-red rounded-2xl font-display font-bold text-white shadow-xl"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="flex items-center justify-center gap-2">
              <Home className="w-4 h-4" />
              <span>{summary.cta}</span>
            </div>
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Top Navigation */}
      <div className="sticky top-0 z-30 bg-night-sky/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.button
              onClick={onBack}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-4 h-4 text-white/70" />
            </motion.button>
            <div>
              <h2 className="font-display text-sm font-bold text-white">
                {moduleIcon} {lang === 'en' ? summary.titleEn : summary.titleZh}
              </h2>
              <p className="text-[10px] text-white/40">
                {summary.progressLabel(currentIndex, drills.length)}
              </p>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-1.5">
            {drills.map((d, i) => (
              <div
                key={d.id}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentIndex
                    ? 'bg-court-orange w-6'
                    : completed.has(i)
                    ? 'bg-success-green'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Drill/Scenario content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.25 }}
        >
          <DrillComponent onComplete={handleComplete} onAdvance={handleAdvance} />
        </motion.div>
      </AnimatePresence>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-night-sky/90 backdrop-blur-md border-t border-white/5 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`px-4 py-2.5 rounded-xl font-display font-bold text-sm transition-all ${
              currentIndex === 0
                ? 'bg-white/5 text-white/30 cursor-not-allowed'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Prev' : '上一个'}</span>
            </div>
          </button>

          <div className="text-center">
            <span className="text-xs text-white/40 font-semibold">
              {drill.icon} {lang === 'en' ? drill.en : drill.zh}
            </span>
          </div>

          <button
            onClick={handleNext}
            disabled={!completed.has(currentIndex)}
            className={`px-4 py-2.5 rounded-xl font-display font-bold text-sm transition-all ${
              completed.has(currentIndex)
                ? 'bg-court-orange text-white shadow-lg shadow-court-orange/30'
                : 'bg-white/5 text-white/30 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span>{lang === 'en' ? (currentIndex < drills.length - 1 ? 'Next' : 'Finish') : (currentIndex < drills.length - 1 ? '下一个' : '完成')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
