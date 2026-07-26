import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useGame } from '../context/GameContext';
import badges from '../data/badges';

const colorMap = {
  bronze: 'from-amber-700/30 to-amber-900/20 border-amber-700/40',
  silver: 'from-slate-300/30 to-slate-500/20 border-slate-400/40',
  gold: 'from-yellow-300/30 to-yellow-500/20 border-yellow-400/40',
};

const textColorMap = {
  bronze: 'text-amber-300',
  silver: 'text-slate-200',
  gold: 'text-yellow-300',
};

export default function BadgesDrawer({ onClose }) {
  const { lang, t } = useLanguage();
  const { unlockedBadges, newlyUnlockedBadges, clearBadgeNotifications } = useGame();

  const handleClose = () => {
    clearBadgeNotifications();
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Drawer */}
      <motion.div
        className="relative w-full max-w-lg bg-dark-card/95 backdrop-blur-xl border border-white/10 rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[80vh] overflow-hidden"
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <h2 className="font-display text-lg font-bold text-white">
            {t('badges.title')}
          </h2>
          <motion.button
            onClick={handleClose}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-4 h-4 text-white/60" />
          </motion.button>
        </div>

        {/* Recently Earned Alert */}
        <AnimatePresence>
          {newlyUnlockedBadges.length > 0 && (
            <motion.div
              className="mx-4 mt-3 px-4 py-3 bg-gradient-to-r from-neon-yellow/10 to-court-orange/10 border border-neon-yellow/20 rounded-xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <p className="text-xs font-bold text-neon-yellow mb-1">
                🎉 {lang === 'en' ? 'New Badges Unlocked!' : '新徽章已解锁！'}
              </p>
              <div className="flex flex-wrap gap-2">
                {newlyUnlockedBadges.map((b) => (
                  <span key={b.id} className="text-sm">
                    {b.icon} {lang === 'en' ? b.nameEn : b.nameZh}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Badges Grid */}
        <div className="p-4 overflow-y-auto max-h-[calc(80vh-120px)]">
          {badges.length === 0 ? (
            <p className="text-center text-white/40 py-10">{t('badges.empty')}</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {badges.map((badge, index) => {
                const isUnlocked = unlockedBadges.has(badge.id);
                return (
                  <motion.div
                    key={badge.id}
                    className={`relative rounded-2xl p-4 border bg-gradient-to-br ${colorMap[badge.color]} ${
                      isUnlocked ? 'opacity-100' : 'opacity-50'
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isUnlocked ? 1 : 0.5, scale: 1 }}
                    transition={{ delay: index * 0.05, type: 'spring' }}
                    whileHover={isUnlocked ? { scale: 1.05, y: -2 } : {}}
                  >
                    {/* Badge Icon */}
                    <div className="text-3xl mb-2 text-center">
                      {isUnlocked ? badge.icon : <Lock className="w-6 h-6 mx-auto text-white/30" />}
                    </div>

                    {/* Badge Name */}
                    <p className={`text-xs font-bold text-center ${isUnlocked ? textColorMap[badge.color] : 'text-white/30'}`}>
                      {lang === 'en' ? badge.nameEn : badge.nameZh}
                    </p>

                    {/* Description */}
                    <p className="text-[10px] text-white/40 text-center mt-1 leading-tight">
                      {lang === 'en' ? badge.descEn : badge.descZh}
                    </p>

                    {/* Unlocked indicator */}
                    {isUnlocked && (
                      <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-success-green shadow-sm shadow-success-green/50" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
