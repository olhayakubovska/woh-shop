"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useProducts } from "@/entities/product/api/useProducts";
import { ProductCard } from "@/entities/product/ui/ProductCard";
import { ProductCardSkeleton } from "@/entities/product/ui/ProductCardSkeleton";
import { ActiveFiltersBar } from "@/features/product-filters/ui/ActiveFiltersBar";
import { FilterSidebar } from "@/features/product-filters/ui/FilterSidebar";
import { MobileFilterDrawer } from "@/features/product-filters/ui/MobileFilterDrawer";
import { LoadMoreButton } from "@/features/pagination/ui/LoadMoreButton";
import { Pagination } from "@/features/pagination/ui/Pagination";
import { SortDropdown } from "@/features/product-sort/ui/SortDropdown";
import { MobileSortSheet } from "@/features/product-sort/ui/MobileSortSheet";
import { PAGE_SIZE } from "@/shared/config/filters";
import { EmptyState } from "@/shared/ui/EmptyState";
import { ErrorState } from "@/shared/ui/ErrorState";
import { Button } from "@/shared/ui/Button";
import { useCatalogFilters } from "@/shared/lib/useCatalogFilters";
import { useBreadcrumbs } from "@/shared/lib/useBreadcrumbs";
import type { CatalogCard } from "@/shared/api/types";

export function ProductCatalog() {
  const { filters, clearAll, setPage } = useCatalogFilters();
  const breadcrumbs = useBreadcrumbs(filters.categories[0]);
  const { data, isLoading, error, refetch } = useProducts({
    category: filters.categories[0],
    insoleSize: filters.insoleSize,
    heelHeight: filters.heelHeight,
    material: filters.material,
    color: filters.color,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    sort: filters.sort,
    page: filters.page,
    limit: PAGE_SIZE,
  });

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
    setPage(filters.page + 1);
  };

  const handlePageChange = () => {
    isAppendingRef.current = false;
    setIsAppendPending(false);
  };

  const total = data?.meta.total ?? 0;
  const totalPages = data?.meta.pages ?? 1;
  const remaining = Math.min(PAGE_SIZE, Math.max(0, total - items.length));
  const showSkeletons = isLoading && !isAppendPending;
  const isLoadingMore = isLoading && isAppendPending;

  return (
    <div className="mx-auto max-w-375 px-4 pt-4 md:px-6 3xl:px-0 3xl:pt-5">
      <p className="mb-4 flex gap-1.5 text-[10px] leading-[100%] font-semibold tracking-[2px] text-grey-text uppercase">
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span>/</span>}
            {crumb.href && i < breadcrumbs.length - 1 ? (
              <Link href={crumb.href} className="hover:text-pink-main">
                {crumb.label}
              </Link>
            ) : (
              <span
                className={i === breadcrumbs.length - 1 ? "text-pink-main" : ""}
              >
                {crumb.label}
              </span>
            )}
          </span>
        ))}
      </p>

      <div className="3x:items-end mb-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-bold tracking-[2px] uppercase md:text-2xl 3xl:text-4xl 3xl:leading-11">
          Каталог взуття
        </h1>

        <div className="hidden 3xl:block 3xl:self-end">
          <SortDropdown />
        </div>
      </div>

      <div className="-mx-4 mb-4 h-0 border-t border-black/20 md:-mx-6 3xl:relative 3xl:left-1/2 3xl:mx-0 3xl:mb-0 3xl:w-screen 3xl:-translate-x-1/2"></div>

      <div className="mb-3 flex justify-between md:mb-4 3xl:hidden">
        <MobileFilterDrawer />
        <MobileSortSheet />
      </div>

      <ActiveFiltersBar />

      <div className="grid gap-8 3xl:mt-6 3xl:grid-cols-[333px_1fr] 3xl:gap-12">
        <div className="hidden 3xl:block">
          <FilterSidebar autoApply />
        </div>

        <div>
          {error ? (
            <ErrorState onRetry={refetch} />
          ) : showSkeletons ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-x-6 md:gap-y-4 3xl:gap-6">
              {Array.from({ length: PAGE_SIZE }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : items.length === 0 ? (
            <EmptyState
              title="Товарів не знайдено"
              description="Спробуйте змінити або скинути фільтри, щоб побачити більше товарів."
              action={<Button onClick={clearAll}>Очистити фільтри</Button>}
            />
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-x-6 md:gap-y-4 3xl:gap-6">
                {items.map((product) => (
                  <ProductCard
                    key={product.groupId}
                    product={product}
                    imageClassName="3xl:w-89.25 3xl:h-112.25"
                    infoClassName="3xl:p-3 "
                    titleClassName="3xl:text-sm 3xl:font-medium 3xl:leading-[100%] 3xl:tracking-[0.5px]"
                    descriptionClassName="3xl:text-[11px] 3xl:font-normal 3xl:leading-5 3xl:tracking-normal"
                    priceClassName="3xl:text-[15px] 3xl:font-medium 3xl:font-golos 3xl:leading-[100%] 3xl:tracking-normal"
                    favoriteClassName="3xl:h-10 3xl:w-10 3xl:top-4 3xl:right-4"
                  />
                ))}
              </div>
              <LoadMoreButton
                onClick={handleLoadMore}
                isLoading={isLoadingMore}
                remaining={remaining}
              />

              <Pagination
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
