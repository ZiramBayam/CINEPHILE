"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  overview: string;
}

interface FavoriteContextType {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export function FavoriteProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  const addFavorite = useCallback((movie: Movie) => {
    setFavorites((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  }, []);

  const removeFavorite = useCallback((movieId: number) => {
    setFavorites((prev) => prev.filter((m) => m.id !== movieId));
  }, []);

  const isFavorite = useCallback(
    (movieId: number) => favorites.some((m) => m.id === movieId),
    [favorites]
  );

  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoriteProvider");
  }
  return context;
}
