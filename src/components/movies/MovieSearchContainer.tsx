import { useState } from "react";
import { SearchBar } from "../ui/SearchBar";
import { MovieGrid } from "./MovieGrid";
import { MovieDetailsModal } from "./MovieDetailsModal";
import { useMovies, useMovieDetails } from "../../hooks/useMovies";
import type { MovieType } from "../../types/movies";

export const MovieSearchContainer = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [type, setType] = useState<MovieType>("");
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

  const { data, isLoading, isError } = useMovies({
    searchTerm,
    type,
    page: 1,
  });

  const { data: movieDetails, isLoading: isDetailsLoading } = useMovieDetails(
    selectedMovieId || "",
  );

  const handleSearch = (term: string, selectedType: MovieType) => {
    setSearchTerm(term);
    setType(selectedType);
  };

  const handleSelectMovie = (imdbID: string) => {
    setSelectedMovieId(imdbID);
  };

  const handleCloseModal = () => {
    setSelectedMovieId(null);
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
      {/* SearchBar Component */}
      <SearchBar onSearch={handleSearch} />

      {/* MovieGrid Component */}
      <MovieGrid
        movies={data?.Search || []}
        isLoading={isLoading}
        isError={isError}
        onSelectMovie={handleSelectMovie}
      />

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
