import { useState, useEffect, useRef } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import type { MovieType, SearchBarProps } from "../../types/movies";

export const SearchBar = ({
  onSearch,
  initialSearchTerm = "",
  initialType = "",
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
  const [selectedType, setSelectedType] = useState<MovieType>(initialType);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const onSearchRef = useRef(onSearch);
  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      onSearchRef.current(debouncedSearchTerm.trim(), selectedType);
    }
  }, [debouncedSearchTerm, selectedType]);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim(), selectedType);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value as MovieType);
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Movie search form"
      className="flex flex-col sm:flex-row gap-3 w-full max-w-3xl mx-auto mb-8"
    >
      {/* Search Input Container */}
      <div className="relative flex-1">
        <label htmlFor="movie-search-input" className="sr-only">
          Search for movies, series, or episodes
        </label>
        <input
          id="movie-search-input"
          type="search"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for movies, series, episodes..."
          className="w-full px-4 py-3 pl-10 rounded-lg bg-slate-800 text-white placeholder-slate-400 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-base"
        />
        <svg
          className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Select Type Dropdown */}
      <div className="w-full sm:w-auto">
        <label htmlFor="movie-type-select" className="sr-only">
          Filter by type
        </label>
        <select
          id="movie-type-select"
          value={selectedType}
          onChange={handleTypeChange}
          aria-label="Filter search results by type"
          className="w-full sm:w-auto px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition cursor-pointer text-base"
        >
          <option value="">All Types</option>
          <option value="movie">Movies</option>
          <option value="series">Series</option>
          <option value="episode">Episodes</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md cursor-pointer text-base"
      >
        Search
      </button>
    </form>
  );
};
