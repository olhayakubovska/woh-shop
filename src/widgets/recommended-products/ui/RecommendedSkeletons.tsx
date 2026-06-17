import { ProductCardSkeleton } from "@/entities/product";
import { RecommendedLayout } from "./RecommendedLayout";

export function RecommendedSkeletons() {
  return (
    <RecommendedLayout
      mobile={Array.from({ length: 2 }).map((_, i) => <ProductCardSkeleton key={i} />)}
      tablet={Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="w-40.5 shrink-0">
          <ProductCardSkeleton />
        </div>
      ))}
      desktop={Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
    />
  );
}
