import { useState, useMemo, useEffect } from "react";
import { SearchBar } from "../ui/SearchBar";
import { MovieGrid } from "./MovieGrid";
import { MovieDetailsModal } from "./MovieDetailsModal";
import { Pagination } from "../ui/Pagination";
import { useMovies, useMovieDetails } from "../../hooks/useMovies";
import { useFavorites } from "../../hooks/useFavorites";
import type { MovieType, SortOption } from "../../types/movies";
import {
  buildUrlSearch,
  readUrlState,
  type View,
} from "../../utils/searchParams";

const tabClass = (isActive: boolean) =>
  `px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer border ${
    isActive
      ? "bg-indigo-600 border-indigo-500 text-white"
      : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
  }`;

export const MovieSearchContainer = () => {
  const [initial] = useState(readUrlState);
  const [view, setView] = useState<View>(initial.view);
  const [searchTerm, setSearchTerm] = useState<string>(initial.searchTerm);
  const [type, setType] = useState<MovieType>(initial.type);
  const [sortOption, setSortOption] = useState<SortOption>(initial.sortOption);
  const [page, setPage] = useState<number>(initial.page);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

  useEffect(() => {
    const query = buildUrlSearch({ searchTerm, type, sortOption, page, view });
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${query}`,
    );
  }, [searchTerm, type, sortOption, page, view]);

  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const { data, isLoading, isError } = useMovies({
    searchTerm,
    type,
    page,
  });

  const { data: movieDetails, isLoading: isDetailsLoading } = useMovieDetails(
    selectedMovieId || "",
  );

  const totalResults = Number(data?.totalResults ?? 0);
  const totalPages = Math.ceil(totalResults / 10);

  const sortedMovies = useMemo(() => {
    if (!data?.Search) return [];

    const moviesCopy = [...data.Search];

    if (!sortOption) return moviesCopy;

    return moviesCopy.sort((a, b) => {
      const yearA = parseInt(a.Year, 10) || 0;
      const yearB = parseInt(b.Year, 10) || 0;

      if (sortOption === "year-desc") {
        return yearB - yearA;
      }
      return yearA - yearB;
    });
  }, [data, sortOption]);

  const handleSearch = (
    term: string,
    selectedType: MovieType,
    selectedSort: SortOption,
  ) => {
    if (term !== searchTerm || selectedType !== type) {
      setPage(1);
    }
    setSearchTerm(term);
    setType(selectedType);
    setSortOption(selectedSort);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectMovie = (imdbID: string) => {
    setSelectedMovieId(imdbID);
  };

  const handleCloseModal = () => {
    setSelectedMovieId(null);
  };

  const handleToggleFromModal = () => {
    if (!movieDetails) return;
    const { imdbID, Title, Year, Type, Poster } = movieDetails;
    toggleFavorite({ imdbID, Title, Year, Type, Poster });
  };

  return (
    <div className="space-y-8">
      {/* View tabs */}
      <div className="flex gap-2">
        <button
          type="button"
          aria-pressed={view === "search"}
          onClick={() => setView("search")}
          className={tabClass(view === "search")}
        >
          Search
        </button>
        <button
          type="button"
          aria-pressed={view === "favorites"}
          onClick={() => setView("favorites")}
          className={tabClass(view === "favorites")}
        >
          Favorites ({favorites.length})
        </button>
      </div>
      {/* Search view */}
      <div className={view === "search" ? "space-y-8" : "hidden"}>
        <SearchBar
          onSearch={handleSearch}
          initialSearchTerm={initial.searchTerm}
          initialType={initial.type}
          initialSortOption={initial.sortOption}
        />

        <MovieGrid
          movies={sortedMovies}
          isLoading={isLoading}
          isError={isError}
          onSelectMovie={handleSelectMovie}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />

        {!isLoading && !isError && totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        )}
      </div>

      {/* Favorites view */}
      {view === "favorites" && (
        <MovieGrid
          movies={favorites}
          isLoading={false}
          isError={false}
          onSelectMovie={handleSelectMovie}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          emptyMessage="No favorites yet. Click the heart on a movie to save it here."
        />
      )}

      {/* MovieDetailsModal */}
      <MovieDetailsModal
        movie={movieDetails}
        isLoading={isDetailsLoading}
        isOpen={!!selectedMovieId}
        isFavorite={selectedMovieId ? isFavorite(selectedMovieId) : false}
        onToggleFavorite={handleToggleFromModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};
