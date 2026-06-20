'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, ChevronLeft, ChevronRight, Star, Info, Heart } from 'lucide-react';
import { getMovies } from '@/services/tmdb';
import { Movie, useMovieStore } from '@/store/useMovieStore';
import { MovieCard } from '@/components/shared/MovieCard';
import { MovieDetailModal } from '@/components/shared/MovieDetailModal';
import { CustomActivityIndicator } from '@/components/ui/Skeleton';
import { Toast } from '@/components/ui/Toast';
import { useDebounce } from '@/hooks/useDebounce';

const GENRES = [
  { id: 0, name: 'Trending Now' },
  { id: 28, name: 'Action Thrillers' },
  { id: 35, name: 'Blockbuster Comedy' },
  { id: 18, name: 'Deep Dramas' },
  { id: 878, name: 'Sci-Fi Horizons' },
  { id: 27, name: 'Horror Nights' }
];

export default function DiscoverPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [heroMovie, setHeroMovie] = useState<Movie | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 400);
  const favorites = useMovieStore((state) => state.favorites);
  const { addFavorite, removeFavorite, isFavorite } = useMovieStore();
  const prevFavoritesRef = useRef<Movie[]>(favorites);

  useEffect(() => {
    const prevFavs = prevFavoritesRef.current;
    if (favorites.length > prevFavs.length) {
      const added = favorites.find((m: Movie) => !prevFavs.some((p: Movie) => p.id === m.id));
      if (added) { setToastMessage(`Added "${added.title}" to Watchlist`); setIsToastVisible(true); }
    } else if (favorites.length < prevFavs.length) {
      const removed = prevFavs.find((m: Movie) => !favorites.some((p: Movie) => p.id === m.id));
      if (removed) { setToastMessage(`Removed "${removed.title}" from Watchlist`); setIsToastVisible(true); }
    }
    prevFavoritesRef.current = favorites;
  }, [favorites]);

  const fetchMoviesData = useCallback(async (page: number, query: string, genreId: number) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const result = await getMovies(page, query, genreId);
      setMovies(result.movies);
      setTotalPages(result.totalPages || 1);
      
      // Select the first movie with a valid backdrop to serve as the hero feature spot
      if (result.movies.length > 0 && page === 1) {
        const foundHero = result.movies.find(m => m.backdrop_path) || result.movies[0];
        setHeroMovie(foundHero);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'API stream sync dropped.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    fetchMoviesData(1, debouncedSearch, selectedGenre);
  }, [debouncedSearch, selectedGenre, fetchMoviesData]);

  const handlePageChange = (targetPage: number) => {
    if (targetPage < 1 || targetPage > totalPages) return;
    setCurrentPage(targetPage);
    fetchMoviesData(targetPage, debouncedSearch, selectedGenre);
    window.scrollTo({ top: 380, behavior: 'smooth' }); // Smooth scrolls right to the grid content line
  };

  const isHeroFavorited = heroMovie ? isFavorite(heroMovie.id) : false;

  return (
    <div className="space-y-12 flex-grow flex flex-col relative z-10 w-full">
      
      {/* 🎬 PLATFORM-GRADE HERO SPOTLIGHT CANVAS */}
      {heroMovie && !searchQuery && (
        <div className="relative w-full h-[480px] md:h-[540px] rounded-3xl overflow-hidden shadow-2xl border border-gray-800/40 group bg-black">
          {/* Backdrop Image Frame */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-102 group-hover:scale-100 opacity-65"
            style={{ backgroundImage: `url(${heroMovie.backdrop_path || heroMovie.poster_path})` }}
          />
          {/* Cinema Vignette Gradient Mask Plates */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-bg via-transparent to-transparent z-10 w-full md:w-2/3" />

          {/* Core Text Elements Layer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-20 max-w-2xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="bg-brand-accent/10 border border-brand-accent/40 text-brand-accent text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm">
                Spotlight Feature
              </span>
              <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-md text-xs text-amber-400 border border-gray-800">
                <Star size={12} className="fill-amber-400" />
                <span className="font-bold">{heroMovie.vote_average.toFixed(1)}</span>
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none drop-shadow-md">
              {heroMovie.title}
            </h2>
            <p className="text-sm text-brand-textMuted line-clamp-3 leading-relaxed drop-shadow">
              {heroMovie.overview}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button 
                onClick={() => setSelectedMovie(heroMovie)}
                className="px-6 py-3 rounded-xl bg-white text-black font-bold text-xs tracking-wide flex items-center gap-2 hover:bg-brand-accent hover:text-white transition-all shadow-lg cursor-pointer transform active:scale-98"
              >
                <Info size={15} />
                <span>More Info</span>
              </button>
              <button 
                onClick={() => isHeroFavorited ? removeFavorite(heroMovie.id) : addFavorite(heroMovie)}
                className={`px-5 py-3 rounded-xl font-bold text-xs tracking-wide flex items-center gap-2 border cursor-pointer transition-all transform active:scale-98 ${
                  isHeroFavorited 
                    ? 'bg-transparent border-pink-300 text-pink-300 hover:bg-pink-300/10' 
                    : 'bg-brand-surface/80 backdrop-blur-sm border-gray-700 text-white hover:border-brand-secondary'
                }`}
              >
                <Heart size={15} className={isHeroFavorited ? 'fill-pink-300' : ''} />
                <span>{isHeroFavorited ? 'In Watchlist' : 'Add Watchlist'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SEARCH AND EXPLORATION CONTROL CONSOLE */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-900 pb-4">
          {/* Subcategory Filter Nav Tracks */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar w-full md:w-auto">
            {GENRES.map((genre) => (
              <button
                key={genre.id}
                onClick={() => setSelectedGenre(genre.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all duration-300 border ${
                  selectedGenre === genre.id
                    ? 'bg-brand-surface text-brand-accent border-brand-accent/40 shadow-lg shadow-brand-accent/5 scale-102'
                    : 'bg-transparent text-brand-textMuted border-transparent hover:text-brand-textPrimary'
                }`}
                style={selectedGenre === genre.id ? { filter: 'drop-shadow(0px 0px 8px rgba(255, 90, 54, 0.15))' } : {}}
              >
                {genre.name}
              </button>
            ))}
          </div>

          {/* Unified Compact Global Search input */}
          <div className="relative w-full md:w-72 group shrink-0">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-textMuted group-focus-within:text-brand-accent transition-colors" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search library..."
              className="w-full bg-brand-surface/40 backdrop-blur-md text-brand-textPrimary border border-gray-800/80 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-brand-accent/50 transition-all placeholder:text-brand-textMuted/50"
            />
          </div>
        </div>

        {/* DATA CONTAINER INTERFACE RENDERING PANEL */}
        <div className="min-h-[300px] flex flex-col justify-start">
          {isLoading ? (
            <CustomActivityIndicator />
          ) : errorMsg ? (
            <div className="w-full py-20 text-center text-xs text-brand-textMuted">{errorMsg}</div>
          ) : movies.length === 0 ? (
            <div className="w-full py-24 text-center text-xs text-brand-textMuted">No movies matching filters could be parsed.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onViewDetails={(m) => setSelectedMovie(m)} />
              ))}
            </div>
          )}
        </div>

        {/* MANUAL NAVIGATION PAGINATION GRID OVERLAY */}
        {!isLoading && !errorMsg && movies.length > 0 && (
          <div className="flex justify-between items-center pt-4 border-t border-gray-900">
            <span className="text-[11px] tracking-wide font-mono text-brand-textMuted uppercase">
              Index segment {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2.5 rounded-xl bg-brand-surface/60 border border-gray-800/80 text-brand-textPrimary hover:border-brand-accent/40 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2.5 rounded-xl bg-brand-surface/60 border border-gray-800/80 text-brand-textPrimary hover:border-brand-accent/40 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      <MovieDetailModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      <Toast message={toastMessage} isVisible={isToastVisible} onClose={() => setIsToastVisible(false)} />
    </div>
  );
}