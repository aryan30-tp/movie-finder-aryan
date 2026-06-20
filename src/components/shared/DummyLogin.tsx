'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Film, Lock, Mail, ArrowRight, Shield } from 'lucide-react';

interface DummyLoginProps {
  onLoginSuccess: () => void;
}

export function DummyLogin({ onLoginSuccess }: DummyLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[999] bg-[#070913] w-screen h-screen flex overflow-hidden select-none font-sans">
      
      {/* 🔐 LEFT SIDE: ULTRA-PREMIUM SLEEK AUTH CONTAINER (TAKES 45% OF VIEWPORT) */}
      <div className="w-full md:w-[45%] h-full bg-[#090d1a] border-r border-gray-900 flex flex-col justify-between p-8 sm:p-12 md:p-16 relative z-20 shrink-0">
        
        {/* Top Identity Tag */}
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-brand-gradient text-white shadow-lg shadow-brand-accent/20">
            <Film size={18} />
          </div>
          <span className="text-sm font-black tracking-widest text-white uppercase font-mono">
            WATCH<span className="text-brand-accent">IT</span> STUDIO
          </span>
        </div>

        {/* Input Interactive Form Stack */}
        <div className="space-y-8 my-auto max-w-sm w-full mx-auto">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Sign In
            </h1>
            <p className="text-xs text-brand-textMuted font-medium leading-relaxed">
              Enter your credential keys to access real-time metadata metrics and custom streaming watchlists.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 pt-1">
            <div className="space-y-1 relative group">
              <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-textMuted group-focus-within:text-brand-accent transition-colors" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-[#070913] text-brand-textPrimary text-xs border border-gray-800/80 rounded-xl pl-10 pr-4 py-3.5 focus:outline-none focus:border-brand-accent/50 transition-all placeholder:text-gray-600 font-medium shadow-inner"
              />
            </div>

            <div className="space-y-1 relative group">
              <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-textMuted group-focus-within:text-brand-accent transition-colors" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password token"
                className="w-full bg-[#070913] text-brand-textPrimary text-xs border border-gray-800/80 rounded-xl pl-10 pr-4 py-3.5 focus:outline-none focus:border-brand-accent/50 transition-all placeholder:text-gray-600 font-medium font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3.5 px-4 rounded-xl font-bold text-xs tracking-wider uppercase bg-brand-gradient text-white hover:opacity-95 shadow-xl shadow-brand-accent/15 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed transform active:scale-98"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footprint Metadata Trace */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-gray-600 max-w-sm mx-auto w-full">
          <Shield size={12} className="text-gray-700" />
          <span>System security token layer: ACTIVE // node-09</span>
        </div>
      </div>

      {/* 🎬 RIGHT SIDE: MASSIVE IMMERSIVE CINEMA COVER BANNER WALL (TAKES 55% OF VIEWPORT) */}
      <div className="hidden md:block w-[55%] h-full relative bg-[#060810] overflow-hidden">
        
        {/* Infinite CSS Dynamic Motion Moving Poster Wall Matrix Grid Backdrop */}
        <div className="absolute inset-0 grid grid-cols-3 gap-4 p-4 transform scale-110 -rotate-12 opacity-20 pointer-events-none">
          {Array.from({ length: 3 }).map((_, colIndex) => (
            <div 
              key={colIndex} 
              className={`flex flex-col gap-4 animate-marquee-${colIndex % 2 === 0 ? 'up' : 'down'}`}
              style={{
                animation: `marquee-${colIndex % 2 === 0 ? 'up' : 'down'} 30s linear infinite`
              }}
            >
              {Array.from({ length: 4 }).map((_, imgIndex) => (
                <div 
                  key={imgIndex} 
                  className="w-full h-56 bg-brand-surface rounded-2xl border border-gray-800/40 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                  <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">
                    Cinema Item {(colIndex * 4) + imgIndex + 1}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Master Screen Vignette Gradients for Movie Theater Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#090d1a] via-transparent to-transparent z-10 w-48" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-transparent to-[#070913]/80 z-10" />
        <div className="absolute inset-0 bg-radial-vignette mix-blend-multiply opacity-80 pointer-events-none" />

        {/* Center Floating Content Overlay Block */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center relative z-20 space-y-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-3"
          >
            <div className="mx-auto w-12 h-12 rounded-full border border-brand-secondary/30 flex items-center justify-center bg-brand-secondary/5 text-brand-secondary shadow-lg shadow-brand-secondary/15">
              <Film size={20} className="animate-pulse" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-lg font-black tracking-widest text-white uppercase">
                Explore Global Cinema
              </h2>
              <p className="text-xs text-brand-textMuted max-w-sm mx-auto leading-relaxed">
                Sync with dynamic real-time catalog arrays, review comprehensive global metadata, and map highly-customizable personal favorites indices instantly.
              </p>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Injecting keyframe animations straight into a shadow stylesheet block to ensure 100% platform stability */}
      <style jsx global>{`
        @keyframes marquee-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes marquee-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .bg-radial-vignette {
          background: radial-gradient(circle at center, transparent 20%, #070913 95%);
        }
      `}</style>

    </div>
  );
}
