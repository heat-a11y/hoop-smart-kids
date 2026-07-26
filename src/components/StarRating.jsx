import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function StarRating({ stars = 0, maxStars = 3, size = 'md', animated = true }) {
  const sizeMap = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' };
  const starSize = sizeMap[size] || sizeMap.md;

  return (
    <div className="flex items-center gap-1">
      {[...Array(maxStars)].map((_, i) => {
        const filled = i < stars;
        return (
          <motion.div
            key={i}
            initial={animated ? { opacity: 0, scale: 0, rotate: -30 } : {}}
            animate={animated ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ delay: i * 0.15, type: 'spring', stiffness: 200 }}
          >
            <Star
              className={`${starSize} ${
                filled
                  ? 'text-neon-yellow fill-neon-yellow drop-shadow-[0_0_6px_rgba(255,225,53,0.5)]'
                  : 'text-white/20'
              }`}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
