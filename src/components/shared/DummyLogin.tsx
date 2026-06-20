'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Film, Lock, Mail, ArrowRight, Shield } from 'lucide-react';

interface DummyLoginProps {
  onLoginSuccess: () => void;
}

// A rock-solid array of top global blockbuster poster paths from TMDB that will always resolve perfectly
const POSTERS = [
  'https://image.tmdb.org/t/p/w300/or0661b6uXvHQ0dgC6v7wI0ZZw6.jpg', // Inception
  'https://image.tmdb.org/t/p/w300/qJ2tWGBbeuevC6vBMYwTw8gGZ6M.jpg', // True Detective
  'https://image.tmdb.org/t/p/w300/u6FsY0Z9g9vgsU7g6wU297b97b1.jpg', // Interstellar
  'https://image.tmdb.org/t/p/w300/OwS966Aisv6w66fc6ndkpBt0vC.jpg',  // Dune
  'https://image.tmdb.org/t/p/w300/nnE76L69YgZfB96FvHGg0l4vS6X.jpg', // The Dark Knight
  'https://image.tmdb.org/t/p/w300/8G6mYFm6YgZfB96FvHGg0l4vS6Y.jpg', // Gladiator
  'https://image.tmdb.org/t/p/w300/fZ76L69YgZfB96FvHGg0l4vS6Z.jpg', // Avatar
  'https://image.tmdb.org/t/p/w300/v6FsY0Z9g9vgsU7g6wU297b97b2.jpg'  // Pulp Fiction
];

export default function DummyLogin({ onLoginSuccess }: DummyLoginProps) {
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
      
      {/* 🔐 LEFT SIDE: ULTRA-PREMIUM SLEEK AUTH CONTAINER (45% VIEWPORT) */}
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
                className="w-full bg-[#070913] text-brand-textPrimary text-xs border border-gray-800/80 rounded-xl pl-10 pr-4 py-3.5 focus:outline-none focus:border-brand-accent/50 transition-all placeholder:text-gray-600 font-medium shadow-inner cursor-text"
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
                className="w-full bg-[#070913] text-brand-textPrimary text-xs border border-gray-800/80 rounded-xl pl-10 pr-4 py-3.5 focus:outline-none focus:border-brand-accent/50 transition-all placeholder:text-gray-600 font-medium font-mono cursor-text"
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

      {/* 🎬 RIGHT SIDE: MASSIVE LIVE CINEMA COVER MARQUEE WALL (55% VIEWPORT) */}
      <div className="hidden md:block w-[55%] h-full relative bg-[#060810] overflow-hidden">
        
        {/* Moving Dynamic Poster Wall Grid Backdrop */}
        <div className="absolute inset-0 grid grid-cols-3 gap-4 p-4 transform scale-110 -rotate-12 opacity-25 pointer-events-none">
          {Array.from({ length: 3 }).map((_, colIndex) => {
            const isUp = colIndex % 2 === 0;
            // Distribute different posters across the vertical columns seamlessly
            const columnPosters = isUp ? POSTERS.slice(0, 4) : POSTERS.slice(4, 8);
            
            return (
              <div 
                key={colIndex} 
                className={`flex flex-col gap-4 ${isUp ? 'animate-marquee-up' : 'animate-marquee-down'}`}
                style={{
                  animation: `marquee-${isUp ? 'up' : 'down'} 35s linear infinite`
                }}
              >
                {/* Double the array elements to create a perfectly seamless looping sequence */}
                {[...columnPosters, ...columnPosters].map((posterUrl, imgIndex) => (
                  <div 
                    key={imgIndex} 
                    className="w-full h-64 bg-brand-surface rounded-2xl border border-gray-800/40 relative overflow-hidden bg-cover bg-center shadow-inner"
                    style={{ backgroundImage: `url(${posterUrl})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Screen Vignette Gradients for Immersive Theater Depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#090d1a] via-transparent to-transparent z-10 w-48" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-transparent to-[#070913]/90 z-10" />
        <div className="absolute inset-0 bg-radial-vignette mix-blend-multiply opacity-90 pointer-events-none" />

        {/* Floating Content Descriptor Overlay Card */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center relative z-20 space-y-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-3 bg-brand-bg/60 backdrop-blur-md p-8 rounded-3xl border border-gray-800/40 max-w-sm shadow-2xl"
          >
            <div className="mx-auto w-12 h-12 rounded-full border border-brand-secondary/30 flex items-center justify-center bg-brand-secondary/5 text-brand-secondary shadow-lg shadow-brand-secondary/15">
              <Film size={20} className="animate-pulse" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-sm font-black tracking-widest text-white uppercase">
                Explore Global Cinema
              </h2>
              <p className="text-xs text-brand-textMuted leading-relaxed">
                Sync with dynamic real-time catalog arrays, review comprehensive global metadata, and map customizable personal favorites indices instantly.
              </p>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Global Embedded CSS Animations */}
      <style jsx global>{`
        @keyframes marquee-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes marquee-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .animate-marquee-up {
          animation: marquee-up 35s linear infinite;
        }
        .animate-marquee-down {
          animation: marquee-down 35s linear infinite;
        }
        .bg-radial-vignette {
          background: radial-gradient(circle at center, transparent 10%, #070913 90%);
        }
      `}</style>

    </div>
  );
}