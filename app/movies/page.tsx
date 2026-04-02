import { Suspense } from "react";
import {
  fetchTrendingMovies,
  searchMovies,
  discoverByGenre,
  getGenreName,
} from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import GenreFilter from "@/components/GenreFilter";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Movies — CINEPHILE",
  description:
    "Search, filter by genre, and discover the best movies curated from around the world.",
};

interface MoviesPageProps {
  searchParams: Promise<{ q?: string; genre?: string }>;
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const { q, genre } = await searchParams;

  let movies;
  let heading = "Trending Now";

  if (q) {
    movies = await searchMovies(q);
    heading = `Results for "${q}"`;
  } else if (genre) {
    const genreId = parseInt(genre);
    movies = await discoverByGenre(genreId);
    heading = getGenreName(genreId);
  } else {
    movies = await fetchTrendingMovies();
  }

  return (
    <main>
      {/* ── Search & Filters Spotlight ── */}
      <section className="relative w-full py-16 px-8 flex flex-col items-center">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-container-low to-surface opacity-40" />

        <div className="w-full max-w-4xl space-y-10">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-black font-headline tracking-tighter text-on-surface drop-shadow-lg">
              Discover{" "}
              <span className="text-primary-container">Masterpieces</span>
            </h1>
            <p className="text-on-surface-variant text-lg max-w-2xl mx-auto font-body">
              Browse our curated selection of high-fidelity cinema and exclusive
              series from across the globe.
            </p>
          </div>

          <Suspense>
            <SearchBar />
          </Suspense>

          <div className="flex flex-col items-center space-y-4">
            <Suspense>
              <GenreFilter />
            </Suspense>
          </div>
        </div>
      </section>

      {/* ── Movie Grid ── */}
      <section className="px-8 mt-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-black font-headline tracking-tight text-on-surface">
              {heading}
            </h2>
            <div className="h-1 w-12 bg-primary-container mt-1" />
          </div>
          {movies.length > 0 && (
            <span className="text-sm text-on-surface-variant">
              {movies.length} result{movies.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant/30">
              search_off
            </span>
            <p className="text-on-surface-variant text-lg">
              No movies found. Try a different search or genre.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
