"use client";

import { useEffect, useState } from "react";
import { useGetProductCountQuery } from "@/shared/api";
import type { CatalogCardsArgs } from "@/shared/api";
import { PRICE_RANGE } from "@/shared/config";
import type { CatalogFilters } from "@/shared/lib";

export function usePreviewCount(pending: CatalogFilters): number | null {
  const [debouncedArgs, setDebouncedArgs] = useState<CatalogCardsArgs | null>(null);

  const categoriesKey = pending.categories.join(",");

  const insoleSizesKey = pending.insoleSizes.join(",");
  const heelHeightsKey = pending.heelHeights.join(",");
  const materialsKey = pending.materials.join(",");
  const colorsKey = pending.colors.join(",");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedArgs({
        categories: pending.categories,
        insoleSizes: pending.insoleSizes,
        heelHeights: pending.heelHeights,
        materials: pending.materials,
        colors: pending.colors,
        minPrice: pending.minPrice && pending.minPrice > PRICE_RANGE.min ? pending.minPrice : undefined,
        maxPrice: pending.maxPrice && pending.maxPrice < PRICE_RANGE.max ? pending.maxPrice : undefined,
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [
    categoriesKey,
    insoleSizesKey,
    heelHeightsKey,
    materialsKey,
    colorsKey,
    pending.minPrice,
    pending.maxPrice,
  ]);

  const { data } = useGetProductCountQuery(debouncedArgs!, {
    skip: debouncedArgs === null,
  });

  return data ?? null;
}
