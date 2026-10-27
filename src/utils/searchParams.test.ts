import { describe, expect, it } from "vitest";
import { buildUrlSearch, readUrlState, type UrlState } from "./searchParams";

const defaults: UrlState = {
  searchTerm: "",
  type: "",
  sortOption: "",
  page: 1,
  view: "search",
};

describe("readUrlState", () => {
  it("returns the defaults for an empty query string", () => {
    expect(readUrlState("")).toEqual(defaults);
  });

  it("reads every supported parameter", () => {
    const state = readUrlState(
      "?q=batman&type=movie&sort=year-desc&page=3&view=favorites",
    );

    expect(state).toEqual({
      searchTerm: "batman",
      type: "movie",
      sortOption: "year-desc",
      page: 3,
      view: "favorites",
    });
  });

  it("decodes the search term", () => {
    expect(readUrlState("?q=star+wars").searchTerm).toBe("star wars");
  });

  it("trims whitespace around the search term", () => {
    expect(readUrlState("?q=%20batman%20").searchTerm).toBe("batman");
  });

  it("falls back to the defaults for invalid values", () => {
    expect(readUrlState("?type=foo&sort=bar&view=baz")).toEqual(defaults);
  });

  it("ignores unknown parameters", () => {
    expect(readUrlState("?foo=bar")).toEqual(defaults);
  });

  it.each(["0", "-5", "2.5", "abc", ""])(
    "falls back to page 1 for page=%s",
    (value) => {
      expect(readUrlState(`?page=${value}`).page).toBe(1);
    },
  );
});

describe("buildUrlSearch", () => {
  it("returns an empty string for the default state", () => {
    expect(buildUrlSearch(defaults)).toBe("");
  });

  it("omits values that equal the defaults", () => {
    expect(buildUrlSearch({ ...defaults, searchTerm: "batman" })).toBe(
      "?q=batman",
    );
  });

  it("includes every non-default value", () => {
    const query = buildUrlSearch({
      searchTerm: "batman",
      type: "movie",
      sortOption: "year-desc",
      page: 3,
      view: "favorites",
    });

    expect(query).toBe(
      "?q=batman&type=movie&sort=year-desc&page=3&view=favorites",
    );
  });
});

describe("round trip", () => {
  it("reads back exactly what it wrote", () => {
    const state: UrlState = {
      searchTerm: "star wars & co",
      type: "series",
      sortOption: "year-asc",
      page: 4,
      view: "favorites",
    };

    expect(readUrlState(buildUrlSearch(state))).toEqual(state);
  });
});
