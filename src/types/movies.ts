export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: "movie" | "series" | "episode";
  Poster: string;
}

export interface MovieDetails extends Movie {
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Plot?: string;
  imdbRating?: string;
}

export interface ApiResponse {
  Search?: Movie[];
  totalResults?: string;
  Response: "True" | "False";
  Error?: string;
}

export interface FetchMoviesParams {
  searchTerm: string;
  page?: number;
  type?: string;
}
