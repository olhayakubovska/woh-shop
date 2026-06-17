"use client";

import { useState } from "react";
import { SORT_OPTIONS } from "@/shared/config/filters";
import { useCatalogFilters } from "@/shared/lib/useCatalogFilters";
import { cn } from "@/shared/lib/cn";

export function SortDropdown() {
  const { filters, setSort } = useCatalogFilters();
  const [isOpen, setIsOpen] = useState(false);

  const current =
    SORT_OPTIONS.find((option) => option.value === filters.sort) ??
    SORT_OPTIONS[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex cursor-pointer items-center gap-3 border-[0.5px] border-[#FF99D6] px-4 py-2 text-sm leading-4"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-[#0D0D0D]">Сортування: {current.label}</span>
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Закрити список сортування"
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setIsOpen(false)}
          />
          <ul
            role="listbox"
            className="absolute right-0 z-20 mt-2 w-64 overflow-hidden rounded-md border border-border bg-white shadow-lg"
          >
            {SORT_OPTIONS.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={option.value === filters.sort}
                  onClick={() => {
                    setSort(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "block w-full cursor-pointer px-4 py-2.5 text-left text-sm hover:bg-bg-muted",
                    option.value === filters.sort &&
                      "font-semibold text-pink-main",
                  )}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
