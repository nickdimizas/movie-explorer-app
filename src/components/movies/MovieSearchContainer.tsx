import { useState, useCallback } from "react";
import { SearchBar } from "./SearchBar";
import { useMovies } from "../../hooks/useMovies";
import type { MovieType } from "../../types/movies";

export const MovieSearchContainer = () => {
  const [searchTerm, setSearchTerm] = useState<string>("Batman");
  const [selectedType, setSelectedType] = useState<MovieType>("");
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError, error } = useMovies({
    searchTerm,
    type: selectedType,
    page,
  });

  const handleSearch = useCallback(
    (newSearchTerm: string, newType: MovieType) => {
      setSearchTerm(newSearchTerm);
      setSelectedType(newType);
      setPage(1);
    },
    [],
  );

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Search Movies & TV Shows
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Find your favorite movies, series, and episodes with real-time API
          data.
        </p>
      </div>

      {/* Search Bar Component */}
      <SearchBar
        onSearch={handleSearch}
        initialSearchTerm={searchTerm}
        initialType={selectedType}
      />

      {/* Results / Status Section */}
      {isLoading && (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500" />
        </div>
      )}

      {isError && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-center max-w-xl mx-auto">
          {error instanceof Error
            ? error.message
            : "An error occurred while fetching movies."}
        </div>
      )}

      {!isLoading && !isError && data?.Search && (
        <div className="space-y-4">
          <p className="text-slate-400 text-sm">
            Found{" "}
            <span className="text-indigo-400 font-semibold">
              {data.totalResults}
            </span>{" "}
            results for "{searchTerm}"
          </p>
          {/* Εδώ θα μπει το MovieGrid / MovieCard */}
        </div>
      )}

      {!isLoading && !isError && !data?.Search && (
        <div className="text-center text-slate-400 py-16">
          No results found. Try searching for something else!
        </div>
      )}
    </div>
  );
};
