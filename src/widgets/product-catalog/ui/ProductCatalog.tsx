"use client";

import { useCallback } from "react";
import Link from "next/link";
import { useGetCatalogCardsQuery } from "@/entities/product/api";
import { ActiveFiltersBar, FilterSidebar, MobileFilterDrawer } from "@/features/product-filters";
import { useAccumulatedItems } from "@/features/pagination";
import { SortDropdown, MobileSortSheet } from "@/features/product-sort";
import { PAGE_SIZE } from "@/entities/product/config";
import { useSkeletonCount } from "@/shared/lib";
import { useCatalogFilters, useBreadcrumbs } from "@/features/product-filters";
import { CatalogContent } from "./CatalogContent";

export function ProductCatalog() {
  const { filters, clearAll, setPage } = useCatalogFilters();
  const breadcrumbs = useBreadcrumbs(filters.categories);
  const skeletonCount = useSkeletonCount();

  const { data, isFetching, isError, refetch } = useGetCatalogCardsQuery({
    ...filters,
    limit: PAGE_SIZE,
  });

  const handleNextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, [setPage]);

  const { items, isLoadingMore, isAppendPending, remaining, handleLoadMore, handlePageChange } =
    useAccumulatedItems(data, filters.page, isFetching, handleNextPage);

  const totalPages = data?.meta.pages ?? 1;
  const showSkeletons = isFetching && !isAppendPending;

  return (
    <div className="pt-4 3xl:pt-5">
      <p className="mb-4 flex gap-1.5 text-[10px] leading-[100%] font-semibold tracking-[2px] text-grey-text uppercase">
        {breadcrumbs.map((crumb) => (
          <span key={`${crumb.label}-${crumb.href}`} className="flex items-center gap-1.5">
            {crumb.href ? (
              <>
                <Link href={crumb.href} className="hover:text-pink-main">
                  {crumb.label}
                </Link>
                <span>/</span>
              </>
            ) : (
              <span className="text-pink-main">{crumb.label}</span>
            )}
          </span>
        ))}
      </p>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 3xl:items-end">
        <h1 className="text-xl font-bold tracking-[2px] uppercase md:text-2xl 3xl:text-4xl 3xl:leading-11">
          Каталог взуття
        </h1>
        <div className="hidden 3xl:block 3xl:self-end">
          <SortDropdown />
        </div>
      </div>

      <div className="-mx-4 mb-4 h-0 border-t border-black/20 md:-mx-6 3xl:relative 3xl:left-1/2 3xl:mx-0 3xl:mb-0 3xl:w-screen 3xl:-translate-x-1/2" />

      <div className="mb-3 flex justify-between md:mb-4 3xl:hidden">
        <MobileFilterDrawer />
        <MobileSortSheet />
      </div>

      <ActiveFiltersBar />

      <div className="grid gap-8 3xl:mt-6 3xl:grid-cols-[333px_1fr] 3xl:gap-12">
        <div className="hidden 3xl:block">
          <FilterSidebar autoApply />
        </div>

        <CatalogContent
          isError={isError}
          showSkeletons={showSkeletons}
          skeletonCount={skeletonCount}
          items={items}
          clearAll={clearAll}
          isLoadingMore={isLoadingMore}
          remaining={remaining}
          totalPages={totalPages}
          onLoadMore={handleLoadMore}
          onPageChange={handlePageChange}
          onRetry={refetch}
        />
      </div>
    </div>
  );
}
