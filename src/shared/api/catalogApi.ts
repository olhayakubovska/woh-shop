import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { insoleSizeToApiKey } from "@/shared/config/filters";
import { CATEGORY_ID_MAP } from "@/shared/api/types";
import type {
  BreadcrumbCategory,
  CatalogCardsResponse,
  SortOption,
} from "@/shared/api/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://test-woh.keykey.com.ua/v1";

export interface CatalogCardsArgs {
  category?: string;
  insoleSize?: number;
  heelHeight?: string;
  material?: string;
  color?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: SortOption;
  page?: number;
  limit?: number;
}

export const catalogApi = createApi({
  reducerPath: "catalogApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCatalogCards: builder.query<CatalogCardsResponse, CatalogCardsArgs>({
      query: (args) => {
        const char: Record<string, string> = {};
        if (args.insoleSize) char["insoleSize"] = insoleSizeToApiKey(args.insoleSize);
        if (args.heelHeight) char["heelHeight"] = args.heelHeight;
        if (args.material) char["material"] = args.material;
        if (args.color) char["color"] = args.color;

        const params = new URLSearchParams();
        if (args.category) params.set("categoryId", CATEGORY_ID_MAP[args.category] ?? "");
        if (args.minPrice != null) params.set("priceMin", String(args.minPrice));
        if (args.maxPrice != null) params.set("priceMax", String(args.maxPrice));
        if (args.sort) params.set("sort", args.sort);
        if (Object.keys(char).length > 0) params.set("char", JSON.stringify(char));
        params.set("page", String(args.page ?? 1));
        params.set("limit", String(args.limit ?? 24));

        return `/catalog/cards?${params}`;
      },
    }),

    getProductCount: builder.query<number, CatalogCardsArgs>({
      query: (args) => {
        const char: Record<string, string> = {};
        if (args.insoleSize) char["insoleSize"] = insoleSizeToApiKey(args.insoleSize);
        if (args.heelHeight) char["heelHeight"] = args.heelHeight;
        if (args.material) char["material"] = args.material;
        if (args.color) char["color"] = args.color;

        const params = new URLSearchParams();
        if (args.category) params.set("categoryId", CATEGORY_ID_MAP[args.category] ?? "");
        if (args.minPrice != null) params.set("priceMin", String(args.minPrice));
        if (args.maxPrice != null) params.set("priceMax", String(args.maxPrice));
        if (Object.keys(char).length > 0) params.set("char", JSON.stringify(char));
        params.set("page", "1");
        params.set("limit", "1");

        return `/catalog/cards?${params}`;
      },
      transformResponse: (res: { meta: { total: number } }) => res.meta.total,
    }),

    getBreadcrumbs: builder.query<BreadcrumbCategory[], string>({
      query: (categoryId) =>
        `/catalog/categories/breadcrumbs?categoryId=${categoryId}`,
      transformResponse: (res: { items: BreadcrumbCategory[] }) => res.items,
    }),
  }),
});

export const {
  useGetCatalogCardsQuery,
  useGetProductCountQuery,
  useGetBreadcrumbsQuery,
} = catalogApi;
