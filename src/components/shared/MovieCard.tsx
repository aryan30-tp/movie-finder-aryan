'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Movie, useMovieStore } from '@/store/useMovieStore';

interface MovieCardProps {
  movie: Movie;
  onViewDetails: (movie: Movie) => void;
}

export function MovieCard({ movie, onViewDetails }: MovieCardProps) {
  const { addFavorite, removeFavorite, isFavorite } = useMovieStore();
  const favorited = isFavorite(movie.id);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorited) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <motion.div 
      onClick={() => onViewDetails(movie)}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-brand-surface rounded-xl overflow-hidden shadow-lg border border-gray-800/40 hover:border-brand-accent/30 cursor-pointer flex flex-col h-[430px] group transition-colors"
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
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-xs text-brand-textMuted">
            <span className="text-xl mb-2">🎬</span>
            <span>No Poster Found</span>
          </div>
        )}
        <div className="absolute top-3 right-3 z-10">
          <motion.button
            whileTap={{ scale: 0.7 }}
            onClick={handleFavoriteToggle}
            className="p-2.5 rounded-full backdrop-blur-md bg-brand-bg/60 border border-gray-700/50 text-white hover:bg-brand-surface transition-colors shadow-md"
          >
            <Heart 
              size={16} 
              className={`transition-colors ${favorited ? 'fill-brand-secondary text-brand-secondary' : 'text-white hover:text-brand-secondary'}`} 
            />
          </motion.button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-surface to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-4 flex flex-col flex-grow justify-between gap-2">
        <div>
          <h3 className="font-bold text-brand-textPrimary line-clamp-1 group-hover:text-brand-accent transition-colors">
            {movie.title}
          </h3>
          <p className="text-xs text-brand-textMuted mt-1">
            {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
          </p>
        </div>
        
        <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-800/50">
          <div className="flex items-center gap-1.5 bg-gray-900/60 px-2 py-1 rounded-md border border-gray-800">
            <Star size={13} className="text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-amber-400">{movie.vote_average.toFixed(1)}</span>
          </div>
          <span className="text-xs text-brand-accent opacity-0 group-hover:opacity-100 font-semibold transition-all translate-x-2 group-hover:translate-x-0">
            View Info →
          </span>
        </div>
      </div>
    </motion.div>
  );
}