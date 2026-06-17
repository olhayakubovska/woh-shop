"use client";

import { useEffect, useState } from "react";
import { useGetProductCountQuery } from "@/shared/api/catalogApi";
import { PRICE_RANGE } from "@/shared/config/filters";
import type { CatalogFilters } from "@/shared/lib/useCatalogFilters";
import type { CatalogCardsArgs } from "@/shared/api/catalogApi";

export function usePreviewCount(pending: CatalogFilters): number | null {
  const [debouncedArgs, setDebouncedArgs] = useState<CatalogCardsArgs | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedArgs({
        category: pending.categories[0],
        insoleSize: pending.insoleSize,
        heelHeight: pending.heelHeight,
        material: pending.material,
        color: pending.color,
        minPrice:
          pending.minPrice && pending.minPrice > PRICE_RANGE.min
            ? pending.minPrice
            : undefined,
        maxPrice:
          pending.maxPrice && pending.maxPrice < PRICE_RANGE.max
            ? pending.maxPrice
            : undefined,
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [
    pending.categories[0],
    pending.insoleSize,
    pending.heelHeight,
    pending.material,
    pending.color,
    pending.minPrice,
    pending.maxPrice,
  ]);

  const { data } = useGetProductCountQuery(debouncedArgs!, {
    skip: debouncedArgs === null,
  });

  return data ?? null;
}
