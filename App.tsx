
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import IntroPage from './pages/IntroPage';
import { AuthState, UserConfig } from './types';

// Global falling ball effect component
const FallingOrbs: React.FC = () => {
  const [orbs, setOrbs] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Trigger only on interactive elements
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a')) {
        const newOrb = { id: Date.now(), x: e.clientX, y: e.clientY };
        setOrbs(prev => [...prev, newOrb]);
        setTimeout(() => {
          setOrbs(prev => prev.filter(o => o.id !== newOrb.id));
        }, 1200);
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      <AnimatePresence>
        {orbs.map(orb => (
          <motion.div
            key={orb.id}
            initial={{ y: -50, x: orb.x, opacity: 0 }}
            animate={{ 
              y: [null, orb.y], 
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.5]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.33, 1, 0.68, 1] 
            }}
            className="absolute w-4 h-4 rounded-full bg-blue-400 shadow-[0_0_20px_#60a5fa] border border-white/40"
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const AnimatedRoutes: React.FC<{
  auth: AuthState;
  onLogin: (user: UserConfig) => void;
  onLogout: () => void;
}> = ({ auth, onLogin, onLogout }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/login/:userId" 
          element={
            auth.isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginPage onLogin={onLogin} />
            )
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            auth.isAuthenticated ? (
              <DashboardPage user={auth.currentUser!} onLogout={onLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [auth, setAuth] = useState<AuthState>(() => {
    const saved = localStorage.getItem('photo_vault_auth');
    return saved ? JSON.parse(saved) : { isAuthenticated: false, currentUser: null };
  });

  useEffect(() => {
    localStorage.setItem('photo_vault_auth', JSON.stringify(auth));
  }, [auth]);

  const login = (user: UserConfig) => {
    setAuth({ isAuthenticated: true, currentUser: user });
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, currentUser: null });
  };

  return (
    <AnimatePresence mode="wait">
      {showIntro ? (
        <IntroPage key="intro" onFinish={() => setShowIntro(false)} />
      ) : (
        <HashRouter key="app">
          <FallingOrbs />
          <div className="min-h-screen selection:bg-blue-500/30 bg-slate-950">
            <AnimatedRoutes auth={auth} onLogin={login} onLogout={logout} />
          </div>
        </HashRouter>
      )}
    </AnimatePresence>
  );
};

export default App;
