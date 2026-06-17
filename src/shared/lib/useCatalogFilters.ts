"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  CATEGORY_OPTIONS,
  COLOR_OPTIONS,
  HEEL_HEIGHT_OPTIONS,
  MATERIAL_OPTIONS,
  PRICE_RANGE,
  SORT_OPTIONS,
} from "@/shared/config/filters";
import type {
  CategorySlug,
  HeelHeight,
  ProductColor,
  ProductMaterial,
  SortOption,
} from "@/shared/api/types";

export interface CatalogFilters {
  categories: CategorySlug[];
  insoleSize?: number;
  heelHeight?: HeelHeight;
  material?: ProductMaterial;
  color?: ProductColor;
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

export function parseCatalogFilters(
  searchParams: URLSearchParams,
): CatalogFilters {
  const categoryRaw = searchParams.get("category") ?? "";
  const categories = categoryRaw
    .split(",")
    .map((s) => s.trim())
    .filter((s): s is CategorySlug => CATEGORY_VALUES.has(s as CategorySlug));

  const insoleSize = searchParams.get("size");
  const heelHeight = searchParams.get("heel");
  const material = searchParams.get("material");
  const color = searchParams.get("color");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const sort = searchParams.get("sort");
  const page = searchParams.get("page");

  return {
    categories,
    insoleSize:
      insoleSize && !isNaN(Number(insoleSize)) ? Number(insoleSize) : undefined,
    heelHeight:
      heelHeight && HEEL_VALUES.has(heelHeight as HeelHeight)
        ? (heelHeight as HeelHeight)
        : undefined,
    material:
      material && MATERIAL_VALUES.has(material as ProductMaterial)
        ? (material as ProductMaterial)
        : undefined,
    color:
      color && COLOR_VALUES.has(color as ProductColor)
        ? (color as ProductColor)
        : undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    sort:
      sort && SORT_VALUES.has(sort as SortOption)
        ? (sort as SortOption)
        : "updated_desc",
    page: page && Number(page) > 0 ? Number(page) : 1,
  };
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

  const setCategories = (cats: CategorySlug[]) => {
    apply((params) => {
      if (cats.length === 0) params.delete("category");
      else params.set("category", cats.join(","));
      resetPage(params);
    });
  };

  const toggleInsoleSize = (size: number) => {
    apply((params) => {
      const cur = params.get("size");
      if (cur === String(size)) params.delete("size");
      else params.set("size", String(size));
      resetPage(params);
    });
  };

  const toggleHeelHeight = (value: HeelHeight) => {
    apply((params) => {
      if (params.get("heel") === value) params.delete("heel");
      else params.set("heel", value);
      resetPage(params);
    });
  };

  const toggleMaterial = (value: ProductMaterial) => {
    apply((params) => {
      if (params.get("material") === value) params.delete("material");
      else params.set("material", value);
      resetPage(params);
    });
  };

  const toggleColor = (value: ProductColor) => {
    apply((params) => {
      if (params.get("color") === value) params.delete("color");
      else params.set("color", value);
      resetPage(params);
    });
  };

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

  const setPage = (page: number) => {
    apply((params) => {
      if (page <= 1) params.delete("page");
      else params.set("page", String(page));
    });
  };

  const removeFilter = (
    key: "category" | "size" | "heel" | "material" | "color" | "price",
  ) => {
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
  };
}
