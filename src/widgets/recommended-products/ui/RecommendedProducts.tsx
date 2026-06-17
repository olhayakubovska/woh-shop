"use client";

import { useEffect, useState } from "react";
import { fetchCatalogCards } from "@/shared/api/catalog";
import { ProductCard } from "@/entities/product/ui/ProductCard";
import { SliderProductCard } from "@/entities/product/ui/SliderProductCard";
import { ErrorState } from "@/shared/ui/ErrorState";
import type { CatalogCard } from "@/shared/api/types";

export function RecommendedProducts() {
  const [items, setItems] = useState<CatalogCard[]>([]);
  const [error, setError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    fetchCatalogCards({ limit: 8, sort: "updated_desc" })
      .then((res) => setItems(res.items))
      .catch(() => setError(true));
  }, [retryKey]);

  const handleRetry = () => {
    setError(false);
    setRetryKey((k) => k + 1);
  };

  const mobileItems = items.slice(0, 2);
  const sliderItems = items.slice(0, 8);
  const desktopItems = items.slice(0, 6);

  return (
    <section className="mx-auto max-w-375 px-4 pt-12 md:px-6 md:pt-14 3xl:px-0 3xl:pt-20">
      <p className="font-golos text-xs leading-3.5 font-bold tracking-[1px] text-pink-main uppercase 3xl:text-sm">
        Our selection
      </p>

      <h2 className="mb-4 text-xl font-extrabold tracking-[1px] uppercase sm:text-4xl md:text-2xl md:leading-9 3xl:mt-1 3xl:mb-7 3xl:text-4xl">
        Рекомендовані товари
      </h2>

      {error && <ErrorState onRetry={handleRetry} />}

      <div className="grid grid-cols-2 gap-4 md:hidden">
        {mobileItems.map((product) => (
          <ProductCard key={product.groupId} product={product} />
        ))}
      </div>

      <div className="-mr-6 hidden snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:flex md:pb-0 3xl:hidden [&::-webkit-scrollbar]:hidden">
        {sliderItems.map((product) => (
          <div key={product.groupId} className="w-40.5 shrink-0 snap-start">
            <SliderProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="hidden 3xl:grid 3xl:grid-cols-6 3xl:gap-6">
        {desktopItems.map((product) => (
          <ProductCard
            key={product.groupId}
            product={product}
            imageClassName="3xl:w-[230px] 3xl:h-[289px]"
            infoClassName="3xl:p-3"
            titleClassName="3xl:text-[10px] 3xl:font-medium 3xl:leading-4 3xl:tracking-[0.5px]"
            descriptionClassName="3xl:text-[8px] 3xl:font-normal 3xl:leading-2 3xl:tracking-normal 3xl:whitespace-nowrap "
            priceClassName="3xl:text-xs 3xl:font-medium 3xl:font-golos 3xl:tracking-normal"
            favoriteClassName="3xl:h-8 3xl:w-8 3xl:top-2 3xl:right-2"
          />
        ))}
      </div>
    </section>
  );
}
