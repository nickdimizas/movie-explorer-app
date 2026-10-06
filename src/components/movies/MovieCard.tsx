import type { Movie } from "../../types/movies";

interface MovieCardProps {
  movie: Movie;
  onSelect: (imdbID: string) => void;
}

export const MovieCard = ({ movie, onSelect }: MovieCardProps) => {
  return (
    <div
      onClick={() => onSelect(movie.imdbID)}
      className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300 cursor-pointer flex flex-col justify-between border border-slate-700"
    >
      <div className="aspect-[2/3] w-full overflow-hidden bg-slate-900 relative">
        {movie.Poster !== "N/A" ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-500 p-4 text-center">
            No Poster Available
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between">
        <h3
          className="font-semibold text-white text-lg line-clamp-1 mb-1"
          title={movie.Title}
        >
          {movie.Title}
        </h3>
        <div className="flex justify-between items-center text-xs text-slate-400 mt-2">
          <span className="capitalize px-2 py-1 bg-slate-700/50 rounded border border-slate-600">
            {movie.Type}
          </span>
          <span>{movie.Year}</span>
        </div>
      </div>
    </div>
  );
};
