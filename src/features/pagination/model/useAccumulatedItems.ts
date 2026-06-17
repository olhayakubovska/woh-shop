"use client";

import { useEffect, useRef, useState } from "react";
import { PAGE_SIZE } from "@/entities/product/config";
import type { CatalogCard, CatalogCardsResponse } from "@/entities/product/api";

interface UseAccumulatedItemsResult {
  items: CatalogCard[];
  isAppendPending: boolean;
  isLoadingMore: boolean;
  remaining: number;
  handleLoadMore: () => void;
  handlePageChange: () => void;
}

export function useAccumulatedItems(
  data: CatalogCardsResponse | undefined,
  currentPage: number,
  isFetching: boolean,
  onLoadMore: () => void,
): UseAccumulatedItemsResult {
  const [items, setItems] = useState<CatalogCard[]>([]);
  const [isAppendPending, setIsAppendPending] = useState(false);
  const isAppendingRef = useRef(false);

  useEffect(() => {
    if (!data) return;
    if (isAppendingRef.current) {
      setItems((prev) => [...prev, ...data.items]);
      isAppendingRef.current = false;
      setIsAppendPending(false);
    } else {
      setItems(data.items);
    }
  }, [data]);

  const handleLoadMore = () => {
    isAppendingRef.current = true;
    setIsAppendPending(true);
    onLoadMore();
  };

  const handlePageChange = () => {
    isAppendingRef.current = false;
    setIsAppendPending(false);
  };

  const totalPages = data?.meta.pages ?? 1;
  const total = data?.meta.total ?? 0;
  const remaining =
    currentPage < totalPages
      ? Math.min(PAGE_SIZE, total - currentPage * PAGE_SIZE)
      : 0;

  return {
    items,
    isAppendPending,
    isLoadingMore: isFetching && isAppendPending,
    remaining,
    handleLoadMore,
    handlePageChange,
  };
}
