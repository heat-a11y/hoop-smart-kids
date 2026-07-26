import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useGame } from '../context/GameContext';

export default function ProgressBar() {
  const { t } = useLanguage();
  const { totalXP, level, xpForNext, progressPercent, drillsCompleted } = useGame();

  return (
    <section className="px-4 md:px-8 mb-6">
      <motion.div
        className="bg-dark-card/60 backdrop-blur-sm border border-white/5 rounded-2xl p-4 md:p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          {/* Label */}
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-neon-yellow" />
            <span className="text-sm font-bold text-white/80">{t('progress.label')}</span>
          </div>

          {/* Level Info */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-court-wood-light/60">{t('progress.currentLevel')}</span>
              <span className="font-bold text-neon-yellow text-sm">{level}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-court-wood-light/60">{t('progress.drillsCompleted')}</span>
              <span className="font-bold text-white text-sm">{drillsCompleted}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-4 bg-white/5 rounded-full overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_8px,rgba(255,255,255,0.1)_8px,rgba(255,255,255,0.1)_16px)]" />
          </div>

          {/* Fill */}
          <motion.div
            className="relative h-full rounded-full bg-gradient-to-r from-court-orange via-neon-yellow to-neon-blue"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          </motion.div>

          {/* Percentage label */}
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white drop-shadow-md">
            {progressPercent}%
          </span>
        </div>

        {/* XP footer */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-[10px] text-white/30 font-medium">
            {t('progress.xpToNext')}: {xpForNext} XP
          </span>
          <span className="text-[10px] text-white/30 font-medium">
            {totalXP} {t('common.points')}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
