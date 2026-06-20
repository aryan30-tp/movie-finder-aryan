'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Search, ChevronLeft, ChevronRight, Film } from 'lucide-react';
import { getMovies } from '@/services/tmdb';
import { Movie, useMovieStore } from '@/store/useMovieStore'; // Pulling Movie directly from the store source
import { MovieCard } from '@/components/shared/MovieCard';
import { MovieDetailModal } from '@/components/shared/MovieDetailModal';
import { GridSkeleton } from '@/components/ui/Skeleton';
import { useDebounce } from '@/hooks/useDebounce';

export default function DiscoverPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const debouncedSearch = useDebounce(searchQuery, 400);

  const fetchMoviesData = useCallback(async (page: number, query: string) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const result = await getMovies(page, query);
      setMovies(result.movies);
      setTotalPages(result.totalPages || 1);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to sync with TMDB. Please confirm API Token configurations.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    fetchMoviesData(1, debouncedSearch);
  }, [debouncedSearch, fetchMoviesData]);

  const handlePageChange = (targetPage: number) => {
    if (targetPage < 1 || targetPage > totalPages) return;
    setCurrentPage(targetPage);
    fetchMoviesData(targetPage, debouncedSearch);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 flex-grow flex flex-col">
      {/* Search Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-brand-surface border border-gray-800/40 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-black text-brand-textPrimary tracking-tight flex items-center gap-2">
            Discover Movies
          </h1>
          <p className="text-sm text-brand-textMuted">Explore live real-time metrics across absolute global favorites.</p>
        </div>

        {/* Dynamic Input Block */}
        <div className="relative w-full md:w-80 group">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-textMuted group-focus-within:text-brand-accent transition-colors" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movie by title..."
            className="w-full bg-brand-bg text-brand-textPrimary border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand-accent/60 focus:ring-1 focus:ring-brand-accent/30 transition-all placeholder:text-brand-textMuted/60"
          />
        </div>
      </div>

      {/* Primary Display Content Stream Grid */}
      <div className="flex-grow flex flex-col justify-start">
        {isLoading ? (
          <GridSkeleton />
        ) : errorMsg ? (
          <div className="w-full py-20 text-center rounded-2xl bg-red-500/5 border border-red-500/10 max-w-md mx-auto my-auto p-6 space-y-3 shadow-xl">
            <span className="text-3xl">⚠️</span>
            <h3 className="font-bold text-red-400">API Sync Disruption</h3>
            <p className="text-xs text-brand-textMuted leading-relaxed">{errorMsg}</p>
          </div>
        ) : movies.length === 0 ? (
          <div className="w-full py-24 text-center max-w-sm mx-auto my-auto space-y-4">
            <div className="p-4 rounded-full bg-brand-surface border border-gray-800 text-brand-textMuted w-16 h-16 flex items-center justify-center mx-auto shadow-md">
              <Film size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-brand-textPrimary text-lg">No Results Collected</h3>
              <p className="text-sm text-brand-textMuted">We couldn't extract listings matching your explicit query phrase.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {movies.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onViewDetails={(m) => setSelectedMovie(m)} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Strict R1 Pagination Manual Control Row */}
      {!isLoading && !errorMsg && movies.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-900 pt-6 gap-4 mt-auto">
          <p className="text-xs text-brand-textMuted font-medium">
            Showing <span className="text-brand-textPrimary font-bold">exactly 12</span> results per page
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-xl bg-brand-surface border border-gray-800 text-brand-textPrimary hover:border-brand-accent/40 disabled:opacity-30 disabled:hover:border-gray-800 transition-colors shadow-sm cursor-pointer disabled:cursor-not-allowed flex items-center justify-center"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="bg-brand-surface border border-gray-800/80 rounded-xl px-4 py-1.5 text-xs font-bold text-brand-textPrimary shadow-inner min-w-[80px] text-center">
              Page {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl bg-brand-surface border border-gray-800 text-brand-textPrimary hover:border-brand-accent/40 disabled:opacity-30 disabled:hover:border-gray-800 transition-colors shadow-sm cursor-pointer disabled:cursor-not-allowed flex items-center justify-center"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Detail Overlay Modal */}
      <MovieDetailModal 
        movie={selectedMovie} 
        onClose={() => setSelectedMovie(null)} 
      />
    </div>
  );
}