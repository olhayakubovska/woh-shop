"use client";

import { useGetBreadcrumbsQuery } from "@/entities/product/api";
import { CATEGORY_ID_MAP } from "@/entities/product/api";
import type { CategorySlug } from "@/entities/product/api";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

const BASE_CRUMBS: BreadcrumbItem[] = [
  { label: "Головна", href: "/" },
  { label: "Каталог взуття", href: "/catalog" },
];

export function useBreadcrumbs(categories: CategorySlug[]): BreadcrumbItem[] {
  const singleSlug = categories.length === 1 ? categories[0] : undefined;
  const categoryId = singleSlug ? CATEGORY_ID_MAP[singleSlug] : undefined;

  const { data } = useGetBreadcrumbsQuery(categoryId!, { skip: !categoryId });

  const category = data?.[0];
  if (singleSlug && category) {
    return [...BASE_CRUMBS, { label: category.title.ua || category.title.en }];
  }
  return BASE_CRUMBS;
}
