import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, ThumbsUp, Lightbulb, ArrowRight, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function CoachBear({ show, type = 'correct', title, feedback, tip, onNext, onDismiss }) {
  const { lang } = useLanguage();

  const config = {
    correct: {
      emoji: '🐻‍❄️',
      name: lang === 'en' ? 'Coach Bear' : '熊教练',
      bg: 'from-success-green/20 to-emerald-900/20 border-success-green/30',
      iconBg: 'bg-success-green',
      accent: 'text-success-green',
      Icon: ThumbsUp,
    },
    wrong: {
      emoji: '🐻‍❄️',
      name: lang === 'en' ? 'Coach Bear' : '熊教练',
      bg: 'from-basketball-red/20 to-red-900/20 border-basketball-red/30',
      iconBg: 'bg-basketball-red',
      accent: 'text-basketball-red',
      Icon: Brain,
    },
    suboptimal: {
      emoji: '🐻‍❄️',
      name: lang === 'en' ? 'Coach Bear' : '熊教练',
      bg: 'from-neon-yellow/20 to-yellow-900/20 border-neon-yellow/30',
      iconBg: 'bg-neon-yellow',
      accent: 'text-neon-yellow',
      Icon: Sparkles,
    },
  };

  const c = config[type] || config.correct;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onDismiss} />

          <motion.div
            className={`relative w-full max-w-md rounded-3xl border bg-gradient-to-br ${c.bg} backdrop-blur-xl p-5 shadow-2xl`}
            initial={{ y: 80, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          >
            {/* Coach Bear Header */}
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className={`w-14 h-14 rounded-2xl ${c.iconBg} bg-opacity-20 flex items-center justify-center shadow-lg`}
                initial={{ rotate: -20, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
              >
                <c.Icon className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <p className="font-display font-bold text-white text-lg">{c.name}</p>
                <p className={`text-xs font-semibold ${c.accent}`}>
                  {type === 'correct'
                    ? (lang === 'en' ? '✅ Great decision!' : '✅ 好决定！')
                    : type === 'suboptimal'
                    ? (lang === 'en' ? '⚡ Could be better!' : '⚡ 可以更好！')
                    : (lang === 'en' ? '❌ Let\'s learn!' : '❌ 继续学习！')}
                </p>
              </div>
            </div>

            {/* Title */}
            <h3 className="font-display font-bold text-white text-base mb-2">
              {title}
            </h3>

            {/* Feedback */}
            <p className="text-sm text-white/80 leading-relaxed mb-3">
              {feedback}
            </p>

            {/* Tip box */}
            <div className="bg-white/5 rounded-xl px-3.5 py-3 border border-white/5 mb-4">
              <div className="flex items-center gap-1.5 mb-1">
                <Lightbulb className="w-3.5 h-3.5 text-neon-yellow" />
                <p className="text-[10px] font-bold text-neon-yellow uppercase tracking-wider">
                  {lang === 'en' ? "Coach's Tip" : '教练提示'}
                </p>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                {tip}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2">
              {onNext && (
                <motion.button
                  onClick={onNext}
                  className={`w-full sm:flex-1 px-5 py-4 sm:py-3 rounded-2xl font-display font-bold text-sm text-white shadow-lg flex items-center justify-center gap-2 ${type === 'correct' ? 'bg-gradient-to-r from-success-green to-emerald-600' : 'bg-gradient-to-r from-court-orange to-basketball-red'}`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>{lang === 'en' ? 'Next Scenario' : '下一关'}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              )}
              <motion.button
                onClick={onDismiss}
                className={`w-full sm:w-auto px-4 py-4 sm:py-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/60 font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-1 ${onNext ? '' : 'sm:mx-auto'}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <X className="w-3 h-3" />
                <span>{lang === 'en' ? 'Close' : '关闭'}</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
