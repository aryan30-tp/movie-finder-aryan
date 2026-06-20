'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Film, Lock, Mail, ArrowRight } from 'lucide-react';

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
    
    // Simulate a fast, high-performance auth token handshake response frame
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-40 bg-[#0B0F19] flex items-center justify-center p-4 overflow-hidden select-none">
      {/* Absolute Ambient Background Highlights */}
      <div className="absolute top-1/4 left-1/3 w-72 h-72 rounded-full bg-brand-accent/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-brand-secondary/10 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className="w-full max-w-md bg-brand-surface/40 backdrop-blur-xl border border-gray-800/80 p-8 rounded-3xl shadow-2xl space-y-8 flex flex-col relative z-10"
      >
        {/* Core Header Identity Logo block */}
        <div className="text-center space-y-2 flex flex-col items-center">
          <div className="p-3.5 rounded-2xl bg-brand-gradient text-white shadow-xl shadow-brand-accent/20 max-w-max">
            <Film size={26} />
          </div>
          <h2 className="text-2xl font-black text-white tracking-wider mt-2">
            WELCOME TO WATCH<span className="text-brand-accent">IT</span>
          </h2>
          <p className="text-xs text-brand-textMuted tracking-wide">
            Sign in to unlock real-time streaming metrics and catalogs.
          </p>
        </div>

        {/* Input Interactive Fields Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5 relative">
            <label className="text-[10px] font-bold uppercase tracking-widest text-brand-textMuted pl-1">
              Email Address
            </label>
            <div className="relative group">
              <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-textMuted group-focus-within:text-brand-accent transition-colors" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@aryan.com"
                className="w-full bg-brand-bg/60 text-brand-textPrimary text-xs border border-gray-800/80 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/20 transition-all placeholder:text-gray-700 font-medium"
              />
            </div>
          </div>

          <div className="space-y-1.5 relative">
            <label className="text-[10px] font-bold uppercase tracking-widest text-brand-textMuted pl-1">
              Password Access Token
            </label>
            <div className="relative group">
              <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-textMuted group-focus-within:text-brand-accent transition-colors" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-brand-bg/60 text-brand-textPrimary text-xs border border-gray-800/80 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/20 transition-all placeholder:text-gray-700 font-medium tracking-widest"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3.5 px-4 rounded-xl font-extrabold text-xs tracking-widest uppercase bg-brand-gradient text-white border border-transparent hover:opacity-95 shadow-xl shadow-brand-accent/10 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed transform active:scale-98"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <>
                <span>Secure Access</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* Informative Footer Sublabel */}
        <div className="text-center pt-2 border-t border-gray-900">
          <p className="text-[10px] text-gray-600 font-mono tracking-normal">
            Secure client verification proxy // status: active
          </p>
        </div>
      </motion.div>
    </div>
  );
}