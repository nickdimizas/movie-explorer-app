import type { MovieType, SortOption } from "../types/movies";

export type View = "search" | "favorites";

export interface UrlState {
  searchTerm: string;
  type: MovieType;
  sortOption: SortOption;
  page: number;
  view: View;
}

const TYPES: MovieType[] = ["movie", "series", "episode"];
const SORTS: SortOption[] = ["year-desc", "year-asc"];

export const readUrlState = (
  search: string = window.location.search,
): UrlState => {
  const params = new URLSearchParams(search);
  const type = params.get("type");
  const sort = params.get("sort");
  const page = Number(params.get("page"));

  return {
    searchTerm: params.get("q")?.trim() ?? "",
    type: TYPES.find((t) => t === type) ?? "",
    sortOption: SORTS.find((s) => s === sort) ?? "",
    page: Number.isInteger(page) && page > 0 ? page : 1,
    view: params.get("view") === "favorites" ? "favorites" : "search",
  };
};

export const buildUrlSearch = (state: UrlState): string => {
  const params = new URLSearchParams();

  if (state.searchTerm) params.set("q", state.searchTerm);
  if (state.type) params.set("type", state.type);
  if (state.sortOption) params.set("sort", state.sortOption);
  if (state.page > 1) params.set("page", String(state.page));
  if (state.view === "favorites") params.set("view", "favorites");

  const query = params.toString();
  return query ? `?${query}` : "";
};
