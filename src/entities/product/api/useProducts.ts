"use client";

import { useEffect, useState } from "react";
import { fetchCatalogCards } from "@/shared/api/catalog";
import { insoleSizeToApiKey, PAGE_SIZE } from "@/shared/config/filters";
import { CATEGORY_ID_MAP } from "@/shared/api/types";
import type { CatalogCardsResponse, SortOption } from "@/shared/api/types";

interface UseProductsResult {
  data: CatalogCardsResponse | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

interface ProductsInput {
  category?: string;
  insoleSize?: number;
  heelHeight?: string;
  material?: string;
  color?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
  limit?: number;
}

export function useProducts(filters: ProductsInput): UseProductsResult {
  const [data, setData] = useState<CatalogCardsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [resolvedKey, setResolvedKey] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  const queryKey = JSON.stringify({ ...filters, reloadToken });
  const isLoading = resolvedKey !== queryKey;

  useEffect(() => {
    const char: Record<string, string> = {};
    if (filters.insoleSize)
      char["insoleSize"] = insoleSizeToApiKey(filters.insoleSize);
    if (filters.heelHeight) char["heelHeight"] = filters.heelHeight;
    if (filters.material) char["material"] = filters.material;
    if (filters.color) char["color"] = filters.color;

    fetchCatalogCards({
      categoryId: filters.category
        ? CATEGORY_ID_MAP[filters.category]
        : undefined,
      priceMin: filters.minPrice,
      priceMax: filters.maxPrice,
      sort: (filters.sort as SortOption) ?? "updated_desc",
      char: Object.keys(char).length > 0 ? char : undefined,
      page: filters.page ?? 1,
      limit: filters.limit ?? PAGE_SIZE,
    })
      .then((json) => {
        setData(json);
        setError(null);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Невідома помилка");
      })
      .finally(() => {
        setResolvedKey(queryKey);
      });
  }, [queryKey]);

  return {
    data,
    isLoading,
    error,
    refetch: () => setReloadToken((t) => t + 1),
  };
}
