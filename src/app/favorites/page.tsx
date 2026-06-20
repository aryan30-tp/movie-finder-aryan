'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, ArrowLeft } from 'lucide-react';
import { useMovieStore, Movie } from '@/store/useMovieStore';
import { MovieCard } from '@/components/shared/MovieCard';
import { MovieDetailModal } from '@/components/shared/MovieDetailModal';

export default function FavoritesDashboard() {
  const favorites = useMovieStore((state) => state.favorites);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  return (
    <div className="space-y-8 flex-grow flex flex-col">
      {/* Title Card Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-brand-surface border border-gray-800/40 p-6 md:p-8 flex items-center justify-between shadow-xl">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-black text-brand-textPrimary tracking-tight flex items-center gap-2">
            Your Watchlist
          </h1>
          <p className="text-sm text-brand-textMuted">Locally compiled tracking lists initialized via your browser storage.</p>
        </div>
        <div className="p-3 rounded-full bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary shadow-lg">
          <Heart size={20} className="fill-brand-secondary" />
        </div>
      </div>

      {/* Main Execution View Layer */}
      <div className="flex-grow flex flex-col justify-start">
        {favorites.length === 0 ? (
          <div className="w-full py-24 text-center max-w-sm mx-auto my-auto space-y-5">
            <div className="p-4 rounded-full bg-brand-surface border border-gray-800 text-brand-secondary/70 w-16 h-16 flex items-center justify-center mx-auto shadow-md">
              <Heart size={22} />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-brand-textPrimary text-lg">Your Watchlist is Vacant</h3>
              <p className="text-sm text-brand-textMuted leading-relaxed">
                Click the heart markers across standard exploration screens to pin selections instantly right here.
              </p>
            </div>
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 bg-brand-surface border border-gray-800 hover:border-brand-accent/40 text-brand-textPrimary px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors mt-2 group shadow-md"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Discover</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {favorites.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onViewDetails={(m) => setSelectedMovie(m)} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Persistent Info Overlay Trigger */}
      <MovieDetailModal 
        movie={selectedMovie} 
        onClose={() => setSelectedMovie(null)} 
      />
    </div>
  );
}