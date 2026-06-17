"use client";

import { ProductCard, SliderProductCard } from "@/entities/product";
import { cn } from "@/shared/lib";
import type { CatalogCard } from "@/shared/api";
import { RecommendedLayout } from "./RecommendedLayout";

interface RecommendedItemsProps {
  items: CatalogCard[];
}

export function RecommendedItems({ items }: RecommendedItemsProps) {
  return (
    <RecommendedLayout
      mobile={items.slice(0, 2).map((product) => (
        <ProductCard key={product.groupId} product={product} />
      ))}
      tablet={
        <>
          {items.slice(0, 8).map((product, i) => (
            <div
              key={product.groupId}
              className={cn("w-40.5 shrink-0 snap-start", i === 0 && "pl-4 md:pl-6")}
            >
              <SliderProductCard product={product} />
            </div>
          ))}
          <div className="w-4 shrink-0 md:w-6" />
        </>
      }
      desktop={items.slice(0, 6).map((product) => (
        <ProductCard
          key={product.groupId}
          product={product}
          imageClassName="3xl:w-[230px] 3xl:h-[289px]"
          infoClassName="3xl:p-3"
          titleClassName="3xl:text-[10px] 3xl:font-medium 3xl:leading-4 3xl:tracking-[0.5px]"
          descriptionClassName="3xl:text-[8px] 3xl:font-normal 3xl:leading-2 3xl:tracking-normal 3xl:whitespace-nowrap"
          priceClassName="3xl:text-xs 3xl:font-medium 3xl:font-golos 3xl:tracking-normal"
          favoriteClassName="3xl:h-8 3xl:w-8 3xl:top-2 3xl:right-2"
        />
      ))}
    />
  );
}
