"use client";

import { useFavorites } from "@/contexts/FavoriteProvider";
import type { TMDBMovie } from "@/lib/tmdb";

interface FavoriteButtonProps {
  movie: TMDBMovie;
}

export default function FavoriteButton({ movie }: FavoriteButtonProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorited = isFavorite(movie.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorited) {
      removeFavorite(movie.id);
    } else {
      addFavorite({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        overview: movie.overview,
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-10 h-10 rounded-full glass-search flex items-center justify-center text-white hover:bg-primary-container transition-colors z-10"
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
    >
      <span
        className="material-symbols-outlined"
        style={{
          fontVariationSettings: favorited
            ? "'FILL' 1, 'wght' 400"
            : "'FILL' 0, 'wght' 400",
        }}
      >
        favorite
      </span>
    </button>
  );
}
