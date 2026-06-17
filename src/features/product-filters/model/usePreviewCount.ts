"use client";

import { useEffect, useState } from "react";
import { useGetProductCountQuery } from "@/entities/product/api";
import type { CatalogCardsArgs } from "@/entities/product/api";
import { PRICE_RANGE } from "@/entities/product/config";
import type { CatalogFilters } from "@/features/product-filters/model/useCatalogFilters";

interface FiltersSnapshot {
  categories: string[];
  insoleSizes: number[];
  heelHeights: string[];
  materials: string[];
  colors: string[];
  minPrice?: number;
  maxPrice?: number;
}

export function usePreviewCount(pending: CatalogFilters): number | null {
  const [debouncedArgs, setDebouncedArgs] = useState<CatalogCardsArgs | null>(null);

  const filtersKey = JSON.stringify({
    categories: [...pending.categories].sort(),
    insoleSizes: [...pending.insoleSizes].sort(),
    heelHeights: [...pending.heelHeights].sort(),
    materials: [...pending.materials].sort(),
    colors: [...pending.colors].sort(),
    minPrice: pending.minPrice,
    maxPrice: pending.maxPrice,
  });

  useEffect(() => {
    const snapshot = JSON.parse(filtersKey) as FiltersSnapshot;

    const timer = setTimeout(() => {
      setDebouncedArgs({
        categories: snapshot.categories,
        insoleSizes: snapshot.insoleSizes,
        heelHeights: snapshot.heelHeights,
        materials: snapshot.materials,
        colors: snapshot.colors,
        minPrice:
          snapshot.minPrice !== undefined && snapshot.minPrice > PRICE_RANGE.min
            ? snapshot.minPrice
            : undefined,
        maxPrice:
          snapshot.maxPrice !== undefined && snapshot.maxPrice < PRICE_RANGE.max
            ? snapshot.maxPrice
            : undefined,
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [filtersKey]);

  const { data } = useGetProductCountQuery(debouncedArgs ?? {}, {
    skip: debouncedArgs === null,
  });

  return data ?? null;
}
