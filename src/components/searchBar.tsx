import { useState, useEffect } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { useDebounce } from "../hooks/useDebounce";
import type { MovieType, SearchBarProps } from "../types/movies";

export const SearchBar = ({
  onSearch,
  initialSearchTerm = "",
  initialType = "",
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
  const [selectedType, setSelectedType] = useState<MovieType>(initialType);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      onSearch(debouncedSearchTerm.trim(), selectedType);
    }
  }, [debouncedSearchTerm, selectedType, onSearch]);

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
      className="flex flex-col sm:flex-row gap-3 w-full max-w-3xl mx-auto mb-8"
    >
      <div className="relative flex-1">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for movies, series, episodes..."
          className="w-full px-4 py-3 pl-10 rounded-lg bg-slate-800 text-white placeholder-slate-400 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        />
        <svg
          className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <select
        value={selectedType}
        onChange={handleTypeChange}
        className="px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition cursor-pointer"
      >
        <option value="">All Types</option>
        <option value="movie">Movies</option>
        <option value="series">Series</option>
        <option value="episode">Episodes</option>
      </select>

      <button
        type="submit"
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md cursor-pointer"
      >
        Search
      </button>
    </form>
  );
};
