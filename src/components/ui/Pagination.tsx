interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav
      aria-label="Pagination Navigation"
      className="flex items-center justify-center gap-4 mt-8 py-4"
    >
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage || isLoading}
        aria-label="Go to previous page"
        className="px-4 py-2 text-sm font-medium rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        &larr; Previous
      </button>

      {/* Page Info */}
      <span className="text-sm text-slate-400 font-medium" aria-live="polite">
        Page <span className="text-slate-100 font-bold">{currentPage}</span> of{" "}
        <span className="text-slate-100 font-bold">{totalPages}</span>
      </span>

      {/* Next Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage || isLoading}
        aria-label="Go to next page"
        className="px-4 py-2 text-sm font-medium rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Next &rarr;
      </button>
    </nav>
  );
};
