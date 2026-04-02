"use client";

import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "@/contexts/FavoriteProvider";
import { tmdbImage } from "@/lib/tmdb";

export default function FavoritesList() {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
        <span className="material-symbols-outlined text-8xl text-on-surface-variant/20">
          video_library
        </span>
        <div className="space-y-2">
          <h2 className="text-2xl font-headline font-bold text-on-surface">
            Your library is empty
          </h2>
          <p className="text-on-surface-variant max-w-md">
            Start adding movies to your favorites by clicking the heart icon on
            any movie card.
          </p>
        </div>
        <Link
          href="/movies"
          className="px-8 py-4 rounded-xl bg-primary-container text-white font-bold hover:brightness-110 transition-all active:scale-95"
        >
          Explore Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {favorites.map((movie) => {
        const year = movie.release_date?.split("-")[0] || "N/A";
        const rating = movie.vote_average?.toFixed(1) || "N/A";

        return (
          <div
            key={movie.id}
            className="flex gap-6 p-4 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors group"
          >
            {/* Poster thumbnail */}
            <Link
              href={`/movies/${movie.id}`}
              className="flex-none w-24 h-36 rounded-lg overflow-hidden bg-surface-container-high"
            >
              {movie.poster_path ? (
                <Image
                  src={tmdbImage(movie.poster_path, "w185")}
                  alt={movie.title}
                  width={185}
                  height={278}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl text-on-surface-variant/30">
                    movie
                  </span>
                </div>
              )}
            </Link>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-center min-w-0">
              <Link
                href={`/movies/${movie.id}`}
                className="font-headline font-bold text-lg text-on-surface hover:text-primary transition-colors truncate"
              >
                {movie.title}
              </Link>
              <p className="text-on-surface-variant text-sm mt-1">{year}</p>
              <div className="flex items-center gap-1 mt-2">
                <span
                  className="material-symbols-outlined text-yellow-500 text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="text-sm font-bold text-on-surface">
                  {rating}
                </span>
              </div>
              {movie.overview && (
                <p className="text-on-surface-variant text-sm mt-2 line-clamp-2 hidden sm:block">
                  {movie.overview}
                </p>
              )}
            </div>

            {/* Remove button */}
            <div className="flex items-center">
              <button
                onClick={() => removeFavorite(movie.id)}
                className="p-3 rounded-full hover:bg-error-container/20 text-on-surface-variant hover:text-error transition-all active:scale-90"
                aria-label={`Remove ${movie.title} from favorites`}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
