'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Film, Lock, Mail, ArrowRight, Shield, Play } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 bg-[#070913] flex items-center justify-center min-h-screen w-full overflow-hidden select-none font-sans">
      
      {/* 🔮 CINEMATIC AMBIENT BACKGROUND GRADIENT MESH */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-secondary/10 blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-brand-accent/5 blur-[130px] pointer-events-none mix-blend-screen" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b0f19_1px,transparent_1px),linear-gradient(to_bottom,#0b0f19_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25" />

      {/* 📦 SPLIT COLUMN WORKSPACE PLATFORM CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 18 }}
        className="w-full max-w-4xl h-[560px] bg-[#0d1222]/50 border border-gray-800/60 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 relative z-10 mx-4"
      >
        
        {/* 🔐 LEFT PANEL: THE AUTHENTICATION INTERFACE FORM */}
        <div className="p-8 flex flex-col justify-between h-full bg-[#090d1a]/80 relative z-20">
          {/* Top Brand Tagging */}
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-brand-gradient text-white shadow-md shadow-brand-accent/10">
              <Film size={16} />
            </div>
            <span className="text-sm font-black tracking-widest text-white uppercase">
              WATCH<span className="text-brand-accent">IT</span> MATRIX
            </span>
          </div>

          {/* Core Input Stack Form */}
          <div className="space-y-6 my-auto">
            <div className="space-y-1">
              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
                Sign In
              </h1>
              <p className="text-xs text-brand-textMuted font-medium">
                Access your personalized cinema tracking metrics panel.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-1">
              <div className="space-y-1 relative">
                <div className="relative group">
                  <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-textMuted group-focus-within:text-brand-accent transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full bg-[#070913]/90 text-brand-textPrimary text-xs border border-gray-800 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-brand-accent/40 transition-all placeholder:text-gray-600 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1 relative">
                <div className="relative group">
                  <Lock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-textMuted group-focus-within:text-brand-accent transition-colors" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-[#070913]/90 text-brand-textPrimary text-xs border border-gray-800 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-brand-accent/40 transition-all placeholder:text-gray-600 font-medium font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs tracking-wider uppercase bg-brand-gradient text-white hover:opacity-95 shadow-lg shadow-brand-accent/10 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed transform active:scale-98"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight size={13} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Secure Client Identification Meta */}
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-600 border-t border-gray-900/60 pt-4">
            <Shield size={11} />
            <span>Authenticated session channel handler // proxy active</span>
          </div>
        </div>

        {/* 🎬 RIGHT PANEL: PREMIUM PREVIEW BRANDING CLUSTER DISPLAY */}
        <div className="hidden md:flex relative h-full bg-[#0b0f19] items-center justify-center border-l border-gray-900 overflow-hidden px-6">
          {/* Embedded Background Wallpaper Element */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-15 filter grayscale blur-[1px]"
            style={{ backgroundImage: 'url(https://image.tmdb.org/t/p/w500/or0661b6uXvHQ0dgC6v7wI0ZZw6.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090d1a] via-transparent to-transparent z-10" />

          {/* Overlapping Content Mock-up Stack Layers */}
          <div className="relative z-20 w-full max-w-sm space-y-6 text-center flex flex-col items-center">
            
            {/* Interactive Visual Glass Plate Mockup */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-48 h-64 bg-brand-surface/30 backdrop-blur-md rounded-2xl border border-gray-800/60 shadow-2xl relative p-3 overflow-hidden flex flex-col justify-end group cursor-default"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-80"
                style={{ backgroundImage: 'url(https://image.tmdb.org/t/p/w500/or0661b6uXvHQ0dgC6v7wI0ZZw6.jpg)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              <div className="relative z-10 flex items-center justify-between w-full">
                <div className="space-y-0.5 text-left">
                  <p className="text-[10px] font-black tracking-wide text-white uppercase truncate max-w-[100px]">Inception</p>
                  <p className="text-[8px] font-bold text-brand-accent font-mono">Sci-Fi Masterpiece</p>
                </div>
                <div className="p-1.5 rounded-full bg-brand-accent text-white shadow shadow-brand-accent/30 scale-90">
                  <Play size={10} className="fill-white pl-[1px]" />
                </div>
              </div>
            </motion.div>

            <div className="space-y-1.5">
              <h3 className="text-sm font-black tracking-widest text-white uppercase">
                Explore The Library
              </h3>
              <p className="text-[11px] text-brand-textMuted leading-relaxed max-w-xs mx-auto">
                Sync with world-class catalogs, read accurate user review scoreboards, and build persistent personalized tracking list matrices.
              </p>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}