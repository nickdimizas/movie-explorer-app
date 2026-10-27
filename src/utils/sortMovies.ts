import type { SortOption } from "../types/movies";

const toYear = (year: string): number => parseInt(year, 10) || 0;

export const sortMoviesByYear = <T extends { Year: string }>(
  movies: T[],
  sortOption: SortOption,
): T[] => {
  const copy = [...movies];

  if (!sortOption) return copy;

  return copy.sort((a, b) =>
    sortOption === "year-desc"
      ? toYear(b.Year) - toYear(a.Year)
      : toYear(a.Year) - toYear(b.Year),
  );
};
