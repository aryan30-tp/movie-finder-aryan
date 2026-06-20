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
      // Trigger bursting particle dispersion array loop
      const newParticles = Array.from({ length: 6 }).map((_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 60,
        y: (Math.random() - 0.5) * 60
      }));
      setParticles(newParticles);
      removeFavorite(movie.id);
      // Clean up particle arrays out of heap memory frames
      setTimeout(() => setParticles([]), 600);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div 
      onClick={() => onViewDetails(movie)}
      className="bg-brand-surface rounded-xl overflow-hidden shadow-lg border border-gray-800/40 hover:border-brand-accent/40 cursor-pointer flex flex-col h-[430px] group transition-all duration-300 relative"
    >
      <div className="relative w-full h-[300px] bg-gray-900 overflow-hidden">
        {movie.poster_path ? (
          <Image 
            src={movie.poster_path} 
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-xs text-brand-textMuted">No Poster Found</div>
        )}

        {/* Floating Controls */}
        <div className="absolute top-3 right-3 z-30">
          <button
            onClick={handleFavoriteToggle}
            className="p-2.5 rounded-full backdrop-blur-md bg-brand-bg/60 border border-gray-700/50 text-white hover:bg-brand-surface transition-colors shadow-md cursor-pointer relative"
          >
            <Heart 
              size={16} 
              className={`transition-colors pointer-events-none ${favorited ? 'fill-pink-300 text-pink-300' : 'text-white'}`} 
              style={favorited ? { filter: 'drop-shadow(0px 0px 6px #FFB6C1)' } : {}}
            />

            {/* Particle Burst Elements Rendering Loop */}
            <AnimatePresence>
              {particles.map((p) => (
                <motion.span
                  key={p.id}
                  initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  animate={{ opacity: 0, scale: 0.4, x: p.x, y: p.y }}
                  exit={{ opacity: 0 }}
                  className="absolute w-1.5 h-1.5 bg-pink-300 rounded-full pointer-events-none left-1/2 top-1/2"
                />
              ))}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-bold text-brand-textPrimary line-clamp-1 group-hover:text-brand-accent transition-colors">{movie.title}</h3>
          <p className="text-xs text-brand-textMuted mt-1">{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-gray-800/50">
          <div className="flex items-center gap-1 bg-gray-900/60 px-2 py-1 rounded-md border border-gray-800">
            <Star size={13} className="text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-amber-400">{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}