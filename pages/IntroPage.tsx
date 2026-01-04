
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroPageProps {
  onFinish: () => void;
}

const Room404Sketch = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 20 }}
    animate={{ opacity: 0.6, scale: 1, y: 0 }}
    transition={{ duration: 1.5, ease: "easeOut" }}
    className="absolute -top-40 flex flex-col items-center"
  >
    <svg width="140" height="180" viewBox="0 0 140 180" fill="none" className="drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
      {/* Sketchy Door Outline */}
      <motion.path 
        d="M30 170 L30 30 L110 30 L110 170" 
        stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 8"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />
      {/* Door Handle */}
      <circle cx="95" cy="100" r="4" fill="white" className="opacity-80" />
      {/* 404 Room Number */}
      <motion.text 
        x="70" y="80" 
        fill="white" 
        fontSize="24" 
        fontWeight="900" 
        textAnchor="middle" 
        className="font-mono tracking-tighter"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        404
      </motion.text>
    </svg>
    <motion.span 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
      className="text-[10px] text-blue-400 font-black uppercase tracking-[0.8em] mt-6"
    >
      The Hostel
    </motion.span>
  </motion.div>
);

const SkatingStickFigure = ({ color = "#3b82f6", delay = 0, xOffset = -200 }) => (
  <motion.div
    initial={{ x: xOffset, opacity: 0, scale: 0.8 }}
    animate={{ x: 0, opacity: 1, scale: 1 }}
    transition={{ duration: 1.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className="relative"
  >
    <svg width="70" height="130" viewBox="0 0 70 130" fill="none" className="drop-shadow-[0_0_10px_rgba(59,130,246,0.4)]">
      {/* Head */}
      <motion.circle 
        cx="35" cy="25" r="12" 
        stroke={color} strokeWidth="3" 
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay }}
      />
      {/* Body */}
      <motion.line x1="35" y1="37" x2="35" y2="80" stroke={color} strokeWidth="3" strokeLinecap="round" />
      
      {/* Arms (Skating movement) */}
      <motion.line 
        x1="35" y1="50" x2="55" y2="45" 
        stroke={color} strokeWidth="3" strokeLinecap="round"
        animate={{ x2: [55, 60, 55], y2: [45, 30, 45] }} 
        transition={{ repeat: Infinity, duration: 1.5, delay: delay, ease: "easeInOut" }}
      />
      <motion.line 
        x1="35" y1="50" x2="15" y2="45" 
        stroke={color} strokeWidth="3" strokeLinecap="round"
        animate={{ x2: [15, 10, 15], y2: [45, 30, 45] }} 
        transition={{ repeat: Infinity, duration: 1.5, delay: delay + 0.2, ease: "easeInOut" }}
      />
      
      {/* Legs (Gliding) */}
      <motion.path 
        d="M35 80 L20 120 L10 125" 
        stroke={color} strokeWidth="3" strokeLinecap="round" 
        animate={{ d: ["M35 80 L20 120 L10 125", "M35 80 L15 120 L5 122", "M35 80 L20 120 L10 125"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path 
        d="M35 80 L50 120 L60 125" 
        stroke={color} strokeWidth="3" strokeLinecap="round" 
        animate={{ d: ["M35 80 L50 120 L60 125", "M35 80 L55 120 L65 122", "M35 80 L50 120 L60 125"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
    </svg>
  </motion.div>
);

const IntroPage: React.FC<IntroPageProps> = ({ onFinish }) => {
  const [phase, setPhase] = useState<'intro' | 'reveal'>('intro');

  useEffect(() => {
    const timer = setTimeout(() => setPhase('reveal'), 1800);
    const finishTimer = setTimeout(onFinish, 4800);
    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(30px)' }}
      className="fixed inset-0 z-[99999] bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
      </div>

      <div className="relative flex flex-col items-center justify-center pt-24">
        <Room404Sketch />

        <div className="flex gap-16 items-end h-40">
          <SkatingStickFigure delay={0.2} xOffset={-350} color="#3b82f6" />
          <SkatingStickFigure delay={0.5} xOffset={350} color="#60a5fa" />
          <SkatingStickFigure delay={0.8} xOffset={-450} color="#93c5fd" />
        </div>

        <div className="mt-20 text-center min-h-[120px]">
          <AnimatePresence>
            {phase === 'reveal' && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.2, ease: "circOut" }}
                className="space-y-4"
              >
                <h1 className="text-7xl md:text-9xl font-black text-white font-['Playfair_Display'] text-glow tracking-tighter leading-none">
                  FRIENDS
                </h1>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mx-auto max-w-sm"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        className="absolute bottom-12 text-[9px] font-bold text-slate-500 uppercase tracking-[1.5em]"
      >
        Initializing Secure Registry
      </motion.div>
    </motion.div>
  );
};

export default IntroPage;
