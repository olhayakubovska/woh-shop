"use client";

import {
  CATEGORY_OPTIONS,
  COLOR_OPTIONS,
  HEEL_HEIGHT_OPTIONS,
  MATERIAL_OPTIONS,
  PRICE_RANGE,
} from "@/shared/config/filters";
import { formatPrice } from "@/shared/lib/format";
import { useCatalogFilters } from "@/shared/lib/useCatalogFilters";

export function useActiveFilterChips() {
  const { filters, removeFilter } = useCatalogFilters();

  const chips: { key: Parameters<typeof removeFilter>[0]; label: string }[] =
    [];

  if (filters.insoleSize) {
    chips.push({
      key: "size",
      label: `Розмір стельки (см): ${filters.insoleSize}`,
    });
  }
  if (filters.color) {
    const option = COLOR_OPTIONS.find((item) => item.value === filters.color);
    if (option) chips.push({ key: "color", label: `Колір: ${option.label}` });
  }
  if (filters.heelHeight) {
    const option = HEEL_HEIGHT_OPTIONS.find(
      (item) => item.value === filters.heelHeight,
    );
    if (option)
      chips.push({ key: "heel", label: `Параметри каблука: ${option.label}` });
  }
  if (filters.material) {
    const option = MATERIAL_OPTIONS.find(
      (item) => item.value === filters.material,
    );
    if (option)
      chips.push({ key: "material", label: `Матеріал: ${option.label}` });
  }
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    const min = filters.minPrice ?? PRICE_RANGE.min;
    const max = filters.maxPrice ?? PRICE_RANGE.max;
    chips.push({
      key: "price",
      label: `Ціна: ${formatPrice(min)} – ${formatPrice(max)}`,
    });
  }
  if (filters.categories.length > 0) {
    const labels = filters.categories
      .map((cat) => CATEGORY_OPTIONS.find((o) => o.value === cat)?.label)
      .filter(Boolean)
      .join(", ");
    chips.push({ key: "category", label: `Категорія: ${labels}` });
  }

  return { chips, removeFilter };
}
