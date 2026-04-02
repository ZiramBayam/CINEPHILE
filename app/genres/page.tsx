export const dynamic = 'force-dynamic';

import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { fetchGenreList, discoverByGenre, tmdbImage } from "@/lib/tmdb";

export const metadata: Metadata = {
  title: "Genres — CINEPHILE",
  description: "Browse movies by genre. Discover action, comedy, drama, horror, sci-fi, and more.",
};

const GENRE_ICONS: Record<number, string> = {
  28: "local_fire_department",
  12: "explore",
  16: "animation",
  35: "sentiment_very_satisfied",
  80: "gavel",
  99: "videocam",
  18: "theater_comedy",
  10751: "family_restroom",
  14: "auto_awesome",
  36: "history_edu",
  27: "skull",
  10402: "music_note",
  9648: "mystery",
  10749: "favorite",
  878: "rocket_launch",
  10770: "tv",
  53: "bolt",
  10752: "shield",
  37: "landscape",
};

export default async function GenresPage() {
  const genres = await fetchGenreList();

  // Fetch a preview poster for each genre (first result)
  const genrePreviews = await Promise.all(
    genres.map(async (genre) => {
      const movies = await discoverByGenre(genre.id);
      return {
        genre,
        posterPath: movies[0]?.poster_path || null,
        movieCount: movies.length,
      };
    })
  );

  return (
    <main>
      {/* Header */}
      <section className="relative w-full py-16 px-8 flex flex-col items-center">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-container-low to-surface opacity-40" />
        <div className="text-center space-y-4 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-black font-headline tracking-tighter text-on-surface">
            Browse by <span className="text-primary-container">Genre</span>
          </h1>
          <p className="text-on-surface-variant text-lg">
            Explore our collection organized by the genres you love most.
          </p>
        </div>
      </section>

      {/* Genre Grid */}
      <section className="px-8 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {genrePreviews.map(({ genre, posterPath }) => (
            <Link
              key={genre.id}
              href={`/movies?genre=${genre.id}`}
              className="group relative h-48 rounded-xl overflow-hidden bg-surface-container-high transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* Background poster (blurred) */}
              {posterPath && (
                <Image
                  src={tmdbImage(posterPath, "w500")}
                  alt={genre.name}
                  width={500}
                  height={750}
                  className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500 group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="material-symbols-outlined text-primary text-3xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {GENRE_ICONS[genre.id] || "category"}
                  </span>
                </div>
                <h3 className="font-headline font-bold text-xl text-white group-hover:text-primary transition-colors">
                  {genre.name}
                </h3>
                <p className="text-on-surface-variant/60 text-sm mt-1">
                  Explore →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
