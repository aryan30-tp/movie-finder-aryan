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

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorited) {
      const newParticles = Array.from({ length: 6 }).map((_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 60,
        y: (Math.random() - 0.5) * 60
      }));
      setParticles(newParticles);
      removeFavorite(movie.id);
      setTimeout(() => setParticles([]), 600);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div 
      onClick={() => onViewDetails(movie)}
      className="bg-brand-surface/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border border-gray-800/60 hover:border-brand-accent/30 flex flex-col h-[420px] group transition-all duration-300 relative cursor-pointer"
    >
      <div className="relative w-full h-[290px] bg-gray-900 overflow-hidden">
        {movie.poster_path ? (
          <Image 
            src={movie.poster_path} 
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover group-hover:scale-103 transition-transform duration-500"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-xs text-brand-textMuted">No Poster Found</div>
        )}

        {/* Favorite Trigger Handle */}
        <div className="absolute top-3 right-3 z-30">
          <button
            onClick={handleFavoriteToggle}
            className="p-2.5 rounded-full backdrop-blur-md bg-black/50 border border-gray-700/40 text-white hover:bg-brand-surface transition-colors shadow-md cursor-pointer relative"
          >
            <Heart 
              size={14} 
              className={`transition-colors pointer-events-none ${favorited ? 'fill-pink-300 text-pink-300' : 'text-white'}`} 
              style={favorited ? { filter: 'drop-shadow(0px 0px 6px #FFB6C1)' } : {}}
            />
            <AnimatePresence>
              {particles.map((p) => (
                <motion.span
                  key={p.id}
                  initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  animate={{ opacity: 0, scale: 0.4, x: p.x, y: p.y }}
                  exit={{ opacity: 0 }}
                  className="absolute w-1 h-1 bg-pink-300 rounded-full pointer-events-none left-1/2 top-1/2"
                />
              ))}
            </AnimatePresence>
          </button>
        </div>
        
        {/* Soft edge ambient footer mask overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-brand-surface to-transparent" />
      </div>

      {/* Meta Labels Pane */}
      <div className="p-4 flex flex-col flex-grow justify-between gap-1 bg-brand-surface/20">
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
    </div>
  );
}