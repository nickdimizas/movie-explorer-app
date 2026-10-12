import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { Movie } from "../types/movies";

const STORAGE_KEY = "movie-explorer:favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useLocalStorage<Movie[]>(STORAGE_KEY, []);

  const isFavorite = useCallback(
    (imdbID: string) => favorites.some((movie) => movie.imdbID === imdbID),
    [favorites],
  );

  const toggleFavorite = useCallback(
    (movie: Movie) => {
      setFavorites((prev) =>
        prev.some((m) => m.imdbID === movie.imdbID)
          ? prev.filter((m) => m.imdbID !== movie.imdbID)
          : [...prev, movie],
      );
    },
    [setFavorites],
  );

  return { favorites, isFavorite, toggleFavorite };
};
