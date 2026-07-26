import { createContext, useContext, useReducer, useCallback } from 'react';
import badges from '../data/badges';

const GameContext = createContext();

const LEVEL_XP = [0, 50, 120, 220, 360, 550, 800, 1100, 1500, 2000, 3000];

const TITLES = [
  { minXP: 0, en: 'Basketball Rookie', zh: '篮球新手', icon: '🌱' },
  { minXP: 300, en: 'Floor General', zh: '控场大师', icon: '🎯' },
  { minXP: 700, en: 'Hoop Genius', zh: '篮球小学霸', icon: '🧠' },
  { minXP: 1200, en: 'All-Star MVP', zh: '全明星MVP', icon: '🏆' },
];

function getLevel(totalXP) {
  let level = 0;
  for (let i = LEVEL_XP.length - 1; i >= 0; i--) {
    if (totalXP >= LEVEL_XP[i]) { level = i; break; }
  }
  return level;
}

function getXPForNextLevel(totalXP) {
  const currentLevel = getLevel(totalXP);
  if (currentLevel >= LEVEL_XP.length - 1) return 0;
  return LEVEL_XP[currentLevel + 1] - totalXP;
}

function getProgressPercent(totalXP) {
  const currentLevel = getLevel(totalXP);
  if (currentLevel >= LEVEL_XP.length - 1) return 100;
  const currentXP = totalXP - LEVEL_XP[currentLevel];
  const needed = LEVEL_XP[currentLevel + 1] - LEVEL_XP[currentLevel];
  return Math.round((currentXP / needed) * 100);
}

function getTitle(totalXP) {
  let title = TITLES[0];
  for (const t of TITLES) {
    if (totalXP >= t.minXP) title = t;
  }
  return title;
}

function checkNewBadges(state) {
  const unlocked = new Set(state.unlockedBadges);
  const newlyUnlocked = [];

  for (const badge of badges) {
    if (unlocked.has(badge.id)) continue;
    const earned = badge.id === 'first-dribble'
      ? state.drillsCompleted > 0
      : state.totalXP >= badge.xpRequired;
    if (earned) {
      unlocked.add(badge.id);
      newlyUnlocked.push(badge);
    }
  }

  return { unlockedBadges: unlocked, newlyUnlockedBadges: newlyUnlocked };
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'ADD_XP': {
      const newXP = state.totalXP + action.amount;
      const newLevel = getLevel(newXP);
      const oldLevel = state.level;
      const levelUp = newLevel > oldLevel;
      const title = getTitle(newXP);

      const drillCount = state.drillsCompleted + (action.drill ? 1 : 0);

      // Track module results
      const moduleResults = { ...state.moduleResults };
      if (action.module) {
        const prev = moduleResults[action.module] || { correct: 0, total: 0, stars: 0 };
        moduleResults[action.module] = {
          correct: prev.correct + (action.correct ? 1 : 0),
          total: prev.total + 1,
          stars: 0, // recalculated below
        };
        // Recalculate stars (3 = all correct, 2 = 2/3, 1 = 1/3, 0 = 0/3)
        const m = moduleResults[action.module];
        if (m.total >= 3) {
          const ratio = m.correct / m.total;
          m.stars = ratio >= 0.9 ? 3 : ratio >= 0.6 ? 2 : ratio >= 0.3 ? 1 : 0;
        }
      }

      const newState = {
        ...state,
        totalXP: newXP,
        level: newLevel,
        drillsCompleted: drillCount,
        moduleResults,
        title,
        titleEn: title.en,
        titleZh: title.zh,
        titleIcon: title.icon,
      };

      const badgeResult = checkNewBadges(newState);
      return {
        ...newState,
        unlockedBadges: badgeResult.unlockedBadges,
        newlyUnlockedBadges: [
          ...state.newlyUnlockedBadges,
          ...badgeResult.newlyUnlockedBadges,
        ],
        showLevelUp: levelUp,
        lastXPGain: action.amount,
        prevLevel: oldLevel,
      };
    }

    case 'DISMISS_LEVELUP': {
      return { ...state, showLevelUp: false };
    }

    case 'CLEAR_BADGE_NOTIFICATIONS': {
      return { ...state, newlyUnlockedBadges: [] };
    }

    case 'TOGGLE_SOUND': {
      return { ...state, soundEnabled: !state.soundEnabled };
    }

    case 'RESET_MODULE': {
      const moduleResults = { ...state.moduleResults };
      moduleResults[action.module] = { correct: 0, total: 0, stars: 0 };
      return { ...state, moduleResults };
    }

    default:
      return state;
  }
}

const initialState = {
  totalXP: 0,
  level: 0,
  prevLevel: 0,
  drillsCompleted: 0,
  streak: 0,
  soundEnabled: true,
  language: 'en',
  unlockedBadges: new Set(),
  newlyUnlockedBadges: [],
  showLevelUp: false,
  lastXPGain: 0,
  title: TITLES[0],
  titleEn: TITLES[0].en,
  titleZh: TITLES[0].zh,
  titleIcon: TITLES[0].icon,
  moduleResults: {
    offense: { correct: 0, total: 0, stars: 0 },
    defense: { correct: 0, total: 0, stars: 0 },
    communication: { correct: 0, total: 0, stars: 0 },
  },
};

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const addXP = useCallback((amount, { drill = false, module = null, correct = false } = {}) => {
    dispatch({ type: 'ADD_XP', amount, drill, module, correct });
  }, []);

  const dismissLevelUp = useCallback(() => dispatch({ type: 'DISMISS_LEVELUP' }), []);
  const clearBadgeNotifications = useCallback(() => dispatch({ type: 'CLEAR_BADGE_NOTIFICATIONS' }), []);
  const toggleSound = useCallback(() => dispatch({ type: 'TOGGLE_SOUND' }), []);
  const resetModule = useCallback((module) => dispatch({ type: 'RESET_MODULE', module }), []);

  const xpForNext = getXPForNextLevel(state.totalXP);
  const progressPercent = getProgressPercent(state.totalXP);

  // Count total correct across modules
  const totalCorrect = Object.values(state.moduleResults).reduce((sum, m) => sum + m.correct, 0);
  const totalDrills = Object.values(state.moduleResults).reduce((sum, m) => sum + m.total, 0);

  return (
    <GameContext.Provider
      value={{
        ...state,
        xpForNext,
        progressPercent,
        totalCorrect,
        totalDrills,
        addXP,
        dismissLevelUp,
        clearBadgeNotifications,
        toggleSound,
        resetModule,
        TITLES,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}

export { TITLES };
