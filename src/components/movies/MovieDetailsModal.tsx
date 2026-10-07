import type { MovieDetails } from "../../types/movies";

interface MovieDetailsModalProps {
  movie: MovieDetails | undefined;
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export const MovieDetailsModal = ({
  movie,
  isLoading,
  isOpen,
  onClose,
}: MovieDetailsModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      {movie && <title>{`${movie.Title} | Movie Explorer`}</title>}

      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl p-6 md:p-8 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-2 rounded-full transition cursor-pointer z-10"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-400 font-medium">
              Loading movie details...
            </p>
          </div>
        ) : movie ? (
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
            {/* Poster Section */}
            <div className="w-full md:w-1/3 flex-shrink-0">
              {movie.Poster !== "N/A" ? (
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-full rounded-xl shadow-lg border border-slate-800 object-cover aspect-[2/3]"
                />
              ) : (
                <div className="w-full aspect-[2/3] bg-slate-800 rounded-xl flex items-center justify-center text-slate-500">
                  No Poster Available
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Title & Year */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {movie.Title}
                </h2>
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                    {movie.Year}
                  </span>
                  {movie.Rated && movie.Rated !== "N/A" && (
                    <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                      {movie.Rated}
                    </span>
                  )}
                  {movie.Runtime && movie.Runtime !== "N/A" && (
                    <span>• {movie.Runtime}</span>
                  )}
                </div>
              </div>

              {/* Genres */}
              {movie.Genre && movie.Genre !== "N/A" && (
                <div className="flex flex-wrap gap-2">
                  {movie.Genre.split(", ").map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 text-xs rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              {/* IMDb Rating */}
              {movie.imdbRating && movie.imdbRating !== "N/A" && (
                <div className="flex items-center gap-3 bg-slate-800/60 p-3 rounded-lg border border-slate-800 w-fit">
                  <div className="flex items-center gap-1 text-amber-400 font-bold text-lg">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{movie.imdbRating}</span>
                    <span className="text-xs text-slate-500">/10</span>
                  </div>
                  {movie.imdbVotes && movie.imdbVotes !== "N/A" && (
                    <span className="text-xs text-slate-400 border-l border-slate-700 pl-3">
                      {movie.imdbVotes} votes
                    </span>
                  )}
                </div>
              )}

              {/* Plot */}
              {movie.Plot && movie.Plot !== "N/A" && (
                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Plot
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {movie.Plot}
                  </p>
                </div>
              )}

              {/* Cast and Crew (Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm pt-2 border-t border-slate-800">
                {movie.Director && movie.Director !== "N/A" && (
                  <div>
                    <span className="text-slate-400 font-medium">
                      Director:{" "}
                    </span>
                    <span className="text-slate-200">{movie.Director}</span>
                  </div>
                )}
                {movie.Writer && movie.Writer !== "N/A" && (
                  <div>
                    <span className="text-slate-400 font-medium">Writer: </span>
                    <span className="text-slate-200">{movie.Writer}</span>
                  </div>
                )}
                {movie.Actors && movie.Actors !== "N/A" && (
                  <div className="sm:col-span-2">
                    <span className="text-slate-400 font-medium">Actors: </span>
                    <span className="text-slate-200">{movie.Actors}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
