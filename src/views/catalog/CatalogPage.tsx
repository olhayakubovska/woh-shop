import { Suspense } from "react";
import { Header } from "@/widgets/header/ui/Header";
import { Footer } from "@/widgets/footer/ui/Footer";
import { ProductCatalog } from "@/widgets/product-catalog/ui/ProductCatalog";
import { RecommendedProducts } from "@/widgets/recommended-products/ui/RecommendedProducts";

export function CatalogPage() {
  return (
    <div className="flex min-h-full flex-col">
      <Header />

      <main className="flex-1">
        <Suspense>
          <ProductCatalog />
        </Suspense>

        <RecommendedProducts />
      </main>

      <Footer />
    </div>
  );
}
