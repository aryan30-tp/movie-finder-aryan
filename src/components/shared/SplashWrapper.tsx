'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film } from 'lucide-react';

export function SplashWrapper({ children }: { children: React.ReactNode }) {
  const [isLaunching, setIsLaunching] = useState(true);

  useEffect(() => {
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
          className="fixed inset-0 z-50 bg-[#0B0F19] flex flex-col items-center justify-center gap-6"
        >
          <div className="relative p-8 flex items-center justify-center">
            {/* Elegant SVG Neon Circle Drawing Path */}
            <svg className="absolute w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
              <motion.circle
                cx="50"
                cy="50"
                r="46"
                stroke="#F6F8FA"
                strokeWidth="2"
                fill="transparent"
                strokeLinecap="round"
                initial={{ strokeDasharray: "289", strokeDashoffset: "289" }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                style={{ filter: 'drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.6))' }}
              />
            </svg>

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 150 }}
              className="p-4 rounded-xl bg-brand-gradient text-white shadow-xl shadow-brand-accent/20"
            >
              <Film size={36} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <h1 className="text-2xl font-black tracking-widest text-white">
              WATCH<span className="text-brand-accent">IT</span>
            </h1>
            <p className="text-[10px] text-brand-textMuted tracking-widest uppercase mt-1">Cinematic Exploration Engine</p>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col min-h-screen w-full">
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}