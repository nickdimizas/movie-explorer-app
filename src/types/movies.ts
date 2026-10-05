export type MovieType = "movie" | "series" | "episode" | "";

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
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Ratings?: { Source: string; Value: string }[];
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
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
  type?: MovieType;
}

export interface SearchBarProps {
  onSearch: (searchTerm: string, type: MovieType) => void;
  initialSearchTerm?: string;
  initialType?: MovieType;
}
