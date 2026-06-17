"use client";

import { useActiveFilterChips } from "@/features/product-filters/model/useActiveFilterChips";
import { useCatalogFilters } from "@/shared/lib/useCatalogFilters";
import { CloseIcon } from "@/shared/ui/icons";

export function ActiveFiltersBar() {
  const { clearAll } = useCatalogFilters();
  const { chips, removeFilter } = useActiveFilterChips();

  if (chips.length === 0) return null;

  return (
    <div className="hidden flex-wrap items-center gap-2 border-b border-border py-2 3xl:relative 3xl:left-1/2 3xl:flex 3xl:w-screen 3xl:-translate-x-1/2 3xl:gap-3.75 3xl:px-[calc((100vw-1500px)/2)] 3xl:py-2.25">
      <span className="text-xs font-bold tracking-wide text-text-muted uppercase 3xl:leading-8">
        Фільтри:
      </span>
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={() => removeFilter(chip.key)}
          className="flex h-7 cursor-pointer items-center gap-2 bg-[#9999991A] px-1 py-2 font-golos text-[10px] font-medium tracking-normal hover:border-foreground 3xl:p-2 3xl:text-[11px]"
        >
          {chip.label}
          <CloseIcon width={6} height={6} />
        </button>
      ))}
      <button
        type="button"
        onClick={clearAll}
        className="ml-auto cursor-pointer bg-[#99999980] px-4 py-1.5 text-[9px] font-medium tracking-wide text-[#0D0D0D] uppercase"
      >
        очистити
      </button>
    </div>
  );
}
