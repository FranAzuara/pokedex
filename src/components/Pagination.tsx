import React, { useMemo } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages]);

  return (
    <nav
      className="flex items-center justify-center py-4"
      aria-label="Pagination"
    >
      <div className="flex flex-wrap items-center justify-center gap-3">
        {/* Previous Page Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="cursor-pointer flex items-center justify-center size-10 bg-white dark:bg-slate-900 border border-slate-tech/20 dark:border-white/10 text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm hover:border-primary group"
          aria-label="Previous page"
        >
          <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">
            west
          </span>
        </button>

        {/* Page Number Buttons with Truncation */}
        <div className="flex gap-2">
          {pageNumbers.map((page, index) => (
            <React.Fragment key={index}>
              {typeof page === "number" ? (
                <button
                  onClick={() => onPageChange(page)}
                  className={`cursor-pointer flex items-center justify-center size-10 border font-mono font-black text-xs transition-all skew-x-[-8deg] ${
                    currentPage === page
                      ? "bg-primary border-transparent text-white shadow-mechanical scale-110 z-10"
                      : "bg-white dark:bg-slate-900 border-slate-tech/20 dark:border-white/10 text-slate-tech/60 dark:text-white/40 hover:border-primary hover:text-primary"
                  }`}
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  <span className="skew-x-[8deg] block">
                    {String(page).padStart(2, "0")}
                  </span>
                </button>
              ) : (
                <div className="size-10 flex items-end justify-center pb-2 text-slate-tech/40 dark:text-white/20 font-mono text-xs tracking-widest">
                  ...
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next Page Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="cursor-pointer flex items-center justify-center size-10 bg-white dark:bg-slate-900 border border-slate-tech/20 dark:border-white/10 text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm hover:border-primary group"
          aria-label="Next page"
        >
          <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
            east
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
