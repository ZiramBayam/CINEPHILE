import type { Metadata } from "next";
import { fetchNowPlaying } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";

export const metadata: Metadata = {
  title: "New Releases — CINEPHILE",
  description: "Discover the latest movies now playing in cinemas around the world.",
};

export default async function NewReleasesPage() {
  const movies = await fetchNowPlaying();

  return (
    <main>
      {/* Header */}
      <section className="relative w-full py-16 px-8 flex flex-col items-center">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-container-low to-surface opacity-40" />
        <div className="text-center space-y-4 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-black font-headline tracking-tighter text-on-surface">
            New <span className="text-primary-container">Releases</span>
          </h1>
          <p className="text-on-surface-variant text-lg">
            The latest films now playing in cinemas worldwide. Updated daily.
          </p>
        </div>
      </section>

      {/* Movie Grid */}
      <section className="px-8 mt-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-black font-headline tracking-tight text-on-surface">
              Now Playing
            </h2>
            <div className="h-1 w-12 bg-primary-container mt-1" />
          </div>
          <span className="text-sm text-on-surface-variant">
            {movies.length} titles
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </main>
  );
}
