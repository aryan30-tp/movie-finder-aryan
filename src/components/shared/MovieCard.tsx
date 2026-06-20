'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Movie, useMovieStore } from '@/store/useMovieStore';

interface Particle {
  id: number;
  x: number;
  y: number;
}

export function MovieCard({ movie, onViewDetails }: { movie: Movie; onViewDetails: (m: Movie) => void }) {
  const { addFavorite, removeFavorite, isFavorite } = useMovieStore();
  const favorited = isFavorite(movie.id);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (favorited) {
      // Trigger bursting particle dispersion array loop
      const newParticles = Array.from({ length: 8 }).map((_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 70,
        y: (Math.random() - 0.5) * 70
      }));
      setParticles(newParticles);

      // Explicit delay loop to let the burst animation complete before state drops card from Favorites View
      setTimeout(() => {
        removeFavorite(movie.id);
      }, 400);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <motion.div 
      onClick={() => onViewDetails(movie)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-brand-surface/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border border-gray-800/60 flex flex-col hxl h-[420px] group transition-all duration-300 relative cursor-pointer"
    >
      {/* 🏎️ INFINITE SILVER LIGHT LOOP HIGHLIGHT OVERLAY (HOVER DRIVEN) */}
      <AnimatePresence>
        {isHovered && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-30 rounded-2xl" xmlns="http://www.w3.org/2000/svg">
            <rect rx="16" className="w-full h-full fill-transparent stroke-gray-400/40 stroke-2" />
            <motion.rect
              rx="16"
              className="w-full h-full fill-transparent stroke-white stroke-2 shadow-2xl"
              initial={{ strokeDasharray: "1200", strokeDashoffset: "1200" }}
              animate={{ strokeDashoffset: 0 }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
              style={{ filter: 'drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.5))' }}
            />
          </svg>
        )}
      </AnimatePresence>

      <div className="relative w-full h-[290px] bg-gray-900 overflow-hidden">
        {movie.poster_path ? (
          <Image 
            src={movie.poster_path} 
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover group-hover:scale-102 transition-transform duration-500"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-xs text-brand-textMuted">No Poster Found</div>
        )}

        {/* Favorite Trigger Overlay */}
        <div className="absolute top-3 right-3 z-40">
          <button
            onClick={handleFavoriteToggle}
            className="p-2.5 rounded-full backdrop-blur-md bg-black/50 border border-gray-700/40 text-white hover:bg-brand-surface transition-colors shadow-md cursor-pointer relative z-50"
          >
            <Heart 
              size={14} 
              className={`transition-colors pointer-events-none relative z-50 ${favorited ? 'fill-pink-300 text-pink-300' : 'text-white'}`} 
              style={favorited ? { filter: 'drop-shadow(0px 0px 6px #FFB6C1)' } : {}}
            />
            {/* Exploding Particles Array Frame */}
            {particles.map((p) => (
              <motion.span
                key={p.id}
                initial={{ opacity: 1, scale: 1.2, x: 0, y: 0 }}
                animate={{ opacity: 0, scale: 0.2, x: p.x, y: p.y }}
                className="absolute w-1.5 h-1.5 bg-pink-300 rounded-full pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
              />
            ))}
          </button>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-brand-surface to-transparent" />
      </div>

      <div className="p-4 flex flex-col flex-grow justify-between gap-1 bg-brand-surface/20 relative z-10">
        <div className="space-y-0.5">
          <h3 className="font-bold text-brand-textPrimary line-clamp-1 group-hover:text-brand-accent transition-colors text-sm">
            {movie.title}
          </h3>
          <p className="text-[11px] font-medium text-brand-textMuted">
            {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
          </p>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-gray-800/40">
          <div className="flex items-center gap-1 bg-black/30 px-2 py-0.5 rounded border border-gray-800">
            <Star size={11} className="text-amber-400 fill-amber-400" />
            <span className="text-[11px] font-black text-amber-400">{movie.vote_average.toFixed(1)}</span>
          </div>
          <span className="text-[11px] text-brand-accent font-bold opacity-0 group-hover:opacity-100 transition-opacity">
            Details →
          </span>
        </div>
      </div>
    </motion.div>
  );
}