import type { SortOption } from "../types/movies";

const toYear = (year: string): number | null => {
  const parsed = parseInt(year, 10);
  return Number.isNaN(parsed) ? null : parsed;
};

export const sortMoviesByYear = <T extends { Year: string }>(
  movies: T[],
  sortOption: SortOption,
): T[] => {
  const copy = [...movies];

  if (!sortOption) return copy;

  const direction = sortOption === "year-desc" ? -1 : 1;

  return copy.sort((a, b) => {
    const yearA = toYear(a.Year);
    const yearB = toYear(b.Year);

    if (yearA === null && yearB === null) return 0;
    if (yearA === null) return 1;
    if (yearB === null) return -1;

    return (yearA - yearB) * direction;
  });
};
