import type {
  CategorySlug,
  HeelHeight,
  ProductColor,
  ProductMaterial,
  SortOption,
} from "@/shared/api/types";

export const CATEGORY_OPTIONS: { value: CategorySlug; label: string }[] = [
  { value: "high-heels", label: "High Heels" },
  { value: "training", label: "Тренувальні" },
  { value: "stage", label: "Сценічні" },
  { value: "professional", label: "Професійні" },
];

export const INSOLE_SIZES = [23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5];

export const HEEL_HEIGHT_OPTIONS: { value: HeelHeight; label: string }[] = [
  { value: "7", label: "7 см" },
  { value: "9", label: "9 см" },
  { value: "9-5", label: "9.5 см" },
  { value: "10", label: "10 см" },
  { value: "11", label: "11 см" },
];

export const MATERIAL_OPTIONS: { value: ProductMaterial; label: string }[] = [
  { value: "leather", label: "Натуральна шкіра" },
  { value: "satin", label: "Сатин" },
  { value: "synthetic", label: "Синтетичний" },
  { value: "premium-suede", label: "Преміальна замша" },
  { value: "microfiber", label: "Мікрофібра" },
];

export const COLOR_OPTIONS: {
  value: ProductColor;
  label: string;
  hex: string;
}[] = [
  { value: "black", label: "Чорний", hex: "#111111" },
  { value: "white", label: "Білий", hex: "#FFFFFF" },
  { value: "pink", label: "Рожевий", hex: "#FF9EB5" },
  { value: "beige", label: "Бежевий", hex: "#EBDFD2" },
  { value: "shokolad", label: "Шоколадний", hex: "#7B3F00" },
  { value: "silver", label: "Срібний", hex: "#C0C0C0" },
  { value: "nizhno-blakytnyy", label: "Блакитний", hex: "#ADD8E6" },
  { value: "red", label: "Червоний", hex: "#E53935" },
];

export const PRICE_RANGE = { min: 0, max: 10000 };

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "updated_desc", label: "За замовчуванням" },
  { value: "price_asc", label: "Спочатку дешевші" },
  { value: "price_desc", label: "Спочатку дорожчі" },
];

export const PAGE_SIZE = 24;

export function insoleSizeToApiKey(size: number): string {
  return String(size).replace(".", "-");
}
