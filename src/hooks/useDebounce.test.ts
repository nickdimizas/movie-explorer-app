import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDebounce } from "./useDebounce";

const DELAY = 500;

const setup = (initialValue = "a") =>
  renderHook(({ value }) => useDebounce(value, DELAY), {
    initialProps: { value: initialValue },
  });

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns the initial value immediately", () => {
    const { result } = setup("a");

    expect(result.current).toBe("a");
  });

  it("does not update before the delay has passed", () => {
    const { result, rerender } = setup("a");

    rerender({ value: "ab" });
    act(() => {
      vi.advanceTimersByTime(DELAY - 1);
    });

    expect(result.current).toBe("a");
  });

  it("updates once the delay has passed", () => {
    const { result, rerender } = setup("a");

    rerender({ value: "ab" });
    act(() => {
      vi.advanceTimersByTime(DELAY);
    });

    expect(result.current).toBe("ab");
  });

  it("restarts the delay when the value changes again", () => {
    const { result, rerender } = setup("a");

    rerender({ value: "ab" });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    rerender({ value: "abc" });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe("a");

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe("abc");
  });

  it("cancels the pending timer on unmount", () => {
    const { rerender, unmount } = setup("a");

    rerender({ value: "ab" });
    expect(vi.getTimerCount()).toBe(1);

    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
