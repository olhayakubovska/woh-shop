"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CATEGORY_OPTIONS, COLOR_OPTIONS, HEEL_HEIGHT_OPTIONS, INSOLE_SIZES, MATERIAL_OPTIONS, PRICE_RANGE, SORT_OPTIONS } from "@/entities/product/config";
import type { CategorySlug, HeelHeight, ProductColor, ProductMaterial, SortOption } from "@/entities/product/api";

export interface CatalogFilters {
  categories: CategorySlug[];
  insoleSizes: number[];
  heelHeights: HeelHeight[];
  materials: ProductMaterial[];
  colors: ProductColor[];
  minPrice?: number;
  maxPrice?: number;
  sort: SortOption;
  page: number;
}

const CATEGORY_VALUES = new Set(CATEGORY_OPTIONS.map((o) => o.value));
const HEEL_VALUES = new Set(HEEL_HEIGHT_OPTIONS.map((o) => o.value));
const MATERIAL_VALUES = new Set(MATERIAL_OPTIONS.map((o) => o.value));
const COLOR_VALUES = new Set(COLOR_OPTIONS.map((o) => o.value));
const SORT_VALUES = new Set(SORT_OPTIONS.map((o) => o.value));
const INSOLE_VALUES = new Set(INSOLE_SIZES.map(String));

function parseMulti(raw: string | null, validSet: Set<string>): string[] {
  if (!raw) return [];
  return raw.split(",").map((s) => s.trim()).filter((s) => validSet.has(s));
}

export function parseCatalogFilters(searchParams: URLSearchParams): CatalogFilters {
  const insoleSizesRaw = parseMulti(searchParams.get("size"), INSOLE_VALUES);

  const sort = searchParams.get("sort");
  const page = searchParams.get("page");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  return {
    categories: parseMulti(searchParams.get("category"), CATEGORY_VALUES) as CategorySlug[],
    insoleSizes: insoleSizesRaw.map(Number),
    heelHeights: parseMulti(searchParams.get("heel"), HEEL_VALUES) as HeelHeight[],
    materials: parseMulti(searchParams.get("material"), MATERIAL_VALUES) as ProductMaterial[],
    colors: parseMulti(searchParams.get("color"), COLOR_VALUES) as ProductColor[],
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    sort: sort && SORT_VALUES.has(sort as SortOption) ? (sort as SortOption) : "updated_desc",
    page: page && Number(page) > 0 ? Number(page) : 1,
  };
}

function serializeFilters(pending: CatalogFilters, sort?: string | null): URLSearchParams {
  const params = new URLSearchParams();
  if (sort) params.set("sort", sort);
  if (pending.categories.length > 0) params.set("category", pending.categories.join(","));
  if (pending.insoleSizes.length > 0) params.set("size", pending.insoleSizes.join(","));
  if (pending.heelHeights.length > 0) params.set("heel", pending.heelHeights.join(","));
  if (pending.materials.length > 0) params.set("material", pending.materials.join(","));
  if (pending.colors.length > 0) params.set("color", pending.colors.join(","));
  if (pending.minPrice != null && pending.minPrice > PRICE_RANGE.min) params.set("minPrice", String(pending.minPrice));
  if (pending.maxPrice != null && pending.maxPrice < PRICE_RANGE.max) params.set("maxPrice", String(pending.maxPrice));
  return params;
}

export function useCatalogFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = parseCatalogFilters(searchParams);

  const apply = (mutate: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    mutate(params);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const resetPage = (params: URLSearchParams) => params.delete("page");

  const toggle = <T extends string | number>(paramKey: string, value: T) => {
    apply((params) => {
      const current = (params.get(paramKey) ?? "").split(",").filter(Boolean);
      const strVal = String(value);
      const next = current.includes(strVal)
        ? current.filter((v) => v !== strVal)
        : [...current, strVal];
      if (next.length === 0) params.delete(paramKey);
      else params.set(paramKey, next.join(","));
      resetPage(params);
    });
  };

  const setCategories = (cats: CategorySlug[]) => {
    apply((params) => {
      if (cats.length === 0) params.delete("category");
      else params.set("category", cats.join(","));
      resetPage(params);
    });
  };

  const toggleInsoleSize = (size: number) => toggle("size", size);
  const toggleHeelHeight = (value: HeelHeight) => toggle("heel", value);
  const toggleMaterial = (value: ProductMaterial) => toggle("material", value);
  const toggleColor = (value: ProductColor) => toggle("color", value);

  const setPriceRange = ([min, max]: [number, number]) => {
    apply((params) => {
      if (min <= PRICE_RANGE.min) params.delete("minPrice");
      else params.set("minPrice", String(min));
      if (max >= PRICE_RANGE.max) params.delete("maxPrice");
      else params.set("maxPrice", String(max));
      resetPage(params);
    });
  };

  const setSort = (sort: SortOption) => {
    apply((params) => {
      if (sort === "updated_desc") params.delete("sort");
      else params.set("sort", sort);
      resetPage(params);
    });
  };

  const setPage = (pageOrUpdater: number | ((prev: number) => number)) => {
    apply((params) => {
      const current = Number(params.get("page") ?? 1);
      const next = typeof pageOrUpdater === "function" ? pageOrUpdater(current) : pageOrUpdater;
      if (next <= 1) params.delete("page");
      else params.set("page", String(next));
    });
  };

  const removeFilter = (key: "category" | "size" | "heel" | "material" | "color" | "price") => {
    apply((params) => {
      if (key === "price") {
        params.delete("minPrice");
        params.delete("maxPrice");
      } else {
        params.delete(key);
      }
      resetPage(params);
    });
  };

  const clearAll = () => {
    router.replace(pathname, { scroll: false });
  };

  const applyFilters = useCallback((pending: CatalogFilters) => {
    const params = serializeFilters(pending, searchParams.get("sort"));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, pathname, router]);

  return {
    filters,
    setCategories,
    toggleInsoleSize,
    toggleHeelHeight,
    toggleMaterial,
    toggleColor,
    setPriceRange,
    setSort,
    setPage,
    removeFilter,
    clearAll,
    applyFilters,
  };
}
