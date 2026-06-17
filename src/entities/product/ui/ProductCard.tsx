"use client";

import { useState } from "react";
import Image from "next/image";
import { IconButton, HeartIcon } from "@/shared/ui";
import { formatPrice, cn } from "@/shared/lib";
import type { CatalogCard } from "@/shared/api";

interface ProductCardProps {
  product: CatalogCard;
  imageClassName?: string;
  infoClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  priceClassName?: string;
  favoriteClassName?: string;
}

export function ProductCard({
  product,
  imageClassName,
  infoClassName,
  titleClassName,
  descriptionClassName,
  priceClassName,
  favoriteClassName,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const name = product.title?.ua ?? product.title?.en ?? "";
  const subtitle = product.subtitle?.ua ?? product.subtitle?.en ?? "";
  const price = product.pricing?.min ?? 0;

  return (
    <article className="group flex flex-col">
      <div
        className={cn(
          "relative h-55.25 w-44 overflow-hidden bg-bg-muted md:h-70.25 md:w-56",
          imageClassName,
        )}
      >
        <Image
          src={product.imageURL || "/placeholder.jpg"}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 33vw, (max-width: 1280px) 25vw, 20vw"
          unoptimized
        />
        <IconButton
          aria-label={isFavorite ? "Видалити з обраного" : "Додати в обране"}
          aria-pressed={isFavorite}
          onClick={() => setIsFavorite((prev) => !prev)}
          className={cn(
            "absolute top-2 right-2 h-7 w-7 border-0 bg-white shadow-md md:top-3 md:right-3 md:h-8 md:w-8",
            isFavorite && "text-pink-main",
            favoriteClassName,
          )}
        >
          <HeartIcon filled={isFavorite} width={14} height={14} />
        </IconButton>
      </div>

      <div
        className={cn(
          "flex items-center justify-between px-1 pt-2.75 pb-2 md:p-2",
          infoClassName,
        )}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h3
            className={cn(
              "line-clamp-2 h-6 font-montserrat text-[10px] leading-3 font-semibold tracking-[1px] uppercase md:line-clamp-1 md:h-auto",
              titleClassName,
            )}
          >
            {name}
          </h3>

          <p
            className={cn(
              "line-clamp-2 h-5 font-golos text-[8px] leading-2.5 font-normal tracking-[1px] text-grey-text uppercase md:h-auto 3xl:line-clamp-1",
              descriptionClassName,
            )}
          >
            {subtitle}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-end justify-center whitespace-nowrap md:ml-2 3xl:ml-3">
          <span className={cn("text-[13px] font-semibold", priceClassName)}>
            {formatPrice(price)}
          </span>
        </div>
      </div>
    </article>
  );
}
