import { Movie } from '@/store/useMovieStore';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

/**
 * Custom fetch wrapper that handles authentication headers for the TMDB V4 API key.
 */
async function fetchFromTMDB(endpoint: string, queryParams: string = '') {
  if (!API_KEY) {
    throw new Error('TMDB API Key missing. Please check your Vercel Environment Variables.');
  }

  const url = `${BASE_URL}${endpoint}?${queryParams}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY.trim()}`
    }
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`TMDB API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export interface PaginatedResult {
  movies: Movie[];
  totalResults: number;
  totalPages: number;
}

/**
 * Handles the strict R1 requirement: exactly 12 items per page.
 * Maps standard TMDB page boundaries (20 items per page) smoothly to our client-side 12-item chunks.
 */
export async function getMovies(page: number = 1, searchQuery: string = ''): Promise<PaginatedResult> {
  const targetItemsPerPage = 12;
  
  // Calculate index window bounds needed on our continuous array stream
  const targetStartIndex = (page - 1) * targetItemsPerPage;
  const targetEndIndex = targetStartIndex + targetItemsPerPage;

  // Determine which native TMDB pages (20 items each) overlap with our 12-item page window
  const tmdbPageStart = Math.floor(targetStartIndex / 20) + 1;
  const tmdbPageEnd = Math.floor((targetEndIndex - 1) / 20) + 1;

  let combinedResults: any[] = [];
  let totalResults = 0;

  // Endpoint selector logic handling Browse vs Search streams seamlessly
  const isSearch = searchQuery.trim().length > 0;
  const endpoint = isSearch ? '/search/movie' : '/movie/popular';
  const extraParams = isSearch ? `&query=${encodeURIComponent(searchQuery)}` : '';

  try {
    if (tmdbPageStart === tmdbPageEnd) {
      // Data fits in a single API page pull
      const data = await fetchFromTMDB(endpoint, `page=${tmdbPageStart}${extraParams}`);
      combinedResults = data.results || [];
      totalResults = data.total_results || 0;
    } else {
      // Window straddles across two distinct TMDB API pages
      const [data1, data2] = await Promise.all([
        fetchFromTMDB(endpoint, `page=${tmdbPageStart}${extraParams}`),
        fetchFromTMDB(endpoint, `page=${tmdbPageEnd}${extraParams}`)
      ]);
      combinedResults = [...(data1.results || []), ...(data2.results || [])];
      totalResults = data1.total_results || 0;
    }

    // Slice the precise offset window out of our pooled collection
    const localSliceStart = targetStartIndex % 20;
    const slicedMovies = combinedResults.slice(localSliceStart, localSliceStart + targetItemsPerPage);

    // Map raw payload to our pristine internal Movie interface contract
    const movies: Movie[] = slicedMovies.map((m: any) => ({
      id: m.id,
      title: m.title,
      poster_path: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : null,
      release_date: m.release_date || 'N/A',
      vote_average: m.vote_average || 0,
      overview: m.overview || 'No description available for this movie.'
    }));

    return {
      movies,
      totalResults,
      totalPages: Math.ceil(totalResults / targetItemsPerPage)
    };
  } catch (error) {
    console.error('Failed fetching data inside movie service wrapper:', error);
    throw error;
  }
}

/**
 * Fetches a single movie's explicit complete detail fields from TMDB.
 */
export async function getMovieDetails(movieId: number): Promise<Movie> {
  const data = await fetchFromTMDB(`/movie/${movieId}`);
  return {
    id: data.id,
    title: data.title,
    poster_path: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : null,
    release_date: data.release_date || 'N/A',
    vote_average: data.vote_average || 0,
    overview: data.overview || 'No description available for this movie.'
  };
}