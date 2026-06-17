import {
  CATEGORY_OPTIONS,
  COLOR_OPTIONS,
  HEEL_HEIGHT_OPTIONS,
  MATERIAL_OPTIONS,
  PRICE_RANGE,
} from "@/shared/config/filters";
import { formatPrice } from "@/shared/lib/format";
import type { CatalogFilters } from "@/shared/lib/useCatalogFilters";

export type ChipKey =
  | "category"
  | "size"
  | "heel"
  | "material"
  | "color"
  | "price";

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
  if (filters.insoleSize) {
    chips.push({
      key: "size",
      label: `Розмір стельки (см): ${filters.insoleSize}`,
    });
  }
  if (filters.heelHeight) {
    const option = HEEL_HEIGHT_OPTIONS.find(
      (o) => o.value === filters.heelHeight,
    );
    if (option)
      chips.push({ key: "heel", label: `Параметри каблука: ${option.label}` });
  }
  if (filters.material) {
    const option = MATERIAL_OPTIONS.find((o) => o.value === filters.material);
    if (option)
      chips.push({ key: "material", label: `Матеріал: ${option.label}` });
  }
  if (filters.color) {
    const option = COLOR_OPTIONS.find((o) => o.value === filters.color);
    if (option) chips.push({ key: "color", label: `Колір: ${option.label}` });
  }
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    const min = filters.minPrice ?? PRICE_RANGE.min;
    const max = filters.maxPrice ?? PRICE_RANGE.max;
    chips.push({
      key: "price",
      label: `Ціна: ${formatPrice(min)} – ${formatPrice(max)}`,
    });
  }

  return chips;
}
