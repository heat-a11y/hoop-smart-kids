import { useState } from 'react';
import { motion } from 'framer-motion';
import { Swords, Shield, MessageCircle, ChevronRight, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useGame } from '../context/GameContext';

const hubIcons = {
  offense: Swords,
  defense: Shield,
  communication: MessageCircle,
};

const hubBgGradients = {
  offense: 'from-court-orange/20 via-court-orange/5 to-transparent',
  defense: 'from-neon-blue/20 via-neon-blue/5 to-transparent',
  communication: 'from-neon-yellow/20 via-neon-yellow/5 to-transparent',
};

const hubBorderColors = {
  offense: 'border-court-orange/40 group-hover:border-court-orange/70',
  defense: 'border-neon-blue/40 group-hover:border-neon-blue/70',
  communication: 'border-neon-yellow/40 group-hover:border-neon-yellow/70',
};

const hubShadowColors = {
  offense: 'shadow-court-orange/20',
  defense: 'shadow-neon-blue/20',
  communication: 'shadow-neon-yellow/20',
};

const hubAccentColors = {
  offense: 'bg-court-orange',
  defense: 'bg-neon-blue',
  communication: 'bg-neon-yellow',
};

const hubIconsBig = {
  offense: '🏀',
  defense: '🛡️',
  communication: '📢',
};

export default function LearningHub({ onEnterOffense, onEnterDefense, onEnterCommunication }) {
  const { lang, t } = useLanguage();
  const { addXP } = useGame();
  const [activeHub, setActiveHub] = useState(null);

  const handleHubClick = (hub, _label) => {
    if (hub === 'offense' && onEnterOffense) {
      onEnterOffense();
      return;
    }
    if (hub === 'defense' && onEnterDefense) {
      onEnterDefense();
      return;
    }
    if (hub === 'communication' && onEnterCommunication) {
      onEnterCommunication();
      return;
    }
    setActiveHub(hub);
    addXP(5, { drill: false });
    setTimeout(() => setActiveHub(null), 1500);
  };

  const hubs = ['offense', 'defense', 'communication'];

  return (
    <section className="px-4 md:px-8 mb-8" id="learning-hubs">
      {/* Section Header */}
      <motion.div
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h2 className="font-display text-2xl font-bold text-white">
            {lang === 'en' ? '🏀 Learning Hubs' : '🏀 学习中心'}
          </h2>
          <p className="text-sm text-white/50 mt-1">
            {lang === 'en'
              ? 'Pick a skill to master'
              : '选择一项技能开始训练'}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-xs text-white/40">
          <Star className="w-3 h-3" />
          <span>+5 XP per explore</span>
        </div>
      </motion.div>

      {/* Hub Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {hubs.map((hub, index) => {
          const data = t(`hubs.${hub}`);
          const Icon = hubIcons[hub];
          const isActive = activeHub === hub;

          return (
            <motion.button
              key={hub}
              onClick={() => handleHubClick(hub, data.title)}
              className={`group relative overflow-hidden rounded-3xl border-2 ${hubBorderColors[hub]} ${hubShadowColors[hub]} shadow-lg bg-dark-card/60 backdrop-blur-sm text-left transition-all duration-300`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, type: 'spring', stiffness: 100 }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${hubBgGradients[hub]} rounded-3xl`} />

              {/* Decorative court lines */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                <div className="absolute top-4 right-4 w-20 h-px bg-white rotate-45" />
                <div className="absolute top-8 right-8 w-14 h-px bg-white rotate-45" />
              </div>

              {/* Active ripple effect */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-white/10 rounded-3xl"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8 }}
                />
              )}

              {/* XP Toast */}
              <AnimatedXP show={isActive} />

              <div className="relative p-5 md:p-6 flex flex-col h-full">
                {/* Icon + Badge */}
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-14 h-14 rounded-2xl ${hubAccentColors[hub]} bg-opacity-20 flex items-center justify-center text-2xl shadow-lg`}>
                    {hubIconsBig[hub]}
                  </div>
                  <div className="flex items-center gap-1 bg-white/5 rounded-full px-2.5 py-1 border border-white/10">
                    <Icon className={`w-3 h-3 ${hub === 'offense' ? 'text-court-orange' : hub === 'defense' ? 'text-neon-blue' : 'text-neon-yellow'}`} />
                    <span className="text-[10px] font-semibold text-white/60 uppercase tracking-wider">
                      {hub}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold text-white mb-1">
                  {data.title}
                </h3>
                <p className="text-xs text-court-wood-light/70 font-semibold mb-2">
                  {data.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-white/60 leading-relaxed mb-4 flex-1">
                  {data.description}
                </p>

                {/* Stats + CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <span className="text-[11px] text-white/40 font-medium">
                    {data.stats}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-bold text-white/70 group-hover:text-white transition-colors">
                    {data.cta}
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}

function AnimatedXP({ show }) {
  return (
    <motion.div
      className="absolute top-3 right-3 z-10 font-display font-bold text-sm text-neon-yellow"
      initial={{ opacity: 0, y: 0, scale: 0.5 }}
      animate={
        show
          ? { opacity: [0, 1, 0], y: -30, scale: [0.5, 1.2, 0.8] }
          : {}
      }
      transition={{ duration: 1 }}
    >
      +5 XP
    </motion.div>
  );
}
