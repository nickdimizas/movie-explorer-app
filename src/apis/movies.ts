import axios from "axios";
import type { ApiResponse, FetchMoviesParams } from "../types/movies";

const BASE_URL = "https://www.omdbapi.com/";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export const fetchMovies = async ({
  searchTerm,
  page = 1,
  type = "",
}: FetchMoviesParams): Promise<ApiResponse> => {
  if (!searchTerm.trim()) {
    return { Response: "False", Error: "Empty search query" };
  }

  const response = await axios.get<ApiResponse>(BASE_URL, {
    params: {
      apikey: API_KEY,
      s: searchTerm,
      page: page,
      type: type || undefined,
    },
  });

  return response.data;
};
