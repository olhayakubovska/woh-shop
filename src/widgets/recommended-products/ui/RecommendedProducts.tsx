"use client";

import { useGetCatalogCardsQuery } from "@/entities/product/api";
import { ErrorState } from "@/shared/ui";
import { RecommendedSkeletons } from "./RecommendedSkeletons";
import { RecommendedItems } from "./RecommendedItems";

export function RecommendedProducts() {
  const { data, isFetching, isError, refetch } = useGetCatalogCardsQuery({
    limit: 8,
    sort: "updated_desc",
  });

  return (
    <section className="pt-12 md:pt-14 3xl:pt-20">
      <p className="font-golos text-xs leading-3.5 font-bold tracking-[1px] text-pink-main uppercase 3xl:text-sm">
        Our selection
      </p>
      <h2 className="mb-4 text-xl font-extrabold tracking-[1px] uppercase sm:text-4xl md:text-2xl md:leading-9 3xl:mt-1 3xl:mb-7 3xl:text-4xl">
        Рекомендовані товари
      </h2>

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : isFetching ? (
        <RecommendedSkeletons />
      ) : (
        <RecommendedItems items={data?.items ?? []} />
      )}
    </section>
  );
}
