"use client";

import { useGetBreadcrumbsQuery } from "@/shared/api/catalogApi";
import { CATEGORY_ID_MAP } from "@/shared/api/types";
import type { CategorySlug } from "@/shared/api/types";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

const BASE_CRUMBS: BreadcrumbItem[] = [
  { label: "Головна", href: "/" },
  { label: "Каталог взуття", href: "/catalog" },
];

export function useBreadcrumbs(categorySlug?: CategorySlug): BreadcrumbItem[] {
  const categoryId = categorySlug ? CATEGORY_ID_MAP[categorySlug] : undefined;

  const { data } = useGetBreadcrumbsQuery(categoryId!, { skip: !categoryId });

  const category = data?.[0];
  if (categorySlug && category) {
    return [...BASE_CRUMBS, { label: category.title.ua || category.title.en }];
  }
  return BASE_CRUMBS;
}
