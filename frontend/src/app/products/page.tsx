import type { Metadata } from "next";
import { fetchProducts } from "@/lib/api";
import ProductsClient from "@/components/ProductsClient";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore our handcrafted Indian decor collection. Festive essentials, ceremonial artistry, and auspicious decor for your home.",
};

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          Our Products
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Discover our curated collection of handcrafted Indian decor pieces
        </p>
      </div>

      <ProductsClient products={products} />
    </div>
  );
}
