"use client";

import { useState } from "react";
import { SORT_OPTIONS } from "@/entities/product/config";
import { cn } from "@/shared/lib";
import { useCatalogFilters } from "@/features/product-filters";
import { Button } from "@/shared/ui";

export function MobileSortSheet() {
  const { filters, setSort } = useCatalogFilters();
  const [isOpen, setIsOpen] = useState(false);

  const current = SORT_OPTIONS.find((option) => option.value === filters.sort) ?? SORT_OPTIONS[0];

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="h-7.5 w-55 gap-2 border border-pink-main px-4 py-2 font-golos text-xs leading-none text-white-main md:w-58.75 3xl:hidden"
      >
        <span className="whitespace-nowrap text-grey-second">
          Сортування:&nbsp; {current.label}
        </span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end 3xl:hidden">
          <button
            type="button"
            aria-label="Закрити сортування"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="relative z-10 w-full rounded-t-[10px] bg-white-main shadow-xl">
            <h2 className="border-b border-border py-4 text-center text-base font-semibold">
              Сортування
            </h2>
            <ul role="listbox">
              {SORT_OPTIONS.map((option) => {
                const isActive = option.value === filters.sort;
                return (
                  <li key={option.value} className="border-t border-border first:border-t-0">
                    <Button
                      role="option"
                      aria-selected={isActive}
                      onClick={() => { setSort(option.value); setIsOpen(false); }}
                      className={cn(
                        "w-full justify-start gap-0 text-sm font-medium",
                        isActive
                          ? "font-semibold text-pink-main"
                          : "px-4 py-4 text-foreground hover:text-pink-main",
                      )}
                    >
                      {isActive && (
                        <span className="mr-3 h-12.25 w-1 shrink-0 rounded-r-full bg-pink-main" />
                      )}
                      {option.label}
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
