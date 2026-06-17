"use client";

import { useState } from "react";
import Image from "next/image";
import { IconButton } from "@/shared/ui/IconButton";
import { HeartIcon } from "@/shared/ui/icons";
import { formatPrice } from "@/shared/lib/format";
import { cn } from "@/shared/lib/cn";
import type { CatalogCard } from "@/shared/api/types";

interface SliderProductCardProps {
  product: CatalogCard;
}

export function SliderProductCard({ product }: SliderProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const name = product.title?.ua ?? product.title?.en ?? "";
  const subtitle = product.subtitle?.ua ?? product.subtitle?.en ?? "";
  const price = product.pricing?.min ?? 0;

  return (
    <article className="group flex flex-col">
      <div className="relative h-50.75 w-40 overflow-hidden bg-bg-muted md:h-50.75 md:w-40.5 3xl:aspect-162/203 3xl:h-auto 3xl:w-full">
        <Image
          src={product.imageURL || "/placeholder.jpg"}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 40vw, 162px"
          unoptimized
        />
        <IconButton
          aria-label={isFavorite ? "Видалити з обраного" : "Додати в обране"}
          aria-pressed={isFavorite}
          onClick={() => setIsFavorite((prev) => !prev)}
          className={cn(
            "absolute top-2 right-2 h-6 w-6 border-0 bg-white shadow-md",
            isFavorite && "text-pink-main",
          )}
        >
          <HeartIcon filled={isFavorite} width={12} height={12} />
        </IconButton>
      </div>

      <div className="flex items-end justify-between gap-2 p-2">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h3 className="line-clamp-2 overflow-hidden font-montserrat text-[8px] leading-none font-semibold tracking-[1px] uppercase">
            {name}
          </h3>
          <p className="line-clamp-2 font-golos text-[6px] leading-2 font-normal tracking-[1px] text-grey-text uppercase">
            {subtitle}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-end justify-center whitespace-nowrap">
          <span className="font-montserrat text-[10px] leading-none font-semibold">
            {formatPrice(price)}
          </span>
        </div>
      </div>
    </article>
  );
}
