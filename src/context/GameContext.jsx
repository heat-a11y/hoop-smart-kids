import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import badges from '../data/badges';
import { setMuted } from '../services/SFXEngine';

const GameContext = createContext();

const LEVEL_XP = [0, 50, 120, 220, 360, 550, 800, 1100, 1500, 2000, 3000];

const TITLES = [
  { minXP: 0, en: 'Basketball Rookie', zh: '篮球新手', icon: '🌱' },
  { minXP: 300, en: 'Floor General', zh: '控场大师', icon: '🎯' },
  { minXP: 700, en: 'Hoop Genius', zh: '篮球小学霸', icon: '🧠' },
  { minXP: 1200, en: 'All-Star MVP', zh: '全明星MVP', icon: '🏆' },
];

const STORAGE_KEY = 'hoop-smart-kids-save';

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
    case 'HYDRATE':
      return { ...state, ...action.payload };

    case 'ADD_XP': {
      const newXP = state.totalXP + action.amount;
      const newLevel = getLevel(newXP);
      const oldLevel = state.level;
      const levelUp = newLevel > oldLevel;
      const title = getTitle(newXP);

      const drillCount = state.drillsCompleted + (action.drill ? 1 : 0);

      const moduleResults = { ...state.moduleResults };
      if (action.module) {
        const prev = moduleResults[action.module] || { correct: 0, total: 0, stars: 0 };
        moduleResults[action.module] = {
          correct: prev.correct + (action.correct ? 1 : 0),
          total: prev.total + 1,
          stars: 0,
        };
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

    case 'DISMISS_LEVELUP':
      return { ...state, showLevelUp: false };

    case 'CLEAR_BADGE_NOTIFICATIONS':
      return { ...state, newlyUnlockedBadges: [] };

    case 'TOGGLE_SOUND':
      return { ...state, soundEnabled: !state.soundEnabled };

    case 'SET_LANGUAGE':
      return { ...state, language: action.lang };

    case 'RESET_MODULE': {
      const moduleResults = { ...state.moduleResults };
      moduleResults[action.module] = { correct: 0, total: 0, stars: 0 };
      return { ...state, moduleResults };
    }

    case 'RESET_ALL':
      return { ...initialState, newlyUnlockedBadges: [], unlockedBadges: new Set() };

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

/** Serialize state to JSON-safe shape for localStorage */
function serialize(state) {
  return {
    totalXP: state.totalXP,
    level: state.level,
    drillsCompleted: state.drillsCompleted,
    soundEnabled: state.soundEnabled,
    language: state.language,
    unlockedBadges: Array.from(state.unlockedBadges),
    moduleResults: state.moduleResults,
    titleEn: state.titleEn,
    titleZh: state.titleZh,
    titleIcon: state.titleIcon,
  };
}

/** Deserialize saved data back into state shape */
function deserialize(saved) {
  if (!saved) return null;
  const title = getTitle(saved.totalXP || 0);
  return {
    totalXP: saved.totalXP || 0,
    level: getLevel(saved.totalXP || 0),
    prevLevel: getLevel(saved.totalXP || 0),
    drillsCompleted: saved.drillsCompleted || 0,
    streak: saved.streak || 0,
    soundEnabled: saved.soundEnabled !== false,
    language: saved.language || 'en',
    unlockedBadges: new Set(saved.unlockedBadges || []),
    newlyUnlockedBadges: [],
    showLevelUp: false,
    lastXPGain: 0,
    title,
    titleEn: title.en,
    titleZh: title.zh,
    titleIcon: title.icon,
    moduleResults: saved.moduleResults || {
      offense: { correct: 0, total: 0, stars: 0 },
      defense: { correct: 0, total: 0, stars: 0 },
      communication: { correct: 0, total: 0, stars: 0 },
    },
  };
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        const hydrated = deserialize(saved);
        if (hydrated) {
          dispatch({ type: 'HYDRATE', payload: hydrated });
        }
      }
    } catch (_e) { /* ignore corrupt save */ }
  }, []);

  // Sync soundEnabled to SFXEngine master mute
  useEffect(() => {
    setMuted(!state.soundEnabled);
  }, [state.soundEnabled]);

  // Persist to localStorage on every meaningful state change
  useEffect(() => {
    if (state === initialState) return; // don't save default state
    try {
      const data = serialize(state);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (_e) { /* storage full or private mode */ }
  }, [state.totalXP, state.drillsCompleted, state.soundEnabled, state.language,
      state.unlockedBadges, state.moduleResults, state.titleEn]);

  const addXP = useCallback((amount, { drill = false, module = null, correct = false } = {}) => {
    dispatch({ type: 'ADD_XP', amount, drill, module, correct });
  }, []);

  const dismissLevelUp = useCallback(() => dispatch({ type: 'DISMISS_LEVELUP' }), []);
  const clearBadgeNotifications = useCallback(() => dispatch({ type: 'CLEAR_BADGE_NOTIFICATIONS' }), []);
  const toggleSound = useCallback(() => dispatch({ type: 'TOGGLE_SOUND' }), []);
  const resetModule = useCallback((module) => dispatch({ type: 'RESET_MODULE', module }), []);
  const setLanguage = useCallback((lang) => dispatch({ type: 'SET_LANGUAGE', lang }), []);
  const resetAll = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    dispatch({ type: 'RESET_ALL' });
  }, []);

  const xpForNext = getXPForNextLevel(state.totalXP);
  const progressPercent = getProgressPercent(state.totalXP);
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
        setLanguage,
        resetAll,
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
