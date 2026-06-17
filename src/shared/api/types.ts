export interface LocalizedText {
  ua: string;
  en: string;
}

export interface CatalogCardCategory {
  _id: string;
  title: LocalizedText;
  slug: string;
  fullSlug: string;
}

export interface CatalogCard {
  groupId: string;
  slug: string;
  status: string;
  title: LocalizedText;
  imageURL: string;
  categoryIds: string[];
  categories: CatalogCardCategory[];
  subtitle: LocalizedText;
  pricing: { min: number; max: number; currency: string };
  availability: {
    hasAvailable: boolean;
    variantsCount: number;
    totalStock: number;
  };
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface CatalogCardsResponse {
  items: CatalogCard[];
  meta: PaginationMeta;
}

export type SortOption =
  | "updated_desc"
  | "price_asc"
  | "price_desc"
  | "title_asc";
export type CategorySlug =
  | "high-heels"
  | "training"
  | "stage"
  | "professional"
  | "clothing"
  | "accessories";
export type ProductColor =
  | "black"
  | "white"
  | "pink"
  | "beige"
  | "shokolad"
  | "nizhno-blakytnyy"
  | "red"
  | "silver";
export type ProductMaterial =
  | "leather"
  | "satin"
  | "synthetic"
  | "premium-suede"
  | "microfiber";
export type HeelHeight = "7" | "9" | "9-5" | "10" | "11";

export interface BreadcrumbCategory {
  _id: string;
  slug: string;
  title: LocalizedText;
  ancestors: BreadcrumbCategory[];
  path: string[];
}

export interface BreadcrumbsResponse {
  items: BreadcrumbCategory[];
}

export interface CatalogQuery {
  categoryId?: string;
  priceMin?: number;
  priceMax?: number;
  sort?: SortOption;
  char?: Record<string, string>;
  page?: number;
  limit?: number;
}

export const CATEGORY_ID_MAP: Record<string, string> = {
  "high-heels": "69fdaa7c5c7946d45d6d9e1d",
  training: "69fdaa7c5c7946d45d6d9e21",
  stage: "69fdaa7c5c7946d45d6d9e25",
  professional: "69fdaa7d5c7946d45d6d9e29",
  clothing: "69fdaa7c5c7946d45d6d9e0d",
  accessories: "69fdaa7d5c7946d45d6d9e2d",
};
