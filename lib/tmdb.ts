export interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  overview: string;
  genre_ids: number[];
}

export interface TMDBMovieDetail {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  overview: string;
  runtime: number | null;
  tagline: string;
  genres: { id: number; name: string }[];
  status: string;
  original_language: string;
}

interface TMDBResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

const GENRE_MAP: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

export function getGenreName(id: number): string {
  return GENRE_MAP[id] || "Movie";
}

export function tmdbImage(path: string | null, size = "w500"): string {
  if (!path) return "";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

function tmdbUrl(path: string, params: Record<string, string> = {}): string {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error(
      "TMDB_API_KEY is not configured. Add it to your .env.local file."
    );
  }
  const searchParams = new URLSearchParams({
    api_key: apiKey,
    language: "en-US",
    ...params,
  });
  return `https://api.themoviedb.org/3${path}?${searchParams.toString()}`;
}

export async function fetchTrendingMovies(): Promise<TMDBMovie[]> {
  const res = await fetch(tmdbUrl("/trending/movie/week"), {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`TMDB API error: ${res.status}`);
  const data: TMDBResponse = await res.json();
  return data.results;
}

export async function searchMovies(query: string): Promise<TMDBMovie[]> {
  const res = await fetch(
    tmdbUrl("/search/movie", { query, page: "1" }),
    { next: { revalidate: 600 } }
  );
  if (!res.ok) throw new Error(`TMDB API error: ${res.status}`);
  const data: TMDBResponse = await res.json();
  return data.results;
}

export async function discoverByGenre(genreId: number): Promise<TMDBMovie[]> {
  const res = await fetch(
    tmdbUrl("/discover/movie", {
      with_genres: genreId.toString(),
      sort_by: "popularity.desc",
      page: "1",
    }),
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error(`TMDB API error: ${res.status}`);
  const data: TMDBResponse = await res.json();
  return data.results;
}

export async function fetchMovieById(id: string): Promise<TMDBMovieDetail> {
  const res = await fetch(tmdbUrl(`/movie/${id}`), {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`TMDB API error: ${res.status}`);
  return res.json();
}

export interface TMDBCastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

interface TMDBCrewMember {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
}

interface TMDBCreditsResponse {
  id: number;
  cast: TMDBCastMember[];
  crew: TMDBCrewMember[];
}

export async function fetchMovieCredits(
  id: string
): Promise<{ cast: TMDBCastMember[]; director: string }> {
  const res = await fetch(tmdbUrl(`/movie/${id}/credits`), {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`TMDB API error: ${res.status}`);
  const data: TMDBCreditsResponse = await res.json();
  const director =
    data.crew.find((c) => c.job === "Director")?.name || "Unknown";
  return { cast: data.cast.slice(0, 10), director };
}

export async function fetchSimilarMovies(id: string): Promise<TMDBMovie[]> {
  const res = await fetch(tmdbUrl(`/movie/${id}/similar`, { page: "1" }), {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`TMDB API error: ${res.status}`);
  const data: TMDBResponse = await res.json();
  return data.results.slice(0, 4);
}

export async function fetchNowPlaying(): Promise<TMDBMovie[]> {
  const res = await fetch(tmdbUrl("/movie/now_playing", { page: "1" }), {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`TMDB API error: ${res.status}`);
  const data: TMDBResponse = await res.json();
  return data.results;
}

export interface TMDBGenre {
  id: number;
  name: string;
}

export async function fetchGenreList(): Promise<TMDBGenre[]> {
  const res = await fetch(tmdbUrl("/genre/movie/list"), {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error(`TMDB API error: ${res.status}`);
  const data: { genres: TMDBGenre[] } = await res.json();
  return data.genres;
}

export async function fetchTopRated(): Promise<TMDBMovie[]> {
  const res = await fetch(tmdbUrl("/movie/top_rated", { page: "1" }), {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`TMDB API error: ${res.status}`);
  const data: TMDBResponse = await res.json();
  return data.results;
}
