import { motion } from 'framer-motion';
import { X, Download, Star, Trophy } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useGame } from '../context/GameContext';
import badges from '../data/badges';

const MODULES = [
  { id: 'offense', icon: '🏀', en: 'Offense Mastery', zh: '进攻决策' },
  { id: 'defense', icon: '🛡️', en: 'Lockdown Defense', zh: '铁壁防守' },
  { id: 'communication', icon: '🗣️', en: 'Court Communication', zh: '场上沟通' },
];

export default function TrophyRoom({ onClose }) {
  const { lang } = useLanguage();
  const { totalXP, level, titleEn, titleZh, titleIcon, moduleResults, unlockedBadges, TITLES } = useGame();

  // Calculate total stars
  const totalStars = Object.values(moduleResults).reduce((sum, m) => sum + m.stars, 0);
  const maxStars = 9; // 3 modules × 3 stars

  const handleDownloadBadge = (badgeId) => {
    // Create an SVG badge and trigger download
    const badge = badges.find(b => b.id === badgeId);
    if (!badge) return;

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1A1A2E"/>
          <stop offset="100%" style="stop-color:#16213E"/>
        </linearGradient>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FFD700"/>
          <stop offset="100%" style="stop-color:#FFA500"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="20" fill="url(#bg)" stroke="#FFD700" stroke-width="2"/>
      <text x="100" y="55" text-anchor="middle" font-size="50">${badge.icon}</text>
      <text x="100" y="110" text-anchor="middle" fill="#FFD700" font-size="14" font-family="sans-serif" font-weight="bold">${lang === 'en' ? badge.nameEn : badge.nameZh}</text>
      <text x="100" y="135" text-anchor="middle" fill="#C0C0C0" font-size="10" font-family="sans-serif">${lang === 'en' ? badge.descEn : badge.descZh}</text>
      <text x="100" y="175" text-anchor="middle" fill="#FF6B35" font-size="9" font-family="sans-serif">🏀 Hoop Smart Kids</text>
    </svg>`;

    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `badge-${badge.id}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        className="relative w-full max-w-lg max-h-[85vh] bg-dark-card/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-dark-card/90 backdrop-blur-sm border-b border-white/5 px-5 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-neon-yellow" />
            <h2 className="font-display text-lg font-bold text-white">
              {lang === 'en' ? '🏆 Trophy Room' : '🏆 奖杯室'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4 text-white/60" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(85vh-64px)] p-5 space-y-5">
          {/* Player Title */}
          <div className="bg-gradient-to-br from-court-orange/10 to-neon-blue/10 rounded-2xl p-4 border border-white/5 text-center">
            <span className="text-4xl block mb-2">{titleIcon}</span>
            <p className="font-display font-bold text-lg text-white">
              {lang === 'en' ? titleEn : titleZh}
            </p>
            <p className="text-xs text-white/40 mt-1">
              {lang === 'en' ? 'Current Title' : '当前称号'}
            </p>
            <div className="flex justify-center gap-1 mt-2">
              {TITLES.map((t, _i) => (
                <div
                  key={t.en}
                  className={`w-2 h-2 rounded-full ${
                    totalXP >= t.minXP ? 'bg-court-orange' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Overall Progress */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="font-display font-bold text-sm text-white">
                {lang === 'en' ? '🏀 Career Stats' : '🏀 生涯数据'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <span className="text-2xl font-bold text-neon-yellow">{totalXP}</span>
                <p className="text-[10px] text-white/40 mt-1">{lang === 'en' ? 'IQ Points' : '篮球智商'}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <span className="text-2xl font-bold text-white">{level}</span>
                <p className="text-[10px] text-white/40 mt-1">{lang === 'en' ? 'Level' : '等级'}</p>
              </div>
            </div>
          </div>

          {/* Module Stars */}
          <div>
            <h3 className="font-display font-bold text-sm text-white mb-3">
              {lang === 'en' ? '⭐ Module Ratings' : '⭐ 模块评级'}
            </h3>
            <div className="space-y-2">
              {MODULES.map((mod) => {
                const result = moduleResults[mod.id] || { correct: 0, total: 0, stars: 0 };
                return (
                  <div
                    key={mod.id}
                    className="bg-white/5 rounded-xl px-4 py-3 border border-white/5 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{mod.icon}</span>
                      <div>
                        <p className="font-display font-bold text-sm text-white">
                          {lang === 'en' ? mod.en : mod.zh}
                        </p>
                        <p className="text-[10px] text-white/40">
                          {result.correct}/{result.total} {lang === 'en' ? 'correct' : '正确'}
                        </p>
                      </div>
                    </div>
                    <StarRating stars={result.stars} size="sm" />
                  </div>
                );
              })}
            </div>

            {/* Total Stars */}
            <div className="flex items-center justify-center gap-2 mt-3 bg-white/5 rounded-xl py-2">
              <Star className="w-4 h-4 text-neon-yellow fill-neon-yellow" />
              <span className="font-display font-bold text-sm text-white">
                {totalStars}/{maxStars}
              </span>
              <span className="text-[10px] text-white/40">
                {lang === 'en' ? 'Total Stars' : '总星数'}
              </span>
            </div>
          </div>

          {/* Badges / Achievements */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-bold text-sm text-white">
                {lang === 'en' ? '🏅 Digital Badges' : '🏅 数字徽章'}
              </h3>
              <button
                onClick={handlePrint}
                className="text-[10px] text-white/40 hover:text-white transition-colors underline underline-offset-2"
              >
                {lang === 'en' ? 'Print All' : '全部打印'}
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {badges.map((badge) => {
                const isUnlocked = unlockedBadges.has(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`relative rounded-xl p-3 border text-center ${
                      isUnlocked
                        ? 'bg-gradient-to-br from-neon-yellow/10 to-court-orange/5 border-neon-yellow/30'
                        : 'bg-white/5 border-white/5 opacity-50'
                    }`}
                  >
                    <span className="text-2xl block mb-1">
                      {isUnlocked ? badge.icon : '🔒'}
                    </span>
                    <p className={`text-[9px] font-bold ${isUnlocked ? 'text-white' : 'text-white/30'}`}>
                      {lang === 'en' ? badge.nameEn : badge.nameZh}
                    </p>
                    {isUnlocked && (
                      <button
                        onClick={() => handleDownloadBadge(badge.id)}
                        className="mt-1 text-[8px] text-neon-yellow/60 hover:text-neon-yellow transition-colors"
                      >
                        <Download className="w-3 h-3 inline" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
