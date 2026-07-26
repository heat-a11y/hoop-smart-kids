import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import { GameProvider, useGame } from './context/GameContext';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import LearningHub from './components/LearningHub';
import ProgressBar from './components/ProgressBar';
import BadgesDrawer from './components/BadgesDrawer';
import OffenseModule from './components/modules/OffenseModule';
import DefenseModule from './components/modules/DefenseModule';
import CommunicationModule from './components/modules/CommunicationModule';
import FiveOutModule from './components/modules/FiveOutModule';
import sfx from './services/SFXEngine';

function LevelUpOverlay() {
  const { showLevelUp, level, dismissLevelUp, lastXPGain, soundEnabled } = useGame();

  useEffect(() => {
    if (showLevelUp && soundEnabled) {
      sfx.levelUp();
      setTimeout(() => sfx.cheer(), 600);
    }
  }, [showLevelUp, soundEnabled]);

  if (!showLevelUp) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={dismissLevelUp}
    >
      <motion.div
        className="text-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12 }}
      >
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="font-display text-3xl font-bold text-white mb-2">
          LEVEL UP!
        </h2>
        <p className="text-xl text-neon-yellow font-bold font-display">
          Level {level}
        </p>
        <p className="text-sm text-white/50 mt-2">
          +{lastXPGain} IQ Points
        </p>
        <motion.button
          className="mt-6 px-8 py-3 bg-gradient-to-r from-court-orange to-basketball-red rounded-full font-display font-bold text-white shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={dismissLevelUp}
        >
          Let's Go!
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function Dashboard({ onEnterOffense, onEnterDefense, onEnterCommunication, onEnterFiveOut, onViewBadges }) {
  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-6xl mx-auto">
        <Header />
        <HeroBanner
          onStartLearning={() => {
            document.getElementById('learning-hubs')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onViewBadges={onViewBadges}
        />
        <ProgressBar />
        <LearningHub onEnterOffense={onEnterOffense} onEnterDefense={onEnterDefense} onEnterCommunication={onEnterCommunication} onEnterFiveOut={onEnterFiveOut} />
      </div>
      <LevelUpOverlay />
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState('dashboard');
  const [showBadges, setShowBadges] = useState(false);

  return (
    <GameProvider>
      <LanguageProvider>
        <AnimatePresence mode="wait">
          {screen === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Dashboard
                onEnterOffense={() => setScreen('offense')}
                onEnterDefense={() => setScreen('defense')}
                onEnterCommunication={() => setScreen('communication')}
                onEnterFiveOut={() => setScreen('fiveout')}
                onViewBadges={() => setShowBadges(true)}
              />
            </motion.div>
          )}
          {screen === 'offense' && (
            <motion.div
              key="offense"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <OffenseModule onBack={() => setScreen('dashboard')} />
            </motion.div>
          )}
          {screen === 'defense' && (
            <motion.div
              key="defense"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DefenseModule onBack={() => setScreen('dashboard')} />
            </motion.div>
          )}
          {screen === 'communication' && (
            <motion.div
              key="communication"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CommunicationModule onBack={() => setScreen('dashboard')} />
            </motion.div>
          )}
          {screen === 'fiveout' && (
            <motion.div
              key="fiveout"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FiveOutModule onBack={() => setScreen('dashboard')} />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showBadges && (
            <BadgesDrawer onClose={() => setShowBadges(false)} />
          )}
        </AnimatePresence>
      </LanguageProvider>
    </GameProvider>
  );
}
