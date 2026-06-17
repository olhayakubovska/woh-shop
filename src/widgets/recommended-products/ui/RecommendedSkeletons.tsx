import { ProductCardSkeleton } from "@/entities/product";
import { RecommendedLayout } from "./RecommendedLayout";

export function RecommendedSkeletons() {
  return (
    <RecommendedLayout
      mobile={Array.from({ length: 2 }).map((_, i) => <ProductCardSkeleton key={i} />)}
      tablet={Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="w-40.5 shrink-0 mx-4">
          <ProductCardSkeleton imageClassName="h-50.75 w-40 md:h-50.75 md:w-40.5 " />
        </div>
      ))}
      desktop={Array.from({ length: 6 }).map((_, i) => (
        <ProductCardSkeleton
          key={i}
          imageClassName="3xl:w-[230px] 3xl:h-[289px]"
          infoClassName="3xl:p-3"
        />
      ))}
    />
  );
}
