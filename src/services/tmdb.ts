import { Movie } from '@/store/useMovieStore';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchFromTMDB(endpoint: string, queryParams: string = '') {
  if (!API_KEY) throw new Error('TMDB API Key missing.');
  
  const url = `${BASE_URL}${endpoint}?${queryParams}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY.trim()}`
    }
  });
  if (!response.ok) throw new Error(`TMDB API Error: ${response.status}`);
  return response.json();
}

export interface PaginatedResult {
  movies: Movie[];
  totalResults: number;
  totalPages: number;
}

export async function getMovies(page: number = 1, searchQuery: string = '', genreId: number = 0): Promise<PaginatedResult> {
  const targetItemsPerPage = 12;
  const targetStartIndex = (page - 1) * targetItemsPerPage;
  const targetEndIndex = targetStartIndex + targetItemsPerPage;

  const tmdbPageStart = Math.floor(targetStartIndex / 20) + 1;
  const tmdbPageEnd = Math.floor((targetEndIndex - 1) / 20) + 1;

  let combinedResults: any[] = [];
  let totalResults = 0;

  // Build the route strings dynamically to target the production discover channels
  const isSearch = searchQuery.trim().length > 0;
  let endpoint = '/movie/popular';
  let queryParams = '';

  if (isSearch) {
    endpoint = '/search/movie';
    queryParams = `query=${encodeURIComponent(searchQuery)}`;
  } else if (genreId !== 0) {
    endpoint = '/discover/movie';
    queryParams = `with_genres=${genreId}&sort_by=popularity.desc`;
  } else {
    endpoint = '/movie/popular';
  }

  try {
    if (tmdbPageStart === tmdbPageEnd) {
      const data = await fetchFromTMDB(endpoint, `${queryParams}&page=${tmdbPageStart}`);
      combinedResults = data.results || [];
      totalResults = data.total_results || 0;
    } else {
      const [data1, data2] = await Promise.all([
        fetchFromTMDB(endpoint, `${queryParams}&page=${tmdbPageStart}`),
        fetchFromTMDB(endpoint, `${queryParams}&page=${tmdbPageEnd}`)
      ]);
      combinedResults = [...(data1.results || []), ...(data2.results || [])];
      totalResults = data1.total_results || 0;
    }

    const localSliceStart = targetStartIndex % 20;
    const slicedMovies = combinedResults.slice(localSliceStart, localSliceStart + targetItemsPerPage);

    const movies: Movie[] = slicedMovies.map((m: any) => ({
      id: m.id,
      title: m.title,
      // Map backdrops for the heavy hero display layer
      poster_path: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : null,
      backdrop_path: m.backdrop_path ? `https://image.tmdb.org/t/p/original${m.backdrop_path}` : null,
      release_date: m.release_date || 'N/A',
      vote_average: m.vote_average || 0,
      overview: m.overview || 'No description available.'
    }));

    // Soft cap layout total results matrix to match client thresholds safely
    const maxAllowedResults = Math.min(totalResults, 400);

    return {
      movies,
      totalResults: maxAllowedResults,
      totalPages: Math.ceil(maxAllowedResults / targetItemsPerPage)
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}