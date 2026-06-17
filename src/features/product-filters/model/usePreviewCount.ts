"use client";

import { useEffect, useState } from "react";
import { fetchCatalogCards } from "@/shared/api/catalog";
import { insoleSizeToApiKey, PRICE_RANGE } from "@/shared/config/filters";
import { CATEGORY_ID_MAP } from "@/shared/api/types";
import type { CatalogFilters } from "@/shared/lib/useCatalogFilters";

export function usePreviewCount(pending: CatalogFilters): number | null {
  const [count, setCount] = useState<number | null>(null);

  const categoriesKey = pending.categories.join(",");

  useEffect(() => {
    const timer = setTimeout(() => {
      const char: Record<string, string> = {};
      if (pending.insoleSize)
        char["insoleSize"] = insoleSizeToApiKey(pending.insoleSize);
      if (pending.heelHeight) char["heelHeight"] = pending.heelHeight;
      if (pending.material) char["material"] = pending.material;
      if (pending.color) char["color"] = pending.color;

      const firstCategory = pending.categories[0];

      fetchCatalogCards({
        categoryId: firstCategory ? CATEGORY_ID_MAP[firstCategory] : undefined,
        priceMin:
          pending.minPrice && pending.minPrice > PRICE_RANGE.min
            ? pending.minPrice
            : undefined,
        priceMax:
          pending.maxPrice && pending.maxPrice < PRICE_RANGE.max
            ? pending.maxPrice
            : undefined,
        char: Object.keys(char).length > 0 ? char : undefined,
        limit: 1,
      })
        .then((res) => setCount(res.meta.total))
        .catch(() => setCount(null));
    }, 400);

    return () => clearTimeout(timer);
  }, [
    categoriesKey,
    pending.insoleSize,
    pending.heelHeight,
    pending.material,
    pending.color,
    pending.minPrice,
    pending.maxPrice,
  ]);

  return count;
}
