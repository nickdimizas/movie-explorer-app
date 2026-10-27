import { describe, expect, it } from "vitest";
import { sortMoviesByYear } from "./sortMovies";

const movies = [
  { imdbID: "a", Year: "1999" },
  { imdbID: "b", Year: "2010–2015" },
  { imdbID: "c", Year: "1985" },
];

const ids = (list: { imdbID: string }[]) => list.map((m) => m.imdbID);

describe("sortMoviesByYear", () => {
  it("keeps the original order when no sort option is selected", () => {
    expect(ids(sortMoviesByYear(movies, ""))).toEqual(["a", "b", "c"]);
  });

  it("sorts newest first", () => {
    expect(ids(sortMoviesByYear(movies, "year-desc"))).toEqual(["b", "a", "c"]);
  });

  it("sorts oldest first", () => {
    expect(ids(sortMoviesByYear(movies, "year-asc"))).toEqual(["c", "a", "b"]);
  });

  it("uses the first year of a range like 2010–2015", () => {
    const list = [
      { imdbID: "range", Year: "2010–2015" },
      { imdbID: "single", Year: "2012" },
    ];

    expect(ids(sortMoviesByYear(list, "year-asc"))).toEqual([
      "range",
      "single",
    ]);
  });

  it("keeps items with the same year in their original order", () => {
    const list = [
      { imdbID: "first", Year: "2000" },
      { imdbID: "second", Year: "2000" },
      { imdbID: "third", Year: "2000" },
    ];

    expect(ids(sortMoviesByYear(list, "year-desc"))).toEqual([
      "first",
      "second",
      "third",
    ]);
  });

  it("does not mutate the original array", () => {
    const original = [...movies];

    sortMoviesByYear(movies, "year-desc");

    expect(movies).toEqual(original);
  });

  it("returns a new array even when no sorting is applied", () => {
    expect(sortMoviesByYear(movies, "")).not.toBe(movies);
  });

  it("handles an empty list", () => {
    expect(sortMoviesByYear([], "year-desc")).toEqual([]);
  });

  it("puts items without a valid year last in both orders", () => {
    const list = [
      { imdbID: "unknown", Year: "N/A" },
      { imdbID: "old", Year: "1985" },
      { imdbID: "new", Year: "2020" },
    ];

    expect(ids(sortMoviesByYear(list, "year-asc"))).toEqual([
      "old",
      "new",
      "unknown",
    ]);
    expect(ids(sortMoviesByYear(list, "year-desc"))).toEqual([
      "new",
      "old",
      "unknown",
    ]);
  });
});
