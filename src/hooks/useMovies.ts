import { useQuery } from "@tanstack/react-query";
import { fetchMovies, fetchMovieDetails } from "../apis/movies";
import type { FetchMoviesParams } from "../types/movies";

export const useMovies = (params: FetchMoviesParams) => {
  return useQuery({
    queryKey: ["movies", params],
    queryFn: () => fetchMovies(params),
    enabled: !!params.searchTerm.trim(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useMovieDetails = (imdbID: string) => {
  return useQuery({
    queryKey: ["movieDetails", imdbID],
    queryFn: () => fetchMovieDetails(imdbID),
    enabled: !!imdbID,
    staleTime: 1000 * 60 * 10,
  });
};
