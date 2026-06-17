"use client";

import { useCatalogFilters } from "@/shared/lib/useCatalogFilters";
import { cn } from "@/shared/lib/cn";

interface PaginationProps {
  totalPages: number;
  onPageChange?: (page: number) => void;
}

function getPageNumbers(
  current: number,
  total: number,
): (number | "ellipsis")[] {
  const pages = new Set<number>([
    1,
    2,
    3,
    total,
    current,
    current - 1,
    current + 1,
  ]);
  const sorted = [...pages]
    .filter((page) => page >= 1 && page <= total)
    .sort((a, b) => a - b);

  const result: (number | "ellipsis")[] = [];
  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1] > 1) {
      result.push("ellipsis");
    }
    result.push(page);
  });

  return result;
}

export function Pagination({ totalPages, onPageChange }: PaginationProps) {
  const { filters, setPage } = useCatalogFilters();
  const currentPage = filters.page;

  if (totalPages <= 1) return null;

  const goTo = (page: number) => {
    const target = Math.min(Math.max(1, page), totalPages);
    onPageChange?.(target);
    setPage(target);
  };

  return (
    <nav
      className="mx-auto mt-4 flex max-w-76.25 flex-wrap items-center justify-center gap-6 text-sm whitespace-nowrap md:mt-6 md:h-[18px]"
      aria-label="Пагінація"
    >
      <button
        type="button"
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
        className="cursor-pointer text-[10px] font-semibold tracking-wide text-dark-main uppercase hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
      >
        Попередня
      </button>

      <div className="flex items-center gap-3">
        {getPageNumbers(currentPage, totalPages).map((page, index) =>
          page === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="flex h-4 w-4 items-center justify-center text-text-muted"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => goTo(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={cn(
                "flex h-4 w-4 cursor-pointer items-center justify-center text-sm font-bold",
                page === currentPage
                  ? "border-b-2 border-pink-main text-foreground"
                  : "text-text-muted hover:text-foreground",
              )}
            >
              {String(page).padStart(2, "0")}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="cursor-pointer text-[10px] font-semibold tracking-wide text-dark-main uppercase hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
      >
        Наступна
      </button>
    </nav>
  );
}
