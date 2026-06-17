"use client";

import { useEffect, useRef, useState } from "react";
import type { CatalogCard } from "@/shared/api";

interface UseAccumulatedItemsResult {
  items: CatalogCard[];
  isAppendPending: boolean;
  isLoadingMore: boolean;
  handleLoadMore: () => void;
  handlePageChange: () => void;
}

export function useAccumulatedItems(
  data: { items: CatalogCard[] } | undefined,
  isLoading: boolean,
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

  return {
    items,
    isAppendPending,
    isLoadingMore: isLoading && isAppendPending,
    handleLoadMore,
    handlePageChange,
  };
}
