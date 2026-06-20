'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function CustomActivityIndicator() {
  return (
    <div className="w-full py-32 flex flex-col items-center justify-center gap-4">
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Outer glowing neon ring */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="absolute inset-0 rounded-full border-4 border-t-brand-accent border-r-brand-secondary border-b-transparent border-l-transparent"
          style={{ filter: 'drop-shadow(0px 0px 12px #FF2E93)' }}
        />
        {/* Inner reverse ring */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          className="absolute w-10 h-10 rounded-full border-2 border-b-white border-l-white border-t-transparent border-r-transparent opacity-60"
        />
      </div>
      <p className="text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-brand-accent to-brand-secondary bg-clip-text text-transparent animate-pulse mt-2">
        Syncing Cinema Stream...
      </p>
    </div>
  );
}

export function MovieCardSkeleton() {
  return (
    <div className="bg-brand-surface rounded-xl overflow-hidden shadow-lg border border-gray-800/50 flex flex-col h-[420px]">
      <div className="w-full h-[300px] bg-gray-900/40" />
      <div className="p-4 flex flex-col flex-grow gap-3">
        <div className="h-4 bg-gray-800 rounded w-3/4" />
        <div className="h-3 bg-gray-800 rounded w-1/4" />
      </div>
    </div>
  );
}