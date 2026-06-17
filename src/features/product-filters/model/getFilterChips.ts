import { CATEGORY_OPTIONS, COLOR_OPTIONS, HEEL_HEIGHT_OPTIONS, INSOLE_SIZES, MATERIAL_OPTIONS, PRICE_RANGE } from "@/shared/config";
import { formatPrice } from "@/shared/lib";
import type { CatalogFilters } from "@/shared/lib";

export type ChipKey = "category" | "size" | "heel" | "material" | "color" | "price";

export interface FilterChip {
  key: ChipKey;
  label: string;
}

export function getFilterChips(filters: CatalogFilters): FilterChip[] {
  const chips: FilterChip[] = [];

  if (filters.categories.length > 0) {
    const labels = filters.categories
      .map((cat) => CATEGORY_OPTIONS.find((o) => o.value === cat)?.label)
      .filter(Boolean)
      .join(", ");
    chips.push({ key: "category", label: `Категорія: ${labels}` });
  }

  if (filters.insoleSizes.length > 0) {
    chips.push({ key: "size", label: `Розмір стельки: ${filters.insoleSizes.join(", ")} см` });
  }

  if (filters.heelHeights.length > 0) {
    const labels = filters.heelHeights
      .map((v) => HEEL_HEIGHT_OPTIONS.find((o) => o.value === v)?.label)
      .filter(Boolean)
      .join(", ");
    chips.push({ key: "heel", label: `Каблук: ${labels}` });
  }

  if (filters.materials.length > 0) {
    const labels = filters.materials
      .map((v) => MATERIAL_OPTIONS.find((o) => o.value === v)?.label)
      .filter(Boolean)
      .join(", ");
    chips.push({ key: "material", label: `Матеріал: ${labels}` });
  }

  if (filters.colors.length > 0) {
    const labels = filters.colors
      .map((v) => COLOR_OPTIONS.find((o) => o.value === v)?.label)
      .filter(Boolean)
      .join(", ");
    chips.push({ key: "color", label: `Колір: ${labels}` });
  }

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    const min = filters.minPrice ?? PRICE_RANGE.min;
    const max = filters.maxPrice ?? PRICE_RANGE.max;
    chips.push({ key: "price", label: `Ціна: ${formatPrice(min)} – ${formatPrice(max)}` });
  }

  return chips;
}
