import { cn } from "@/shared/lib";

interface ProductCardSkeletonProps {
  imageClassName?: string;
  infoClassName?: string;
}

export function ProductCardSkeleton({ imageClassName, infoClassName }: ProductCardSkeletonProps) {
  return (
    <article className="flex flex-col">
      <div
        className={cn(
          "h-55.25 w-44 shrink-0 animate-pulse bg-gray-200 md:h-70.25 md:w-56",
          imageClassName,
        )}
      />
      <div
        className={cn(
          "flex items-center justify-between px-1 pt-2.75 pb-2 md:p-2",
          infoClassName,
        )}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="h-2.5 w-1/2 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="ml-2 h-3.5 w-12 shrink-0 animate-pulse rounded bg-gray-200" />
      </div>
    </article>
  );
}
