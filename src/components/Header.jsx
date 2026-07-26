import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Trophy, Globe, Award, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useGame } from '../context/GameContext';
import BadgesDrawer from './BadgesDrawer';
import TrophyRoom from './TrophyRoom';

export default function Header() {
  const { lang, toggleLang, t } = useLanguage();
  const { totalXP, level, soundEnabled, toggleSound, newlyUnlockedBadges, titleEn, titleZh, titleIcon } = useGame();
  const [showBadges, setShowBadges] = useState(false);
  const [showTrophyRoom, setShowTrophyRoom] = useState(false);

  return (
    <>
      <header className="relative z-50 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          {/* Logo + Title */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-3xl drop-shadow-lg">🏀</span>
            <div>
              <h1 className="font-display text-lg md:text-xl font-bold leading-tight text-white drop-shadow">
                {lang === 'en' ? 'Hoop Smart Kids' : '篮球小能手'}
              </h1>
              <div className="flex items-center gap-1.5">
                <p className="text-[10px] md:text-xs text-neon-blue/70 font-semibold tracking-wider uppercase">
                  {t('app.tagline')}
                </p>
                {/* Title Badge */}
                <div className="hidden sm:flex items-center gap-0.5 bg-gradient-to-r from-court-orange/20 to-neon-yellow/20 rounded-full px-1.5 py-0.5 border border-court-orange/20">
                  <span className="text-[10px]">{titleIcon}</span>
                  <span className="text-[8px] font-bold text-neon-yellow whitespace-nowrap">
                    {lang === 'en' ? titleEn : titleZh}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Controls */}
          <div className="flex items-center gap-1.5 md:gap-2.5">
            {/* IQ Points */}
            <motion.div
              className="hidden sm:flex items-center gap-1.5 bg-dark-card/80 backdrop-blur-sm border border-court-orange/30 rounded-full px-3 py-1.5"
              key={totalXP}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="text-lg">🧠</span>
              <span className="font-bold text-sm text-neon-yellow">{totalXP}</span>
              <span className="text-[10px] text-court-wood-light/60">{t('nav.iqPoints')}</span>
            </motion.div>

            {/* Level Badge */}
            <div className="bg-gradient-to-br from-court-orange to-basketball-red rounded-full px-2.5 py-1 shadow-lg shadow-court-orange/30">
              <span className="font-display font-bold text-xs text-white">
                {t('common.level')} {level}
              </span>
            </div>

            {/* Trophy Room */}
            <motion.button
              onClick={() => setShowTrophyRoom(true)}
              className="p-2 rounded-full bg-dark-card/80 backdrop-blur-sm border border-white/10 hover:border-neon-yellow/50 transition-all hover:bg-dark-card-hover"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Trophy Room"
            >
              <Award className="w-4 h-4 text-neon-yellow" />
            </motion.button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-full bg-dark-card/80 backdrop-blur-sm border border-white/10 hover:border-neon-blue/50 transition-all hover:bg-dark-card-hover"
              aria-label={t('nav.sound')}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-neon-blue" />
              ) : (
                <VolumeX className="w-4 h-4 text-court-wood-light/50" />
              )}
            </button>

            {/* Badges Button */}
            <motion.button
              onClick={() => setShowBadges(true)}
              className="relative p-2 rounded-full bg-dark-card/80 backdrop-blur-sm border border-white/10 hover:border-neon-yellow/50 transition-all hover:bg-dark-card-hover"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={t('nav.badges')}
            >
              <Trophy className="w-4 h-4 text-neon-yellow" />
              {newlyUnlockedBadges.length > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 w-3 h-3 bg-basketball-red rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                />
              )}
            </motion.button>

            {/* Language Toggle */}
            <motion.button
              onClick={toggleLang}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-dark-card/80 backdrop-blur-sm border border-white/10 hover:border-neon-blue/50 transition-all hover:bg-dark-card-hover"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-3.5 h-3.5 text-neon-blue" />
              <span className="font-bold text-xs text-white">
                {lang === 'en' ? 'EN' : '中文'}
              </span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Drawers */}
      <AnimatePresence>
        {showBadges && <BadgesDrawer onClose={() => setShowBadges(false)} />}
        {showTrophyRoom && <TrophyRoom onClose={() => setShowTrophyRoom(false)} />}
      </AnimatePresence>
    </>
  );
}
