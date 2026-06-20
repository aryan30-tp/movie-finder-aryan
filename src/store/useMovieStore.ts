import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path?: string | null; // Added support for widescreen background visuals
  release_date: string;
  vote_average: number;
  overview: string;
}

interface MovieStore {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

export const useMovieStore = create<MovieStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (movie) =>
        set((state) => ({
          favorites: state.favorites.some((m) => m.id === movie.id)
            ? state.favorites
            : [...state.favorites, movie],
        })),
      removeFavorite: (movieId) =>
        set((state) => ({
          favorites: state.favorites.filter((m) => m.id !== movieId),
        })),
      isFavorite: (movieId) => get().favorites.some((m) => m.id === movieId),
    }),
    { name: 'watchit-favorites-storage' }
  )
);