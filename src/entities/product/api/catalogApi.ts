import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { insoleSizeToApiKey } from "@/entities/product/config/filters";
import { CATEGORY_ID_MAP } from "@/entities/product/api/types";
import type { BreadcrumbCategory, CatalogCardsResponse, SortOption } from "@/entities/product/api/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://test-woh.keykey.com.ua/v1";

export interface CatalogCardsArgs {
  categories?: string[];
  insoleSizes?: number[];
  heelHeights?: string[];
  materials?: string[];
  colors?: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: SortOption;
  page?: number;
  limit?: number;
}

function buildCatalogParams(args: CatalogCardsArgs): URLSearchParams {
  const char: Record<string, string | string[]> = {};
  if (args.insoleSizes?.length) char["insoleSize"] = args.insoleSizes.map(insoleSizeToApiKey);
  if (args.heelHeights?.length) char["heelHeight"] = args.heelHeights;
  if (args.materials?.length) char["material"] = args.materials;
  if (args.colors?.length) char["color"] = args.colors;

  const params = new URLSearchParams();

  if (args.categories?.length) {
    for (const slug of args.categories) {
      const id = CATEGORY_ID_MAP[slug];
      if (id) params.append("categoryId[]", id);
    }
  }

  if (args.minPrice != null) params.set("priceMin", String(args.minPrice));
  if (args.maxPrice != null) params.set("priceMax", String(args.maxPrice));
  if (args.sort) params.set("sort", args.sort);
  if (Object.keys(char).length > 0) params.set("char", JSON.stringify(char));

  return params;
}

export const catalogApi = createApi({
  reducerPath: "catalogApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCatalogCards: builder.query<CatalogCardsResponse, CatalogCardsArgs>({
      query: (args) => {
        const params = buildCatalogParams(args);
        params.set("page", String(args.page ?? 1));
        params.set("limit", String(args.limit ?? 24));
        return `/catalog/cards?${params}`;
      },
    }),

    getProductCount: builder.query<number, CatalogCardsArgs>({
      query: (args) => {
        const params = buildCatalogParams(args);
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
