'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, ChevronLeft, ChevronRight, Star, Info, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [carouselMovies, setCarouselMovies] = useState<Movie[]>([]);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [hoveredGenre, setHoveredGenre] = useState<number | null>(null);
  
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

  useEffect(() => {
    if (carouselMovies.length === 0) return;
    const interval = setInterval(() => {
      setActiveCarouselIndex((prev) => (prev + 1) % carouselMovies.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [carouselMovies]);

  const fetchMoviesData = useCallback(async (page: number, query: string, genreId: number) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const result = await getMovies(page, query, genreId);
      setMovies(result.movies);
      setTotalPages(result.totalPages || 1);
      
      if (result.movies.length > 0 && page === 1) {
        const validBackdrops = result.movies.filter(m => m.backdrop_path || m.poster_path);
        setCarouselMovies(validBackdrops.slice(0, 4));
        setActiveCarouselIndex(0);
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
    window.scrollTo({ top: 520, behavior: 'smooth' });
  };

  const currentHero = carouselMovies[activeCarouselIndex];
  const isHeroFavorited = currentHero ? isFavorite(currentHero.id) : false;

  return (
    <div className="space-y-12 flex-grow flex flex-col relative z-10 w-full mb-6">
      
      {/* 🎬 SPOTLIGHT CAROUSEL BANNER */}
      {currentHero && !searchQuery && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[480px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl border border-gray-800/20 bg-[#070a10]"
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentHero.id}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 0.65, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${currentHero.backdrop_path || currentHero.poster_path})` }}
            />
          </AnimatePresence>
          
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/30 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-bg via-transparent to-transparent z-10 w-full md:w-3/5" />

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-14 z-20 max-w-3xl space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentHero.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2">
                  <span className="bg-brand-accent/10 border border-brand-accent/30 text-brand-accent text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm">
                    Spotlight Feature {activeCarouselIndex + 1}/4
                  </span>
                  <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-md text-xs text-amber-400 border border-gray-800/80">
                    <Star size={11} className="fill-amber-400" />
                    <span className="font-bold text-[11px]">{currentHero.vote_average.toFixed(1)}</span>
                  </div>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
                  {currentHero.title}
                </h2>
                <p className="text-xs sm:text-sm text-brand-textMuted line-clamp-3 leading-relaxed max-w-xl">
                  {currentHero.overview}
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button 
                    onClick={() => setSelectedMovie(currentHero)}
                    className="px-6 py-2.5 rounded-xl bg-white text-black font-extrabold text-xs tracking-wide flex items-center gap-2 hover:bg-brand-accent hover:text-white transition-all shadow-lg cursor-pointer transform active:scale-95"
                  >
                    <Info size={14} />
                    <span>More Info</span>
                  </button>
                  <button 
                    onClick={() => isHeroFavorited ? removeFavorite(currentHero.id) : addFavorite(currentHero)}
                    className={`px-5 py-2.5 rounded-xl font-extrabold text-xs tracking-wide flex items-center gap-2 border cursor-pointer transition-all transform active:scale-95 ${
                      isHeroFavorited 
                        ? 'bg-transparent border-pink-300 text-pink-300 hover:bg-pink-300/10' 
                        : 'bg-brand-surface/70 backdrop-blur-sm border-gray-700/80 text-white hover:border-brand-secondary'
                }`}
                  >
                    <Heart size={14} className={isHeroFavorited ? 'fill-pink-300' : ''} />
                    <span>{isHeroFavorited ? 'In Watchlist' : 'Add Watchlist'}</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute right-6 bottom-6 sm:right-10 sm:bottom-10 z-20 flex gap-2.5 bg-black/20 backdrop-blur-sm px-3 py-2 rounded-full border border-gray-800/40">
            {carouselMovies.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveCarouselIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeCarouselIndex === index ? 'w-6 bg-brand-accent' : 'w-1.5 bg-gray-600 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* SEARCH AND EXPLORATION PANEL WITH SCROLL REVEALS */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-900 pb-3">
          
          {/* Categories track with silver ray border tracer overlay attached dynamically */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full md:w-auto overflow-y-hidden scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {GENRES.map((genre) => (
              <div 
                key={genre.id} 
                className="relative rounded-xl"
                onMouseEnter={() => setHoveredGenre(genre.id)}
                onMouseLeave={() => setHoveredGenre(null)}
              >
                {/* Silver tracing track border wrapper inside categories */}
                <AnimatePresence>
                  {hoveredGenre === genre.id && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-30 rounded-xl" xmlns="http://www.w3.org/2000/svg">
                      <rect rx="12" className="w-full h-full fill-transparent stroke-white/40 stroke-[1.5]" />
                      <motion.rect
                        rx="12"
                        className="w-full h-full fill-transparent stroke-white stroke-[1.5]"
                        initial={{ strokeDasharray: "400", strokeDashoffset: "400" }}
                        animate={{ strokeDashoffset: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                      />
                    </svg>
                  )}
                </AnimatePresence>
                
                <button
                  onClick={() => setSelectedGenre(genre.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all duration-300 border ${
                    selectedGenre === genre.id
                      ? 'bg-brand-surface text-brand-accent border-brand-accent/30 shadow-md'
                      : 'bg-transparent text-brand-textMuted border-transparent hover:text-brand-textPrimary'
                  }`}
                  style={selectedGenre === genre.id ? { filter: 'drop-shadow(0px 0px 8px rgba(255, 90, 54, 0.12))' } : {}}
                >
                  {genre.name}
                </button>
              </div>
            ))}
          </div>

          {/* Search Box input node layout */}
          <div className="relative w-full md:w-64 group shrink-0">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-textMuted group-focus-within:text-brand-accent transition-colors" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search library..."
              className="w-full bg-brand-surface/40 backdrop-blur-md text-brand-textPrimary border border-gray-800/60 rounded-xl pl-9 pr-4 py-1.5 text-xs focus:outline-none focus:border-brand-accent/40 transition-all placeholder:text-brand-textMuted/40"
            />
          </div>
        </div>

        {/* DATA CONTAINER */}
        <div className="min-h-[400px] flex flex-col justify-start">
          {isLoading ? (
            <CustomActivityIndicator />
          ) : errorMsg ? (
            <div className="w-full py-20 text-center text-xs text-brand-textMuted">{errorMsg}</div>
          ) : movies.length === 0 ? (
            <div className="w-full py-24 text-center text-xs text-brand-textMuted">No movies matched selection parameters.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onViewDetails={(m) => setSelectedMovie(m)} />
              ))}
            </div>
          )}
        </div>

        {/* PAGINATION PANEL */}
        {!isLoading && !errorMsg && movies.length > 0 && (
          <div className="flex justify-between items-center pt-4 border-t border-gray-900">
            <span className="text-[10px] tracking-widest font-mono text-brand-textMuted uppercase">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2.5 rounded-xl bg-brand-surface/60 border border-gray-800/80 text-brand-textPrimary hover:border-brand-accent/40 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={12} />
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2.5 rounded-xl bg-brand-surface/60 border border-gray-800/80 text-brand-textPrimary hover:border-brand-accent/40 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={12} />
              </button>
            </div>
          </div>
        )}
      </motion.div>

      <MovieDetailModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      <Toast message={toastMessage} isVisible={isToastVisible} onClose={() => setIsToastVisible(false)} />
    </div>
  );
}