"use client";

import { useEffect, useState } from "react";
import { fetchBreadcrumbs } from "@/shared/api/catalog";
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
  const [fetchedSlug, setFetchedSlug] = useState<CategorySlug | undefined>(
    undefined,
  );
  const [fetchedLabel, setFetchedLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!categorySlug) return;

    const categoryId = CATEGORY_ID_MAP[categorySlug];
    if (!categoryId) return;

    let cancelled = false;

    fetchBreadcrumbs(categoryId)
      .then((items) => {
        if (cancelled) return;
        const category = items[0];
        if (!category) return;
        setFetchedSlug(categorySlug);
        setFetchedLabel(category.title.ua || category.title.en);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [categorySlug]);

  if (categorySlug && fetchedSlug === categorySlug && fetchedLabel) {
    return [...BASE_CRUMBS, { label: fetchedLabel }];
  }
  return BASE_CRUMBS;
}
