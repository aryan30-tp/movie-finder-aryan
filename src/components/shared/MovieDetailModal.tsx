'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, Star, Heart, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Movie, useMovieStore } from '@/store/useMovieStore';

interface MovieDetailModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export function MovieDetailModal({ movie, onClose }: MovieDetailModalProps) {
  const { addFavorite, removeFavorite, isFavorite } = useMovieStore();
  const favorited = movie ? isFavorite(movie.id) : false;

  useEffect(() => {
    if (movie) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [movie]);

  if (!movie) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="bg-brand-surface w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-gray-800 relative z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-y-visible"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-brand-bg/80 text-brand-textPrimary hover:bg-brand-accent hover:text-white transition-colors border border-gray-700/40"
          >
            <X size={18} />
          </button>

          <div className="relative w-full md:w-[320px] h-[340px] md:h-[480px] shrink-0 bg-gray-900">
            {movie.poster_path ? (
              <Image 
                src={movie.poster_path} 
                alt={movie.title}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-4 text-brand-textMuted">
                <span className="text-3xl mb-2">🎬</span>
                <span>No Poster Available</span>
              </div>
            )}
          </div>

          <div className="p-6 md:p-8 flex flex-col justify-between flex-grow gap-6 bg-gradient-to-br from-brand-surface to-brand-bg">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-brand-textPrimary tracking-tight">
                {movie.title}
              </h2>
              
              <div className="flex flex-wrap gap-3 items-center text-sm">
                <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-md font-bold">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span>{movie.vote_average.toFixed(1)} / 10</span>
                </div>
                <div className="flex items-center gap-1.5 bg-gray-800 text-brand-textMuted px-2.5 py-1 rounded-md">
                  <Calendar size={14} />
                  <span>{movie.release_date}</span>
                </div>
              </div>

              <div className="h-[1px] w-full bg-gray-800/60" />

              <div className="space-y-2">
                <h4 className="text-xs uppercase font-bold tracking-widest text-brand-accent">Overview</h4>
                <p className="text-sm leading-relaxed text-brand-textMuted max-h-[160px] md:max-h-none overflow-y-auto">
                  {movie.overview}
                </p>
              </div>
            </div>

            <button
              onClick={() => favorited ? removeFavorite(movie.id) : addFavorite(movie)}
              className={`w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 border shadow-lg transition-all active:scale-98 ${
                favorited 
                  ? 'bg-transparent border-pink-300 text-pink-300 hover:bg-pink-300/10' 
                  : 'bg-brand-gradient border-transparent text-white hover:opacity-90 shadow-brand-accent/10'
              }`}
            >
              <Heart size={16} className={favorited ? 'fill-pink-300 text-pink-300' : ''} />
              <span>{favorited ? 'Remove From Favorites' : 'Add to Favorites'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}