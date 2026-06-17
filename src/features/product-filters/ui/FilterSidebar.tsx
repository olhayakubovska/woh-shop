"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";
import { CATEGORY_OPTIONS, COLOR_OPTIONS, HEEL_HEIGHT_OPTIONS, INSOLE_SIZES, MATERIAL_OPTIONS, PRICE_RANGE } from "@/shared/config";
import { Checkbox, Chip, ColorSwatch, RangeSlider, Button } from "@/shared/ui";
import { formatPrice, parseCatalogFilters, useCatalogFilters } from "@/shared/lib";
import type { CatalogFilters } from "@/shared/lib";
import { FilterSection } from "@/features/product-filters/ui/FilterSection";
import type { CategorySlug, HeelHeight, ProductColor, ProductMaterial } from "@/shared/api";
import type { ChipKey } from "@/features/product-filters/model/getFilterChips";

type MultiFilterKey = "insoleSizes" | "heelHeights" | "materials" | "colors";

const DEFAULT_FILTERS: CatalogFilters = {
  categories: [],
  insoleSizes: [],
  heelHeights: [],
  materials: [],
  colors: [],
  sort: "updated_desc",
  page: 1,
};

export interface FilterSidebarHandle {
  apply: () => void;
  removePending: (key: ChipKey) => void;
  reset: () => void;
}

interface FilterSidebarProps {
  showApplyButton?: boolean;
  autoApply?: boolean;
  onPendingChange?: (pending: CatalogFilters) => void;
}

export const FilterSidebar = forwardRef<FilterSidebarHandle, FilterSidebarProps>(
  function FilterSidebar({ showApplyButton = true, autoApply = false, onPendingChange }, ref) {
    const searchParams = useSearchParams();
    const { clearAll, applyFilters } = useCatalogFilters();

    const parsedFilters = useMemo(() => parseCatalogFilters(searchParams), [searchParams]);

    const [pending, setPending] = useState<CatalogFilters>(parsedFilters);
    const pendingSourceRef = useRef<"user" | "url">("url");

    useEffect(() => {
      onPendingChange?.(pending);
    }, [pending, onPendingChange]);

    useEffect(() => {
      if (pendingSourceRef.current === "user") {
        pendingSourceRef.current = "url";
        return;
      }
      setPending(parsedFilters);
    }, [parsedFilters]);

    useEffect(() => {
      if (!autoApply || pendingSourceRef.current !== "user") return;
      pendingSourceRef.current = "url";
      applyFilters(pending);
    }, [pending, autoApply, applyFilters]);

    const markUserChanged = useCallback(() => {
      pendingSourceRef.current = "user";
    }, []);

    const toggleCategory = (cat: CategorySlug) => {
      markUserChanged();
      setPending((p) => ({
        ...p,
        categories: p.categories.includes(cat)
          ? p.categories.filter((c) => c !== cat)
          : [...p.categories, cat],
      }));
    };

    const toggleMulti = <T extends string | number>(key: MultiFilterKey, value: T) => {
      markUserChanged();
      setPending((p) => {
        const arr = p[key] as T[];
        return {
          ...p,
          [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
        };
      });
    };

    const removePending = useCallback((key: ChipKey) => {
      markUserChanged();
      setPending((p) => {
        if (key === "category") return { ...p, categories: [] };
        if (key === "price") return { ...p, minPrice: undefined, maxPrice: undefined };
        if (key === "size") return { ...p, insoleSizes: [] };
        if (key === "heel") return { ...p, heelHeights: [] };
        if (key === "material") return { ...p, materials: [] };
        if (key === "color") return { ...p, colors: [] };
        return p;
      });
    }, [markUserChanged]);

    const reset = useCallback(() => {
      markUserChanged();
      setPending({ ...DEFAULT_FILTERS });
    }, [markUserChanged]);

    useImperativeHandle(
      ref,
      () => ({
        apply: () => applyFilters(pending),
        removePending,
        reset,
      }),
      [pending, applyFilters, removePending, reset],
    );

    const priceValue: [number, number] = [
      pending.minPrice ?? PRICE_RANGE.min,
      pending.maxPrice ?? PRICE_RANGE.max,
    ];

    return (
      <aside className="w-full">
        <div className="-mx-4 border-t border-border 3xl:relative 3xl:left-1/2 3xl:mx-0 3xl:hidden 3xl:-translate-x-1/2" />

        <div className="mt-4 mb-6 flex flex-col gap-6 3xl:mt-0 3xl:gap-8">
          <FilterSection title="Категорії">
            {CATEGORY_OPTIONS.map((option) => (
              <Checkbox
                key={option.value}
                label={option.label}
                checked={pending.categories.includes(option.value)}
                onChange={() => toggleCategory(option.value)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Розмір стельки (см)">
            <div className="grid grid-cols-4 gap-2">
              {INSOLE_SIZES.map((size) => (
                <Chip
                  key={size}
                  active={pending.insoleSizes.includes(size)}
                  onClick={() => toggleMulti("insoleSizes", size)}
                >
                  {size.toFixed(1)}
                </Chip>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Параметри каблука">
            {HEEL_HEIGHT_OPTIONS.map((option) => (
              <Checkbox
                key={option.value}
                label={option.label}
                checked={pending.heelHeights.includes(option.value)}
                onChange={() => toggleMulti<HeelHeight>("heelHeights", option.value)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Матеріал">
            {MATERIAL_OPTIONS.map((option) => (
              <Checkbox
                key={option.value}
                label={option.label}
                checked={pending.materials.includes(option.value)}
                onChange={() => toggleMulti<ProductMaterial>("materials", option.value)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Колір" noBorder>
            <div className="grid grid-cols-2 gap-3">
              {COLOR_OPTIONS.map((option) => (
                <ColorSwatch
                  key={option.value}
                  hex={option.hex}
                  label={option.label}
                  active={pending.colors.includes(option.value)}
                  onClick={() => toggleMulti<ProductColor>("colors", option.value)}
                />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Ціна, грн" defaultOpen noBorder>
            <RangeSlider
              min={PRICE_RANGE.min}
              max={PRICE_RANGE.max}
              step={100}
              value={priceValue}
              onChange={([min, max]) => {
                markUserChanged();
                setPending((p) => ({ ...p, minPrice: min, maxPrice: max }));
              }}
            />
            <div className="flex items-center justify-between text-sm leading-none font-medium text-dark-main 3xl:text-base">
              <span>{formatPrice(priceValue[0])}</span>
              <span>{formatPrice(priceValue[1])}</span>
            </div>
          </FilterSection>

          {showApplyButton && (
            <div className="flex gap-2 3xl:hidden">
              <Button
                onClick={() => { reset(); clearAll(); }}
                className="flex-1 border border-dark-main py-3 text-[10px] leading-2 font-semibold text-dark-main uppercase"
              >
                Очистити
              </Button>
              <Button
                onClick={() => applyFilters(pending)}
                className="flex-1 bg-dark-main py-3 text-[10px] leading-2 font-semibold text-white-main uppercase"
              >
                Показати
              </Button>
            </div>
          )}
        </div>
      </aside>
    );
  },
);
