"use client";

import { useRef, useState, useMemo } from "react";
import { cn, useCatalogFilters } from "@/shared/lib";
import type { CatalogFilters } from "@/shared/lib";
import { Button, IconButton, CloseIcon, FilterIcon } from "@/shared/ui";
import { FilterSidebar, type FilterSidebarHandle, getFilterChips, usePreviewCount } from "@/features/product-filters";

export function MobileFilterDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { clearAll, filters } = useCatalogFilters();
  const sidebarRef = useRef<FilterSidebarHandle>(null);
  const [pendingFilters, setPendingFilters] = useState<CatalogFilters>(filters);

  const chips = useMemo(() => getFilterChips(pendingFilters), [pendingFilters]);
  const previewCount = usePreviewCount(pendingFilters);

  const handleOpen = () => {
    setPendingFilters(filters);
    setIsOpen(true);
  };

  const handleApply = () => {
    sidebarRef.current?.apply();
    setIsOpen(false);
  };

  const handleClear = () => {
    sidebarRef.current?.reset();
    clearAll();
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        className="h-7.5 gap-2 bg-pink-main px-8 py-2 font-golos text-xs font-semibold text-white-main md:w-34.5 md:rounded-none md:px-4 3xl:hidden"
      >
        <FilterIcon />
        <span className="w-12 text-xs leading-none font-semibold">Фільтри</span>
      </Button>

      <div
        className={cn(
          "fixed inset-0 z-50 flex 3xl:hidden",
          isOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <button
          type="button"
          aria-label="Закрити фільтри"
          onClick={() => setIsOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/60 transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "relative flex h-full w-76 flex-col overflow-y-auto bg-white-main p-4 shadow-xl transition-transform duration-300",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="mb-3 flex items-center justify-between">
            <h2 className="tracking-0.7 font-golos text-sm font-semibold uppercase">
              Фільтрація
            </h2>
            <IconButton aria-label="Закрити" onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div>

          {chips.length > 0 && (
            <>
              <div className="-mx-4 border-t border-border pb-3" />
              <div className="mb-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-montserrat text-[10px] font-bold tracking-[1px] uppercase">
                    Обрано:
                  </span>
                  <Button
                    onClick={handleClear}
                    className="font-montserrat text-[10px] font-bold tracking-[1px] uppercase underline decoration-solid"
                  >
                    Очистити
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {chips.map((chip) => (
                    <span
                      key={chip.key}
                      className="flex h-7 items-center gap-1 bg-grey-muted px-1 py-2 font-golos text-[10px] font-medium tracking-normal"
                    >
                      {chip.label}
                      <Button
                        aria-label={`Видалити ${chip.label}`}
                        onClick={() => sidebarRef.current?.removePending(chip.key)}
                        className="ml-1 leading-none text-dark-main hover:text-pink-main"
                      >
                        ×
                      </Button>
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          <FilterSidebar
            ref={sidebarRef}
            showApplyButton={false}
            onPendingChange={setPendingFilters}
          />

          <div className="-mx-4 mb-4 border-t border-divider" />

          <div className="flex gap-2">
            <Button
              onClick={handleClear}
              className="flex-1 border border-dark-main py-3 text-[10px] leading-2 font-semibold text-dark-main uppercase"
            >
              Очистити
            </Button>
            <Button
              onClick={handleApply}
              className="flex-1 bg-dark-main py-3 text-[10px] leading-2 font-semibold text-white-main uppercase"
            >
              {previewCount !== null ? `Показати (${previewCount})` : "Показати товари"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
