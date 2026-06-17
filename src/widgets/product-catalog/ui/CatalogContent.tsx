"use client";

import { ProductCard, ProductCardSkeleton } from "@/entities/product";
import { LoadMoreButton, Pagination } from "@/features/pagination";
import { EmptyState, ErrorState, Button } from "@/shared/ui";
import type { CatalogCard } from "@/entities/product/api";

interface CatalogContentProps {
  isError: boolean;
  showSkeletons: boolean;
  skeletonCount: number;
  items: CatalogCard[];
  clearAll: () => void;
  isLoadingMore: boolean;
  remaining: number;
  totalPages: number;
  onLoadMore: () => void;
  onPageChange: () => void;
  onRetry: () => void;
}

export function CatalogContent({
  isError,
  showSkeletons,
  skeletonCount,
  items,
  clearAll,
  isLoadingMore,
  remaining,
  totalPages,
  onLoadMore,
  onPageChange,
  onRetry,
}: CatalogContentProps) {
  if (isError) return <ErrorState onRetry={onRetry} />;

  if (showSkeletons) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-x-6 md:gap-y-4 3xl:gap-6">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductCardSkeleton key={i} imageClassName="3xl:w-89.25 3xl:h-112.25" infoClassName="3xl:p-3" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="Товарів не знайдено"
        description="Спробуйте змінити або скинути фільтри, щоб побачити більше товарів."
        action={<Button onClick={clearAll}>Очистити фільтри</Button>}
      />
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-x-6 md:gap-y-4 3xl:gap-6">
        {items.map((product) => (
          <ProductCard
            key={product.groupId}
            product={product}
            imageClassName="3xl:w-89.25 3xl:h-112.25"
            infoClassName="3xl:p-3"
            titleClassName="3xl:text-sm 3xl:font-medium 3xl:leading-[100%] 3xl:tracking-[0.5px]"
            descriptionClassName="3xl:text-[11px] 3xl:font-normal 3xl:leading-5 3xl:tracking-normal"
            priceClassName="3xl:text-[15px] 3xl:font-medium 3xl:font-golos 3xl:leading-[100%] 3xl:tracking-normal"
            favoriteClassName="3xl:h-10 3xl:w-10 3xl:top-4 3xl:right-4"
          />
        ))}
      </div>
      <LoadMoreButton onClick={onLoadMore} isLoading={isLoadingMore} remaining={remaining} />
      <Pagination totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}
