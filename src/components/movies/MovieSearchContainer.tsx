import { useState } from "react";
import { SearchBar } from "../ui/SearchBar";
import { MovieGrid } from "./MovieGrid";
import { MovieDetailsModal } from "./MovieDetailsModal";
import { Pagination } from "../ui/Pagination";
import { useMovies, useMovieDetails } from "../../hooks/useMovies";
import type { MovieType } from "../../types/movies";

export const MovieSearchContainer = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [type, setType] = useState<MovieType>("");
  const [page, setPage] = useState<number>(1);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

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

  const handleSearch = (term: string, selectedType: MovieType) => {
    setSearchTerm(term);
    setType(selectedType);
    setPage(1);
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

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl min-h-screen space-y-8">
      {/* SearchBar Component */}
      <SearchBar onSearch={handleSearch} />

      {/* MovieGrid Component */}
      <MovieGrid
        movies={data?.Search || []}
        isLoading={isLoading}
        isError={isError}
        onSelectMovie={handleSelectMovie}
      />

      {/* Pagination Component */}
      {!isLoading && !isError && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={isLoading}
        />
      )}

      {/* MovieDetailsModal Component */}
      <MovieDetailsModal
        movie={movieDetails}
        isLoading={isDetailsLoading}
        isOpen={!!selectedMovieId}
        onClose={handleCloseModal}
      />
    </main>
  );
};
