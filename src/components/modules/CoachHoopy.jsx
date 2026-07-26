import { motion } from 'framer-motion';
import { Sparkles, Trophy, Brain, ThumbsUp, Flame } from 'lucide-react';
import { CoachHoopyAvatar } from '../court/Avatars';

const coachPhrases = {
  correct: {
    en: [
      "BOOM! That's my player! 🏀",
      "Nice basketball IQ! 🧠",
      "Coach Hoopy approves! ✅",
      "Textbook decision! 📚",
      "You're a natural leader! 🗣️",
    ],
    zh: [
      "太棒了！这才是我的球员！🏀",
      "篮球智商真高！🧠",
      "胡比教练给你点赞！✅",
      "教科书般的判断！📚",
      "你是个天生的领袖！🗣️",
    ],
  },
  wrong: {
    en: [
      "No worries! Learn and grow! 🌱",
      "Good players learn from mistakes! 💪",
      "Next play — you got this! 🔄",
      "We learn more from losses! 📖",
      "Shake it off and stay focused! 🎯",
    ],
    zh: [
      "没关系！边学边成长！🌱",
      "好球员从错误中学习！💪",
      "下一个球——你能行！🔄",
      "我们从失败中学到更多！📖",
      "振作精神，保持专注！🎯",
    ],
  },
  levelUp: {
    en: [
      "LEVEL UP! You're on fire! 🔥",
      "New level unlocked! Keep grinding! ⬆️",
      "Coach Hoopy sees greatness in you! 🌟",
      "You're leveling up so fast! 🚀",
    ],
    zh: [
      "升级了！你状态火热！🔥",
      "新等级解锁！继续努力！⬆️",
      "胡比教练看到了你的伟大！🌟",
      "你升级太快了！🚀",
    ],
  },
  moduleComplete: {
    en: [
      "MODULE COMPLETE! You're becoming a basketball genius! 🏆",
      "Another module crushed! Coach is proud! 🎉",
      "You mastered this! On to the next! ⚡",
    ],
    zh: [
      "模块完成！你正在成为篮球天才！🏆",
      "又完成一个模块！教练为你骄傲！🎉",
      "你掌握了这个！进入下一关！⚡",
    ],
  },
};

function getRandomPhrase(phrases) {
  const arr = Array.isArray(phrases) ? phrases : Object.values(phrases);
  return arr[Math.floor(Math.random() * arr.length)];
}

const coachIcons = {
  correct: { icon: ThumbsUp, color: 'text-success-green' },
  wrong: { icon: Brain, color: 'text-basketball-red' },
  levelUp: { icon: Flame, color: 'text-court-orange' },
  moduleComplete: { icon: Trophy, color: 'text-neon-yellow' },
};

export default function CoachHoopy({
  show,
  type = 'correct',
  message,
  onDismiss,
  lang = 'en',
}) {
  const phrase = message || getRandomPhrase(coachPhrases[type]?.[lang] || coachPhrases.correct.en);
  const IconComponent = coachIcons[type]?.icon || Sparkles;
  const iconColor = coachIcons[type]?.color || 'text-neon-yellow';

  return (
    <motion.div
      className="fixed bottom-28 right-4 z-[180] flex items-end gap-3"
      initial={{ opacity: 0, x: 100, scale: 0.5 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.5 }}
      transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      onClick={onDismiss}
      style={{ touchAction: 'manipulation' }}
    >
      {/* Speech bubble */}
      <motion.div
        className="relative bg-dark-card/95 backdrop-blur-xl border border-white/10 rounded-2xl rounded-br-none px-4 py-3 max-w-[200px] shadow-xl cursor-pointer select-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15 }}
      >
        <div className="flex items-start gap-2">
          <IconComponent className={`w-4 h-4 ${iconColor} mt-0.5 flex-shrink-0`} />
          <p className="text-xs text-white/90 leading-relaxed font-medium">
            {phrase}
          </p>
        </div>
        {/* Tail */}
        <div className="absolute -bottom-2 right-3 w-3 h-3 bg-dark-card border-r border-b border-white/10 rotate-45" />
      </motion.div>

      {/* Coach Hoopy SVG Avatar */}
      <motion.div
        className="relative flex-shrink-0 w-16 h-16 cursor-pointer select-none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring' }}
        style={{ touchAction: 'manipulation' }}
      >
        <svg viewBox="-25 -28 50 50" width="100%" height="100%" style={{ overflow: 'visible' }}>
          <CoachHoopyAvatar size={20} animating={true} type={type} />
        </svg>

        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-court-orange/30"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ pointerEvents: 'none' }}
        />
      </motion.div>
    </motion.div>
  );
}

export { getRandomPhrase, coachPhrases };
