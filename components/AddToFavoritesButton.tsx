"use client";

import { useFavorites } from "@/contexts/FavoriteProvider";
import type { TMDBMovieDetail } from "@/lib/tmdb";

interface AddToFavoritesButtonProps {
  movie: TMDBMovieDetail;
}

export default function AddToFavoritesButton({
  movie,
}: AddToFavoritesButtonProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorited = isFavorite(movie.id);

  const handleClick = () => {
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
      className={`px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 ${
        favorited
          ? "bg-primary text-on-primary"
          : "bg-surface-variant text-on-surface hover:bg-surface-bright"
      }`}
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
      {favorited ? "IN FAVORITES" : "ADD TO FAVORITES"}
    </button>
  );
}
