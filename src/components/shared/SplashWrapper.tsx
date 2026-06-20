'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film } from 'lucide-react';

export function SplashWrapper({ children }: { children: React.ReactNode }) {
  const [isLaunching, setIsLaunching] = useState(true);

  useEffect(() => {
    // Increased duration to 3200ms to make the splash screen stay longer
    const timer = setTimeout(() => {
      setIsLaunching(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLaunching ? (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#0B0F19] flex flex-col items-center justify-center gap-4"
        >
          <motion.div
            initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
            animate={{ scale: [1, 1.1, 1], rotate: 0, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="p-5 rounded-2xl bg-brand-gradient text-white shadow-2xl shadow-brand-accent/30 flex items-center justify-center"
          >
            <Film size={48} className="animate-spin-slow" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <h1 className="text-2xl font-black tracking-widest text-white">
              WATCH<span className="text-brand-accent">IT</span>
            </h1>
            <p className="text-xs text-brand-textMuted tracking-widest uppercase mt-1">Cinematic Exploration Engine</p>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div 
          key="app" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="flex flex-col min-h-screen"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}