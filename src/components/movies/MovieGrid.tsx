import type { Movie } from "../../types/movies";
import { MovieCard } from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  isLoading: boolean;
  isError: boolean;
  onSelectMovie: (imdbID: string) => void;
  isFavorite: (imdbID: string) => boolean;
  onToggleFavorite: (movie: Movie) => void;
  emptyMessage?: string;
}

export const MovieGrid = ({
  movies,
  isLoading,
  isError,
  onSelectMovie,
  isFavorite,
  onToggleFavorite,
  emptyMessage = "No movies found. Try another search!",
}: MovieGridProps) => {
  if (isLoading) {
    return (
      <div className="text-center text-slate-400 py-12">
        Searching for movies...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-400 py-12">
        Failed to load movies. Please try again.
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center text-slate-400 py-12">{emptyMessage}</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onSelect={onSelectMovie}
          isFavorite={isFavorite(movie.imdbID)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};
