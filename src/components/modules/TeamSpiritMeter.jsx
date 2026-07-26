import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export default function TeamSpiritMeter({ value, maxValue = 100, showLabel = true }) {
  const { lang } = useLanguage();
  const percent = Math.min(Math.max(value / maxValue, 0), 1) * 100;

  const getMeterColor = () => {
    if (percent >= 75) return 'from-neon-yellow via-success-green to-emerald-400';
    if (percent >= 40) return 'from-neon-yellow via-court-orange to-neon-blue';
    if (percent >= 15) return 'from-court-orange to-basketball-red';
    return 'from-red-700 to-basketball-red';
  };

  const getFaceEmoji = () => {
    if (percent >= 90) return '🔥';
    if (percent >= 70) return '💪';
    if (percent >= 40) return '🙂';
    if (percent >= 15) return '😰';
    return '😢';
  };

  const spiritLabels = {
    unstoppable: lang === 'en' ? 'UNSTOPPABLE!' : '势不可挡！',
    hyped: lang === 'en' ? 'HYPED!' : '士气高涨！',
    okay: lang === 'en' ? 'OKAY' : '还行',
    low: lang === 'en' ? 'LOW' : '低落',
    critical: lang === 'en' ? 'CRITICAL' : '危急！',
  };

  const getLabel = () => {
    if (percent >= 90) return spiritLabels.unstoppable;
    if (percent >= 70) return spiritLabels.hyped;
    if (percent >= 40) return spiritLabels.okay;
    if (percent >= 15) return spiritLabels.low;
    return spiritLabels.critical;
  };

  return (
    <div className="bg-dark-card/50 backdrop-blur-sm border border-white/5 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-2">
        {showLabel && (
          <div className="flex items-center gap-1.5">
            <span className="text-lg">{getFaceEmoji()}</span>
            <span className="font-display font-bold text-xs text-white/80">
              {lang === 'en' ? 'Team Spirit' : '团队士气'}
            </span>
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.span
            key={Math.round(percent)}
            className="text-xs font-display font-bold"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            style={{
              color: percent >= 70 ? '#2ECC71' : percent >= 40 ? '#FFE135' : '#EF4444',
            }}
          >
            {getLabel()} {Math.round(percent)}%
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Meter bar */}
      <div className="relative h-5 bg-white/5 rounded-full overflow-hidden">
        {/* Background dots */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_6px,rgba(255,255,255,0.1)_6px,rgba(255,255,255,0.1)_12px)]" />
        </div>

        {/* Fill */}
        <motion.div
          className={`relative h-full rounded-full bg-gradient-to-r ${getMeterColor()}`}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </motion.div>

        {/* Emoji on meter */}
        <span className="absolute inset-0 flex items-center justify-end pr-2 text-xs">
          {getFaceEmoji()}
        </span>
      </div>

      {/* Segments markers */}
      <div className="flex justify-between mt-1 px-0.5">
        {[0, 25, 50, 75, 100].map((pct) => (
          <div key={pct} className="flex flex-col items-center">
            <div
              className={`w-1 h-1 rounded-full ${
                percent >= pct ? 'bg-white/30' : 'bg-white/10'
              }`}
            />
            <span className="text-[6px] text-white/20 mt-0.5">{pct}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
