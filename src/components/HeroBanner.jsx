import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const floatingBall = {
  animate: {
    y: [0, -12, 0],
    rotate: [0, 5, -5, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

const letterVariants = {
  hidden: { y: 40, opacity: 0, rotate: -10 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: { delay: i * 0.03, type: 'spring', stiffness: 200 },
  }),
};

export default function HeroBanner() {
  const { lang, t } = useLanguage();
  const heading = t('hero.heading');

  return (
    <section className="relative overflow-hidden rounded-3xl mx-4 md:mx-8 mt-4 mb-8">
      {/* Background gradient court */}
      <div className="absolute inset-0 bg-gradient-to-br from-court-orange/20 via-dark-card to-neon-blue/10 rounded-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,107,53,0.15),transparent_70%)] rounded-3xl" />

      {/* Court line decorations */}
      <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-court-orange/0 via-court-orange/20 to-court-orange/0" />
      <div className="absolute right-1/4 top-0 w-px h-full bg-gradient-to-b from-neon-blue/0 via-neon-blue/15 to-neon-blue/0" />
      <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-court-wood-light/30 to-transparent" />

      <div className="relative px-6 md:px-12 py-10 md:py-16 flex flex-col md:flex-row items-center gap-8">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          {/* Bilingual subtitle bar */}
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4 border border-white/10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-bold text-neon-yellow tracking-wider uppercase">
              EN / 中文
            </span>
            <span className="text-white/30">•</span>
            <span className="text-xs text-court-wood-light/80">
              {lang === 'en' ? '中英双语篮球训练' : 'Bilingual Basketball Training'}
            </span>
          </motion.div>

          {/* Hero Heading — letter by letter */}
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            {heading.split('').map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block bg-gradient-to-r from-white via-neon-yellow to-court-orange bg-clip-text text-transparent"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="text-base md:text-lg text-white/70 max-w-xl mb-6 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {t('hero.subheading')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-3 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.button
              className="group relative px-8 py-3.5 bg-gradient-to-r from-court-orange to-basketball-red rounded-2xl font-display font-bold text-base text-white shadow-xl shadow-court-orange/30 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10">{t('hero.cta')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-yellow/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
            </motion.button>

            <motion.button
              className="px-8 py-3.5 bg-white/5 backdrop-blur-sm border border-white/15 rounded-2xl font-display font-bold text-sm text-white/80 hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              {t('hero.secondary')}
            </motion.button>
          </motion.div>
        </div>

        {/* Mascot / Basketball Visual */}
        <motion.div
          className="flex-shrink-0 w-36 h-36 md:w-48 md:h-48 relative"
          variants={floatingBall}
          animate="animate"
        >
          {/* Glow */}
          <div className="absolute inset-0 bg-court-orange/20 rounded-full blur-3xl" />
          {/* Basketball emoji large */}
          <span className="text-7xl md:text-8xl absolute inset-0 flex items-center justify-center drop-shadow-2xl">
            🏀
          </span>
          {/* Ring accents */}
          <div className="absolute inset-2 border-2 border-court-orange/30 rounded-full animate-[spin_8s_linear_infinite]" />
          <div className="absolute inset-4 border border-neon-blue/20 rounded-full animate-[spin_12s_linear_infinite_reverse]" />
        </motion.div>
      </div>
    </section>
  );
}
